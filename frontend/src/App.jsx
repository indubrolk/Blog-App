import React, { useState, useEffect, useMemo } from 'react';
import Header from './components/Layout/Header';
import SearchAndFilter from './components/Layout/SearchAndFilter';
import LoginForm from './components/Auth/LoginForm';
import RegisterForm from './components/Auth/RegisterForm';
import ArticleForm from './components/Articles/ArticleForm';
import ArticleCard from './components/Articles/ArticleCard';
import ArticleView from './components/Articles/ArticleView';
import { postsApi } from './utils/api';

const SAMPLE_ARTICLES = [
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

const createDefaultLoginForm = () => ({ email: '', password: '' });
const createDefaultRegisterForm = () => ({ username: '', email: '', password: '' });
const createDefaultArticleForm = () => ({ title: '', content: '', category: 'JavaScript', tags: '' });

const TechBlog = () => {
    const [user, setUser] = useState(null);
    const [articles, setArticles] = useState([]);
    const [currentView, setCurrentView] = useState('home');
    const [selectedArticle, setSelectedArticle] = useState(null);
    const [searchTerm, setSearchTerm] = useState('');
    const [filterCategory, setFilterCategory] = useState('all');
    const [showUserArticles, setShowUserArticles] = useState(false);

    const [loginForm, setLoginForm] = useState(() => createDefaultLoginForm());
    const [registerForm, setRegisterForm] = useState(() => createDefaultRegisterForm());
    const [articleForm, setArticleForm] = useState(() => createDefaultArticleForm());

    useEffect(() => {
        let cancelled = false;

        const mapPostToArticle = (post) => ({
            id: post._id || post.id,
            title: post.title,
            content: post.content,
            author: post.author,
            authorId: post.authorId,
            category: post.category || 'General',
            tags: Array.isArray(post.tags) ? post.tags : [],
            createdAt: post.createdAt ? new Date(post.createdAt) : new Date(),
            excerpt: post.excerpt || (post.content ? `${post.content.substring(0, 100)}...` : ''),
        });

        (async () => {
            try {
                const data = await postsApi.list();
                if (!cancelled) {
                    const mapped = data.map(mapPostToArticle);
                    setArticles(mapped);
                }
            } catch (_err) {
                // Fallback to local sample data if backend is unavailable
                if (!cancelled) {
                    setArticles(SAMPLE_ARTICLES);
                }
            }
        })();

        return () => {
            cancelled = true;
        };
    }, []);

    const filteredArticles = useMemo(() => {
        return articles.filter((article) => {
            const lowerSearch = searchTerm.toLowerCase();
            const matchesSearch =
                article.title.toLowerCase().includes(lowerSearch) ||
                article.content.toLowerCase().includes(lowerSearch) ||
                article.tags.some((tag) => tag.toLowerCase().includes(lowerSearch));
            const matchesCategory = filterCategory === 'all' || article.category === filterCategory;
            const matchesUser = !showUserArticles || (user && article.authorId === user.id);
            return matchesSearch && matchesCategory && matchesUser;
        });
    }, [articles, searchTerm, filterCategory, showUserArticles, user]);

    const categories = useMemo(() => {
        const uniqueCategories = new Set(articles.map((article) => article.category));
        return ['all', ...uniqueCategories];
    }, [articles]);

    const userArticlesCount = useMemo(() => {
        if (!user) {
            return 0;
        }

        return articles.filter((article) => article.authorId === user.id).length;
    }, [articles, user]);

    const handleLoginChange = (field, value) => {
        setLoginForm((previous) => ({ ...previous, [field]: value }));
    };

    const handleRegisterChange = (field, value) => {
        setRegisterForm((previous) => ({ ...previous, [field]: value }));
    };

    const handleArticleFormChange = (field, value) => {
        setArticleForm((previous) => ({ ...previous, [field]: value }));
    };

    const resetArticleFormState = () => {
        setSelectedArticle(null);
        setArticleForm(createDefaultArticleForm());
    };

    const handleLogin = (event) => {
        event.preventDefault();

        const mockUser = {
            id: 1,
            username: 'johndoe',
            email: loginForm.email,
            isAdmin: true,
        };

        setUser(mockUser);
        setCurrentView('home');
        setLoginForm(createDefaultLoginForm());
    };

    const handleRegister = (event) => {
        event.preventDefault();

        const newUser = {
            id: Date.now(),
            username: registerForm.username,
            email: registerForm.email,
            isAdmin: false,
        };

        setUser(newUser);
        setCurrentView('home');
        setRegisterForm(createDefaultRegisterForm());
    };

    const handleLogout = () => {
        setUser(null);
        setCurrentView('home');
        setShowUserArticles(false);
    };

    const handleCreateArticle = async (event) => {
        event.preventDefault();

        if (!user) {
            return;
        }

        const tags = articleForm.tags
            .split(',')
            .map((tag) => tag.trim())
            .filter(Boolean);

        const payload = {
            title: articleForm.title,
            content: articleForm.content,
            author: user.username,
            authorId: user.id,
            category: articleForm.category,
            tags,
            excerpt: `${articleForm.content.substring(0, 100)}...`,
        };

        try {
            const created = await postsApi.create(payload);
            const article = {
                id: created._id || created.id,
                title: created.title,
                content: created.content,
                author: created.author,
                authorId: created.authorId,
                category: created.category || 'General',
                tags: Array.isArray(created.tags) ? created.tags : [],
                createdAt: created.createdAt ? new Date(created.createdAt) : new Date(),
                excerpt: created.excerpt || payload.excerpt,
            };
            setArticles((previous) => [article, ...previous]);
        } catch (_err) {
            // Fallback to local insertion if API not available
            const localArticle = {
                id: Date.now(),
                ...payload,
                createdAt: new Date(),
            };
            setArticles((previous) => [localArticle, ...previous]);
        }

        resetArticleFormState();
        setCurrentView('home');
    };

    const handleUpdateArticle = async (event) => {
        event.preventDefault();

        if (!selectedArticle) {
            return;
        }

        const tags = articleForm.tags
            .split(',')
            .map((tag) => tag.trim())
            .filter(Boolean);

        const payload = {
            title: articleForm.title,
            content: articleForm.content,
            category: articleForm.category,
            tags,
            excerpt: `${articleForm.content.substring(0, 100)}...`,
        };

        try {
            const updated = await postsApi.update(selectedArticle.id, payload);
            const mapped = {
                id: updated._id || updated.id,
                title: updated.title,
                content: updated.content,
                author: updated.author || selectedArticle.author,
                authorId: updated.authorId || selectedArticle.authorId,
                category: updated.category || 'General',
                tags: Array.isArray(updated.tags) ? updated.tags : [],
                createdAt: updated.createdAt ? new Date(updated.createdAt) : selectedArticle.createdAt,
                excerpt: updated.excerpt || payload.excerpt,
            };
            setArticles((previous) => previous.map((a) => (a.id === selectedArticle.id ? mapped : a)));
        } catch (_err) {
            // Fallback to local update
            setArticles((previous) =>
                previous.map((article) =>
                    article.id === selectedArticle.id
                        ? {
                            ...article,
                            ...payload,
                          }
                        : article
                )
            );
        }

        resetArticleFormState();
        setCurrentView('home');
    };

    const handleDeleteArticle = async (articleId) => {
        try {
            await postsApi.remove(articleId);
        } catch (_err) {
            // Ignore API error and still remove locally to keep UX simple
        }
        setArticles((previous) => previous.filter((article) => article.id !== articleId));
    };

    const handleEditArticle = (article) => {
        setSelectedArticle(article);
        setArticleForm({
            title: article.title,
            content: article.content,
            category: article.category,
            tags: article.tags.join(', '),
        });
        setCurrentView('create');
    };

    const handleViewArticle = (article) => {
        setSelectedArticle(article);
        setCurrentView('view');
    };

    const handleCancelArticle = () => {
        resetArticleFormState();
        setCurrentView('home');
    };

    const handleGoHome = () => {
        setCurrentView('home');
    };

    const handleBrowseArticles = () => {
        handleGoHome();
        setShowUserArticles(false);
    };

    const handleSelectCategory = (category) => {
        setCurrentView('home');
        setFilterCategory(category);
        setSearchTerm('');
        setShowUserArticles(false);
    };

    const handleShowUserArticles = () => {
        setCurrentView('home');
        setFilterCategory('all');
        setSearchTerm('');
        setShowUserArticles(true);
    };

    const handleCreateArticleView = () => {
        resetArticleFormState();
        setCurrentView('create');
    };

    const handleResetFilters = () => {
        setShowUserArticles(false);
        setFilterCategory('all');
        setSearchTerm('');
    };

    const isEditingArticle = Boolean(selectedArticle);
    const canRenderArticleForm = currentView === 'create' && Boolean(user);

    return (
        <div className="min-h-screen bg-gray-50">
            <Header
                user={user}
                articlesCount={articles.length}
                userArticlesCount={userArticlesCount}
                showUserArticles={showUserArticles}
                categories={categories}
                currentCategory={filterCategory}
                isHomeView={currentView === 'home'}
                onGoHome={handleGoHome}
                onBrowseArticles={handleBrowseArticles}
                onSelectCategory={handleSelectCategory}
                onShowUserArticles={handleShowUserArticles}
                onCreateArticle={handleCreateArticleView}
                onLoginClick={() => setCurrentView('login')}
                onRegisterClick={() => setCurrentView('register')}
                onLogout={handleLogout}
            />

            {currentView === 'home' && (
                <>
                    <SearchAndFilter
                        searchTerm={searchTerm}
                        onSearchChange={setSearchTerm}
                        filterCategory={filterCategory}
                        onFilterChange={setFilterCategory}
                        categories={categories}
                        showUserArticles={showUserArticles}
                        onResetFilters={handleResetFilters}
                        filteredCount={filteredArticles.length}
                    />
                    <div className="container mx-auto px-4 pb-8">
                        {filteredArticles.length === 0 ? (
                            <div className="text-center py-12">
                                <p className="text-gray-600 text-lg">No articles found matching your criteria.</p>
                            </div>
                        ) : (
                            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                                {filteredArticles.map((article) => (
                                    <ArticleCard
                                        key={article.id}
                                        article={article}
                                        canEdit={Boolean(user) && (user.id === article.authorId || user.isAdmin)}
                                        onView={handleViewArticle}
                                        onEdit={handleEditArticle}
                                        onDelete={handleDeleteArticle}
                                    />
                                ))}
                            </div>
                        )}
                    </div>
                </>
            )}

            {currentView === 'login' && (
                <LoginForm
                    form={loginForm}
                    onChange={handleLoginChange}
                    onSubmit={handleLogin}
                    onSwitchToRegister={() => setCurrentView('register')}
                />
            )}

            {currentView === 'register' && (
                <RegisterForm
                    form={registerForm}
                    onChange={handleRegisterChange}
                    onSubmit={handleRegister}
                    onSwitchToLogin={() => setCurrentView('login')}
                />
            )}

            {canRenderArticleForm && (
                <ArticleForm
                    form={articleForm}
                    onChange={handleArticleFormChange}
                    onSubmit={isEditingArticle ? handleUpdateArticle : handleCreateArticle}
                    onCancel={handleCancelArticle}
                    isEditing={isEditingArticle}
                />
            )}

            {currentView === 'view' && selectedArticle && (
                <ArticleView
                    article={selectedArticle}
                    onBack={handleGoHome}
                />
            )}

            {!user && currentView === 'create' && (
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

