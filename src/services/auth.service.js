import prisma from "../lib/prisma"
import ApiBadResponse from "../exceptions/ApiBadResponse"
import ApiUnauthorizedError from "../exceptions/ApiUnauthorizedError"
import ApiConflictError from "../exceptions/ApiConflictError"
import bcrypt from "bcryptjs"
import config from "../config"
import jwt from "jsonwebtoken"
import errorHandle from "../exceptions/error-handle"

const AuthService = () => {
  const { bcrypt: { salt }, jwtKey } = config("/")

  const signUp = async (data) => {

    try {
      const IsUserExist = await prisma.user.findFirst({
        where: {
          username: data.username
        }
      })

      if (IsUserExist) throw new ApiConflictError("user already exists")

      const signData = {
        username: data.username,
        password: await bcrypt.hash(data.password, 6),
        role: "MANAGER"
      }

      await prisma.user.create({ data: signData })

    } catch (error) {
      throw errorHandle(error)
    }

  }
  const login = async (data) => {
    try {

      const user = await prisma.user.findUnique({
        where: {
          username: data.username
        }
      })


      if (!user) throw new ApiUnauthorizedError()

      const isValidPassword = await bcrypt.compare(data.password, user.password)

      if (!isValidPassword) throw new ApiUnauthorizedError()

      const token = jwt.sign({ id: user.id, username: user.username }, jwtKey)
      delete user.password;

      const res = {
        id: user.id,
        username: user.username,
        role: user.role,
        token,
      }
      return res

    } catch (error) {
      throw errorHandle(error)
    }
  }



  return {
    login,
    signUp
  }
}

export default AuthService