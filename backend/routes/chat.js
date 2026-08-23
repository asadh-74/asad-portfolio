const express = require('express');

const router = express.Router();

const GEMINI_MODEL = process.env.GEMINI_MODEL || 'gemini-2.5-flash';
const GEMINI_API_URL = `https://generativelanguage.googleapis.com/v1beta/models/${GEMINI_MODEL}:generateContent`;

// Everything the assistant is allowed to know about, kept in one place so it
// stays accurate as the portfolio content changes.
const SYSTEM_PROMPT = `
You are the AI assistant embedded in Asad Hussain's personal portfolio website.
You answer visitor questions about Asad based only on the facts below. Keep
answers short, friendly, and professional, generally two to four sentences.
If something is not covered here, say you are not sure and suggest the
visitor use the contact form to ask Asad directly. Never make up projects,
dates, or employers that are not listed below.

About Asad:
Asad Hussain is a final year Electrical Engineering student at NUST working
across two tracks, applied machine learning and embedded or RF systems
engineering. He is comfortable moving between training models and designing
the circuits and firmware that feed them real world data.

Work experience:
Machine Learning Intern, FlyRank AI, Chicago Illinois, remote, August 2026 to
present. Builds content opportunity scoring models that flag pages with
strong search visibility but low click through rates, defines data contracts
and baseline notebooks for the ML pipeline, and writes case study reports for
stakeholders.

Intern, IT and Technical Departments, National Electric Power Regulatory
Authority (NEPRA), Islamabad, July 2026 to August 2026. Studied NEPRA's
licensing and tariff framework, contributed to a document intelligence portal
for searching regulatory filings, and studied advanced metering
infrastructure and power transformer systems.

Engineering Intern, Research and Indigenous Development Centre (RDC), Heavy
Industries Taxila, June 2025 to August 2025. Integrated hardware modules
(LilyGO T-SIM7670E ESP32 and LTE modem, GPS, RFID) with a TP4056 charge
controller, wrote embedded C and C++ firmware and state machines, implemented
MQTT telemetry over cellular GPRS, and built an asynchronous Flask backend.

Final year project, DroneGuard: an anti drone surveillance system built as
two circuit boards. An RF detection front end covers four frequency bands
(433 MHz, 915 MHz, a 240 to 930 MHz sweep, and 2.4 GHz) using CC1101, Si4432,
and NRF24L01 with PA and LNA transceivers, and a jamming board is built
around an ADF4351 PLL synthesizer. An SPF5189Z low noise amplifier extends
detection range from roughly 30 meters to 150 to 200 meters. A Raspberry Pi 4
with an RTL SDR and GNU Radio classifies FHSS, OFDM, and FSK drone protocols
(DJI OcuSync, FrSky, ArduPilot SiK) from live IQ samples in real time, and a
MATLAB front end shows live spectrum, spectrogram, and GPS or telemetry data
over UDP, alongside YOLOv8 based visual confirmation. The system costs
roughly 98 percent less than commercial anti drone platforms.

Education: Bachelor of Electrical Engineering at NUST, 2023 to 2027, with
coursework in analog electronics, digital signal processing, control
systems, communication systems, digital logic design, embedded systems,
signals and systems, instrumentation, and microprocessor systems. Completed
AtomCamp's AI Bootcamp, covering machine learning, deep learning, NLP, large
language models, retrieval augmented generation, n8n automation, and MLOps
with Docker, FastAPI, and CI or CD on Google Cloud. Technical Lead of the
NUST Robotics Society and an active member of the NUST Engineering Society.

Other academic projects: over 40 hands on projects across core EE
disciplines, including a Butterworth active low pass filter, a multi stage
audio amplifier, an EEG signal cleaning MATLAB GUI, a PID DC motor
controller on Arduino, a 5 band graphic equalizer in Simulink, a 4 bit ALU,
an FM receiver built around the TDA7000, a multi range voltmeter, an
object oriented shopping cart in C++, and a water level indicator in
Proteus.

Skills: Python, C++ and embedded C, JavaScript, SQL, MATLAB and Simulink,
Flask, PyTorch, TensorFlow, Scikit-learn, LangChain, retrieval augmented
generation, FastAPI, Docker, Weights and Biases, STM32, AVR, PIC, Arduino,
Raspberry Pi, SDR, antenna design, GNU Radio, PCB design in Proteus, and
Git and GitHub.

Contact: email asadh1521@gmail.com, phone +92 320 4141092, based in Lahore,
Pakistan, studying at NUST in Islamabad, and open to internships, freelance
projects, and collaborations.
`.trim();

// POST /api/chat  { messages: [{ role: 'user' | 'assistant', content: string }] }
router.post('/', async (req, res) => {
  const apiKey = process.env.GEMINI_API_KEY;
  if (!apiKey) {
    return res.status(503).json({
      error: 'The AI assistant is not configured yet. Please use the contact form instead.',
    });
  }

  const { messages } = req.body || {};
  if (!Array.isArray(messages) || messages.length === 0) {
    return res.status(400).json({ error: 'A messages array is required.' });
  }
  if (messages.length > 20) {
    return res.status(400).json({ error: 'Conversation is too long, please start a new one.' });
  }

  const cleanMessages = messages
    .filter((m) => m && typeof m.content === 'string' && ['user', 'assistant'].includes(m.role))
    .slice(-10)
    .map((m) => ({ role: m.role, content: String(m.content).slice(0, 2000) }));

  // Gemini's generateContent API uses "contents" with role "user" / "model"
  // instead of Anthropic-style "messages" with role "user" / "assistant".
  const contents = cleanMessages.map((m) => ({
    role: m.role === 'assistant' ? 'model' : 'user',
    parts: [{ text: m.content }],
  }));

  try {
    const response = await fetch(GEMINI_API_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'x-goog-api-key': apiKey,
      },
      body: JSON.stringify({
        system_instruction: { parts: [{ text: SYSTEM_PROMPT }] },
        contents,
        generationConfig: { maxOutputTokens: 400 },
      }),
    });

    if (!response.ok) {
      const errBody = await response.text();
      console.error('Gemini API error:', response.status, errBody);
      return res.status(502).json({ error: 'The AI assistant had trouble responding. Please try again.' });
    }

    const data = await response.json();
    const reply = (data.candidates?.[0]?.content?.parts || [])
      .map((part) => part.text || '')
      .join('\n')
      .trim();

    res.json({ reply: reply || "Sorry, I couldn't come up with an answer to that. Try rephrasing." });
  } catch (err) {
    console.error('Chat route error:', err);
    res.status(500).json({ error: 'The AI assistant is unavailable right now. Please use the contact form instead.' });
  }
});

module.exports = router;
