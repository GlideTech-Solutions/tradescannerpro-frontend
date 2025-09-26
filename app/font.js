// app/fonts.js
import localFont from "next/font/local";
// import {f1} from './../public/fonts/gotham'
export const gotham = localFont({
 src: [
    { path: "./../public/fonts/gotham/Gotham-Thin.otf",    weight: "100", style: "normal" },
    { path: "./../public/fonts/gotham/GothamLight.ttf",    weight: "300", style: "normal" },
    { path: "./../public/fonts/gotham/GothamBook.ttf",     weight: "400", style: "normal" },
    { path: "./../public/fonts/gotham/GothamMedium.otf",  weight: "500", style: "normal" },
    { path: "./../public/fonts/gotham/Gotham-Bold.otf",    weight: "700", style: "normal" },
    { path: "./../public/fonts/gotham/Gotham-Black.otf",   weight: "900", style: "normal" },
  ],
  variable: "--font-gotham",
  display: "swap",
  preload: true,
});
