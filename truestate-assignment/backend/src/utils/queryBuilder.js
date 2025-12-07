function buildSalesQuery(params) {
  const {
    search,
    region,
    gender,
    ageMin,
    ageMax,
    productCategory,
    tags,
    paymentMethod,
    dateFrom,
    dateTo,
  } = params;

  const query = {};

  if (search && search.trim()) {
    const regex = new RegExp(search.trim(), "i");
    query.$or = [{ customerName: regex }, { phoneNumber: regex }];
  }

  if (region) {
    query.customerRegion = { $in: region.split(",") };
  }

  if (gender) {
    query.gender = { $in: gender.split(",") };
  }

  if (productCategory) {
    query.productCategory = { $in: productCategory.split(",") };
  }

  if (paymentMethod) {
    query.paymentMethod = { $in: paymentMethod.split(",") };
  }

  if (ageMin || ageMax) {
    query.age = {};
    if (ageMin) query.age.$gte = Number(ageMin);
    if (ageMax) query.age.$lte = Number(ageMax);
  }

  if (tags) {
    query.tags = { $in: tags.split(",") };
  }

  if (dateFrom || dateTo) {
    query.date = {};
    if (dateFrom) query.date.$gte = new Date(dateFrom);
    if (dateTo) {
      const end = new Date(dateTo);
      end.setHours(23, 59, 59, 999);
      query.date.$lte = end;
    }
  }

  return query;
}

function buildSort(sortBy = "date", sortOrder = "desc") {
  const order = sortOrder === "asc" ? 1 : -1;
  const sort = {};

  if (sortBy === "quantity") sort.quantity = order;
  else if (sortBy === "customerName") sort.customerName = order;
  else sort.date = order;

  return sort;
}

module.exports = { buildSalesQuery, buildSort };
