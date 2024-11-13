import React from 'react';

type FilterType = 'all' | 'pending' | 'completed' | 'overdue';
type SortByType = 'dueDate' | 'priority';

interface FiltersProps {
  filter: FilterType;
  setFilter: (filter: FilterType) => void;
  sortBy: SortByType;
  setSortBy: (sortBy: SortByType) => void;
}

const Filters: React.FC<FiltersProps> = ({ filter, setFilter, sortBy, setSortBy }) => (
  <div className='w-full overflow-hidden py-3'>
    <div className=" overflow-scroll flex justify-between mb-6">
      <div className="flex space-x-2">
        {['all', 'pending', 'completed', 'overdue'].map((filterType) => (
          <button
            key={filterType}
            onClick={() => setFilter(filterType as FilterType)}
            className={`px-3 py-1 rounded-md text-sm ${
              filter === filterType ? 'bg-blue-500 text-white' : 'bg-gray-200 text-gray-700'
            }`}
          >
            {filterType.charAt(0).toUpperCase() + filterType.slice(1)} Todos
          </button>
        ))}
      </div>
      <div className="flex space-x-2 items-center text-gray-700">
        <span>Sort by:</span>
        <select
          value={sortBy}
          onChange={(e) => setSortBy(e.target.value as SortByType)}
          className="px-2 py-1 border rounded-md text-sm"
        >
          <option value="dueDate">Due Date</option>
          <option value="priority">Priority</option>
        </select>
      </div>
    </div>
  </div>
);

export default Filters;
