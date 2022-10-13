import { query } from "express";
import { Connection, SqlClient, Error } from "msnodesqlv8";
import { ConnectionError } from "mssql";
import { DB_CONNECTION_STRING, ErrorCodes, General } from "../constants";
import { ErrorHelper } from "./error.helpers";
import { entityWithId, systemError } from "../entities";

export class SqlHelper {

    static sql: SqlClient = require("msnodesqlv8");

    public static openConnection(): Promise<Connection> {
        return new Promise<Connection>((resolve, reject) => {

            SqlHelper.sql.open(DB_CONNECTION_STRING, (connectionError: Error, connection: Connection) => {
                if (connectionError) {
                    reject(ErrorHelper.parseError(ErrorCodes.ConnectionError, General.DbconnectionError));
                }
                else {
                    resolve(connection);
                }
            });
        });
    }

    public static executeQueryArrayResult<T> (connection: Connection, query: string ): Promise < T[] > {
        return new Promise< T[] >((resolve, reject) => {
            connection.query(query, (queryError: Error | undefined, queryResult: T[] | undefined) => {
                if (queryError) {
                    reject(ErrorHelper.parseError(ErrorCodes.queryError, General.SqlQueryError));
                }
                else {
                    if (queryResult !== undefined) {
                        resolve(queryResult);
                    }
                    else {
                        resolve([])
                    }
                }
            });
        });
    }

    public static createNew(errorService: ErrorService, query: string, original: entityWithId, ...params: (string | number)[]): Promise<entityWithId> {
        return new Promise<entityWithId>((resolve, reject) => {
            SqlHelper.openConnection(errorService)
                .then((connection: Connection) => {
                    const queries: string[] = [query, Queries.SelectIdentity];
                    const combinedQuery: string = queries.join(";");
                    let executionCounter: number = 0;
                    connection.query(combinedQuery, params, (queryError: Error | undefined, queryResult: entityWithId[] | undefined) => {
                        if (queryError) {
                            reject(errorService.getError(AppError.QueryError));
                        }
                        else {
                            executionCounter++; // executionCounter = executionCounter + 1;

                            if (executionCounter === queries.length) {
                                SqlHelper.treatInsertResult(errorService, original, queryResult, resolve, reject);
                            }
                        }
                    });
                })
                .catch((error: systemError) => {
                    reject(error);
                })
        });
    }
}