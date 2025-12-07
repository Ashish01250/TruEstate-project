function SortDropdown({ sort, onChange }) {
  function handleFieldChange(e) {
    onChange({ ...sort, sortBy: e.target.value });
  }

  function handleOrderChange(e) {
    onChange({ ...sort, sortOrder: e.target.value });
  }

  return (
    <div className="sort-dropdown">
      <label className="label sort-label">Sort by</label>
      <select
        className="select sort-select"
        value={sort.sortBy}
        onChange={handleFieldChange}
      >
        <option value="date">Date</option>
        <option value="quantity">Quantity</option>
        <option value="customerName">Customer name</option>
      </select>
      <select
        className="select sort-select"
        value={sort.sortOrder}
        onChange={handleOrderChange}
      >
        <option value="desc">Descending</option>
        <option value="asc">Ascending</option>
      </select>
    </div>
  );
}

export default SortDropdown;
