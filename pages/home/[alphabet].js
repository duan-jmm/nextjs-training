import { Navbar } from "@/src/components/navbar.component";
import { Pagination } from "@/src/components/pagination.component";
import Modal from "@/src/components/Modal";
import { useState } from "react";
import Button from "@/src/components/button";
import Image from "next/image";
import axios from "axios";

export default function aplhabet(props) {
  const [visible, setVisible] = useState(false);
  const [clickedDrink, setClickedDrink] = useState({});

  function changeModalVisibilty() {
    setVisible(!visible);
  }

  return (
    <div>
      <Pagination current={props?.data?.alphabet} />

      <div className="grid grid-cols-3 gap-16 p-10">
        {props?.data?.drinks?.map((each) => {
          function onDrinkClick() {
            const count = 15;
            const items = [];

            for (let i = 1; i <= count; i++) {
              if (each[`strIngredient${i}`] == null) {
                break;
              }
              items.push(`${each[`strIngredient${i}`]} (${each[`strMeasure${i}`]})`);
            }

            each.strIngredient1 = items;

            setClickedDrink(each);
            changeModalVisibilty();
          }
          return (
            <div key={each.idDrink}>
              <div onClick={onDrinkClick}>
                <div className="max-w-sm rounded overflow-hidden shadow-lg">
                  <Image width={1000} height={1000} src={each?.strDrinkThumb} alt="" />
                  <div className="px-6 py-4">
                    <div className="font-bold text-xl mb-2">{each.strDrink}</div>
                    <p className="text-gray-700 text-base">description</p>
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      <Modal visible={visible} onChange={changeModalVisibilty}>
        <div className="w-full flex items-center justify-between">
          <div className="w-1/3">
            <img className="rounded-lg" src={clickedDrink?.strDrinkThumb} alt="card image" />
          </div>
          <div className="text-secondary w-2/3 flex-1 p-6">
            <span className="text-5xl font-bold uppercase text-blue-500">{clickedDrink?.strDrink}</span>
            <a href="#">
              <h3 className="mt-4">
                <b>Ingredients</b>
              </h3>
            </a>
            <ol>
              {clickedDrink?.strIngredient1?.map((each, index) => (
                <li>{`${index + 1}. ${each}`}</li>
              ))}
            </ol>
            <h3 className="mt-4">
              <b>Instructions</b>
            </h3>
            <p>{clickedDrink?.strInstructions}</p>
          </div>
        </div>
      </Modal>
    </div>
  );
}

export async function getStaticPaths(context) {
  const alphabet = ["a", "b", "c", "d", "e", "f", "g", "h", "i", "j", "k", "l", "m", "n", "o", "p", "q", "r", "s", "t", "u", "v", "w", "x", "y", "z"];

  const paths = alphabet.map((each) => ({
    params: {
      alphabet: `${each.toString()}`,
    },
  }));

  return { paths, fallback: false };
}

export async function getStaticProps(context) {
  const alphabet = ["a", "b", "c", "d", "e", "f", "g", "h", "i", "j", "k", "l", "m", "n", "o", "p", "q", "r", "s", "t", "u", "v", "w", "x", "y", "z"];
  let alphabetParam = context.params.alphabet;

  const [err, data] = await axios
    .get(`https://www.thecocktaildb.com/api/json/v1/1/search.php?f=${alphabetParam}`, {})
    .then((Response) => {
      return [null, Response.data];
    })
    .catch((err) => {
      return [err, null];
    });

  if (err) {
    console.log(err);
    return {
      props: {},
    };
  } else {
    data.alphabet = alphabetParam;
    return {
      props: { data },
    };
  }
}

// export async function getServerSideProps(context) {
//   const [err, data] = await axios
//     .get(`https://www.thecocktaildb.com/api/json/v1/1/search.php?f=a`, {})
//     .then((Response) => {
//       return [null, Response.data];
//     })
//     .catch((err) => {
//       return [err, null];
//     });

//   if (err) {
//     console.log(err);
//     return {
//       props: {},
//     };
//   } else {
//     return {
//       props: { data },
//     };
//   }
// }
