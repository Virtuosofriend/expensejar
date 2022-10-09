/** @type {import('tailwindcss').Config} */
module.exports = {
    content: [
        "./index.html",
        "./src/**/*.{vue,js,ts,jsx,tsx}",
      ],
    theme: {
        colors: {
            "primary":      "#3154AC",
            "secondary":    "#CCDAFC",
            "accent":       "#f7ac1a",
            "white":        "#fff"
          },
        fontFamily: {
            sans: ["Poppins", "sans-serif"],
        },
        extend: {},
    },
    plugins: [],
}
