import { Link } from 'react-router-dom'
import { srcsetArte } from '../data/posts'

export const ZOOM = 'transition-transform duration-[1.2s] ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-105'

export default function PostCard({ post }) {
  return (
    <Link to={`/blog/${post.slug}/`} className="group block">
      <div className="overflow-hidden mb-6">
        <img src={post.image} srcSet={srcsetArte(post.image)} sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw" alt="" loading="lazy" fetchPriority="low" className={`w-full aspect-[1734/907] object-cover ${ZOOM}`} />
      </div>
      <div className="eyebrow text-[0.62rem] text-verde-oliva mb-3">{post.category}</div>
      <h3 className="text-lg leading-snug text-verde-escuro mb-3 group-hover:text-verde-oliva transition-colors">
        {post.title}
      </h3>
      <p className="text-base leading-relaxed text-verde-escuro/65">{post.excerpt}</p>
    </Link>
  )
}
