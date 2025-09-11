// tailwind.config.js
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          Main: "#11008F",
          Light1: '#F4F2FF',
          Light2:"#DAD3FF",
          Dark: "#07003F"
          
        },
        secondary: {
          Main: "#9D007B",
          Light1:"#FFF4FD",
          Light2: "#FED1F5",
          Dark1: "#62004D"
        },

        Spectrum:{
            White:"#FFFFFF",
            White2:"#FFFFF9",
            Gray1:"#F4F4F4",
            Gray2:"#D1D1D1",
            Gray3:"#838383",
            Gray4:"#4D4D4D",
            Black:"#000000"
        }
      },
    },
  },
  plugins: [],
}
