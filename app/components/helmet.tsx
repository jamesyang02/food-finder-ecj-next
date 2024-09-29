'use client'

//import dela gothic one
import { Dela_Gothic_One } from 'next/font/google'
const dela = Dela_Gothic_One({ weight: ['400'], subsets: ['latin'] })
import { Poppins } from 'next/font/google'
const poppins = Poppins({ weight: ['400'], subsets: ['latin'] })

// icons
const HelpCircleIcon = (props: React.SVGProps<SVGSVGElement>) => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width={24} height={24} color={"foreground-rgb"} fill={"none"} {...props}>
    <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="1.5" />
    <path d="M10 9C10 7.89543 10.8954 7 12 7C13.1046 7 14 7.89543 14 9C14 9.39815 13.8837 9.76913 13.6831 10.0808C13.0854 11.0097 12 11.8954 12 13V13.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
    <path d="M11.992 17H12.001" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

export default function Helmet() {

  return (
    <nav className="relative container mx-auto p-6">
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-2">
        <a href="/about" className="text-lg">
          <HelpCircleIcon />
        </a>
        </div>
        <div className="pt-2 mx-auto">
          <a href="/home" className="text-4xl">
            <p className={dela.className}>
              FoodFinder
            </p>
            </a>
        </div>
      </div>
    </nav>
  );
}