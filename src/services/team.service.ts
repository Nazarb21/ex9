import { getRepository } from 'typeorm';
import { Team } from '../entities/team.entity';

export class TeamService {
    private teamRepository = getRepository(Team);

    async getAllTeams(): Promise<Team[]> {
        return this.teamRepository.find({ relations: ['players'] });
    }

    async getTeamById(id: number): Promise<Team | undefined> {
        return this.teamRepository.findOne(id, { relations: ['players'] });
    }

    async createTeam(teamData: Partial<Team>): Promise<Team> {
        const team = this.teamRepository.create(teamData);
        return this.teamRepository.save(team);
    }

    async updateTeam(id: number, teamData: Partial<Team>): Promise<Team | undefined> {
        await this.teamRepository.update(id, teamData);
        return this.getTeamById(id);
    }

    async deleteTeam(id: number): Promise<void> {
        await this.teamRepository.delete(id);
    }
}
