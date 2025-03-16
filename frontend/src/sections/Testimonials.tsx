"use client";
import React, { useState } from "react";
import Image from "next/image";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faQuoteLeft } from "@fortawesome/free-solid-svg-icons";
import { motion, AnimatePresence, LayoutGroup } from "framer-motion";
import SectionBorder from "@/components/SectionBorder";
import SectionContent from "@/components/SectionContent";

import AshwinSantiago from "@/assets/images/ashwin-santiago.jpg";
import AlecWhitten from "@/assets/images/alec-whitten.jpg";
import ReneWells from "@/assets/images/rene-wells.jpg";
import MollieHall from "@/assets/images/mollie-hall.jpg";

export const testimonials = [
  {
    quote:
      "QuantumQuill has redefined how I conduct research. The AI-driven summarization ensures I extract the most relevant insights without wasting time.",
    name: "Ashwin Santiago",
    title: "AI Research Scientist",
    image: AshwinSantiago,
  },
  {
    quote:
      "The refinement tool in QuantumQuill is beyond impressive. It enhances my content with clarity and conciseness while keeping my original intent intact.",
    name: "Alec Whitten",
    title: "Technical Writer",
    image: AlecWhitten,
  },
  {
    quote:
      "I rely on QuantumQuill daily to validate and enhance articles. Its AI-backed validation system ensures my sources are credible and my content is factually solid.",
    name: "Rene Wells",
    title: "Senior Editor",
    image: ReneWells,
  },
  {
    quote:
      "As a content strategist, I use QuantumQuill to refine drafts and generate high-quality summaries. It makes content creation seamless and efficient.",
    name: "Mollie Hall",
    title: "Content Strategist",
    image: MollieHall,
  },
];

const Testimonials = () => {
  const [testimonialIndex, setTestimonialIndex] = useState(0);

  return (
    <section id="testimonials">
      <div className="container">
        <SectionBorder borderTop>
          <SectionContent>
            <LayoutGroup>
              <motion.div className="border-gradient rounded-3xl px-6 md:px-10 py-16 relative flex flex-col md:flex-row gap-12 md:mx-10 lg:px-16 lg:py-24 lg:mx-20">
                <FontAwesomeIcon
                  icon={faQuoteLeft}
                  className="absolute size-20 text-blue-400 top-0 left-6 md:left-10 lg:left-16 -translate-y-1/2"
                />
                <AnimatePresence mode="wait" initial={false}>
                  {testimonials.map(({ quote, name, title, image }, i) =>
                    testimonialIndex === i ? (
                      <motion.blockquote
                        initial={{ opacity: 0, y: 25 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: 25 }}
                        transition={{
                          duration: 0.5,
                        }}
                        key={name}
                        layout
                        className="flex flex-col lg:flex-row gap-12"
                      >
                        <p className="text-xl md:text-2xl font-medium">
                          {quote}
                        </p>
                        <cite className="not-italic lg:text-right">
                          <Image
                            src={image}
                            alt={name}
                            className="rounded-xl size-28 max-w-none"
                          />
                          <div className="font-bold mt-4">{name}</div>
                          <div className="text-xs text-gray-400 mt-2">
                            {title}
                          </div>
                        </cite>
                      </motion.blockquote>
                    ) : null
                  )}
                </AnimatePresence>
                <motion.div layout="position" className="flex gap-2 md:flex-col">
                  {testimonials.map((testimonial, i) => (
                    <div
                      key={testimonial.name}
                      className="size-6 relative isolate inline-flex items-center justify-center cursor-pointer"
                      onClick={() => setTestimonialIndex(i)}
                    >
                      {testimonialIndex === i && (
                        <motion.div
                          className="border-gradient absolute size-full rounded-full -z-10"
                          layoutId="testimonial-dot"
                        />
                      )}
                      <div className="size-1.5 rounded-full bg-gray-200"></div>
                    </div>
                  ))}
                </motion.div>
              </motion.div>
            </LayoutGroup>
          </SectionContent>
        </SectionBorder>
      </div>
    </section>
  );
};

export default Testimonials;
