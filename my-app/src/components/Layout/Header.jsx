import React from 'react';
import { User, LogIn, LogOut, Search, Plus } from 'lucide-react';

const Header = ({
    user,
    articlesCount,
    userArticlesCount,
    showUserArticles,
    categories,
    currentCategory,
    isHomeView,
    onGoHome,
    onBrowseArticles,
    onSelectCategory,
    onShowUserArticles,
    onCreateArticle,
    onLoginClick,
    onRegisterClick,
    onLogout,
}) => {
    const categoriesWithoutAll = categories.filter((category) => category !== 'all');

    return (
        <header className="bg-gradient-to-r from-orange-500 to-gray-700 text-white shadow-lg sticky top-0 z-50">
            <div className="container mx-auto px-4">
                <div className="flex justify-between items-center py-4">
                    <div className="flex items-center space-x-2">
                        <div
                            className="cursor-pointer hover:opacity-90 transition-opacity"
                            onClick={onGoHome}
                        >
                            <h1 className="text-3xl font-bold">TechBlog</h1>
                            <p className="text-blue-200 text-sm">Modern Tech Articles and Tutorials</p>
                        </div>
                    </div>

                    <div className="flex items-center space-x-4">
                        {user ? (
                            <>
                                <div className="hidden md:flex items-center space-x-3">
                                    <div className="w-8 h-8 bg-white/20 rounded-full flex items-center justify-center">
                                        <User className="w-4 h-4" />
                                    </div>
                                    <div className="text-right">
                                        <p className="text-sm font-medium">{user.username}</p>
                                        <p className="text-xs text-blue-200">{user.email}</p>
                                    </div>
                                </div>
                                <button
                                    onClick={onLogout}
                                    className="bg-red-500/80 hover:bg-red-600 px-3 py-1.5 rounded-md transition-colors flex items-center text-sm"
                                >
                                    <LogOut className="w-4 h-4 mr-1" />
                                    Logout
                                </button>
                            </>
                        ) : (
                            <div className="flex space-x-2">
                                <button
                                    onClick={onLoginClick}
                                    className="bg-white/10 hover:bg-white/20 px-4 py-2 rounded-md transition-colors flex items-center text-sm"
                                >
                                    <LogIn className="w-4 h-4 mr-2" />
                                    Login
                                </button>
                                <button
                                    onClick={onRegisterClick}
                                    className="bg-white text-blue-600 hover:bg-gray-100 px-4 py-2 rounded-md transition-colors text-sm font-medium"
                                >
                                    Sign Up
                                </button>
                            </div>
                        )}
                    </div>
                </div>

                <nav className="border-t border-white/20 py-3">
                    <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-6">
                            <button
                                onClick={onBrowseArticles}
                                className="px-3 py-2 rounded-md text-sm font-medium transition-colors flex items-center "
                            >
                                <Search className="w-4 h-4 mr-2" />
                                Browse Articles
                            </button>

                            {categoriesWithoutAll.map((category) => (
                                <button
                                    key={category}
                                    onClick={() => onSelectCategory(category)}
                                    className="px-3 py-2 rounded-md text-sm font-medium transition-colors "
                                >
                                    {category}
                                </button>
                            ))}
                        </div>

                        <div className="flex items-center space-x-3">
                            {user && (
                                <>
                                    <button
                                        onClick={onShowUserArticles}
                                        className="px-3 py-2 rounded-md text-sm font-medium transition-colors flex items-center"
                                    >
                                        <User className="w-4 h-4 mr-1" />
                                        My Articles
                                    </button>
                                    <button
                                        onClick={onCreateArticle}
                                        className="bg-green-500/80 hover:bg-green-600 px-4 py-2 rounded-md transition-colors flex items-center text-sm font-medium"
                                    >
                                        <Plus className="w-4 h-4 mr-2" />
                                        Write Article
                                    </button>
                                </>
                            )}

                            <div className="flex items-center space-x-2 text-sm text-blue-200">
                                <span>{articlesCount} Articles</span>
                                {user && (
                                    <>
                                        <span>|</span>
                                        <span>{userArticlesCount} Yours</span>
                                    </>
                                )}
                            </div>
                        </div>
                    </div>
                </nav>
            </div>
        </header>
    );
};

export default Header;
