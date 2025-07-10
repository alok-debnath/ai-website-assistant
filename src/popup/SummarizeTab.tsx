import { useState } from "react";
import { askGemini } from "../utils/gemini";
import Markdown from 'react-markdown'

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
        className="bg-blue-500 text-white px-4 py-2 rounded w-full"
        onClick={handleSummarize}
        disabled={loading}
      >
        {loading ? "Summarizing..." : "Summarize Current Page"}
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
