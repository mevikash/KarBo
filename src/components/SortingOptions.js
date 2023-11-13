import React from 'react';

const SortingOptions = ({ onSortingChange }) => {
  return (
    <div className="sorting-options">
      <label htmlFor="sortingSelect">Sort By:</label>
      <select
        id="sortingSelect"
        onChange={(e) => onSortingChange(e.target.value)}
      >
        <option value="priority">Priority</option>
        <option value="title">Title</option>
      </select>
    </div>
  );
};

export default SortingOptions;

