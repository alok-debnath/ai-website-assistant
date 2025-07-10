import { useEffect, useState } from "react";
import { ApiKeyPrompt } from "./ApiKeyPrompt";
import { SummarizeTab } from "./SummarizeTab";
import { AskTab } from "./AskTab";

export default function Popup() {
  const [apiKey, setApiKey] = useState("");
  const [loaded, setLoaded] = useState(false);
  const [tab, setTab] = useState<"summarize" | "ask">("summarize");

  useEffect(() => {
    chrome.storage.local.get("geminiKey", (res) => {
      if (res.geminiKey) setApiKey(res.geminiKey);
      setLoaded(true);
    });
  }, []);

  if (!loaded) return null;
  if (!apiKey)
    return (
      <ApiKeyPrompt
        onSave={(key) => {
          chrome.storage.local.set({ geminiKey: key });
          setApiKey(key);
        }}
      />
    );

  return (
    <div className="w-[360px] p-4 font-sans text-sm space-y-3">
      <div className="flex justify-center space-x-2">
        <button
          className={`px-3 py-1 rounded ${
            tab === "summarize" ? "bg-blue-500 text-white" : "bg-gray-100"
          }`}
          onClick={() => setTab("summarize")}
        >
          Summarize
        </button>
        <button
          className={`px-3 py-1 rounded ${
            tab === "ask" ? "bg-blue-500 text-white" : "bg-gray-100"
          }`}
          onClick={() => setTab("ask")}
        >
          Ask
        </button>
      </div>

      {tab === "summarize" ? (
        <SummarizeTab apiKey={apiKey} />
      ) : (
        <AskTab apiKey={apiKey} />
      )}
    </div>
  );
}
