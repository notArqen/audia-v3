# audia · a tidal web player

> a sleek, single-file web player that streams music via the Tidal API — no app, no install, just open and play.

---

<!-- SCREENSHOT: Full app overview — desktop layout showing sidebar, now-playing center, and queue panel -->
![audia desktop overview](./screenshots/desktop-overview.png)

---

## table of contents

- [overview](#overview)
- [features](#features)
- [screenshots](#screenshots)
- [getting started](#getting-started)
- [usage](#usage)
- [themes](#themes)
- [settings & customization](#settings--customization)
- [keyboard & controls](#keyboard--controls)
- [technical notes](#technical-notes)
- [license](#license)

---

## overview

**audia** is a fully self-contained, single HTML file web player built on top of the Tidal music API. there's no build process, no package manager, no backend — just one file you open in a browser. it's designed to look and feel like a proper desktop music application without any of the bloat that comes with being one.

the layout is a three-column desktop design: a left sidebar for search and playlists, a center main stage for the album art and now-playing view, and a right queue panel. on mobile, it collapses into a tabbed interface. it's responsive, persistent (settings saved to `localStorage`), and genuinely quite pretty.

---

## features

### playback
- play/pause, previous, next, and restart controls
- click-to-seek progress bar with live timestamps
- volume slider
- **shuffle** mode — randomizes playback order from the queue
- **autoplay** — automatically fetches and queues related tracks when the queue ends
- **crossfade** — configurable fade-out between tracks (adjustable duration via slider)
- playback speed control

### search & discovery
- real-time Tidal track search via multiple API endpoints with automatic failover
- API status indicator showing connection health (green/amber/red dot)
- search results show track title, artist, album art, duration, and explicit badge

### queue management
- add individual tracks or full albums/playlists to queue
- drag-free ordered queue panel with currently playing indicator
- clear queue button
- queue persists while navigating

### playlists
- create and name custom playlists
- built-in **Favorited Songs** playlist
- add tracks to any playlist directly from search results or now-playing
- playlist management panel overlaid in the main view

### taste profile
- star tracks to add them to a personal taste profile
- used to seed autoplay recommendations

### fullscreen mode
- immersive fullscreen overlay with large album art
- blurred album art background that dynamically updates per track
- full playback controls replicated in fullscreen bar
- heart (favorite) and star (taste profile) actions available in fullscreen

### themes
- 12 built-in color themes (see [themes](#themes) section)
- live theme switching via color swatches in settings
- all themes are CSS variable-based — smooth transitions on switch

### equalizer
- multi-band EQ with visual sliders
- preset profiles (e.g. bass boost, vocal, flat, etc.)
- EQ values persist across sessions

### cover art controls
- toggle album art visibility globally (useful if you just want the clean minimal look)
- option to hide explicit badges alongside covers

### mobile support
- fully responsive layout for screens under 700px
- tabbed interface: now playing / search / queue
- bottom navigation bar
- touch-friendly controls

---

## screenshots

### desktop — now playing
<!-- SCREENSHOT: Center now-playing panel with album art, blurred background, title/artist/album info, and quality badge -->
![now playing](./screenshots/now-playing.png)

---

### desktop — search results
<!-- SCREENSHOT: Left sidebar with search input filled and results showing track list with album thumbs, artist names, durations, and add buttons -->
![search results](./screenshots/search-results.png)

---

### desktop — queue panel
<!-- SCREENSHOT: Right-side queue panel showing a list of queued tracks with the currently playing one highlighted with the accent-colored left border -->
![queue panel](./screenshots/queue-panel.png)

---

### settings panel — themes & EQ
<!-- SCREENSHOT: Settings panel open showing the theme color swatches grid and EQ band sliders below it -->
![settings and themes](./screenshots/settings-themes-eq.png)

---

### fullscreen mode
<!-- SCREENSHOT: Fullscreen overlay showing large album art centered, dynamic blurred background, big title text, and bottom controls bar -->
![fullscreen mode](./screenshots/fullscreen.png)

---

### mobile layout
<!-- SCREENSHOT: Mobile view showing the tabbed bottom nav, now-playing tab with album art and controls, compact player bar -->
![mobile layout](./screenshots/mobile.png)

---

### theme showcase
<!-- SCREENSHOT: Side-by-side or collage of several themes (e.g. neon, amber, frost, grape) to show the range -->
![theme showcase](./screenshots/themes-showcase.png)

---

## getting started

since audia is a single HTML file, setup is about as complicated as double-clicking a file.

### prerequisites
- a modern browser (Chrome, Firefox, Edge, Safari — anything from the last 3 years)
- an internet connection (streams audio and album art from Tidal's CDN)
- no Node, no Python, no nothing else

### running locally

```bash
# clone the repo
git clone https://github.com/yourusername/audia.git
cd audia

# open the file — that's it
open audia.html
# or just drag it into your browser
```

### hosting it

since it's a single file, you can host it anywhere static files are served:

```bash
# via GitHub Pages — push to repo, enable Pages in settings, done
# via any static host (Netlify, Vercel, Cloudflare Pages, etc.)
# or just serve it locally
npx serve .
```

---

## usage

### searching for music

type any track name, artist, or album into the search bar in the left sidebar and hit enter or click the search icon. results appear as a scrollable list with album art, artist, and duration. hover a track to reveal the **+ add** button — click it to add the track to your queue.

### playing music

once tracks are in the queue, hit the play button in the bottom player bar. the currently playing track highlights in the queue with an accent-colored left border. click any queued track to jump directly to it.

### playlists

click the playlist icon (or playlist panel button) in the main area to open the playlist overlay. from here you can create new playlists, view existing ones, and add the currently playing track to any playlist.

### favorites & taste profile

while a track is playing, flip the album art (hover to reveal the flip) to access the heart (❤️ favorite) and star (⭐ taste) buttons. favorites go into the **Favorited Songs** playlist; taste profile entries are used to power autoplay recommendations.

### autoplay

toggle autoplay on in the player bar. when the queue runs out, audia will automatically search for and queue up related tracks based on what you were listening to and your taste profile.

### crossfade

click the crossfade button in the player bar to enable it. adjust the duration using the crossfade slider (default: 3 seconds). the current track will fade out this many seconds before it ends, and the next track begins.

---

## themes

audia ships with 12 hand-crafted color themes, all switchable live from the settings panel.

| theme | accent color | vibe |
|---|---|---|
| **iron** *(default)* | silver `#c0c0c0` | minimal dark |
| **midnight** | cyan `#00e5ff` | sleek electric |
| **neon** | magenta `#ff00ff` | cyberpunk |
| **amber** | amber `#ffaa00` | warm hacker |
| **frost** | blue `#0066cc` | clean light mode |
| **forest** | green `#00ff66` | terminal |
| **rose** | pink `#ff6699` | soft dark |
| **crimson** | red `#ff2244` | intense dark |
| **ocean** | sky `#00aaff` | deep sea |
| **grape** | violet `#aa44ff` | rich purple |
| **slate** | steel blue `#7ab8d8` | muted cool |
| **gold** | gold `#f0c040` | warm luxury |

the selected theme persists in `localStorage` and is restored on next load.

---

## settings & customization

the settings panel (gear icon) gives access to:

- **theme swatches** — 12 themes, click to apply instantly
- **equalizer** — per-band gain sliders with preset profiles
- **playback speed** — slow down or speed up audio
- **crossfade duration** — slider to set fade length in seconds
- **cover art toggle** — hide/show all album art globally
- **hide explicit with covers** — optionally suppress explicit badges when covers are hidden
- **API management** — view and configure which Tidal API endpoints audia uses, with automatic failover if one goes down

all settings are saved automatically to `localStorage` under the key `audia_settings`.

---

## keyboard & controls

| control | action |
|---|---|
| play/pause button | toggle playback |
| previous button | restart track (if > 3s in), else previous track |
| next button | next track (random if shuffle on) |
| restart button | jump to 0:00 |
| click progress bar | seek to position |
| volume slider | adjust output volume |
| shuffle toggle | randomize queue order |
| autoplay toggle | auto-queue related tracks |
| crossfade toggle | fade between tracks |
| fullscreen button | open immersive fullscreen view |

---

## technical notes

- **single file architecture** — all HTML, CSS, and JS live in `audia.html`. no external JS dependencies, no build step.
- **fonts** — uses `Syne` (display/UI) and `DM Mono` (labels/metadata) loaded from Google Fonts.
- **audio backend** — native HTML5 `<audio>` element with `crossOrigin="anonymous"` for CORS-safe streaming.
- **API failover** — audia tries a list of Tidal API proxy endpoints and falls back automatically if one fails. the status dot in the sidebar reflects connection state in real time.
- **persistence** — all user settings, playlists, taste profile, EQ values, and preferences are stored in `localStorage`.
- **crossfade implementation** — pseudo-crossfade: the current track fades out via volume reduction `cfDuration` seconds before its natural end, then the next track starts. not true simultaneous dual-stream crossfade.
- **mobile** — responsive breakpoint at 700px. the three-column layout collapses into a vertical single-column with tab navigation.

---

## license

© audia project. all rights reserved.

this project is proprietary. do not redistribute or claim as your own. see the file header for the project SHA identifier.

---

<p align="center">built with care.</p>
