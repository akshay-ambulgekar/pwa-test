// import BillPayModal from '@/Components/BillPayModal';
import PWAInstallPrompt from '@/Components/PWAInstallPrompt';
import { GoogleAnalytics } from '@next/third-parties/google';
import { Plus_Jakarta_Sans } from "next/font/google";

import '@/Styles/tailwindcss.css';
import '@/Styles/Typography.css';

import PropTypes from 'prop-types';


export const metadata = {
  title: "Payppy",
  description: "Payppy.app — India’s First Fashion Fintech for Gen Z",
  viewport: "width=device-width, initial-scale=1.0",
  generator: "Next.js",
  manifest: "/manifest.json",
  keywords: ["Payppy", "next14", "pwa", "next-pwa"],
  icons: [
    { rel: "apple-touch-icon", url: "/icons/icon-512.png" },
    { rel: "icon", url: "/icons/icon-512.png" },
  ],
};

const plus_jakarta_sans = Plus_Jakarta_Sans({
  subsets: ['latin'],
  display: 'swap',
});


export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
        <meta name="google-site-verification" content="google1ee582c84529d0d1.html" />

        <script async src="https://www.googletagmanager.com/gtag/js?id=G-LZ6C5TEK7Y"></script>
        {/* <script
          dangerouslySetInnerHTML={{
            __html: `
              window.dataLayer = window.dataLayer || [];
              function gtag(){dataLayer.push(arguments);}
              gtag('js', new Date());
              gtag('config', 'G-LZ6C5TEK7Y');  
            `,
          }}
        /> */}
        <link rel="manifest" href="/manifest.json" />
        <link rel="icon" href="/icons/icon-512.png" />
        <link rel="apple-touch-icon" href="/icons/icon-512.png" />
        <link rel="icon" href="/icon.png" type="image/x-icon" />
        <meta name="google-site-verification" content="bDLpouMDaovFOPr4KUhn0p0KsCG8FoyoY_5LAtfJcfM" />
      </head>
      <body className={" " + plus_jakarta_sans.className}>
        {children}
        <PWAInstallPrompt />
        {/* <Suspense>
            <BillPayModal />
        </Suspense> */}
        <GoogleAnalytics gtmId="G-LZ6C5TEK7Y" />
      </body>
    </html>
  );
}


RootLayout.propTypes = {
  children: PropTypes.any
};







// import { Suspense } from 'react';


// export const metadata = {
//   title: "Create Next App",
//   description: "Generated by create next app",
// };

// export default function RootLayout({ children }) {
//   return (
//     <html lang="en">
//       <body
//         className={``}
//       >
//         {children}
//       </body>
//     </html>
//   );
// }





// 28dec2024 code
// export const metadata = {
//   title: "Payppy",
//   description: "Payppy.app — India’s First Fashion Fintech for Gen Z",
//  viewport: "width=device-width, initial-scale=1.0",
// };


// const plus_jakarta_sans = Plus_Jakarta_Sans({
//   subsets: ['latin'],
//   display: 'swap'
// })

// export default function RootLayout({ children }) {
//   return (

//       <html lang="en">
//       <head>
//         <link rel="icon" href="/icon.png" type="image/x-icon" />
//       </head>
//         <body className={" "+plus_jakarta_sans.className}>
//           {children}
//           {/* <PWAInstallPrompt/> */}
//           {/* <Suspense>
//             <BillPayModal/>
//           </Suspense> */}
//         </body>
//       </html>
//   );
// }

