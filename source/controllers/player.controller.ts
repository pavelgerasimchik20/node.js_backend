import { Request, Response, NextFunction } from 'express';
import { ErrorCodes } from '../constants';
import { systemError, playerObject } from '../entities';
import { playerDTO, PlayerService } from '../services/player.service';

const playerService: PlayerService = new PlayerService();

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

const getPlayers = async (req: Request, res: Response, next: NextFunction) => {
    playerService.getPlayers()
        .then((result: playerObject[]) => {
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

const getPlayerById = async (req: Request, res: Response, next: NextFunction) => {
    let id: number = -1;
    const guildId: string = req.params.id;

    if (isNaN(Number(req.params.id))) {}
    if (guildId !== null && guildId !== undefined) {
        id = parseInt(guildId);
    }

    if (id > 0) {
        playerService.getPlayerById(id)
            .then((result: playerObject) => {
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

export default { getPlayers, getPlayerById };