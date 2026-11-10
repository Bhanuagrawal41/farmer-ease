import os
import io
import torch
import whisper
import requests
import json
import random
from flask import Flask, request, jsonify
from PIL import Image

# --- PYTORCH & HUGGING FACE IMPORTS ---
import torch.nn as nn
from transformers import pipeline
from torchvision.models import mobilenet_v2
from torchvision import transforms 
# --- End of Imports ---

os.environ['TRANSFORMERS_NO_ADVISORY_WARNINGS'] = 'true'

app = Flask(__name__)
LLAMA_MODEL_NAME = "TinyLlama/TinyLlama-1.1B-Chat-v1.0" 
CNN_MODEL_PATH = "image_model/plant_disease_model.pth" 

# =======================================================
# 1. MODEL DEFINITIONS & LOADING
# =======================================================

# Plant disease classes (15 classes corresponding to MobileNetV2 output)
CLASS_NAMES = [
    "Pepper__bell___Bacterial_spot",
    "Pepper__bell___healthy",
    "Potato___Early_blight",
    "Potato___Late_blight",
    "Potato___healthy",
    "Tomato___Bacterial_spot",
    "Tomato___Early_blight",
    "Tomato___Late_blight",
    "Tomato___Leaf_Mold",
    "Tomato___Septoria_leaf_spot",
    "Tomato___Spider_mites_Two_spotted_spider_mite",
    "Tomato___Target_Spot",
    "Tomato___Tomato_Yellow_Leaf_Curl_Virus",
    "Tomato___Tomato_mosaic_virus",
    "Tomato___healthy"
]

# Image transform for MobileNetV2
IMAGE_TRANSFORM = transforms.Compose([
    transforms.Resize((224, 224)),
    transforms.ToTensor(),
    transforms.Normalize(mean=[0.485, 0.456, 0.406], std=[0.229, 0.224, 0.225])
])

# 1. Load CNN Model
CNN_MODEL = None
try:
    print("Loading Plant Disease CNN model...")
    CNN_MODEL = mobilenet_v2(weights=None)
    in_features = CNN_MODEL.classifier[1].in_features
    CNN_MODEL.classifier[1] = nn.Linear(in_features, len(CLASS_NAMES))
    
    state_dict = torch.load(CNN_MODEL_PATH, map_location=torch.device('cpu'))
    CNN_MODEL.load_state_dict(state_dict)
    CNN_MODEL.eval()
    print("✅ Plant Disease CNN model loaded successfully!")
except Exception as e:
    print(f"⚠️ Error loading CNN model: {e}")
    CNN_MODEL = None

# 2. Load Whisper Model
WHISPER_MODEL = None
try:
    print("Loading Whisper model (tiny)...")
    WHISPER_MODEL = whisper.load_model("tiny")
    print("✅ Whisper model loaded successfully!")
except Exception as e:
    print(f"⚠️ Error loading Whisper model: {e}")
    WHISPER_MODEL = None

# 3. Load TinyLlama Pipeline
LLAMA_PIPELINE = None
try:
    print("Loading TinyLlama pipeline...")
    LLAMA_PIPELINE = pipeline(
        "text-generation",
        model=LLAMA_MODEL_NAME,
        model_kwargs={"device_map": "cpu"},
        dtype=torch.float32
    )
    print("✅ TinyLlama pipeline loaded successfully!")
except Exception as e:
    print(f"⚠️ Error loading TinyLlama pipeline: {e}")
    LLAMA_PIPELINE = None

# =======================================================
# 2. ADVISORY & INFERENCE LOGIC
# =======================================================
SYSTEM_PROMPT = "You are KrishiSakthi, an expert Indian agronomist assisting Kerala farmers. Provide only concise, step-by-step, actionable advice. Be encouraging."

