'use client'

import React, { useEffect } from 'react';

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
      onUpload(files);
    }
  };

  return (
    <div className='FilesDragAndDrop__area'
      ref={drop}
    >
      Hey, drop me some files
      <span
        role='img'
        aria-label='emoji'
        className='area__icon'
      >
        &#128526;
      </span>
    </div>
  );
}