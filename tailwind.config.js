/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      colors: {
        'souldex-blue': '#45BFDB',
      },
    },
  },
  plugins: [require("daisyui")],
  daisyui: {
    themes: [
      {
        goodnotes: {
          /* The Main Canvas */
          "base-100": "#45BFDB",         // The plane blue background
          "base-200": "#ffffff",         // Solid white for cards/bubbles
          "base-content": "#000000",     // ALL general text is now BLACK

          /* Action Elements */
          "primary": "#000000",          // Black buttons (like "Download today" icons)
          "primary-content": "#ffffff",  // White text/icons on black buttons
          
          /* UI Borders & Accents */
          "neutral": "#000000",          // Used for heavy dividers
          "neutral-content": "#ffffff",
          
          /* Success/Error (Handled like markers) */
          "info": "#000000",
          "success": "#22c55e",
          "warning": "#f59e0b",
          "error": "#ef4444",
        },
      },
    ],
  },
}