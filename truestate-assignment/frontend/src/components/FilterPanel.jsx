import { useState, useEffect } from "react";

const regions = ["North", "South", "East", "West"];
const genders = ["Male", "Female", "Other"];
const categories = ["Electronics", "Fashion", "Groceries", "Beauty", "Home"];
const paymentMethods = ["Credit Card", "Debit Card", "UPI", "Net Banking", "Cash"];

function FilterPanel({ filters, onChange }) {
  const [local, setLocal] = useState(filters);

  useEffect(() => {
    setLocal(filters);
  }, [filters]);

  function updateField(field, value) {
    const next = { ...local, [field]: value };
    setLocal(next);
  }

  function applyFilters() {
    onChange(local);
  }

  function clearFilters() {
    const cleared = {
      region: "",
      gender: "",
      productCategory: "",
      paymentMethod: "",
      ageMin: "",
      ageMax: "",
      dateFrom: "",
      dateTo: "",
      tags: "",
    };
    setLocal(cleared);
    onChange(cleared);
  }

  return (
    <div className="filter-panel">
      <div className="filter-header">
        <h2 className="filter-title">Filters</h2>
        <button className="button button-text" onClick={clearFilters}>
          Clear all
        </button>
      </div>

      <div className="filter-group">
        <label className="label">Region</label>
        <select
          className="select"
          value={local.region}
          onChange={(e) => updateField("region", e.target.value)}
        >
          <option value="">All</option>
          {regions.map((r) => (
            <option key={r} value={r}>
              {r}
            </option>
          ))}
        </select>
      </div>

      <div className="filter-group">
        <label className="label">Gender</label>
        <select
          className="select"
          value={local.gender}
          onChange={(e) => updateField("gender", e.target.value)}
        >
          <option value="">All</option>
          {genders.map((g) => (
            <option key={g} value={g}>
              {g}
            </option>
          ))}
        </select>
      </div>

      <div className="filter-row">
        <div className="filter-group half">
          <label className="label">Age min</label>
          <input
            className="input"
            type="number"
            value={local.ageMin}
            onChange={(e) => updateField("ageMin", e.target.value)}
          />
        </div>
        <div className="filter-group half">
          <label className="label">Age max</label>
          <input
            className="input"
            type="number"
            value={local.ageMax}
            onChange={(e) => updateField("ageMax", e.target.value)}
          />
        </div>
      </div>

      <div className="filter-group">
        <label className="label">Product category</label>
        <select
          className="select"
          value={local.productCategory}
          onChange={(e) => updateField("productCategory", e.target.value)}
        >
          <option value="">All</option>
          {categories.map((c) => (
            <option key={c} value={c}>
              {c}
            </option>
          ))}
        </select>
      </div>

      <div className="filter-group">
        <label className="label">Payment method</label>
        <select
          className="select"
          value={local.paymentMethod}
          onChange={(e) => updateField("paymentMethod", e.target.value)}
        >
          <option value="">All</option>
          {paymentMethods.map((m) => (
            <option key={m} value={m}>
              {m}
            </option>
          ))}
        </select>
      </div>

      <div className="filter-group">
        <label className="label">Tags (comma separated)</label>
        <input
          className="input"
          type="text"
          placeholder="e.g. discount, premium"
          value={local.tags}
          onChange={(e) => updateField("tags", e.target.value)}
        />
      </div>

      <div className="filter-row">
        <div className="filter-group half">
          <label className="label">Date from</label>
          <input
            className="input"
            type="date"
            value={local.dateFrom}
            onChange={(e) => updateField("dateFrom", e.target.value)}
          />
        </div>
        <div className="filter-group half">
          <label className="label">Date to</label>
          <input
            className="input"
            type="date"
            value={local.dateTo}
            onChange={(e) => updateField("dateTo", e.target.value)}
          />
        </div>
      </div>

      <button className="button button-primary filter-apply" onClick={applyFilters}>
        Apply filters
      </button>
    </div>
  );
}

export default FilterPanel;
