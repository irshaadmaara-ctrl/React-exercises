import { type FormEvent, useMemo, useState } from 'react'
import './App.css'

type Post = {
  id: number
  title: string
  content: string
}

type View = 'home' | 'create' | 'detail' | 'logged-out'

const initialPosts: Post[] = [
  {
    id: 1,
    title: 'Introduction to React',
    content: 'Get started with React, a library for building user interfaces.',
  },
  {
    id: 2,
    title: 'Understanding React Router',
    content: 'Learn how client-side routing helps organize a React application.',
  },
  {
    id: 3,
    title: 'React Hooks in Depth',
    content: 'Explore the hooks that let function components use React features.',
  },
  {
    id: 4,
    title: 'javascript',
    content: 'A few notes and useful ideas about JavaScript.',
  },
  {
    id: 5,
    title: 'nodejs',
    content: 'A quick introduction to building with Node.js.',
  },
]

function App() {
  const [posts, setPosts] = useState(initialPosts)
  const [view, setView] = useState<View>('home')
  const [selectedPostId, setSelectedPostId] = useState<number | null>(null)
  const [searchInput, setSearchInput] = useState('')
  const [query, setQuery] = useState('')
  const [title, setTitle] = useState('')
  const [content, setContent] = useState('')

  const filteredPosts = useMemo(
    () =>
      posts.filter((post) =>
        post.title.toLocaleLowerCase().includes(query.toLocaleLowerCase()),
      ),
    [posts, query],
  )
  const selectedPost = posts.find((post) => post.id === selectedPostId)

  function goHome() {
    setView('home')
    setSelectedPostId(null)
  }

  function searchPosts(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()
    setQuery(searchInput.trim())
    goHome()
  }

  function savePost(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()
    const newPost = { id: Date.now(), title: title.trim(), content: content.trim() }
    setPosts((currentPosts) => [newPost, ...currentPosts])
    setSearchInput('')
    setQuery('')
    setTitle('')
    setContent('')
    setView('home')
  }

  function openPost(post: Post) {
    setSelectedPostId(post.id)
    setView('detail')
  }

  return (
    <div className="app-shell">
      <header className="site-header">
        <nav className="navigation" aria-label="Main navigation">
          <a className="brand" href="#home" onClick={goHome}>
            React Blog
          </a>
          <div className="nav-links">
            <a
              className={view === 'home' || view === 'detail' ? 'active' : ''}
              href="#home"
              onClick={goHome}
            >
              Home
            </a>
            <a
              className={view === 'create' ? 'active' : ''}
              href="#create"
              onClick={() => setView('create')}
            >
              Create Post
            </a>
            <button
              className="logout-link"
              type="button"
              onClick={() => setView('logged-out')}
            >
              Logout
            </button>
          </div>
        </nav>
      </header>

      <main className="content-panel">
        {view === 'home' && (
          <section aria-labelledby="posts-heading">
            <h1 id="posts-heading">Blog Posts</h1>
            <form className="search-form" onSubmit={searchPosts} role="search">
              <label className="visually-hidden" htmlFor="post-search">
                Search posts
              </label>
              <input
                id="post-search"
                type="search"
                placeholder="Search posts..."
                value={searchInput}
                onChange={(event) => setSearchInput(event.target.value)}
              />
              <button className="button button-primary" type="submit">
                Search
              </button>
            </form>

            {filteredPosts.length > 0 ? (
              <ul className="post-list">
                {filteredPosts.map((post) => (
                  <li key={post.id}>
                    <a
                      href={`#post-${post.id}`}
                      onClick={(event) => {
                        event.preventDefault()
                        openPost(post)
                      }}
                    >
                      {post.title}
                    </a>
                  </li>
                ))}
              </ul>
            ) : (
              <p className="empty-state">No posts found. Try another search.</p>
            )}
          </section>
        )}

        {view === 'create' && (
          <section aria-labelledby="create-heading">
            <h1 id="create-heading">Create Post</h1>
            <form className="post-form" onSubmit={savePost}>
              <label htmlFor="post-title">Title</label>
              <input
                id="post-title"
                type="text"
                value={title}
                onChange={(event) => setTitle(event.target.value)}
                placeholder="Enter a post title"
                required
              />
              <label htmlFor="post-content">Content</label>
              <textarea
                id="post-content"
                rows={7}
                value={content}
                onChange={(event) => setContent(event.target.value)}
                placeholder="Write your post..."
                required
              />
              <div className="form-actions">
                <button className="button button-primary" type="submit">
                  Save Post
                </button>
                <button className="button button-secondary" type="button" onClick={goHome}>
                  Cancel
                </button>
              </div>
            </form>
          </section>
        )}

        {view === 'detail' && selectedPost && (
          <article className="post-detail">
            <button className="back-link" type="button" onClick={goHome}>
              ← Back to posts
            </button>
            <h1>{selectedPost.title}</h1>
            <p>{selectedPost.content}</p>
          </article>
        )}

        {view === 'logged-out' && (
          <section className="logged-out" aria-labelledby="logged-out-heading">
            <h1 id="logged-out-heading">You’re logged out</h1>
            <p>Thanks for stopping by the React Blog.</p>
            <button className="button button-primary" type="button" onClick={goHome}>
              Return to blog
            </button>
          </section>
        )}
      </main>
      <footer className="site-footer">React Blog</footer>
    </div>
  )
}

export default App
