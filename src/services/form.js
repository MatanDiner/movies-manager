export const checkValidations = (value, rules) => {
    let isValid = true;
    if (rules.required) {
        isValid = value.trim() !== '' && isValid;
    }
    if (rules.number) {
        isValid = !isNaN(value) && isValid;
    }
    return isValid;
}

export const checkFormValidation = (form) => {
    let formIsValid = true;
    let counter = 0;
    for (let key in form) {
        counter++;
        if (counter > 2) {
            formIsValid = form[key].valid && formIsValid;
        }
    }
    return formIsValid;
}


export const getFormArr = (form) =>{
    const formArr = [];
    let counter = 0;
    for (let key in form) {
        counter++;
        if (counter > 2) {
            formArr.push({
                id: key,
                config: form[key]
            })
        }
    }
    return formArr;
}