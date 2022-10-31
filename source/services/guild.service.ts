import * as _ from "underscore";
import { Queries } from "../constants";
import { entityWithId, systemError, guildObject } from "../entities";
import { Status } from "../enums";
import { DateHelper } from "../helpers/date.helper";
import { SqlHelper } from "../helpers/sql.helper";
import { ErrorService } from "./error.service";

interface guildDTO {
    guild_id: number;
    guild_name: string;
    guild_description: string;
    guild_default_strong: number;
    create_date: Date;
    update_date: Date;
    create_user_id: number;
    update_user_id: number;
    status_id: Status
}

interface IGuildService {
    getGuilds(): Promise<guildObject[]>;
    getGuildById(id: number): Promise<guildObject>;
    updateGuildStrenghById(guildObject: guildObject, userId: number): Promise<guildObject>;
}

export class GuildService implements IGuildService {

    private _errorService: ErrorService;

    constructor(
        private errorService: ErrorService
    ) {
        this._errorService = errorService;
    }

    public getGuilds(): Promise<guildObject[]> {
        return new Promise<guildObject[]>((resolve, reject) => {
            const result: guildObject[] = [];

            SqlHelper.executeQueryArrayResult<guildDTO>(this._errorService, Queries.Guilds, Status.Active)
                .then((queryResult: guildDTO[]) => {
                    queryResult.forEach((whiteBoardType: guildDTO) => {
                        result.push(this.parseToObject(whiteBoardType));
                    });
                    
                    resolve(result);
                })
                .catch((error: systemError) => {
                    reject(error);
                });
        });
    }

    public getGuildById(id: number): Promise<guildObject> {
        return new Promise<guildObject>((resolve, reject) => {
            SqlHelper.executeQuerySingleResult<guildDTO>(this._errorService, Queries.GuildById, id, Status.Active)
                .then((queryResult: guildDTO) => {
                    resolve(this.parseToObject(queryResult));
                })
                .catch((error: systemError) => {
                    reject(error);
                });
        });
    }

    public updateGuildStrenghById(guildObject: guildObject, userId: number): Promise<guildObject> {
        return new Promise<guildObject>((resolve, reject) => {
            const updateDate: Date = new Date();
            SqlHelper.executeQueryNoResult(this._errorService, Queries.UpdateGuildStrenghById, false, guildObject.strengh, DateHelper.dateToString(updateDate), userId, guildObject.id, Status.Active)
                .then(() => {
                    resolve(guildObject);
                })
                .catch((error: systemError) => {
                    reject(error);
                });
        });
    }
 
    private parseToObject(local: guildDTO): guildObject {
        return {
            id: local.guild_id,
            name: local.guild_name,
            description: local.guild_description,
            strengh: local.guild_default_strong
        }
    }
}