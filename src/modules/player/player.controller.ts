import { Request, Response, NextFunction } from "express";

class PlayerController {
  constructor() {}

  async getPlayers(req: Request, res: Response, next: NextFunction) {
    return res.status(200).json({
        success: true, 
      players: [
        {
          name: "Inna",
        },
        {
          name: "Pavel",
        },
      ]
    })
    //console.log("User data: ", (req as AuthenticatedRequest).userData);
    // playerService.getPlayers()
    //     .then((result: playerObject[]) => {
    //         return res.status(200).json({
    //             players: result
    //         });
    //     })
    //     .catch((error: systemError) => {
    //         return ResponseHelper.handleError(res, error);
    //     });
};
  
}

export default new PlayerController();