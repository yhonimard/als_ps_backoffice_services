const paginationHelper = (query) => {

  const pageSize = query.pageSize || 10
  const page = query.page || 1

  const take = Number(pageSize)

  const skip = (Number(page) - 1) * take

  return {
    take,
    skip
  }


}

export default paginationHelper