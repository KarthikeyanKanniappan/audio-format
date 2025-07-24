import fs from "fs";
import { ElevenLabsClient } from "@elevenlabs/elevenlabs-js";
import pkg from "wavefile";
const { WaveFile } = pkg;
import "dotenv/config";

const client = new ElevenLabsClient();

function processAudioBuffer(arrayBuffer) {
  try {
    const wav = new WaveFile(new Uint8Array(arrayBuffer));

    if (wav.fmt.numChannels > 1) {
      const samples = wav.getSamples();
      const monoSamples = new Float32Array(samples[0].length);

      for (let i = 0; i < samples[0].length; i++) {
        monoSamples[i] = (samples[0][i] + samples[1][i]) / 2;
      }

      wav.fromScratch(1, wav.fmt.sampleRate, "16", monoSamples);
      console.log("Converted to mono");
    }

    if (wav.fmt.sampleRate !== 16000) {
      wav.toSampleRate(16000);
    }

    if (wav.bitDepth !== "16") {
      wav.toBitDepth("16");
    }
    return wav.toBuffer();
  } catch (error) {
    console.error("Error processing WAV file:", error);
    throw error;
  }
}

async function getTranscription() {
  console.log("Starting transcription process...");

  const arrayBuffer = fs.readFileSync(
    "/Users/user/Documents/wav conversion/output-processed-segment-1.wav" // Path to your audio file
  );

  const processedBuffer = processAudioBuffer(arrayBuffer); //audio format processing
  fs.writeFileSync("output-complete-processed-wwww.wav", processedBuffer);

  const audioBlob = new Blob([processedBuffer], {
    type: "audio/wav",
  });

  const transcription = await client.speechToText.convert({
    file: audioBlob,
    modelId: "scribe_v1",
    tagAudioEvents: true,
    languageCode: "eng",
    diarize: true,
  });

  return transcription;
}

console.log("Processed result", await getTranscription());
