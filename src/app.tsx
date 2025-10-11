import { Router } from "@solidjs/router";
import { FileRoutes } from "@solidjs/start/router";
import { Suspense } from "solid-js";
import type { RouteSectionProps } from "@solidjs/router";
import "@unocss/reset/tailwind.css";
import "virtual:uno.css";
import "./app.css";

export default function App() {
  return (
    <Router
      root={(props: RouteSectionProps) => (
        <Suspense>
          {props.children}
        </Suspense>
      )}
    >
      <FileRoutes />
    </Router>
  );
}
