import { Router } from "express"
import authRoutes from "./auth.routes"
import productRoutes from "./product.routes"


const routes = Router()

routes.use(authRoutes)
routes.use(productRoutes)

export default routes









