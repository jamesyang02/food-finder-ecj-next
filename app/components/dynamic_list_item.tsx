import { Dela_Gothic_One } from 'next/font/google';
const dela = Dela_Gothic_One({ weight: ['400'], subsets: ['latin'] })

// Dynamic list item component for displaying results from FoodVisor
// receives a single item object as a prop
// item object is an object with the following structure:
// {
//   item: {
//     Name: string,
//     Quantity: number,
//     ServingSize: string,
//     CaloriesPer100g: number
//   }
// }
// Requires a double .item index to reach the object properties. I'm not sure why actually...

export default function DynamicListItem(item: any) {
  return (
    <div className="p-4 md:w-1/4 w-full">
      <ul>
        <li className={dela.className + " text-xl leading-10"}>
          {item.item["Name"]}
        </li>
        <ul className="list-disc pl-10">
          <li>
            Quantity: &nbsp;{item.item["Quantity"]}
          </li>
          <li>
            Serving Size: &nbsp;{item.item["ServingSize"]}
          </li>
          <li>
            Calories per 100g: &nbsp;{item.item["CaloriesPer100g"]}
          </li>
        </ul>
      </ul>
    </div>
  );
}