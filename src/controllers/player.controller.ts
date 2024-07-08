import { Router, Request, Response } from 'express';
import { PlayerService } from '../services/player.service';

const router = Router();
const playerService = new PlayerService();

router.get('/', async (req: Request, res: Response) => {
    const players = await playerService.getAllPlayers();
    res.json(players);
});

router.get('/:id', async (req: Request, res: Response) => {
    const player = await playerService.getPlayerById(parseInt(req.params.id));
    if (player) {
        res.json(player);
    } else {
        res.status(404).json({ message: 'Player not found' });
    }
});

router.post('/', async (req: Request, res: Response) => {
    const player = await playerService.createPlayer(req.body);
    res.status(201).json(player);
});

router.put('/:id', async (req: Request, res: Response) => {
    const player = await playerService.updatePlayer(parseInt(req.params.id), req.body);
    if (player) {
        res.json(player);
    } else {
        res.status(404).json({ message: 'Player not found' });
    }
});

router.delete('/:id', async (req: Request, res: Response) => {
    await playerService.deletePlayer(parseInt(req.params.id));
    res.status(204).send();
});

router.post('/:id/transfer/:newTeamId', async (req: Request, res: Response) => {
    try {
        const player = await playerService.transferPlayer(parseInt(req.params.id), parseInt(req.params.newTeamId));
        if (player) {
            res.json(player);
        } else {
            res.status(404).json({ message: 'Player or Team not found' });
        }
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
});

export const playerController = router;
