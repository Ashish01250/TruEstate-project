
function SearchBar({ value, onChange }) {
  function handleChange(e) {
    onChange(e.target.value);
  }

  return (
    <div className="search-bar">
      <input
        className="input"
        type="text"
        placeholder="Search by customer name or phone"
        value={value}
        onChange={handleChange}
      />
    </div>
  );
}

export default SearchBar;
