/* eslint-disable react/prop-types */
import { createColumns } from '../../pages/sortingAlgorithms/columnsVisualizer/ColumnsVisualizer';
import { fillFinished } from '../../pages/sortingAlgorithms/columnsVisualizer/ColumnsVisualizer';
import {  useEffect, useReducer } from 'react';
import { burbleSort } from '../../pages/sortingAlgorithms/algorithm/burbleShort';
import { selectionSort } from '../../pages/sortingAlgorithms/algorithm/selectionSort';
import './navBar.css';
import { ACTIONS } from '../../pages/sortingAlgorithms/columnsVisualizer/ColumnsVisualizer';

const NAV_ACTIONS = { 
  CHANGE_ALGORITHM : 'change_algorithm',
  CHANGE_ACTION : 'change_action',
}

const ALGORITHMS_NAMES = {
  BURBLE_SORT : 'Burble Sort',
  SELECTION_SORT: 'Selection Sort',
}

const ACTIONS_NAMES = {
  SORT : 'Sort',
  RESET : 'Reset',
}

function reducer(selectedAlgorithm, action) {
  switch (action.type) {

    case NAV_ACTIONS.CHANGE_ALGORITHM:
      return {name: action.payload.name, sort: false, reset: false};

    case NAV_ACTIONS.CHANGE_ACTION:
      if(action.payload.name === ACTIONS_NAMES.SORT) {
        return {name: selectedAlgorithm.name, sort: true, reset: false}
      }
      if(action.payload.name === ACTIONS_NAMES.RESET) {
        return {name: selectedAlgorithm.name, sort: false, reset: true}
      }
      break;

    default:
      break;
  }
}




export const NavBar = ({myColumn, dispatch, dispatchIteAndTime}) => {
  const [ selectedAlgorithm, dispatchSelectedAlgorithm ] = useReducer(reducer, {name: 'Burble Sort', sort: false, reset: false});
  useEffect(() => {
    if(selectedAlgorithm.sort){
      switch (selectedAlgorithm.name) {
        case ALGORITHMS_NAMES.BURBLE_SORT:
          burbleSort(myColumn, dispatch, dispatchIteAndTime);
          break;
        case ALGORITHMS_NAMES.SELECTION_SORT:
          selectionSort(myColumn, dispatch, dispatchIteAndTime);
          break;
        default:
          break;
      }
    }
    if(selectedAlgorithm.reset){
      dispatch({ type: ACTIONS.ADD_NORMAL, payload: {arr: {normal: createColumns(64), finished: fillFinished(64)}}});
      dispatchIteAndTime({type: ACTIONS.ite, payload: { iteration: 0, time: 0 }})
    }
  }, [selectedAlgorithm])

  return (
    <header className='NavBar_Header'>
      <nav className='NavBar_Nav'>
        <ChangeAlgorithmButton name={`${ALGORITHMS_NAMES.BURBLE_SORT}`} dispatchSelectedAlgorithm={dispatchSelectedAlgorithm} />
        <ChangeAlgorithmButton name={`${ALGORITHMS_NAMES.SELECTION_SORT}`} dispatchSelectedAlgorithm={dispatchSelectedAlgorithm} />
        <ActionButton name={`${ACTIONS_NAMES.SORT}`} dispatchSelectedAlgorithm={dispatchSelectedAlgorithm}/>
        <ActionButton name={`${ACTIONS_NAMES.RESET}`} dispatchSelectedAlgorithm={dispatchSelectedAlgorithm}/>
        <p>Selected algorithm : {selectedAlgorithm.name}</p>
      </nav>
    </header>
  )
}



function ChangeAlgorithmButton({name, dispatchSelectedAlgorithm, styles}){
  return(
    <div className='changeAlgorithmButton' onClick={() => dispatchSelectedAlgorithm({ type: NAV_ACTIONS.CHANGE_ALGORITHM, payload: {name: name} })}>
      <p>{name}</p>
    </div>
  )
}
function ActionButton({name, dispatchSelectedAlgorithm, styles}) {
  return(
    <div className='changeAlgorithmButton' onClick={() => dispatchSelectedAlgorithm(
      {type: NAV_ACTIONS.CHANGE_ACTION, payload: {name: name} }
      )}
    >
      <p>{name}</p>
    </div>
  )
}