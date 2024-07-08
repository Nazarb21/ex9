import { Router, Request, Response } from 'express';
import { TeamService } from '../services/team.service';

const router = Router();
const teamService = new TeamService();

router.get('/', async (req: Request, res: Response) => {
    const teams = await teamService.getAllTeams();
    res.json(teams);
});

router.get('/:id', async (req: Request, res: Response) => {
    const team = await teamService.getTeamById(parseInt(req.params.id));
    if (team) {
        res.json(team);
    } else {
        res.status(404).json({ message: 'Team not found' });
    }
});

router.post('/', async (req: Request, res: Response) => {
    const team = await teamService.createTeam(req.body);
    res.status(201).json(team);
});

router.put('/:id', async (req: Request, res: Response) => {
    const team = await teamService.updateTeam(parseInt(req.params.id), req.body);
    if (team) {
        res.json(team);
    } else {
        res.status(404).json({ message: 'Team not found' });
    }
});

router.delete('/:id', async (req: Request, res: Response) => {
    await teamService.deleteTeam(parseInt(req.params.id));
    res.status(204).send();
});

export const teamController = router;
