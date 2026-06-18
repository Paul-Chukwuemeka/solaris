import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, Clock, Tag } from "lucide-react";
import { posts } from "@/lib/posts";

export const metadata: Metadata = {
  title: "Solar Energy Blog",
  description:
    "Expert guides on solar sizing, inverter pricing, battery comparisons, and energy independence for Nigerian homes and businesses. Written by the Winepress Solar engineering team.",
  alternates: { canonical: "https://winepresssolar.com/blog" },
  openGraph: {
    url: "https://winepresssolar.com/blog",
    title: "Solar Energy Blog | Winepress Solar Services",
    description:
      "Practical solar guides for Nigerian homeowners and SMEs — system sizing, pricing, equipment comparisons, and more.",
  },
};

const categoryColors: Record<string, string> = {
  "System Sizing": "text-primary bg-primary/10",
  Pricing: "text-foreground bg-surface border border-border",
  "Energy Independence": "text-primary bg-primary/10",
  Equipment: "text-foreground bg-surface border border-border",
};

function formatDate(dateStr: string) {
  return new Date(dateStr).toLocaleDateString("en-NG", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });
}

export default function BlogPage() {
  const [featured, ...rest] = posts.slice().reverse(); // newest first

  return (
    <main className="min-h-screen bg-background pt-32 pb-20">

      {/* Hero */}
      <section className="max-w-7xl mx-auto px-6 mb-20">
        <p className="text-primary font-black tracking-widest uppercase text-xs mb-4">Solar Knowledge Hub</p>
        <h1 className="font-display font-black text-5xl md:text-7xl text-foreground leading-none tracking-tighter mb-6 max-w-4xl">
          Solar Guides.<br />
          <span className="text-primary italic">For Nigeria.</span>
        </h1>
        <p className="text-secondary-text max-w-xl text-base font-medium leading-relaxed">
          Practical advice on system sizing, equipment, pricing, and energy independence — written by the Winepress Solar engineering team.
        </p>
      </section>

      {/* Featured Post */}
      <section className="max-w-7xl mx-auto px-6 mb-16">
        <Link
          href={`/blog/${featured.slug}`}
          className="group block bg-surface border border-border rounded-[8px] p-10 md:p-14 hover:border-primary transition-colors duration-300"
        >
          <div className="flex items-center gap-3 mb-6">
            <span className={`text-[9px] font-black uppercase tracking-widest px-2.5 py-1 rounded-[4px] ${categoryColors[featured.category] ?? "bg-surface border border-border text-foreground"}`}>
              {featured.category}
            </span>
            <span className="text-[9px] font-bold uppercase tracking-widest text-secondary-text">Featured</span>
          </div>
          <h2 className="font-display font-black text-2xl md:text-4xl text-foreground tracking-tighter leading-tight mb-4 group-hover:text-primary transition-colors">
            {featured.title}
          </h2>
          <p className="text-secondary-text text-base font-medium leading-relaxed mb-8 max-w-2xl">
            {featured.excerpt}
          </p>
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-6 text-secondary-text text-[10px] font-bold uppercase tracking-widest">
              <span className="flex items-center gap-1.5"><Clock className="w-3.5 h-3.5" /> {featured.readTime}</span>
              <span>{formatDate(featured.date)}</span>
            </div>
            <span className="inline-flex items-center gap-2 text-[10px] font-black uppercase tracking-widest text-primary group-hover:gap-3 transition-all">
              Read Article <ArrowRight className="w-3.5 h-3.5" />
            </span>
          </div>
        </Link>
      </section>

      {/* Post Grid */}
      <section className="max-w-7xl mx-auto px-6 mb-20">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          {rest.map((post) => (
            <Link
              key={post.slug}
              href={`/blog/${post.slug}`}
              className="group bg-surface border border-border rounded-[8px] p-8 hover:border-primary transition-colors duration-300 flex flex-col"
            >
              <div className="flex items-center gap-2 mb-5">
                <Tag className="w-3 h-3 text-primary" />
                <span className={`text-[9px] font-black uppercase tracking-widest px-2 py-0.5 rounded-[4px] ${categoryColors[post.category] ?? "bg-surface border border-border text-foreground"}`}>
                  {post.category}
                </span>
              </div>
              <h3 className="font-display font-black text-lg text-foreground tracking-tighter leading-tight mb-3 group-hover:text-primary transition-colors flex-1">
                {post.title}
              </h3>
              <p className="text-secondary-text text-sm font-medium leading-relaxed mb-6 line-clamp-3">
                {post.excerpt}
              </p>
              <div className="flex items-center justify-between mt-auto pt-5 border-t border-border">
                <div className="flex items-center gap-4 text-secondary-text text-[9px] font-bold uppercase tracking-widest">
                  <span className="flex items-center gap-1"><Clock className="w-3 h-3" /> {post.readTime}</span>
                  <span>{formatDate(post.date)}</span>
                </div>
                <ArrowRight className="w-4 h-4 text-primary opacity-0 group-hover:opacity-100 group-hover:translate-x-1 transition-all" />
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* CTA */}
      <section className="max-w-7xl mx-auto px-6">
        <div className="bg-surface border border-border rounded-[8px] p-10 md:p-14 text-center">
          <h3 className="font-display font-black text-2xl md:text-3xl text-foreground uppercase tracking-tighter mb-3">
            Ready to Size Your System?
          </h3>
          <p className="text-secondary-text text-sm font-medium max-w-xl mx-auto mb-8">
            Use our free solar calculator to get an instant system estimate tailored to your appliances, region, and backup needs.
          </p>
          <Link href="/calculator" className="btn-flat btn-primary h-14 px-12 text-xs uppercase tracking-widest inline-flex items-center gap-3">
            Run the Free Calculator <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </section>

    </main>
  );
}
