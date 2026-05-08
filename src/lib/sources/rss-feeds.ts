import { Category } from "@prisma/client";

export const RSS_FEEDS: { key: string; name: string; url: string; category: Category; weight: number }[] = [
  { key: 'anthropic-news',    name: 'Anthropic',    url: 'https://www.anthropic.com/news/rss.xml',                  category: 'AI',         weight: 1.0 },
  { key: 'openai-news',       name: 'OpenAI',       url: 'https://openai.com/news/rss.xml',                         category: 'AI',         weight: 1.0 },
  { key: 'google-ai-blog',    name: 'Google AI',    url: 'https://blog.google/technology/ai/rss/',                  category: 'AI',         weight: 0.9 },
  { key: 'huggingface-blog',  name: 'Hugging Face', url: 'https://huggingface.co/blog/feed.xml',                    category: 'AI',         weight: 0.85 },
  { key: 'vercel-changelog',  name: 'Vercel',       url: 'https://vercel.com/changelog/rss.xml',                    category: 'Web',        weight: 0.95 },
  { key: 'aws-whats-new',     name: 'AWS',          url: 'https://aws.amazon.com/about-aws/whats-new/recent/feed/', category: 'Cloud',      weight: 0.9 },
  { key: 'gcp-release-notes', name: 'GCP',          url: 'https://cloud.google.com/feeds/gcp-release-notes.xml',   category: 'Cloud',      weight: 0.9 },
  { key: 'cloudflare-blog',   name: 'Cloudflare',   url: 'https://blog.cloudflare.com/rss/',                        category: 'Cloud',      weight: 0.85 },
  { key: 'npm-recent',        name: 'npm',          url: 'https://registry.npmjs.org/-/rss/recentlyUpdated',        category: 'OpenSource', weight: 0.5 },
  { key: 'pypi-updates',      name: 'PyPI',         url: 'https://pypi.org/rss/updates.xml',                        category: 'OpenSource', weight: 0.5 },
];
