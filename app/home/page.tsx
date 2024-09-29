'use client'

import callAPI from "@/app/components/call_api"
import DragAndDrop from "../components/drag_and_drop";
import { useEffect } from 'react';

import { Poppins } from 'next/font/google'
const poppins = Poppins({ weight: ['400'], subsets: ['latin'] })
import { Dela_Gothic_One } from 'next/font/google'
const dela = Dela_Gothic_One({ weight: ['400'], subsets: ['latin'] })

// Home page
export default function Page() {

  useEffect(() => {
    fetch('https://food-finder-ecj.vercel.app/api')
      .then(res => res.json())
      .then(data => {
        if (data) {
          console.log("API is up and running!");
        } else {
          alert("Couldn't reach the API server! You may not receive results.");
        }
      })
  }, [])

  const uploadImage = () => {
    if (!sessionStorage.getItem("image")) {
      alert("No image found in session storage!");
      return;
    }
    callAPI();
  }

  return (
    <main className="flex h-full mx-auto text-center">
      <div className="mx-auto">
        <div className="p-10 text-7xl">
          <h1 className={dela.className}>What's in your fridge?</h1>
        </div>
        <div className="p-6 text-2xl">
          <h1 className={poppins.className}>Upload an image to get nutrition information and serving suggestions.</h1>
        </div>
        <div className="w-90 p-4 mx-auto">
        </div>
        <DragAndDrop
          onUpload={(file) => {
            console.log("File uploaded successfully!");
            sessionStorage.setItem("image", file);
          }}
        >
        </DragAndDrop>
        <button onClick={uploadImage} className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded m-4">Analyze my fridge!</button>
      </div>
    </main>
  )
}