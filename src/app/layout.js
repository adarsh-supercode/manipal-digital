import "./globals.css";
import 'bootstrap/dist/css/bootstrap.min.css'
import HeaderMain from "./components/Header/page";
import LenisScroll from "./components/LenisScroll";
import FooterMain from "./components/Footer/Page";
import CustomCursor from "./components/Cursor/CustomCursor";
import AnimationManager from "./components/AnimationManager";
import Script from "next/script";


export const metadata = {
  title: "Manipal Digital",
  description: "Design, Production & Amplification Solutions",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
        {/* <link rel="icon" type="image/svg+xml" href="/favicon.svg" /> */}
        {/* <link rel="icon" type="image/x-icon" href="/favicon.ico" /> */}
        {/* <link rel="icon" type="image/png" href="/favicon.png" /> */}
        <link rel="icon" type="image/png" href="/favicon.png" />
        <link rel="icon" type="image/svg+xml" href="/favicon.svg" />
        <link rel="shortcut icon" href="/favicon.ico" />
      </head>
        <body>
        <Script
          id="google-tag-script"
          strategy="beforeInteractive"
          dangerouslySetInnerHTML={{
            __html: `
              function gtag(){dataLayer.push(arguments);}
                (function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
                new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
                j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
                'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
                })(window,document,'script','dataLayer','GTM-WPRL48GH')
            `,
          }}
        />
        <noscript><iframe src="https://www.googletagmanager.com/ns.html?id=GTM-WPRL48GH"
        height="0" width="0" style={{display:"none",visibility:"hidden"}}></iframe></noscript>
        <CustomCursor />
        <LenisScroll>
          <HeaderMain />
            <AnimationManager>
            {children}
            </AnimationManager>
          <FooterMain />
        </LenisScroll>

      </body>

    </html>
  );
}
