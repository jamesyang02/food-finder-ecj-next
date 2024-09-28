'use client'

import { useEffect, useState } from 'react';
import { useMounted } from '@/app/hooks/useMounted'

export default function DisplayResults() {
  const mounted = useMounted()
  if (!mounted) return null

  const dataString = sessionStorage.getItem("foodDisplayList") || '';

  const data = JSON.parse(dataString);

  var listEl = document.getElementById('displayFoodList');
  
  try{
    makeList(data,listEl);
  } catch (error) {
    console.error(error);
    console.log('Something went wrong while displaying the results');
  }
  
  // thank you to https://stackoverflow.com/questions/6692538/generate-unordered-list-from-json-data
  function makeList(data: any, listElement: any) { //recursive function to make a list
    for(var i in data){//iterate through the array or object
      //insert the next child into the list as a <li>
      var newLI = document.createElement('li');
      if  (data[i] instanceof Array){
          newLI.innerHTML=i+":";
          newLI.className="ingredientList"; //add a class tag so we can style differently
      }
      else if (data[i] instanceof Object){
          newLI.className="line"; //add a class tag so we can style differently
      }
      else
          newLI.innerHTML=i+': '+data[i];
      listElement.appendChild(newLI);
      //insert a <ul> for nested nodes 
      if (data[i] instanceof Array || data[i] instanceof Object){
          var newUL = document.createElement('ul');
          newUL.className="foodName"; //add a class tag so we can style differently
          //newUL.innerHTML=i;
          listElement.appendChild(newUL);
          makeList(data[i],newUL);
      }
    }
  }

  return (
    <main>
      <ul id="displayFoodList"></ul>
    </main>
  );
}