<pre style="line-height: 1.2;">
███████╗██╗██████╗ ███╗   ██╗         ██╗
██╔════╝██║██╔════╝████╗  ██║        ██╔╝
███████╗██║██║ ███╗██╔██╗ ██║ ██████████╗ ████████╗
╚════██║██║██║   ██║██║╚██╗██║ ╚══██╔══██║ ╚══██╔══╝
███████║██║╚██████╔╝██║ ╚████║ █████║  ██║    ██║
╚══════╝╚═╝ ╚═════╝ ╚═╝  ╚═══╝ ╚══██║  ██║ ██████╗
                                  ██║  ██║ ██╔═██║
                                  ╚═╝  ╚═╝ ╚█████║
                                           ╚═════╝
</pre>

_Bridging communication between hearing individuals and the deaf/hard-of-hearing community_

![SignSetu Landing Page](./backend/images/landing-page.png)

![SignSetu Text to ASL](./backend/images/text-upload.png)

![SignSetu Upload Interface](./backend/images/upload-video.png)

![SignSetu Speech-to-Text](./backend/images/audio-upload.png)

![SignSetu Processing Speech](./backend/images/processing-speech.png)

![SignSetu ASL Gloss Output](./backend/images/signs-rendered.png)

---

## Table of Contents

- [About](#about)
- [Features](#features)
- [Tech Stack](#tech-stack)
- [Project Structure](#project-structure)
- [API Documentation](#api-documentation)
- [Vocabulary Database](#vocabulary-database)
- [Getting Started](#getting-started)
  - [Prerequisites](#prerequisites)
  - [Frontend Setup](#frontend-setup)
  - [Backend Setup](#backend-setup)
- [Environment Variables](#environment-variables)
- [Deployment](#deployment)
- [Contributors](#contributors)
- [License](#license)

---

## About

Sign Setu is a web application designed to bridge the communication gap between hearing individuals and the deaf/hard-of-hearing community. The platform converts text, audio, and video input into American Sign Language (ASL) gloss notation, making it easier for anyone to communicate effectively and inclusively.

Whether you want to convert spoken words from an audio file, transcribe video content, or simply type text to be translated into ASL-compatible gloss, Sign Setu provides a seamless solution.

> **Studying ASL fosters awareness and sensitivity toward the Deaf and hard of hearing community.**

---

## Features

Sign Setu offers multiple input methods to convert your content into ASL gloss:

### 1. Text to ASL Gloss
- Input plain text and receive ASL-compatible gloss notation
- AI-powered synonym mapping finds the best match in the vocabulary database
- Filters out stop words for cleaner output
- Caches synonyms for improved performance

### 2. Audio to ASL Gloss
- Upload audio files (MP3 format)
- Speech-to-text transcription using AssemblyAI
- Converts transcribed text to ASL gloss
- Supports various audio formats via ffmpeg

### 3. Video to ASL Gloss
- Upload video files (MP4, MOV)
- Extracts audio from video using ffmpeg
- Transcribes audio using AssemblyAI
- Converts result to ASL gloss notation

### 4. Language Translation to ASL
- Input text in any language
- Translates to English using Google Translate
- Converts translated text to ASL gloss
- Supports multilingual input

### 5. Speech-to-Text
- Real-time voice transcription
- Client-side speech recognition
- Works directly in the browser
- Perfect for live communication assistance

---

## Tech Stack

### Frontend

| Technology | Purpose |
|------------|---------|
| [Next.js 15](https://nextjs.org/) | React framework for production |
| [React 19](https://react.dev/) | UI library |
| [Tailwind CSS 4](https://tailwindcss.com/) | Styling framework |
| [Framer Motion](https://www.framer.com/motion/) | Animation library |
| [Three.js](https://threejs.org/) | 3D graphics |
| [Lucide React](https://lucide.dev/) | Icon library |
| [Axios](https://axios-http.com/) | HTTP client |
| [TypeScript](https://www.typescriptlang.org/) | Type safety |

### Backend

| Technology | Purpose |
|------------|---------|
| [Django](https://www.djangoproject.com/) | Python web framework |
| [Django REST Framework](https://www.django-rest-framework.org/) | REST API building |
| [Python](https://www.python.org/) | Server-side language |
| [spaCy](https://spacy.io/) | NLP processing |
| [NLTK](https://www.nltk.org/) | Natural language toolkit |
| [ffmpeg](https://ffmpeg.org/) | Audio/video processing |
| [AssemblyAI](https://www.assemblyai.com/) | Speech-to-text API |
| [OpenRouter](https://openrouter.ai/) | AI API for synonym mapping |
| [Google Translate](https://translate.google.com/) | Translation service |

---

## Project Structure

```
Sign-Setu/
├── backend/                # Django REST Framework Backend
│   ├── core/               # Main project settings and configuration
│   ├── api/                # API endpoints for text processing/NLP
│   ├── manage.py           # Django management script
│   ├── requirements.txt    # Python dependencies
│   └── .env                # Backend environment variables
│
├── frontend/               # Next.js Frontend (App Router)
│   ├── public/             # Static assets
│   │   └── models/         # 3D GLB models (xbot, ybot) for sign language
│   ├── src/
│   │   ├── app/            # Next.js Pages (STT, Upload, Landing)
│   │   ├── components/     # UI Components (Hero, Landing, Upload)
│   │   ├── Animations/     # 3D Animation data (Alphabets, Words)
│   │   │   ├── Alphabets/  # Hand-coded animations for single letters
│   │   │   └── Words/      # Hand-coded animations for specific words
│   │   ├── hooks/          # Three.js initialization and animation logic
│   │   └── lib/            # Utility functions and shared helpers
│   ├── next.config.ts      # Next.js configuration
│   ├── package.json        # Frontend dependencies
│   └── .env.local          # Frontend environment variables
│
└── README.md               # Project documentation
```

---

## API Documentation

### Endpoints

#### 1. Process Content

**`POST /api/process/`**

Convert text, audio, or video content to ASL gloss.

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `category` | string | Yes | One of: `text`, `audio`, `video`, `translate` |
| `text` | string | Yes* | Text input (*required for `text` and `translate`) |
| `file` | file | Yes* | File input (*required for `audio` and `video`) |

**Request Examples:**

```bash
# Text to Gloss
curl -X POST https://signsetu-ai.onrender.com/api/process/ \
  -F "category=text" \
  -F "text=Hello how are you"

# Audio to Gloss
curl -X POST https://signsetu-ai.onrender.com/api/process/ \
  -F "category=audio" \
  -F "file=@audio.mp3"

# Video to Gloss
curl -X POST https://signsetu-ai.onrender.com/api/process/ \
  -F "category=video" \
  -F "file=@video.mp4"

# Translate to English then Gloss
curl -X POST https://signsetu-ai.onrender.com/api/process/ \
  -F "category=translate" \
  -F "text=Bonjour comment allez-vous"
```

**Response:**

```json
{
  "text": "Original transcribed/translated text",
  "gloss": ["asl", "compatible", "words", "array"]
}
```

For translation category:
```json
{
  "original": "Original non-English text",
  "translated": "English translation",
  "gloss": ["asl", "gloss", "words"]
}
```

#### 2. Health Check

**`GET /api/ping/`**

Check if the API is running.

**Response:**

```json
{
  "message": "pong"
}
```

#### 3. Root Endpoint

**`GET /`**

Server health check.

**Response:**

```json
{
  "status": "ok"
}
```

---

## Vocabulary Database

Sign Setu includes a comprehensive vocabulary database of **1,481 ASL-compatible words** located in `backend/Main/vocab/animation_words.txt`.

The vocabulary includes:
- Common words (a-z)
- Days of the week
- Months of the year
- Numbers (0-100+)
- Countries and nationalities
- Colors
- Animals
- Food items
- Professions
- Emotions
- And much more...

The system uses AI-powered synonym matching to find the closest vocabulary match when input words aren't directly in the database. Results are cached in `backend/Main/vocab/word_synonym_map.json` for improved performance.

---

## Getting Started

Follow these instructions to set up Sign Setu locally on your machine.

### Prerequisites

Before you begin, ensure you have the following installed:

- **Node.js** (v18 or higher)
- **Python** (v3.8 or higher)
- **pip** (Python package manager)
- **ffmpeg** (for audio/video processing)
- **Git**

### Frontend Setup

1. **Navigate to the frontend directory:**

```bash
cd frontend
```


2. **Create environment variables:**

Create a `.env.local` file in the `frontend` directory:

```bash
# Optional: If connecting to a custom backend
NEXT_PUBLIC_API_URL=http://localhost:8000
```

Create a `next-env.d.ts` file in the `frontend` directory:

```bash
/// <reference types="next" />
/// <reference types="next/image-types/global" />

// NOTE: This file should not be edited
// see https://nextjs.org/docs/app/api-reference/config/typescript for more information.
```

3. **Install dependencies:**

```bash
npm install
```

```bash
npm install mime-types
```


4. **Start the development server:**

```bash
npm run dev
```

5. **Open your browser:**

Navigate to [http://localhost:3000](http://localhost:3000)

### Backend Setup

1. **Navigate to the backend directory:**

```bash
cd backend
```

2. **Create a virtual environment (recommended):**

```bash
# On macOS/Linux
python -m venv venv
source venv/bin/activate

# On Windows
python -m venv venv
venv\Scripts\activate
```

3. **Install Python dependencies:**

```bash
pip install -r requirements.txt
```

4. **Set up environment variables:**

Create a `.env` file in the `backend` directory:

```bash
# Required API Keys
ASSEMBLYAI_API_KEY=your_assemblyai_api_key
OPENROUTER_API_KEY=your_openrouter_api_key

# Django Secret Key (generate a secure random string)
DJANGO_SECRET_KEY=your_django_secret_key_here

# Debug mode (set to False in production)
DEBUG=True

# Allowed hosts (comma-separated)
ALLOWED_HOSTS=localhost,127.0.0.1
```

5. **Get API Keys:**

   - **AssemblyAI**: Sign up at [assemblyai.com](https://www.assemblyai.com/)
   - **OpenRouter**: Sign up at [openrouter.ai](https://openrouter.ai/)


6. **Start the development server:**

```bash
python manage.py runserver
```

7. **Verify the API:**

Open [http://localhost:8000](http://localhost:8000) in your browser - you should see:
```json
{"status": "ok"}
```

---

## Environment Variables

| Variable | Required | Description |
|----------|----------|-------------|
| `ASSEMBLYAI_API_KEY` | Yes | API key for AssemblyAI speech-to-text service |
| `OPENROUTER_API_KEY` | Yes | API key for OpenRouter AI synonym mapping |
| `DJANGO_SECRET_KEY` | Yes | Django secret key for security |
| `DEBUG` | No | Set to `True` for development, `False` for production |
| `ALLOWED_HOSTS` | No | Comma-separated list of allowed hosts |

---

## Contributors

Sign Setu was built with love by:

- **Govind Jindal** ([@govindjindal](https://github.com/govindjindal))
- **Piyush Sharma** ([@piyushCodes7](https://github.com/piyushCodes7))
- **Asmit Chitkara** ([@asmit538](https://github.com/asmit538))
- **DevKabir Deora** ([@devkabirdeora](https://github.com/devkabirdeora))
- **Lakshman Bansal** ([@lakshman-bansal](https://github.com/lakshman-bansal))
- **Deepanshu Arora** ([@deepanshu3540beai25-jpg](https://github.com/deepanshu3540beai25-jpg))
