import ApiBadResponse from "../exceptions/ApiBadResponse"
import ApiConflictError from "../exceptions/ApiConflictError"
import errorHandle from "../exceptions/error-handle"
import prisma from "../lib/prisma"
import httpstatus from "http-status"

const ProductService = () => {

  const getProductCategory = async (data, user) => {
    const res = await prisma.category.findMany()
    return res
  }

  const createProductCategory = async (data, user) => {

  }


  const createProduct = async (data, user) => {
    try {

      const isProductExist = await prisma.product.findFirst({
        where: {
          name: data.name
        }
      })

      const isProductVariantExist = await prisma.productVariant.findFirst({
        where: {
          name: data.variantName
        }
      })

      if (isProductExist && isProductVariantExist) {
        throw new ApiConflictError("product already exist")
      }

      const isExistCategory = await prisma.category.findFirst({
        where: {
          name: data.categoryName
        },
      })

      if (!isExistCategory) {
        const newCategory = await prisma.category.create({
          data: {
            name: data.categoryName,
          }
        })

        const createdProduct = await prisma.product.create({
          data: {
            name: data.name,
            categoryId: newCategory.id,
            createdById: user.id,

            variant: {
              create: {
                name: data.variantName,
                price: data.price,
                sku: data.sku,
                createByUserId: user.id,
                isActive: data.isActive
              },
            }
          },
          include: { variant: true }
        })
        return createProduct
      }

      const createdProduct = await prisma.product.create({
        data: {
          name: data.name,
          categoryId: isExistCategory.id,
          createdById: user.id,

          variant: {
            create: {
              name: data.variantName,
              price: data.price,
              sku: data.sku,
              createByUserId: user.id,
              isActive: data.isActive
            },
          },

        },
        include: { variant: true }
      })

    }
    catch (error) {
      throw errorHandle(error)
    }

  }


  const getProduct = async (params) => {
    try {

      const products = await prisma.productVariant.findMany({
        select: {
          id: true,
          name: true,
          sku: true,
          price: true,
          isActive: true,
          createdByUser: {
            select: {
              id: true,
              username: true,
              name: true,
              role: true
            }
          },
          product: {
            select: {
              id: true,
              name: true,
              category: {
                select: {
                  id: true,
                  name: true,
                }
              }
            }
          }

        }
      })

      const mappedProduct = products.map(p => ({
        id: p.id,
        name: p.product.name,
        sku: p.sku,
        variant: p.name,
        category: p.product.category.name,
        price: Number(p.price),
        status: p.isActive,
        createdBy: p.createdByUser.username
      }))

      return mappedProduct

    } catch (error) {
      errorHandle(error)
    }

  }

  const createCategory = async (data) => {
    try {
      const existingCategory = await prisma.category.findFirst({
        where: {
          name: data.name
        }
      })

      if (existingCategory) throw new ApiConflictError(`Category "${data.name}" already exist`)

      await prisma.category.create({
        data: {
          name: data.name,
        }
      })

    } catch (error) {
      throw errorHandle(error)
    }
  }

  return {
    createProduct,
    getProductCategory,
    getProduct,
    createCategory
  }
}

export default ProductService