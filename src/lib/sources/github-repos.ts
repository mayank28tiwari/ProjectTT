import { Category } from "@prisma/client";

export const GITHUB_REPOS: { owner: string; repo: string; category: Category; weight: number }[] = [
  // AI/ML core (10)
  { owner: 'langchain-ai', repo: 'langchain', category: 'AI', weight: 0.9 },
  { owner: 'langchain-ai', repo: 'langgraph', category: 'AI', weight: 0.9 },
  { owner: 'openai', repo: 'openai-python', category: 'AI', weight: 1.0 },
  { owner: 'anthropics', repo: 'anthropic-sdk-python', category: 'AI', weight: 1.0 },
  { owner: 'huggingface', repo: 'transformers', category: 'AI', weight: 0.95 },
  { owner: 'vllm-project', repo: 'vllm', category: 'AI', weight: 0.85 },
  { owner: 'ggerganov', repo: 'llama.cpp', category: 'AI', weight: 0.85 },
  { owner: 'ollama', repo: 'ollama', category: 'AI', weight: 0.9 },
  { owner: 'pgvector', repo: 'pgvector', category: 'Data', weight: 0.8 },
  { owner: 'qdrant', repo: 'qdrant', category: 'Data', weight: 0.8 },
  // Web/Backend (10)
  { owner: 'vercel', repo: 'next.js', category: 'Web', weight: 1.0 },
  { owner: 'vercel', repo: 'ai', category: 'AI', weight: 0.85 },
  { owner: 'facebook', repo: 'react', category: 'Web', weight: 0.95 },
  { owner: 'tailwindlabs', repo: 'tailwindcss', category: 'Web', weight: 0.85 },
  { owner: 'shadcn-ui', repo: 'ui', category: 'Web', weight: 0.8 },
  { owner: 'nodejs', repo: 'node', category: 'Backend', weight: 0.95 },
  { owner: 'oven-sh', repo: 'bun', category: 'Backend', weight: 0.85 },
  { owner: 'denoland', repo: 'deno', category: 'Backend', weight: 0.8 },
  { owner: 'fastapi', repo: 'fastapi', category: 'Backend', weight: 0.9 },
  { owner: 'prisma', repo: 'prisma', category: 'Data', weight: 0.85 },
  // DevOps/Infra (5)
  { owner: 'kubernetes', repo: 'kubernetes', category: 'DevOps', weight: 0.95 },
  { owner: 'hashicorp', repo: 'terraform', category: 'DevOps', weight: 0.85 },
  { owner: 'docker', repo: 'compose', category: 'DevOps', weight: 0.75 },
  { owner: 'supabase', repo: 'supabase', category: 'Backend', weight: 0.85 },
  { owner: 'redis', repo: 'redis', category: 'Data', weight: 0.85 },
  // Languages (5)
  { owner: 'microsoft', repo: 'TypeScript', category: 'Web', weight: 0.95 },
  { owner: 'python', repo: 'cpython', category: 'Backend', weight: 0.9 },
  { owner: 'rust-lang', repo: 'rust', category: 'Backend', weight: 0.85 },
  { owner: 'golang', repo: 'go', category: 'Backend', weight: 0.85 },
  { owner: 'microsoft', repo: 'vscode', category: 'Tools', weight: 0.85 },
];
