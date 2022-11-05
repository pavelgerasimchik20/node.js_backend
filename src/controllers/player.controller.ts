import { Request, Response, NextFunction } from 'express';
import { NON_EXISTENT_ID } from '../constants';
import { AuthenticatedRequest, systemError, playerObject } from '../entities';
import { RequestHelper } from '../helpers/request.helper';
import { ResponseHelper } from '../helpers/response.helper';
import { ErrorService } from '../services/error.service';
import { PlayerService } from '../services/player.service';

const errorService: ErrorService = new ErrorService();
const playerService: PlayerService = new PlayerService(errorService);

const getPlayers = async (req: Request, res: Response, next: NextFunction) => {
    console.log("User data: ", (req as AuthenticatedRequest).userData);
    playerService.getPlayers()
        .then((result: playerObject[]) => {
            return res.status(200).json({
                players: result
            });
        })
        .catch((error: systemError) => {
            return ResponseHelper.handleError(res, error);
        });
};

const getPlayerById = async (req: Request, res: Response, next: NextFunction) => {
    const numericParamOrError: number | systemError = RequestHelper.ParseNumericInput(errorService, req.params.id)
    if (typeof numericParamOrError === "number") {
        if (numericParamOrError > 0) {
            playerService.getPlayerById(numericParamOrError)
                .then((result: playerObject) => {
                    return res.status(200).json(result);
                })
                .catch((error: systemError) => {
                    return ResponseHelper.handleError(res, error);
                });
        }
        else {
            
        }
    }
    else {
        return ResponseHelper.handleError(res, numericParamOrError);
    }
};

const updatePlayersGuildById = async (req: Request, res: Response, next: NextFunction) => {
    const numericParamOrError: number | systemError = RequestHelper.ParseNumericInput(errorService, req.params.id)
    if (typeof numericParamOrError === "number") {
        if (numericParamOrError > 0) {
            const body: playerObject = req.body;

            playerService.updatePlayersGuildById({
                id: numericParamOrError,
                name: body.name,
                rating: body.rating,
                guild: body.guild

            }, (req as AuthenticatedRequest).userData.userId)
                .then((result: playerObject) => {
                    return res.status(200).json(result);
                })
                .catch((error: systemError) => {
                    return ResponseHelper.handleError(res, error);
                });
        }
        else {

        }
    }
    else {
        return ResponseHelper.handleError(res, numericParamOrError);
    }
};

const addPlayer = async (req: Request, res: Response, next: NextFunction) => {
    const body: playerObject = req.body;

    playerService.addPlayer({
        id: NON_EXISTENT_ID,
        name: body.name,
        rating: body.rating,
        guild: body.guild
    }, (req as AuthenticatedRequest).userData.userId)
        .then((result: playerObject) => {
            return res.status(200).json(result);
        })
        .catch((error: systemError) => {
            return ResponseHelper.handleError(res, error);
        });
};

const deletePlayerById = async (req: Request, res: Response, next: NextFunction) => {
    const numericParamOrError: number | systemError = RequestHelper.ParseNumericInput(errorService, req.params.id)
    if (typeof numericParamOrError === "number") {
        if (numericParamOrError > 0) {
            playerService.deletePlayerById(numericParamOrError)
                .then(() => {
                    return res.sendStatus(200);
                })
                .catch((error: systemError) => {
                    return ResponseHelper.handleError(res, error);
                });
        }
        else {
            // TODO: Error handling
        }
    }
    else {
        return ResponseHelper.handleError(res, numericParamOrError);
    }
};

const deletePlayerByTitle = async (req: Request, res: Response, next: NextFunction) => {
    const title: string = req.params.title;
            playerService.deletePlayerByTitle(title)
                .then(() => {
                    return res.sendStatus(200).json(`${title} is removed`);
                })
                .catch((error: systemError) => {
                    return ResponseHelper.handleError(res, error);
                });
};

export default { getPlayers, getPlayerById, updatePlayersGuildById, addPlayer, deletePlayerById, deletePlayerByTitle};