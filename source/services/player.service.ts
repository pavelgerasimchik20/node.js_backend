import { Connection, SqlClient, Error } from "msnodesqlv8";
import { playerObject } from "../entities";
import { ErrorCodes, General, DB_CONNECTION_STRING, Queries } from "../constants";
import { ErrorHelper } from "../helpers/error.helpers";
import { SqlHelper } from "../helpers/sql.helper";
import { DateHelper } from "../helpers/date.helper";

export interface playerDTO {
    player_id: number;
    player_name: string;
    player_rating: number;
    player_guild: number;
}

interface IPlayerService {
    getPlayers(): Promise<playerObject[]>;
    getPlayerById(id: number): Promise<playerObject>;
    addPlayer(newObject: playerDTO): Promise<playerObject>;
    updatePlayerById(id: number): Promise<playerObject>;
    deletePlayerById(id: number): Promise<playerObject>;
};

export class PlayerService implements IPlayerService {
    
    addPlayer(newObject: playerDTO, userId: number ): Promise<playerObject> {
            return new Promise<playerObject>((resolve, reject) => {
                const createDate: string = DateHelper.dateToString(new Date());
                SqlHelper.createNew(this._errorService, Queries.AddWhiteBoardType, whiteBoardType, whiteBoardType.type, createDate, createDate, userId, userId, Status.Active)
                    .then((result: entityWithId) => {
                        resolve(result as whiteBoardType);
                    })
                    .catch((error: systemError) => {
                        reject(error);
                    });
            });
        
    }
    updatePlayerById(id: number): Promise<playerObject> {
        throw new Error("Method not implemented.");
    }
    deletePlayerById(id: number): Promise<playerObject> {
        throw new Error("Method not implemented.");
    }

    public getPlayers(): Promise<playerObject[]> {
        return new Promise<playerObject[]>((resolve, reject) => {
            const sql: SqlClient = require("msnodesqlv8");

            const connectionString: string = DB_CONNECTION_STRING;
            const query: string = Queries.Players;

            sql.open(connectionString, (connectionError: Error, connection: Connection) => {
                if (connectionError) {
                    reject(ErrorHelper.parseError(ErrorCodes.ConnectionError, General.DbconnectionError));
                }
                else {
                    connection.query(query, (queryError: Error | undefined, queryResult: playerDTO[] | undefined) => {
                        if (queryError) {
                            reject(ErrorHelper.parseError(ErrorCodes.queryError, General.SqlQueryError));
                        }
                        else {
                            const result: playerObject[] = [];
                            if (queryResult !== undefined) {
                                queryResult.forEach(guildDto => {
                                    result.push(
                                        this.parseDtoToEntity(guildDto)
                                    )
                                });
                            }
                            resolve(result);
                        }
                    })
                }
            });
        })
    };

    public getPlayerById(id: number): Promise<playerObject> {
        let result: playerObject;
        return new Promise<playerObject>((resolve, reject) => {
            const query: string = Queries.PlayerById;
            SqlHelper.openConnection()
                .then((connection: Connection) => {
                    connection.query(`${query} ${id}`, (queryError: Error | undefined, queryResult: playerDTO[] | undefined) => {
                        if (queryError) {
                            reject(ErrorHelper.parseError(ErrorCodes.queryError, General.SqlQueryError));
                        }
                        else {
                            if (queryResult !== undefined && queryResult.length === 1) {
                                result = this.parseDtoToEntity(queryResult[0])
                            }
                            else if (queryResult !== undefined && queryResult.length === 0) {
                                //TO DO: Not Found 
                            }
                            resolve(result);
                        }
                    })
                }).catch();
        });
    };

    private parseDtoToEntity(local: playerDTO): playerObject {
        return {
            id: local.player_id,
            name: local.player_name,
            rating: local.player_rating,
            guild: local.player_guild
        }
    }
}