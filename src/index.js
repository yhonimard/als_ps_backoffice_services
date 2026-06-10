import express from "express"
import { PrismaClient } from "../prisma/generated/prisma";



async function init() {
  try {
    const port = 5000

    app.listen(port, () => {
      console.log("run on port :", port);

    })

    app.get("/", (req, res, next) => {
      res.json({ id: 1, chat: "hi" })
    })

  } catch (error) {
    console.log("Err : ", error);

    process.exit(1)

  }
}

init()