import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';
import { Player } from './player.entity';

@Entity()
export class Team {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    name: string;

    @Column()
    city: string;

    @Column()
    country: string;

    @Column({ type: 'float', default: 0 })
    balance: number;

    @Column({ type: 'float', default: 0 })
    commissionRate: number;

    @OneToMany(() => Player, player => player.team)
    players: Player[];
}
