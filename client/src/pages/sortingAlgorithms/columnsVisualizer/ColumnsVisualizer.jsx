import { useEffect, useReducer } from 'react';
import Column from './Column/index.jsx';
import './columnsVisualizer.css';
import { burbleSort } from '../algorithm/burbleShort.js';


//Here we are using two reducers, the first handles our columns, the second this iteration and time box.
// ACTIONS: CHANGE AND ADD, are used for handling our columns, and ite: for our iterations. 

export const ACTIONS = {
  CHANGE : 'change',
  ADD: 'add',
  ite: 'ite',
}

function createColumns() {
  const grid = [];
  for(let i = 0; i < 64; i++) {
    grid.push(Math.round(Math.random() * 100))
  }
  return grid;
}

function reducer(myColumn, action) {
  switch (action.type) {
    case ACTIONS.CHANGE:
      return {arr: [...action.payload.arr], next: action.payload.next}
    case ACTIONS.ADD: 
      return {arr: [...action.payload.arr], next: 0}
    default:
      break;
  }
}

function reducerIteration(iteAndTime, action) {
  switch (action.type){
      case ACTIONS.ite : 
      return {iteration: action.payload.iteration, time : action.payload. time}
    default:
      break;
  }
}


const ColumnsVisualizer = () => {
  const [myColumn, dispatch] = useReducer(reducer, {arr: [], next: 0});
  const [iteAndTime, dispatchIteAndTime] = useReducer(reducerIteration, {iteration: 0, time: 0});

  useEffect(() => {
    dispatch({ type: ACTIONS.ADD, payload: {arr: createColumns()}});
  }, [])

  return (
    <div className='columnVisualizer'>
      <button
      className='sortButton'
      onClick={() => burbleSort(myColumn.arr, dispatch, dispatchIteAndTime)}>Sort.</button>
      <div className='iterationHolder'>
        <p><b>Iteration: {iteAndTime.iteration}</b></p>
        <p><b>Time: {Math.round(iteAndTime.time)} S</b></p>
      </div>
    {
      myColumn.arr.map((element, index) => {
        return(
          <Column
            key={index}
            number={element}
            backgroundColor={index === myColumn.next ? 'green' : 'red'}
          />
        )
      })
    }</div>
  )
}

export default ColumnsVisualizer