import {ACTIONS} from '../columnsVisualizer/ColumnsVisualizer.jsx';
export async function burbleSort(arr, dispatch, dispatchIteAndTime){
  const init = Date.now();
  const myArr = [...arr];
  let iterations = 0;

  let j = 0;
  let maxIndexTo = 0 

  let myInterval = setInterval(() => {
      if(j < myArr.length - maxIndexTo) {
        if(myArr[j] > myArr[j+1]) {
          [myArr[j], myArr[j+1]] = [myArr[j+1], myArr[j]]; 
        } 
        j++
        const timePassed =  (Date.now() - init) / 1000;
        iterations++;
        dispatch({type: ACTIONS.CHANGE, payload: {arr: {normal: myArr}, next:j}});
        dispatchIteAndTime({type: ACTIONS.ite, payload: { iteration: iterations, time: timePassed }})
      } else { 
        j = 0;
        maxIndexTo++;
      } 
      console.log(maxIndexTo)
      if(maxIndexTo === myArr.length + 1) {
        clearInterval(myInterval);
        dispatch({type: ACTIONS.CHANGE, payload: {arr: {normal: myArr}, next:-2}});

        const myFinishedArr = [];
        for(let i = 0; i < myArr.length; i++){
          myFinishedArr.push(false);
        }
        let myFinishedCounter = 0;

        let newInterval = setInterval(() => {
          myFinishedArr.splice(myFinishedCounter, 1, true)
          dispatch({ type : ACTIONS.ADD_FINISHED, payload: {arr: { finished: [...myFinishedArr]}} })
          myFinishedCounter++;
          if(myFinishedCounter === myArr.length) { 
            clearInterval(newInterval);
          }
        }, 10)
      }
  }, 5);
}