import { useState } from "react";

export const ApiKeyPrompt = ({ onSave }: { onSave: (key: string) => void }) => {
  const [key, setKey] = useState("");

  return (
    <div className="w-[360px] p-4 font-sans text-sm">
      <h1 className="font-bold text-lg mb-2">Enter Gemini API Key</h1>
      <input
        className="border p-2 w-full rounded mb-3"
        placeholder="Paste your Gemini API Key"
        value={key}
        onChange={(e) => setKey(e.target.value)}
      />
      <button
        onClick={() => onSave(key)}
        className="bg-blue-500 text-white px-4 py-2 rounded w-full"
      >
        Save Key
      </button>
    </div>
  );
};
