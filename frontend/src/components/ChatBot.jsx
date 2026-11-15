import React, { useState, useEffect, useRef } from 'react';
import { Camera, Mic, StopCircle, Send, RotateCcw, Leaf, Zap } from 'lucide-react';

const SYSTEM_PROMPT = `You are Rebha AI — FarmEase's agronomic intelligence copilot. You ingest satellite imagery, soil probe data, and weather telemetry to deliver precise, actionable farm intelligence. Answer clearly and concisely. When relevant, cite confidence levels (e.g. "84% confidence"), mention sensor readings, and suggest variable-rate prescriptions. Always end with a question to further assist the farmer.`;

const SUGGESTED = [
  "Analyze nitrogen deficiency risk in North Valley Lot #4",
  "Calculate optimal harvest window based on recent GDD",
  "Generate variable-rate fertilizer prescription map",
  "Check for wheat stem sawfly threat in low-canopy zones",
];

export default function ChatBot() {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState('');
  const [listening, setListening] = useState(false);
  const [loading, setLoading] = useState(false);
  const [sessionId] = useState(() => `#${Math.floor(Math.random() * 9000) + 1000}`);

  const recognitionRef = useRef(null);
  const messagesEndRef = useRef(null);
  const imageInputRef = useRef(null);

  // ── Voice ──────────────────────────────────────────
  useEffect(() => {
    const SR = window.SpeechRecognition || window.webkitSpeechRecognition;
    if (!SR) return;
    const rec = new SR();
    rec.continuous = false;
    rec.interimResults = false;
    rec.lang = 'en-US';
    rec.onresult = (e) => { sendMessage(e.results[0][0].transcript, 'voice'); setListening(false); };
    rec.onend = () => setListening(false);
    recognitionRef.current = rec;
  }, []);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const speakText = (text) => {
    if (!('speechSynthesis' in window)) return;
    const u = new SpeechSynthesisUtterance(text);
    u.lang = 'en-US';
    window.speechSynthesis.cancel();
    window.speechSynthesis.speak(u);
  };

  // ── Handlers ───────────────────────────────────────
  const startListening = () => {
    if (!recognitionRef.current) return;
    try { recognitionRef.current.start(); setListening(true); }
    catch (e) { setListening(false); }
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) { sendMessage(file, 'image'); e.target.value = null; }
  };

  const handleSend = () => {
    if (!input.trim()) return;
    sendMessage(input.trim(), 'text');
    setInput('');
  };

  // ── Core sender ────────────────────────────────────
  const sendMessage = async (inputData, type) => {
    let endpoint, body, userContent;

    if (type === 'text' || type === 'voice') {
      endpoint = '/chat';
      userContent = type === 'voice' ? `🎙 ${inputData}` : inputData;
      body = JSON.stringify({ prompt: inputData });
    } else if (type === 'image') {
      endpoint = '/ai/image';
      userContent = `📷 Image uploaded: ${inputData.name}`;
      const fd = new FormData();
      fd.append('image', inputData);
      body = fd;
    } else return;

    setMessages(m => [...m, { role: 'user', content: userContent, time: new Date() }]);
    setLoading(true);

    try {
      const res = await fetch(`/api${endpoint}`, {
        method: 'POST',
        headers: (type !== 'image') ? { 'Content-Type': 'application/json' } : {},
        body,
      });
      if (!res.ok) throw new Error(res.status);
      const data = await res.json();
      const reply = data.advice || data.assistant?.content || 'No response received.';
      setMessages(m => [...m, { role: 'assistant', content: reply, time: new Date() }]);
      speakText(reply);
    } catch (err) {
      setMessages(m => [...m, {
        role: 'assistant',
        content: `⚠️ Could not reach the FarmEase API. Please ensure the backend is running (port 5000).`,
        time: new Date(),
        error: true,
      }]);
    } finally {
      setLoading(false);
    }
  };

  const reset = () => setMessages([]);
  const fmt = (d) => d?.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' });

  // ── Render ─────────────────────────────────────────
  return (
    <div className="flex flex-col h-full bg-mint">

      {/* Session bar */}
      <div className="px-4 py-2 bg-sage border-b border-cardBorder flex items-center gap-2 shrink-0">
        <Zap className="w-3.5 h-3.5 text-accentGreen" />
        <span className="text-xs font-semibold text-forest">Consultation Session {sessionId}</span>
        <span className="ml-auto text-[10px] text-gray-400">Active Context: Sentinel-2 NDVI · Spraying ahead</span>
      </div>

      {/* Message area */}
      <div className="flex-1 overflow-y-auto px-4 py-4 space-y-4">

        {/* Empty state / suggested queries */}
        {messages.length === 0 && (
          <div className="space-y-4">
            {/* Greeting card */}
            <div className="flex gap-3">
              <img
                src="/assets/logo.png"
                alt="AI"
                className="w-8 h-8 rounded-full object-contain shrink-0"
              />
              <div className="bg-white border border-cardBorder rounded-2xl rounded-tl-sm px-4 py-3 max-w-[88%] shadow-sm">
                <p className="text-xs font-semibold text-forest mb-1">
                  Rebha Copilot <span className="font-normal text-gray-400 ml-1">Engine v4.2</span>
                </p>
                <p className="text-sm text-gray-700 leading-relaxed">
                  Hello, I'm Rebha, your FarmEase agronomic intelligence copilot. I've ingested and
                  analyzed your satellite NDVI multispectral imagery from today along with
                  subterranean soil probes across your lots.
                </p>
                <p className="text-sm text-gray-700 mt-2 leading-relaxed">
                  Overall vegetative vigor is strong{' '}
                  <span className="font-semibold text-accentGreen">(NDVI 0.78)</span>, but I flagged a
                  slight reflective spectral dip along the upper terrace sandy loam strip. How can I
                  assist your crop decisions today?
                </p>
              </div>
            </div>

            {/* Suggested queries */}
            <div className="pl-11">
              <p className="text-[10px] uppercase tracking-widest text-gray-400 mb-2">Suggested Inquiries</p>
              <div className="flex flex-col gap-2">
                {SUGGESTED.map((s, i) => (
                  <button
                    key={i}
                    onClick={() => { setInput(s); }}
                    className="text-left text-xs text-forest bg-sage hover:bg-cardBorder border border-cardBorder rounded-lg px-3 py-2 transition"
                  >
                    {i < 3 ? '✦' : '✕'} {s}
                  </button>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* Chat messages */}
        {messages.map((m, i) => (
          <div key={i} className={`flex gap-3 ${m.role === 'user' ? 'flex-row-reverse' : ''}`}>
            {/* Avatar */}
            {m.role === 'user' ? (
              <div className="w-7 h-7 rounded-full flex items-center justify-center shrink-0 text-xs font-bold bg-goldDark text-forestAlt">
                MV
              </div>
            ) : (
              <img
                src="/assets/logo.png"
                alt="AI"
                className="w-7 h-7 rounded-full object-contain shrink-0"
              />
            )}

            {/* Bubble */}
            <div className={`max-w-[80%] ${m.role === 'user' ? 'items-end' : 'items-start'} flex flex-col gap-1`}>
              <p className={`text-[10px] ${m.role === 'user' ? 'text-right text-gray-400' : 'text-gray-400'}`}>
                {m.role === 'user' ? `Marcus Vance · ${fmt(m.time)}` : `Rebha Copilot · ${fmt(m.time)}`}
              </p>
              <div className={`px-4 py-3 rounded-2xl text-sm leading-relaxed shadow-sm border
                ${m.role === 'user'
                  ? 'bg-forest text-white border-transparent rounded-tr-sm'
                  : m.error
                    ? 'bg-red-50 text-red-700 border-red-200 rounded-tl-sm'
                    : 'bg-white text-gray-800 border-cardBorder rounded-tl-sm'
                }`}
                style={{ whiteSpace: 'pre-wrap' }}
              >
                {m.content}
              </div>
            </div>
          </div>
        ))}

        {/* Thinking indicator */}
        {loading && (
          <div className="flex gap-3">
            <img
              src="/assets/logo.png"
              alt="AI"
              className="w-7 h-7 rounded-full object-contain shrink-0"
            />
            <div className="bg-white border border-cardBorder rounded-2xl rounded-tl-sm px-4 py-3 shadow-sm">
              <div className="flex gap-1 items-center h-4">
                <span className="w-1.5 h-1.5 bg-accentGreen rounded-full animate-bounce [animation-delay:0ms]" />
                <span className="w-1.5 h-1.5 bg-accentGreen rounded-full animate-bounce [animation-delay:150ms]" />
                <span className="w-1.5 h-1.5 bg-accentGreen rounded-full animate-bounce [animation-delay:300ms]" />
              </div>
            </div>
          </div>
        )}

        <div ref={messagesEndRef} />
      </div>

      {/* Input area */}
      <div className="shrink-0 border-t border-cardBorder bg-white px-4 py-3 space-y-2">

        {/* Toolbar */}
        <div className="flex items-center gap-2">
          <input type="file" accept="image/*" ref={imageInputRef} className="hidden" onChange={handleImageChange} />

          <button
            onClick={() => imageInputRef.current.click()}
            disabled={loading}
            title="Upload crop image"
            className="p-2 rounded-lg border border-cardBorder hover:bg-sage transition text-accentGreen disabled:opacity-40"
          >
            <Camera className="w-4 h-4" />
          </button>

          <button
            onClick={listening ? () => { recognitionRef.current?.stop(); setListening(false); } : startListening}
            disabled={loading}
            title={listening ? "Stop listening" : "Voice input"}
            className={`p-2 rounded-lg border transition ${listening
              ? 'border-red-300 bg-red-50 text-red-500'
              : 'border-cardBorder hover:bg-sage text-accentGreen'} disabled:opacity-40`}
          >
            {listening ? <StopCircle className="w-4 h-4" /> : <Mic className="w-4 h-4" />}
          </button>

          {listening && (
            <span className="text-xs text-red-500 animate-pulse font-medium">Listening…</span>
          )}

          <button
            onClick={reset}
            title="New session"
            className="ml-auto p-2 rounded-lg border border-cardBorder hover:bg-sage transition text-gray-400"
          >
            <RotateCcw className="w-4 h-4" />
          </button>
        </div>

        {/* Text input row */}
        <div className="flex gap-2">
          <textarea
            value={input}
            onChange={e => setInput(e.target.value)}
            onKeyDown={e => { if (e.key === 'Enter' && !e.shiftKey) { e.preventDefault(); handleSend(); } }}
            rows={1}
            disabled={loading}
            placeholder="Ask Rebha about crop health, variable-rate prescriptions, soil chemistry…"
            className="flex-1 resize-none rounded-xl border border-cardBorder px-3 py-2 text-sm text-gray-800 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-forest/30 focus:border-forest transition"
          />
          <button
            onClick={handleSend}
            disabled={loading || !input.trim()}
            className="px-4 rounded-xl bg-goldDark text-forestAlt font-semibold text-sm hover:bg-goldLight transition disabled:opacity-40 flex items-center gap-1.5"
          >
            <Send className="w-4 h-4" />
            <span className="hidden sm:inline">Dispatch</span>
          </button>
        </div>

        {/* Footer note */}
        <p className="text-[10px] text-gray-400 text-center leading-tight">
          Rebha uses field sensor telemetry and multi-spectral satellite imagery. Always confirm high-stakes chemical applications with local crop insurance requirements.
        </p>
      </div>
    </div>
  );
}
