"use client";

import { useEffect, useState } from "react";

type Category = {
  id: string;
  name: string;
  symptomCount: number;
};

export default function AddSpecialistPage() {
  const [name, setName] = useState("");
  const [categories, setCategories] = useState<Category[]>([]);
  const [search, setSearch] = useState("");
  const [selected, setSelected] = useState<Category[]>([]);

  useEffect(() => {
    fetch("/api/discat")
      .then(res => res.json())
      .then(setCategories);
  }, []);

  const filtered = categories.filter(
    c =>
      c.name.toLowerCase().includes(search.toLowerCase()) &&
      !selected.some(s => s.id === c.id)
  );

  const addCategory = (cat: Category) => {
    setSelected(prev => [...prev, cat]);
  };

  const removeCategory = (id: string) => {
    setSelected(prev => prev.filter(c => c.id !== id));
  };

  const totalSymptomsCovered = selected.reduce(
    (sum, c) => sum + c.symptomCount,
    0
  );

  const canSubmit = name.trim().length > 0 && selected.length > 0;

  const submit = async () => {
    await fetch("/api/specialist", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        name,
        categoryIds: selected.map(s => s.id),
      }),
    });

    alert("Specialist added");
    setName("");
    setSelected([]);
    setSearch("");
  };

  return (
    <div>
      <h2>Add Specialist</h2>

      <input
        placeholder="Specialist name"
        value={name}
        onChange={e => setName(e.target.value)}
      />

      <br /><br />

      <input
        placeholder="Search disease categories"
        value={search}
        onChange={e => setSearch(e.target.value)}
      />

      <ul>
        {filtered.map(cat => (
          <li key={cat.id}>
            <button onClick={() => addCategory(cat)}>
              {cat.name} ({cat.symptomCount} symptoms)
            </button>
          </li>
        ))}
      </ul>

      <h4>Selected Categories</h4>
      <ul>
        {selected.map(cat => (
          <li key={cat.id}>
            {cat.name} ({cat.symptomCount})
            <button onClick={() => removeCategory(cat.id)}>x</button>
          </li>
        ))}
      </ul>

      <div>
        <strong>Total symptom coverage:</strong> {totalSymptomsCovered}
      </div>

      {!canSubmit && (
        <p>Please enter a name and select at least one category.</p>
      )}

      <button disabled={!canSubmit} onClick={submit}>
        Save Specialist
      </button>
    </div>
  );
}
