import { Link } from 'react-router-dom'
import Reveal from './Reveal'
import LineReveal from './motion/LineReveal'
import { POSTS, srcsetArte } from '../data/posts'
import { ZOOM } from './PostCard'


export default function Blog() {
  const [destaque, ...demais] = POSTS

  return (
    <section id="blog" className="bg-off py-28 md:py-44">
      <div className="max-w-[1400px] mx-auto px-6 md:px-10">
        <div className="grid md:grid-cols-12 gap-8 items-end mb-16 md:mb-20">
          <div className="md:col-span-9">
            <Reveal className="eyebrow text-verde-oliva mb-6">Blog</Reveal>
            <LineReveal lines={['Conteúdo', 'para você']} className="uppercase text-section" />
          </div>
          <Reveal delay={0.1} className="md:col-span-3 md:text-right">
            <Link to="/blog/" className="group inline-flex items-center gap-3 py-2 -my-2 eyebrow text-verde-escuro">
              <span className="relative pb-1 after:absolute after:inset-x-0 after:bottom-0 after:h-px after:bg-current after:origin-left after:transition-transform after:duration-500 group-hover:after:scale-x-0">
                Ver todos os artigos
              </span>
              <span className="transition-transform duration-500 group-hover:translate-x-1">→</span>
            </Link>
          </Reveal>
        </div>

        <div className="grid md:grid-cols-12 gap-12 md:gap-8">
          <Reveal className="md:col-span-7">
            <Link to={`/blog/${destaque.slug}/`} className="group block">
              <div className="overflow-hidden mb-7">
                <img src={destaque.image} srcSet={srcsetArte(destaque.image)} sizes="(min-width: 768px) 58vw, 100vw" alt="" loading="lazy" className={`w-full aspect-video object-cover ${ZOOM}`} />
              </div>
              <div className="eyebrow text-verde-oliva mb-4">{destaque.category}</div>
              <h3 className="text-[clamp(1.5rem,2.4vw,2.1rem)] leading-snug text-verde-escuro mb-4 max-w-2xl group-hover:text-verde-oliva transition-colors">
                {destaque.title}
              </h3>
              <p className="text-base leading-relaxed text-verde-escuro/70 max-w-2xl">{destaque.excerpt}</p>
            </Link>
          </Reveal>

          <ul className="md:col-span-5 flex flex-col">
            {demais.map((post, i) => (
              <Reveal as="li" key={post.slug} delay={0.1 + i * 0.08} className="border-t border-verde-escuro/15 last:border-b">
                <Link to={`/blog/${post.slug}/`} className="group grid grid-cols-[8.5rem_minmax(0,1fr)] sm:grid-cols-[11rem_minmax(0,1fr)] gap-5 py-6">
                  <div className="overflow-hidden self-start">
                    <img src={post.image} srcSet={srcsetArte(post.image)} sizes="(min-width: 640px) 176px, 136px" alt="" loading="lazy" className={`w-full aspect-video object-cover ${ZOOM}`} />
                  </div>
                  <div>
                    <div className="eyebrow text-[0.62rem] text-verde-oliva mb-2.5">{post.category}</div>
                    <h3 className="text-base md:text-[17px] leading-snug text-verde-escuro group-hover:text-verde-oliva transition-colors">
                      {post.title}
                    </h3>
                  </div>
                </Link>
              </Reveal>
            ))}
          </ul>
        </div>
      </div>
    </section>
  )
}
