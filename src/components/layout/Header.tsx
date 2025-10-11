import { createSignal, onMount } from "solid-js";
import { Container } from "./Container";
import { siteConfig } from "~/lib/config";

export function Header() {
  const [isDark, setIsDark] = createSignal(false);

  // Check for saved theme preference or default to dark
  onMount(() => {
    const savedTheme = localStorage.getItem("theme");
    const prefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
    const shouldBeDark = savedTheme === "dark" || (!savedTheme && prefersDark);
    
    setIsDark(shouldBeDark);
    if (shouldBeDark) {
      document.documentElement.classList.add("dark");
    }
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

  return (
    <header class="border-b border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900">
      <Container>
        <nav class="flex items-center justify-between py-4">
          {/* Logo */}
          <a href="/" class="text-2xl font-bold text-gray-900 dark:text-white hover:text-blue-600 transition-colors">
            Tejas M
          </a>

          {/* Navigation Links & Theme Toggle */}
          <div class="flex items-center gap-6">
            <a href="/" class="text-gray-600 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 transition-colors">
              Home
            </a>
            <a href="/blog" class="text-gray-600 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 transition-colors">
              Blog
            </a>
            <a href="/about" class="text-gray-600 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 transition-colors">
              About
            </a>
            <a href="/projects" class="text-gray-600 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 transition-colors">
              Projects
            </a>
            <a 
              href={siteConfig.links.resume}
              download="Tejas_M_Resume.pdf"
              class="text-gray-600 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 transition-colors flex items-center gap-1"
            >
              <div class="i-mdi-file-document text-sm" />
              Resume
            </a>
            
            {/* Theme Toggle Button */}
            <button
              onClick={toggleTheme}
              class="p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
              aria-label="Toggle theme"
            >
              {isDark() ? (
                <div class="i-mdi-white-balance-sunny text-xl text-yellow-500" />
              ) : (
                <div class="i-mdi-moon-waning-crescent text-xl text-gray-700" />
              )}
            </button>
          </div>
        </nav>
      </Container>
    </header>
  );
}
