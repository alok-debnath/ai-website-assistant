import { useState } from "react";
import { askGemini } from "../utils/gemini";
import Markdown from "react-markdown";

export const SummarizeTab = ({ apiKey }: { apiKey: string }) => {
  const [loading, setLoading] = useState(false);
  const [summary, setSummary] = useState("");

  const handleSummarize = async () => {
    setLoading(true);
    const [tab] = await chrome.tabs.query({
      active: true,
      currentWindow: true,
    });

    chrome.scripting.executeScript(
      {
        target: { tabId: tab.id! },
        func: () => document.body.innerText.slice(0, 8000), // limit text length
      },
      async (res) => {
        const pageText = res[0].result;
        const prompt = `Summarize this web page content (you can respond in markdown format and use bullets etc for better visual experience):\n${pageText}`;
        const result = await askGemini(prompt, apiKey);
        setSummary(result);
        setLoading(false);
      }
    );
  };

  return (
    <div className="space-y-3">
      <button
        className="w-full px-4 py-2.5 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-lg transition-colors duration-200 flex items-center justify-center space-x-2 disabled:opacity-60 disabled:cursor-not-allowed"
        onClick={handleSummarize}
        disabled={loading}
      >
        {loading ? (
          <>
            <svg
              className="animate-spin -ml-1 mr-2 h-4 w-4 text-white"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
            >
              <circle
                className="opacity-25"
                cx="12"
                cy="12"
                r="10"
                stroke="currentColor"
                strokeWidth="4"
              ></circle>
              <path
                className="opacity-75"
                fill="currentColor"
                d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
              ></path>
            </svg>
            <span>Summarizing...</span>
          </>
        ) : (
          <>
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
            <span>Summarize Current Page</span>
          </>
        )}
      </button>
      <div className="output-section max-w-none">
        {summary && (
          <div>
            <Markdown>{summary}</Markdown>
          </div>
        )}
      </div>
    </div>
  );
};
