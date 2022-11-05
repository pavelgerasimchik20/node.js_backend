import { Request, Response, NextFunction } from "express";
import { NON_EXISTENT_ID } from "../../constants";
import { RequestHelper } from "../../core/request.helper";
import { AuthenticatedRequest, playerObject, systemError } from "../../entities";
import { ResponseHelper } from "../../framework/response.helper";
import PlayerService from "../../modules/player/player.service";
class PlayerController {
  constructor() { }

  async getPlayers(req: Request, res: Response, next: NextFunction) {
    PlayerService.getPlayers()
      .then((result: playerObject[]) => {
        return res.status(200).json({
          players: result
        });
      })
      .catch((error: systemError) => {
        return ResponseHelper.handleError(res, error);
      });
  };

  async getPlayerById(req: Request, res: Response, next: NextFunction) {
    const numericParamOrError: number | systemError = RequestHelper.ParseNumericInput(req.params.id)
    if (typeof numericParamOrError === "number") {
      if (numericParamOrError > 0) {
        PlayerService.getPlayerById(numericParamOrError)
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

  async updatePlayersGuildById(req: Request, res: Response, next: NextFunction) {
    const numericParamOrError: number | systemError = RequestHelper.ParseNumericInput(req.params.id)
    if (typeof numericParamOrError === "number") {
      if (numericParamOrError > 0) {
        const body: playerObject = req.body;

        PlayerService.updatePlayersGuildById({
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

  async addPlayer(req: Request, res: Response, next: NextFunction) {
    const body: playerObject = req.body;

    PlayerService.addPlayer({
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

  async deletePlayerById (req: Request, res: Response, next: NextFunction) {
    const numericParamOrError: number | systemError = RequestHelper.ParseNumericInput(req.params.id)
    if (typeof numericParamOrError === "number") {
      if (numericParamOrError > 0) {
        PlayerService.deletePlayerById(numericParamOrError)
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

  async deletePlayerByTitle (req: Request, res: Response, next: NextFunction) {
    const title: string = req.params.title;
    PlayerService.deletePlayerByTitle(title)
      .then(() => {
        return res.sendStatus(200).json(`${title} is removed`);
      })
      .catch((error: systemError) => {
        return ResponseHelper.handleError(res, error);
      });
  };

}

export default new PlayerController();