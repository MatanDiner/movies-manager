import React, { useState, useRef, useEffect } from 'react';
import classes from './add.css';
import Input from '../UI/Input/Input';
import Button from '../UI/Button/Button';
import { checkValidations, checkFormValidation, getFormArr } from '../../services/form';
import { checkMovieTItle } from '../../services/movies';
import { uppercase_sentence, remove_nonEnglish } from '../../services/pipes';

const Add = (props) => {

    const [addForm, setAddFormState] = useState({
        form: {
            id: Math.floor(Math.random() * 1000000),
            img: "noImg",
            Title: {
                inputType: "input",
                elementConfig: {
                    type: "text",
                    placeholder: "Title"
                },
                value: "",
                validation: {
                    required: true,
                    maxLength: 25
                },
                valid: false,
                touched: false
            },
            Year: {
                inputType: "input",
                elementConfig: {
                    type: "text",
                    placeholder: "Year"
                },
                value: "",
                validation: {
                    required: true,
                    number: true,
                    maxLength: 4
                },
                valid: false,
                touched: false
            },
            Runtime: {
                inputType: "input",
                elementConfig: {
                    type: "text",
                    placeholder: "Runtime"
                },
                value: "",
                validation: {
                    required: true,
                    number: true,
                    maxLength: 3
                },
                valid: false,
                touched: false
            },
            Genre: {
                inputType: "input",
                elementConfig: {
                    type: "text",
                    placeholder: "Genre"
                },
                value: "",
                validation: {
                    required: true,
                    maxLength: 25
                },
                valid: false,
                touched: false,
            },
            Director: {
                inputType: "input",
                elementConfig: {
                    type: "text",
                    placeholder: "Director"
                },
                value: "",
                validation: {
                    required: true,
                    maxLength: 25
                },
                valid: false,
                touched: false,
            }
        },
        formIsValid: false,
    })

    const [ErrorMessageForm, setErrorMessageForm] = useState({ ErrorMessage: "" });


    const changeHandler = (event, elementIdentifier) => {

        const Form = { ...addForm.form };
        const inputElement = { ...Form[elementIdentifier] };
        if (event.target.value.length > inputElement.validation.maxLength) return;
        inputElement.value = event.target.value;

        inputElement.valid = checkValidations(inputElement.value, inputElement.validation);
        inputElement.touched = true;

        Form[elementIdentifier] = inputElement;
        const formIsValid = checkFormValidation(Form);

        setAddFormState({
            form: Form,
            formIsValid: formIsValid,
        });
    }

    let formArr = [];
    formArr = getFormArr(addForm.form);

    const inputs = formArr.map((el, index) => {
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
                <label className={classes.ErrorMessage}>{!el.config.valid && el.config.touched ? el.id === "Year" || el.id === "Runtime" ? "must be a number!" : "must be full!" : null}</label>
            </div>  
    })

    const movie = {
        id: addForm.form.id,
        img: addForm.form.img,
        Title: addForm.form.Title.value,
        Year: addForm.form.Year.value,
        Runtime: addForm.form.Runtime.value,
        Genre: addForm.form.Genre.value,
        Director: addForm.form.Director.value,
    }

    const saveMovie = (e, movie) => {
        e.preventDefault();
        const isExist = checkMovieTItle(movie,props.moviesData);
        const ErrorMessage = isExist ? "the Title of the Movie exist already." : "";
        setErrorMessageForm({
            ErrorMessage: ErrorMessage
        })
        if (!isExist) {
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
                    <Button btnType="Danger" clicked={props.cancel} disabled={false}>Cancel</Button>
                    <Button btnType="Success" clicked={(event) => saveMovie(event, movie)} disabled={!addForm.formIsValid}>Save</Button>
                </div>
                <div>
                    <label style={{ color: "red" }}>{ErrorMessageForm.ErrorMessage}</label>
                </div>
            </form>
        </div>
    )
}





export default Add;