'use server'

import { redirect } from "next/navigation";

export default async function Page() {
  redirect('/home');
  return (
    // This is the home page wrapper
    <div className="grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)]">
    </div>
  );
}
