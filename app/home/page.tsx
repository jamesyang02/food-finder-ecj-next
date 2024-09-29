'use client'

import DragAndDrop from "../components/drag_and_drop";
import { useState } from 'react';
import Image from 'next/image';
import callAPI from "../components/call_api";
import { useMounted } from "../hooks/useMounted";

import { Poppins } from 'next/font/google'
const poppins = Poppins({ weight: ['400'], subsets: ['latin'] })
import { Dela_Gothic_One } from 'next/font/google'
const dela = Dela_Gothic_One({ weight: ['400'], subsets: ['latin'] })

// Home page
export default function Page() {
  const [image, setImage] = useState<File>();

  // useMounted hook
  const mounted = useMounted();
  if (mounted) {
    window.onload = () => {

      // enable analyze button on window load
      const uploadButton = document.getElementById("uploadButton");
      if (uploadButton) {
        uploadButton.removeAttribute("disabled");
      }
    };
    sessionStorage.removeItem("foodsFound");
    sessionStorage.removeItem("foodDisplayList");
  }

  // Helper to clear image from both input fields
  const removeImage = () => {
    setImage(undefined);
    const clickInput = document.getElementById('clickInput') as HTMLInputElement;
    if (clickInput) {
      clickInput.value = "";
    }
  }
  // Helper to upload image
  const uploadImage = async() => {
    // gray out the upload button
    const uploadButton = document.getElementById("uploadButton");
    if (uploadButton) {
      uploadButton.setAttribute("disabled", "true");
      uploadButton.setAttribute("style", "background-color: gray;");
      uploadButton.innerHTML = "Analyzing...";
    }
    // check if the image is in session storage
    if (!image) {
      alert("Upload an image first!");
      uploadButton?.removeAttribute("disabled");
      uploadButton?.setAttribute("style", "bg-blue-500;");
      if (uploadButton) {
        uploadButton.innerHTML = "Analyze my fridge!";
      }
      return;
    }
    // store image as a string
    const handleImageStore = () => {
      const file = image;
      if (file) {
        const reader = new FileReader();
        reader.onloadend = () => {
          const dataURL = reader.result;
          console.log(dataURL as string);
          sessionStorage.setItem("image", dataURL as string);
        };

        reader.readAsText(file); // You can use other methods like readAsDataURL() for images
      }
    }
    handleImageStore();
    // call the API
    const res = await callAPI(image);
    if (res == 1) {
      alert("Something went wrong while uploading your image.");
      setImage(undefined);
      uploadButton?.removeAttribute("disabled");
      return;
    } else {
      // set loading Box to visible
      const loadingBox = document.getElementById("loadingBox");
      if (loadingBox) {
        loadingBox.classList.remove("hidden");
        loadingBox.classList.add("absolute");
        loadingBox.setAttribute("style", "opacity: 1;");
      }
    }
  }

  return (
    <main className="flex h-full mx-auto text-center">
      <div id="loadingBox" className=" top-0 left-0 z-50 hidden opacity-0 h-full w-screen bg-slate-950/50 transition-all">
        <div className="z-50 flex flex-row w-full h-full justify-center items-center">
          <div className="z-50 flex flex-row md:w-1/4 w-3/4 md:1/5 h-1/6 bg-slate-900 rounded-3xl justify-center items-center shadow-lg shadow-slate-950/50">
            <p className={dela.className + " relative text-2xl text-slate-100 pb-3"}>
              Analyzing...
            </p>
          </div>
        </div>
      </div>
      <div className="mx-auto">
        <div className="p-10 text-7xl">
          <h1 className={dela.className}>What's in your fridge?</h1>
        </div>
        <div className="p-6 text-2xl">
          <h1 className={poppins.className}>Upload an image to get nutrition information and serving suggestions.</h1>
        </div>
        <div id="imagePreviewContainer" className=" relative w-10/12 h-96 min-h-fit mx-auto">
          <div className="absolute top-0 w-full max-h-80 mx-auto">
            <div id="inputFieldsWrapper" className="flex-col">
              <div className="absolute w-full">
                {image && (
                  <div id="imagePreview" className="flex flex-col items-center justify-center">
                    <div className="flex items-center justify-center h-96 max-h-96 w-full overflow-hidden rounded-2xl">
                      <Image 
                        src={URL.createObjectURL(image)} 
                        alt="Uploaded image"
                        className="mx-auto object-cover min-w-full w-full min-h-full h-full rounded-2xl"
                        width={500}
                        height={500}
                      />
                    </div>
                    <button onClick={removeImage} className="mt-32 bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded-xl m-4">Remove image</button>
                    <button onClick={uploadImage} id="uploadButton" className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-xl m-4">Analyze my fridge!</button>

                  </div>
                  
                )}
              </div>
              <div id="dragAndDrop" className="z-40 flex-grow">
                <DragAndDrop className="absolute top-0 z-3 w-full mx-auto"
                  onUpload={(file: File) => {
                    setImage(file);
                  }}
                >
                </DragAndDrop>
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  )
}