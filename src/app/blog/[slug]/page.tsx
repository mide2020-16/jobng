import { notFound } from 'next/navigation';
import { blogPosts } from '@/data/blog';
import Link from 'next/link';
import Image from 'next/image';
import { FiArrowLeft, FiClock, FiMessageSquare, FiCalendar, FiShare2, FiTwitter, FiFacebook, FiLinkedin } from 'react-icons/fi';
import BlogCard from '@/components/shared/BlogCard';

export async function generateStaticParams() {
  return blogPosts.map(p => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const post = blogPosts.find(p => p.slug === slug);
  return { 
    title: post ? `${post.title} | JustJobNG Blog` : 'Blog | JustJobNG', 
    description: post?.excerpt 
  };
}

export default async function BlogPostPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const post = blogPosts.find(p => p.slug === slug);
  
  if (!post) {
    notFound();
  }

  const relatedPosts = blogPosts.filter(p => p.id !== post.id && p.category === post.category).slice(0, 3);
  if (relatedPosts.length < 3) {
    relatedPosts.push(...blogPosts.filter(p => p.id !== post.id && !relatedPosts.find(r => r.id === p.id)).slice(0, 3 - relatedPosts.length));
  }

  return (
    <div className="min-h-screen bg-[var(--surface)] pb-20 animate-fade-in-up">
      {/* Hero */}
      <section className="bg-[var(--ink)] pt-[calc(var(--nav-height)+2rem)] pb-12 relative">
        <div className="container-xl relative z-10">
          <Link href="/blog" className="inline-flex items-center gap-2 text-[var(--text-faint)] text-sm font-semibold no-underline mb-8 transition-colors hover:text-white">
            <FiArrowLeft size={16} /> Back to articles
          </Link>
          
          <div className="max-w-[800px]">
            <span className="jj-pill bg-[var(--gold)] text-white border-none mb-4 inline-block">
              {post.category}
            </span>
            <h1 className="text-[clamp(2rem,5vw,3.5rem)] font-extrabold text-white mb-6 -tracking-[0.02em] leading-[1.1]">
              {post.title}
            </h1>
            
            <div className="flex items-center gap-6 flex-wrap border-t border-[rgba(255,255,255,0.1)] pt-6">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full overflow-hidden bg-[var(--surface-elevated)]">
                  {post.authorAvatar ? (
                    <Image src={post.authorAvatar} alt={post.author} width={40} height={40} className="w-full h-full object-cover" />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center text-xl font-extrabold text-[var(--ink)]">{post.author.charAt(0)}</div>
                  )}
                </div>
                <div className="flex flex-col">
                  <span className="text-white font-bold text-[15px]">{post.author}</span>
                  <span className="text-[var(--text-faint)] text-[13px]">Author</span>
                </div>
              </div>
              
              <div className="flex gap-4 text-[var(--text-faint)] text-sm ml-auto">
                <span className="flex items-center gap-1"><FiCalendar size={14} /> {post.date}</span>
                <span className="flex items-center gap-1"><FiClock size={14} /> {post.readTime}</span>
                <span className="flex items-center gap-1"><FiMessageSquare size={14} /> {post.comments}</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="container-xl mt-12">
        <div className="grid grid-cols-1 lg:grid-cols-[2fr_1fr] gap-16 items-start">
          
          {/* Main Article */}
          <article>
            {post.image && (
              <div className="relative w-full h-[400px] rounded-[var(--radius-md)] overflow-hidden mb-12 shadow-[var(--shadow-sm)]">
                <Image src={post.image} alt={post.title} fill className="object-cover" priority />
              </div>
            )}
            
            <div 
              className="job-description prose max-w-none text-base leading-relaxed text-[var(--text-muted)]
                prose-p:mb-6 prose-p:last:mb-0
                prose-headings:text-[var(--ink)] prose-headings:font-extrabold prose-headings:tracking-tight prose-headings:mt-10 prose-headings:mb-4
                prose-h2:text-2xl prose-h3:text-xl
                prose-strong:text-[var(--ink)] prose-strong:font-bold
                prose-ul:list-disc prose-ul:pl-5 prose-ul:my-4 prose-li:mb-2
                prose-a:text-[var(--gold-hover)] prose-a:underline prose-a:underline-offset-2
                prose-blockquote:border-l-4 prose-blockquote:border-[var(--gold)] prose-blockquote:pl-5 prose-blockquote:my-6 prose-blockquote:italic prose-blockquote:text-lg prose-blockquote:text-[var(--ink)]"
              dangerouslySetInnerHTML={{ __html: post.content }}
            />
            
            {/* Tags */}
            <div className="mt-16 pt-8 border-t border-[var(--border)] flex items-center gap-4 flex-wrap">
              <span className="font-bold text-[var(--ink)]">Tags:</span>
              <div className="flex gap-2 flex-wrap">
                {["Career", "Tips", "Remote Work"].map(tag => (
                  <span key={tag} className="jj-pill bg-[var(--surface-elevated)] text-[var(--text-muted)] border-[var(--border)] border border-solid">{tag}</span>
                ))}
              </div>
            </div>
          </article>

          {/* Sidebar */}
          <aside className="flex flex-col gap-8 sticky top-[calc(var(--nav-height)+2rem)]">
            
            {/* Share */}
            <div className="jj-card p-6">
              <h3 className="text-base font-extrabold text-[var(--ink)] mb-4 flex items-center gap-2">
                <FiShare2 size={16} /> Share this article
              </h3>
              <div className="flex gap-2">
                <button title="social_media_x" type='button' className="jj-btn jj-btn--ghost flex-1 py-2.5 flex justify-center"><FiTwitter size={18} /></button>
                <button title="social_media_facebook" type='button' className="jj-btn jj-btn--ghost flex-1 py-2.5 flex justify-center"><FiFacebook size={18} /></button>
                <button title="social_media_linkedin" type='button' className="jj-btn jj-btn--ghost flex-1 py-2.5 flex justify-center"><FiLinkedin size={18} /></button>
              </div>
            </div>

            {/* Related */}
            <div className="jj-card p-6">
              <h3 className="text-lg font-extrabold text-[var(--ink)] mb-6">Related Articles</h3>
              <div className="flex flex-col gap-6">
                {relatedPosts.map(rp => (
                  <Link key={rp.id} href={`/blog/${rp.slug}`} className="flex gap-4 no-underline group">
                    <div className="w-20 h-20 rounded-[var(--radius-sm)] overflow-hidden shrink-0 relative">
                      {rp.image ? (
                        <Image src={rp.image} alt={rp.title} fill className="object-cover group-hover:scale-110 transition-transform duration-300" />
                      ) : (
                        <div className="w-full h-full bg-[var(--gold-muted)]" />
                      )}
                    </div>
                    <div>
                      <h4 className="text-[15px] font-bold text-[var(--ink)] leading-snug mb-1 line-clamp-2 group-hover:text-[var(--gold)] transition-colors">
                        {rp.title}
                      </h4>
                      <span className="text-xs text-[var(--text-faint)]">{rp.date}</span>
                    </div>
                  </Link>
                ))}
              </div>
            </div>
          </aside>

        </div>
      </section>
    </div>
  );
}