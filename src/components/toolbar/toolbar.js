import React from 'react';
import { FaPlusCircle } from 'react-icons/fa';
import classes from './toolbar.css';
import ModalContext from '../../context/modal-context';
const toolbar = props =>{

return(

<div className={classes.toolbar}>
    <div>
        <h1>Movies App</h1>
    </div>
    <div>
        <ModalContext.Consumer>
        {context =><FaPlusCircle className={classes.icon} onClick={context.showAddModal}/>}
       </ModalContext.Consumer>
    </div>
</div>

)

}

export default toolbar;