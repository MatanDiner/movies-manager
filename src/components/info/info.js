import React,{useState} from 'react';
import classes from './info.css';
import Button from '../UI/Button/Button';
const Info = props =>{

const [infoState,setInfoState] = useState({
    info:Object.keys(props.movie).map(k=>{return{[k]:props.movie[k]}})
})

return(

<div className={classes.info}>
<div className={classes.fileds}>
<div className={classes.filedsKeys}>
{Object.keys(props.movie).map(key=>{
    if(key!=="id" && key!=="img")
    return <div className={classes.filedName} key={key}><label>{key}</label></div>
 }) 
}
</div>
<div className={classes.filedsValues}>
{infoState.info.map((item,index)=>{
return Object.keys(item).map(key=>{
    if(key!=="id" && key!=="img"){

    return key==="Runtime"?<div className={classes.value} key={key}><label>{item[key]} min</label></div>:
    <div className={classes.value} key={key}><label>{item[key]}</label></div>
    }
 })
})
}
</div>
</div>
<div className={classes.okBtn}>
<Button btnType="Success" clicked={props.infoBtn}>OK</Button>    
</div>

</div>


)


}


export default Info; 
