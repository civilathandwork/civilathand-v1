"use client";

import React, { useState } from "react";
import Link from "next/link";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { useProjects, BlogPost } from "@/context/ProjectContext";
import { generateSlug } from "@/lib/utils";
import { motion, AnimatePresence } from "framer-motion";
import { Search, Calendar, User, ArrowRight, BookOpen } from "lucide-react";

export default function BlogListingPage() {
  const { blogs } = useProjects();
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState<string>("All");

  // Get only published blogs
  const publishedBlogs = blogs.filter((post) => post.status === "published");

  // Filter categories
  const categories = ["All", "Structural", "Architecture", "Estimation", "BIM", "General"];

  // Filter and Search logic
  const filteredBlogs = publishedBlogs.filter((post) => {
    const matchesCategory = selectedCategory === "All" || post.category === selectedCategory;
    const matchesSearch = 
      post.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      post.summary.toLowerCase().includes(searchTerm.toLowerCase()) ||
      post.content.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  return (
    <div className="flex flex-col min-h-screen">
      <Header />

      <main className="flex-grow py-12 relative z-10">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          
          {/* Page Heading */}
          <div className="text-center max-w-3xl mx-auto mb-12">
            <motion.h1 
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              className="font-display text-4xl font-extrabold tracking-tight text-slate-900 sm:text-5xl"
            >
              Engineering <span className="text-orange-500">Insights & Tech Blog</span>
            </motion.h1>
            <motion.p 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.1 }}
              className="mt-3 text-sm text-slate-600 leading-relaxed"
            >
              Chartered structural blueprints, BIM modeling updates, AI calculations workflows, and construction material standards logs.
            </motion.p>
          </div>

          {/* Search & Filter Toolbar */}
          <div className="bg-white border border-slate-200 rounded-2xl p-5 md:p-6 mb-10 shadow-premium flex flex-col md:flex-row justify-between items-center gap-5">
            {/* Category tabs */}
            <div className="flex flex-wrap gap-2 justify-center md:justify-start w-full md:w-auto">
              {categories.map((cat) => (
                <button
                  key={cat}
                  onClick={() => setSelectedCategory(cat)}
                  className={`px-4 py-2 rounded-lg text-xs font-bold transition-all uppercase tracking-wider ${
                    selectedCategory === cat
                      ? "bg-orange-500 text-white shadow-orange-glow"
                      : "bg-slate-100 border border-slate-200 text-slate-600 hover:bg-slate-200"
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>

            {/* Search Input */}
            <div className="relative w-full md:w-80">
              <input
                type="text"
                placeholder="Search articles..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full bg-white border border-slate-300 rounded-xl pl-10 pr-4 py-2.5 text-xs text-slate-800 focus:outline-none focus:border-blue-600 focus:ring-1 focus:ring-blue-600 font-semibold placeholder-slate-450 shadow-sm transition-all"
              />
              <Search className="absolute left-3.5 top-3 h-4 w-4 text-slate-400" />
            </div>
          </div>

          {/* Grid Listing */}
          <AnimatePresence mode="popLayout">
            {filteredBlogs.length === 0 ? (
              <motion.div 
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                className="text-center py-20 bg-white border border-slate-200 rounded-2xl shadow-premium"
              >
                <BookOpen className="h-12 w-12 mx-auto text-slate-400 mb-4 animate-pulse" />
                <h3 className="font-display font-bold text-lg text-slate-900">No Articles Found</h3>
                <p className="text-xs text-slate-500 mt-1 max-w-xs mx-auto">
                  We couldn't find any published engineering posts matching your search query or filters.
                </p>
              </motion.div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {filteredBlogs.map((post, idx) => (
                  <motion.article 
                    key={post.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, scale: 0.95 }}
                    transition={{ duration: 0.3, delay: idx * 0.05 }}
                    className="bg-white border border-slate-200 rounded-2xl overflow-hidden shadow-premium group flex flex-col h-full hover:border-slate-300 hover:shadow-premium-lg transition-all duration-300"
                  >
                    {/* Banner Image */}
                    <div className="h-48 overflow-hidden relative bg-slate-900 border-b border-slate-100">
                      <img 
                        src={post.image} 
                        alt={post.title} 
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 ease-out"
                      />
                      <div className="absolute top-4 left-4">
                        <span className="text-[10px] bg-orange-500 text-white px-2.5 py-1 rounded-md font-bold uppercase tracking-wider shadow-sm">
                          {post.category}
                        </span>
                      </div>
                    </div>

                    {/* Card Body */}
                    <div className="p-6 flex-grow flex flex-col justify-between space-y-4">
                      <div className="space-y-2.5">
                        {/* Meta */}
                        <div className="flex gap-4 items-center text-[10px] text-slate-500 font-bold uppercase tracking-wide">
                          <span className="flex items-center gap-1">
                            <Calendar className="h-3.5 w-3.5 text-orange-500" />
                            {post.date}
                          </span>
                          <span className="flex items-center gap-1">
                            <User className="h-3.5 w-3.5 text-orange-500" />
                            {post.author}
                          </span>
                        </div>

                        {/* Title */}
                        <h3 className="font-display font-extrabold text-lg text-slate-900 group-hover:text-orange-500 transition-colors duration-200 line-clamp-2 leading-tight">
                          {post.title}
                        </h3>

                        {/* Summary */}
                        <p className="text-xs text-slate-600 leading-relaxed line-clamp-3">
                          {post.summary}
                        </p>
                      </div>

                      {/* Read Action */}
                      <div className="pt-2">
                        <Link 
                          href={`/blog/${post.slug || generateSlug(post.title)}`}
                          className="inline-flex items-center gap-1.5 text-xs font-bold text-orange-500 hover:text-slate-900 uppercase tracking-wider group-hover:gap-2.5 transition-all duration-200"
                        >
                          Read Full Article
                          <ArrowRight className="h-4 w-4" />
                        </Link>
                      </div>
                    </div>
                  </motion.article>
                ))}
              </div>
            )}
          </AnimatePresence>

        </div>
      </main>

      <Footer />
    </div>
  );
}
