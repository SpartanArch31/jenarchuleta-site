import { KIT_FREE_CHAPTER_URL } from './site-data';

// Light-register site nav used on the homepage, /podcast and /journal.
// (The book page keeps its own minimal dark nav.)
export default function SiteNav() {
  return (
    <nav className="nav">
      <div className="nav-inner">
        <a href="/" className="brand">Jen Archuleta</a>
        <div className="nav-links">
          <a href="/#story" className="hide-sm">Story</a>
          <a href="/book">Book</a>
          <a href="/podcast">Podcast</a>
          <a href="/journal">Journal</a>
          <a href="/#speaking" className="hide-sm">Speaking</a>
          <a href="/#shop" className="hide-sm">Shop</a>
          <a href={KIT_FREE_CHAPTER_URL} className="btn btn-primary btn-sm">Free Chapter</a>
        </div>
      </div>
    </nav>
  );
}
