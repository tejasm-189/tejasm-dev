import { createSignal, onMount, onCleanup, For } from "solid-js";
import { usePrefersReducedMotion } from "~/lib/usePrefersReducedMotion";

/**
 * SKILLS CONSTELLATION COMPONENT - Section 7 from HOME_PAGE_VISION.md
 * 
 * An interactive constellation of skills/technologies displayed as connected nodes.
 * Nodes light up on hover and connections pulse. Creates a "galaxy of knowledge" effect.
 * 
 * LEARNING OBJECTIVES:
 * 1. SVG Fundamentals - Creating graphics with Scalable Vector Graphics
 * 2. Circle Packing Algorithm - Positioning nodes without overlap
 * 3. Connection Lines - Drawing lines between related technologies
 * 4. Mouse Interaction - Hover effects and proximity detection
 * 5. Reactive State - SolidJS signals for interactive updates
 * 6. CSS Animations - Pulsing, glowing, and scaling effects
 * 
 * KEY CONCEPTS:
 * 
 * SVG (Scalable Vector Graphics):
 * - XML-based vector image format
 * - Scales perfectly at any size (resolution independent)
 * - Can be styled with CSS and animated
 * - Perfect for interactive graphics like this
 * 
 * Constellation Layout:
 * - Central "core" technologies (larger nodes)
 * - Surrounding "satellite" technologies (smaller nodes)
 * - Connections show relationships between technologies
 * - Organic, non-grid layout for visual interest
 */

interface Skill {
  id: string;
  name: string;
  category: "core" | "frontend" | "backend" | "devops" | "tools";
  x: number; // X position (0-100, will be converted to viewBox coords)
  y: number; // Y position (0-100, will be converted to viewBox coords)
  connections: string[]; // IDs of connected skills
}

interface Connection {
  from: Skill;
  to: Skill;
}

