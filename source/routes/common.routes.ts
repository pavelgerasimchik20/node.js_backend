import express from 'express';
import guildController from '../controllers/guild.controller';
import playerController from '../controllers/player.controller';
const router = express.Router();

router.get('/guilds', guildController.getGuilds);
router.get('/guild_by_id/:id', guildController.getGuildById);

router.get('/players', playerController.getPlayers);
router.get('/player_by_id/:id', playerController.getPlayerById);

export default { router };