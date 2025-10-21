import React from 'react';

const CATEGORY_OPTIONS = ['JavaScript', 'React', 'Node.js', 'MongoDB', 'Express', 'CSS', 'HTML'];

const ArticleForm = ({ form, onChange, onSubmit, onCancel, isEditing }) => (
    <div className="max-w-2xl mx-auto bg-white rounded-lg shadow-lg p-6 mt-8">
        <h2 className="text-2xl font-bold text-gray-800 mb-6">
            {isEditing ? 'Edit Article' : 'Create New Article'}
        </h2>
        <div className="space-y-4">
            <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Title</label>
                <input
                    type="text"
                    value={form.title}
                    onChange={(event) => onChange('title', event.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
            </div>
            <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Category</label>
                <select
                    value={form.category}
                    onChange={(event) => onChange('category', event.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                    {CATEGORY_OPTIONS.map((category) => (
                        <option key={category} value={category}>
                            {category}
                        </option>
                    ))}
                </select>
            </div>
            <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Tags (comma-separated)</label>
                <input
                    type="text"
                    value={form.tags}
                    onChange={(event) => onChange('tags', event.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="react, hooks, frontend"
                />
            </div>
            <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Content</label>
                <textarea
                    value={form.content}
                    onChange={(event) => onChange('content', event.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 h-40"
                />
            </div>
            <div className="flex space-x-4">
                <button
                    onClick={onSubmit}
                    className="bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 transition-colors"
                >
                    {isEditing ? 'Update Article' : 'Create Article'}
                </button>
                <button
                    onClick={onCancel}
                    className="bg-gray-500 text-white py-2 px-4 rounded-md hover:bg-gray-600 transition-colors"
                >
                    Cancel
                </button>
            </div>
        </div>
    </div>
);

export default ArticleForm;
