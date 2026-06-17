import ApiUnauthorizedError from "../exceptions/ApiUnauthorizedError"
import ApiBadResponse from "../exceptions/ApiBadResponse"
import jwt from "jsonwebtoken"
import prisma from "../lib/prisma"
import config from "../config"
import httpstatus from "http-status"

const jwtVerify = async (req, res, next) => {
  try {
    const { jwtKey } = config("/")
    const token = req.headers?.authorization?.split(" ")[1]
    if (!token) return next(new ApiUnauthorizedError())
    const { username, id } = jwt.verify(token, jwtKey)


    const user = await prisma.user.findUnique({
      where: {
        id: id
      }
    })
    if (!user) throw new ApiUnauthorizedError()

    req.user = { id, username }
    next()
  } catch (error) {
    return next(new ApiBadResponse(error.message || "unauthorized", error.code || httpstatus.UNAUTHORIZED))
  }
}

export default jwtVerify