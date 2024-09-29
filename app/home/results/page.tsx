'use client'

import dynamic from 'next/dynamic';
import { useState, useEffect } from 'react';
import Image from 'next/image';

import { Dela_Gothic_One } from 'next/font/google';
const dela = Dela_Gothic_One({ weight: ['400'], subsets: ['latin'] })

export default function Page() {
  const DynamicListItem = dynamic(() => import('@/app/components/dynamic_list_item'), {
    ssr: false,
  });

  const [data, setData] = useState<any>([]);
  const [imageURL, setImageURL] = useState<string>();

  useEffect(() => {
    async function fetchData() {
      const foodJsonString = sessionStorage.getItem("foodDisplayList");
      if (foodJsonString) {
        setData(JSON.parse(foodJsonString));
      }
      setImageURL(sessionStorage.getItem("image")!);
    }
    fetchData();
  }, []);

  return (
    <div id="resultsWrapper" className="mx-auto w-9/12">
      <div className="relative mx-auto w-full text-center">
        <h1 className={dela.className + " p-10 text-5xl font-bold"}>Results</h1>
      </div>
      <div className="flex md:flex-row flex-col flex-auto">
        <div className="md:w-8/12 w-full">
          {imageURL && (
            <div className="pt-10 w-12/12">
              <Image 
                // get a data URL from session storage
                src={"/../public/not_found.jpg"} 
                alt="Uploaded image"
                width={500}
                height={500}
                className="mx-auto rounded-2xl"
              />
            </div>
          )}
        </div>
        <div id="foodItemsList" className="md:w-4/12 w-full flex flex-col flex-auto">
          {data.map((object: any) => (
            <DynamicListItem 
              key={object.key}
              item={object.item}
            />
            ))}
        </div>
      </div>
    </div>
  );
}