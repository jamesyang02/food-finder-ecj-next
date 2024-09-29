'use server'

import { redirect } from "next/navigation";

// Layout page
export default async function Page() {
  redirect('/home');
}
