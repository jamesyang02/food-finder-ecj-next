import Groq from "groq-sdk";
import { useEffect } from "react";

const GROQ_API_KEY = "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";
const groq = new Groq({ apiKey: GROQ_API_KEY, dangerouslyAllowBrowser: true });

export async function main(str: string) {
  useEffect(() => {
    try {
      const response = fetch('/api/groq')
        .then(res => res.json())
        .then(data => {
          console.log(response);
        });
    } catch (error) {
      console.error(error);
    }
  }, []);
}