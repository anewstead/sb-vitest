/** @type {import("tailwindcss").Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  // Keep preflight disabled to prevent base style conflicts with MUI
  corePlugins: {
    preflight: false,
  },
};
