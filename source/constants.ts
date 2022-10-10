export class ErrorCodes {
    public static ConnectionError: number = 100;
    public static queryError: number = 101;
}

export class General {
    public static DbconnectionError: string = "DB server connection error";
    public static SqlQueryError: string = "Incorrect query";
}

export const DB_CONNECTION_STRING: string = "server=.;Database=guild_battle_game;Trusted_Connection=Yes;Driver={SQL Server Native Client 11.0}";

export class Queries {
    public static Guilds: string = "SELECT * FROM guild";
    public static GuildById: string = "SELECT * FROM guild WHERE guild_id =";
    public static INSERT: string = "INSERT INTO guild (guild_name, guild_description, guild_default_strong) VALUES (";
}
