import React from "react";
import PropTypes from "prop-types";

function InputSelect({ valueState, label, name, emptyValue, items }) {
  const [value, setValue] = valueState;
  return (
    <div key={name}>
      <label
        htmlFor={name}
        className="block mb-2 text-sm font-medium text-gray-900"
      >
        {label}
      </label>
      <select
        id={name}
        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
        onChange={(e) => {
          setValue(e.target.value);
        }}
        value={value}
      >
        {emptyValue && <option value="">{emptyValue}</option>}
        {items.map((item) => {
          return (
            <option key={item.name} value={item.name}>
              {item?.label || item.name}
            </option>
          );
        })}
      </select>
    </div>
  );
}

InputSelect.propTypes = {
  valueState: PropTypes.array,
  label: PropTypes.string,
  name: PropTypes.string,
  emptyValue: PropTypes.string,
  items: PropTypes.array,
};
export default InputSelect;
