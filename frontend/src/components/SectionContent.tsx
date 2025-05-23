import { HTMLAttributes } from "react";
import { twMerge } from "tailwind-merge";

const SectionContent = (props: HTMLAttributes<HTMLDivElement>) => {
  const { className, ...otherProps } = props;
  return (
    <div
      className={twMerge(
        "container py-24 md:py-36 lg:py-44 overflow-hidden",
        className
      )}
      {...otherProps}
    />
  );
};

export default SectionContent;
