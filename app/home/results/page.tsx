'use client'

import dynamic from 'next/dynamic';
import { useState, useEffect } from 'react';
import axios from 'axios';

import { Dela_Gothic_One } from 'next/font/google';
const dela = Dela_Gothic_One({ weight: ['400'], subsets: ['latin'] })

export default function Page() {
  const DynamicListItem = dynamic(() => import('@/app/components/dynamic_list_item'), {
    ssr: false,
  });

  const [data, setData] = useState<any>([]);
  const [groqData, setGroqData] = useState<any>([]);

  useEffect(() => {
    async function fetchData() {
      const foodJsonString = sessionStorage.getItem("foodDisplayList");
      if (foodJsonString) {
        setData(JSON.parse(foodJsonString));
      }
    }

    async function fetchGroqRecs() {
      // use axios to query groq
      // create a form with foodJsonString
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
        const response = await axios.post("/api/groq", form);
        if (response.data) {
          setGroqData(response.data);
        }
      }
    }

    fetchData();
    fetchGroqRecs();
  }, []);

  

  return (
    <div id="resultsWrapper" className="mx-auto w-9/12">
      <div className="relative mx-auto w-full text-center">
        <h1 className={dela.className + " p-10 text-5xl font-bold"}>Results</h1>
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
        </div>
      </div>
      <div id="footing" className="h-44"></div>
    </div>
  );
}