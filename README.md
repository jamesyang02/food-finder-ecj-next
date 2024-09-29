<p align="center">
  <a href="https://nextjs-flask-starter.vercel.app/">
    <img src="https://assets.vercel.com/image/upload/v1588805858/repositories/vercel/logo.png" height="96">
    <h3 align="center">ECJ Application Project: Fridge Detection!</h3>
  </a>
</p>

<br/>

## Introduction and tech stack choices

This is a hybrid Next.js + Python app that uses Next.js as the frontend and Flask as the API backend. I chose this tech stack in order to make serverless Python calls on the backend to specific AI model APIs that I believed were the best fit for this project. The reason I couldn't do this all in JavaScript is because the best model for this use case had a Python-exclusive API. This architecture I chose would also be easier to pivot into a true fullstack project, with a backend to store user queries and gain feedback on model performance.

## How It Works

This site is designed with ease of use in mind! Simply visit the home page, drag or click to upload your photo, and hit Analyze to get results on your photo.
The AI model will detect food items in your photo and even provide some recipe suggestions using the items you have in your fridge. It's a two button process!

## Demo

https://food-finder-ecj-next.vercel.app/
