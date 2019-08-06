import React, { useState } from 'react';
import classes from './edit.css';
import Input from '../UI/Input/Input';
import Button from '../UI/Button/Button';
import {checkValidations,checkFormValidation,getFormArr} from '../../services/form';
import {checkMovieTItle} from '../../services/movies';
import {uppercase_sentence,remove_nonEnglish} from '../../services/pipes';

const Edit = (props) => {

    const [editForm, setEditFormState] = useState({
        form: {
            id: props.id,
            img:props.img,
            Title: {
                inputType: "input",
                elementConfig: {
                    type: "text",
                    placeholder: "Title"
                },
                value: props.Title,
                validation: {
                    required: true,
                    maxLength:25
                },
                valid: true,
                touched: false
            },
            Year: {
                inputType: "input",
                elementConfig: {
                    type: "text",
                    placeholder: "Year"
                },
                value: props.Year,
                validation: {
                    required: true,
                    number: true,
                    maxLength:4
                },
                valid: true,
                touched: false
            },
            Runtime: {
                inputType: "input",
                elementConfig: {
                    type: "text",
                    placeholder: "Runtime"
                },
                value: props.Runtime,
                validation: {
                    required: true,
                    number: true,
                    maxLength:3
                },
                valid: true,
                touched: false
            },
            Genre: {
                inputType: "input",
                elementConfig: {
                    type: "text",
                    placeholder: "Genre"
                },
                value: props.Genre,
                validation: {
                    required: true,
                    maxLength:25
                },
                valid: true,
                touched: false
            },
            Director: {
                inputType: "input",
                elementConfig: {
                    type: "text",
                    placeholder: "Director"
                },
                value: props.Director,
                validation: {
                    required: true,
                    maxLength:25
                },
                valid: true,
                touched: false
            }

        },
        formIsValid: true,
    })


    const [ErrorMessageForm,setErrorMessageForm] = useState({ErrorMessage:""});

    const changeHandler = (event, elementIdentifier) => {

        const updateForm = { ...editForm.form };
        const UpdateElement = { ...updateForm[elementIdentifier] };
        if( event.target.value.length>UpdateElement.validation.maxLength)return;
        UpdateElement.value = event.target.value;

        UpdateElement.valid = checkValidations(UpdateElement.value, UpdateElement.validation);
        UpdateElement.touched = true;

        updateForm[elementIdentifier] = UpdateElement;
        const formIsValid = checkFormValidation(updateForm);

        setEditFormState({
            form: updateForm,
            formIsValid: formIsValid
        });
    }


   let formArr = [];
   formArr = getFormArr(editForm.form);

    const inputs = formArr.map((el,index) => {
        return <div key={el.id}><Input
            index={index}
            isValid={el.config.valid}
            shouldValid={el.config.validation}
            touched={el.config.touched}
            elementType={el.config.inputType}
            elementConfig={el.config.elementConfig}
            value={el.config.value}
            changed={(event) => changeHandler(event, el.id)}
        />
            <label className={classes.ErrorMessage}>{el.config.valid ? null : el.id === "Year" || el.id === "Runtime" ? "must be a number!" : "must be full!"}</label>
        </div>
    })

    const movie = {
        id: editForm.form.id,
        img:editForm.form.img,
        Title: editForm.form.Title.value,
        Year: editForm.form.Year.value,
        Runtime: editForm.form.Runtime.value,
        Genre: editForm.form.Genre.value,
        Director: editForm.form.Director.value
    }


    const saveMovie = (e,movie) =>{
        e.preventDefault();  
        const isExist = checkMovieTItle(movie,props.moviesData);
        const ErrorMessage = isExist?"the Title of the Movie exist already.":"";
        setErrorMessageForm({
          ErrorMessage:ErrorMessage
      })
        if(!isExist){
            remove_nonEnglish(movie);
            uppercase_sentence(movie);
            props.save(movie);
        } 
      }

    return (
        <div>
            <form className={classes.form}>
                <div className={classes.inputs}>
                    {inputs}
                </div>
                <div className={classes.btnDiv}>
                    <Button btnType="Danger" clicked={props.cancel} >Cancel</Button>
                    <Button btnType="Success" clicked={(event) => saveMovie(event,movie)} disabled={!editForm.formIsValid}>Save</Button>
                </div>
                <div>
                    <label style={{color:"red"}}>{ErrorMessageForm.ErrorMessage}</label>
                </div>
            </form>
        </div>
    )
}





export default Edit;