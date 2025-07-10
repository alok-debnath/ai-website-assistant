import { useState } from "react";
import { askGemini } from "../utils/gemini";
import Markdown from "react-markdown";

export const AskTab = ({ apiKey }: { apiKey: string }) => {
  const [question, setQuestion] = useState("");
  const [answer, setAnswer] = useState("");
  const [loading, setLoading] = useState(false);

  const handleAsk = async () => {
    setLoading(true);
    const [tab] = await chrome.tabs.query({
      active: true,
      currentWindow: true,
    });

    chrome.scripting.executeScript(
      {
        target: { tabId: tab.id! },
        func: () => document.body.innerText.slice(0, 8000),
      },
      async (res) => {
        const pageText = res[0].result;
        const prompt = `Here is the webpage content:\n${pageText}\n\nAnswer this question: ${question}`;
        const result = await askGemini(prompt, apiKey);
        setAnswer(result);
        setLoading(false);
      }
    );
  };

  return (
    <div className="space-y-3">
      <textarea
        className="w-full p-2 border rounded"
        placeholder="Ask a question about this page"
        value={question}
        onChange={(e) => setQuestion(e.target.value)}
      />
      <button
        className="bg-green-500 text-white px-4 py-2 rounded w-full"
        onClick={handleAsk}
        disabled={loading}
      >
        {loading ? "Asking..." : "Ask Gemini"}
      </button>
      <div className="prose max-w-none">
        {answer && (
          <div>
            <Markdown>{answer}</Markdown>
          </div>
        )}
      </div>
    </div>
  );
};
