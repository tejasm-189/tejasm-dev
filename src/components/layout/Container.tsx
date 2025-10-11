import { JSX } from "solid-js";

interface ContainerProps {
  children: JSX.Element;
  class?: string;
}

export function Container(props: ContainerProps) {
  return (
    <div class={`container-custom ${props.class || ""}`}>
      {props.children}
    </div>
  );
}