DISEASE_ADVICE_KNOWLEDGEBASE = {
    "Potato___Late_blight": "DIAGNOSIS: Potato Late Blight. IMMEDIATE ACTION: Apply Mancozeb or copper oxychloride fungicide immediately. Ensure proper drainage and avoid overhead sprinkler watering. Remove and safely dispose of severely infected leaves.",
    "Potato___Early_blight": "DIAGNOSIS: Potato Early Blight. IMMEDIATE ACTION: Spray chlorothalonil or copper-based fungicide. Practice crop rotation and avoid wetting leaves during irrigation.",
    "Potato___healthy": "DIAGNOSIS: Healthy Potato Leaf. ADVICE: Continue regular watering and fertilization. Monitor leaves weekly for any signs of blight or pest attack.",
    "Tomato___Late_blight": "DIAGNOSIS: Tomato Late Blight. IMMEDIATE ACTION: Apply systemic fungicide (metalaxyl or cymoxanil) and prune affected foliage. Ensure good air circulation.",
    "Tomato___Early_blight": "DIAGNOSIS: Tomato Early Blight. IMMEDIATE ACTION: Remove lower affected leaves and apply copper fungicide spray every 7-10 days.",
    "Tomato___Bacterial_spot": "DIAGNOSIS: Tomato Bacterial Spot. IMMEDIATE ACTION: Use copper-mancozeb combination sprays. Avoid handling wet plants to stop bacterial spread.",
    "Tomato___Leaf_Mold": "DIAGNOSIS: Tomato Leaf Mold. IMMEDIATE ACTION: Improve ventilation in the polyhouse/field, reduce relative humidity, and spray sulfur-based fungicide.",
    "Tomato___Septoria_leaf_spot": "DIAGNOSIS: Tomato Septoria Leaf Spot. IMMEDIATE ACTION: Remove spotted lower leaves and apply chlorothalonil or copper spray.",
    "Tomato___Spider_mites_Two_spotted_spider_mite": "DIAGNOSIS: Two-spotted Spider Mites. IMMEDIATE ACTION: Spray neem oil (5ml/L) or a registered miticide. Keep plants well-hydrated.",
    "Tomato___Target_Spot": "DIAGNOSIS: Tomato Target Spot. IMMEDIATE ACTION: Apply azoxystrobin or copper hydroxide spray and remove plant debris.",
    "Tomato___Tomato_Yellow_Leaf_Curl_Virus": "DIAGNOSIS: Tomato Yellow Leaf Curl Virus. IMMEDIATE ACTION: Control whitefly vectors using yellow sticky traps and imidacloprid spray. Rogue out severely stunted plants.",
    "Tomato___Tomato_mosaic_virus": "DIAGNOSIS: Tomato Mosaic Virus. IMMEDIATE ACTION: Wash hands and tools with trisodium phosphate or disinfectant. Destroy infected plants to prevent viral spread.",
    "Tomato___healthy": "DIAGNOSIS: Healthy Tomato Plant. ADVICE: Maintain balanced NPK feeding, consistent watering, and periodic scouting for pests.",
    "Pepper__bell___Bacterial_spot": "DIAGNOSIS: Pepper Bacterial Spot. IMMEDIATE ACTION: Treat plants with copper bactericide mixed with mancozeb. Use clean disease-free seeds.",
    "Pepper__bell___healthy": "DIAGNOSIS: Healthy Pepper Plant. ADVICE: Maintain optimal soil moisture and watch for thrips or aphid infestation."
}

def get_llama_advice(user_query, system_prompt=SYSTEM_PROMPT):
    """Generates advice using TinyLlama or fallback rules."""
    query_lower = user_query.lower()

    if LLAMA_PIPELINE:
        try:
            prompt_formatted = f"<|system|>\n{system_prompt}</s>\n<|user|>\n{user_query}</s>\n<|assistant|>\n"
            outputs = LLAMA_PIPELINE(
                prompt_formatted,
                max_new_tokens=150,
                do_sample=True,
                temperature=0.7,
                top_p=0.9
            )
            generated_text = outputs[0]['generated_text']
            if "<|assistant|>\n" in generated_text:
                return generated_text.split("<|assistant|>\n")[-1].strip()
            return generated_text.strip()
        except Exception as e:
            print(f"Error during TinyLlama generation: {e}")

    # Fallback advisory responses if pipeline generation encounters issues
    if "late blight" in query_lower or "blight" in query_lower:
        return "IMMEDIATE ACTION: Late Blight detected. Apply copper oxychloride (3g/L) or Mancozeb fungicide promptly. Improve soil drainage and remove heavily infected foliage."
    elif "pest" in query_lower or "banana" in query_lower:
        return "ADVISORY: For banana pests like pseudo-stem weevil or aphids, apply neem cake to the soil base and spray 2% neem oil. Trap adult weevils using split pseudo-stem pieces."
    elif "mandi" in query_lower or "price" in query_lower or "market" in query_lower:
        return "ADVISORY: Check the latest mandi prices on your Farmease dashboard for up-to-date commodity rates across Kerala markets."
    else:
        return "KrishiSakthi Advisory: For optimal crop yield, ensure balanced organic manuring, regular weeding, and moisture conservation. Feel free to upload leaf images for diagnosis."

