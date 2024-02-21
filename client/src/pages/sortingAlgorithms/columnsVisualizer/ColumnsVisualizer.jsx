import { useEffect, useReducer } from 'react';
import './columnsVisualizer.css';
import { NavBar } from '../../../components/NavBar/NavBar.jsx'
import Column from './Column/index.jsx';



//Here we are using two reducers, the first handles our columns/nodes, the second is iteration and time box.
//The changes that our array will be : 

//ACTION.ADD_NORMAL : This will fill our empty array with random numbers, northing special.

/*ACTIONS.CHANGE : This will change our array entirely, this will be used for sorting it. 

  This also will be used for to paint green the number that is being compared.
*/

/*ACTIONS_FINISHED: This will be dispatched after our sort is finished, this will paint green, from left to right our nodes*/

export const ACTIONS = {
  CHANGE : 'change',
  ADD_NORMAL: 'add_normal',
  ADD_FINISHED: 'add_finished',
  ite: 'ite',
}

export function createColumns(num) {
  const grid = [];
  for(let i = 0; i < num; i++) {
    grid.push(Math.round(Math.random() * 100))
  }
  return grid;
}
export function fillFinished(num) {
  const grid = [];
  for(let i = 0; i < num; i++) {
    grid.push(false)
  }
  return grid;
}

function reducer(myColumn, action) {
  switch (action.type) {
    case ACTIONS.CHANGE:
      return {arr: {normal: [...action.payload.arr.normal], finished:[...myColumn.arr.finished]}, next: action.payload.next}

    case ACTIONS.ADD_NORMAL: 
      return {arr: {normal: [...action.payload.arr.normal], finished: [...action.payload.arr.finished]}, next: 0}

    case ACTIONS.ADD_FINISHED: 
      return {arr: {normal: [...myColumn.arr.normal], finished: [...action.payload.arr.finished]}, next : -10}

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
  const [myColumn, dispatch] = useReducer(reducer, {arr: {normal: [], finished: []}, next: 0});
  const [iteAndTime, dispatchIteAndTime] = useReducer(reducerIteration, {iteration: 0, time: 0});

  useEffect(() => {
    dispatch({ type: ACTIONS.ADD_NORMAL, payload: {arr: {normal: createColumns(64), finished: fillFinished(64)}}});
  }, [])

  return (
    <div className='columnVisualizer'>
      <NavBar myColumn={myColumn.arr.normal} dispatch={dispatch} dispatchIteAndTime={dispatchIteAndTime}/>
      
      <div className='iterationHolder'>
        <p><b>Comparisons: {iteAndTime.iteration}</b></p>
        <p><b>Time: {Math.round(iteAndTime.time)} S</b></p>
      </div>
    {
      myColumn.arr.normal.map((element, index) => {
        return(
          <Column
            key={index}
            number={element}
            isFalse={myColumn.arr.finished[index]}
            backgroundColor={
              index === myColumn.next ? 'green' : 'red'
            }
          />
        )
      })
    }</div>
  )
}

export default ColumnsVisualizer