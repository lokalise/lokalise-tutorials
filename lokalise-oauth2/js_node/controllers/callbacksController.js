import { ApplicationController } from "./applicationController.js"

export class CallbacksController extends ApplicationController { 
  static async index(req, res) {
    const response = await ApplicationController.lokaliseOAuth2().token(req.query.code);
    req.session.accessToken = response.access_token
    req.session.refreshToken = response.refresh_token
    
    res.redirect('/projects')
  }
}