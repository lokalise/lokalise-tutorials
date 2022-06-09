import { ApplicationController } from "./applicationController.js"

export class StaticPagesController extends ApplicationController { 
  static index(req, res) {
    this.renderView(req, res, 'static_pages/index', {
      title: 'Lokalise OAuth 2',
      authUrl: ApplicationController.lokaliseOAuth2().auth(
        ["read_projects"],
        "http://localhost:3000/callback",
        "secret_state"
      )
    })
  }
}