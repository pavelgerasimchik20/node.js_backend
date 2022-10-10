import { query } from "express";
import { Connection, SqlClient, Error } from "msnodesqlv8";
import { ConnectionError } from "mssql";
import { DB_CONNECTION_STRING, ErrorCodes, General } from "../constants";
import { ErrorHelper } from "./error.helpers";

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
}