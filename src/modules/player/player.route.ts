import { RouteConfig } from "../../framework/route.config"
import express, { Application, Request, Response } from "express"
import PlayerController from "./player.controller"

export class PlayerRoutes extends RouteConfig {
  constructor(app: Application) {
    super(app, "PlayerRoutes")
  }
  public configureRoutes() {
    this.app.route(`/player/get_players`).get([PlayerController.getPlayers]);
    this.app.route(`/player/get_player/:id`).get([PlayerController.getPlayerById]);
    this.app.route(`/player/update_players_guild/:id`).put([PlayerController.updatePlayersGuildById]);
    this.app.route(`/player/create_player`).post([PlayerController.addPlayer]);
    this.app.route(`/player/delete_by_id/:id`).delete([PlayerController.deletePlayerById]);
    this.app.route(`/player/delete_by_title/:title`).delete([PlayerController.deletePlayerByTitle]);
    return this.app
  }
}