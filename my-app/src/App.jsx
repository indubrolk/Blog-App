import React, { useState, useEffect } from 'react';
import { User, Edit3, Trash2, Plus, LogIn, LogOut, Search, Calendar, Tag } from 'lucide-react';

const TechBlog = () => {
    // State management
    const [user, setUser] = useState(null);
    const [articles, setArticles] = useState([]);
    const [currentView, setCurrentView] = useState('home');
    const [selectedArticle, setSelectedArticle] = useState(null);
    const [searchTerm, setSearchTerm] = useState('');
    const [filterCategory, setFilterCategory] = useState('all');
    const [showUserArticles, setShowUserArticles] = useState(false);

    // Form states
    const [loginForm, setLoginForm] = useState({ email: '', password: '' });
    const [registerForm, setRegisterForm] = useState({ username: '', email: '', password: '' });
    const [articleForm, setArticleForm] = useState({
        title: '',
        content: '',
        category: 'JavaScript',
        tags: ''
    });

    // Sample data initialization
    useEffect(() => {
        const sampleArticles = [
            {
                id: 1,
                title: 'Getting Started with React Hooks',
                content: 'React Hooks revolutionized how we write React components. In this comprehensive guide, we\'ll explore useState, useEffect, and custom hooks...',
                author: 'John Doe',
                authorId: 1,
                category: 'React',
                tags: ['react', 'hooks', 'frontend'],
                createdAt: new Date('2024-01-15'),
                excerpt: 'Learn how to use React Hooks effectively in your applications.'
            },
            {
                id: 2,
                title: 'Node.js Best Practices for 2024',
                content: 'Building scalable Node.js applications requires following certain best practices. Let\'s dive into error handling, security, and performance optimization...',
                author: 'Jane Smith',
                authorId: 2,
                category: 'Node.js',
                tags: ['nodejs', 'backend', 'performance'],
                createdAt: new Date('2024-01-10'),
                excerpt: 'Essential Node.js practices every developer should know.'
            },
            {
                id: 3,
                title: 'MongoDB Schema Design Patterns',
                content: 'Designing efficient MongoDB schemas is crucial for application performance. We\'ll cover embedded documents, references, and indexing strategies...',
                author: 'Mike Johnson',
                authorId: 3,
                category: 'MongoDB',
                tags: ['mongodb', 'database', 'schema'],
                createdAt: new Date('2024-01-05'),
                excerpt: 'Master MongoDB schema design for optimal performance.'
            }
        ];
        setArticles(sampleArticles);
    }, []);

    // Authentication functions
    const handleLogin = (e) => {
        e.preventDefault();
        // Simulate login
        const mockUser = {
            id: 1,
            username: 'johndoe',
            email: loginForm.email,
            isAdmin: true
        };
        setUser(mockUser);
        setCurrentView('home');
        setLoginForm({ email: '', password: '' });
    };

    const handleRegister = (e) => {
        e.preventDefault();
        // Simulate registration
        const newUser = {
            id: Date.now(),
            username: registerForm.username,
            email: registerForm.email,
            isAdmin: false
        };
        setUser(newUser);
        setCurrentView('home');
        setRegisterForm({ username: '', email: '', password: '' });
    };

    const handleLogout = () => {
        setUser(null);
        setCurrentView('home');
    };

    // Article CRUD functions
    const handleCreateArticle = (e) => {
        e.preventDefault();
        const newArticle = {
            id: Date.now(),
            title: articleForm.title,
            content: articleForm.content,
            author: user.username,
            authorId: user.id,
            category: articleForm.category,
            tags: articleForm.tags.split(',').map(tag => tag.trim()),
            createdAt: new Date(),
            excerpt: articleForm.content.substring(0, 100) + '...'
        };
        setArticles([newArticle, ...articles]);
        setArticleForm({ title: '', content: '', category: 'JavaScript', tags: '' });
        setCurrentView('home');
    };

    const handleUpdateArticle = (e) => {
        e.preventDefault();
        const updatedArticles = articles.map(article =>
            article.id === selectedArticle.id
                ? {
                    ...article,
                    title: articleForm.title,
                    content: articleForm.content,
                    category: articleForm.category,
                    tags: articleForm.tags.split(',').map(tag => tag.trim()),
                    excerpt: articleForm.content.substring(0, 100) + '...'
                }
                : article
        );
        setArticles(updatedArticles);
        setArticleForm({ title: '', content: '', category: 'JavaScript', tags: '' });
        setSelectedArticle(null);
        setCurrentView('home');
    };

    const handleDeleteArticle = (articleId) => {
        setArticles(articles.filter(article => article.id !== articleId));
    };

    const startEditArticle = (article) => {
        setSelectedArticle(article);
        setArticleForm({
            title: article.title,
            content: article.content,
            category: article.category,
            tags: article.tags.join(', ')
        });
        setCurrentView('create');
    };

    // Filter and search logic
    const filteredArticles = articles.filter(article => {
        const matchesSearch = article.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
            article.content.toLowerCase().includes(searchTerm.toLowerCase()) ||
            article.tags.some(tag => tag.toLowerCase().includes(searchTerm.toLowerCase()));
        const matchesCategory = filterCategory === 'all' || article.category === filterCategory;
        const matchesUser = !showUserArticles || (user && article.authorId === user.id);
        return matchesSearch && matchesCategory && matchesUser;
    });

    const categories = ['all', ...new Set(articles.map(article => article.category))];

    // Component renders
    const LoginForm = () => (
        <div className="max-w-md mx-auto bg-white rounded-lg shadow-lg p-6 mt-8">
            <h2 className="text-2xl font-bold text-gray-800 mb-6 text-center">Login</h2>
            <div className="space-y-4">
                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Email</label>
                    <input
                        type="email"
                        value={loginForm.email}
                        onChange={(e) => setLoginForm({ ...loginForm, email: e.target.value })}
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                        onKeyPress={(e) => e.key === 'Enter' && handleLogin(e)}
                    />
                </div>
                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Password</label>
                    <input
                        type="password"
                        value={loginForm.password}
                        onChange={(e) => setLoginForm({ ...loginForm, password: e.target.value })}
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                        onKeyPress={(e) => e.key === 'Enter' && handleLogin(e)}
                    />
                </div>
                <button
                    onClick={handleLogin}
                    className="w-full bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 transition-colors"
                >
                    Login
                </button>
            </div>
            <p className="text-center mt-4 text-sm text-gray-600">
                Don't have an account?{' '}
                <button
                    onClick={() => setCurrentView('register')}
                    className="text-blue-600 hover:underline"
                >
                    Sign up
                </button>
            </p>
        </div>
    );

    const RegisterForm = () => (
        <div className="max-w-md mx-auto bg-white rounded-lg shadow-lg p-6 mt-8">
            <h2 className="text-2xl font-bold text-gray-800 mb-6 text-center">Register</h2>
            <div className="space-y-4">
                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Username</label>
                    <input
                        type="text"
                        value={registerForm.username}
                        onChange={(e) => setRegisterForm({ ...registerForm, username: e.target.value })}
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                        onKeyPress={(e) => e.key === 'Enter' && handleRegister(e)}
                    />
                </div>
                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Email</label>
                    <input
                        type="email"
                        value={registerForm.email}
                        onChange={(e) => setRegisterForm({ ...registerForm, email: e.target.value })}
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                        onKeyPress={(e) => e.key === 'Enter' && handleRegister(e)}
                    />
                </div>
                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Password</label>
                    <input
                        type="password"
                        value={registerForm.password}
                        onChange={(e) => setRegisterForm({ ...registerForm, password: e.target.value })}
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                        onKeyPress={(e) => e.key === 'Enter' && handleRegister(e)}
                    />
                </div>
                <button
                    onClick={handleRegister}
                    className="w-full bg-green-600 text-white py-2 px-4 rounded-md hover:bg-green-700 transition-colors"
                >
                    Register
                </button>
            </div>
            <p className="text-center mt-4 text-sm text-gray-600">
                Already have an account?{' '}
                <button
                    onClick={() => setCurrentView('login')}
                    className="text-blue-600 hover:underline"
                >
                    Login
                </button>
            </p>
        </div>
    );

    const ArticleForm = () => (
        <div className="max-w-2xl mx-auto bg-white rounded-lg shadow-lg p-6 mt-8">
            <h2 className="text-2xl font-bold text-gray-800 mb-6">
                {selectedArticle ? 'Edit Article' : 'Create New Article'}
            </h2>
            <div className="space-y-4">
                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Title</label>
                    <input
                        type="text"
                        value={articleForm.title}
                        onChange={(e) => setArticleForm({ ...articleForm, title: e.target.value })}
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                </div>
                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Category</label>
                    <select
                        value={articleForm.category}
                        onChange={(e) => setArticleForm({ ...articleForm, category: e.target.value })}
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    >
                        <option value="JavaScript">JavaScript</option>
                        <option value="React">React</option>
                        <option value="Node.js">Node.js</option>
                        <option value="MongoDB">MongoDB</option>
                        <option value="Express">Express</option>
                        <option value="CSS">CSS</option>
                        <option value="HTML">HTML</option>
                    </select>
                </div>
                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Tags (comma-separated)</label>
                    <input
                        type="text"
                        value={articleForm.tags}
                        onChange={(e) => setArticleForm({ ...articleForm, tags: e.target.value })}
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                        placeholder="react, hooks, frontend"
                    />
                </div>
                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Content</label>
                    <textarea
                        value={articleForm.content}
                        onChange={(e) => setArticleForm({ ...articleForm, content: e.target.value })}
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 h-40"
                    />
                </div>
                <div className="flex space-x-4">
                    <button
                        onClick={selectedArticle ? handleUpdateArticle : handleCreateArticle}
                        className="bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 transition-colors"
                    >
                        {selectedArticle ? 'Update Article' : 'Create Article'}
                    </button>
                    <button
                        onClick={() => {
                            setCurrentView('home');
                            setSelectedArticle(null);
                            setArticleForm({ title: '', content: '', category: 'JavaScript', tags: '' });
                        }}
                        className="bg-gray-500 text-white py-2 px-4 rounded-md hover:bg-gray-600 transition-colors"
                    >
                        Cancel
                    </button>
                </div>
            </div>
        </div>
    );

    const ArticleCard = ({ article }) => (
        <div className="bg-white rounded-lg shadow-lg p-6 hover:shadow-xl transition-shadow">
            <div className="flex justify-between items-start mb-4">
                <div className="flex-1">
                    <h3
                        className="text-xl font-bold text-gray-800 mb-2 cursor-pointer hover:text-blue-600 transition-colors"
                        onClick={() => {
                            setSelectedArticle(article);
                            setCurrentView('view');
                        }}
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
                {user && (user.id === article.authorId || user.isAdmin) && (
                    <div className="flex space-x-2 ml-4">
                        <button
                            onClick={() => startEditArticle(article)}
                            className="p-2 text-blue-600 hover:bg-blue-100 rounded-full transition-colors"
                        >
                            <Edit3 className="w-4 h-4" />
                        </button>
                        <button
                            onClick={() => handleDeleteArticle(article.id)}
                            className="p-2 text-red-600 hover:bg-red-100 rounded-full transition-colors"
                        >
                            <Trash2 className="w-4 h-4" />
                        </button>
                    </div>
                )}
            </div>
            <p className="text-gray-700 mb-4">{article.excerpt}</p>
            <div className="flex flex-wrap gap-2">
                {article.tags.map(tag => (
                    <span key={tag} className="text-xs bg-gray-200 text-gray-700 px-2 py-1 rounded-full">
            #{tag}
          </span>
                ))}
            </div>
        </div>
    );

    const ArticleView = () => (
        <div className="max-w-4xl mx-auto bg-white rounded-lg shadow-lg p-8 mt-8">
            <button
                onClick={() => setCurrentView('home')}
                className="mb-6 text-blue-600 hover:underline"
            >
                ← Back to articles
            </button>
            <h1 className="text-3xl font-bold text-gray-800 mb-4">{selectedArticle.title}</h1>
            <div className="flex items-center text-sm text-gray-600 mb-6">
                <User className="w-4 h-4 mr-1" />
                <span className="mr-4">{selectedArticle.author}</span>
                <Calendar className="w-4 h-4 mr-1" />
                <span className="mr-4">{selectedArticle.createdAt.toLocaleDateString()}</span>
                <Tag className="w-4 h-4 mr-1" />
                <span className="bg-blue-100 text-blue-800 px-2 py-1 rounded-full">
          {selectedArticle.category}
        </span>
            </div>
            <div className="prose max-w-none">
                <p className="text-gray-700 leading-relaxed whitespace-pre-wrap">{selectedArticle.content}</p>
            </div>
            <div className="flex flex-wrap gap-2 mt-6 pt-6 border-t">
                {selectedArticle.tags.map(tag => (
                    <span key={tag} className="text-sm bg-gray-200 text-gray-700 px-3 py-1 rounded-full">
            #{tag}
          </span>
                ))}
            </div>
        </div>
    );

    const Header = () => (
        <header className="bg-gradient-to-r from-blue-600 to-purple-700 text-white shadow-lg sticky top-0 z-50">
            <div className="container mx-auto px-4">
                {/* Top section with logo and user actions */}
                <div className="flex justify-between items-center py-4">
                    <div className="flex items-center space-x-2">
                        <div
                            className="cursor-pointer hover:opacity-90 transition-opacity"
                            onClick={() => setCurrentView('home')}
                        >
                            <h1 className="text-3xl font-bold">TechBlog</h1>
                            <p className="text-blue-200 text-sm">Modern Tech Articles & Tutorials</p>
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
                                    onClick={handleLogout}
                                    className="bg-red-500/80 hover:bg-red-600 px-3 py-1.5 rounded-md transition-colors flex items-center text-sm"
                                >
                                    <LogOut className="w-4 h-4 mr-1" />
                                    Logout
                                </button>
                            </>
                        ) : (
                            <div className="flex space-x-2">
                                <button
                                    onClick={() => setCurrentView('login')}
                                    className="bg-white/10 hover:bg-white/20 px-4 py-2 rounded-md transition-colors flex items-center text-sm"
                                >
                                    <LogIn className="w-4 h-4 mr-2" />
                                    Login
                                </button>
                                <button
                                    onClick={() => setCurrentView('register')}
                                    className="bg-white text-blue-600 hover:bg-gray-100 px-4 py-2 rounded-md transition-colors text-sm font-medium"
                                >
                                    Sign Up
                                </button>
                            </div>
                        )}
                    </div>
                </div>

                {/* Navigation Bar */}
                <nav className="border-t border-white/20 py-3">
                    <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-6">
                            <button
                                onClick={() => {
                                    setCurrentView('home');
                                    setShowUserArticles(false);
                                }}
                                className={`px-3 py-2 rounded-md text-sm font-medium transition-colors flex items-center ${
                                    currentView === 'home' && !showUserArticles
                                        ? 'bg-white/20 text-white'
                                        : 'text-blue-100 hover:text-white hover:bg-white/10'
                                }`}
                            >
                                <Search className="w-4 h-4 mr-2" />
                                Browse Articles
                            </button>

                            {categories.slice(1).map(category => (
                                <button
                                    key={category}
                                    onClick={() => {
                                        setCurrentView('home');
                                        setFilterCategory(category);
                                        setSearchTerm('');
                                        setShowUserArticles(false);
                                    }}
                                    className={`px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                                        filterCategory === category
                                            ? 'bg-white/20 text-white'
                                            : 'text-blue-100 hover:text-white hover:bg-white/10'
                                    }`}
                                >
                                    {category}
                                </button>
                            ))}
                        </div>

                        <div className="flex items-center space-x-3">
                            {user && (
                                <>
                                    <button
                                        onClick={() => {
                                            setCurrentView('home');
                                            setFilterCategory('all');
                                            setSearchTerm('');
                                            setShowUserArticles(true);
                                        }}
                                        className={`px-3 py-2 rounded-md text-sm font-medium transition-colors flex items-center ${
                                            showUserArticles
                                                ? 'bg-white/20 text-white'
                                                : 'text-blue-100 hover:text-white hover:bg-white/10'
                                        }`}
                                    >
                                        <User className="w-4 h-4 mr-1" />
                                        My Articles
                                    </button>
                                    <button
                                        onClick={() => {
                                            setCurrentView('create');
                                            setSelectedArticle(null);
                                            setArticleForm({ title: '', content: '', category: 'JavaScript', tags: '' });
                                        }}
                                        className="bg-green-500/80 hover:bg-green-600 px-4 py-2 rounded-md transition-colors flex items-center text-sm font-medium"
                                    >
                                        <Plus className="w-4 h-4 mr-2" />
                                        Write Article
                                    </button>
                                </>
                            )}

                            <div className="flex items-center space-x-2 text-sm text-blue-200">
                                <span>{articles.length} Articles</span>
                                {user && (
                                    <>
                                        <span>•</span>
                                        <span>{articles.filter(a => a.authorId === user.id).length} Yours</span>
                                    </>
                                )}
                            </div>
                        </div>
                    </div>
                </nav>
            </div>
        </header>
    );

    const SearchAndFilter = () => (
        <div className="container mx-auto px-4 py-6 border-b border-gray-200">
            {/* Page Title/Breadcrumb */}
            <div className="mb-4">
                <h2 className="text-2xl font-bold text-gray-800">
                    {showUserArticles ? 'My Articles' :
                        filterCategory !== 'all' ? `${filterCategory} Articles` :
                            'All Articles'}
                </h2>
                <p className="text-gray-600 text-sm">
                    {showUserArticles ? `${filteredArticles.length} articles written by you` :
                        filterCategory !== 'all' ? `${filteredArticles.length} articles in ${filterCategory}` :
                            `${filteredArticles.length} total articles`}
                </p>
            </div>

            <div className="flex flex-col md:flex-row gap-4 items-center justify-between">
                <div className="relative flex-1 max-w-md">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                    <input
                        type="text"
                        placeholder="Search articles..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                </div>
                <div className="flex items-center space-x-4">
                    {!showUserArticles && (
                        <>
                            <label className="text-sm font-medium text-gray-700">Category:</label>
                            <select
                                value={filterCategory}
                                onChange={(e) => setFilterCategory(e.target.value)}
                                className="px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                            >
                                {categories.map(category => (
                                    <option key={category} value={category}>
                                        {category === 'all' ? 'All Categories' : category}
                                    </option>
                                ))}
                            </select>
                        </>
                    )}
                    {showUserArticles && (
                        <button
                            onClick={() => {
                                setShowUserArticles(false);
                                setFilterCategory('all');
                            }}
                            className="text-blue-600 hover:text-blue-800 text-sm font-medium"
                        >
                            View All Articles →
                        </button>
                    )}
                </div>
            </div>
        </div>
    );

    const Home = () => (
        <div>
            <SearchAndFilter />
            <div className="container mx-auto px-4 pb-8">
                {filteredArticles.length === 0 ? (
                    <div className="text-center py-12">
                        <p className="text-gray-600 text-lg">No articles found matching your criteria.</p>
                    </div>
                ) : (
                    <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                        {filteredArticles.map(article => (
                            <ArticleCard key={article.id} article={article} />
                        ))}
                    </div>
                )}
            </div>
        </div>
    );

    return (
        <div className="min-h-screen bg-gray-50">
            <Header />

            {currentView === 'home' && <Home />}
            {currentView === 'login' && <LoginForm />}
            {currentView === 'register' && <RegisterForm />}
            {currentView === 'create' && user && <ArticleForm />}
            {currentView === 'view' && selectedArticle && <ArticleView />}

            {!user && (currentView === 'create') && (
                <div className="text-center py-12">
                    <p className="text-gray-600 text-lg mb-4">Please login to create articles.</p>
                    <button
                        onClick={() => setCurrentView('login')}
                        className="bg-blue-600 text-white px-6 py-2 rounded-md hover:bg-blue-700 transition-colors"
                    >
                        Login
                    </button>
                </div>
            )}
        </div>
    );
};

export default TechBlog;