
# # from transformers import AutoModelForSeq2SeqLM, AutoTokenizer

# # # --- Use the flan-t5 model ---
# # model_name = "google/flan-t5-large"

# # # Load the tokenizer and the correct model class for T5 models
# # tokenizer = AutoTokenizer.from_pretrained(model_name)
# # model = AutoModelForSeq2SeqLM.from_pretrained(model_name)

# # print("Advanced Chatbot is ready! Type 'exit' to end the conversation.")

# # # --- Chat Loop ---
# # while True:
# #     user_input = input(">> You: ")

# #     if user_input.lower() == 'exit':
# #         print("Chatbot: Goodbye!")
# #         break

# #     # 1. Tokenize the input
# #     inputs = tokenizer(user_input, return_tensors="pt")

# #     # 2. Generate a response from the model
# #     outputs = model.generate(**inputs, max_length=200)

# #     # 3. Decode the response and print it
# #     response = tokenizer.batch_decode(outputs, skip_special_tokens=True)[0]
# #     print(f"Chatbot: {response}")



# import torch
# from transformers import AutoTokenizer, AutoModelForCausalLM, pipeline

# # --- Load the Llama 3.1 8B Instruct Model ---
# model_name = "meta-llama/Meta-Llama-3.1-8B-Instruct"

# # Load the tokenizer
# tokenizer = AutoTokenizer.from_pretrained(model_name)

# # Load the model in 4-bit to save memory (requires bitsandbytes)
# model = AutoModelForCausalLM.from_pretrained(
#     model_name,
#     torch_dtype=torch.float16,
#     device_map="auto", # Automatically use your GPU
#     load_in_4bit=True,
# )

# # --- Create a Text Generation Pipeline ---
# text_generator = pipeline(
#     "text-generation",
#     model=model,
#     tokenizer=tokenizer,
#     max_new_tokens=256 # Limit the length of the response
# )

# print("Llama 3.1 Chatbot is ready! Type 'exit' to end.")

# # --- Chat Loop ---
# while True:
#     user_input = input(">> You: ")

#     if user_input.lower() == 'exit':
#         print("Chatbot: Goodbye!")
#         break
        
#     # The pipeline requires a specific input format
#     # We create a message list for proper conversation turns
#     messages = [
#         {"role": "user", "content": user_input},
#     ]

#     # Generate a response
#     prompt = text_generator.tokenizer.apply_chat_template(messages, tokenize=False, add_generation_prompt=True)
#     outputs = text_generator(prompt)
    
#     # Print the response
#     response = outputs[0]['generated_text'].split("<|start_header_id|>assistant<|end_header_id|>\n\n")[1].strip()
#     print(f"Chatbot: {response}")

import os
from google import genai 
from google.genai import types

# Initialize the Gemini Client (It reads GEMINI_API_KEY from .env)
client = genai.Client()

def generate_gemini_response(prompt_parts):
    # This function handles the API call for text or multimodal input
    response = client.generate_content(
        model="gemini-1.5-flash", 
        contents=prompt_parts, 
        config=types.GenerateContentConfig(
            system_instruction="You are KrishiSakthi, a kind, expert agronomist from Kerala. Provide simple, actionable advice."
        )
    )
    return response.text