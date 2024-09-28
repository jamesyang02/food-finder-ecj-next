'use client'

import Image from 'next/image';
import { useState } from 'react';
import axios from 'axios';
import { useRouter } from 'next/navigation'
import parseResults from './parse_results';

export default function FileUpload() {
  // Router here for redirecting to results page
  const router = useRouter()

  // Store file in page state for upload
  const [file, setFile] = useState<File>();

  // Handle form submission and submit to API
  const handleSubmission = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!file) return;

    // FoodVisor query
    const formData = new FormData();
    formData.append('file', file);

    axios.post('https://food-finder-dr3kfl0iz-james-yangs-projects-b85f648d.vercel.app/api/analyze', formData)
    .then((res) => {
      // Store response in state
      sessionStorage.setItem("foodsFound", res.data);
      console.log("Image uploaded successfully!");
      // redirect to the results page
      router.push(`/results`);
    })
    .catch((err) => {
      console.error(err);
      console.log("Something went wrong while uploading your image.");
    });

    try {
      if (sessionStorage.getItem("foodsFound")) {
        console.log("Image uploaded successfully!");
        // wait for the results to be parsed
        const parsed = await parseResults();
        if (parsed) {
          router.push(`/home/results`);
        } else {
          console.log("Something went wrong while parsing the results");
        }
      }
    } catch (error) {
      console.error(error);
      console.log("Something went wrong while uploading your image.");
    }
  };

  // Handle file change when user selects a file to upload
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      // Check if file is too big, max size is 5MB
      if (file.size > 1024 * 1024 * 5) {
        alert("File is too big! Max file size is 5MB.");
        return;
      }
      setFile(file);
    }
  };

  // Unused function to convert file to base64
  // const toBase64 = (file: File) => {
  //   return new Promise((resolve, reject) => {
  //     const reader = new FileReader();
  //     reader.onload = () => {
  //       resolve(reader.result);
  //     };
  //     reader.onerror = (error) => reject(error);
  //     reader.readAsDataURL(file as Blob);
  //   });
  // };

  return (
    <main>
      <form onSubmit={handleSubmission}>
        <input
          type="file"
          accept="image/*"
          name="file"
          onChange={handleChange}
        />
        <input type="submit" value="Upload" />
        {file && (
          <div className="w-[300px] text-black p-4">
            <Image
              src={URL.createObjectURL(file)}
              alt="Uploaded image"
              width={300}
              height={300}
            />
          </div>

        )}
      </form>
    </main>
  );
}
