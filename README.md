# FMCG AI Agent — From Data to Intelligence

An AI-powered business intelligence agent that answers plain-English questions about FMCG sales data — grounded in real data, not guesses.

## Overview

This project analyzes FMCG (Fast-Moving Consumer Goods) sales data — regions, SKUs, promotions, and stockouts — and answers business questions in natural language, using an LLM (Groq / LLaMA 3.3 70B) connected securely to real sales data.

It's not a chatbot wrapper. Every answer is grounded in the actual dataset, not generated from guesswork.

## Why This Project

Most beginner AI projects are either too trivial to teach anything, or too complex to finish. This one sits in the middle: real data, real business questions, real security and testing considerations — small enough to actually complete.

## Tech Stack

- Frontend: React, Vite, TanStack Start
- LLM: Groq (LLaMA 3.3 70B) — chosen for speed, cost, and free-tier availability after hitting Gemini's quota limits
- Data: FMCG sales dataset — 13 weeks, 4 regions, 12 SKUs, promotions, and stockout events

## Key Features

- Plain-English business questions in, grounded answers out
- Backend-only API key handling (never exposed client-side)
- Example questions shown up front to guide users toward specific, answerable queries
- Tested across every data dimension: inventory, regional sales, promotions

## Setup

git clone your-repo-url
cd fmcg-ai-agent
npm install

Create a .env file with:
VITE_GROQ_API_KEY=your_api_key_here

Run locally:
npm run dev

## Lessons Learned (the honest version)

- Switched from Gemini to Groq after hitting a hard quota wall mid-build
- Learned the hard way why API keys must never live in client-side code
- VITE_ prefix is required for any environment variable the frontend needs to read

## The Ebook

The full development story — including every mistake — is documented in the companion ebook: "From Data to Intelligence: Building Your First FMCG AI Agent" by Yash Kharode.

## Author

Yash Kharode — Data Science & ML Developer
