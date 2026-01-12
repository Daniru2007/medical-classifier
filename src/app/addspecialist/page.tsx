"use client";

import { useEffect, useState } from "react";

type Category = {
  id: string;
  name: string;
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

  const filtered = categories.filter(c =>
    c.name.toLowerCase().includes(search.toLowerCase())
  );

  const addCategory = (cat: Category) => {
    if (!selected.find(s => s.id === cat.id)) {
      setSelected([...selected, cat]);
    }
  };

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
              {cat.name}
            </button>
          </li>
        ))}
      </ul>

      <h4>Selected Categories</h4>
      <ul>
        {selected.map(cat => (
          <li key={cat.id}>{cat.name}</li>
        ))}
      </ul>

      <button onClick={submit}>Save Specialist</button>
    </div>
  );
}
