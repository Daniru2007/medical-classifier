"use client";

import { useState } from "react";


type Specialist = {
  id: string;
  name: string;
  diseases: string[];
  symptoms: string[];
};

const SPECIALISTS: Specialist[] = [
  {
    id: "cardiologist",
    name: "Cardiologist",
    diseases: ["angina", "heart_attack", "arrhythmia"],
    symptoms: [
      "chest_pain",
      "shortness_of_breath",
      "palpitations",
      "dizziness"
    ]
  },
  {
    id: "chest_physician",
    name: "Chest Physician",
    diseases: ["asthma", "copd", "pneumonia"],
    symptoms: [
      "shortness_of_breath",
      "cough",
      "wheezing",
      "chest_tightness"
    ]
  },
  {
    id: "gastroenterologist",
    name: "Gastroenterologist",
    diseases: ["acid_reflux", "gastritis"],
    symptoms: [
      "heartburn",
      "chest_pain",
      "nausea",
      "abdominal_pain"
    ]
  }
];


const SYMPTOMS = [
  { id: "chest_pain", label: "Chest Pain" },
  { id: "shortness_of_breath", label: "Shortness of Breath" },
  { id: "fever", label: "Fever" },
  { id: "back_pain", label: "Back Pain" },
  { id: "headache", label: "Headache" },
];

export default function SymptomSelector() {
  const [query, setQuery] = useState("");
  const [selected, setSelected] = useState<typeof SYMPTOMS>([]);

  const filtered = SYMPTOMS.filter(
    s =>
      s.label.toLowerCase().includes(query.toLowerCase()) &&
      !selected.some(sel => sel.id === s.id)
  );


  const specialists = SPECIALISTS
    .map(specialist => {
      const matchCount = specialist.symptoms.filter(symptom =>
        selected.map(s=>s.id).includes(symptom)
      ).length;

      return {
        id: specialist.id,
        name: specialist.name,
        score: matchCount
      };
    })
    .filter(s => s.score > 0)
    .sort((a, b) => b.score - a.score);


  function add(symptom: (typeof SYMPTOMS)[0]) {
    setSelected(prev => [...prev, symptom]);
    setQuery("");
  }

  function remove(id: string) {
    setSelected(prev => prev.filter(s => s.id !== id));
  }

  return (
    <div>
      {/* Selected items */}
      <div>
        {specialists.map(s => (
          <div key={s.id}>
            {s.name}{" "}{s.score}
          </div>
        ))}
      </div>
      <div>
        {selected.map(s => (
          <span key={s.id}>
            {s.label}{" "}
            <button onClick={() => remove(s.id)}>x</button>{" "}
          </span>
        ))}
      </div>

      {/* Search input */}
      <input
        type="text"
        placeholder="Search symptoms"
        value={query}
        onChange={e => setQuery(e.target.value)}
      />

      {/* Options */}
      <ul>
        {filtered.map(s => (
          <li key={s.id}>
            <button onClick={() => add(s)}>
              {s.label}
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}

