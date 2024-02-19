import './index.css'
const Column = ({number, backgroundColor}) => {
  return (
    <div
      className={`column`}
      style={
        {
          height: `${number + 10}px`,
          backgroundColor: `${backgroundColor}`,
        }}
    >{number}</div>
  )
}

export default Column 