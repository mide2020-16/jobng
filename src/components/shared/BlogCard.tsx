import Link from "next/link";
import Image from "next/image";
import { FiCalendar, FiMessageSquare, FiClock } from "react-icons/fi";
import { BlogPost } from "@/types";

export default function BlogCard({ post, featured = false }: { post: BlogPost; featured?: boolean }) {
  return (
    <div className="jj-card p-0 overflow-hidden flex flex-col h-full transition-all duration-300 hover:-translate-y-1 hover:shadow-md hover:border-[var(--gold-glow)]">
      <Link href={`/blog/${post.slug}`} className={`block relative overflow-hidden ${featured ? 'h-60' : 'h-50'} group`}>
        {post.image ? (
          <Image
            src={post.image}
            alt={post.title}
            fill
            className="object-cover transition-transform duration-500 group-hover:scale-105"
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          />
        ) : (
          <div className="w-full h-full bg-gradient-to-br from-[var(--gold-muted)] to-[var(--surface)] flex items-center justify-center text-5xl font-extrabold text-[var(--gold-light)] group-hover:scale-105 transition-transform duration-500">
            {post.title.charAt(0)}
          </div>
        )}
        <span className="jj-pill absolute top-3 left-3 bg-[var(--gold)] text-white border-none shadow-sm">
          {post.category}
        </span>
      </Link>
      <div className="p-6 flex flex-col flex-1">
        <div className="flex items-center gap-3 text-xs text-[var(--text-faint)] mb-3 flex-wrap">
          <span className="flex items-center gap-1"><FiCalendar size={12} /> {post.date}</span>
          <span className="flex items-center gap-1"><FiClock size={12} /> {post.readTime}</span>
          <span className="flex items-center gap-1"><FiMessageSquare size={12} /> {post.comments}</span>
        </div>
        
        <Link href={`/blog/${post.slug}`} className="no-underline group">
          <h3 className={`font-extrabold text-[var(--ink)] mb-2 leading-tight line-clamp-2 overflow-hidden transition-colors group-hover:text-[var(--gold)] ${featured ? 'text-2xl' : 'text-xl'}`}>
            {post.title}
          </h3>
        </Link>
        
        <p className="text-[15px] text-[var(--text-muted)] leading-relaxed mb-6 flex-1 line-clamp-3 overflow-hidden">
          {post.excerpt}
        </p>
        
        <div className="flex items-center justify-between pt-4 border-t border-[var(--border)]">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-full overflow-hidden bg-[var(--surface-elevated)] shrink-0">
              {post.authorAvatar ? (
                <Image src={post.authorAvatar} alt={post.author} width={32} height={32} className="w-full h-full object-cover" />
              ) : (
                <div className="w-full h-full bg-[var(--ink)] text-white flex items-center justify-center text-xs font-bold">
                  {post.author.charAt(0)}
                </div>
              )}
            </div>
            <span className="text-sm font-semibold text-[var(--ink)] truncate">{post.author}</span>
          </div>
          <Link href={`/blog/${post.slug}`} className="text-sm font-bold text-[var(--gold)] no-underline hover:text-[var(--gold-hover)] transition-colors whitespace-nowrap">
            Read Article &rarr;
          </Link>
        </div>
      </div>
    </div>
  );
}
