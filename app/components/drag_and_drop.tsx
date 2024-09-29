'use client'

import React, { useEffect } from 'react';

import { Dela_Gothic_One } from 'next/font/google';
const dela = Dela_Gothic_One({ weight: ['400'], subsets: ['latin'] })

// Custom drag and drop file upload component
// Also contains a manual file input for selecting files
// onUpload is a function that handles the file upload
// The two are connected to the same function to avoid redundancy

export default function FilesDragAndDrop({onUpload}: any) {

  const count = 1;
  const formats = ['jpg', 'jpeg', 'png'];

  // define a reference to the drop area
  const drop = React.createRef<HTMLDivElement>();

  useEffect(() => {
      drop.current?.addEventListener('dragover', handleDragOver);
      drop.current?.addEventListener('drop', handleDrop);

    return () => {
      drop.current?.removeEventListener('dragover', handleDragOver);
      drop.current?.removeEventListener('drop', handleDrop);
    };
  }, []);
  
  // Handle drag and drop events
  const handleDragOver = (e: any) => {
    e.preventDefault();
    e.stopPropagation();
  };
  const handleDrop = (e: any) => {
    e.preventDefault();
    e.stopPropagation();
    const files = [...e.dataTransfer.files];
    // Check count of files
    if (count && count < files.length) {
      alert(`Only ${count} file${count !== 1 ? 's' : ''} can be uploaded at a time`);
      return;
    }
    // Verify file formats
    if (formats && files.some((file) => !formats.some((format: any) => file.name.toLowerCase().endsWith(format.toLowerCase())))) {
      alert(`Please upload these file types only: ${formats.join(', ')}`);
      return;
    }
    // Check file size
    if (files[0].size > 1024 * 1024 * 2) {
      alert("File is too big! Max file size is 2MB.");
      return;
    }
    // upload single file if everything goes well
    if (files && files.length) {
      onUpload(files[0]);
    }
  };

  // Handle click input events
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      // Check if file is too big, max size is 5MB
      if (file.size > 1024 * 1024 * 2) {
        alert("File is too big! Max file size is 2MB.");
        e.target.value = "";
        return;
      }
      onUpload(file);
      e.target.value = "";
    }
  };

  return (
    <div className="h-96 min-h-96">
      <div className='FilesDragAndDrop__area z-3 w-full h-full mx-auto bg-zinc-100/80 hover:bg-zinc-100/50 dark:bg-slate-700 dark:hover:bg-slate-800 p-4 rounded-3xl text-center text-green-800/80 hover:text-green-800/60 dark:text-slate-400 dark:hover:text-slate-600 transition-all select-none'
        ref={drop}
      >
        <div className="FilesDragAndDrop__area flex justify-center items-center min-h-full mx-auto p-3 rounded-2xl border-8 border-dashed border-green-800/60 dark:border-slate-400">
          <p className={dela.className + " flex h-fit text-2xl w:full pb-2 md:w-6/12 mx-auto"}>
            Drag and drop an image here, or browse below
          </p>
        </div>
      </div>
      <div id="clickInputContainer" className="z-10 relative bottom-0 w-full">
          <input
            type="file"
            hidden
            id="browse"
            onChange={handleChange}
            accept=".jpg,.jpeg,.png"
          />
          <div className="w-full">
            <label htmlFor="browse" className="browse-btn">
              <div id="browseButton" className="FilesDragAndDrop__area flex-col mt-10 items-center bg-blue-500 hover:bg-blue-700 text-white font-bold w-8/12 mx-auto p-3 rounded-xl transition-all hover:cursor-pointer">
                Select from device
              </div>
            </label>
          </div>
      </div>
      <div id="footing" className="h-44"></div>
    </div>
  );
}