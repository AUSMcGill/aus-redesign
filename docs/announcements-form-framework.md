# AUS Announcements Framework (Google Form -> Google Sheet -> Website)

## Goal
Create a low-maintenance publishing flow where AUS team members submit announcements in a Google Form, and the site updates automatically from the linked Google Sheet.

## Data Flow
1. AUS team submits announcement through Google Form.
2. Form writes a new row into the linked Google Sheet.
3. Website fetches the published CSV from that sheet (`no-store` cache).
4. Home page shows latest announcements.
5. `/announcements` page shows:
   - **Latest Update**
   - **Past Updates** (all older entries)

## Current AUS Sheet Columns (Supported)
- `Timestamp`
- `Email Address`
- `Title`
- `Description under 100 words`
- `When should this start displaying?`
- `Link you want associated`

## Google Sheet Setup
- Keep first row as headers.
- Publish the response sheet as CSV.
- The site now uses `When should this start displaying?` as a publish gate:
  - if date is in the future, the post is hidden
  - once that date/time is reached, it appears automatically
- Optional `Status` still works as a manual override:
  - `Draft`, `No`, `False` will hide the row

## Environment Variables
Add these to Vercel and local `.env.local`:

- `NEXT_PUBLIC_AUS_ANNOUNCEMENTS_CSV_URL`
  - Published CSV URL of the Form response sheet.
- `NEXT_PUBLIC_AUS_ANNOUNCEMENTS_FORM_URL`
  - Public URL of the announcement submission Form (used for the submit button on `/announcements`).

## What Is Already Implemented
- `src/lib/announcements.ts`
  - Robust CSV parsing
  - Flexible header matching for your exact sheet
  - Scheduled display logic using `When should this start displaying?`
  - Optional published/draft filtering
  - Date formatting + newest-first sort
- `app/page.tsx` + `src/components/pages/HomePage.tsx`
  - Home page latest announcements are live from sheet
  - "View All Announcements" links to `/announcements`
- `app/announcements/page.tsx`
  - Framework explainer
  - Submission form button
  - Latest update + past updates sections

## Operational Logic
- Submit Form -> row appears in Sheet -> site updates automatically on next request.
- If `When should this start displaying?` is in the future, it stays hidden until that date.
- To edit or remove a post:
  - edit the row in Sheet, or
  - set `Status` to `Draft`.

