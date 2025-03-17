"use client";
import robotImg from "@/assets/images/robot.jpg";
import underlineImg from "@/assets/images/underline.svg?url";
import Loader from "@/assets/images/loader-animated.svg";
import Button from "@/components/Button";
import Image from "next/image";
import CenteredCircle from "@/components/CenteredCircle";
import Planet from "@/components/Planet";
import SectionBorder from "@/components/SectionBorder";
import SectionContent from "@/components/SectionContent";
import {
  motion,
  useMotionValue,
  useScroll,
  useSpring,
  useTransform,
} from "framer-motion";
import { useEffect, useRef, useState } from "react";
import { useRouter } from "next/navigation";
// Removed unused Header import

export const useMousePosition = () => {
  const [innerWidth, setInnerWidth] = useState(1);
  const [innerHeight, setInnerHeight] = useState(1);
  const clientX = useMotionValue(0);
  const clientY = useMotionValue(0);
  const xProgress = useTransform(clientX, [0, innerWidth], [0, 1]);
  const yProgress = useTransform(clientY, [0, innerHeight], [0, 1]);

  useEffect(() => {
    setInnerWidth(window.innerWidth);
    setInnerHeight(window.innerHeight);
    window.addEventListener("resize", () => {
      setInnerWidth(window.innerWidth);
      setInnerHeight(window.innerHeight);
    });
  }, []);

  useEffect(() => {
    window.addEventListener("mousemove", (e) => {
      clientX.set(e.clientX);
      clientY.set(e.clientY);
    });
  }, [clientX, clientY]);
  return { xProgress, yProgress };
};

export const navItems = [
  {
    name: "Features",
    href: "#features",
  },
  {
    name: "How it Works",
    href: "#how-it-works",
  }
];

