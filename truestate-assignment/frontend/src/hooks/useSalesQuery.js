import { useEffect, useState } from "react";
import { fetchSales } from "../services/api";

export default function useSalesQuery({ search, filters, sort, page, limit }) {
  const [data, setData] = useState([]);
  const [total, setTotal] = useState(0);
  const [totalPages, setTotalPages] = useState(0);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    let ignore = false;

    async function load() {
      try {
        setLoading(true);
        setError("");
        const res = await fetchSales({ search, filters, sort, page, limit });
        if (ignore) return;
        setData(res.data || []);
        setTotal(res.total || 0);
        setTotalPages(res.totalPages || 0);
      } catch (e) {
        if (ignore) return;
        setError(e.message || "Something went wrong");
        setData([]);
        setTotal(0);
        setTotalPages(0);
      } finally {
        if (!ignore) setLoading(false);
      }
    }

    load();

    return () => {
      ignore = true;
    };
  }, [search, JSON.stringify(filters), sort.sortBy, sort.sortOrder, page, limit]);

  return { data, total, totalPages, loading, error };
}
