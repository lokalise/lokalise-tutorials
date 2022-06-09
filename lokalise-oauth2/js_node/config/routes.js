import express from "express"

import { StaticPagesController } from "../controllers/staticPagesController.js"
import { CallbacksController } from "../controllers/callbacksController.js"
import { ProjectsController } from "../controllers/projectsController.js"

export const router = express.Router()

router.get('/', (req, res) => {
  StaticPagesController.index(req, res)
})

router.get('/callback', (req, res) => {
  CallbacksController.index(req, res)
})

router.get('/projects', (req, res) => {
  ProjectsController.index(req, res)
})