"use client";
import { useState, useRef } from "react";
import Button from "@/components/Button";
import { useRouter } from "next/navigation";
import { IoArrowBack } from "react-icons/io5";
import { motion } from "framer-motion";

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
  const sectionRef = useRef<HTMLDivElement>(null);

  const handleBack = () => {
    router.push("/");
  };

  const handleTaskSubmit = async () => {
    if (!selectedTask || !inputText) return;

    setIsLoading(true);
    setResults(null);
    setError(null);

    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/task`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ task: selectedTask, text: inputText }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || `HTTP error! status: ${response.status}`);
      }

      const data = await response.json();
      setResults(data);
    } catch (error) {
      setError(error instanceof Error ? error.message : "An unexpected error occurred");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="relative min-h-screen bg-gray-950 text-white overflow-hidden">
      {/* Background Circles with improved visibility */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        {/* Large Circle */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full max-w-4xl aspect-square bg-violet-500 rounded-full blur-3xl opacity-20" />
        
        {/* Medium Circle */}
        <div className="absolute top-1/4 left-1/3 -translate-x-1/2 -translate-y-1/2 w-full max-w-2xl aspect-square bg-fuchsia-500 rounded-full blur-3xl opacity-25" />
        
        {/* Small Circle */}
        <div className="absolute bottom-1/4 right-1/3 -translate-x-1/2 -translate-y-1/2 w-full max-w-xl aspect-square bg-indigo-500 rounded-full blur-3xl opacity-30" />
      </div>

      <div className="relative z-10 container mx-auto px-4 py-8">
        <div className="max-w-4xl mx-auto">
          {/* Back Button */}
          <div className="flex items-center gap-4 mb-8">
            <motion.button
              onClick={handleBack}
              className="flex items-center gap-2 text-violet-400 hover:text-violet-300 transition-colors px-4 py-2 rounded-lg hover:bg-violet-500/10"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <IoArrowBack className="w-5 h-5" />
              <span>Back to Home</span>
            </motion.button>
          </div>

          {/* Chat Input Section */}
          <motion.div
            ref={sectionRef}
            className="bg-gray-900/70 backdrop-blur-xl border border-violet-500/30 rounded-2xl p-8 shadow-2xl relative overflow-hidden"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            {/* Decorative Elements */}
            <div className="absolute top-0 right-0 w-64 h-64 bg-violet-600/10 rounded-full blur-3xl -mr-32 -mt-32" />
            <div className="absolute bottom-0 left-0 w-64 h-64 bg-fuchsia-600/10 rounded-full blur-3xl -ml-32 -mb-32" />
            
            <motion.h1 
              className="text-4xl font-bold bg-gradient-to-r from-violet-400 to-fuchsia-400 bg-clip-text text-transparent mb-8 text-center"
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
            >
              Research Analysis
            </motion.h1>

            <div className="space-y-8 relative z-10">
              {/* Task Selection */}
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.3 }}
              >
                <label className="block text-sm font-medium text-violet-300 mb-3 ml-1">Select Task</label>
                <div className="relative">
                  <select
                    value={selectedTask ?? ""}
                    onChange={(e) => setSelectedTask(e.target.value as Task)}
                    className="w-full bg-gray-800/70 border-2 border-violet-500/30 rounded-xl px-5 py-3 text-white focus:outline-none focus:border-violet-500 transition-all shadow-md appearance-none"
                  >
                    <option value="">Choose a task...</option>
                    <option value="Summarize Medical Text">Summarize Text</option>
                    <option value="Write and Refine Research Article">Write and Refine Research Article</option>
                    <option value="Sanitize Medical Data (PHI)">Sanitize Data (PHI)</option>
                  </select>
                  <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
                    <svg className="w-5 h-5 text-violet-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"></path>
                    </svg>
                  </div>
                </div>
              </motion.div>

              {/* Input Text Area */}
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.4 }}
              >
                <label className="block text-sm font-medium text-violet-300 mb-3 ml-1">Input Text</label>
                <textarea
                  value={inputText}
                  onChange={(e) => setInputText(e.target.value)}
                  placeholder="Enter your text here..."
                  className="w-full h-48 bg-gray-800/70 border-2 border-violet-500/30 rounded-xl px-5 py-4 text-white focus:outline-none focus:border-violet-500 transition-all shadow-md resize-none"
                />
              </motion.div>

              {/* Analyze Button */}
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.5 }}
              >
                <Button
                  variant="secondary"
                  onClick={handleTaskSubmit}
                  disabled={!selectedTask || !inputText || isLoading}
                  className={`w-full py-3 rounded-xl text-lg font-medium transition-all ${
                    !selectedTask || !inputText || isLoading
                      ? "bg-gray-700 text-gray-400 cursor-not-allowed"
                      : "bg-gradient-to-r from-violet-600 to-fuchsia-600 hover:from-violet-500 hover:to-fuchsia-500 text-white shadow-lg hover:shadow-violet-500/20"
                  }`}
                >
                  {isLoading ? (
                    <div className="flex items-center justify-center gap-2">
                      <svg className="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                      </svg>
                      <span>Processing...</span>
                    </div>
                  ) : (
                    "Analyze"
                  )}
                </Button>
              </motion.div>
            </div>

            {/* Error Message */}
            {error && (
              <motion.div
                className="mt-8 p-4 bg-red-900/50 border border-red-500/50 rounded-xl text-red-200 shadow-lg"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
              >
                <div className="flex items-start gap-3">
                  <svg className="w-6 h-6 text-red-400 mt-0.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                  </svg>
                  <div>
                    <h3 className="font-medium text-red-300 mb-1">Analysis Error</h3>
                    <p>{error}</p>
                  </div>
                </div>
              </motion.div>
            )}

            {/* Display Analysis Results */}
            {results && (
              <motion.div
                className="mt-10 space-y-6"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.8, delay: 0.2 }}
              >
                <div className="p-6 bg-gray-800/30 backdrop-blur-sm border border-violet-500/30 rounded-xl shadow-lg">
                  <h3 className="text-xl font-medium bg-gradient-to-r from-violet-400 to-fuchsia-400 bg-clip-text text-transparent mb-4">Analysis Results</h3>
                  <p className="text-gray-300 whitespace-pre-wrap leading-relaxed">{results.mainResult}</p>
                </div>

                {results.validationResult && (
                  <div className="p-6 bg-gray-800/30 backdrop-blur-sm border border-violet-500/30 rounded-xl shadow-lg">
                    <h3 className="text-xl font-medium bg-gradient-to-r from-violet-400 to-fuchsia-400 bg-clip-text text-transparent mb-4">Validation Results</h3>
                    <p className="text-gray-300 whitespace-pre-wrap leading-relaxed">{results.validationResult}</p>
                  </div>
                )}

                {results.refinementResult && (
                  <div className="p-6 bg-gray-800/30 backdrop-blur-sm border border-violet-500/30 rounded-xl shadow-lg">
                    <h3 className="text-xl font-medium bg-gradient-to-r from-violet-400 to-fuchsia-400 bg-clip-text text-transparent mb-4">Refined Results</h3>
                    <p className="text-gray-300 whitespace-pre-wrap leading-relaxed">{results.refinementResult}</p>
                  </div>
                )}
              </motion.div>
            )}
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default ChatPage;