"use client";

import React, { use } from "react";
import Link from "next/link";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { useProjects, BlogPost } from "@/context/ProjectContext";
import { motion } from "framer-motion";
import { ArrowLeft, Calendar, User, BookOpen, Clock, ChevronRight } from "lucide-react";

export default function BlogDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = use(params);
  const { blogs } = useProjects();

  const post = blogs.find((b) => b.id === id);

  // Get related posts (published, same category or other, excluding current post)
  const relatedPosts = blogs
    .filter((b) => b.status === "published" && b.id !== id)
    .slice(0, 3);

  // Markdown-like parser
  const renderContent = (content: string) => {
    return content.split("\n\n").map((block, idx) => {
      const trimmedBlock = block.trim();
      if (trimmedBlock.startsWith("###")) {
        return (
          <h3 key={idx} className="font-display font-bold text-xl text-white mt-8 mb-4 border-b border-white/5 pb-2">
            {trimmedBlock.replace("###", "").trim()}
          </h3>
        );
      }
      if (trimmedBlock.startsWith("-")) {
        const items = trimmedBlock.split("\n").map(item => item.replace("-", "").trim());
        return (
          <ul key={idx} className="list-disc pl-5 my-4 space-y-2 text-slate-300 text-sm">
            {items.map((it, i) => <li key={i}>{it}</li>)}
          </ul>
        );
      }
      if (trimmedBlock.match(/^\d+\./)) {
        const items = trimmedBlock.split("\n").map(item => item.replace(/^\d+\./, "").trim());
        return (
          <ol key={idx} className="list-decimal pl-5 my-4 space-y-2 text-slate-300 text-sm">
            {items.map((it, i) => <li key={i}>{it}</li>)}
          </ol>
        );
      }
      return (
        <p key={idx} className="text-slate-300 leading-relaxed my-4 text-sm">
          {trimmedBlock}
        </p>
      );
    });
  };

  if (!post || post.status !== "published") {
    return (
      <div className="flex flex-col min-h-screen">
        <Header />
        <main className="flex-grow py-20 relative z-10 flex items-center justify-center">
          <div className="text-center max-w-md bg-glass-dark border border-white/5 rounded-2xl p-8 shadow-premium space-y-4">
            <BookOpen className="h-12 w-12 text-slate-500 mx-auto animate-pulse" />
            <h2 className="font-display font-extrabold text-xl text-white">Article Not Found</h2>
            <p className="text-xs text-slate-400">
              The engineering article you are looking for has been drafted, deleted, or relocated.
            </p>
            <Link 
              href="/blog"
              className="inline-flex items-center gap-1.5 bg-orange-500 hover:bg-orange-600 text-white rounded-lg px-6 py-2.5 text-xs font-bold transition-all uppercase tracking-wider"
            >
              <ArrowLeft className="h-4 w-4" /> Return to Blog
            </Link>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  return (
    <div className="flex flex-col min-h-screen">
      <Header />

      <main className="flex-grow py-12 relative z-10">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          
          {/* Breadcrumb */}
          <div className="mb-8">
            <Link 
              href="/blog" 
              className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-orange-500 hover:text-white transition-colors duration-200"
            >
              <ArrowLeft className="h-4 w-4" /> Back to Blog insights
            </Link>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
            
            {/* Left Column: Full Post Details */}
            <article className="lg:col-span-8 bg-glass-dark border border-white/5 rounded-2xl p-6 md:p-10 shadow-premium space-y-6">
              
              {/* Header Info */}
              <div className="space-y-4">
                <span className="inline-block text-[10px] bg-orange-500 text-white px-2.5 py-1 rounded-md font-bold uppercase tracking-wider">
                  {post.category}
                </span>
                <h1 className="font-display font-extrabold text-2xl md:text-3xl lg:text-4xl text-white tracking-tight leading-tight">
                  {post.title}
                </h1>
                
                {/* Meta details */}
                <div className="flex flex-wrap gap-5 items-center text-[10px] text-slate-400 font-bold uppercase tracking-wide border-y border-white/5 py-3.5">
                  <span className="flex items-center gap-1.5">
                    <User className="h-4 w-4 text-orange-500" />
                    Author: {post.author}
                  </span>
                  <span className="flex items-center gap-1.5">
                    <Calendar className="h-4 w-4 text-orange-500" />
                    Published: {post.date}
                  </span>
                  <span className="flex items-center gap-1.5">
                    <Clock className="h-4 w-4 text-orange-500" />
                    Read Time: 5 Mins
                  </span>
                </div>
              </div>

              {/* Main Banner Image */}
              <div className="aspect-video w-full rounded-xl overflow-hidden bg-slate-900 border border-white/5 relative">
                <img 
                  src={post.image} 
                  alt={post.title} 
                  className="w-full h-full object-cover"
                />
              </div>

              {/* Post Content Body */}
              <div className="prose prose-invert max-w-none text-justify">
                {renderContent(post.content)}
              </div>

            </article>

            {/* Right Column: Sticky Sidebar with Details & Related Posts */}
            <aside className="lg:col-span-4 space-y-8 lg:sticky lg:top-24">
              
              {/* Author widget */}
              <div className="bg-glass-dark border border-white/5 rounded-2xl p-6 shadow-premium space-y-4 relative overflow-hidden">
                <div className="absolute top-0 right-0 h-24 w-24 bg-orange-500 rounded-full blur-3xl opacity-10 pointer-events-none"></div>
                <h4 className="font-display font-extrabold text-xs text-white uppercase tracking-wider border-b border-white/5 pb-2">
                  Post Contributor
                </h4>
                <div className="flex items-center gap-3">
                  <div className="h-10 w-10 rounded-full bg-orange-500/10 border border-orange-500/20 text-orange-500 flex items-center justify-center font-bold text-sm">
                    {post.author.split(" ").map(w => w[0]).join("")}
                  </div>
                  <div>
                    <span className="block text-xs font-bold text-white">{post.author}</span>
                    <span className="block text-[10px] text-slate-400 mt-0.5">Chartered Design Partner</span>
                  </div>
                </div>
              </div>

              {/* Related posts */}
              {relatedPosts.length > 0 && (
                <div className="bg-glass-dark border border-white/5 rounded-2xl p-6 shadow-premium space-y-4">
                  <h4 className="font-display font-extrabold text-xs text-white uppercase tracking-wider border-b border-white/5 pb-2">
                    Related Articles
                  </h4>
                  
                  <div className="divide-y divide-white/5">
                    {relatedPosts.map((rPost) => (
                      <Link 
                        key={rPost.id}
                        href={`/blog/${rPost.id}`}
                        className="py-3 flex gap-3 items-center group block first:pt-0 last:pb-0"
                      >
                        <div className="h-12 w-16 bg-slate-800 rounded-lg overflow-hidden flex-shrink-0 border border-white/5">
                          <img src={rPost.image} alt={rPost.title} className="h-full w-full object-cover group-hover:scale-105 transition-transform duration-300" />
                        </div>
                        <div className="flex-grow space-y-0.5">
                          <span className="block text-[8px] font-bold text-orange-500 uppercase tracking-widest">{rPost.category}</span>
                          <span className="block text-xs font-semibold text-white group-hover:text-orange-500 transition-colors line-clamp-1 leading-snug">
                            {rPost.title}
                          </span>
                        </div>
                        <ChevronRight className="h-4.5 w-4.5 text-slate-500 group-hover:translate-x-1 transition-transform" />
                      </Link>
                    ))}
                  </div>
                </div>
              )}

              {/* Engineering Calculator CTA */}
              <div className="bg-gradient-to-br from-orange-500/10 to-transparent border border-orange-500/20 rounded-2xl p-6 shadow-premium space-y-3">
                <span className="block text-[9px] uppercase font-extrabold text-orange-500 tracking-wider">Quick Calculation</span>
                <h5 className="font-display font-extrabold text-sm text-white">Need an Instant Cost Quote?</h5>
                <p className="text-[10px] text-slate-300 leading-normal">
                  Skip the guesswork. Try our standard-compliant concrete, steel, and budget calculators to get figures instantly.
                </p>
                <div className="pt-2">
                  <Link 
                    href="/#calculators"
                    className="inline-block bg-orange-500 hover:bg-orange-600 text-white rounded-lg px-4 py-2 text-[10px] font-bold uppercase tracking-wider transition-colors shadow-sm"
                  >
                    Launch Calculators
                  </Link>
                </div>
              </div>

            </aside>
            
          </div>

        </div>
      </main>

      <Footer />
    </div>
  );
}
