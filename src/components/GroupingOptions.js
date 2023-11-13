import React from 'react';

const GroupingOptions = ({ onGroupingChange }) => {
  return (
    <div className="grouping-options">
      <label htmlFor="groupingSelect">Group By:</label>
      <select
        id="groupingSelect"
        onChange={(e) => onGroupingChange(e.target.value)}
      >
        <option value="status">Status</option>
        <option value="user">User</option>
        <option value="priority">Priority</option>
      </select>
    </div>
  );
};

export default GroupingOptions;

