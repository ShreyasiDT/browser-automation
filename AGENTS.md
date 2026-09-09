<!-- BEGIN:nextjs-agent-rules -->

# This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` (resolved from this file's directory; in monorepos the `next` package may not be visible from the repo root) before writing any code. Heed deprecation notices.

This block is written and re-added by `next dev` — verify at `node_modules/next/dist/server/lib/generate-agent-files.js`. Removing it from a diff only re-creates the uncommitted change; committing it with your work keeps the tree clean.

<!-- END:nextjs-agent-rules -->

# Database types

Derive database types from the Drizzle schema — never hand-write custom or partial shapes for table rows. Export typeof table.$inferSelect (and $inferInsert when needed) from lib/schema.ts and import it. When a consumer needs only some columns, narrow with Pick<Row, ...> / Omit<Row, ...> rather than redeclaring a literal type. Don't add an insert type where db.insert(...).values() already enforces the shape.

# Apostrophes in JSX text

`react/no-unescaped-entities` (from `eslint-config-next/core-web-vitals`) errors on a raw `'` in JSX text, so `<p>It doesn't work</p>` fails `npm run lint`. In JSX text write the typographic apostrophe `’` directly (`<p>It doesn’t work</p>`) — it is not flagged, needs no entity, and reads correctly. Never reach for `&apos;`/`&#39;`, and don't reword copy to dodge the contraction. Straight `'` stays fine everywhere it isn't JSX text: string literals, attribute values, and expression containers.
