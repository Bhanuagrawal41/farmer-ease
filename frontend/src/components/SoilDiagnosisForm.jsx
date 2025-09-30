import React, { useState } from 'react';
import { FlaskConical, Send } from 'lucide-react';
// NOTE: Make sure you run 'npm install lucide-react' if you haven't already

const soilTypes = ['Loamy', 'Clay', 'Sandy', 'Alluvial', 'Laterite', 'Red'];

export default function SoilDiagnosisForm() {
  const [formData, setFormData] = useState({
    soilType: 'Loamy',
    pH: '',
    crop: '',
    symptoms: '',
  });
  const [loading, setLoading] = useState(false);
  const [advice, setAdvice] = useState('');

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.soilType || !formData.pH || !formData.crop) {
      setAdvice('Error: Please fill in all required fields (Soil Type, pH, Crop).');
      return;
    }
    setLoading(true);
    setAdvice('');

    // --- CRITICAL STEP: CONSTRUCT THE INTELLIGENT PROMPT ---
    const structuredPrompt = `The farmer needs advice for their ${formData.crop} crop. 
    Soil Type: ${formData.soilType}, pH Level: ${formData.pH}. 
    Deficiency Symptoms reported: ${formData.symptoms || 'None detected'}. 
    Provide specific, actionable recommendations for fertilizer amendments and overall soil management.`;
    // --------------------------------------------------------

    const payload = {
        // Send the constructed prompt to the general chat endpoint
        prompt: structuredPrompt, 
        // Note: The /api/chat route handles the Node.js proxy to the Python LLM.
    };

    try {
      // Call your Node.js proxy endpoint (the same one used for text chat)
      const res = await fetch('/api/chat', { 
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });

      if (!res.ok) throw new Error(`API response not ok (${res.status})`);
      const data = await res.json();
      
      // Since the Python side returns { assistant: { content: '...' } } on success:
      const assistantContent = data.assistant?.content || 'Failed to get specific AI advice from LLM.';
      
      // Check if the LLM returned the generic "Safe Mode" message
      if (assistantContent.includes("safe mode") || assistantContent.includes("failover")) {
          setAdvice("System Message: AI is running in Failover Mode. Please retry or contact support for full analysis.");
      } else {
          setAdvice(assistantContent); // Display the actual LLM generated advice
      }

    } catch (err) {
      console.error(err);
      setAdvice('Network Error: Could not connect to the AI service.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="p-6 max-w-lg mx-auto bg-white rounded-2xl shadow-lg">
      <h2 className="text-2xl font-bold mb-4 flex items-center text-green-700">
        <FlaskConical className="w-6 h-6 mr-2" /> Soil Diagnosis Tool
      </h2>
      <p className="text-gray-600 mb-4">Input your soil details to receive customized fertilizer and management advice from the AI.</p>
      
      <form onSubmit={handleSubmit} className="space-y-4">
        
        {/* Soil Type Select */}
        <div>
          <label className="block text-sm font-medium text-gray-700">Soil Type (Required)</label>
          <select
            name="soilType"
            value={formData.soilType}
            onChange={handleChange}
            required
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-green-500 focus:ring-green-500 p-2 border"
          >
            {soilTypes.map(type => (
              <option key={type} value={type}>{type}</option>
            ))}
          </select>
        </div>

        {/* pH Level Input */}
        <InputField 
            label="pH Level (e.g., 6.5) (Required)"
            name="pH"
            type="number"
            step="0.1"
            placeholder="Enter soil pH"
            value={formData.pH}
            onChange={handleChange}
            required
        />
        
        {/* Crop Grown Input */}
        <InputField 
            label="Current Crop (Required)"
            name="crop"
            type="text"
            placeholder="e.g. Rice, Coconut, Banana"
            value={formData.crop}
            onChange={handleChange}
            required
        />

        {/* Symptoms Text Area */}
        <div>
          <label className="block text-sm font-medium text-gray-700">Deficiency Symptoms (Optional)</label>
          <textarea
            name="symptoms"
            rows="2"
            placeholder="Describe leaf yellowing, stunting, etc."
            value={formData.symptoms}
            onChange={handleChange}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-green-500 focus:ring-green-500 p-2 border resize-none"
          />
        </div>

        <button
          type="submit"
          disabled={loading}
          className="w-full flex justify-center items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-green-600 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500"
        >
          {loading ? 'Analyzing...' : <><Send className="w-4 h-4 mr-2" /> Get Advice</>}
        </button>
      </form>
      
      {/* AI Advice Output Area */}
      {advice && (
        <div className="mt-6 p-4 bg-yellow-50 border-l-4 border-yellow-500 text-yellow-800">
          <h3 className="font-bold mb-2">AI Recommendation:</h3>
          <p style={{ whiteSpace: 'pre-wrap' }}>{advice}</p>
        </div>
      )}
    </div>
  );
}

// Reusable Input Field (Required for the form above)
function InputField({ label, name, type, step, placeholder, value, onChange, required }) {
    return (
        <div>
            <label className="block text-sm font-medium text-gray-700">{label}</label>
            <input
                name={name}
                type={type}
                step={step}
                placeholder={placeholder}
                value={value}
                onChange={onChange}
                required={required}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-green-500 focus:ring-green-500 p-2 border"
            />
        </div>
    );
}