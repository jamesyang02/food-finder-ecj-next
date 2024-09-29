'use client'

import React, { useEffect } from 'react';

import { Dela_Gothic_One } from 'next/font/google';
const dela = Dela_Gothic_One({ weight: ['400'], subsets: ['latin'] })

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

  return (
    <div className='FilesDragAndDrop__area z-3 w-full h-96 mx-auto bg-slate-700 hover:bg-slate-800 p-4 rounded-3xl text-center text-slate-400 hover:text-slate-600 transition-all'
      ref={drop}
    >
      <div className="FilesDragAndDrop__area flex -col justify-center items-center h-full mx-auto p-3 rounded-2xl border-8 border-dashed border-slate-400">
        <p className={dela.className + " h-full align-middle text-2xl w-6/12 mx-auto"}>
          Drag and drop an image here, or click to select
        </p>
      </div>
    </div>
  );
}