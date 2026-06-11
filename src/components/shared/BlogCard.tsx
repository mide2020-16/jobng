import Link from "next/link";
import Image from "next/image";
import { FiCalendar, FiMessageSquare, FiClock } from "react-icons/fi";
import { BlogPost } from "@/types";

export default function BlogCard({ post }: { post: BlogPost }) {
  return (
    <div className="job-card bg-white rounded-2xl border border-gray-100 overflow-hidden shadow-sm flex flex-col">
      <Link href={`/blog/${post.slug}`} className="block overflow-hidden">
        <div className="relative h-48">
          <Image
            src={post.image}
            alt={post.title}
            fill
            className="object-cover hover:scale-105 transition-transform duration-500"
          />
          <span className="absolute top-3 left-3 bg-green-600 text-white text-xs font-semibold px-3 py-1 rounded-full">
            {post.category}
          </span>
        </div>
      </Link>
      <div className="p-5 flex flex-col flex-1">
        <div className="flex items-center gap-3 text-xs text-gray-400 mb-3">
          <span className="flex items-center gap-1">
            <FiCalendar size={11} /> {post.date}
          </span>
          <span className="flex items-center gap-1">
            <FiClock size={11} /> {post.readTime}
          </span>
          <span className="flex items-center gap-1">
            <FiMessageSquare size={11} /> {post.comments}
          </span>
        </div>
        <Link
          href={`/blog/${post.slug}`}
          className="font-semibold text-gray-900 hover:text-green-600 transition-colors leading-snug line-clamp-2 mb-2"
        >
          {post.title}
        </Link>
        <p className="text-sm text-gray-500 line-clamp-2 flex-1">{post.excerpt}</p>
        <div className="flex items-center justify-between mt-4 pt-4 border-t border-gray-100">
          <div className="flex items-center gap-2">
            <div className="w-7 h-7 rounded-full overflow-hidden">
              <Image
                src={post.authorAvatar}
                alt={post.author}
                width={28}
                height={28}
                className="w-full h-full object-cover"
              />
            </div>
            <span className="text-xs font-medium text-gray-700">{post.author}</span>
          </div>
          <Link
            href={`/blog/${post.slug}`}
            className="text-xs text-green-600 hover:text-green-800 font-semibold transition-colors"
          >
            Read More →
          </Link>
        </div>
      </div>
    </div>
  );
}
