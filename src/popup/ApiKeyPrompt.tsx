import { useState } from "react";

export const ApiKeyPrompt = ({ onSave }: { onSave: (key: string) => void }) => {
  const [key, setKey] = useState("");

  const handleSave = () => {
    if (!key.trim()) return;
    onSave(key);
  };

  return (
    <div className="w-[400px] min-h-[500px] bg-gray-900 text-gray-100 p-6 flex flex-col">
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-white mb-2">
          Welcome to AI Website Assistant
        </h1>
        <p className="text-gray-400 text-sm">
          Get started by entering your Gemini API key
        </p>
      </div>

      <div className="bg-gray-800 p-5 rounded-lg border border-gray-700 mb-6">
        <h2 className="font-semibold text-white mb-3 flex items-center">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-5 w-5 text-blue-400 mr-2"
            viewBox="0 0 20 20"
            fill="currentColor"
          >
            <path
              fillRule="evenodd"
              d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h2a1 1 0 100-2v-3a1 1 0 00-1-1H9z"
              clipRule="evenodd"
            />
          </svg>
          API Key Required
        </h2>
        <p className="text-sm text-gray-300 mb-4">
          To use this extension, you need to provide your Gemini API key. Your
          key is stored locally in your browser and is only used to make
          requests to the Gemini API.
        </p>

        <div className="space-y-3">
          <div>
            <label
              htmlFor="api-key"
              className="block text-sm font-medium text-gray-300 mb-1"
            >
              Gemini API Key
            </label>
            <input
              id="api-key"
              type="password"
              className="w-full px-4 py-2.5 bg-gray-700 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors duration-200"
              placeholder="Paste your Gemini API Key here"
              value={key}
              onChange={(e) => setKey(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && handleSave()}
              autoComplete="off"
              autoFocus
            />
          </div>

          <button
            onClick={handleSave}
            className="w-full px-4 py-2.5 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-lg transition-colors duration-200 flex items-center justify-center space-x-2"
          >
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
                d="M5 13l4 4L19 7"
              />
            </svg>
            <span>Save API Key</span>
          </button>
        </div>
      </div>

      <div className="mt-auto text-xs text-gray-500 space-y-2">
        <p>Don't have an API key? Get one from:</p>
        <a
          href="https://aistudio.google.com/app/apikey"
          target="_blank"
          rel="noopener noreferrer"
          className="text-blue-400 hover:text-blue-300 transition-colors flex items-center"
        >
          <span>Google AI Studio</span>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-3 w-3 ml-1"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"
            />
          </svg>
        </a>
        <p className="text-gray-500 text-xs mt-2">
          Your API key is stored locally and only sent to Google's servers.
        </p>
      </div>
    </div>
  );
};
