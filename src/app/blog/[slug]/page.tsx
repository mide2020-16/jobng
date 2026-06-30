import { notFound } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import { FiArrowLeft, FiCalendar, FiClock, FiMessageSquare, FiUser, FiTag } from "react-icons/fi";
import { getBlogPostBySlug, blogPosts } from "@/data/blog";
import BlogCard from "@/components/shared/BlogCard";

export function generateStaticParams() {
  return blogPosts.map((p) => ({ slug: p.slug }));
}

// 1. Update the type definition to expect a Promise
type Props = {
  params: Promise<{ slug: string }>;
};

// 2. Make the component async
export default async function BlogPostPage({ params }: Props) {
  // 3. Await the params before using the slug
  const resolvedParams = await params;
  const post = getBlogPostBySlug(resolvedParams.slug);
  
  if (!post) notFound();
  
  const related = blogPosts.filter((p) => p.category === post.category && p.slug !== post.slug).slice(0, 3);

  return (
    <div className="min-h-screen bg-gray-50 pt-20">
      {/* Hero */}
      <div className="relative h-64 sm:h-80 overflow-hidden">
        <Image src={post.image} alt={post.title} fill className="object-cover" priority />
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-black/20" />
        <div className="absolute inset-0 flex flex-col justify-end">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 pb-8">
            <Link href="/blog" className="inline-flex items-center gap-2 text-white/70 hover:text-white text-sm mb-4 transition-colors">
              <FiArrowLeft size={13} /> Back to Blog
            </Link>
            <span className="inline-block bg-green-600 text-white text-xs font-semibold px-3 py-1 rounded-full mb-3">
              {post.category}
            </span>
            <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-white leading-tight">
              {post.title}
            </h1>
          </div>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        {/* Meta */}
        <div className="flex flex-wrap items-center gap-4 text-sm text-gray-500 mb-8 pb-6 border-b border-gray-200">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-full overflow-hidden">
              <Image src={post.authorAvatar} alt={post.author} width={32} height={32} className="w-full h-full object-cover" />
            </div>
            <span className="font-medium text-gray-700">{post.author}</span>
          </div>
          <span className="flex items-center gap-1"><FiCalendar size={13} /> {post.date}</span>
          <span className="flex items-center gap-1"><FiClock size={13} /> {post.readTime}</span>
          <span className="flex items-center gap-1"><FiMessageSquare size={13} /> {post.comments} Comments</span>
        </div>

        {/* Content */}
        <div
          className="prose prose-lg max-w-none text-gray-700 prose-headings:text-gray-900 prose-headings:font-bold prose-p:leading-relaxed prose-p:mb-4 prose-h2:text-xl prose-h2:mt-8 prose-h2:mb-3"
          dangerouslySetInnerHTML={{ __html: post.content }}
        />

        {/* Tags */}
        <div className="mt-10 pt-6 border-t border-gray-200">
          <div className="flex flex-wrap items-center gap-2">
            <FiTag className="text-gray-400" size={15} />
            {post.tags.map((tag) => (
              <span key={tag} className="text-xs bg-gray-100 text-gray-600 px-3 py-1.5 rounded-lg font-medium hover:bg-green-50 hover:text-green-600 transition-colors cursor-pointer">
                {tag}
              </span>
            ))}
          </div>
        </div>

        {/* Author Box */}
        <div className="mt-8 bg-green-50 rounded-2xl p-6 flex flex-col sm:flex-row items-start sm:items-center gap-4">
          <div className="w-16 h-16 rounded-full overflow-hidden shrink-0 border-2 border-green-200">
            <Image src={post.authorAvatar} alt={post.author} width={64} height={64} className="w-full h-full object-cover" />
          </div>
          <div>
            <div className="flex items-center gap-2 mb-1">
              <FiUser className="text-green-600" size={14} />
              <span className="text-xs text-green-600 font-semibold uppercase tracking-wide">Written by</span>
            </div>
            <h4 className="font-bold text-gray-900">{post.author}</h4>
            <p className="text-sm text-gray-500 mt-1">Career writer and industry expert sharing insights to help professionals grow in their careers.</p>
          </div>
        </div>

        {/* Related Posts */}
        {related.length > 0 && (
          <div className="mt-14">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">Related Articles</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
              {related.map((p) => <BlogCard key={p.id} post={p} />)}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}