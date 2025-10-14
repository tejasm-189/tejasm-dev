import { Router } from "@solidjs/router";
import { FileRoutes } from "@solidjs/start/router";
import { Suspense } from "solid-js";
import type { RouteSectionProps } from "@solidjs/router";
import { CustomCursor } from "~/components/effects/CustomCursor";
import "@unocss/reset/tailwind.css";
import "virtual:uno.css";
import "./app.css";

export default function App() {
  return (
    <>
      {/* Custom Cursor - Section 11 from HOME_PAGE_VISION.md */}
      <CustomCursor />
      
      <Router
        root={(props: RouteSectionProps) => (
          <Suspense>
            {props.children}
          </Suspense>
        )}
      >
        <FileRoutes />
      </Router>
    </>
  );
}
