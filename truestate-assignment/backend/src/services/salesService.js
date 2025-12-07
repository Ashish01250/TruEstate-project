const Sale = require("../models/Sale");
const { buildSalesQuery, buildSort } = require("../utils/queryBuilder");

async function getSales(queryParams) {
  const { page = 1, limit = 10, sortBy, sortOrder, ...filters } = queryParams;

  const pageNum = Math.max(parseInt(page, 10) || 1, 1);
  const limitNum = Math.max(parseInt(limit, 10) || 10, 1);

  const query = buildSalesQuery(filters);
  const sort = buildSort(sortBy, sortOrder);

  const [data, total] = await Promise.all([
    Sale.find(query)
      .sort(sort)
      .skip((pageNum - 1) * limitNum)
      .limit(limitNum),
    Sale.countDocuments(query),
  ]);

  return {
    data,
    page: pageNum,
    limit: limitNum,
    total,
    totalPages: Math.ceil(total / limitNum),
  };
}

module.exports = { getSales };
