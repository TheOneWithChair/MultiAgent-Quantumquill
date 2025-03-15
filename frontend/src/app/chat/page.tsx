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
      const response = await fetch('http://localhost:3001/api/test');
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
      const response = await fetch('http://localhost:3001/api/task', {
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
    <div className="min-h-screen bg-gray-900 text-white p-8">
      <div className="max-w-6xl mx-auto">
        {/* Back Button */}
        <button
          onClick={handleBack}
          className="flex items-center gap-2 text-violet-400 hover:text-violet-300 transition-colors mb-6"
        >
          <IoArrowBack className="text-xl" />
          <span>Back to Home</span>
        </button>

        <h1 className="text-4xl font-bold mb-8 text-center bg-gradient-to-r from-violet-400 to-fuchsia-400 bg-clip-text text-transparent">
          AI Assistant Dashboard
        </h1>

        {/* Error Message */}
        {error && (
          <div className="mb-8 p-4 bg-red-500/10 border border-red-500 rounded-lg text-red-400">
            <p>{error}</p>
          </div>
        )}

        {/* Task Selection */}
        <div className="mb-8">
          <h2 className="text-2xl mb-4">Select Task</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {tasks.map((task) => (
              <button
                key={task}
                onClick={() => setSelectedTask(task)}
                className={`p-4 rounded-lg border transition-all ${
                  selectedTask === task
                    ? "border-violet-400 bg-violet-400/20"
                    : "border-gray-700 hover:border-violet-400/50"
                }`}
              >
                {task}
              </button>
            ))}
          </div>
        </div>

        {/* Input Area */}
        {selectedTask && (
          <div className="mb-8">
            <h2 className="text-2xl mb-4">
              {selectedTask === "Summarize Medical Text"
                ? "Enter medical text to summarize"
                : selectedTask === "Write and Refine Research Article"
                ? "Enter topic and outline"
                : "Enter medical data to sanitize"}
            </h2>
            <textarea
              value={inputText}
              onChange={(e) => setInputText(e.target.value)}
              className="w-full h-48 p-4 rounded-lg bg-gray-800 border border-gray-700 focus:border-violet-400 focus:outline-none"
              placeholder="Enter your text here..."
            />
            <Button
              variant="secondary"
              className="mt-4"
              onClick={handleTaskSubmit}
              disabled={isLoading}
            >
              {isLoading ? "Processing..." : "Submit"}
            </Button>
          </div>
        )}

        {/* Results Area */}
        {isLoading && (
          <div className="text-center py-8">
            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-violet-400 mx-auto mb-4"></div>
            <p className="text-violet-400">Processing your request...</p>
          </div>
        )}

        {results && (
          <div className="mt-8">
            <h2 className="text-2xl mb-6">Results</h2>
            
            {/* Main Result */}
            <ResultSection 
              title={
                selectedTask === "Summarize Medical Text" ? "Initial Summary" :
                selectedTask === "Write and Refine Research Article" ? "Initial Draft" :
                "Initial Sanitized Data"
              } 
              content={results.mainResult} 
            />

            {/* Refinement Result */}
            <ResultSection 
              title={
                selectedTask === "Summarize Medical Text" ? "Refined Summary" :
                selectedTask === "Write and Refine Research Article" ? "Refined Article" :
                "Refined Sanitized Data"
              } 
              content={results.refinementResult} 
            />

            {/* Validation Result */}
            <ResultSection 
              title={
                selectedTask === "Summarize Medical Text" ? "Summary Validation" :
                selectedTask === "Write and Refine Research Article" ? "Peer Review" :
                "HIPAA Compliance Check"
              } 
              content={results.validationResult} 
            />
          </div>
        )}
      </div>
    </div>
  );
};

export default ChatPage; 