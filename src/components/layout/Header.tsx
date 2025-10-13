import { createSignal, onMount, Show } from "solid-js";
import { A, useLocation } from "@solidjs/router";
import { siteConfig } from "~/lib/config";

export function Header() {
  const [isDark, setIsDark] = createSignal(false);
  const [currentTime, setCurrentTime] = createSignal("");
  const location = useLocation();

  // Check for saved theme preference or default to dark
  onMount(() => {
    const savedTheme = localStorage.getItem("theme");
    const prefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
    const shouldBeDark = savedTheme === "dark" || (!savedTheme && prefersDark);
    
    setIsDark(shouldBeDark);
    if (shouldBeDark) {
      document.documentElement.classList.add("dark");
    }

    // Update time every second
    const updateTime = () => {
      const now = new Date();
      const options: Intl.DateTimeFormatOptions = {
        timeZone: "Asia/Kolkata", // IST timezone
        hour: "2-digit",
        minute: "2-digit",
        second: "2-digit",
        hour12: false,
      };
      setCurrentTime(new Intl.DateTimeFormat("en-GB", options).format(now));
    };
    
    updateTime();
    const intervalId = setInterval(updateTime, 1000);

    return () => clearInterval(intervalId);
  });

  const toggleTheme = () => {
    const newTheme = !isDark();
    setIsDark(newTheme);
    
    if (newTheme) {
      document.documentElement.classList.add("dark");
      localStorage.setItem("theme", "dark");
    } else {
      document.documentElement.classList.remove("dark");
      localStorage.setItem("theme", "light");
    }
  };

  const isActive = (path: string) => {
    if (path === "/") return location.pathname === path;
    return location.pathname.startsWith(path);
  };

  return (
    <>
      {/* Top fade gradient */}
      <div class="fixed top-0 left-0 right-0 h-20 bg-gradient-to-b from-white dark:from-gray-900 to-transparent pointer-events-none z-40" />
      
      {/* Header */}
      <header class="sticky top-0 z-50 w-full px-4 py-2">
        <div class="max-w-7xl mx-auto flex items-center justify-center lg:justify-between gap-4">
          {/* Left side - Location */}
          <div class="flex-1 hidden lg:flex items-center text-xs text-gray-500 dark:text-gray-500">
            <div class="i-mdi-map-marker mr-1 text-sm" />
            Bengaluru, India
          </div>

          {/* Center - Navigation Pill */}
          <nav class="flex-shrink-0">
            <div class="bg-white/80 dark:bg-gray-900/80 backdrop-blur-xl border border-gray-200/50 dark:border-gray-700/50 rounded-full shadow-md px-1.5 py-1.5 flex items-center gap-0.5">
              {/* Home */}
              <A
                href="/"
                class={`group flex items-center gap-1.5 px-3 py-1.5 rounded-full transition-all duration-300 ${
                  isActive("/")
                    ? "bg-gray-200 dark:bg-gray-700 text-gray-900 dark:text-gray-100"
                    : "text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-800"
                }`}
              >
                <div class="i-mdi-home text-base" />
                <span class="hidden md:inline text-xs font-medium">Home</span>
              </A>

              {/* Separator */}
              <div class="w-px h-4 bg-gray-200 dark:bg-gray-700 mx-0.5" />

              {/* About */}
              <A
                href="/about"
                class={`group flex items-center gap-1.5 px-3 py-1.5 rounded-full transition-all duration-300 ${
                  isActive("/about")
                    ? "bg-gray-200 dark:bg-gray-700 text-gray-900 dark:text-gray-100"
                    : "text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-800"
                }`}
              >
                <div class="i-mdi-account text-base" />
                <span class="hidden md:inline text-xs font-medium">About</span>
              </A>

              {/* Projects */}
              <A
                href="/projects"
                class={`group flex items-center gap-1.5 px-3 py-1.5 rounded-full transition-all duration-300 ${
                  isActive("/projects")
                    ? "bg-gray-200 dark:bg-gray-700 text-gray-900 dark:text-gray-100"
                    : "text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-800"
                }`}
              >
                <div class="i-mdi-grid text-base" />
                <span class="hidden md:inline text-xs font-medium">Projects</span>
              </A>

              {/* Blog */}
              <A
                href="/blog"
                class={`group flex items-center gap-1.5 px-3 py-1.5 rounded-full transition-all duration-300 ${
                  isActive("/blog")
                    ? "bg-gray-200 dark:bg-gray-700 text-gray-900 dark:text-gray-100"
                    : "text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-800"
                }`}
              >
                <div class="i-mdi-book-open-page-variant text-base" />
                <span class="hidden md:inline text-xs font-medium">Blog</span>
              </A>

              {/* Separator */}
              <div class="w-px h-4 bg-gray-200 dark:bg-gray-700 mx-0.5" />

              {/* Theme Toggle */}
              <button
                onClick={toggleTheme}
                class="group flex items-center gap-1.5 px-3 py-1.5 rounded-full text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-800 transition-all duration-300"
                aria-label="Toggle theme"
              >
                <Show
                  when={isDark()}
                  fallback={<div class="i-mdi-moon-waning-crescent text-base group-hover:rotate-12 transition-transform duration-300" />}
                >
                  <div class="i-mdi-white-balance-sunny text-base text-yellow-500 group-hover:rotate-180 transition-transform duration-500" />
                </Show>
              </button>
            </div>
          </nav>

          {/* Right side - Time */}
          <div class="flex-1 hidden lg:flex items-center justify-end">
            <div class="flex items-center gap-1.5 text-xs text-gray-500 dark:text-gray-500 font-mono">
              <div class="i-mdi-clock-outline text-sm" />
              <span class="tabular-nums">{currentTime()}</span>
              <span class="text-2xs opacity-60">IST</span>
            </div>
          </div>
        </div>
      </header>
    </>
  );
}
