'use client'

export default async function parseResults() {
  const data = sessionStorage.getItem('foodsFound') || '[]';
  const foodObjects = JSON.parse(data).items.map((item: any) => {
    return item.food[0];
  });
  console.log(foodObjects);
  try {
    const foods = foodObjects.map((food: any) => {
      return {
        item: {"Item": food.food_info.display_name},
        "Serving Size": food.food_info.g_per_serving,
        "Calories per 100g": food.food_info.nutrition.calories_100g,
        "Ingredients": food.ingredients || ['No ingredients found'],
        "Quantity": food.quantity || null,
      }
    });
    console.log(foods);
    sessionStorage.setItem('foodDisplayList', JSON.stringify(foods));
    return true;
  } catch (error) {
    console.error(error);
    console.log('Something went wrong while parsing the results');
    return false;
  }
}