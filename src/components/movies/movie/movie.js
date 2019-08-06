import React, { useState } from 'react';
import classes from './movie.css';
import { FaEdit, FaInfo, FaTrash } from 'react-icons/fa';
import ModalContext from '../../../context/modal-context';

const Movie = (props) => {

    const [movieState, setMovieState] = useState({ movie: props.movie })

    return (

        <div className={classes.movie}>
            <div className={classes.imgDiv}>
                <img className={classes.img} src={require('../../../assets/images/' + movieState.movie.img + '.jpg')} />
            </div>
            <div className={classes.dimWrap}>
                <div className={classes.dimDiv}></div>
                <ModalContext.Consumer>
                    {context =>
                        <div className={classes.iconsDiv}>
                            <FaInfo className={classes.infoIcon} onClick={()=>context.showInfoModal(props.movie)} />
                            <FaEdit className={classes.editIcon} onClick={()=>context.showEditModal(props.movie)} />
                            <FaTrash className={classes.deleteIcon} onClick={()=>context.showDeleteModal(props.movie)} />
                        </div>
                    }
                </ModalContext.Consumer>
            </div>
        </div>

    )

}


export default Movie;

