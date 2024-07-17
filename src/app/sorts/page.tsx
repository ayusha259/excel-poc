"use client";

import React, { useEffect, useState } from "react";
import style from "./page.module.css";
import { nanoid } from "nanoid";

interface ArrEl {
  key: string,
  val: number,
  looking: boolean,
  swapped: boolean
}

interface OrderEl {
  key1: string,
  key2: string,
  idx1?: number,
  idx2?: number
}

const delay = (ms: number) => new Promise(res => setTimeout(res, ms));

const SortPage = () => {
  const [array, setArray] = useState([3, 2, 1, 5, 8, 4]);
  const [sortArrayObj, setSortArrayObj] = useState<ArrEl[]>([]);

  const initSort = () => {
    const arrO: ArrEl[] = [];
    for (let el of array) {
      arrO.push({
        key: nanoid(),
        val: el,
        looking: false,
        swapped: false
      });
    }
    setSortArrayObj(arrO);
  };

  const bubbleSort = () => {
    const arr = [...sortArrayObj]
    const looking:OrderEl[] = []
    const swapped:OrderEl[] = []
    for (let i = 0; i < arr.length; i++) {
      let isSwapped = false;
      for (let j = 0; j < arr.length - i - 1; j++) {
        const val1 = arr[j].val
        const val2 = arr[j+1].val
        looking.push({
          key1: arr[j].key,
          key2: arr[j+1].key
        })
        if (+val1 > +val2) {
          let temp = arr[j];
          arr[j] = arr[j + 1];
          arr[j + 1] = temp;
          isSwapped = true
          swapped.push({
            key1: arr[j].key,
            key2: arr[j+1].key,
            idx1: j,
            idx2: j+1,
          })
        }
        if(!isSwapped) break
      }
    }
    startLookingAnimation(looking)
    startSwappingAnimation(swapped)
  };

  function doSetTimeout(el: OrderEl, i: number) {
    setTimeout(function() {
      setSortArrayObj(sortArrayObj.map(o => {
        if(o.key === el.key1 || o.key === el.key2) {
          o.looking = true
        } else {
          o.looking = false
        }
        return o
      }))
    }, i * 500);
  }

  function doSetTimeoutS(el: OrderEl, i: number) {
    setTimeout(function() {
      const newArray = sortArrayObj
      for(let j = 0; j < newArray.length; j++) {
        if(newArray[j].key === el.key1 || newArray[j].key === el.key2) {
          newArray[j].swapped = true
        } else {
          newArray[j].swapped = false
        }
      }
      const temp = newArray[el.idx1!]
      newArray[el.idx1!] = newArray[el.idx2!]
      newArray[el.idx2!] = temp
      setSortArrayObj([...newArray])
    }, i * 500);
  }

  const startLookingAnimation = (lookingOrder: OrderEl[]) => {
    for(let i = 0; i < lookingOrder.length; i++){
      doSetTimeout(lookingOrder[i], i)
    }
  }

  const startSwappingAnimation = (swappingOrder: OrderEl[]) => {
    for(let i = 0; i < swappingOrder.length; i++){
      doSetTimeoutS(swappingOrder[i], i)
    }
    const newArray = [...sortArrayObj]
    for(let i = 0; i < newArray.length; i++){
      newArray[i].swapped = false
    }
  }

  return (
    <div>
      <button onClick={initSort}>Init Sort</button>
      <button onClick={bubbleSort}>Bubble Sort</button>
      <div className={style.sortContainer}>
        {sortArrayObj.map((obj) => (
          <>
            <div key={obj.key} style={{color: obj.looking ? "red" : obj.swapped ? "green" : "black"}}>{obj.val}</div>
          </>
        ))}
      </div>
    </div>
  );
};

export default SortPage;
