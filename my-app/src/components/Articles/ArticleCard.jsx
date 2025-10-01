import React from 'react';
import { User, Calendar, Tag, Edit3, Trash2 } from 'lucide-react';

const ArticleCard = ({ article, canEdit, onView, onEdit, onDelete }) => (
    <div className="bg-white rounded-lg shadow-lg p-6 hover:shadow-xl transition-shadow">
        <div className="flex justify-between items-start mb-4">
            <div className="flex-1">
                <h3
                    className="text-xl font-bold text-gray-800 mb-2 cursor-pointer hover:text-blue-600 transition-colors"
                    onClick={() => onView(article)}
                >
                    {article.title}
                </h3>
                <div className="flex items-center text-sm text-gray-600 mb-2">
                    <User className="w-4 h-4 mr-1" />
                    <span className="mr-4">{article.author}</span>
                    <Calendar className="w-4 h-4 mr-1" />
                    <span>{article.createdAt.toLocaleDateString()}</span>
                </div>
                <div className="flex items-center mb-3">
                    <Tag className="w-4 h-4 mr-1 text-blue-600" />
                    <span className="text-sm bg-blue-100 text-blue-800 px-2 py-1 rounded-full mr-2">
                        {article.category}
                    </span>
                </div>
            </div>
            {canEdit && (
                <div className="flex space-x-2 ml-4">
                    <button
                        onClick={() => onEdit(article)}
                        className="p-2 text-blue-600 hover:bg-blue-100 rounded-full transition-colors"
                    >
                        <Edit3 className="w-4 h-4" />
                    </button>
                    <button
                        onClick={() => onDelete(article.id)}
                        className="p-2 text-red-600 hover:bg-red-100 rounded-full transition-colors"
                    >
                        <Trash2 className="w-4 h-4" />
                    </button>
                </div>
            )}
        </div>
        <p className="text-gray-700 mb-4">{article.excerpt}</p>
        <div className="flex flex-wrap gap-2">
            {article.tags.map((tag) => (
                <span key={tag} className="text-xs bg-gray-200 text-gray-700 px-2 py-1 rounded-full">
                    #{tag}
                </span>
            ))}
        </div>
    </div>
);

export default ArticleCard;
