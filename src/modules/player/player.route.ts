import { RouteConfig } from "../../framework/route.config"
import express, { Application, Request, Response } from "express"
import PlayerController from "./player.controller"

export class PlayerRoutes extends RouteConfig {
  constructor(app: Application) {
    super(app, "PlayerRoutes")
  }
  public configureRoutes() {
    this.app.route(`/player/get_players`).get([PlayerController.getPlayers])
    return this.app
  }
}