"use client";
import { useState, useMemo } from "react";
import { FiSearch } from "react-icons/fi";
import BlogCard from "@/components/shared/BlogCard";
import { blogPosts } from "@/data/blog";

const categories = ["All", "Career Tips", "Hiring", "Remote Work", "Networking"];

export default function BlogPage() {
  const [keyword, setKeyword] = useState("");
  const [activeCategory, setActiveCategory] = useState("All");

  const filtered = useMemo(() => {
    return blogPosts.filter((p) => {
      const matchesKeyword = !keyword || p.title.toLowerCase().includes(keyword.toLowerCase()) || p.excerpt.toLowerCase().includes(keyword.toLowerCase());
      const matchesCategory = activeCategory === "All" || p.category === activeCategory;
      return matchesKeyword && matchesCategory;
    });
  }, [keyword, activeCategory]);

  return (
    <div className="min-h-screen bg-gray-50 pt-20">
      <div className="bg-gradient-to-r from-gray-900 to-green-950 py-14">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-3xl sm:text-4xl font-bold text-white mb-2">News & Articles</h1>
          <p className="text-green-200">Career advice, hiring tips, and industry insights</p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        {/* Filters */}
        <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-center justify-between mb-8">
          <div className="flex flex-wrap gap-2">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className={`text-sm px-4 py-2 rounded-full font-medium transition-colors ${
                  activeCategory === cat
                    ? "bg-green-600 text-white"
                    : "bg-white border border-gray-200 text-gray-600 hover:border-green-300 hover:text-green-600"
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
          <div className="flex items-center gap-2 bg-white border border-gray-200 rounded-xl px-3 py-2.5 w-full sm:w-auto sm:min-w-[220px]">
            <FiSearch className="text-green-500 shrink-0" size={15} />
            <input
              type="text"
              placeholder="Search articles..."
              value={keyword}
              onChange={(e) => setKeyword(e.target.value)}
              className="w-full text-sm outline-none text-gray-700 placeholder-gray-400"
            />
          </div>
        </div>

        {filtered.length === 0 ? (
          <div className="text-center py-20">
            <div className="text-5xl mb-4">📝</div>
            <h3 className="text-xl font-bold text-gray-800 mb-2">No articles found</h3>
            <p className="text-gray-500">Try a different search term or category</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {filtered.map((post) => (
              <BlogCard key={post.id} post={post} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
