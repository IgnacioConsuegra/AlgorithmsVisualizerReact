import {ACTIONS} from '../columnsVisualizer/ColumnsVisualizer.jsx';
export async function burbleSort(arr, dispatch, dispatchIteAndTime){
  const init = Date.now();
  const myArr = [...arr];
  let iterations = 0;

  let j = 0;
  let handlerInterval = 0;
  let myInterval = setInterval(() => {
      if(j < myArr.length) {
        if(myArr[j] > myArr[j+1]) {
          [myArr[j], myArr[j+1]] = [myArr[j+1], myArr[j]]; 
          handlerInterval = 0;
        } else {
          handlerInterval++;
          if(handlerInterval === myArr.length -1) {
            j = -2
            clearInterval(myInterval);
          }
        }
        j++
        const timePassed =  (Date.now() - init) / 1000;
        iterations++;
        dispatch({type: ACTIONS.CHANGE, payload: {arr: myArr, next:j}});
        dispatchIteAndTime({type: ACTIONS.ite, payload: { iteration: iterations, time: timePassed }})
      } else { 
        j = 0;
      }
  }, 5);
}