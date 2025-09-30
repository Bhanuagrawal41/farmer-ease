import React, { useState, useEffect, useRef } from 'react';
import { Camera, Mic, StopCircle, Send, Leaf } from 'lucide-react'; 
// NOTE: Ensure lucide-react is installed: npm install lucide-react

export default function ChatBot() {
    const [messages, setMessages] = useState([{
        role: 'system',
        content: `You are KrishiSakthi — an AI assistant that helps farmers in Kerala. Answer clearly and kindly in Malayalam or English depending on the user's language. Give practical, actionable farming advice, suggest low-cost remedies, mention safety & environmental concerns, and when appropriate recommend contacting extension officers. If the user asks for weather or market prices, say you can fetch live data if provided or call external APIs.`
    }]);
    const [input, setInput] = useState('');
    const [listening, setListening] = useState(false);
    const [language, setLanguage] = useState('auto');
    const [loading, setLoading] = useState(false);
    
    // Refs for DOM elements
    const recognitionRef = useRef(null);
    const messagesEndRef = useRef(null);
    const imageInputRef = useRef(null); // Ref for the hidden file input

    // ===================================================
    // LIFECYCLE & UTILITIES
    // ===================================================

    useEffect(() => {
        // Setup Web Speech API for recognition (handles voice input)
        const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
        if (!SpeechRecognition) return;
        const rec = new SpeechRecognition();
        rec.continuous = false;
        rec.interimResults = false;
        rec.lang = 'en-US';
        rec.onresult = (e) => {
            const t = e.results[0][0].transcript;
            sendMessage(t, 'voice'); 
            setListening(false);
        };
        rec.onend = () => setListening(false);
        recognitionRef.current = rec;
    }, []);

    useEffect(() => {
        messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    }, [messages]);

    const speakText = (text, lang = 'en-US') => {
        if (!('speechSynthesis' in window)) return;
        const utter = new SpeechSynthesisUtterance(text);
        utter.lang = lang.startsWith('ml') ? 'ml-IN' : lang;
        window.speechSynthesis.cancel();
        window.speechSynthesis.speak(utter);
    };

    // ===================================================
    // INPUT HANDLERS
    // ===================================================

    const startListening = () => {
        if (!recognitionRef.current) return alert('Speech recognition not available in this browser.');
        try {
            recognitionRef.current.lang = language === 'auto' ? 'ml-IN' : language;
            recognitionRef.current.start();
            setListening(true);
        } catch (err) {
            console.error(err);
            setListening(false);
        }
    };

    const stopListening = () => {
        recognitionRef.current?.stop();
        setListening(false);
    };

    const handleTextSend = () => {
        sendMessage(input, 'text');
        setInput('');
    };
    
    const handleImageChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            sendMessage(file, 'image');
            e.target.value = null; 
        }
    };

    // ===================================================
    // MAIN SENDER FUNCTION (Handles all modalities)
    // ===================================================

  // src/components/ChatBot.jsx (The corrected sendMessage function)

    const sendMessage = async (inputData, type) => {
        let endpoint = '';
        let body;
        let userMsgContent;

        // 1. Prepare Request based on Type
        if (type === 'text' && typeof inputData === 'string' && inputData.trim()) {
            // FIX: Set endpoint to '/chat' to match Node.js proxy route
            endpoint = '/chat'; 
            userMsgContent = inputData;
            body = JSON.stringify({ prompt: inputData }); 
            
        } else if (type === 'image' && inputData instanceof File) {
            // Image is correct as '/ai/image'
            endpoint = '/ai/image';
            userMsgContent = `[Image Sent: ${inputData.name} - Processing...]`;
            const formData = new FormData();
            formData.append('image', inputData); 
            body = formData;
            
        } else if (type === 'voice' && typeof inputData === 'string' && inputData.trim()) {
            // FIX: Set endpoint to '/chat' to match Node.js proxy route
            endpoint = '/chat'; 
            userMsgContent = `[Voice Input] ${inputData}`;
            body = JSON.stringify({ prompt: inputData }); 
            
        } else {
            return;
        }
        
        // 2. Update UI and Load
        const userMsg = { role: 'user', content: userMsgContent };
        setMessages((m) => [...m, userMsg]);
        setLoading(true);

        try {
            // 3. Fetch Call (The fetch path is: /api/chat)
            const res = await fetch(`/api${endpoint}`, {
                method: 'POST',
                headers: (type === 'text' || type === 'voice') ? { 'Content-Type': 'application/json' } : {},
                body: body
            });

            if (!res.ok) throw new Error(`API response not ok (${res.status})`);
            const data = await res.json();
            
            // ... (Rest of the logic to handle response data) ...

            let assistantContent;
            let speakTextContent = data.advice || data.assistant?.content; 
            
            if (data.advice) {
                assistantContent = data.advice;
            } else {
                assistantContent = data.assistant?.content || 'Service failover initiated.';
            }

            const assistantMsg = { role: 'assistant', content: assistantContent };
            setMessages((m) => [...m, assistantMsg]);
            
            if (speakTextContent) speakText(speakTextContent, data.speakLang || 'en-US');

        } catch (err) {
            console.error(err);
            // The network error message seen in the image:
            setMessages((m) => [...m, { role: 'assistant', content: `Error contacting server (${type}). The network is blocking the connection. Please check the Python console.` }]);
        } finally {
            setLoading(false);
        }
    };

    // ===================================================
    // RENDER (Full UI Structure)
    // ===================================================

    return (
        <div className="flex flex-col h-full bg-green-50">
            {/* Chat History Area */}
            <div className="flex-1 overflow-y-auto p-3 mb-3 bg-gray-50">
                {messages.slice(1).map((m, i) => (
                    <div key={i} className={m.role === 'user' ? 'flex justify-end my-2' : 'flex justify-start my-2'}>
                        <div className={m.role === 'user' ? 'inline-block bg-green-200 px-3 py-2 rounded-xl rounded-br-none max-w-[80%]' : 'inline-block bg-white px-3 py-2 rounded-xl rounded-tl-none shadow-md max-w-[80%] border'}>
                            <div style={{ whiteSpace: 'pre-wrap' }}>{m.content}</div>
                        </div>
                    </div>
                ))}
                {loading && <div className="text-gray-500 my-2">🤖 Thinking...</div>}
                <div ref={messagesEndRef} />
            </div>

            {/* Input and Controls Area */}
            <div className="p-3 bg-white border-t">
                
                {/* Hidden File Input */}
                <input 
                    type="file" 
                    id="image-upload-input" 
                    accept="image/*" 
                    ref={imageInputRef} 
                    style={{ display: 'none' }} 
                    onChange={handleImageChange}
                />

                <div className="flex gap-2 mb-2">
                    {/* Multi-Modal Buttons */}
                    <button 
                        onClick={() => imageInputRef.current.click()} 
                        disabled={loading} 
                        className="p-2 rounded border bg-gray-50 hover:bg-gray-100 transition"
                        title="Upload Crop Image"
                    >
                        <Camera className="w-5 h-5 text-green-600" />
                    </button>

                    {!listening ? (
                        <button 
                            onClick={startListening} 
                            disabled={loading} 
                            className="p-2 rounded border bg-gray-50 hover:bg-gray-100 transition"
                            title="Start Voice Input"
                        >
                            <Mic className="w-5 h-5 text-blue-500" />
                        </button>
                    ) : (
                        <button 
                            onClick={stopListening} 
                            disabled={loading} 
                            className="p-2 rounded border bg-red-100 hover:bg-red-200 text-red-600 transition"
                            title="Stop Voice Input"
                        >
                            <StopCircle className="w-5 h-5" />
                        </button>
                    )}
                    
                    {/* Language Selector (Kept for quick access) */}
                    <select value={language} onChange={(e) => setLanguage(e.target.value)} disabled={loading} className="border rounded p-1 text-sm bg-gray-50">
                        <option value="auto">Auto</option>
                        <option value="ml-IN">Malayalam</option>
                        <option value="en-US">English</option>
                    </select>

                    <button onClick={() => { setMessages([{ role: 'system', content: messages[0].content }]); }} className="ml-auto text-sm underline text-gray-500">Reset</button>

                </div>

                {/* Text Input Area */}
                <div className="flex gap-2">
                    <textarea 
                        value={input} 
                        onChange={(e) => setInput(e.target.value)} 
                        onKeyDown={(e) => { if (e.key === 'Enter' && !e.shiftKey) { e.preventDefault(); handleTextSend(); }}}
                        rows={1} 
                        className="flex-1 border rounded p-2 resize-none focus:ring-green-500" 
                        placeholder="Type your question..." 
                        disabled={loading}
                    />
                    <button 
                        onClick={handleTextSend} 
                        disabled={loading || !input.trim()} 
                        className="px-4 py-2 rounded bg-green-600 text-white hover:bg-green-700 transition"
                    >
                        <Send className='w-5 h-5' />
                    </button>
                </div>
            </div>
        </div>
    );
}