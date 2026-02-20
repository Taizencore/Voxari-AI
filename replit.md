# Voxari AI

## Overview
Voxari AI is a voice AI platform with a monorepo architecture using npm workspaces. It includes a Next.js dashboard frontend, an Express/WebSocket voice gateway backend, and a shared core library.

## Project Architecture

### Monorepo Structure
- `apps/dashboard` - Next.js frontend (port 5000)
- `apps/gateway` - Express + WebSocket voice gateway backend (port 3001)
- `packages/core` - Shared library with AI, telephony, and database adapters

### Key Technologies
- **Frontend**: Next.js 16, React, Tailwind CSS v3, TypeScript
- **Backend**: Express, WebSocket (ws), TypeScript
- **Core**: OpenAI, Deepgram (STT/TTS), Telnyx, Stripe, Supabase
- **Build**: npm workspaces, TypeScript, tsx

### Configuration
- Next.js is configured to run on `0.0.0.0:5000` with Replit proxy support via `allowedDevOrigins`
- Gateway backend runs on port 3001 to avoid conflicts
- Tailwind CSS v3 with PostCSS

## Recent Changes
- 2026-02-20: Initial Replit environment setup
  - Configured Next.js for port 5000 with host allowlisting
  - Installed tailwindcss v3 and autoprefixer for the dashboard
  - Changed gateway port from 3000 to 3001
  - Set up deployment configuration

## User Preferences
- None documented yet
