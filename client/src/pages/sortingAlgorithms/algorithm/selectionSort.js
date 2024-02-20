import {ACTIONS} from '../columnsVisualizer/ColumnsVisualizer.jsx';
import {columnsToGreen} from '../auth/columnsToGreen.js'

export function selectionSort(arr, dispatch, dispatchIteAndTime){
  const init = Date.now();
  const myArr = [...arr];
  let iterations = 0;

  let i = 0;
  let j = 0;
  const minValue = {value: Infinity, index: 0};

  let myInterval = setInterval(() => {
    if(i < myArr.length) 
    {
      if(myArr[i] < minValue.value) 
      {
        minValue.value = myArr[i];
        minValue.index = i;
        dispatch({type: ACTIONS.CHANGE, payload: {arr: {normal: myArr}, next: i}});
      }
      iterations++;
      const timePassed =  (Date.now() - init) / 1000;
      dispatchIteAndTime({type: ACTIONS.ite, payload: { iteration: iterations, time: timePassed }})
      i++;
    } 
    else 
    { 
      [myArr[j], myArr[minValue.index]] = [myArr[minValue.index], myArr[j]]; 
      minValue.value = Infinity;
      minValue.index = 0;
      console.log("Else: ", myArr);
      dispatch({type: ACTIONS.CHANGE, payload: {arr: {normal: myArr}, next: j + 1}});
      j++;
      i = j;
    } 
    if(j >= myArr.length) {
      clearInterval(myInterval);
      dispatch({type: ACTIONS.CHANGE, payload: {arr: {normal: myArr}, next:-2}});
      columnsToGreen(dispatch, myArr.length);
      // console.log(myArr)
    }
  }, 5);
}



