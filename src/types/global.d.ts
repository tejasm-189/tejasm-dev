/**
 * CSS Module Type Declarations
 * Tells TypeScript that .css file imports are valid
 */

declare module "*.css" {
  const content: { [className: string]: string };
  export default content;
}

declare module "*.scss" {
  const content: { [className: string]: string };
  export default content;
}

declare module "*.sass" {
  const content: { [className: string]: string };
  export default content;
}

/**
 * UnoCSS Virtual Module
 * Declares the virtual:uno.css module for UnoCSS
 */
declare module 'virtual:uno.css' {
  const content: string;
  export default content;
}
