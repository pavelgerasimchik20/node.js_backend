export class SqlParameters {
    public static Id: string = "id";
}
export class Queries {
    public static Guilds: string = "SELECT * FROM guild WHERE status_id = ?";
    public static GuildById: string = "SELECT * FROM guild WHERE guild_id = ? AND status_id = ?";
    public static UpdateGuildStrenghById: string = "UPDATE guild SET guild_default_strong = ? WHERE id = ? AND status_id = ?";

    public static Players: string = "SELECT * FROM player WHERE status_id = ?";
    public static PlayerById: string = "SELECT * FROM player WHERE id = ?";
    public static UpdatePlayersGuildById: string = "UPDATE player SET guild_id = ?, update_date = ?, update_user_id = ? WHERE id = ? AND status_id = ?";
    public static AddPlayer: string = "INSERT player (player_name, create_date, update_date, create_user_id, update_user_id, status_id, rating, guild_id ) VALUES (?, ?, ?, ?, ?, ?, ?, ?)";
    public static DeletePlayerById: string = "DELETE FROM player WHERE id = ? AND status_id = ?";
    public static DeletePlayerByTitle: string = "DELETE FROM player WHERE player_name LIKE ?";

    public static SelectIdentity: string = "SELECT SCOPE_IDENTITY() AS id;";

    public static GetUserByLogin: string = "SELECT id, password, role_id FROM [user] WHERE login = ?";
    public static UpdateUserById: string = "UPDATE [user] SET first_name = ?, last_name = ?, update_date = ?, update_user_id = ? WHERE id = ? AND status_id = ?";
    public static AddUser: string = "INSERT [user] (first_name, last_name, login, password, role_id, create_date, update_date, create_user_id, update_user_id, status_id) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)";
    public static DeleteUserById: string = "UPDATE [user] SET update_date = ?, update_user_id = ?, status_id = ? WHERE id = ? AND status_id = ?";
}

export const DB_CONNECTION_STRING: string = "server=.;Database=guild_battle_game;Trusted_Connection=Yes;Driver={ODBC Driver 17 for SQL Server}"; //SQL Server Native Client 11.0
export const NON_EXISTENT_ID: number = -1;
export const TOKEN_SECRET: string = "b8dc29d7-7711-4cd4-b54a-e21bf25dd253";