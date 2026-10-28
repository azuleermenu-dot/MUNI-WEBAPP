# MUNI

MUNI is an open-source school study platform with a feature-matched Android app and web app, powered by a shared Supabase backend.

## Apps

- `apps/mobile` — Android student app (Expo / React Native)
- `apps/web` — responsive web app (Next.js)
- `packages/shared` — shared types and configuration
- `supabase` — database migrations and backend configuration

## Features

Dashboard, subjects, study planner, assignments/tasks, exams, study sessions, reviewers, flashcards, quizzes, progress, profile, and school configuration.

## Backend

This project connects to the existing MUNI Supabase project. Never commit secrets. Use environment variables for the Supabase URL and publishable key.

## Open source

Schools can fork MUNI and configure their school name, branding, and settings without rewriting the core application.
