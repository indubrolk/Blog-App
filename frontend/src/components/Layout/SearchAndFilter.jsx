import React from 'react';
import { Search } from 'lucide-react';

const SearchAndFilter = ({
    searchTerm,
    onSearchChange,
    filterCategory,
    onFilterChange,
    categories,
    showUserArticles,
    onResetFilters,
    filteredCount,
}) => {
    const headingText = showUserArticles
        ? 'My Articles'
        : filterCategory !== 'all'
            ? filterCategory + ' Articles'
            : 'All Articles';

    const subheadingText = showUserArticles
        ? filteredCount + ' articles written by you'
        : filterCategory !== 'all'
            ? filteredCount + ' articles in ' + filterCategory
            : filteredCount + ' total articles';

    return (
        <div className="container mx-auto px-4 py-6 border-b border-gray-200">
            <div className="mb-4">
                <h2 className="text-2xl font-bold text-gray-800">{headingText}</h2>
                <p className="text-gray-600 text-sm">{subheadingText}</p>
            </div>

            <div className="flex flex-col md:flex-row gap-4 items-center justify-between">
                <div className="relative flex-1 max-w-md">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                    <input
                        type="text"
                        placeholder="Search articles..."
                        value={searchTerm}
                        onChange={(event) => onSearchChange(event.target.value)}
                        className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                </div>
                <div className="flex items-center space-x-4">
                    {!showUserArticles && (
                        <>
                            <label className="text-sm font-medium text-gray-700">Category:</label>
                            <select
                                value={filterCategory}
                                onChange={(event) => onFilterChange(event.target.value)}
                                className="px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                            >
                                {categories.map((category) => (
                                    <option key={category} value={category}>
                                        {category === 'all' ? 'All Categories' : category}
                                    </option>
                                ))}
                            </select>
                        </>
                    )}
                    {showUserArticles && (
                        <button
                            onClick={onResetFilters}
                            className="text-blue-600 hover:text-blue-800 text-sm font-medium"
                        >
                            View All Articles +
                        </button>
                    )}
                </div>
            </div>
        </div>
    );
};

export default SearchAndFilter;
