import httpstatus from "http-status"

const ProductController = (service) => {

  const getProductCategory = async (req, res, next) => {
    try {
      const response = await service.getProductCategory(req.body, req.user)
      return res.json(response)
    } catch (error) {
      next(error)
    }
  }

  const createProduct = async (req, res, next) => {

    try {
      const response = await service.createProduct(req.body, req.user)
      return res.status(httpstatus.CREATED).json({ message: 'success' })
    } catch (error) {
      next(error)
    }
  }

  const getProduct = async (req,res,next)=>{
    try {
    const response = await service.getProduct(req.params)
    res.json(response)
    } catch (error) {
     next(error) 
    }
  }

  return {
    createProduct,
    getProductCategory,
    getProduct
  }
}

export default ProductController