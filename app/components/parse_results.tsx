'use client'

export default function parseResults() {
  const data = sessionStorage.getItem('foodsFound') || '{}';
  const foodObjects = JSON.parse(data).items.map((item: any) => {
    return item.food[0];
  });
  console.log(foodObjects);
  try {
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