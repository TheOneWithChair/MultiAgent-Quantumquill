"use client";
import Button, { ButtonProps } from "@/components/Button";
import SectionBorder from "@/components/SectionBorder";
import SectionContent from "@/components/SectionContent";
import { faCheckCircle } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { twMerge } from "tailwind-merge";
import { useRouter } from "next/navigation";

export const pricingTiers = [
  {
    title: "Basic Research",
    description: "Essential research analysis tools",
    price: "Free",
    buttonText: "Get Started",
    buttonVariant: "secondary",
    features: [
      "Research paper summarization",
      "Basic content validation",
      "Limited refinement capabilities",
    ],
    color: "amber",
    className: "lg:py-12 lg:my-6",
  },
  {
    title: "Advanced Research",
    description: "Comprehensive research analysis suite",
    price: 99,
    buttonText: "Start Analyzing",
    buttonVariant: "secondary",
    features: [
      "All Basic Research features",
      "Advanced multi-agent analysis",
      "Enhanced content refinement",
      "Detailed validation reports",
    ],
    color: "violet",
    className: "lg:py-18 lg:my-0",
  },
  {
    title: "Research Institute",
    description: "Custom research solutions for organizations",
    price: null,
    buttonText: "Contact Us",
    buttonVariant: "primary",
    features: [
      "All Advanced Research features",
      "Custom validation parameters",
      "Institutional data handling",
      "API access for integration",
      "Priority support for researchers",
    ],
    color: "teal",
    className: "lg:py-12 lg:my-6",
  },
] satisfies {
  title: string;
  description: string;
  price: string | number | null;
  buttonText: string;
  buttonVariant?: ButtonProps["variant"];
  features: string[];
  color: string;
  className: string;
}[];

const Pricing = () => {
  const router = useRouter();

  const handleGetStarted = () => {
    router.push('/chat');
  };

  return (
    <section id="pricing">
      <div className="container">
        <SectionBorder borderTop>
          <SectionContent>
            <h2 className="text-3xl md:text-4xl lg:text-5xl leading-tight font-semibold text-center text-gray-200">
              Research Analysis Plans
            </h2>
            <div className="mt-12 flex flex-col lg:flex-row gap-4 items-start">
              {pricingTiers.map((tier) => (
                <div
                  key={tier.title}
                  className={twMerge(
                    "border border-[var(--color-border)] rounded-3xl px-6 py-12 max-w-sm mx-auto flex-1",
                    tier.className
                  )}
                >
                  <h3
                    className={twMerge(
                      "font-semibold text-4xl",
                      tier.color === "violet" && "text-violet-400",
                      tier.color === "teal" && "text-teal-400",
                      tier.color === "amber" && "text-amber-400"
                    )}
                  >
                    {tier.title}
                  </h3>
                  <p className="mt-4 text-gray-400">{tier.description}</p>
                  <div className="mt-8">
                    {typeof tier.price === "number" && (
                      <span className="text-2xl font-semibold text-gray-200 align-top">
                        $
                      </span>
                    )}
                    <span className="text-7xl font-semibold text-gray-200">
                      {tier.price ? tier.price : <>&nbsp;</>}
                    </span>
                  </div>
                  <Button 
                    className="mt-8" 
                    variant={tier.buttonVariant} 
                    block
                    onClick={handleGetStarted}
                  >
                    {tier.buttonText}
                  </Button>
                  <ul className="flex flex-col gap-y-4 mt-8">
                    {tier.features.map((feature) => (
                      <li
                        key={feature}
                        className="border-t border-[var(--color-border)] pt-4 flex gap-4"
                      >
                        <FontAwesomeIcon
                          icon={faCheckCircle}
                          className="size-6 text-violet-400 flex-shrink-0"
                        />
                        <span className="font-medium">{feature}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </SectionContent>
        </SectionBorder>
      </div>
    </section>
  );
};

export default Pricing;
