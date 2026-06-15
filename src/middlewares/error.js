import httpStatus from "http-status"

const notFound = (req, res, next) => {
  res.status(httpStatus.NOT_FOUND).json({ message: "route not found" })

}

const handler = (error, req, res, next) => {

  res.status(error.code || httpStatus.BAD_REQUEST).json(error.message)

}


export default {
  notFound,
  handler
}