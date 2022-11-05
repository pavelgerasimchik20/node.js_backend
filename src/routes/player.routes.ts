import express from 'express';
import controller from '../controllers/player.controller';
import { Role } from '../enums';
import middleware from '../middleware/auth.middleware';
const router = express.Router();

router.get('/get_players', middleware.verifyToken([Role.Administrator]), controller.getPlayers);
router.get('/get_player/:id', middleware.verifyToken([Role.Administrator]), controller.getPlayerById);
router.put('/update_players_guild/:id', middleware.verifyToken([Role.Administrator]), controller.updatePlayersGuildById);
router.post('/create_player', middleware.verifyToken([Role.Administrator]), controller.addPlayer);
router.delete('/delete_by_id/:id', middleware.verifyToken([Role.Administrator]), controller.deletePlayerById);
router.delete('/delete_by_title/:title', middleware.verifyToken([Role.Administrator]), controller.deletePlayerByTitle);

export default {router};