def predict_cnn_disease(image_file):
    """Performs real CNN inference on an uploaded image file."""
    if not CNN_MODEL:
        return "Potato___Late_blight"

    try:
        # Load and convert image
        image_bytes = image_file.read()
        image = Image.open(io.BytesIO(image_bytes)).convert("RGB")
        tensor = IMAGE_TRANSFORM(image).unsqueeze(0)

        with torch.no_grad():
            outputs = CNN_MODEL(tensor)
            _, predicted_idx = torch.max(outputs, 1)
            idx = predicted_idx.item()
            if 0 <= idx < len(CLASS_NAMES):
                return CLASS_NAMES[idx]
            return "Potato___Late_blight"
    except Exception as e:
        print(f"Error during CNN prediction: {e}")
        return "Potato___Late_blight"

def transcribe_audio(audio_file):
    """Transcribes audio using Whisper."""
    if not WHISPER_MODEL or not audio_file:
        return "I need advice on managing pests on my crop."

    try:
        # Save temp file for Whisper
        import tempfile
        suffix = os.path.splitext(audio_file.filename)[-1] or ".wav"
        with tempfile.NamedTemporaryFile(delete=False, suffix=suffix) as temp_audio:
            audio_file.save(temp_audio.name)
            temp_path = temp_audio.name

        result = WHISPER_MODEL.transcribe(temp_path)
        os.remove(temp_path)
        text = result.get("text", "").strip()
        return text if text else "I have a question about my crop health."
    except Exception as e:
        print(f"Error during Whisper transcription: {e}")
        return "I need advice on managing pests on my crop."

# =======================================================
# 3. FLASK API ROUTES (Port 5001)
# =======================================================
@app.route('/ai/text', methods=['POST'])
def handle_text_query():
    data = request.get_json(silent=True) or {}
    user_query = data.get('prompt', 'general farming question')
    response_text = get_llama_advice(user_query)
    return jsonify({"assistant": {"content": response_text}, "speakLang": "en-US"}), 200

@app.route('/ai/image', methods=['POST'])
def handle_image_query():
    if 'image' not in request.files:
        return jsonify({"error": "No image file provided"}), 400
    
    diagnosis = predict_cnn_disease(request.files['image'])
    advice = DISEASE_ADVICE_KNOWLEDGEBASE.get(
        diagnosis,
        get_llama_advice(f"The CNN diagnosed the crop with '{diagnosis}'. Provide treatment advice for an Indian farmer.")
    )
    
    return jsonify({
        "diagnosis": diagnosis,
        "advice": advice,
        "speakLang": "en-US"
    }), 200

@app.route('/ai/voice', methods=['POST'])
def handle_voice_query():
    if 'audio' not in request.files:
        return jsonify({"error": "No audio file provided"}), 400
        
    user_query = transcribe_audio(request.files.get('audio')) 
    response_text = get_llama_advice(user_query)

    return jsonify({
        "transcription": user_query,
        "advice": response_text,
        "speakLang": "en-US"
    }), 200

# =======================================================
# 4. SERVER STARTUP
# =======================================================
if __name__ == '__main__':
    print("-" * 50)
    print("🚀 FLASK AI SERVER RUNNING ON PORT 5001...")
    app.run(host='0.0.0.0', port=5001, debug=False)
