/** @type {import('tailwindcss').Config} */
module.exports = {
    content: ["./src/**/*.{js,jsx,ts,tsx}"],
    theme: {
        extend: {
            colors: {
                customRed: "#CE2A3A",
                customBeige: "#F7E5BD",
                customGray: "#333333",
                customBlack: "#000000",
            },
            fontFamily: {
                "source-sans": ["Source Sans Pro", "sans-serif"],
            },
            backgroundImage: {
                "event": "url('https://res.cloudinary.com/ds41xxspf/image/upload/v1669831211/Donde-Suena-Assets/wallpaperflare.com_wallpaper_rg8fgx.jpg')",
                "profile": "url('https://res.cloudinary.com/ds41xxspf/image/upload/v1669838995/Donde-Suena-Assets/212434-music-festival-concert-blackandwhite-and-music-hd_vvauhz.jpg')"
            }
        },
    },
    plugins: [],
};
