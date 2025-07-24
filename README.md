# Audio Format Converter & Transcription Tool

A Node.js application that processes audio files and converts them to text using ElevenLabs' speech-to-text API.

## Features

- **Audio Format Processing**: Converts audio files to optimal format (mono, 16kHz, 16-bit)
- **Speech-to-Text**: Transcribes audio using ElevenLabs API with speaker diarization
- **Audio Events Tagging**: Identifies and tags audio events in the transcription

## Prerequisites

- Node.js (version 14 or higher)
- ElevenLabs API key

## Installation

1. Clone or download this project
2. Install dependencies:
   ```bash
   npm install
   ```

3. Set up your environment variables:
   - Add your ElevenLabs API key to the [.env](.env) file:
     ```
     ELEVENLABS_API_KEY=your_api_key_here
     ```

## Usage

1. Update the file path in [index.js](index.js) to point to your audio file:
   ```js
   const arrayBuffer = fs.readFileSync("path/to/your/audio/file.wav");
   ```

2. Run the application:
   ```bash
   node index.js
   ```

## How It Works

The application performs the following steps:

1. **Audio Processing** ([`processAudioBuffer`](index.js)):
   - Converts stereo audio to mono by averaging channels
   - Resamples audio to 16kHz sample rate
   - Converts to 16-bit depth
   - Saves processed audio as `output-complete-processed-wwww.wav`

2. **Transcription** ([`getTranscription`](index.js)):
   - Sends processed audio to ElevenLabs API
   - Uses the `scribe_v1` model for transcription
   - Enables speaker diarization and audio event tagging
   - Returns transcription results

## Dependencies

- **@elevenlabs/elevenlabs-js**: ElevenLabs API client
- **dotenv**: Environment variable management
- **wavefile**: WAV file processing and manipulation

## Output

- **Processed Audio**: `output-complete-processed-wwww.wav` - optimized audio file
- **Transcription**: Console output with speech-to-text results and speaker information

## Configuration

The transcription uses these settings:
- Model: `scribe_v1`
- Language: English (`eng`)
- Speaker diarization: Enabled
- Audio event tagging: Enabled

## File Structure

```
├── .env                 # Environment variables
├── .gitignore          # Git ignore rules
├── index.js            # Main application file
├── package.json        # Project dependencies
└── README.md           # This file
```
