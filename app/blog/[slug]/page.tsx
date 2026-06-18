import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import { ArrowLeft, Clock, Tag, ArrowRight } from "lucide-react";
import { posts, getPost } from "@/lib/posts";
import WhatsAppLink from "@/components/WhatsAppLink";

type Props = { params: Promise<{ slug: string }> };

export async function generateStaticParams() {
  return posts.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const post = getPost(slug);
  if (!post) return {};
  return {
    title: post.title,
    description: post.excerpt,
    keywords: post.keywords,
    alternates: { canonical: `https://winepresssolar.com/blog/${slug}` },
    openGraph: {
      url: `https://winepresssolar.com/blog/${slug}`,
      title: post.title,
      description: post.excerpt,
    },
  };
}

function formatDate(dateStr: string) {
  return new Date(dateStr).toLocaleDateString("en-NG", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });
}

export default async function BlogPostPage({ params }: Props) {
  const { slug } = await params;
  const post = getPost(slug);
  if (!post) notFound();

  let Content: React.ComponentType;
  try {
    const mod = await import(`@/content/blog/${slug}.mdx`);
    Content = mod.default;
  } catch {
    notFound();
  }

  const related = posts.filter((p) => p.slug !== slug).slice(0, 2);

  const articleSchema = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: post.title,
    description: post.excerpt,
    datePublished: post.date,
    author: {
      "@type": "Organization",
      name: "Winepress Solar Services",
      url: "https://winepresssolar.com",
    },
    publisher: {
      "@type": "Organization",
      name: "Winepress Solar Services",
      url: "https://winepresssolar.com",
    },
  };

  return (
    <main className="min-h-screen bg-background pt-32 pb-20">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(articleSchema) }}
      />

      <div className="max-w-7xl mx-auto px-6">
        {/* Breadcrumb */}
        <div className="mb-12">
          <Link
            href="/blog"
            className="inline-flex items-center gap-2 text-[10px] font-black uppercase tracking-widest text-secondary-text hover:text-foreground transition-colors"
          >
            <ArrowLeft className="w-3.5 h-3.5" /> All Articles
          </Link>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-[1fr_320px] gap-16">
          {/* Article */}
          <article>
            {/* Meta */}
            <div className="flex flex-wrap items-center gap-4 mb-8">
              <span className="flex items-center gap-1.5 text-[10px] font-black uppercase tracking-widest text-primary">
                <Tag className="w-3 h-3" /> {post.category}
              </span>
              <span className="flex items-center gap-1.5 text-[10px] font-bold uppercase tracking-widest text-secondary-text">
                <Clock className="w-3 h-3" /> {post.readTime}
              </span>
              <span className="text-[10px] font-bold uppercase tracking-widest text-secondary-text">
                {formatDate(post.date)}
              </span>
            </div>

            {/* Content */}
            <div className="prose-content">
              <Content />
            </div>

            {/* Author note */}
            <div className="mt-16 pt-8 border-t border-border flex items-start gap-5">
              <div className="w-12 h-12 bg-primary rounded-[4px] flex items-center justify-center font-display font-black text-background text-lg shrink-0">
                W
              </div>
              <div>
                <p className="font-black text-foreground text-sm uppercase tracking-widest mb-1">Winepress Solar Team</p>
                <p className="text-secondary-text text-sm font-medium leading-relaxed">
                  Professional solar engineers serving Nigerian homes and businesses since 2021. Every article is reviewed by our technical team for accuracy.
                </p>
              </div>
            </div>
          </article>

          {/* Sidebar */}
          <aside className="space-y-6">
            {/* CTA card */}
            <div className="bg-primary rounded-[8px] p-8 text-background">
              <p className="text-[10px] font-black uppercase tracking-widest text-background/70 mb-3">Free Tool</p>
              <h3 className="font-display font-black text-xl text-background tracking-tighter mb-3">
                Size Your Solar System
              </h3>
              <p className="text-background/80 text-sm font-medium leading-relaxed mb-6">
                Use our calculator to get an instant estimate — panels, batteries, inverter, and cost.
              </p>
              <Link
                href="/calculator"
                className="btn-flat h-12 px-6 text-xs uppercase tracking-widest bg-background text-primary hover:bg-surface w-full justify-center"
              >
                Free Calculator <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            </div>

            {/* WhatsApp */}
            <div className="bg-surface border border-border rounded-[8px] p-8">
              <p className="text-[10px] font-black uppercase tracking-widest text-secondary-text mb-3">Talk to an Expert</p>
              <p className="text-sm text-foreground font-medium leading-relaxed mb-5">
                Have questions about your solar setup? Our engineers are on WhatsApp.
              </p>
              <WhatsAppLink
                source={`blog-${slug}`}
                className="btn-flat btn-outline h-12 px-6 text-xs uppercase tracking-widest w-full justify-center"
              />
            </div>

            {/* Related posts */}
            {related.length > 0 && (
              <div className="bg-surface border border-border rounded-[8px] p-8">
                <p className="text-[10px] font-black uppercase tracking-widest text-secondary-text mb-5">More Articles</p>
                <div className="space-y-5">
                  {related.map((r) => (
                    <Link
                      key={r.slug}
                      href={`/blog/${r.slug}`}
                      className="group block border-b border-border pb-5 last:border-0 last:pb-0"
                    >
                      <p className="text-[9px] font-black uppercase tracking-widest text-primary mb-1">{r.category}</p>
                      <p className="text-sm font-black text-foreground group-hover:text-primary transition-colors leading-snug">
                        {r.title}
                      </p>
                      <p className="text-[10px] font-bold text-secondary-text mt-1 uppercase tracking-widest">{r.readTime}</p>
                    </Link>
                  ))}
                </div>
              </div>
            )}
          </aside>
        </div>
      </div>
    </main>
  );
}
