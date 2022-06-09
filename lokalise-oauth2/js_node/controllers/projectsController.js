import { LokaliseApiOAuth } from '@lokalise/node-api'
import { ApplicationController } from "./applicationController.js"

export class ProjectsController extends ApplicationController { 
  static async index(req, res) {
    const projects = await this._listProjects(req)
    
    this.renderView(req, res, 'projects/index', {projects: projects.items})
  }

  static async _listProjects(req) {
    try {
      const lokaliseApi = new LokaliseApiOAuth({ apiKey: req.session.accessToken })
      return await lokaliseApi.projects().list()
    } catch(e) {
      if (e.code === 401) {
        const response = await ApplicationController.lokaliseOAuth2().refresh(req.session.refreshToken)
        req.session.accessToken = response.access_token
        return this._listProjects(req)
      } else {
         throw e
      }
    }
  }
}