'use client'

import { Dela_Gothic_One } from 'next/font/google'
const dela = Dela_Gothic_One({ weight: ['400'], subsets: ['latin'] })
import { Poppins } from 'next/font/google'
const poppins = Poppins({ weight: ['400'], subsets: ['latin'] })

// Help icon
const HelpCircleIcon = (props: React.SVGProps<SVGSVGElement>) => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width={24} height={24} color={"foreground-rgb"} fill={"none"} {...props}>
    <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="1.5" />
    <path d="M10 9C10 7.89543 10.8954 7 12 7C13.1046 7 14 7.89543 14 9C14 9.39815 13.8837 9.76913 13.6831 10.0808C13.0854 11.0097 12 11.8954 12 13V13.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
    <path d="M11.992 17H12.001" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

// Helmet component
// Contains the help icon and the app name
// Clicking on the help icon will display a help message

export default function Helmet() {
  const handleAbout = (e: any) => {
    e.preventDefault();
    alert("This is a food vision app. \
Upload an image using one of the given methods \
to get a list of food items in the image. ");
  };

  return (
    <nav className="relative container w-screen mx-auto p-6">
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-2">
        <a href="#" onClick={handleAbout} className="text-lg">
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