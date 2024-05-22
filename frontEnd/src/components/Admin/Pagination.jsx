// src/Pagination.js
import React from "react";

const Pagination = ({ totalPages, currentPage, onPageChange }) => {
  if (totalPages === 1) return null;

  const getVisiblePages = (totalPages, currentPage) => {
    if (totalPages <= 5) {
      return [...Array(totalPages).keys()].map((num) => num + 1);
    }

    if (currentPage <= 3) {
      return [1, 2, 3, 4, "...", totalPages];
    }

    if (currentPage >= totalPages - 2) {
      return [
        1,
        "...",
        totalPages - 3,
        totalPages - 2,
        totalPages - 1,
        totalPages,
      ];
    }

    return [
      1,
      "...",
      currentPage - 1,
      currentPage,
      currentPage + 1,
      "...",
      totalPages,
    ];
  };

  const visiblePages = getVisiblePages(totalPages, currentPage);

  return (
    <div className="flex justify-center mt-4">
      <button
        onClick={() => onPageChange(currentPage - 1)}
        disabled={currentPage === 1}
        className="mx-1 px-3 py-1 border bg-white text-primary disabled:opacity-50"
      >
        Previous
      </button>
      {visiblePages.map((page, index) =>
        typeof page === "number" ? (
          <button
            key={index}
            onClick={() => onPageChange(page)}
            className={`mx-1 px-3 py-1 border ${
              currentPage === page
                ? "bg-primary text-white"
                : "bg-white text-primary"
            }`}
          >
            {page}
          </button>
        ) : (
          <span
            key={index}
            className="mx-1 px-3   py-1 border bg-white text-primary"
          >
            {page}
          </span>
        )
      )}
      <button
        onClick={() => onPageChange(currentPage + 1)}
        disabled={currentPage === totalPages}
        className="mx-1 px-3 py-1 border bg-white text-primary disabled:opacity-50"
      >
        Next
      </button>
    </div>
  );
};

export default Pagination;
