'use client'

import { useEffect, useState } from 'react';
import DisplayResults from "@/app/components/display_results";

export default function Page() {
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch('https://food-finder-ecj.vercel.app/api')
      .then(res => res.json())
      .then(data => {
        setMessage(data.message);
        setLoading(false);
      })
  }, [])

  return (
    <div>
        <p> {!loading ? message : "Loading.."}</p>
        <DisplayResults />
    </div>
  )
}