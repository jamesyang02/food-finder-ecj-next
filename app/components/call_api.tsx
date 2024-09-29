'use client'

import axios from 'axios';
import parseResults from './parse_results';

// Call the FoodVisor API to analyze the image provided in args
// Store the results in session storage
// Redirect to the results page
// Should be a utils function in the future since it does not return a component.

export default async function callAPI(image: File) {

  // clear session storage before calling the API, in case of previous results
  sessionStorage.removeItem("foodsFound");

  // Create the analysis request form passing the image provided in args
  const formData = new FormData();
  if (!image) {
    console.log("No image found in session storage!");
    return 1;
  }
  formData.append('file', image);

  // Call the API
  axios.post('https://food-finder-ecj.vercel.app/api/analyze', formData)
  .then((res) => {
    // Store response in state
    if (res.data) {
      sessionStorage.setItem("foodsFound", JSON.stringify(res.data));
    } else {
      console.log("Couldn't reach the API server!");
      return 1;
    }
    
    try {
      console.log("Analyzing image...");
      // Attempt to parse the results received from the API
      if (sessionStorage.getItem("foodsFound")) {
        const parsed = parseResults();
        if (parsed) {
          console.log("Redirecting to results...");
          window.location.href = "/home/results";
          return 0;
        } else {
          console.log("Something went wrong while cleaning the results");
          return 1;
        }
      }
    } catch (error) {
      console.error(error);
      console.log("Something went wrong while analyzing the image.");
      return 1;
    }
  })
  .catch((err) => {
    console.error(err);
    console.log("Something went wrong while uploading your image.");
    return 1;
  });
  return 0;
}
