import { Connection, SqlClient, Error } from "msnodesqlv8";
import { playerObject } from "../entities";
import { ErrorCodes, General, DB_CONNECTION_STRING, Queries } from "../constants";
import { ErrorHelper } from "../helpers/error.helpers";
import { SqlHelper } from "../helpers/sql.helper";

export interface playerDTO {
    player_id: number;
    player_name: string;
    player_rating: number;
    player_guild: number;
}

interface IPlayerService {
    getPlayers(): Promise<playerObject[]>;
    getGuildById(id: number): Promise<playerObject>;
    insertNewGuild(newObject: playerDTO): Promise<playerObject>;
    updateGuildById(id: number): Promise<playerObject>;
    deleteGuildById(id: number): Promise<playerObject>;
};

export class PlayerService implements IPlayerService {
    // insertNewGuild(obj: guildDTO): Promise<guildObject> {
    //     let result: guildObject;
    //     return new Promise<guildObject>((resolve, reject) => {
    //         const sql: SqlClient = require("msnodesqlv8");
    //         const connectionString: string = DB_CONNECTION_STRING;
    //         const query: string = `${Queries.INSERT}  '${obj.guild_name}', '${obj.guild_description}', ${obj.guild_default_strong})`;
    //         sql.open(connectionString, (connectionError: Error, connection: Connection) => {
    //             if (connectionError) {
    //                 reject(ErrorHelper.parseError(ErrorCodes.ConnectionError, General.DbconnectionError));
    //             }
    //             else {
    //                 connection.query(`${query}`, (queryError: Error | undefined, queryResult: guildDTO[] | undefined) => {
    //                     if (queryError) {
    //                         reject(ErrorHelper.parseError(ErrorCodes.queryError, General.SqlQueryError));
    //                     }
    //                     else {
    //                         if (queryResult !== undefined && queryResult.length === 1) {
    //                             result = this.parseDtoToEntity(queryResult[0])
    //                         }
    //                         else if (queryResult !== undefined && queryResult.length === 0) {
    //                             //TO DO: Not Found 
    //                         }
    //                         resolve(result);
    //                     }
    //                 })
    //             }
    //         });
    //     });
    // }
    insertNewGuild(id: guildDTO ): Promise<guildObject> {
        throw new Error("Method not implemented.");
    }
    updateGuildById(id: number): Promise<guildObject> {
        throw new Error("Method not implemented.");
    }
    deleteGuildById(id: number): Promise<guildObject> {
        throw new Error("Method not implemented.");
    }

    public getPlayers(): Promise<guildObject[]> {
        return new Promise<guildObject[]>((resolve, reject) => {
            const sql: SqlClient = require("msnodesqlv8");

            const connectionString: string = DB_CONNECTION_STRING;
            const query: string = Queries.Guilds;

            sql.open(connectionString, (connectionError: Error, connection: Connection) => {
                if (connectionError) {
                    reject(ErrorHelper.parseError(ErrorCodes.ConnectionError, General.DbconnectionError));
                }
                else {
                    connection.query(query, (queryError: Error | undefined, queryResult: guildDTO[] | undefined) => {
                        if (queryError) {
                            reject(ErrorHelper.parseError(ErrorCodes.queryError, General.SqlQueryError));
                        }
                        else {
                            const result: guildObject[] = [];
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

    public getGuildById(id: number): Promise<guildObject> {
        let result: guildObject;
        return new Promise<guildObject>((resolve, reject) => {
            const query: string = Queries.GuildById;
            SqlHelper.openConnection()
                .then((connection: Connection) => {
                    connection.query(`${query} ${id}`, (queryError: Error | undefined, queryResult: guildDTO[] | undefined) => {
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

    private parseDtoToEntity(local: guildDTO): guildObject {
        return {
            id: local.guild_id,
            name: local.guild_name,
            description: local.guild_description,
            strengh: local.guild_default_strong
        }
    }
}