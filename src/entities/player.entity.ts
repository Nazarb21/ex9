import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from 'typeorm';
import { Team } from './team.entity';

@Entity()
export class Player {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    firstName: string;

    @Column()
    lastName: string;

    @Column()
    careerStartDate: Date;

    @Column()
    age: number;

    @ManyToOne(() => Team, team => team.players)
    team: Team;
}
