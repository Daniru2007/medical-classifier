"use client";

import { useState } from "react";

export default function AddSymptomPage() {
  const [name, setName] = useState("");
  const [loading, setLoading] = useState(false);

  async function submit() {
    if (!name.trim()) return;

    setLoading(true);

    await fetch("/api/symptom", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ name }),
    });

    setName("");
    setLoading(false);
    alert("Symptom added");
  }

  return (
    <div>
      <h2>Add Symptom</h2>

      <input
        placeholder="Symptom name"
        value={name}
        onChange={e => setName(e.target.value)}
      />

      <br /><br />

      <button disabled={!name.trim() || loading} onClick={submit}>
        {loading ? "Adding..." : "Add Symptom"}
      </button>
    </div>
  );
}
