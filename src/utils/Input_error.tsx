const errorListDescription = {
    badInput: "Input doesn't match",
    customError: "Failed to validate",
    patternMismatch: "Please enter proper value according to pattern",
    rangeOverflow: "Please enter valud under the max value",
    rangeUnderflow: "Please enter valud more than min value",
    stepMismatch: "step is not correct",
    tooLong: "Value length is too long",
    tooShort: "Value length is too sort",
    typeMismatch: "type mismatched",
    valid: "is valid",
    valueMissing: "This field is required*",
}

const inputError = (e: any) => {
    e.preventDefault();
    var parentElement = e.target.parentNode;
    var errorSpan = parentElement.getElementsByClassName("error")[0];
    if (e.target.validity.valid) {
        if (errorSpan) errorSpan.remove();
        return undefined
    };
    let target: any = e.target;
    let validity: ValidityState = target.validity;
    let error: string = "";

    if(validity.valueMissing)
    error = target?.attributes["error-required"]?.nodeValue ?? errorListDescription.valueMissing;
    else if(validity.patternMismatch)
    error = target?.attributes["error-pattern"]?.nodeValue ?? errorListDescription.patternMismatch;

    else if(validity.tooShort)
    error = target?.attributes["error-minLength"]?.nodeValue ?? errorListDescription.rangeUnderflow;
    else if(validity.tooLong)
    error = target?.attributes["error-maxLength"]?.nodeValue ?? errorListDescription.rangeOverflow;

    else if(validity.rangeUnderflow)
    error = target?.attributes["error-min"]?.nodeValue ?? errorListDescription.rangeUnderflow;
    else if(validity.rangeOverflow)
    error = target?.attributes["error-max"]?.nodeValue ?? errorListDescription.rangeOverflow;
    
    
    console.log(validity);

    if (!errorSpan) {
        const errorSpan = document.createElement("div");
        errorSpan.classList.add("error");
        errorSpan.style.color = "red";
        errorSpan.style.fontSize = "14px";
        errorSpan.style.marginTop = "2px";
        errorSpan.style.marginBottom = "-18px";
        errorSpan.style.textAlign = "start";
        errorSpan.innerText = error;
        parentElement.appendChild(errorSpan);
    } else {
        errorSpan.innerText = error;
    }
}

const errorListner = () => {window.addEventListener("input", (e) => {inputError(e)},true)}
const removeListner = () => {window.removeEventListener("input", () => {},true)}

export { errorListner, inputError, removeListner };
