import ApiBadResponse from "./ApiBadResponse"

const errorHandle =(error)=>{
  let err;
  
  console.log(error.code);
  
  err = new ApiBadResponse(error.message, error.code)
  return err
}

export default errorHandle