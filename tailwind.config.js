/** @type {import('tailwindcss').Config} */
export default {
	content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
	theme: {
		extend: {
			colors: {
				primary: {
					bg: '#2A2D3A',
					secondary: '#1F2937',
					card: '#374151',
				},
				text: {
					primary: '#FAFAFA',
					secondary: '#E5E7EB',
					muted: '#9CA3AF',
				},
				border: {
					default: '#4B5563',
				},
				accent: {
					purple: '#6366F1',
					blue: '#64748B',
					green: '#10B981',
					gray: '#64748B',
				},
				glass: {
					bg: 'rgba(255, 255, 255, 0.05)',
					border: 'rgba(255, 255, 255, 0.1)',
				}
			},
			fontFamily: {
				'inter': ['Inter', 'sans-serif'],
				'poppins': ['Poppins', 'sans-serif'],
			},
			fontSize: {
				'hero': ['3.5rem', { lineHeight: '1.1', letterSpacing: '-0.025em' }],
				'hero-mobile': ['2.5rem', { lineHeight: '1.2', letterSpacing: '-0.025em' }],
			},
			spacing: {
				'18': '4.5rem',
				'88': '22rem',
				'128': '32rem',
			},
			borderRadius: {
				'xl': '1rem',
				'2xl': '1.5rem',
				'3xl': '2rem',
			},
			boxShadow: {
				'soft': '0 10px 40px rgba(0, 0, 0, 0.1)',
				'soft-lg': '0 20px 60px rgba(0, 0, 0, 0.15)',
				'glow': '0 0 20px rgba(99, 102, 241, 0.3)',
				'glow-lg': '0 0 40px rgba(99, 102, 241, 0.4)',
			},
			backdropBlur: {
				xs: '2px',
			},
			animation: {
				'fade-in-up': 'fadeInUp 0.8s cubic-bezier(0.4, 0, 0.2, 1)',
				'fade-in-scale': 'fadeInScale 0.6s cubic-bezier(0.4, 0, 0.2, 1)',
				'float': 'float 6s ease-in-out infinite',
				'pulse-soft': 'pulse-soft 3s ease-in-out infinite',
				'gradient': 'gradient 3s ease infinite',
				'shimmer': 'shimmer 2s linear infinite',
			},
			keyframes: {
				fadeInUp: {
					'0%': {
						opacity: '0',
						transform: 'translateY(30px)',
					},
					'100%': {
						opacity: '1',
						transform: 'translateY(0)',
					},
				},
				fadeInScale: {
					'0%': {
						opacity: '0',
						transform: 'scale(0.95)',
					},
					'100%': {
						opacity: '1',
						transform: 'scale(1)',
					},
				},
				float: {
					'0%, 100%': {
						transform: 'translateY(0px)',
					},
					'50%': {
						transform: 'translateY(-10px)',
					},
				},
				pulseSoft: {
					'0%, 100%': {
						opacity: '0.5',
					},
					'50%': {
						opacity: '1',
					},
				},
				gradient: {
					'0%, 100%': {
						'background-size': '200% 200%',
						'background-position': 'left center',
					},
					'50%': {
						'background-size': '200% 200%',
						'background-position': 'right center',
					},
				},
				shimmer: {
					'0%': {
						transform: 'translateX(-100%)',
					},
					'100%': {
						transform: 'translateX(100%)',
					},
				},
			},
			transitionTimingFunction: {
				'premium': 'cubic-bezier(0.4, 0, 0.2, 1)',
			},
			backgroundImage: {
				'gradient-premium': 'linear-gradient(135deg, #6366F1 0%, #8B5CF6 100%)',
				'gradient-soft': 'linear-gradient(135deg, #2A2D3A 0%, #1F2937 100%)',
				'gradient-glass': 'linear-gradient(135deg, rgba(255, 255, 255, 0.1) 0%, rgba(255, 255, 255, 0.05) 100%)',
			},
		},
	},
	plugins: [],
}
