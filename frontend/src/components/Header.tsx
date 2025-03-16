"use client";
import { useRouter } from 'next/navigation';
import Button from './Button';

const Header = () => {
  const router = useRouter();

  const handleGetStarted = () => {
    router.push('/chat');
  };

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-gray-900/80 backdrop-blur-md border-b border-gray-800">
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-8">
            <h1 className="text-2xl font-bold bg-gradient-to-r from-violet-400 to-fuchsia-400 bg-clip-text text-transparent">
              QuantumQuill
            </h1>
            <nav className="hidden md:flex items-center gap-6">
              <a href="#features" className="text-gray-300 hover:text-white transition-colors">Features</a>
              <a href="#how-it-works" className="text-gray-300 hover:text-white transition-colors">How it Works</a>
              <a href="#pricing" className="text-gray-300 hover:text-white transition-colors">Pricing</a>
              <a href="#testimonials" className="text-gray-300 hover:text-white transition-colors">Testimonials</a>
            </nav>
          </div>
          <div className="flex items-center gap-4">
            <Button 
              variant="secondary"
              onClick={handleGetStarted}
            >
              Get Started
            </Button>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header; 