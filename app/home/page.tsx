'use client'

import DragAndDrop from "../components/drag_and_drop";
import { useEffect, useState } from 'react';
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
  if (!mounted) return null;
  // enable button on window load
  window.onload = () => {
    const uploadButton = document.getElementById("uploadButton");
    if (uploadButton) {
      uploadButton.removeAttribute("disabled");
    }
    // add click listener to drag n drop
    const dragAndDropComp = document.getElementById('dragAndDrop'); 
    dragAndDropComp?.addEventListener('click', () => {
      const clickInput = document.getElementById('clickInput');
      clickInput?.click();
    });
  };
  // check if api is up
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

  // Helper function to handle image upload from click input
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      // Check if file is too big, max size is 5MB
      if (file.size > 1024 * 1024 * 5) {
        alert("File is too big! Max file size is 5MB.");
        e.target.value = "";
        return;
      }
      setImage(file);
      e.target.value = "";
    }
  };
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
      <div id="loadingBox" className=" z-50 hidden opacity-0 top-0 left-0 h-screen w-screen bg-slate-950/50 transition-all">
        <div className="z-50 flex flex-row w-full h-full justify-center items-center">
          <div className="z-50 flex flex-row md:w-1/4 w-3/4 md:1/5 h-1/5 bg-slate-600 rounded-3xl justify-center items-center shadow-lg shadow-slate-950/50">
            <p className={dela.className + " relative text-5xl pb-3"}>
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
        <div id="imagePreviewContainer" className=" relative w-10/12 h-100 mx-auto">
          <div className="absolute top-0 w-full max-h-80 mx-auto">
            <div className="w-full overflow-hidden">
              {image && (
                <div id="imagePreview" className="flex flex-col items-center justify-center">
                  <Image 
                    src={URL.createObjectURL(image)} 
                    alt="Uploaded image" 
                    className="mx-auto h-full rounded-2xl"
                    width={500}
                    height={500}
                  />
                  <button onClick={removeImage} className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded m-4">Remove image</button>
                  <button onClick={uploadImage} id="uploadButton" className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded m-4">Analyze my fridge!</button>

                </div>
                
              )}
            </div>
          </div>
          <div id="inputFieldsWrapper">
            <div id="dragAndDrop" className="hover:cursor-pointer">
              <DragAndDrop className="absolute top-0 z-3 w-full h-fit mx-auto"
                onUpload={(file: File) => {
                  setImage(file);
                }}
              >
              </DragAndDrop>
            </div>
            <div id="clickInputContainer" className="z-0 absolute top-0 hover:cursor-pointer">
              <input 
                type="file"
                id="clickInput"
                value = ""
                accept="image/*"
                className="hidden" onChange={handleChange}
              />
              <label htmlFor="imageInput" className=" h-full text-transparent font-bold py-2 px-4 rounded m-4">Select an image</label>
            </div>
          </div>
        </div>
      </div>
    </main>
  )
}