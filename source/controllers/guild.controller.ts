import { Request, Response, NextFunction } from 'express';
import { ErrorCodes } from '../constants';
import { systemError, guildObject } from '../entities';
import { guildDTO, GuildService } from '../services/guild.service';

const guildService: GuildService = new GuildService();

class GuildDTO implements guildDTO {
    guild_id: number = 0;
    guild_name: string = "hhhhh";
    guild_description: string = "";
    guild_default_strong: number = 0;
}
let a: guildDTO = {
    guild_id: 0,
    guild_name:  "hhhhh",
    guild_description: "jdsgdj",
    guild_default_strong : 0
}



// const insertNewGuild = async (req: Request, res: Response, next: NextFunction) => {
//     guildService.insertNewGuild(a)
//         .then((result: guildObject) => {
//             return res.status(200).json({
//                 message: result
//             });
//         })
//         .catch((error: systemError) => {
//             switch (error.code) {
//                 case ErrorCodes.ConnectionError:
//                     return res.status(408).json({
//                         errorMessage: error.message
//                     });
//                 case ErrorCodes.queryError:
//                     return res.status(406).json({
//                         errorMessage: error.message
//                     });
//                 default:
//                     return res.status(400).json({
//                         errorMessage: error.message
//                     });
//             }
//         });
// };

// const updateGuildById = async (req: Request, res: Response, next: NextFunction) => {
//     let id: number = -1;
//     const guildId: string = req.params.id;

//     if (isNaN(Number(req.params.id))) {

//     }

//     if (guildId !== null && guildId !== undefined) {
//         id = parseInt(guildId);
//     }

//     if (id > 0) {
//         guildService.updateGuildById(id)
//             .then((result: guildObject) => {
//                 return res.status(200).json({
//                     message: result
//                 });
//             })
//             .catch((error: systemError) => {
//                 switch (error.code) {
//                     case ErrorCodes.ConnectionError:
//                         return res.status(408).json({
//                             errorMessage: error.message
//                         });
//                     case ErrorCodes.queryError:
//                         return res.status(406).json({
//                             errorMessage: error.message
//                         });
//                     default:
//                         return res.status(400).json({
//                             errorMessage: error.message
//                         });
//                 }
//             });
//     };
// };

// const deleteGuildById = async (req: Request, res: Response, next: NextFunction) => {
//     let id: number = -1;
//     const guildId: string = req.params.id;

//     if (isNaN(Number(req.params.id))) {

//     }

//     if (guildId !== null && guildId !== undefined) {
//         id = parseInt(guildId);
//     }

//     if (id > 0) {
//         guildService.deleteGuildById(id)
//             .then((result: guildObject) => {
//                 return res.status(200).json({
//                     message: result
//                 });
//             })
//             .catch((error: systemError) => {
//                 switch (error.code) {
//                     case ErrorCodes.ConnectionError:
//                         return res.status(408).json({
//                             errorMessage: error.message
//                         });
//                     case ErrorCodes.queryError:
//                         return res.status(406).json({
//                             errorMessage: error.message
//                         });
//                     default:
//                         return res.status(400).json({
//                             errorMessage: error.message
//                         });
//                 }
//             });
//     };
// };

const getGuilds = async (req: Request, res: Response, next: NextFunction) => {
    guildService.getGuilds()
        .then((result: guildObject[]) => {
            return res.status(200).json({
                message: result
            });
        })
        .catch((error: systemError) => {
            switch (error.code) {
                case ErrorCodes.ConnectionError:
                    return res.status(408).json({
                        errorMessage: error.message
                    });
                case ErrorCodes.queryError:
                    return res.status(406).json({
                        errorMessage: error.message
                    });
                default:
                    return res.status(400).json({
                        errorMessage: error.message
                    });
            }
        });
};

const getGuildById = async (req: Request, res: Response, next: NextFunction) => {
    let id: number = -1;
    const guildId: string = req.params.id;

    if (isNaN(Number(req.params.id))) {

    }

    if (guildId !== null && guildId !== undefined) {
        id = parseInt(guildId);
    }

    if (id > 0) {
        guildService.getGuildById(id)
            .then((result: guildObject) => {
                return res.status(200).json({
                    result
                });
            })
            .catch((error: systemError) => {
                switch (error.code) {
                    case ErrorCodes.ConnectionError:
                        return res.status(408).json({
                            errorMessage: error.message
                        });
                    case ErrorCodes.queryError:
                        return res.status(406).json({
                            errorMessage: error.message
                        });
                    default:
                        return res.status(400).json({
                            errorMessage: error.message
                        });
                }
            });
    }
};

export default { getGuilds, getGuildById };
//, insertNewGuild, updateGuildById, deleteGuildById