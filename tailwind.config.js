/** @type {import('tailwindcss').Config} */
module.exports = {
	darkMode: ["class"],
	content: [
		"./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
		"./src/components/**/*.{js,ts,jsx,tsx,mdx}",
		"./src/Components/**/*.{js,ts,jsx,tsx,mdx}",
		"./src/app/**/*.{js,ts,jsx,tsx,mdx}",
	],
	theme: {
		extend: {
			animation: {
				'slide-in': 'slide-in 0.65s cubic-bezier(0.60, 0, 0.10, 1) both',
				'slide-out': 'slide-out 0.65s cubic-bezier(0.60, 0, 0.10, 1) both',
				'move-out': 'move-out 0.8s linear both',
				'move-in': 'move-in 0.8s cubic-bezier(0.87, 0, 0.13, 1) both',
				'fall-back': 'fall-back 1s cubic-bezier(0.87, 0, 0.13, 1) both',
				'drop-out': 'drop-out 1s cubic-bezier(0.87, 0, 0.13, 1) both',
				'pop-in': 'pop-in 0.4s cubic-bezier(0.87, 0, 0.13, 1) both',
				'come-in': 'come-in 1.4s cubic-bezier(0.87, 0, 0.13, 1) both',
				'fade-back': 'fade-back 1s cubic-bezier(0.87, 0, 0.13, 1) both',
				'accordion-down': 'accordion-down 0.2s ease-out',
				'accordion-up': 'accordion-up 0.2s ease-out',
				'scroll-up': 'scrollUp 1000ms ease-in-out 0.6s',
				'scroll-horizontal': 'scroll 5s linear infinite',
			},
			keyframes: {
				'scroll': {
					'0%': { transform: 'translateX(0)' },
					'32%': { transform: 'translateX(-100%)' },
					'62%': { transform: 'translateX(-200%)' },
					'100%': { transform: 'translateX(-200%)' },
					},
				'slide-in': {
					'0%': {
						transform: 'translateX(100%)',
						opacity: '1'
					},
					'100%': {
						transform: 'translateX(0%)',
						opacity: '1'
					}
				},
				'slide-out': {
					'0%': {
						transform: 'translateX(0)',
						opacity: '1'
					},
					'100%': {
						transform: 'translateX(100%)',
						opacity: '1'
					}
				},

				'move-out': {
					'0%': {
						transform: 'translateY(0%)'
					},
					'100%': {
						transform: 'translateY(160%)'
					}
				},
				'move-in': {
					'0%': {
						transform: 'translateY(100%)'
					},
					'100%': {
						transform: 'translateY(0%)'
					}
				},
				'fall-back': {
					'0%': {
						transform: 'scale(1)'
					},
					'100%': {
						transform: 'scale(0.8)'
					}
				},
				'drop-out': {
					'0%': {
						transform: 'translateY(0)',
						opacity: '1'
					},
					'100%': {
						transform: 'translateY(100%)',
						opacity: '0'
					}
				},
				'pop-in': {
					'0%': {
						transform: 'translateY(100%)',
						opacity: '0'
					},
					'100%': {
						transform: 'translateY(0)',
						opacity: '1'
					}
				},
				'come-in': {
					'0%': {
						transform: 'scale(0.8)'
					},
					'100%': {
						transform: 'scale(1)'
					}
				},
				'fade-back': {
					'0%': {
						opacity: '1',
						transform: 'scale(1)'
					},
					'100%': {
						opacity: '0.5',
						transform: 'scale(0.8)'
					}
				},
				'accordion-down': {
					from: {
						height: '0'
					},
					to: {
						height: 'var(--radix-accordion-content-height)'
					}
				},
				'accordion-up': {
					from: {
						height: 'var(--radix-accordion-content-height)'
					},
					to: {
						height: '0'
					}
				},
				scrollUp: {
					'0%': { transform: 'translateY(0)' },
					'50%': { transform: 'translateY(-70px)' },
					'100%': { transform: 'translateY(0)' },
				  },
			},
			colors: {
				background: 'hsl(var(--background))',
				foreground: 'hsl(var(--foreground))',
				card: {
					DEFAULT: 'hsl(var(--card))',
					foreground: 'hsl(var(--card-foreground))'
				},
				popover: {
					DEFAULT: 'hsl(var(--popover))',
					foreground: 'hsl(var(--popover-foreground))'
				},
				primary: {
					DEFAULT: 'hsl(var(--primary))',
					foreground: 'hsl(var(--primary-foreground))'
				},
				secondary: {
					DEFAULT: 'hsl(var(--secondary))',
					foreground: 'hsl(var(--secondary-foreground))'
				},
				muted: {
					DEFAULT: 'hsl(var(--muted))',
					foreground: 'hsl(var(--muted-foreground))'
				},
				accent: {
					DEFAULT: 'hsl(var(--accent))',
					foreground: 'hsl(var(--accent-foreground))'
				},
				destructive: {
					DEFAULT: 'hsl(var(--destructive))',
					foreground: 'hsl(var(--destructive-foreground))'
				},
				border: 'hsl(var(--border))',
				input: 'hsl(var(--input))',
				ring: 'hsl(var(--ring))',
				chart: {
					'1': 'hsl(var(--chart-1))',
					'2': 'hsl(var(--chart-2))',
					'3': 'hsl(var(--chart-3))',
					'4': 'hsl(var(--chart-4))',
					'5': 'hsl(var(--chart-5))'
				}
			},
			backgroundImage: {
				'landingpage-gradient': 'linear-gradient(180deg, rgba(26, 25, 23, 0) 0%, rgba(26, 25, 23, 0.7) 99.5%)',
				'store-footer-gradient': 'linear-gradient(180deg, rgba(253, 251, 248, 0) 0%, #FDFBF8 100%)',
				'account-user-hero-gradient':'linear-gradient(299.19deg, #353330 1.12%, #5B564F 99.49%)',
				'flix-blog-title-gradient': 'linear-gradient(180deg, rgba(26, 25, 23, 0) 0%, rgba(26, 25, 23, 0.5) 60.99%)',
				'flix-blog-footer-gradient': 'linear-gradient(180deg, rgba(253, 251, 248, 0) 0%, #FDFBF8 100%)',
				'flix-video-title-gradient': 'linear-gradient(180deg, rgba(26, 25, 23, 0) 0%, rgba(26, 25, 23, 0.5) 60.99%)',
				'store-video-gradient': 'linear-gradient(180deg, rgba(26, 25, 23, 0) 0%, rgba(26, 25, 23, 0.6) 99.5%)',
			},
			boxShadow: {
				'flix-footer-dark-shadow': '0px 1px 2px 0px #0000000F, 0px 1px 3px 0px #0000001A',
			},
			borderRadius: {
				lg: 'var(--radius)',
				md: 'calc(var(--radius) - 2px)',
				sm: 'calc(var(--radius) - 4px)'
			},
			height: {
                'screen-dynamic': 'calc(var(--vh, 1vh) * 100)',
            },
		}
	},
	plugins: [require("tailwindcss-animate")],
};
