const BASE_URL = import.meta.env.VITE_API_URL || "http://localhost:4000/api";

export async function fetchSales({ search, filters, sort, page, limit }) {
  const params = new URLSearchParams();

  if (search) params.append("search", search);
  if (filters.region) params.append("region", filters.region);
  if (filters.gender) params.append("gender", filters.gender);
  if (filters.productCategory)
    params.append("productCategory", filters.productCategory);
  if (filters.paymentMethod)
    params.append("paymentMethod", filters.paymentMethod);
  if (filters.tags) params.append("tags", filters.tags);
  if (filters.ageMin) params.append("ageMin", filters.ageMin);
  if (filters.ageMax) params.append("ageMax", filters.ageMax);
  if (filters.dateFrom) params.append("dateFrom", filters.dateFrom);
  if (filters.dateTo) params.append("dateTo", filters.dateTo);

  params.append("sortBy", sort.sortBy);
  params.append("sortOrder", sort.sortOrder);
  params.append("page", page);
  params.append("limit", limit);

  const res = await fetch(`${BASE_URL}/sales?${params.toString()}`);
  if (!res.ok) {
    throw new Error("Failed to fetch sales");
  }
  return res.json();
}
