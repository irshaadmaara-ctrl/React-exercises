import Footer from './Footer'
import Header from './Header'
import Post from './Post'

function Blog() {
  return (
    <div className="blog">
      <Header />
      <main>
        <Post />
      </main>
      <Footer />
    </div>
  )
}

export default Blog