const API_BASE = import.meta.env.VITE_API_BASE_URL || '/api';

async function request(path, options = {}) {
  const res = await fetch(`${API_BASE}${path}`, {
    headers: { 'Content-Type': 'application/json', ...(options.headers || {}) },
    ...options,
  });
  if (!res.ok) {
    const text = await res.text().catch(() => '');
    throw new Error(text || `Request failed: ${res.status}`);
  }
  return res.status !== 204 ? res.json() : null;
}

export const postsApi = {
  list: (params = {}) => {
    const q = new URLSearchParams(params).toString();
    return request(`/posts${q ? `?${q}` : ''}`);
  },
  get: (id) => request(`/posts/${id}`),
  create: (data) => request(`/posts`, { method: 'POST', body: JSON.stringify(data) }),
  update: (id, data) => request(`/posts/${id}`, { method: 'PUT', body: JSON.stringify(data) }),
  remove: (id) => request(`/posts/${id}`, { method: 'DELETE' }),
};

export default { posts: postsApi };

