function Pagination({ page, totalPages, total, limit, onPageChange }) {
  if (!totalPages || totalPages <= 1) {
    return (
      <div className="pagination">
        <span className="pagination-info">
          Showing {total} result{total === 1 ? "" : "s"}
        </span>
      </div>
    );
  }

  function goPrev() {
    if (page > 1) onPageChange(page - 1);
  }

  function goNext() {
    if (page < totalPages) onPageChange(page + 1);
  }

  const from = (page - 1) * limit + 1;
  const to = Math.min(page * limit, total);

  return (
    <div className="pagination">
      <span className="pagination-info">
        Showing {from}-{to} of {total}
      </span>
      <div className="pagination-controls">
        <button
          className="button button-secondary"
          onClick={goPrev}
          disabled={page === 1}
        >
          Previous
        </button>
        <span className="pagination-page">
          Page {page} of {totalPages}
        </span>
        <button
          className="button button-secondary"
          onClick={goNext}
          disabled={page === totalPages}
        >
          Next
        </button>
      </div>
    </div>
  );
}

export default Pagination;
