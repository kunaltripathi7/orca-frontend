# 🐋 Orca — Frontend

A feature-rich, real-time communication platform inspired by Discord — built with **React 18**, **TypeScript**, and **Vite**.

> **Live Demo:** [orca-frontend](https://orca-frontend-wine.onrender.com) &nbsp;|&nbsp; **Backend Repo:** [orca-backend](https://github.com/kunaltripathi7/orca-backend)

---

## ✨ Features

| Category | Highlights |
|---|---|
| **Real-Time Messaging** | Instant channel & direct messages via Socket.io with optimistic UI updates |
| **Video & Audio Calls** | Peer-to-peer WebRTC calling with STUN servers, mute/video toggle, and multi-participant grid |
| **Server Management** | Create, edit, delete servers; invite members via shareable link; role-based access (Admin / Moderator / Guest) |
| **Channel System** | Text, Audio, and Video channel types with CRUD operations |
| **Member Management** | Kick members, change roles, view member list with role badges |
| **File Sharing** | Image & PDF uploads via Cloudinary with drag-and-drop support |
| **Authentication** | Clerk-powered auth with dark-themed sign-in/sign-up flows |
| **Dark Mode** | System-aware theme toggle with persistent preference |
| **Emoji Picker** | Rich emoji support via `emoji-mart` |
| **Infinite Scroll** | Cursor-based message pagination with React Query |
| **Soft Delete** | Messages show "This message has been deleted" instead of hard removal |

---

## 🏗️ Architecture

```
src/
├── components/          # Shared UI — Sidebar, Navbar, Search, Tooltips
│   ├── providers/       # ThemeProvider, ModalProvider
│   └── ui/              # shadcn/ui primitives (Button, Dialog, Toast, etc.)
├── context/             # SocketProvider — authenticated WebSocket connection
├── features/            # Feature-based modules
│   ├── auth/            # Clerk auth components
│   ├── channels/        # Channel list, actions, scrolling
│   ├── chat/            # ChatInput, ChatMessages, ChatItem, MediaRoom (WebRTC)
│   ├── members/         # Member list and role management
│   ├── Modals/          # 10 modal dialogs (Create/Edit/Delete Server/Channel, Invite, etc.)
│   └── server/          # Server sidebar, actions, search
├── hooks/               # Custom React hooks
├── pages/               # Route-level components
│   ├── ChannelPage      # Text/Audio/Video channel views
│   ├── ConversationPage # 1:1 direct messaging
│   ├── Server           # Server layout with sidebar
│   └── Landingpage      # Public landing page
├── services/            # API layer — Axios clients for each domain
├── store/               # Redux Toolkit store
└── utils/               # Shared utility functions
```

---

## 🔧 Tech Stack

| Layer | Technology |
|---|---|
| **Framework** | React 18 + TypeScript |
| **Build Tool** | Vite 5 |
| **Routing** | React Router v6 (nested routes, protected routes) |
| **State Management** | Redux Toolkit + React Query (server state) |
| **Real-Time** | Socket.io Client with JWT-authenticated connections |
| **Video/Audio** | Native WebRTC API with ICE/STUN signaling via Socket.io |
| **Auth** | Clerk (`@clerk/clerk-react`) with dark theme |
| **UI Components** | shadcn/ui + Radix UI primitives |
| **Styling** | Tailwind CSS 3 with custom theme tokens |
| **Forms** | React Hook Form + Zod schema validation |
| **File Upload** | react-dropzone → Cloudinary (via backend) |
| **Icons** | Lucide React + React Icons |
| **Error Handling** | react-error-boundary with fallback UI |

---

## 🔌 Real-Time Architecture

```
┌──────────────┐         WebSocket (JWT Auth)         ┌──────────────┐
│   React App  │ ◄──────────────────────────────────► │  Socket.io   │
│              │                                      │   Server     │
│  SocketProvider                                     │              │
│  (Context API)    ── room-based event routing ──►   │  Room-based  │
│              │                                      │  broadcasting│
└──────┬───────┘                                      └──────────────┘
       │
       ▼
┌──────────────┐      WebRTC (Peer-to-Peer)     ┌──────────────┐
│  MediaRoom   │ ◄────────────────────────────► │  Remote Peer │
│  Component   │   Offer/Answer/ICE Candidates  │              │
│              │   signaled via Socket.io       │              │
└──────────────┘                                └──────────────┘
```

- **Socket.io** handles message delivery, typing indicators, and WebRTC signaling
- **WebRTC** establishes direct peer-to-peer connections for audio/video
- Authenticated sockets — JWT token passed on connection, verified server-side via Clerk

---

## 🚀 Getting Started

### Prerequisites

- Node.js ≥ 18
- [Clerk](https://clerk.com) account (for authentication keys)
- Running [orca-backend](https://github.com/kunaltripathi7/orca-backend) instance

### Installation

```bash
git clone https://github.com/kunaltripathi7/orca-frontend.git
cd orca-frontend
npm install
```

### Environment Variables

Create a `.env.local` file in the project root:

```env
VITE_CLERK_PUBLISHABLE_KEY=your_clerk_publishable_key
VITE_CLERK_FORCE_REDIRECT_URL=http://localhost:5173/app
VITE_API_BASE_URL=http://localhost:7000
```

### Run Development Server

```bash
npm run dev
```

The app will be available at **http://localhost:5173**.

---

## 📁 API Layer

All HTTP requests go through dedicated service modules in `src/services/`:

| Service | Endpoints |
|---|---|
| `apiServer` | CRUD servers, join via invite, leave server |
| `apiChannels` | CRUD channels within a server |
| `apiMessages` | Send, edit, soft-delete messages with pagination |
| `apiConversation` | Get or create 1:1 conversations |
| `apiMember` | Update roles, kick members |
| `apiUser` | Profile sync with Clerk |

---

## 📜 Scripts

| Command | Description |
|---|---|
| `npm run dev` | Start Vite dev server with HMR |
| `npm run build` | Type-check + production build |
| `npm run lint` | ESLint with zero-warning policy |
| `npm run preview` | Preview production build locally |

---

## 📐 Database Schema

[View on Eraser](https://app.eraser.io/workspace/hlaFRKOIQSQYINVJot7j?elements=Is7vZEvgODdKqCRKv5sEwA)

---

## 📝 License

MIT
