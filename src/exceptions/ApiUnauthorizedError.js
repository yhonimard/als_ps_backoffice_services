import ApiBadResponse from "./ApiBadResponse";
import httpstatus from "http-status"

class ApiUnauthorizedError extends ApiBadResponse {
  constructor(message) {
    super("Unauthorized", httpstatus.UNAUTHORIZED)
  }
}

export default ApiUnauthorizedError