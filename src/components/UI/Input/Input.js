import React,{useRef,useEffect} from 'react'
import classes from './Input.css'

const Input = (props) =>{

const firstInput = useRef(null);

useEffect(() => {
    if(props.index===0)
    firstInput && firstInput.current && firstInput.current.focus();
},[])


let inputElement = null;
const inputClasses = [classes.inputElement];
if(!props.isValid && props.shouldValid && props.touched){
    inputClasses.push(classes.Invalid);
}

switch (props.elementType) {
    case 'input':
        inputElement = <input className={inputClasses.join(' ')}
                              {...props.elementConfig}
                               value={props.value}
                               onChange={props.changed}
                               ref={firstInput}
                               />
                        break;
    case 'textarea':
        inputElement = <textarea className={inputClasses.join(' ')}
                                 {...props.elementConfig}
                                  value={props.value}
                                  onChange={props.changed}
                                  ref={firstInput}
                                  />
                        break;  
    case 'select':
        inputElement = <select className={inputClasses.join(' ')} value={props.value} onChange={props.changed} >
                          {props.elementConfig.options.map(option=>{
                              return <option key={option.vlaue} value={option.value}>
                                             {option.displayValue}
                                    </option>
                          })}
                       </select>   
                       break;     
    default:
        inputElement = <input className={inputClasses.join(' ')}
                              {...props.elementConfig}
                               value={props.value}
                               onChange={props.changed}
                               ref={firstInput}
                               />
                        break;
}

return(
    <div className={classes.Input}>
        <label className={classes.Label}>{props.label}</label>
        {inputElement}
    </div>
);

}

export default Input;