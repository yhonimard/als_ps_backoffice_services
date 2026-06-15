import { Router } from "express"
import AuthController from "../controller/auth.controller"
import AuthService from "../services/auth.service"
import { API_AUTH_LOGIN, API_AUTH_SIGNUP } from "../fixtures/api"

const routes = Router()
const service = AuthService()
const controller = AuthController(service)


routes.route(API_AUTH_SIGNUP).post(controller.signUp)
routes.route(API_AUTH_LOGIN).post(controller.login)




const authRoutes = routes
export default authRoutes
