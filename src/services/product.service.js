import dayjs from "dayjs"
import ApiBadResponse from "../exceptions/ApiBadResponse"
import ApiConflictError from "../exceptions/ApiConflictError"
import errorHandle from "../exceptions/error-handle"
import prisma from "../lib/prisma"
import httpstatus from "http-status"
import paginationHelper from "../helper/pagination-helper"
import toPaginationHelper from "../helper/to-pagination-helper"

const ProductService = () => {

  const getProductCategory = async (data, user) => {
    const res = await prisma.category.findMany({ select: { id: true, name: true } })

    const mappedResult = res.map(d => ({
      ...d,
      categoryId: d.name
    }))

    return mappedResult
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


  const getProduct = async (query) => {
    try {

      const { skip, take } = paginationHelper(query)

      const { count, products } = await prisma.$transaction(async (tx) => {

        const products = await tx.productVariant.findMany({
          skip,
          take,
          select: {
            createdAt: true,
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


        const count = await prisma.product.count()
        return { products, count }
      })


      const mappedProduct = products.map(p => ({
        id: p.id,
        name: p.product.name,
        sku: p.sku,
        variant: p.name,
        category: p.product.category.name,
        price: Number(p.price),
        status: p.isActive,
        createdBy: p.createdByUser.username,
        createdDate: p.createdAt
      }))


      
      return toPaginationHelper(mappedProduct, count, query, "products")
      // return mappedProduct

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