const Hero = () => {
  const router = useRouter();
  const { xProgress, yProgress } = useMousePosition();
  const sectionRef = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"],
  });
  const TransformedY = useTransform(scrollYProgress, [0, 1], [-200, 200]);
  const springX = useSpring(xProgress);
  const springY = useSpring(yProgress);
  const TranslateLargeX = useTransform(springX, [0, 1], ["-25%", "25%"]);
  const TranslateLargeY = useTransform(springY, [0, 1], ["-25%", "25%"]);
  const TranslateMediumX = useTransform(springX, [0, 1], ["-50%", "50%"]);
  const TranslateMediumY = useTransform(springY, [0, 1], ["-50%", "50%"]);
  const TranslateSmallX = useTransform(springX, [0, 1], ["-200%", "200%"]);
  const TranslateSmallY = useTransform(springY, [0, 1], ["-200%", "200%"]);
  // Removed unused state variables
  
  const handleStartChat = () => {
    router.push('/chat');
  };

  return (
    <>
     
      <main>
        <section ref={sectionRef} className="pt-24 pb-16">
          <div className="container">
            <SectionBorder>
              <SectionContent className="relative isolate [mask-image:linear-gradient(to_bottom,transparent,black_10%,black_90%,transparent)]">
                <div className="absolute -z-10 inset-0 bg-[radial-gradient(circle_farthest-corner,var(--color-fuchsia-900)_50%,var(--color-indigo-900)_75%,transparent)] [mask-image:radial-gradient(circle_farthest-side,black,transparent)]" />
                <div className="absolute inset-0 -z-10">
                  <div className="absolute-center">
                    <CenteredCircle className="size-[350px]" />
                  </div>
                  <div className="absolute-center">
                    <CenteredCircle className="size-[600px]" />
                  </div>
                  <div className="absolute-center">
                    <CenteredCircle className="size-[850px]" />
                  </div>
                  <div className="absolute-center">
                    <CenteredCircle className="size-[1100px]" />
                  </div>
                  <div className="absolute-center">
                    <CenteredCircle className="size-[1350px]" />
                  </div>
                </div>
                <motion.h1 
                  className="text-4xl md:text-5xl lg:text-6xl font-semibold text-white-100 text-center leading-tight"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8 }}
                >
                  Transform Research with{" "}
                  <span className="relative">
                    <span>QuantumQuill</span>
                    <motion.span
                      className="absolute h-4 w-full left-0 top-full -translate-y-1/2 bg-[linear-gradient(to_right,var(--color-amber-400),var(--color-teal-400),var(--color-violet-400),var(--color-fuchsia-400))]"
                      style={{
                        maskImage: `url(${underlineImg.src})`,
                        maskSize: "contain",
                        maskPosition: "center",
                        maskRepeat: "no-repeat",
                      }}
                      initial={{ scaleX: 0 }}
                      animate={{ scaleX: 1 }}
                      transition={{ duration: 0.8, delay: 0.4 }}
                    />
                  </span>
                </motion.h1>
                <motion.p 
                  className="text-center text-lg md:text-xl mt-6 max-w-3xl mx-auto"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8, delay: 0.2 }}
                >
                  Experience the power of Multi-Agent AI Research Assistant. Our collaborative AI agents work in harmony to summarize, refine, and validate your research content with unparalleled precision.
                </motion.p>
                <motion.div 
                  className="flex flex-col md:flex-row items-center justify-center gap-4 mt-12"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8, delay: 0.4 }}
                >
                  <Button 
                    variant="secondary" 
                    onClick={handleStartChat}
                    className="min-w-[160px]"
                  >
                    Try It Now
                  </Button>
                  <Button 
                    variant="outline" 
                    onClick={() => document.getElementById('features')?.scrollIntoView({ behavior: 'smooth' })}
                    className="min-w-[160px]"
                  >
                    Learn More
                  </Button>
                </motion.div>
                <div className="relative isolate max-w-5xl mx-auto">
                  <div className="absolute left-1/2 top-0">
                    <motion.div
                      style={{
                        x: TranslateLargeX,
                        y: TranslateLargeY,
                      }}
                    >
                      <Planet
                        size="lg"
                        color="violet"
                        className="md:-translate-x-[300px] lg:-translate-x-[427px] -translate-y-[125px] rotate-135 hidden md:block"
                      />
                    </motion.div>
                    <motion.div
                      style={{
                        x: TranslateLargeX,
                        y: TranslateLargeY,
                      }}
                    >
                      <Planet
                        size="lg"
                        color="violet"
                        className="-translate-y-[205px] md:translate-x-[330px] lg:translate-x-[372px] -rotate-135 hidden md:block"
                      />
                    </motion.div>
                    <motion.div
                      style={{
                        x: TranslateSmallX,
                        y: TranslateSmallY,
                      }}
                    >
                      <Planet
                        size="sm"
                        color="fuchsia"
                        className="-translate-y-[371px] -translate-x-[510px] rotate-135 hidden md:block"
                      />
                    </motion.div>
                    <motion.div
                      style={{
                        x: TranslateMediumX,
                        y: TranslateMediumY,
                      }}
                    >
                      <Planet
                        size="md"
                        color="teal"
                        className="-translate-y-[344px] translate-x-[510px] -rotate-135 hidden md:block"
                      />
                    </motion.div>
                  </div>
                  <div className="absolute top-[30%] left-0 z-10 -translate-x-10 hidden lg:block">
                    <motion.div
                      className="bg-gray-800/70 backdrop-blur-md border border-gray-700 rounded-xl p-4 w-72"
                      style={{
                        y: TransformedY,
                      }}
                    >
                      <p>Can you analyze this research paper and provide a comprehensive summary?</p>
                      <p className="text-right text-gray-400 text-sm font-semibold">
                        1m ago
                      </p>
                    </motion.div>
                  </div>
                  <div className="absolute top-[50%] right-0 z-10 translate-x-10 hidden lg:block">
                    <motion.div
                      className="bg-gray-800/70 backdrop-blur-md border border-gray-700 rounded-xl p-4 w-72"
                      style={{
                        y: TransformedY,
                      }}
                    >
                      <p>
                        <strong>QuantumQuill: </strong>I&apos;ve analyzed, refined, and validated the research content for optimal accuracy.
                      </p>
                      <p className="text-right text-gray-400 text-sm font-semibold">
                        Just now
                      </p>
                    </motion.div>
                  </div>
                  <div className="mt-20 rounded-2xl border-2 overflow-hidden border-gradient relative">
                    <Image src={robotImg} alt="robot image" />
                    <div className="absolute bottom-2 md:bottom-4 left-1/2 -translate-x-1/2 w-full  max-w-xs">
                      <div className="bg-gray-950/80 flex items-center gap-4 px-4 py-2 rounded-2xl w-[320px] max-w-full">
                        <Loader className="text-violet-400" />
                        <div className="font-semibold text-xl text-gray-100">
                          AI is generating{" "}
                          <span className="animate-cursor-blink">|</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </SectionContent>
            </SectionBorder>
          </div>
        </section>

        <section id="features" className="py-16">
          <div className="container">
            <h2 className="text-3xl md:text-4xl font-bold text-center mb-12">
              Powerful Research Features
            </h2>
            <div className="grid md:grid-cols-3 gap-8">
              <div className="p-6 rounded-lg bg-gray-800/50 backdrop-blur-sm border border-gray-700">
                <h3 className="text-xl font-semibold mb-4 text-violet-400">Smart Summarization</h3>
                <p>Advanced AI agents analyze and distill complex research papers into clear, comprehensive summaries.</p>
              </div>
              <div className="p-6 rounded-lg bg-gray-800/50 backdrop-blur-sm border border-gray-700">
                <h3 className="text-xl font-semibold mb-4 text-violet-400">Intelligent Refinement</h3>
                <p>Multi-agent collaboration ensures your content is polished and academically sound.</p>
              </div>
              <div className="p-6 rounded-lg bg-gray-800/50 backdrop-blur-sm border border-gray-700">
                <h3 className="text-xl font-semibold mb-4 text-violet-400">Validation & Review</h3>
                <p>Rigorous validation process ensures accuracy and compliance with academic standards.</p>
              </div>
            </div>
          </div>
        </section>

        <section id="how-it-works" className="py-16 bg-gray-900/50">
          <div className="container">
            <h2 className="text-3xl md:text-4xl font-bold text-center mb-12">
              How QuantumQuill Works
            </h2>
            <div className="max-w-4xl mx-auto">
              <div className="flex flex-col gap-8">
                <div className="flex items-start gap-4">
                  <div className="w-8 h-8 rounded-full bg-violet-400 flex items-center justify-center shrink-0">1</div>
                  <div>
                    <h3 className="text-xl font-semibold mb-2">Submit Your Content</h3>
                    <p>Upload your research paper, article, or medical data for processing.</p>
                  </div>
                </div>
                <div className="flex items-start gap-4">
                  <div className="w-8 h-8 rounded-full bg-violet-400 flex items-center justify-center shrink-0">2</div>
                  <div>
                    <h3 className="text-xl font-semibold mb-2">AI Analysis</h3>
                    <p>Our AI agents analyze, summarize, and enhance your content.</p>
                  </div>
                </div>
                <div className="flex items-start gap-4">
                  <div className="w-8 h-8 rounded-full bg-violet-400 flex items-center justify-center shrink-0">3</div>
                  <div>
                    <h3 className="text-xl font-semibold mb-2">Review & Validate</h3>
                    <p>Get comprehensive validation reports and refined results.</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="py-16 bg-gradient-to-r from-violet-900/50 to-fuchsia-900/50">
          <div className="container">
            <div className="text-center max-w-3xl mx-auto">
              <h2 className="text-3xl md:text-4xl font-bold mb-6">
                Ready to Transform Your Research?
              </h2>
              <p className="text-lg mb-8">
                Join thousands of researchers using QuantumQuill to enhance their academic work.
              </p>
              <Button 
                variant="secondary"
                onClick={handleStartChat}
                className="min-w-[200px]"
              >
                Get Started Now
              </Button>
            </div>
          </div>
        </section>
      </main>
    </>
  );
};

export default Hero;