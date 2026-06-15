

const AuthController = (service) => {

  const signUp = async (req, res, next) => {
    try {

      await service.signUp(req.body)
      res.json({ message: 'signup succeed' })
    } catch (error) {
      return next(error)
    }

  }


  const login = async (req, res, next) => {
    try {
      const response = await service.login(req.body)
      res.json(response)
    } catch (error) {
      return next(error)
    }

  }




  return {
    login,
    signUp
  }

}

export default AuthController
