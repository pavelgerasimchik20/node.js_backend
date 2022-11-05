import express from 'express';
import controller from '../controllers/guild.controller';
import { Role } from '../enums';
import middleware from '../middleware/auth.middleware';
const router = express.Router();

router.get('/get_guilds', middleware.verifyToken([Role.Administrator, Role.RegularUser]), controller.getGuilds);
router.get('/get_guild/:id', middleware.verifyToken([Role.Administrator, Role.RegularUser]), controller.getGuildById);
router.put('/update_guilds_strengh/:id', middleware.verifyToken([Role.Administrator, Role.RegularUser]), controller.updateGuildStrenghById);

export default { router };