export default function SkillsConstellation() {
  // Check if user prefers reduced motion
  const prefersReducedMotion = usePrefersReducedMotion();

  const [hoveredSkill, setHoveredSkill] = createSignal<string | null>(null);
  const [activeConnections, setActiveConnections] = createSignal<Set<string>>(new Set());

  /**
   * SKILLS DATA
   * 
   * Each skill has:
   * - id: Unique identifier
   * - name: Display name
   * - category: Type of skill (affects size and color)
   * - x, y: Position in 100x100 grid (converted to SVG viewBox)
   * - connections: Array of skill IDs this connects to
   * 
   * Layout Strategy:
   * - Core skills in center (x: 30-70, y: 30-70)
   * - Satellites around edges
   * - Balanced distribution across quadrants
   */
  const skills: Skill[] = [
    // CORE TECHNOLOGIES (center, larger)
    { id: "ts", name: "TypeScript", category: "core", x: 50, y: 45, connections: ["react", "solid", "node"] },
    { id: "js", name: "JavaScript", category: "core", x: 50, y: 55, connections: ["ts", "react", "node"] },
    
    // FRONTEND (left side)
    { id: "react", name: "React", category: "frontend", x: 25, y: 35, connections: ["ts", "next"] },
    { id: "solid", name: "SolidJS", category: "frontend", x: 25, y: 55, connections: ["ts", "vite"] },
    { id: "next", name: "Next.js", category: "frontend", x: 15, y: 25, connections: ["react"] },
    { id: "vite", name: "Vite", category: "frontend", x: 15, y: 65, connections: ["solid"] },
    { id: "css", name: "CSS/UnoCSS", category: "frontend", x: 20, y: 45, connections: ["react", "solid"] },
    
    // BACKEND (right side)
    { id: "node", name: "Node.js", category: "backend", x: 75, y: 40, connections: ["ts", "js", "express"] },
    { id: "express", name: "Express", category: "backend", x: 85, y: 30, connections: ["node"] },
    { id: "python", name: "Python", category: "backend", x: 75, y: 60, connections: ["ai"] },
    { id: "sql", name: "SQL", category: "backend", x: 85, y: 70, connections: ["node"] },
    
    // DEVOPS (top)
    { id: "docker", name: "Docker", category: "devops", x: 50, y: 15, connections: ["nginx", "github"] },
    { id: "nginx", name: "Nginx", category: "devops", x: 40, y: 10, connections: ["docker"] },
    { id: "github", name: "GitHub Actions", category: "devops", x: 60, y: 10, connections: ["docker"] },
    
    // TOOLS (bottom)
    { id: "git", name: "Git", category: "tools", x: 40, y: 85, connections: ["github"] },
    { id: "ai", name: "AI/ML", category: "tools", x: 50, y: 90, connections: ["python"] },
    { id: "figma", name: "Figma", category: "tools", x: 60, y: 85, connections: ["css"] },
  ];

  /**
   * GENERATE CONNECTIONS
   * 
   * Create line data for all connections between skills.
   * Each skill's "connections" array defines which other skills it connects to.
   */
  const generateConnections = (): Connection[] => {
    const connections: Connection[] = [];
    const processed = new Set<string>();

    skills.forEach(skill => {
      skill.connections.forEach(connId => {
        const connectedSkill = skills.find(s => s.id === connId);
        if (connectedSkill) {
          // Avoid duplicate connections (A->B and B->A are the same)
          const pairKey = [skill.id, connectedSkill.id].sort().join("-");
          if (!processed.has(pairKey)) {
            connections.push({ from: skill, to: connectedSkill });
            processed.add(pairKey);
          }
        }
      });
    });

    return connections;
  };

  const connections = generateConnections();

  /**
   * HOVER INTERACTION LOGIC
   * 
   * When hovering over a skill:
   * 1. Highlight the skill node
   * 2. Highlight all connected nodes
   * 3. Brighten connection lines to connected nodes
   * 4. Dim everything else
   */
  const handleSkillHover = (skillId: string | null) => {
    setHoveredSkill(skillId);
    
    if (skillId) {
      const skill = skills.find(s => s.id === skillId);
      if (skill) {
        // Find all connected skill IDs
        const connected = new Set<string>([skillId, ...skill.connections]);
        setActiveConnections(connected);
      }
    } else {
      setActiveConnections(new Set<string>());
    }
  };

  /**
   * CATEGORY STYLING
   * 
   * Different skill categories have different sizes and colors.
   * Core technologies are larger and more prominent.
   */
  const getCategoryStyle = (category: Skill["category"]) => {
    switch (category) {
      case "core":
        return {
          radius: 28,
          colorStart: "rgb(59, 130, 246)", // blue-500
          colorEnd: "rgb(147, 51, 234)", // purple-600
          glow: "drop-shadow(0 0 12px rgb(147, 51, 234))"
        };
      case "frontend":
        return {
          radius: 22,
          colorStart: "rgb(96, 165, 250)", // blue-400
          colorEnd: "rgb(6, 182, 212)", // cyan-500
          glow: "drop-shadow(0 0 8px rgb(59, 130, 246))"
        };
      case "backend":
        return {
          radius: 22,
          colorStart: "rgb(74, 222, 128)", // green-400
          colorEnd: "rgb(5, 150, 105)", // emerald-600
          glow: "drop-shadow(0 0 8px rgb(16, 185, 129))"
        };
      case "devops":
        return {
          radius: 20,
          colorStart: "rgb(251, 146, 60)", // orange-400
          colorEnd: "rgb(239, 68, 68)", // red-500
          glow: "drop-shadow(0 0 8px rgb(251, 146, 60))"
        };
      case "tools":
        return {
          radius: 20,
          colorStart: "rgb(244, 114, 182)", // pink-400
          colorEnd: "rgb(244, 63, 94)", // rose-500
          glow: "drop-shadow(0 0 8px rgb(236, 72, 153))"
        };
    }
  };

  /**
   * CHECK IF CONNECTION IS ACTIVE
   * 
   * A connection is active if either endpoint is in the active set.
   */
  const isConnectionActive = (conn: Connection): boolean => {
    const active = activeConnections();
    return active.has(conn.from.id) || active.has(conn.to.id);
  };

  /**
   * CHECK IF SKILL IS HIGHLIGHTED
   * 
   * A skill is highlighted if:
   * - It's being hovered
   * - It's connected to the hovered skill
   * - Nothing is being hovered (show all)
   */
  const isSkillHighlighted = (skillId: string): boolean => {
    const hovered = hoveredSkill();
    if (!hovered) return true; // Show all when nothing hovered
    return activeConnections().has(skillId);
  };

  return (
    <section class="py-20 relative overflow-hidden">
      {/* Background gradient */}
      <div class="absolute inset-0 bg-gradient-to-b from-transparent via-purple-50/20 to-transparent dark:via-purple-900/10" />
      
      <div class="container mx-auto px-4 relative z-10">
        {/* Section Header */}
        <div class="text-center mb-16">
          <div class="text-xs font-mono text-gray-400 dark:text-gray-600 mb-4 tracking-widest">
            SKILLS_IN
          </div>
          <h2 class="text-4xl md:text-6xl font-bold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-purple-600 dark:from-blue-400 dark:to-purple-400">
            Technology Constellation
          </h2>
          <p class="text-lg md:text-xl text-gray-600 dark:text-gray-400 max-w-3xl mx-auto leading-relaxed">
            An interconnected galaxy of tools and technologies. Hover to explore relationships.
          </p>
        </div>

        {/**
         * SVG CONSTELLATION
         * 
         * ViewBox: Defines coordinate system (0-1000 x 0-600)
         * - Skills positioned using percentage (x: 0-100, y: 0-100)
         * - Converted to viewBox coords by multiplying by 10 and 6 respectively
         * 
         * Rendering Order:
         * 1. Connection lines (background)
         * 2. Skill nodes (foreground)
         * 3. Text labels (top)
         * 
         * Why this order? Lines behind nodes, text always readable.
         */}
        <div class="max-w-6xl mx-auto">
          <svg 
            viewBox="0 0 1000 600" 
            class="w-full h-auto"
            style={{ "min-height": "400px" }}
          >
            {/* Define gradients for nodes */}
            <defs>
              <radialGradient id="nodeGlow" cx="50%" cy="50%" r="50%">
                <stop offset="0%" style={{ "stop-color": "rgba(255,255,255,0.8)" }} />
                <stop offset="100%" style={{ "stop-color": "rgba(255,255,255,0)" }} />
              </radialGradient>
            </defs>

            {/* CONNECTION LINES */}
            <g class="connections">
              <For each={connections}>
                {(conn) => {
                  const isActive = isConnectionActive(conn);
                  return (
                    <line
                      x1={conn.from.x * 10}
                      y1={conn.from.y * 6}
                      x2={conn.to.x * 10}
                      y2={conn.to.y * 6}
                      stroke={isActive ? "url(#connectionGradient)" : "currentColor"}
                      stroke-width={isActive ? "3" : "1"}
                      class={`
                        transition-all duration-300
                        ${isActive 
                          ? "text-blue-500 dark:text-blue-400 opacity-80" 
                          : "text-gray-300 dark:text-gray-700 opacity-30"
                        }
                      `}
                      stroke-dasharray="5,5"
                      style={{
                        animation: isActive ? "dash 1s linear infinite" : "none"
                      }}
                    >
                      {/* Animate dasharray for "flowing" effect */}
                      {isActive && (
                        <animate
                          attributeName="stroke-dashoffset"
                          from="0"
                          to="10"
                          dur="0.5s"
                          repeatCount="indefinite"
                        />
                      )}
                    </line>
                  );
                }}
              </For>
            </g>

            {/* Define connection gradient */}
            <defs>
              <linearGradient id="connectionGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" style={{ "stop-color": "rgb(59, 130, 246)" }} />
                <stop offset="100%" style={{ "stop-color": "rgb(147, 51, 234)" }} />
              </linearGradient>
            </defs>

            {/* SKILL NODES */}
            <g class="nodes">
              <For each={skills}>
                {(skill) => {
                  const style = getCategoryStyle(skill.category);
                  const isHighlighted = isSkillHighlighted(skill.id);
                  const isHovered = hoveredSkill() === skill.id;

                  return (
                    <g
                      transform={`translate(${skill.x * 10}, ${skill.y * 6})`}
                      class="cursor-pointer"
                      onMouseEnter={() => handleSkillHover(skill.id)}
                      onMouseLeave={() => handleSkillHover(null)}
                    >
                      {/* Glow circle (appears on hover) - reduced if motion is preferred */}
                      {isHovered && (
                        <circle
                          r={style.radius + 15}
                          fill="url(#nodeGlow)"
                          class={prefersReducedMotion() ? "" : "animate-pulse"}
                        />
                      )}

                      {/* Main circle */}
                      <circle
                        r={style.radius}
                        class={`
                          transition-all duration-300
                          ${isHighlighted ? "opacity-100" : "opacity-30"}
                        `}
                        fill={`url(#gradient-${skill.id})`}
                        filter={isHovered ? style.glow : "none"}
                        style={{
                          transform: isHovered ? "scale(1.2)" : "scale(1)",
                          "transform-origin": "center",
                          transition: "transform 0.3s ease"
                        }}
                      />

                      {/* Define gradient for this node */}
                      <defs>
                        <linearGradient id={`gradient-${skill.id}`} x1="0%" y1="0%" x2="100%" y2="100%">
                          <stop offset="0%" style={{ "stop-color": style.colorStart }} />
                          <stop offset="100%" style={{ "stop-color": style.colorEnd }} />
                        </linearGradient>
                      </defs>

                      {/* Label */}
                      <text
                        y={style.radius + 20}
                        text-anchor="middle"
                        class={`
                          text-xs font-semibold transition-all duration-300
                          ${isHighlighted 
                            ? "fill-gray-700 dark:fill-gray-300" 
                            : "fill-gray-400 dark:fill-gray-600"
                          }
                          ${isHovered ? "text-base" : ""}
                        `}
                        style={{
                          transform: isHovered ? "scale(1.2)" : "scale(1)",
                          "transform-origin": "center",
                          transition: "transform 0.3s ease"
                        }}
                      >
                        {skill.name}
                      </text>
                    </g>
                  );
                }}
              </For>
            </g>
          </svg>
        </div>

        {/* Legend */}
        <div class="mt-12 flex flex-wrap justify-center gap-4 md:gap-6">
          <div class="flex items-center gap-2">
            <div class="w-4 h-4 rounded-full bg-gradient-to-r from-blue-500 to-purple-600" />
            <span class="text-sm text-gray-600 dark:text-gray-400">Core</span>
          </div>
          <div class="flex items-center gap-2">
            <div class="w-4 h-4 rounded-full bg-gradient-to-r from-blue-400 to-cyan-500" />
            <span class="text-sm text-gray-600 dark:text-gray-400">Frontend</span>
          </div>
          <div class="flex items-center gap-2">
            <div class="w-4 h-4 rounded-full bg-gradient-to-r from-green-400 to-emerald-600" />
            <span class="text-sm text-gray-600 dark:text-gray-400">Backend</span>
          </div>
          <div class="flex items-center gap-2">
            <div class="w-4 h-4 rounded-full bg-gradient-to-r from-orange-400 to-red-500" />
            <span class="text-sm text-gray-600 dark:text-gray-400">DevOps</span>
          </div>
          <div class="flex items-center gap-2">
            <div class="w-4 h-4 rounded-full bg-gradient-to-r from-pink-400 to-rose-500" />
            <span class="text-sm text-gray-600 dark:text-gray-400">Tools</span>
          </div>
        </div>

        {/* Section marker */}
        <div class="text-xs font-mono text-gray-400 dark:text-gray-600 mt-16 text-center tracking-widest">
          SKILLS_OUT
        </div>
      </div>
    </section>
  );
}

/**
 * EDUCATIONAL NOTES:
 * 
 * SVG Coordinate System:
 * - ViewBox defines the coordinate space (0-1000 x 0-600 in our case)
 * - Elements positioned using these coordinates
 * - SVG scales to fit container while maintaining aspect ratio
 * 
 * Why SVG over Canvas?
 * - SVG elements are DOM elements (can use CSS, events)
 * - Better for interactive graphics with hover/click
 * - Accessible (screen readers can read SVG text)
 * - Canvas better for many particles (like ParticleAnimation)
 * 
 * Connection Algorithm:
 * - Each skill defines which skills it connects to
 * - We avoid duplicates by sorting IDs and tracking processed pairs
 * - Lines drawn from center of one node to center of another
 * 
 * Hover State Management:
 * - Use SolidJS signals for reactive state
 * - hoveredSkill tracks currently hovered node
 * - activeConnections tracks which nodes to highlight
 * - All animations use CSS transitions for smooth 60fps
 * 
 * Performance Optimizations:
 * - Use CSS transforms (GPU accelerated)
 * - Transition-all for smooth state changes
 * - SVG animations use SMIL (built-in, performant)
 * - No JavaScript animation loops needed!
 */
