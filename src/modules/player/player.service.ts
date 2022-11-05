import * as _ from "underscore";
import { Queries } from "../../constants";
import { entityWithId, playerObject, systemError } from "../../entities";
import { Status } from "../../enums";
import { DateHelper } from "../../framework/date.helper";
import { SqlHelper } from "../../core/sql.helper";

interface playerDTO {
    id: number;
    player_name: string;
    create_date: Date;
    update_date: Date;
    create_user_id: number;
    update_user_id: number;
    status_id: number;
    rating: number;
    guild: number
}

interface IPlayerService {

    getPlayers(): Promise<playerObject[]>;
    getPlayerById(id: number): Promise<playerObject>;
    updatePlayersGuildById(playerObject: playerObject, userId: number): Promise<playerObject>;
    addPlayer(playerObject: playerObject, userId: number): Promise<playerObject>;
    deletePlayerById(id: number, userId: number): Promise<void>;
    deletePlayerByTitle(title: string): Promise<void>
}

class PlayerService implements IPlayerService {

    constructor() { }

    public getPlayers(): Promise<playerObject[]> {
        return new Promise<playerObject[]>((resolve, reject) => {
            const result: playerObject[] = [];

            SqlHelper.executeQueryArrayResult<playerDTO>( Queries.Players, Status.Active)
                .then((queryResult: playerDTO[]) => {
                    queryResult.forEach((playerDTO: playerDTO) => {
                        result.push(this.parseLocalBoardType(playerDTO));
                    });
                    resolve(result);
                })
                .catch((error: systemError) => {
                    reject(error);
                });
        });
    }

    public getPlayerById(id: number): Promise<playerObject> {
        return new Promise<playerObject>((resolve, reject) => {
            SqlHelper.executeQuerySingleResult<playerDTO>( Queries.PlayerById, id, Status.Active)
                .then((queryResult: playerDTO) => {
                    resolve(this.parseLocalBoardType(queryResult));
                })
                .catch((error: systemError) => {
                    reject(error);
                });
        });
    }

    public updatePlayersGuildById(playerObject: playerObject, userId: number): Promise<playerObject> {
        return new Promise<playerObject>((resolve, reject) => {
            const updateDate: Date = new Date();
            SqlHelper.executeQueryNoResult( Queries.UpdatePlayersGuildById, false, playerObject.guild, DateHelper.dateToString(updateDate), userId, playerObject.id, Status.Active)
                .then(() => {
                    resolve(playerObject);
                })
                .catch((error: systemError) => {
                    reject(error);
                });
        });
    }

    public addPlayer(playerObject: playerObject, userId: number): Promise<playerObject> {
        return new Promise<playerObject>((resolve, reject) => {
            const createDate: string = DateHelper.dateToString(new Date());
            SqlHelper.createNew( Queries.AddPlayer, playerObject, playerObject.name, createDate, createDate, userId, userId, Status.Active, playerObject.rating, playerObject.guild)
                .then((result: entityWithId) => {
                    resolve(result as playerObject);
                })
                .catch((error: systemError) => {
                    reject(error);
                });
        });
    }

    public deletePlayerById(id: number): Promise<void> {
        return new Promise<void>((resolve, reject) => {
            SqlHelper.executeQueryNoResult( Queries.DeletePlayerById, true, id, Status.Active)
                .then(() => {
                    resolve();
                })
                .catch((error: systemError) => {
                    reject(error);
                });
        });
    }

    public deletePlayerByTitle(title: string): Promise<void> {
        return new Promise<void>((resolve, reject) => {
            SqlHelper.executeQueryNoResult( Queries.DeletePlayerByTitle, true, `%${title}%`)
                .then(() => {
                    resolve();
                })
                .catch((error: systemError) => {
                    reject(error);
                });
        });
    }

    private parseLocalBoardType(local: playerDTO): playerObject {
        return {
            id: local.id,
            name: local.player_name,
            rating: local.rating,
            guild: local.guild,
        };
    }
}

export default new PlayerService();