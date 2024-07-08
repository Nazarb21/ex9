import { getRepository } from 'typeorm';
import { Player } from '../entities/player.entity';
import { Team } from '../entities/team.entity';

export class PlayerService {
    private playerRepository = getRepository(Player);
    private teamRepository = getRepository(Team);

    async getAllPlayers(): Promise<Player[]> {
        return this.playerRepository.find({ relations: ['team'] });
    }

    async getPlayerById(id: number): Promise<Player | undefined> {
        return this.playerRepository.findOne(id, { relations: ['team'] });
    }

    async createPlayer(playerData: Partial<Player>): Promise<Player> {
        const player = this.playerRepository.create(playerData);
        return this.playerRepository.save(player);
    }

    async updatePlayer(id: number, playerData: Partial<Player>): Promise<Player | undefined> {
        await this.playerRepository.update(id, playerData);
        return this.getPlayerById(id);
    }

    async deletePlayer(id: number): Promise<void> {
        await this.playerRepository.delete(id);
    }

    async transferPlayer(playerId: number, newTeamId: number): Promise<Player | undefined> {
        const player = await this.getPlayerById(playerId);
        const newTeam = await this.teamRepository.findOne(newTeamId);
        const oldTeam = await this.teamRepository.findOne(player?.team.id);

        if (!player || !newTeam || !oldTeam) return undefined;

        const transferFee = 100000 / player.age;
        const commission = transferFee * oldTeam.commissionRate;
        const totalAmount = transferFee + commission;

        if (newTeam.balance < totalAmount) {
            throw new Error('Insufficient funds');
        }

        oldTeam.balance += totalAmount;
        newTeam.balance -= totalAmount;

        player.team = newTeam;

        await this.teamRepository.save(oldTeam);
        await this.teamRepository.save(newTeam);
        return this.playerRepository.save(player);
    }
}
