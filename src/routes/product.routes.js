import { Router } from "express"
import AuthController from "../controller/auth.controller"
import AuthService from "../services/auth.service"
import { API_CREATE_PRODUCT, API_GET_PRODUCT, API_GET_PRODUCT_CATEGORY } from "../fixtures/api"
import ProductService from "../services/product.service"
import ProductController from "../controller/product.controller"
import jwtVerify from "../middlewares/jwt-verify"

const routes = Router()
const service = ProductService()
const controller = ProductController(service)

routes.route(API_GET_PRODUCT_CATEGORY).get(jwtVerify, controller.getProductCategory)


routes.route(API_GET_PRODUCT).get(jwtVerify, controller.getProduct)


routes.route(API_CREATE_PRODUCT).post(jwtVerify, controller.createProduct)




const productRoutes = routes
export default productRoutes
