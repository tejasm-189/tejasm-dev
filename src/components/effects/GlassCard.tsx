import { JSX } from "solid-js";

interface GlassCardProps {
  children: JSX.Element;
  class?: string;
  hover?: boolean;
}

export function GlassCard(props: GlassCardProps) {
  const baseClasses = `
    backdrop-blur-xl
    bg-white/70 dark:bg-gray-900/70
    border border-gray-200/50 dark:border-gray-800/50
    rounded-2xl
    shadow-xl shadow-gray-200/20 dark:shadow-gray-900/20
    transition-all duration-300
  `;

  const hoverClasses = props.hover
    ? `
      hover:shadow-2xl hover:shadow-gray-300/30 dark:hover:shadow-gray-800/30
      hover:scale-105 hover:-translate-y-1
      cursor-pointer
    `
    : "";

  return (
    <div class={`${baseClasses} ${hoverClasses} ${props.class || ""}`}>
      {props.children}
    </div>
  );
}
