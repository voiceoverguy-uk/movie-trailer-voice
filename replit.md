# Movie Trailer Voice – Showreel Site

A Netflix-inspired parody showreel website for Guy Harris's Movie Trailer Voice work. Built with React + Vite.

## Tech Stack
- **React 18** + **Vite 5** (frontend only, no backend)
- **Fonts**: Bebas Neue (display), Inter (body) – loaded via Google Fonts in `index.html`
- **Styling**: Plain CSS modules per component + global utilities in `src/index.css`
- No animation libraries – pure CSS transitions and IntersectionObserver

## Running the App
```
npm run dev    # starts on port 5000
npm run build  # production build
```

## Project Structure
```
/
├── index.html              # HTML entry point with font imports + meta tags
├── vite.config.js          # Vite config (port 5000, host 0.0.0.0)
├── package.json
├── public/
│   ├── mtv-logo.jpg        # "MOVIE TRAILER VOICE" wordmark
│   └── v-logo.jpg          # Red V chevron icon
└── src/
    ├── main.jsx            # React root
    ├── App.jsx             # Root component – shows ProfileSelect or HomePage
    ├── index.css           # Global CSS (custom properties, utilities, buttons, animations)
    ├── data/
    │   └── videos.js       # ALL video data + thumbnail URL helpers
    └── components/
        ├── ProfileSelect   # "Who's Watching?" intro screen (4 profile tiles)
        ├── Navbar          # Sticky navbar – transparent → solid on scroll, hamburger mobile
        ├── HeroCarousel    # Full-screen rotating hero (4 clips, auto-rotates 6s)
        ├── VideoRow        # Horizontally scrolling clip row with arrow controls
        ├── VideoCard       # Individual clip card with hover effects
        ├── AboutSection    # About Guy Harris + booking CTA
        ├── ContactSection  # "Book This Voice" + email + YouTube links
        └── Footer          # Logo, nav links, copyright
```

## Key Design Decisions
- **Brand colour**: `#e50914` (VoiceoverGuy red) – not Netflix red, branded separately
- **Accent**: Dark near-black backgrounds (`#0a0a0a` / `#141414`)
- **Typography**: Bebas Neue for all headings/display, Inter for body text
- **Thumbnails**: YouTube `hqdefault` quality for cards (always available); `maxresdefault` for hero with `sddefault` fallback
- **Profile → Hero mapping**: Each profile tile highlights a different hero clip (`profileHeroMap` in `videos.js`)
- **No CMS or database** – all content is hardcoded in `src/data/videos.js`

## Editing Content
All video data lives in **`src/data/videos.js`**:
- `heroClips` – the 4 rotating hero items
- `movieTrailerRow` – "Movie Trailer Voice" horizontal row (17 clips)
- `otherSuggestionsRow` – "Other Suggestions" row (11 clips)
- `profileHeroMap` – maps profile name to hero clip index

To add or change clips, edit those arrays. Thumbnail URLs are derived automatically from YouTube video IDs.

## Adding Custom Thumbnails
Replace a `url` field's auto-derived thumbnail by adding a `thumbnail` property to any clip object and updating `getThumbnail` / hero image references to check for it first.

## Navigation Sections
The navbar links scroll to these `id` anchors:
- `#trailers` – Movie Trailer Voice row
- `#other-suggestions` – Other Suggestions row
- `#about` – About Guy Harris section
- `#contact` – Contact / Book This Voice section
