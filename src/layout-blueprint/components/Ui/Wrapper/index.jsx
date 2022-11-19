import React from "react";
import PropTypes from "prop-types";

function Wrapper({ title, children }) {
  return (
    <div>
      <h1 className="text-2xl font-bold">{title}</h1>
      <div className="mt-3">{children}</div>
    </div>
  );
}

Wrapper.propTypes = {
  title: PropTypes.string,
  children: PropTypes.node,
};
export default Wrapper;
