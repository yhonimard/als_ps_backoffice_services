import config from "./config";
import express from "express"
import cors from "cors"
import routes from "./routes";
import error from "./middlewares/error";
import morgan from "morgan"
require("dotenv").config()



async function init() {
  try {
    const { port } = config("/")
    const app = express()

    app.use(cors())
    app.use(express.json())

    if (process.env.NODE_ENV = "dev") app.use(morgan("dev"))

    app.use("/api", routes)

    app.use(error.notFound)
    app.use(error.handler)

    app.listen(port, () => {
      console.log("run on port :", port);
    })


  } catch (error) {
    console.log("Err : ", error);
    process.exit(1)
  }
}

init()