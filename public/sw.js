if(!self.define){let e,a={};const i=(i,s)=>(i=new URL(i+".js",s).href,a[i]||new Promise((a=>{if("document"in self){const e=document.createElement("script");e.src=i,e.onload=a,document.head.appendChild(e)}else e=i,importScripts(i),a()})).then((()=>{let e=a[i];if(!e)throw new Error(`Module ${i} didn’t register its module`);return e})));self.define=(s,c)=>{const t=e||("document"in self?document.currentScript.src:"")||location.href;if(a[t])return;let n={};const d=e=>i(e,t),r={module:{uri:t},exports:n,require:d};a[t]=Promise.all(s.map((e=>r[e]||d(e)))).then((e=>(c(...e),n)))}}define(["./workbox-4754cb34"],(function(e){"use strict";importScripts(),self.skipWaiting(),e.clientsClaim(),e.precacheAndRoute([{url:"/_next/app-build-manifest.json",revision:"c56547667e69c115b1019620d556bc40"},{url:"/_next/static/EgKoY3W4ClqHRf2bp1UMY/_buildManifest.js",revision:"0ea7e7088aabf697ba3d8aa8c7b54a89"},{url:"/_next/static/EgKoY3W4ClqHRf2bp1UMY/_ssgManifest.js",revision:"b6652df95db52feb4daf4eca35380933"},{url:"/_next/static/chunks/1441-635b2a5e616015ad.js",revision:"EgKoY3W4ClqHRf2bp1UMY"},{url:"/_next/static/chunks/2117-b7c9951bfa795039.js",revision:"EgKoY3W4ClqHRf2bp1UMY"},{url:"/_next/static/chunks/2581-ff441385c1ce6304.js",revision:"EgKoY3W4ClqHRf2bp1UMY"},{url:"/_next/static/chunks/3145-0e6a0e6e865de8de.js",revision:"EgKoY3W4ClqHRf2bp1UMY"},{url:"/_next/static/chunks/3464-b30299887b4c4352.js",revision:"EgKoY3W4ClqHRf2bp1UMY"},{url:"/_next/static/chunks/3959-a447c495a4330c9c.js",revision:"EgKoY3W4ClqHRf2bp1UMY"},{url:"/_next/static/chunks/6466-719b87e2231a3cbf.js",revision:"EgKoY3W4ClqHRf2bp1UMY"},{url:"/_next/static/chunks/7274-e5d40a5dedec9c19.js",revision:"EgKoY3W4ClqHRf2bp1UMY"},{url:"/_next/static/chunks/7706-12f418028296c0c7.js",revision:"EgKoY3W4ClqHRf2bp1UMY"},{url:"/_next/static/chunks/7819-a035ed10c9400977.js",revision:"EgKoY3W4ClqHRf2bp1UMY"},{url:"/_next/static/chunks/82-4008cd80f7747066.js",revision:"EgKoY3W4ClqHRf2bp1UMY"},{url:"/_next/static/chunks/8600-cf85bdf2dd1f1bd7.js",revision:"EgKoY3W4ClqHRf2bp1UMY"},{url:"/_next/static/chunks/8848-aec552b5ef02397a.js",revision:"EgKoY3W4ClqHRf2bp1UMY"},{url:"/_next/static/chunks/8891-2a74300bfd6324d8.js",revision:"EgKoY3W4ClqHRf2bp1UMY"},{url:"/_next/static/chunks/9523-5cf66f01cf98d551.js",revision:"EgKoY3W4ClqHRf2bp1UMY"},{url:"/_next/static/chunks/a4634e51-87b88e618aaf9bf2.js",revision:"EgKoY3W4ClqHRf2bp1UMY"},{url:"/_next/static/chunks/app/_not-found/page-9351c960feac64b6.js",revision:"EgKoY3W4ClqHRf2bp1UMY"},{url:"/_next/static/chunks/app/already-verified/page-a12a7b6500b863d0.js",revision:"EgKoY3W4ClqHRf2bp1UMY"},{url:"/_next/static/chunks/app/auth/email-verified/page-85ca05960f48ef08.js",revision:"EgKoY3W4ClqHRf2bp1UMY"},{url:"/_next/static/chunks/app/auth/email-verify/page-cd0cb4caec66c14b.js",revision:"EgKoY3W4ClqHRf2bp1UMY"},{url:"/_next/static/chunks/app/auth/mobile-verification/page-adc2f28a92a0381c.js",revision:"EgKoY3W4ClqHRf2bp1UMY"},{url:"/_next/static/chunks/app/auth/reset-password-sucess/page-7f89b2db418145e6.js",revision:"EgKoY3W4ClqHRf2bp1UMY"},{url:"/_next/static/chunks/app/auth/reset-password/page-7e3b0c8c1f1e41fd.js",revision:"EgKoY3W4ClqHRf2bp1UMY"},{url:"/_next/static/chunks/app/auth/sso-verify/page-9d10a1ca1e33594f.js",revision:"EgKoY3W4ClqHRf2bp1UMY"},{url:"/_next/static/chunks/app/auth/update-password/page-7445ed9fbb9944ca.js",revision:"EgKoY3W4ClqHRf2bp1UMY"},{url:"/_next/static/chunks/app/auth/user-auth/page-086340f10197bedc.js",revision:"EgKoY3W4ClqHRf2bp1UMY"},{url:"/_next/static/chunks/app/auth/user-information/page-0859c4b094dd52bc.js",revision:"EgKoY3W4ClqHRf2bp1UMY"},{url:"/_next/static/chunks/app/dashboard/page-3f3300e35ebb9c5e.js",revision:"EgKoY3W4ClqHRf2bp1UMY"},{url:"/_next/static/chunks/app/flix-video/%5Bflix%5D/page-1a6a9349f06b640b.js",revision:"EgKoY3W4ClqHRf2bp1UMY"},{url:"/_next/static/chunks/app/flix-video/page-8db052de35ca69a3.js",revision:"EgKoY3W4ClqHRf2bp1UMY"},{url:"/_next/static/chunks/app/flix/%5Bblog%5D/page-e57c5e8159ed0680.js",revision:"EgKoY3W4ClqHRf2bp1UMY"},{url:"/_next/static/chunks/app/flix/page-62118040a65ab2b6.js",revision:"EgKoY3W4ClqHRf2bp1UMY"},{url:"/_next/static/chunks/app/giftcard/page-ab0a95f067cb3a26.js",revision:"EgKoY3W4ClqHRf2bp1UMY"},{url:"/_next/static/chunks/app/landing-page/page-b11139cbc707f5ba.js",revision:"EgKoY3W4ClqHRf2bp1UMY"},{url:"/_next/static/chunks/app/layout-59e490b48b44be58.js",revision:"EgKoY3W4ClqHRf2bp1UMY"},{url:"/_next/static/chunks/app/my-account/help/page-52b589bb8aaf089a.js",revision:"EgKoY3W4ClqHRf2bp1UMY"},{url:"/_next/static/chunks/app/my-account/legal/cookies-policy/page-97d8fb02aed55e0a.js",revision:"EgKoY3W4ClqHRf2bp1UMY"},{url:"/_next/static/chunks/app/my-account/legal/page-8eb94a7f975791ae.js",revision:"EgKoY3W4ClqHRf2bp1UMY"},{url:"/_next/static/chunks/app/my-account/legal/privacy-policy/page-ccd673313532bcb6.js",revision:"EgKoY3W4ClqHRf2bp1UMY"},{url:"/_next/static/chunks/app/my-account/legal/shipping-return-refund/page-a44880f8b740ada1.js",revision:"EgKoY3W4ClqHRf2bp1UMY"},{url:"/_next/static/chunks/app/my-account/legal/terms-of-use/page-8c2a3bb75c7544eb.js",revision:"EgKoY3W4ClqHRf2bp1UMY"},{url:"/_next/static/chunks/app/my-account/new-user/page-bae1d543b20c5b15.js",revision:"EgKoY3W4ClqHRf2bp1UMY"},{url:"/_next/static/chunks/app/my-account/orders/%5BorderId%5D/page-2ef44cd667e14d82.js",revision:"EgKoY3W4ClqHRf2bp1UMY"},{url:"/_next/static/chunks/app/my-account/orders/page-681d003deb643109.js",revision:"EgKoY3W4ClqHRf2bp1UMY"},{url:"/_next/static/chunks/app/my-account/page-7259b839476cdf88.js",revision:"EgKoY3W4ClqHRf2bp1UMY"},{url:"/_next/static/chunks/app/my-account/settings-activity/change-password/page-5ad182b71e8efb8d.js",revision:"EgKoY3W4ClqHRf2bp1UMY"},{url:"/_next/static/chunks/app/my-account/settings-activity/manage-address/page-97dac12870d27973.js",revision:"EgKoY3W4ClqHRf2bp1UMY"},{url:"/_next/static/chunks/app/my-account/settings-activity/page-0fb66d5dec78899d.js",revision:"EgKoY3W4ClqHRf2bp1UMY"},{url:"/_next/static/chunks/app/my-account/settings-activity/personal-info/page-7a56e1ae79f72ea9.js",revision:"EgKoY3W4ClqHRf2bp1UMY"},{url:"/_next/static/chunks/app/page-66fd9889b1fb2947.js",revision:"EgKoY3W4ClqHRf2bp1UMY"},{url:"/_next/static/chunks/app/store/brand-page/page-29a5864cb219fef4.js",revision:"EgKoY3W4ClqHRf2bp1UMY"},{url:"/_next/static/chunks/app/store/checkout/page-7ee5a2b33f591cb3.js",revision:"EgKoY3W4ClqHRf2bp1UMY"},{url:"/_next/static/chunks/app/store/home/page-45de512db0397a0f.js",revision:"EgKoY3W4ClqHRf2bp1UMY"},{url:"/_next/static/chunks/app/store/my-favourites/page-863b644c9cc53bee.js",revision:"EgKoY3W4ClqHRf2bp1UMY"},{url:"/_next/static/chunks/app/store/order-complete/page-47360e83cdbe2477.js",revision:"EgKoY3W4ClqHRf2bp1UMY"},{url:"/_next/static/chunks/app/store/order-fail/page-b7db8f5b031464ef.js",revision:"EgKoY3W4ClqHRf2bp1UMY"},{url:"/_next/static/chunks/app/store/product/page-444e89be143ead76.js",revision:"EgKoY3W4ClqHRf2bp1UMY"},{url:"/_next/static/chunks/app/store/shopping-bag/page-84dffd10a1b93ea2.js",revision:"EgKoY3W4ClqHRf2bp1UMY"},{url:"/_next/static/chunks/app/store/user-info/page-0961cab7a6d8e3f6.js",revision:"EgKoY3W4ClqHRf2bp1UMY"},{url:"/_next/static/chunks/app/test/page-3ad4b1403b5236cf.js",revision:"EgKoY3W4ClqHRf2bp1UMY"},{url:"/_next/static/chunks/dc112a36-1dbf7d9cf07b31e7.js",revision:"EgKoY3W4ClqHRf2bp1UMY"},{url:"/_next/static/chunks/fd9d1056-60b369c71ec3d502.js",revision:"EgKoY3W4ClqHRf2bp1UMY"},{url:"/_next/static/chunks/framework-a63c59c368572696.js",revision:"EgKoY3W4ClqHRf2bp1UMY"},{url:"/_next/static/chunks/main-3ff43bb06798adf6.js",revision:"EgKoY3W4ClqHRf2bp1UMY"},{url:"/_next/static/chunks/main-app-ad7cb9276af5eb1a.js",revision:"EgKoY3W4ClqHRf2bp1UMY"},{url:"/_next/static/chunks/pages/_app-78ddf957b9a9b996.js",revision:"EgKoY3W4ClqHRf2bp1UMY"},{url:"/_next/static/chunks/pages/_error-7ce03bcf1df914ce.js",revision:"EgKoY3W4ClqHRf2bp1UMY"},{url:"/_next/static/chunks/polyfills-42372ed130431b0a.js",revision:"846118c33b2c0e922d7b3a7676f81f6f"},{url:"/_next/static/chunks/webpack-349425ea17ac6b8d.js",revision:"EgKoY3W4ClqHRf2bp1UMY"},{url:"/_next/static/css/0bf0d809be7499ef.css",revision:"0bf0d809be7499ef"},{url:"/_next/static/css/18a9530b696e91d5.css",revision:"18a9530b696e91d5"},{url:"/_next/static/css/2ce36b9f775ccdeb.css",revision:"2ce36b9f775ccdeb"},{url:"/_next/static/css/dee07dab036814b2.css",revision:"dee07dab036814b2"},{url:"/_next/static/media/034043092db1e233-s.woff2",revision:"985e9b4713be3b0c3210a2f4a316492d"},{url:"/_next/static/media/2b3f1035ed87a788-s.p.woff2",revision:"03e877e75c5a1213e13a56b59471c946"},{url:"/_next/static/media/537ed09c342ae4cd-s.woff2",revision:"3182c01db96784c01bba69455b2a85ab"},{url:"/_next/static/media/65053818c3abcf97-s.woff2",revision:"9b02c436a26a8afe2e94314fdaa6d6bd"},{url:"/_next/static/media/7013d1721469198f-s.woff2",revision:"7bfe4d64303287960c663ccb3ec5921c"},{url:"/_next/static/media/96852685ad82bf30-s.woff2",revision:"71ff9dfab4885ce3ff1a6c351be1bd9b"},{url:"/_next/static/media/Audience Insights.5ad29bce.png",revision:"5dd1b4827852e5067fa9d410ff0687ee"},{url:"/_next/static/media/Availability.25b81396.svg",revision:"a7d66077de9cb184563506d491f2efa5"},{url:"/_next/static/media/Badge.402e6b3d.png",revision:"d494f2fac6076d94078bf444354ba263"},{url:"/_next/static/media/Checkbox-light.aa53abec.svg",revision:"6de1e2c24f8add7aea17881b293be083"},{url:"/_next/static/media/Dash1.533ea87b.jpg",revision:"2093706e449712701b7c8104f0e386df"},{url:"/_next/static/media/FlixPerformance.609e1c68.png",revision:"d572a4f0b7cdf9661da5ecffb91c07c2"},{url:"/_next/static/media/MostActive times.6680ce63.png",revision:"8ff739b7aa0e74a1f3af4b28a47c0117"},{url:"/_next/static/media/Offer.46122692.svg",revision:"de69fbf2862aa1543b456dca40783bf4"},{url:"/_next/static/media/Payppy-Logo-white.164c6e75.svg",revision:"a82ffd36e757a4ec49b83c62d99e0ca7"},{url:"/_next/static/media/Subtract.5a1ef75b.svg",revision:"def2eb87ea256e632a0aea1cddd1218f"},{url:"/_next/static/media/about-us-icon.49a74a2b.svg",revision:"e08d2b238938add421e3f9d511fac8f2"},{url:"/_next/static/media/account-icon-dark.60c43d73.svg",revision:"9eb13184e94d42e745aae475c3d2c88d"},{url:"/_next/static/media/account-icon-light.5c366be1.svg",revision:"2314025071a4473774d9b0d28ca0ec25"},{url:"/_next/static/media/alert-circle.22f6a7df.svg",revision:"27028bcc20918a47489f46f623c50b68"},{url:"/_next/static/media/arrow-down-icon.7e474f95.svg",revision:"f484c35887f8da165c1dd1f48fca6954"},{url:"/_next/static/media/arrow-icon.df73473e.svg",revision:"d6228cc3ea58676557aefa442efac493"},{url:"/_next/static/media/arrow-left-new.e62b6446.svg",revision:"db7836bbfea9d925b77410dabf879510"},{url:"/_next/static/media/arrow-left.cc9b3524.svg",revision:"82145a8eda3351af6221f6488db8f360"},{url:"/_next/static/media/arrow-right.fb6d577a.svg",revision:"606edea9d61b9beab298e2619e6e3c95"},{url:"/_next/static/media/arrow-up-icon.ed16010f.svg",revision:"dd4050cf29b6b2e1ce13ddddd0bdeb18"},{url:"/_next/static/media/availability.7f0f3037.svg",revision:"a71192e502b8d0989cee978241168017"},{url:"/_next/static/media/bag-icon-dark.4798dab4.svg",revision:"e9954d8f9adfba2f7bfdae29e4f3697f"},{url:"/_next/static/media/bag-icon-light.8ad1d66e.svg",revision:"a00e88ff6ee55da7b72568d557bbf63d"},{url:"/_next/static/media/bill-coming-icon.4e0010e2.svg",revision:"c8ef04b3747866aa0b5854ba7f732841"},{url:"/_next/static/media/bill-icon-dark.06561926.svg",revision:"d4f596f295b977888f72761e1c56b1be"},{url:"/_next/static/media/bill-icon-light.bd8803be.svg",revision:"d1e59f0eb88890027ac2a838d32fb5a9"},{url:"/_next/static/media/bills-icon.0856ecca.svg",revision:"8bf27a3fe69f38d2b9d369fcc57d9a44"},{url:"/_next/static/media/bookmark-active-light.76b04cae.svg",revision:"aeba14868d5ed71af80e8fcc71c3d62b"},{url:"/_next/static/media/bookmark-light.5fd4ceb2.svg",revision:"7b5d8af43c3c0a769e348090dca9edb9"},{url:"/_next/static/media/bookmark.349cb0ee.svg",revision:"4ce1b1d8773f8f939e15d2ccbc69f9e3"},{url:"/_next/static/media/border-img.9d654991.svg",revision:"08f6dad7beac03c99e1f7d1960ec6f5e"},{url:"/_next/static/media/check-grey.09004a0a.svg",revision:"5f1be063d8e4a78d519f711351260b57"},{url:"/_next/static/media/check-icon.cbd29509.svg",revision:"6885e2a00a9d2602c62686dbfd996917"},{url:"/_next/static/media/check-line.c8c1548d.svg",revision:"82ad50116e8912dc7a226653a0d3ed09"},{url:"/_next/static/media/check-round-icon.db3036f8.svg",revision:"575745740510dc0ce1c97752ef72d7f5"},{url:"/_next/static/media/checkbox-green.ccf02c1a.svg",revision:"15897a6a3f621be30f5d750cdca6d40c"},{url:"/_next/static/media/chevron-icon.91f956b0.svg",revision:"1824daa246fed6070c0f816e9c28de5c"},{url:"/_next/static/media/chevron-right-icon-dark.3b49c468.svg",revision:"2d1b840feed81d6f2b7bc7f2ed815335"},{url:"/_next/static/media/chevron-up.0ea8ee9c.svg",revision:"7f67edf41022ebad9326e7c4c8994855"},{url:"/_next/static/media/close-icon-new.e62b6446.svg",revision:"db7836bbfea9d925b77410dabf879510"},{url:"/_next/static/media/close-icon.e41573e2.svg",revision:"82c89008aab56e7b18e1870d40f4894a"},{url:"/_next/static/media/close-icon.f9485e66.svg",revision:"200bc89261ee90bafc685ce15bba750b"},{url:"/_next/static/media/cookie-policy-icon.91bd1436.svg",revision:"c2a2abd035ac7ba38ea9b015ff299237"},{url:"/_next/static/media/coupon-cross.22eb35a2.svg",revision:"29039feac810d54c2d0c6e154438927d"},{url:"/_next/static/media/cross-round-icon.d8b998eb.svg",revision:"4589bec32ed6eb88017c70a2694815aa"},{url:"/_next/static/media/daff7fa1b832395c-s.p.woff2",revision:"5d9072719934e801a8fbe3158b364f7e"},{url:"/_next/static/media/e84f99245722bc6a-s.woff2",revision:"5a735e6483122976d0ecaad791f52ade"},{url:"/_next/static/media/e989c84a49fc684e-s.woff2",revision:"0a66f0a58fbfcc7ea6d0412b7211d3e1"},{url:"/_next/static/media/edit-icon.73c58d17.svg",revision:"fb186a131b10908957c1e413ea81a4b1"},{url:"/_next/static/media/eed6db14ac3b93a0-s.woff2",revision:"bf5e9d3da99a28e7391571987186e6ea"},{url:"/_next/static/media/fd713037c2390b5b-s.woff2",revision:"2d92d4b34a65a4c9ba87fa0add558195"},{url:"/_next/static/media/flix-icon-dark.72567809.svg",revision:"c197c5ce66eb30d93df1735728349521"},{url:"/_next/static/media/flix-icon-light.5382123d.svg",revision:"455bdaf7345789c5053112ba584ff084"},{url:"/_next/static/media/flix-icon.00680989.svg",revision:"00fb0eeccada40eb27cb1e7b5559d831"},{url:"/_next/static/media/gift-icon.02a49788.svg",revision:"0d3b64adc64eb25a26ac0369cd9c7b45"},{url:"/_next/static/media/google-icon.16725320.svg",revision:"f23404a35e144dd7ae29b30a8372c0eb"},{url:"/_next/static/media/heart.f737b47b.svg",revision:"b7c1c0076b5147c34b68dcc114b4c3d5"},{url:"/_next/static/media/help-icon.a82ee80a.svg",revision:"9d2fcdad55aedcbaf2829b4ea309b244"},{url:"/_next/static/media/home-icon-dark.00afed94.svg",revision:"d2e3136566bd5720d824da120143acb0"},{url:"/_next/static/media/home-icon-light.7c163c4d.svg",revision:"721388245c2e0f828c099eab52b173f8"},{url:"/_next/static/media/home-image.1e6cae2f.jpg",revision:"fb9bbf8fe4c072d156bd8daded49bf54"},{url:"/_next/static/media/hot-and-cool-logo.3dc1ac57.png",revision:"719796f60544dc1b95108da1778f54f9"},{url:"/_next/static/media/insta.fc6da2f8.svg",revision:"fcf2597db55b8db832f629c9fd5f2d27"},{url:"/_next/static/media/instagram-icon.bcc36972.svg",revision:"ee172804df9bb18ebfc68c8a562cb7f2"},{url:"/_next/static/media/instock-green-circle.7d2eab1d.svg",revision:"6592d412c8d10d031fd0507ed67551ff"},{url:"/_next/static/media/jacket.dadc4df8.jpg",revision:"729df5d1f7559b15fbeb1f43adcb4b80"},{url:"/_next/static/media/like-active-light.a931c04e.svg",revision:"80eb6812d38835397c49d6848fb7380e"},{url:"/_next/static/media/like-light.2e7ed31f.svg",revision:"ccdcac864bbc9b3fa7762527ffe4facb"},{url:"/_next/static/media/location.993ddca3.svg",revision:"043b4768842d688381c00f763564c43f"},{url:"/_next/static/media/logo-mark-white.e3eb371f.svg",revision:"81f27a292690e87e279b3f65eb9e95c3"},{url:"/_next/static/media/logout-icon.796f3886.svg",revision:"4e0d1dc5767c7957b94c24b0593fc826"},{url:"/_next/static/media/more-icon.ae36ff3a.svg",revision:"80bbe857ad3c319f3de18e61f7b8e9e6"},{url:"/_next/static/media/multi-view-active-filter.b0df1638.svg",revision:"e7e4b49977459a1e54278516a1c2f1fa"},{url:"/_next/static/media/multi-view-filter.98315f5f.svg",revision:"5e71af4d71659c6913c047026453c6f7"},{url:"/_next/static/media/order-icon.18492d61.svg",revision:"7e887bb95b419a1db7e7b0cb147b60a7"},{url:"/_next/static/media/order-success.0e883184.svg",revision:"3816afc8419dd471fba71ac8ea1b03e3"},{url:"/_next/static/media/pant.631f9f00.jpg",revision:"206a73dc1a5c65955abc5dea62e93a12"},{url:"/_next/static/media/pause-icon.23caf8d6.svg",revision:"aa20897f96c10638acadf6cf78f7224d"},{url:"/_next/static/media/payppy-logo.a9baef72.svg",revision:"a2fe1587747f4edab61e6b5810dbb7eb"},{url:"/_next/static/media/play-icon.a3e46f46.svg",revision:"5b5f26b5eb52b29334a801bcc7bcd8b5"},{url:"/_next/static/media/play.c8b32d5b.svg",revision:"597ea025a07c360f901b05ed858c2938"},{url:"/_next/static/media/policy-icon.5789113e.svg",revision:"9cfcaf1ca0c90d21d5f28736d5db01c7"},{url:"/_next/static/media/powered-by-bc-icon.347d5ff9.svg",revision:"512adb5f56d1cef81522be0fe535b660"},{url:"/_next/static/media/privacy-policy-icon.74ad563b.svg",revision:"d4b6bea0279d3d4b9a6696b65206738e"},{url:"/_next/static/media/razorpay-logo.1c2f036d.svg",revision:"7d18e85076cc772d05e651176edadf48"},{url:"/_next/static/media/save-on-your-phone-icon.70e91082.png",revision:"47616fb5d2fd9078044c946c5066cc25"},{url:"/_next/static/media/setting-icon.06401a3e.svg",revision:"9811539597b6eebbbfb2029542920ba1"},{url:"/_next/static/media/share-icon.7bf8096c.svg",revision:"d7a117d2a365c30a3a7844e4b6f1d02c"},{url:"/_next/static/media/share-light.4fada5a0.svg",revision:"894200f603eb42e3f7b0974db55b4893"},{url:"/_next/static/media/shipping-and-returns-icon.8bded05d.svg",revision:"8120fe03f67492060f1f2c4119d5b46c"},{url:"/_next/static/media/shopping-bag.4c453e13.svg",revision:"e552147f5bea03d4146874ca2ddff20e"},{url:"/_next/static/media/shopping-cart.0564ed28.svg",revision:"7dfe89d04a06d084a7de1d3474c0f79a"},{url:"/_next/static/media/shopping-icon.42070425.svg",revision:"3de5f710edd1e16626ad95a956bfec2b"},{url:"/_next/static/media/single-view-active-filter.e2076a67.svg",revision:"07bba8bf4e4906935a728235ca078a1a"},{url:"/_next/static/media/single-view-filter.3277f580.svg",revision:"e606427bf0f201ecefaaaa99bb1ce2ad"},{url:"/_next/static/media/store-icon.b1c5f743.svg",revision:"08cfe94edc9c8a0b7628840ab0ba54ce"},{url:"/_next/static/media/terms-of-use-icon.b776a5be.svg",revision:"52bf7d2d6a11bf407b27e8d9882d4d45"},{url:"/_next/static/media/twitter.b1463bdd.svg",revision:"e1c55bc5c340ac66d0525b23214bb8a3"},{url:"/_next/static/media/up-right-arrow-icon.f5ba47c0.svg",revision:"26c427bf603f1dca8343c2faf007d22e"},{url:"/_next/static/media/user-circle.f6a3f611.svg",revision:"e0e0bb81fc8c97c25a4c89ebd0c54941"},{url:"/_next/static/media/verified.3a29565f.svg",revision:"98f02a8530d7baace637a26d0b50fab0"},{url:"/_next/static/media/volume-mute.7130e3f3.svg",revision:"2de82fa5d3d78ac4cc69c873c9611897"},{url:"/_next/static/media/volume-on-icon.20064690.svg",revision:"37710f52b2699b368e3915e21a05060f"},{url:"/_next/static/media/voucher-icon.f4f07327.svg",revision:"c75a565f5bb8bb083c8daef9c4d0f917"},{url:"/_next/static/media/wishlist-toggle-active.fb6aa3f5.svg",revision:"b75d259862a9e3cb7497bed5837974d3"},{url:"/_next/static/media/wishlist-toggle-green.6945d606.svg",revision:"b9579a3e9ace8359a4ba6978283bcbd1"},{url:"/_next/static/media/wishlist-toggle-transparent.97e135de.svg",revision:"baa69a1006cad8fb149fd1357fa5375a"},{url:"/_next/static/media/wishlist-toggle-white.3f7d2927.svg",revision:"4c307accd80ca35b789f41733a8e6d6a"},{url:"/_next/static/media/youtube-icon.34b9d07a.svg",revision:"020d7dee4a7d8830a76857610ae7cae6"},{url:"/_next/static/media/zomato-logo.d4379e8f.svg",revision:"9c64e05e5d1945f7760ff9503de88e9c"},{url:"/flix-sample.mp4",revision:"4831bcd5604844f928aba9d0327a56b5"},{url:"/google1ee582c84529d0d1.html",revision:"63550687c97edce94bdbe0f75202388c"},{url:"/icons/icon-192.png",revision:"174f7014b1672897ac4ba7b1e4d13859"},{url:"/icons/icon-512.png",revision:"c45607f0b088701aec46310ee248f826"},{url:"/landingpage-video.mp4",revision:"775737ade3305b3754acb2ffa6b11bc9"},{url:"/manifest.json",revision:"7625148a66eec1b32e2b6b26fec1eaa2"}],{ignoreURLParametersMatching:[]}),e.cleanupOutdatedCaches(),e.registerRoute("/",new e.NetworkFirst({cacheName:"start-url",plugins:[{cacheWillUpdate:async({request:e,response:a,event:i,state:s})=>a&&"opaqueredirect"===a.type?new Response(a.body,{status:200,statusText:"OK",headers:a.headers}):a}]}),"GET"),e.registerRoute(/^https:\/\/fonts\.(?:gstatic)\.com\/.*/i,new e.CacheFirst({cacheName:"google-fonts-webfonts",plugins:[new e.ExpirationPlugin({maxEntries:4,maxAgeSeconds:31536e3})]}),"GET"),e.registerRoute(/^https:\/\/fonts\.(?:googleapis)\.com\/.*/i,new e.StaleWhileRevalidate({cacheName:"google-fonts-stylesheets",plugins:[new e.ExpirationPlugin({maxEntries:4,maxAgeSeconds:604800})]}),"GET"),e.registerRoute(/\.(?:eot|otf|ttc|ttf|woff|woff2|font.css)$/i,new e.StaleWhileRevalidate({cacheName:"static-font-assets",plugins:[new e.ExpirationPlugin({maxEntries:4,maxAgeSeconds:604800})]}),"GET"),e.registerRoute(/\.(?:jpg|jpeg|gif|png|svg|ico|webp)$/i,new e.StaleWhileRevalidate({cacheName:"static-image-assets",plugins:[new e.ExpirationPlugin({maxEntries:64,maxAgeSeconds:86400})]}),"GET"),e.registerRoute(/\/_next\/image\?url=.+$/i,new e.StaleWhileRevalidate({cacheName:"next-image",plugins:[new e.ExpirationPlugin({maxEntries:64,maxAgeSeconds:86400})]}),"GET"),e.registerRoute(/\.(?:mp3|wav|ogg)$/i,new e.CacheFirst({cacheName:"static-audio-assets",plugins:[new e.RangeRequestsPlugin,new e.ExpirationPlugin({maxEntries:32,maxAgeSeconds:86400})]}),"GET"),e.registerRoute(/\.(?:mp4)$/i,new e.CacheFirst({cacheName:"static-video-assets",plugins:[new e.RangeRequestsPlugin,new e.ExpirationPlugin({maxEntries:32,maxAgeSeconds:86400})]}),"GET"),e.registerRoute(/\.(?:js)$/i,new e.StaleWhileRevalidate({cacheName:"static-js-assets",plugins:[new e.ExpirationPlugin({maxEntries:32,maxAgeSeconds:86400})]}),"GET"),e.registerRoute(/\.(?:css|less)$/i,new e.StaleWhileRevalidate({cacheName:"static-style-assets",plugins:[new e.ExpirationPlugin({maxEntries:32,maxAgeSeconds:86400})]}),"GET"),e.registerRoute(/\/_next\/data\/.+\/.+\.json$/i,new e.StaleWhileRevalidate({cacheName:"next-data",plugins:[new e.ExpirationPlugin({maxEntries:32,maxAgeSeconds:86400})]}),"GET"),e.registerRoute(/\.(?:json|xml|csv)$/i,new e.NetworkFirst({cacheName:"static-data-assets",plugins:[new e.ExpirationPlugin({maxEntries:32,maxAgeSeconds:86400})]}),"GET"),e.registerRoute((({url:e})=>{if(!(self.origin===e.origin))return!1;const a=e.pathname;return!a.startsWith("/api/auth/")&&!!a.startsWith("/api/")}),new e.NetworkFirst({cacheName:"apis",networkTimeoutSeconds:10,plugins:[new e.ExpirationPlugin({maxEntries:16,maxAgeSeconds:86400})]}),"GET"),e.registerRoute((({url:e})=>{if(!(self.origin===e.origin))return!1;return!e.pathname.startsWith("/api/")}),new e.NetworkFirst({cacheName:"others",networkTimeoutSeconds:10,plugins:[new e.ExpirationPlugin({maxEntries:32,maxAgeSeconds:86400})]}),"GET"),e.registerRoute((({url:e})=>!(self.origin===e.origin)),new e.NetworkFirst({cacheName:"cross-origin",networkTimeoutSeconds:10,plugins:[new e.ExpirationPlugin({maxEntries:32,maxAgeSeconds:3600})]}),"GET")}));
