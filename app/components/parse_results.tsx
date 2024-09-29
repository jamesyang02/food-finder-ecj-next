'use client'

// Parse the results received from the FoodVisor API.
// Takes data in the form of a JSON string of objects and parses it into a more minimal format.
// Input format can be found in the FoodVisor API documentation.
// Should be a utils function in the future since it does not return a component.
// Currently does not return all the data, as the full analysis is quite a lot.

export default function parseResults() {
  const data = sessionStorage.getItem('foodsFound') || '{}';
  const foodObjects = JSON.parse(data).items.map((item: any) => {
    return item.food[0];
  });
  console.log(foodObjects);
  try {
    // for each food object, extract the relevant information and store it in a new object
    const foods = foodObjects.map((food: any) => {
      const object = {
        Name: food.food_info.display_name,
        Quantity: food.quantity || null,
        ServingSize: food.food_info.g_per_serving,
        CaloriesPer100g: food.food_info.nutrition.calories_100g,
      }
      return {
        key: food.food_info.display_name,
        item: object,
      }
    });
    console.log("foods parsed" + foods);
    sessionStorage.setItem('foodDisplayList', JSON.stringify(foods));
    return true;
  } catch (error) {
    console.error(error);
    console.log('Something went wrong while parsing the results');
    return false;
  }
}