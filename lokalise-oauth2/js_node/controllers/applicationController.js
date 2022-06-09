import { LokaliseAuth } from '@lokalise/node-api'

export class ApplicationController {
  static renderView(_req, res, view, data = {}) {
    res.render(view, data)
  }
  
  static lokaliseOAuth2() {
    return new LokaliseAuth(process.env.OAUTH2_CLIENT_ID, process.env.OAUTH2_CLIENT_SECRET)
  }
}