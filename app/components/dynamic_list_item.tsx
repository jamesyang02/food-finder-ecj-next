import { Dela_Gothic_One } from 'next/font/google';
const dela = Dela_Gothic_One({ weight: ['400'], subsets: ['latin'] })


export default function DynamicListItem(item: any) {
  return (
    <div className="p-4">
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