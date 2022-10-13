import { Connection, SqlClient, Error } from "msnodesqlv8";
import { guildObject } from "../entities";
import { ErrorCodes, General, DB_CONNECTION_STRING, Queries } from "../constants";
import { ErrorHelper } from "../helpers/error.helpers";
import { SqlHelper } from "../helpers/sql.helper";

export interface guildDTO {
    guild_id: number;
    guild_name: string;
    guild_description: string;
    guild_default_strong: number;
}

interface IGuildService {
    getGuilds(): Promise<guildObject[]>;
    getGuildById(id: number): Promise<guildObject>;
};

export class GuildService implements IGuildService {
    
    public getGuilds(): Promise<guildObject[]> {
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