from transformers import AutoTokenizer, AutoModel
import torch
import torch.nn.functional as F

tokenizer = AutoTokenizer.from_pretrained("biobert")
model = AutoModel.from_pretrained("biobert")

def get_embedding(text):
    inputs = tokenizer(text, return_tensors="pt")
    outputs = model(**inputs)
    # Use [CLS] token embedding
    return outputs.last_hidden_state[:,0,:]

# Example
patient_text = "My chest doesnot feel tight and I can't breathe"
symptom_dict = ["chest pain", "shortness of breath"]

patient_emb = get_embedding(patient_text)
for symptom in symptom_dict:
    symptom_emb = get_embedding(symptom)
    sim = F.cosine_similarity(patient_emb, symptom_emb)
    print(symptom, sim.item())

import medspacy

# Load full medSpaCy pipeline
nlp = medspacy.load()

text = "I do not have chest pain but I feel shortness of breath"
doc = nlp(text)

# Assuming you already have symptom entities:
for ent in doc.ents:
    print(ent.text, getattr(ent._, "is_negated", False))

