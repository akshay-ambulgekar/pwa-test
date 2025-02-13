// /** @type {import('next').NextConfig} */
// const nextConfig = {
//     images:{
//         domains:['148.135.138.27','medusa-public-images.s3.eu-west-1.amazonaws.com','localhost','medusa.payppy.in','48.135.138.27','strapi.payppy.app','medusa.payppy.in','medusa.payppy.app']
//     },
//     productionBrowserSourceMaps:false,
//     output: 'standalone', // Use standalone for dynamic server rendering
//     env:{
//         RAZORPAY_KEY:process.env.RAZORPAY_KEY,
//         PUBLISHABLE_KEY:process.env.PUBLISHABLE_KEY,
//         MEDUSA_ENDPOINT:process.env.MEDUSA_ENDPOINT,
//         BACKEND_ENDPOINT:process.env.BACKEND_ENDPOINT,
//         STRAPI_ENDPOINT:process.env.STRAPI_ENDPOINT,

//     }
// };

// export default nextConfig;



/** @type {import('next').NextConfig} */
import withPWA from 'next-pwa';

const nextConfig = {
    distDir: 'build',
    // reactStrictMode: true,
    swcMinify: true,
    compiler: {
        removeConsole: process.env.NODE_ENV !== 'development',
    },

    images: {
        domains: ['148.135.138.27', 'medusa-public-images.s3.eu-west-1.amazonaws.com', 'localhost', 'medusa.payppy.in', '48.135.138.27', 'strapi.payppy.app', 'medusa.payppy.in', 'medusa.payppy.app']
    },
    productionBrowserSourceMaps: false,
    output: 'standalone', // Use standalone for dynamic server rendering
    env: {
        RAZORPAY_KEY: process.env.RAZORPAY_KEY,
        PUBLISHABLE_KEY: process.env.PUBLISHABLE_KEY,
        MEDUSA_ENDPOINT: process.env.MEDUSA_ENDPOINT,
        BACKEND_ENDPOINT: process.env.BACKEND_ENDPOINT,
        STRAPI_ENDPOINT: process.env.STRAPI_ENDPOINT,

    }
};


export default withPWA({
    dest: 'public',
    disable: process.env.NODE_ENV === 'development',
    register: true,
    skipWaiting: true,
})(nextConfig);

