import './index.css'
const Column = ({number, backgroundColor, isFalse}) => {
  return (
    <div
      className={`column`}
      style={
        {
          height: `${number + 10}px`,
          backgroundColor: `${!isFalse ? backgroundColor : 'green'}`,
        }}
    >{number}</div>
  )
}

export default Column 