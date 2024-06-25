type ButtonProps = {
    id?: string
    label: string | any[]   //Allow for string or an Array
    handleClick?: any       //Function for the  onClick
    extraClass?: string
}

const Button = ({id = crypto.randomUUID(), label, handleClick, extraClass}: ButtonProps) => {
//Defaulting id to generate a randomUUID if it is not passed into the component
  return (
    <button key={id} className={`btn ${extraClass}`} onClick={handleClick()}>
        {label}
    </button>
  )
}

export default Button