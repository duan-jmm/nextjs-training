import { Navbar } from "@/src/components/navbar.component";
import { Pagination } from "@/src/components/pagination.component";
import Modal from "@/src/components/Modal";
import { useState } from "react";
import Button from "@/src/components/button";
import Image from "next/image";
import axios from "axios";

export default function Random(props) {
  const count = 15;
  const items = ["1", "2", "3", "4", "5", "6", "7", "8", "9", "10", "11", "12", "13", "14", "15"];

  const currentRandomDrink = props?.data?.drinks[0];

  //   for (let i = 1; i <= count; i++) {
  //     if (currentRandomDrink[`strIngredient${i}`] == null) {
  //       break;
  //     }
  //     items.push(`${currentRandomDrink[`strIngredient${i}`]} (${currentRandomDrink[`strMeasure${i}`]})`);
  //   }

  //   currentRandomDrink.strIngredient1 = items;

  return (
    <div className="flex justify-center pt-5">
      <div className="flex flex-col rounded-lg bg-white shadow-lg dark:bg-neutral-700 md:max-w-xl md:flex-row">
        <div className="w-1/3">
          <img className="rounded-lg" src={currentRandomDrink?.strDrinkThumb} alt="card image" />
        </div>
        <div className="text-secondary w-2/3 flex-1 p-6">
          <span className="text-5xl font-bold uppercase text-blue-500">{currentRandomDrink?.strDrink}</span>
          <a href="#">
            <h3 className="mt-4">
              <b>Ingredients</b>
            </h3>
          </a>
          <ol>
            {items.map((each, index) => {
              if (currentRandomDrink[`strIngredient${each}`] == null) {
                return null;
              }
              return <li>{`${each}. ${currentRandomDrink[`strIngredient${each}`]}`}</li>;
            })}
          </ol>
          <h3 className="mt-4">
            <b>Instructions</b>
          </h3>
          <p>{currentRandomDrink?.strInstructions}</p>
        </div>
      </div>
    </div>
  );
}

export async function getServerSideProps(context) {
  const [err, data] = await axios
    .get(`https://www.thecocktaildb.com/api/json/v1/1/random.php`, {})
    .then((Response) => {
      console.log(Response.data);

      return [null, Response.data];
    })
    .catch((err) => {
      return [err, null];
    });

  console.log(data);

  if (err) {
    console.log(err);
    return {
      props: {},
    };
  } else {
    return {
      props: { data },
    };
  }
}
