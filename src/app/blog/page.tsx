"use client";

import { useState } from "react";
import { FiSearch } from "react-icons/fi";
import { blogPosts } from "@/data/blog";
import BlogCard from "@/components/shared/BlogCard";

export default function BlogPage() {
  const [search, setSearch] = useState("");
  const [activeCategory, setActiveCategory] = useState("All");

  const categories = ["All", ...Array.from(new Set(blogPosts.map(post => post.category)))];

  const filteredPosts = blogPosts.filter(post => {
    const matchesSearch = post.title.toLowerCase().includes(search.toLowerCase()) || 
                          post.excerpt.toLowerCase().includes(search.toLowerCase());
    const matchesCategory = activeCategory === "All" || post.category === activeCategory;
    return matchesSearch && matchesCategory;
  });

  return (
    <div className="min-h-screen bg-[var(--surface)] pb-20 animate-fade-in-up">
      {/* Hero */}
      <section className="bg-[var(--ink)] pt-[calc(var(--nav-height)+3rem)] pb-16 relative overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_60%_80%_at_100%_0%,rgba(0,166,81,0.08)_0%,transparent_60%),radial-gradient(ellipse_40%_60%_at_0%_100%,rgba(141,198,63,0.06)_0%,transparent_50%)] pointer-events-none" />
        <div className="container-xl relative text-center">
          <h1 className="text-[clamp(2rem,5vw,3.5rem)] font-extrabold text-white mb-4 -tracking-[0.02em] leading-[1.1]">
            News & Articles
          </h1>
          <p className="text-white/70 text-lg max-w-[600px] mx-auto">
            Career advice, hiring tips, and industry insights from JustJobNG
          </p>
        </div>
      </section>

      {/* Sticky Toolbar */}
      <div className="sticky top-[var(--nav-height)] z-30 bg-[var(--surface-elevated)] border-b border-[var(--border)] shadow-[var(--shadow-sm)]">
        <div className="container-xl flex flex-row gap-4 py-4 items-center justify-between flex-wrap">
          
          {/* Categories */}
          <div className="flex gap-2 overflow-x-auto pb-1 hide-scrollbar">
            {categories.map(cat => (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className={`jj-pill whitespace-nowrap cursor-pointer transition-colors ${
                  activeCategory === cat 
                    ? 'bg-[var(--gold)] text-white border-[var(--gold)]' 
                    : 'bg-[var(--surface)] text-[var(--ink)] border-[var(--border)] hover:bg-[var(--surface-elevated)]'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>

          {/* Search */}
          <div className="relative min-w-[250px] flex-[1_1_auto] max-w-[400px]">
            <FiSearch size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-[var(--text-faint)]" />
            <input 
              type="text"
              placeholder="Search articles..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full py-2.5 pr-3.5 pl-9 rounded-[var(--radius-sm)] border border-[var(--border-strong)] outline-none bg-[var(--surface)] focus:border-[var(--gold)] focus:ring-[2px] focus:ring-[var(--gold-muted)] transition-all"
            />
          </div>
        </div>
      </div>

      {/* Main Content */}
      <section className="container-xl mt-8">
        <div className="mb-8 text-[15px] font-semibold text-[var(--text-muted)]">
          Showing {filteredPosts.length} article{filteredPosts.length !== 1 ? 's' : ''}
        </div>

        {filteredPosts.length === 0 ? (
          <div className="text-center py-24">
            <div className="text-6xl mb-4">🔍</div>
            <h3 className="text-2xl font-extrabold text-[var(--ink)] mb-2">No articles found</h3>
            <p className="text-[var(--text-muted)]">Try adjusting your search or category filter.</p>
          </div>
        ) : (
          <div className="grid grid-cols-[repeat(auto-fill,minmax(320px,1fr))] gap-8">
            {filteredPosts.map((post, i) => (
              <BlogCard key={post.id} post={post} featured={i === 0 && activeCategory === "All" && search === ""} />
            ))}
          </div>
        )}
      </section>
    </div>
  );
}
