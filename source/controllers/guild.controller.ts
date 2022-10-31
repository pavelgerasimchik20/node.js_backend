import { Request, Response, NextFunction } from 'express';
import { AuthenticatedRequest, systemError, guildObject } from '../entities';
import { RequestHelper } from '../helpers/request.helper';
import { ResponseHelper } from '../helpers/response.helper';
import { ErrorService } from '../services/error.service';
import { GuildService } from '../services/guild.service';

const errorService: ErrorService = new ErrorService();
const guildService: GuildService = new GuildService(errorService);

const getGuilds = async (req: Request, res: Response, next: NextFunction) => {
    console.log("User data: ", (req as AuthenticatedRequest).userData);
    guildService.getGuilds()
        .then((result: guildObject[]) => {
            return res.status(200).json({
                types: result
            });
        })
        .catch((error: systemError) => {
            return ResponseHelper.handleError(res, error);
        });
};

const getGuildById = async (req: Request, res: Response, next: NextFunction) => {
    const numericParamOrError: number | systemError = RequestHelper.ParseNumericInput(errorService, req.params.id)
    if (typeof numericParamOrError === "number") {
        if (numericParamOrError > 0) {
            guildService.getGuildById(numericParamOrError)
                .then((result: guildObject) => {
                    return res.status(200).json(result);
                })
                .catch((error: systemError) => {
                    return ResponseHelper.handleError(res, error);
                });
        }
    }
    else {
        return ResponseHelper.handleError(res, numericParamOrError);
    }
};

const updateGuildStrenghById = async (req: Request, res: Response, next: NextFunction) => {
    const numericParamOrError: number | systemError = RequestHelper.ParseNumericInput(errorService, req.params.id)
    if (typeof numericParamOrError === "number") {
        if (numericParamOrError > 0) {
            const body: guildObject = req.body;

            guildService.updateGuildStrenghById({
                id: numericParamOrError,
                name: body.name,
                description: body.description,
                strengh: body.strengh

            }, (req as AuthenticatedRequest).userData.userId)
                .then((result: guildObject) => {
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

export default { getGuilds, getGuildById, updateGuildStrenghById};