"use client";
import slackLogo from "../assets/images/slack-logo.png";
import dockerLogo from "../assets/images/docker-logo.png";
import figmaLogo from "../assets/images/figma-logo.png";
import githubLogo from "../assets/images/github-logo.png";
import vsCodeLogo from "../assets/images/vs-code-logo.png";
import notionLogo from "../assets/images/notion-logo.png";
import jiraLogo from "../assets/images/jira-logo.png";
import gcpLogo from "../assets/images/gcp-logo.png";
import SectionBorder from "@/components/SectionBorder";
import SectionContent from "@/components/SectionContent";
import Button from "@/components/Button";
import CenteredCircle from "@/components/CenteredCircle";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCircleCheck } from "@fortawesome/free-solid-svg-icons";
import Logo from "@/components/Logo";
import Image from "next/image";
import { motion } from "framer-motion";
import { useRouter } from "next/navigation";

export const features = [
  "AI-Powered Collaboration & Research",
  "Intelligent Code & Content Generation",
  "Automated Cloud & DevOps Optimization",
];

export const logos = [
  { src: slackLogo, alt: "Slack - AI-enhanced team communication", rotate: 0 },
  { src: dockerLogo, alt: "Docker - AI-powered container optimization", rotate: 45 },
  { src: figmaLogo, alt: "Figma - AI-assisted design automation", rotate: 90 },
  { src: githubLogo, alt: "GitHub - AI-driven coding assistance", rotate: 135 },
  { src: vsCodeLogo, alt: "VS Code - AI-powered code suggestions", rotate: 180 },
  { src: notionLogo, alt: "Notion - AI-enhanced knowledge management", rotate: 225 },
  { src: jiraLogo, alt: "Jira - AI-driven project tracking", rotate: 270 },
  { src: gcpLogo, alt: "GCP - AI for cloud computing", rotate: 315 },
];

const Features = () => {
  const router = useRouter();

  const handleTryNow = () => {
    router.push("/chat");
  };

  return (
    <section id="features">
      <div className="container">
        <SectionBorder borderTop>
          <SectionContent className="md:px-20 lg:px-40">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-20">
              {/* Left Section: Features List */}
              <div>
                <h2 className="text-3xl md:text-4xl lg:text-5xl font-semibold text-gray-200 leading-tight">
                  AI Agents Powering the Future
                </h2>
                <p className="mt-6 text-lg text-gray-400">
                  AI-driven assistants are transforming how we collaborate, code, and manage complex workflows.
                  From automated research to intelligent cloud solutions, AI is optimizing efficiency across industries.
                </p>
                <ul className="mt-8 flex flex-col gap-y-6">
                  {features.map((feature) => (
                    <li key={feature} className="flex items-center gap-4">
                      <FontAwesomeIcon icon={faCircleCheck} className="size-6 text-violet-400" />
                      <span className="text-lg font-medium">{feature}</span>
                    </li>
                  ))}
                </ul>
                <Button className="mt-12" onClick={handleTryNow}>
                  Try AI Now
                </Button>
              </div>

              {/* Right Section: Rotating AI-Enabled Tools */}
              <div className="flex justify-center flex-shrink-0">
                <div className="size-[270px] md:size-[450px] relative flex flex-shrink-0">
                  <div className="absolute inset-0">
                    <CenteredCircle className="size-full" />
                  </div>
                  <div className="absolute-center">
                    <CenteredCircle className="size-[180px] md:size-[300px]" />
                  </div>
                  <div className="absolute-center">
                    <Logo className="size-24" />
                  </div>
                  {logos.map(({ src, alt, rotate }) => (
                    <motion.div
                      key={alt}
                      className="absolute inset-0"
                      initial={{ rotate: rotate }}
                      animate={{
                        rotate: [
                          rotate, rotate + 45, rotate + 45, rotate + 90,
                          rotate + 90, rotate + 135, rotate + 135, rotate + 180,
                          rotate + 180, rotate + 225, rotate + 225, rotate + 270,
                          rotate + 270, rotate + 315, rotate + 315, rotate + 360,
                          rotate + 360
                        ],
                      }}
                      transition={{
                        repeat: Infinity,
                        duration: 10,
                      }}
                    >
                      <motion.div
                        className="inline-flex size-10 md:size-14 items-center justify-center border border-[var(--color-border)] rounded-lg absolute top-1/2 left-0 -translate-x-1/2 -translate-y-1/2 bg-gray-950"
                        initial={{ translate: "-50% -50%", rotate: -rotate }}
                        animate={{
                          rotate: [
                            -rotate, -rotate - 45, -rotate - 45, -rotate - 90,
                            -rotate - 90, -rotate - 135, -rotate - 135, -rotate - 180,
                            -rotate - 180, -rotate - 225, -rotate - 225, -rotate - 270,
                            -rotate - 270, -rotate - 315, -rotate - 315, -rotate - 360,
                            -rotate - 360
                          ],
                        }}
                        transition={{
                          repeat: Infinity,
                          duration: 10,
                        }}
                      >
                        <Image src={src} alt={alt} className="size-6 md:size-9" />
                      </motion.div>
                    </motion.div>
                  ))}
                </div>
              </div>
            </div>
          </SectionContent>
        </SectionBorder>
      </div>
    </section>
  );
};

export default Features;
