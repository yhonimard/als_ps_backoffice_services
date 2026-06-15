import ApiBadResponse from "./ApiBadResponse";
import httpstatus from "http-status"

class ApiConflictError extends ApiBadResponse {
  constructor(message) {
    super(message, httpstatus.CONFLICT)
    
  }
}

export default ApiConflictError