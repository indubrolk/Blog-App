import React from 'react';
import { User, Calendar, Tag } from 'lucide-react';

const ArticleView = ({ article, onBack }) => (
    <div className="max-w-4xl mx-auto bg-white rounded-lg shadow-lg p-8 mt-8">
        <button
            onClick={onBack}
            className="mb-6 text-blue-600 hover:underline"
        >
            &lt; Back to articles
        </button>
        <h1 className="text-3xl font-bold text-gray-800 mb-4">{article.title}</h1>
        <div className="flex items-center text-sm text-gray-600 mb-6">
            <User className="w-4 h-4 mr-1" />
            <span className="mr-4">{article.author}</span>
            <Calendar className="w-4 h-4 mr-1" />
            <span className="mr-4">{article.createdAt.toLocaleDateString()}</span>
            <Tag className="w-4 h-4 mr-1" />
            <span className="bg-blue-100 text-blue-800 px-2 py-1 rounded-full">
                {article.category}
            </span>
        </div>
        <div className="prose max-w-none">
            <p className="text-gray-700 leading-relaxed whitespace-pre-wrap">{article.content}</p>
        </div>
        <div className="flex flex-wrap gap-2 mt-6 pt-6 border-t">
            {article.tags.map((tag) => (
                <span key={tag} className="text-sm bg-gray-200 text-gray-700 px-3 py-1 rounded-full">
                    #{tag}
                </span>
            ))}
        </div>
    </div>
);

export default ArticleView;
