import React from 'react';
import Button from '../UI/Button/Button';
import classes from './delete.css';

const deleteMovie = (props) => {

    return (

        <div className={classes.delete}>
            <p>Are You sure that You want to delete this movie?</p>
            <div className={classes.btnDiv}>
                <Button btnType="Danger" clicked={props.cancel} disabled={false}>Cancel</Button>
                <Button btnType="Success" clicked={props.delete} disabled={false}>Delete</Button>
            </div>
        </div>

    )

}

export default deleteMovie;