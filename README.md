<![CDATA[<div align="center">

<img src="https://img.shields.io/badge/React-18-61DAFB?style=for-the-badge&logo=react&logoColor=black" />
<img src="https://img.shields.io/badge/Vite-5-646CFF?style=for-the-badge&logo=vite&logoColor=white" />
<img src="https://img.shields.io/badge/Three.js-3D-black?style=for-the-badge&logo=three.js&logoColor=white" />
<img src="https://img.shields.io/badge/Leaflet.js-Map-199900?style=for-the-badge&logo=leaflet&logoColor=white" />
<img src="https://img.shields.io/badge/OpenStreetMap-OSM-7EBC6F?style=for-the-badge&logo=openstreetmap&logoColor=white" />
<img src="https://img.shields.io/badge/License-MIT-yellow?style=for-the-badge" />

# 🏫 WayFindYou — Campus Navigation & Facility Locator

### *Smart Indoor & Outdoor Navigation for Sri Shakthi Institute of Engineering and Technology*

> **Developed by Team Velmora** | Sri Shakthi Institute of Engineering and Technology, Coimbatore

[![GitHub Repo](https://img.shields.io/badge/GitHub-View_Repository-181717?style=flat-square&logo=github)](https://github.com/subhiksha-kodi/Campus-Navigation-and-Facility-Locator)

</div>

---

## 📌 Table of Contents

- [🌟 Project Overview](#-project-overview)
- [🏗️ System Architecture](#️-system-architecture)
- [✨ Key Features](#-key-features)
- [📸 UI Screenshots](#-ui-screenshots)
- [🛠️ Tech Stack](#️-tech-stack)
- [📂 Project Structure](#-project-structure)
- [⚙️ Setup & Installation](#️-setup--installation)
- [🚀 Running the Project](#-running-the-project)
- [🔐 User Roles & Access](#-user-roles--access)
- [🆘 Emergency SOS System](#-emergency-sos-system)
- [🗺️ Navigation Modules](#️-navigation-modules)
- [👥 Team Velmora](#-team-velmora)
- [📄 Documentation](#-documentation)
- [📜 License](#-license)

---

## 🌟 Project Overview

**WayFindYou** is a full-stack, feature-rich smart campus navigation and facility management web application designed for **Sri Shakthi Institute of Engineering and Technology, Coimbatore**. It enables students, faculty, and administrators to:

- 🗺️ **Navigate the campus** using real-time interactive outdoor maps (OpenStreetMap + Leaflet.js)
- 🏛️ **Explore building interiors** in immersive **3D augmented-reality-style floor plans** (Three.js)
- 🎙️ **Navigate by voice** — speak room names and get guided turn-by-turn directions
- 🆘 **Trigger Emergency SOS** — record live video + audio and instantly alert campus security
- 👩‍💼 **Manage the campus** — admin dashboard for users, rooms, timetables, complaints, and more

This is not just a map — it is a **comprehensive campus intelligence platform** that brings smart navigation, safety, and facility management under a single roof.

---

## 🏗️ System Architecture

<div align="center">

![System Architecture Diagram](docs/architecture-diagram.png)

*Figure 1: System Architecture of WayFindYou Campus Navigation Platform*

</div>

The system follows a **layered, role-based client-side architecture** with the following tiers:

```
┌────────────────────────────────────────────────────────────┐
│                   PRESENTATION LAYER (React)                │
│   Student Portal  │  Faculty Portal  │  Admin Dashboard     │
├────────────────────────────────────────────────────────────┤
│                   NAVIGATION ENGINE                         │
│   Outdoor Map     │  3D Indoor AR    │  Voice Navigation    │
│   (Leaflet+OSM)   │  (Three.js)      │  (Web Speech API)    │
├────────────────────────────────────────────────────────────┤
│                   SAFETY & ALERT LAYER                      │
│   Emergency SOS   │  MediaRecorder   │  Admin Alert Monitor │
├────────────────────────────────────────────────────────────┤
│                   STATE MANAGEMENT                          │
│   React Context   │  LocalStorage    │  JSON Data Stores    │
└────────────────────────────────────────────────────────────┘
```

---

## ✨ Key Features

### 🗺️ 1. Interactive Campus Outdoor Map
- Real OpenStreetMap tiles rendered via **Leaflet.js**
- Clickable building markers with popups (AS Block, IB Block, SF Block, Auditorium, Cafeteria, Medical Centre)
- **Road-following path routing** — routes trace actual campus roads, not straight diagonal lines
- Real-time GPS location detection (browser geolocation API)
- Route distance and estimated walking time display

### 🏛️ 2. 3D AR Indoor Navigation (AS Block)
- Full **Three.js 3D floor plan** with 29 rooms precisely placed per actual layout
- Rooms include: Full Stack Lab, AI Lab, IOT Lab, Seminar Hall, Canteen, Restrooms, Lifts, Stairs
- Glowing **corridor-following navigation path** between any two rooms
- Turn-by-turn directions panel (Go straight → Turn right → Arrived)
- Orbit / Pan / Zoom interaction with OrbitControls
- Microphone button for voice room selection

### 🏛️ 3. 3D IB Block & SF Block Viewers
- Detailed 3D floor plan viewers for IB and SF blocks
- Interactive room selection and zoom

### 🎙️ 4. Voice Navigation
- Browser **Web Speech API** integration for voice command recognition
- Say "Go to Full Stack Lab" or "Take me to the Seminar Hall" — the system understands and navigates
- Text-to-speech (TTS) audio playback of step-by-step navigation directions
- Works inside 3D block views and on campus maps

### 🆘 5. Emergency SOS with Video & Voice Alert
- **One-click emergency button** triggers immediate campus-wide SOS
- **Live camera + microphone recording** using the browser MediaRecorder API
- Sends a formatted **Admin Alert Dispatch** with student credentials, GPS location, and recorded video
- Admin receives real-time playback of the student's emergency recording
- Pre-configured emergency contacts: Campus Security, Medical Centre, Fire Emergency

### 🔍 6. Classroom & Facility Finder
- Search any room, lab, or facility by name, block, or type
- Displays room number, floor, block, capacity, and availability
- One-click navigation from search result to 3D indoor view

### 📅 7. Timetable & Schedule Management
- Students can view their personal timetable filtered by branch and semester
- Faculty view shows all classes they teach
- Admin can manage, edit, and bulk-upload timetable entries

### 🛠️ 8. Admin Control Panel
- **Dashboard** with live stats (students, faculty, complaints, SOS alerts)
- **User Management** — CRUD for student and faculty accounts
- **Department & Room Management** — manage campus buildings and spaces
- **Complaint Management** — receive, track, and resolve student complaints
- **Analytics & Reports** — charts for complaints, room usage, SOS incidents
- **Audit Logs** — complete action trails for all admin operations

### 📋 9. Student Portal
- Personalized dashboard with attendance, timetable, and notices
- Complaint submission with status tracking
- Profile management and notification centre

---

## 📸 UI Screenshots

### 🏠 Student Dashboard

![Student Dashboard](docs/screenshots/dashboard.png)

*Personalized student home dashboard with quick-access tiles, timetable, and recent notices*

---

### 🗺️ Campus Map & Outdoor Navigation

![Campus Map](docs/screenshots/campus-map.png)

*OpenStreetMap-based interactive campus map with building markers and road-following route planner*

---

### 🏛️ 3D AR Indoor Navigation

![3D AR Navigation](docs/screenshots/3d-ar-navigation.png)

*Three.js 3D floor plan of AS Block with glowing navigation path, room labels, and turn-by-turn directions*

---

### 🆘 Emergency SOS — Video & Voice Recording

![Emergency SOS](docs/screenshots/emergency-sos.png)

*Emergency SOS page: live camera recording on trigger, admin alert dispatch monitor with video playback*

---

### 👩‍💼 Admin Control Panel

![Admin Dashboard](docs/screenshots/admin-dashboard.png)

*Admin dashboard with live stats, complaint table, SOS alert log, charts, and full management controls*

---

## 🛠️ Tech Stack

| Layer | Technology |
|-------|-----------|
| **Frontend Framework** | React 18 + Vite 5 |
| **Styling** | Vanilla CSS with CSS Variables + Glassmorphism |
| **3D Graphics** | Three.js + @react-three/fiber + @react-three/drei |
| **Map Rendering** | Leaflet.js + React-Leaflet + OpenStreetMap (OSM) |
| **Routing Engine** | OSRM API (road-following routes) |
| **Voice Navigation** | Web Speech API (Recognition + Synthesis) |
| **Emergency Recording** | MediaRecorder API (video/webm, camera + microphone) |
| **Icons** | Lucide React |
| **State Management** | React Context API |
| **Data Storage** | Browser LocalStorage + JSON data stores |
| **Version Control** | Git + GitHub |
| **Package Manager** | npm |

---

## 📂 Project Structure

```
Campus-Navigation-and-Facility-Locator/
├── 📁 Campus-Navigation-and-Facility-Locator/       # Main React App (Vite)
│   ├── 📁 src/
│   │   ├── 📁 components/                           # Reusable UI components
│   │   │   ├── ASBlockViewer.jsx                    # 3D AS Block (Three.js)
│   │   │   ├── IBBlockViewer.jsx                    # 3D IB Block (Three.js)
│   │   │   ├── SFBlockViewer.jsx                    # 3D SF Block (Three.js)
│   │   │   ├── CampusMap.jsx                        # Leaflet outdoor map
│   │   │   ├── VoiceNavigation.jsx                  # Voice command handler
│   │   │   └── AppLayout.jsx                        # Global nav layout
│   │   ├── 📁 pages/
│   │   │   ├── 📁 student/
│   │   │   │   ├── StudentDashboard.jsx             # Student home page
│   │   │   │   ├── StudentSOSPage.jsx               # Emergency SOS + recording
│   │   │   │   ├── StudentComplaintsPage.jsx        # Complaint submission
│   │   │   │   └── StudentTimetablePage.jsx         # Timetable viewer
│   │   │   ├── 📁 admin/
│   │   │   │   ├── AdminDashboard.jsx               # Admin home + stats
│   │   │   │   ├── AdminUserManagement.jsx          # CRUD users
│   │   │   │   ├── AdminRoomManagement.jsx          # CRUD rooms
│   │   │   │   ├── AdminTimetablePage.jsx           # Timetable manager
│   │   │   │   ├── AdminComplaintsPage.jsx          # Complaint tracker
│   │   │   │   └── AdminAnalyticsPage.jsx           # Charts & reports
│   │   │   ├── Home.jsx                             # Landing page
│   │   │   ├── IBBlock.jsx                          # IB Block 3D page
│   │   │   ├── Login.jsx                            # Auth login
│   │   │   └── Register.jsx                         # Auth registration
│   │   ├── 📁 context/
│   │   │   ├── StudentContext.jsx                   # Student state + SOS
│   │   │   ├── AdminContext.jsx                     # Admin state
│   │   │   └── AuthContext.jsx                      # Auth state
│   │   ├── 📁 data/
│   │   │   ├── as.json                              # AS Block room data
│   │   │   └── buildings.json                       # Campus building data
│   │   └── App.jsx                                  # Router + routes
│   ├── index.html
│   ├── vite.config.js
│   └── package.json
├── 📁 docs/
│   ├── 📁 screenshots/                              # UI screenshots
│   │   ├── dashboard.png
│   │   ├── campus-map.png
│   │   ├── 3d-ar-navigation.png
│   │   ├── emergency-sos.png
│   │   └── admin-dashboard.png
│   └── architecture-diagram.png                    # System architecture
├── 📄 Software Requirements Specification (SRS).docx
├── 📄 TEAM.md                                      # Team details
├── 📄 README.md                                    # This file
└── 📄 .gitignore
```

---

## ⚙️ Setup & Installation

### Prerequisites

Before running the project, ensure you have:

- **Node.js** v18+ ([Download](https://nodejs.org/))
- **npm** v9+ (comes with Node.js)
- **Git** ([Download](https://git-scm.com/))
- A modern browser (Chrome/Edge recommended for camera/microphone access)

### 1. Clone the Repository

```bash
git clone https://github.com/subhiksha-kodi/Campus-Navigation-and-Facility-Locator.git
cd Campus-Navigation-and-Facility-Locator
```

### 2. Install Dependencies

```bash
# Navigate to the React app directory
cd Campus-Navigation-and-Facility-Locator

# Install all dependencies
npm install
```

---

## 🚀 Running the Project

```bash
# From the inner project directory
cd Campus-Navigation-and-Facility-Locator

# Start development server
npm run dev
```

The app will be available at: **http://localhost:5173**

### Build for Production

```bash
npm run build
```

Built files will be output to the `dist/` directory.

---

## 🔐 User Roles & Access

The application supports **three user roles** with distinct access privileges:

| Role | Dashboard | Navigation | Complaints | Admin Panel | SOS |
|------|-----------|-----------|------------|-------------|-----|
| 🧑‍🎓 **Student** | ✅ | ✅ | ✅ Submit | ❌ | ✅ Trigger |
| 👨‍🏫 **Faculty** | ✅ | ✅ | ✅ View | ❌ | ✅ Trigger |
| 👩‍💼 **Admin** | ✅ | ✅ | ✅ Manage | ✅ Full | ✅ Monitor |

### Default Test Credentials

| Role | Username | Password |
|------|----------|---------|
| Admin | `admin@ssiet.ac.in` | `admin123` |
| Student | `student@ssiet.ac.in` | `student123` |
| Faculty | `faculty@ssiet.ac.in` | `faculty123` |

---

## 🆘 Emergency SOS System

The **Emergency SOS** system is one of WayFindYou's most critical safety features.

### How It Works

```
Student clicks [🔴 TRIGGER EMERGENCY SOS]
         │
         ▼
Browser requests Camera + Microphone permission
         │
         ▼
Live camera preview displayed + recording begins
         │
         ▼ (automatic 5s or manual stop)
MediaRecorder captures video/webm blob
         │
         ▼
SOS Alert Dispatched:
  - Student ID, Name, Department
  - GPS Location (AS Block B, Floor 3)
  - Timestamp + Recorded Video (Blob URL)
  - Custom emergency message
         │
         ▼
Admin Emergency Alert Monitor receives alert
  - Video playback with audio
  - Student credentials card
  - Alert status: ACTIVE / ACKNOWLEDGED
```

### Technical Implementation

```javascript
// Request camera and microphone
const stream = await navigator.mediaDevices.getUserMedia({
  video: true,
  audio: true
});

// Start recording with MediaRecorder
const recorder = new MediaRecorder(stream, {
  mimeType: 'video/webm;codecs=vp9,opus'
});

// On stop — create blob URL and dispatch SOS alert
recorder.onstop = () => {
  const blob = new Blob(chunks, { type: 'video/webm' });
  const videoUrl = URL.createObjectURL(blob);
  triggerSOSAlert(location, videoUrl, message);
};
```

---

## 🗺️ Navigation Modules

### Outdoor Campus Map

| Feature | Implementation |
|---------|---------------|
| Map tiles | OpenStreetMap (OSM) |
| Routing | OSRM API (road-following) |
| Markers | Leaflet.js custom icons |
| Geolocation | Browser Geolocation API |

### 3D Indoor Navigation (AS Block)

| Feature | Implementation |
|---------|---------------|
| 3D rendering | Three.js + @react-three/fiber |
| Controls | OrbitControls (orbit, pan, zoom) |
| Pathfinding | Corridor graph BFS (custom) |
| Labels | Html component (@react-three/drei) |
| Path line | Line component (@react-three/drei) |

### Voice Navigation

| Feature | Implementation |
|---------|---------------|
| Speech recognition | Web Speech API (SpeechRecognition) |
| Text-to-speech | SpeechSynthesis API |
| Command parsing | NLP keyword extraction |

---

## 👥 Team Velmora

**Team Name:** Velmora | **Institution:** Sri Shakthi Institute of Engineering and Technology, Coimbatore

| Role | Name | Modules |
|------|------|---------|
| 👑 **Team Leader** | **Sharmila M** | Admin panel, Authentication, Facility management, System integration |
| 👩‍💻 **Member 1** | **Tabitha Merin Clitus** | Campus Map, 3D AR Navigation, IB/SF Block viewers, Voice Navigation |
| 👩‍💻 **Member 2** | **Subhiksha Kodibass** | Student Portal, Emergency SOS, Classroom Finder, Complaints, UI/UX |

> See [TEAM.md](TEAM.md) for full team details, vision statement, and module breakdown.

---

## 📄 Documentation

| Document | Link |
|----------|------|
| 📋 Software Requirements Specification | [SRS.docx](Software%20Requirements%20Specification%20(SRS).docx) |
| 🏗️ Architecture Diagram | [architecture-diagram.png](docs/architecture-diagram.png) |
| 👥 Team Details | [TEAM.md](TEAM.md) |

---

## 📜 License

This project is licensed under the **MIT License**.

---

<div align="center">

**Made with ❤️ by Team Velmora**
Sri Shakthi Institute of Engineering and Technology, Coimbatore

⭐ *Star this repository if you found it helpful!*

</div>
]]>