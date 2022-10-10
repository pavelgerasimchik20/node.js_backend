import express from 'express';
import controller from '../controllers/guild.controller';
const router = express.Router();

router.get('/guilds', controller.getGuilds);
router.get('/guild_by_id/:id', controller.getGuildById);
//router.get('/guild_delete_by_id/:id', controller.deleteGuildById);
//router.post('/guild_insert_by_id', controller.insertNewGuild);
//router.get('/guild_update_by_id/:id', controller.updateGuildById);

export default { router };