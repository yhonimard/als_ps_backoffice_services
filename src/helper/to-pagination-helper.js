const toPaginationHelper = (data, count, query, nameOfData) => {

  const page = Number(query.page) || 1
  const pageSize = Number(query.pageSize) || 10

  const isLast = page * pageSize >= count
  const totalPages = Math.ceil(count / pageSize)
  const totalData = count
  const dataResult = nameOfData || 'data'


  return {
    [dataResult]: data,
    page,
    pageSize,
    totalData,
    totalPages,
    isLast
  }

}

export default toPaginationHelper