'use client'

import dynamic from 'next/dynamic';
import { useState, useEffect } from 'react';
import axios from 'axios';

import { Dela_Gothic_One } from 'next/font/google';
const dela = Dela_Gothic_One({ weight: ['400'], subsets: ['latin'] })

// Results page
// Route /home/results
// Currently displays results from FoodVisor and recipe recommendations from Groq

export default function Page() {
  const DynamicListItem = dynamic(() => import('@/app/components/dynamic_list_item'), {
    ssr: false,
  });

  const [data, setData] = useState<any>([]);
  const [groqData, setGroqData] = useState<any>([]);

  // Arrow left icon for back button
  const ArrowLeft02Icon = (props: React.SVGProps<SVGSVGElement>) => (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width={24} height={24} color={"foreground-rgb"} fill={"none"} {...props}>
      <path d="M3.99982 11.9998L19.9998 11.9998" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M8.99963 17C8.99963 17 3.99968 13.3176 3.99966 12C3.99965 10.6824 8.99966 7 8.99966 7" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );

  // fetch the found foods data from session storage, should have been previously stored by call_api.tsx.
  useEffect(() => {
    async function fetchData() {
      const foodJsonString = sessionStorage.getItem("foodDisplayList");
      if (foodJsonString) {
        setData(JSON.parse(foodJsonString));
      }
    }

    async function fetchGroqRecs() {
      // use axios to query groq
      // create a form with the food names from the session storage.
      // Redundancy intended to separate the two calls: if groq call fails, at least the analysis still goes on.
      var foodNames = null;
      const foodJsonString = sessionStorage.getItem("foodDisplayList");
      if (foodJsonString) {
        foodNames = JSON.parse(foodJsonString).map((object: any) => object.item.Name);
      }
      if (foodNames) {
        console.log("foodNames: " + foodNames);
        const form = {
          items: foodNames,
        }
        console.log(form);
        // send the form to the groq endpoint
        try {
          const response = await axios.post("https://food-finder-ecj.vercel.app/api/groq", form);
          if (response.data) {
            setGroqData(response.data);
          }
        } catch (error) {
          console.error(error);
        }
      }
    }

    // call the previously defined functions. New functionalities can be defined above and called here.
    fetchData();
    fetchGroqRecs();
  }, []);

  

  return (
    <div id="resultsWrapper" className="mx-auto w-9/12">
      <div className="relative mx-auto w-full text-center">
        <h1 className={dela.className + " p-10 text-5xl font-bold"}>Results</h1>
        <ArrowLeft02Icon className="absolute top-14 left-0 hover:cursor-pointer" onClick={() => {window.location.href = "/home";}} />
      </div>
      <div className="flex md:flex-row flex-col flex-auto">
        <div id="foodItemsList" className="md:w-10/12 w-full flex md:flex-row flex-col flex-wrap flex-auto">
          {data.map((object: any) => (
            <DynamicListItem 
              key={object.key}
              item={object.item}
            />
            ))}
        </div>
      </div>
      <div className="relative mx-auto w-full text-center">
        <h1 className={dela.className + " py-10 text-4xl font-bold md:text-center text-left"}>Recipe Recommendation</h1>
      </div>
      <div className="flex md:flex-row flex-col flex-auto leading-8">
        <p className="p-2 md:w-fit w-full"><b>Q: What can I make with this list of items?</b></p><br></br>
        <div id="groqItemsList" className="p-2 md:w-2/3 w-full">
          {groqData && "A: " + groqData}
          {!groqData[0] && "Sorry, I couldn't find any recipes. Did your photo contain food items?"}
        </div>
      </div>
      <div id="footing" className="h-44"></div>
    </div>
  );
}