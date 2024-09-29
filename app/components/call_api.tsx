'use client'

import axios from 'axios';
import parseResults from './parse_results';
import { redirect } from 'next/navigation';

export default function callAPI() {

  // clear session storage
  sessionStorage.removeItem("foodsFound");

  // Create the analysis request form
  const formData = new FormData();
  const image = sessionStorage.getItem("image");
  if (!image) {
    console.log("No image found in session storage!");
    return;
  }
  formData.append('file', image);

  // Call the API
  axios.post('https://food-finder-ecj.vercel.app/api/analyze', formData)
  .then((res) => {
    // Store response in state
    if (res.data) {
      sessionStorage.setItem("foodsFound", JSON.stringify(res.data));
      console.log("Image uploaded successfully!");
    } else {
      console.log("Couldn't reach the API server!");
    }
    
    try {
      console.log("Analyzing image...");
      if (sessionStorage.getItem("foodsFound")) {
        // wait for the results to be parsed
        const parsed = parseResults();
        if (parsed) {
          redirect(`/home/results`);
        } else {
          console.log("Something went wrong while cleaning the results");
        }
      }
    } catch (error) {
      console.error(error);
      console.log("Something went wrong while analyzing the image.");
    }
  })
  .catch((err) => {
    console.error(err);
    console.log("Something went wrong while uploading your image.");
  });

  return;
}
