FROM node:alpine AS base

# Install dependencies only when needed
FROM base AS deps
# Check https://github.com/nodejs/docker-node/tree/b4117f9333da4138b03a546ec926ef50a31506c3#nodealpine to understand why libc6-compat might be needed.
RUN apk add --no-cache libc6-compat
WORKDIR /app

# Install dependencies based on the preferred package manager
COPY package.json yarn.lock* package-lock.json* pnpm-lock.yaml* ./
RUN \
  if [ -f yarn.lock ]; then yarn --frozen-lockfile; \
  elif [ -f package-lock.json ]; then npm ci; \
  elif [ -f pnpm-lock.yaml ]; then corepack enable pnpm && pnpm i --frozen-lockfile; \
  else echo "Lockfile not found." && exit 1; \
  fi


# Rebuild the source code only when needed
FROM base AS builder

ENV DATABASE_URL="mongodb+srv://LuCaSjjgg:lucas@learningmongo.pfhsjsb.mongodb.net/educlicker"


ARG NEXT_PUBLIC_PUSHER_APP_ID=1762437
ARG NEXT_PUBLIC_PUSHER_SECRET=0bd3a57a770e59c32870
ARG NEXT_PUBLIC_PUSHER_KEY=bb855a20dd0049e18316
ARG NEXT_PUBLIC_PUSHER_CLUSTER=us2
ARG NEXT_PUBLIC_GITHUB_ID=d94ef0b027b86b9883c9
ARG NEXT_PUBLIC_GITHUB_SECRET=db83d4c55102a0b442c471c6d8cac56793bb191d
ARG NEXT_PUBLIC_NEXTAUTH_SECRET=RAHxu/7g/RKkhjtpTVv02kxPe5F+eHD0qU4MDXPcp9w=
ARG NEXTAUTH_URL=http://localhost:3000/
ARG NEXT_PUBLIC_ABLY_API_KEY=PjTPpw.ZU3NlA:I7g4Jqukmg3mfG7JhbPeF0y69VC88K5P1wRheHASq38

WORKDIR /app
COPY --from=deps /app/node_modules ./node_modules
COPY . .

# Next.js collects completely anonymous telemetry data about general usage.
# Learn more here: https://nextjs.org/telemetry
# Uncomment the following line in case you want to disable telemetry during the build.
# ENV NEXT_TELEMETRY_DISABLED 1

RUN \
  if [ -f yarn.lock ]; then yarn run build; \
  elif [ -f package-lock.json ]; then npm run build; \
  elif [ -f pnpm-lock.yaml ]; then corepack enable pnpm && pnpm run build; \
  else echo "Lockfile not found." && exit 1; \
  fi

# Production image, copy all the files and run next
FROM base AS runner
WORKDIR /app

ENV NODE_ENV production
# Uncomment the following line in case you want to disable telemetry during runtime.
# ENV NEXT_TELEMETRY_DISABLED 1

RUN addgroup --system --gid 1001 nodejs
RUN adduser --system --uid 1001 nextjs

COPY --from=builder /app/public ./public

# Set the correct permission for prerender cache
RUN mkdir .next
RUN chown nextjs:nodejs .next

# Automatically leverage output traces to reduce image size
# https://nextjs.org/docs/advanced-features/output-file-tracing
COPY --from=builder --chown=nextjs:nodejs /app/.next/standalone ./
COPY --from=builder --chown=nextjs:nodejs /app/.next/static ./.next/static

USER nextjs

EXPOSE 3000

ENV PORT 3000
# set hostname to localhost
ENV HOSTNAME "localhost"

# server.js is created by next build from the standalone output
# https://nextjs.org/docs/pages/api-reference/next-config-js/output
CMD ["node", "server.js"]