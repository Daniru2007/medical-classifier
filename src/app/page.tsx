"use client";

import { useState } from "react";

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

