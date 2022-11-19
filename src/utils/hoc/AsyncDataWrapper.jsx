import React from "react";
import { BarLoader } from "react-spinners";
import PropTypes from "prop-types";

function AsyncDataWrapper({
  loading,
  error,
  errorMsg = "Error something's wrong data not loaded !",
  isEmpty,
  emptyMsg = "Empty data nothing to display !",
  children,
  refetch = null,
}) {
  if (loading) return <Loader />;
  if (error) return <ErrorFetching errorMsg={errorMsg} refetch={refetch} />;
  if (isEmpty) return <EmptyData emptyMsg={emptyMsg} />;
  return <>{children}</>;
}
AsyncDataWrapper.propTypes = {
  loading: PropTypes.bool,
  error: PropTypes.bool,
  errorMsg: PropTypes.string,
  isEmpty: PropTypes.bool,
  emptyMsg: PropTypes.string,
  children: PropTypes.node,
  refetch: PropTypes.any,
};
export default AsyncDataWrapper;

function Loader() {
  return (
    <div className="flex justify-center">
      <div className="m-3">
        <div className="flex">
          <BarLoader width={"300"} color={"#556ee6"} loading={true} />
        </div>
        <div className="text-center pt-2">
          <span>Loading data ...</span>
        </div>
      </div>
    </div>
  );
}

function EmptyData({ emptyMsg }) {
  return (
    <div className="flex justify-center">
      <div
        className="flex items-center p-4 text-sm text-blue-700 bg-blue-100 rounded-lg"
        role="alert"
      >
        <svg
          aria-hidden="true"
          className="flex-shrink-0 inline w-5 h-5 mr-3"
          fill="currentColor"
          viewBox="0 0 20 20"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            fillRule="evenodd"
            d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z"
            clipRule="evenodd"
          />
        </svg>
        <span className="sr-only">Info</span>
        <div className="font-medium">{emptyMsg}</div>
      </div>
    </div>
  );
}
EmptyData.propTypes = {
  emptyMsg: PropTypes.string,
};

function ErrorFetching({ errorMsg, refetch }) {
  return (
    <div className="flex justify-center">
      <div
        className="flex items-center p-4 text-sm text-red-700 bg-red-100 rounded-lg"
        role="alert"
      >
        <svg
          aria-hidden="true"
          className="flex-shrink-0 inline w-5 h-5 mr-3"
          fill="currentColor"
          viewBox="0 0 20 20"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            fillRule="evenodd"
            d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z"
            clipRule="evenodd"
          />
        </svg>
        <span className="sr-only">Info</span>
        <div className="font-medium">{errorMsg}</div>

        {refetch && (
          <button
            onClick={refetch}
            type="button"
            className="ml-3 text-white bg-red-700 border border-red-700 hover:bg-red-500 hover:text-white focus:ring-4 focus:outline-none focus:ring-red-300 font-medium rounded-lg text-xs px-3 py-1.5 text-center"
          >
            Refresh
          </button>
        )}
      </div>
    </div>
  );
}
ErrorFetching.propTypes = {
  errorMsg: PropTypes.string,
  refetch: PropTypes.any,
};
