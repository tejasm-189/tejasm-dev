import { JSX } from "solid-js";

interface GlassCardProps {
  children: JSX.Element;
  class?: string;
  hover?: boolean;
  gradient?: boolean; // New: gradient border effect
}

export function GlassCard(props: GlassCardProps) {
  const baseClasses = `
    relative
    backdrop-blur-xl
    bg-white/80 dark:bg-gray-900/80
    border border-gray-200/50 dark:border-gray-800/50
    rounded-2xl
    shadow-xl shadow-gray-200/20 dark:shadow-gray-900/20
    transition-all duration-500 ease-out
    overflow-hidden
  `;

  const hoverClasses = props.hover
    ? `
      hover:shadow-2xl hover:shadow-blue-500/10 dark:hover:shadow-blue-500/20
      hover:scale-[1.02] hover:-translate-y-2
      hover:border-blue-500/30 dark:hover:border-blue-400/30
      cursor-pointer
      group
    `
    : "";

  const gradientBorder = props.gradient
    ? `
      before:absolute before:inset-0 before:rounded-2xl before:p-[1px]
      before:bg-gradient-to-br before:from-blue-500 before:via-purple-500 before:to-pink-500
      before:opacity-0 hover:before:opacity-100
      before:transition-opacity before:duration-500
      before:-z-10
    `
    : "";

  return (
    <div class={`${baseClasses} ${hoverClasses} ${gradientBorder} ${props.class || ""}`}>
      {/* Shine effect on hover */}
      {props.hover && (
        <div class="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500">
          <div class="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent -skew-x-12 translate-x-[-200%] group-hover:translate-x-[200%] transition-transform duration-1000" />
        </div>
      )}
      <div class="relative z-10">
        {props.children}
      </div>
    </div>
  );
}
