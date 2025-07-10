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
    <div className="w-[400px] min-h-[500px] bg-gray-900 text-gray-100 font-sans text-sm flex flex-col">
      {/* Header */}
      <div className="bg-gray-800 px-6 py-4 border-b border-gray-700">
        <h1 className="text-xl font-bold text-white">AI Website Assistant</h1>
        <p className="text-gray-400 text-xs mt-1">Powered by Gemini</p>
      </div>

      {/* Tab Navigation */}
      <div className="flex border-b border-gray-700 bg-gray-800">
        <button
          className={`flex-1 py-3 font-medium text-sm transition-colors duration-200 ${
            tab === "summarize"
              ? "text-blue-400 border-b-2 border-blue-400"
              : "text-gray-400 hover:text-gray-200"
          }`}
          onClick={() => setTab("summarize")}
        >
          <div className="flex items-center justify-center space-x-2">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-4 w-4"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
              />
            </svg>
            <span>Summarize</span>
          </div>
        </button>
        <button
          className={`flex-1 py-3 font-medium text-sm transition-colors duration-200 ${
            tab === "ask"
              ? "text-blue-400 border-b-2 border-blue-400"
              : "text-gray-400 hover:text-gray-200"
          }`}
          onClick={() => setTab("ask")}
        >
          <div className="flex items-center justify-center space-x-2">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-4 w-4"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M8.228 9c.549-1.165 2.03-2 3.772-2 2.21 0 4 1.343 4 3 0 1.4-1.278 2.575-3.006 2.907-.542.104-.994.54-.994 1.093m0 3h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
              />
            </svg>
            <span>Ask</span>
          </div>
        </button>
      </div>

      {/* Tab Content */}
      <div className="flex-1 overflow-auto p-6">
        {tab === "summarize" ? (
          <SummarizeTab apiKey={apiKey} />
        ) : (
          <AskTab apiKey={apiKey} />
        )}
      </div>

      {/* Footer */}
      <div className="bg-gray-800 px-6 py-3 text-xs text-gray-500 border-t border-gray-700">
        <div className="flex justify-between items-center">
          <span>v{chrome.runtime.getManifest().version}</span>
        </div>
      </div>
    </div>
  );
}
