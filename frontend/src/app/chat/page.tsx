"use client";
import { useState, useEffect } from "react";
import Button from "@/components/Button";
import { useRouter } from "next/navigation";
import { IoArrowBack } from "react-icons/io5";

type Task = "Summarize Medical Text" | "Write and Refine Research Article" | "Sanitize Medical Data (PHI)";

interface Results {
  mainResult: string;
  validationResult: string;
  refinementResult?: string;
}

const ChatPage = () => {
  const router = useRouter();
  const [selectedTask, setSelectedTask] = useState<Task | null>(null);
  const [inputText, setInputText] = useState("");
  const [results, setResults] = useState<Results | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const tasks: Task[] = [
    "Summarize Medical Text",
    "Write and Refine Research Article",
    "Sanitize Medical Data (PHI)",
  ];

  // Test API connection on page load
  useEffect(() => {
    testApiConnection();
  }, []);

  const testApiConnection = async () => {
    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/test`);
      if (!response.ok) {
        const data = await response.json();
        throw new Error(data.error || 'Failed to connect to API');
      }
      setError(null);
    } catch (error) {
      setError('Failed to connect to the AI service. Please try again later.');
      console.error('API Connection Error:', error);
    }
  };

  const handleTaskSubmit = async () => {
    if (!selectedTask || !inputText) return;

    setIsLoading(true);
    setResults(null);
    setError(null);
    
    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/task`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          task: selectedTask,
          text: inputText,
        }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || `HTTP error! status: ${response.status}`);
      }

      const data = await response.json();
      setResults(data);
    } catch (error) {
      console.error('Error:', error);
      setError(error instanceof Error ? error.message : 'An unexpected error occurred');
      setResults(null);
    } finally {
      setIsLoading(false);
    }
  };

  const handleBack = () => {
    router.push('/');
  };

  const ResultSection = ({ title, content }: { title: string; content: string }) => (
    <div className="mb-8 last:mb-0">
      <h3 className="text-xl font-semibold mb-3 text-violet-400">{title}</h3>
      <div className="rounded-lg border border-gray-700 p-6 bg-gray-800/50 backdrop-blur-sm">
        <div className="prose prose-invert max-w-none">
          <div className="whitespace-pre-wrap">{content}</div>
        </div>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-gray-950 text-white relative overflow-hidden">
      <div className="absolute inset-0 -z-10 bg-[radial-gradient(circle_farthest-corner,var(--color-violet-900)_0%,var(--color-gray-950)_100%)] opacity-40" />
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-4xl mx-auto">
          <div className="flex items-center gap-4 mb-8">
            <button
              onClick={handleBack}
              className="flex items-center gap-2 text-violet-400 hover:text-violet-300 transition-colors"
            >
              <IoArrowBack className="w-5 h-5" />
              <span>Back to Home</span>
            </button>
          </div>
          
          <div className="bg-gray-900/50 backdrop-blur-xl border border-violet-500/20 rounded-xl p-6 shadow-xl">
            <h1 className="text-3xl font-bold text-violet-400 mb-6">Research Analysis</h1>
            
            <div className="space-y-6">
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">Select Task</label>
                <select
                  value={selectedTask ?? ""}
                  onChange={(e) => setSelectedTask(e.target.value as Task)}
                  className="w-full bg-gray-800 border border-violet-500/20 rounded-lg px-4 py-2 text-white focus:outline-none focus:border-violet-500"
                >
                  <option value="">Choose a task...</option>
                  <option value="Summarize Medical Text">Summarize Medical Text</option>
                  <option value="Write and Refine Research Article">Write Research Article</option>
                  <option value="Sanitize Medical Data (PHI)">Sanitize Medical Data (PHI)</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">Input Text</label>
                <textarea
                  value={inputText}
                  onChange={(e) => setInputText(e.target.value)}
                  placeholder="Enter your text here..."
                  className="w-full h-40 bg-gray-800 border border-violet-500/20 rounded-lg px-4 py-2 text-white focus:outline-none focus:border-violet-500"
                />
              </div>

              <button
                onClick={handleTaskSubmit}
                disabled={!selectedTask || !inputText || isLoading}
                className="w-full bg-violet-600 hover:bg-violet-700 disabled:bg-violet-900 disabled:cursor-not-allowed text-white font-medium py-2 px-4 rounded-lg transition-colors"
              >
                {isLoading ? 'Processing...' : 'Analyze'}
              </button>
            </div>

            {error && (
              <div className="mt-6 p-4 bg-red-900/50 border border-red-500/50 rounded-lg text-red-200">
                {error}
              </div>
            )}

            {results && (
              <div className="mt-8 space-y-6">
                <div className="p-4 bg-gray-800/50 border border-violet-500/20 rounded-lg">
                  <h3 className="text-lg font-medium text-violet-400 mb-2">Analysis Results</h3>
                  <p className="text-gray-300 whitespace-pre-wrap">{results.mainResult}</p>
                </div>

                {results.validationResult && (
                  <div className="p-4 bg-gray-800/50 border border-violet-500/20 rounded-lg">
                    <h3 className="text-lg font-medium text-violet-400 mb-2">Validation Results</h3>
                    <p className="text-gray-300 whitespace-pre-wrap">{results.validationResult}</p>
                  </div>
                )}

                {results.refinementResult && (
                  <div className="p-4 bg-gray-800/50 border border-violet-500/20 rounded-lg">
                    <h3 className="text-lg font-medium text-violet-400 mb-2">Refined Results</h3>
                    <p className="text-gray-300 whitespace-pre-wrap">{results.refinementResult}</p>
                  </div>
                )}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ChatPage; 