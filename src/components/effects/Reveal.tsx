import { createSignal, onMount, JSX } from "solid-js";

interface RevealProps {
  children: JSX.Element;
  delay?: number;
  class?: string;
}

export function Reveal(props: RevealProps) {
  const [isVisible, setIsVisible] = createSignal(false);
  let elementRef: HTMLDivElement | undefined;

  onMount(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setTimeout(() => {
              setIsVisible(true);
            }, props.delay || 0);
          }
        });
      },
      { threshold: 0.1 }
    );

    if (elementRef) {
      observer.observe(elementRef);
    }

    return () => {
      if (elementRef) {
        observer.unobserve(elementRef);
      }
    };
  });

  return (
    <div
      ref={elementRef}
      class={`transition-all duration-700 ease-out ${
        isVisible()
          ? "opacity-100 translate-y-0"
          : "opacity-0 translate-y-8"
      } ${props.class || ""}`}
    >
      {props.children}
    </div>
  );
}
