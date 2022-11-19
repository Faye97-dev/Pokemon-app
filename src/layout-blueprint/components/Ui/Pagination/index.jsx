import React from "react";
import PropTypes from "prop-types";

function Pagination({
  canNext,
  nextPageAction,
  canPrev,
  prevPageAction,
  page,
}) {
  return (
    <div className="mt-10 flex items-center">
      <span className="mr-4">Page : {page}</span>
      <a
        className={
          canPrev
            ? "inline-flex items-center px-3 py-2 mr-3 text-sm font-medium text-center text-white bg-blue-500 rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 "
            : "inline-flex items-center px-3 py-2 mr-3 text-sm font-medium text-gray-500 bg-white border border-gray-300 rounded-lg hover:bg-gray-100 hover:text-gray-700"
        }
        onClick={() => {
          if (canPrev) prevPageAction();
        }}
      >
        <svg
          aria-hidden="true"
          className="w-5 h-5 mr-2"
          fill="currentColor"
          viewBox="0 0 20 20"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            fillRule="evenodd"
            d="M7.707 14.707a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 1.414L5.414 9H17a1 1 0 110 2H5.414l2.293 2.293a1 1 0 010 1.414z"
            clipRule="evenodd"
          />
        </svg>
        Previous
      </a>
      <a
        onClick={() => {
          if (canNext) nextPageAction();
        }}
        className={
          canNext
            ? "inline-flex items-center px-3 py-2  text-sm font-medium text-center text-white bg-blue-500 rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 "
            : "inline-flex items-center px-3 py-2  text-sm font-medium text-gray-500 bg-white border border-gray-300 rounded-lg hover:bg-gray-100 hover:text-gray-700"
        }
      >
        Next
        <svg
          aria-hidden="true"
          className="w-5 h-5 ml-2"
          fill="currentColor"
          viewBox="0 0 20 20"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            fillRule="evenodd"
            d="M12.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-2.293-2.293a1 1 0 010-1.414z"
            clipRule="evenodd"
          />
        </svg>
      </a>
    </div>
  );
}

Pagination.propTypes = {
  canNext: PropTypes.bool,
  nextPageAction: PropTypes.func,
  canPrev: PropTypes.bool,
  prevPageAction: PropTypes.func,
  page: PropTypes.number,
};
export default Pagination;
