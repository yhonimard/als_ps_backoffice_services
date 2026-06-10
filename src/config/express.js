import express from "express"
import cors from "cors"
import morgan from "morgan"


const server = () => {


  const app = express()
  app.use(cors())
  app.use(express.json)

  if (process.env.NODE_ENV = "dev") app.use(morgan("dev"))


  return app
}


export default server
