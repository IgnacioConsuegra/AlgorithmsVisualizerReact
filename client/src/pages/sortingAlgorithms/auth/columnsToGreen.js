import { ACTIONS } from "../columnsVisualizer/ColumnsVisualizer";
export function columnsToGreen(dispatch, myArrLength) {
  const myFinishedArr = [];
  for(let i = 0; i < myArrLength; i++){
    myFinishedArr.push(false);
  }
  let myFinishedCounter = 0;
  let newInterval = setInterval(() => {
    myFinishedArr.splice(myFinishedCounter, 1, true)
    dispatch({ type : ACTIONS.ADD_FINISHED, payload: {arr: { finished: [...myFinishedArr]}} })
    myFinishedCounter++;
    if(myFinishedCounter === myArrLength) { 
      clearInterval(newInterval);
    }
  }, 10)
}