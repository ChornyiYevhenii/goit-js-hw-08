
const throttle = require("lodash.throttle");

const refs = {
    form: document.querySelector('.feedback-form'),
    textarea: document.querySelector('.feedback-form textarea'),
    input: document.querySelector('.feedback-form input'),
}

refs.form.addEventListener('submit', onFormSubmit)
refs.form.addEventListener('input', throttle(onTextareaOrInputDataEntry, 500))

const data = {
    message: '',
    email: '',
};

dataOutputAfterReboot();
checkOfEnteredData();

function onFormSubmit (e){
    e.preventDefault()

    let formData = new FormData(e.target)
    formData.forEach((value, name) => {
        data[name] = value
    })
    console.log(data)

    e.target.reset()
    localStorage.removeItem("feedback-form-state")

}

function onTextareaOrInputDataEntry (e){
    const value = e.target.value
    const name = e.target.name
    data[name] = value;
    recordsData(data)
}

function recordsData(data){
    localStorage.setItem("feedback-form-state", JSON.stringify(data))
}

function checkOfEnteredData(){
if (refs.textarea.value){
    data.message = refs.textarea.value;
    localStorage.setItem("feedback-form-state", JSON.stringify(data))
}
if (refs.input.value){
    data.email = refs.input.value;
    localStorage.setItem("feedback-form-state", JSON.stringify(data))
}
}

function dataOutputAfterReboot(){
    const saveData = JSON.parse(localStorage.getItem("feedback-form-state"));
    if(saveData) {
            refs.textarea.value = saveData.message;
            refs.input.value = saveData.email;
            return saveData
    } 
    
}




// import throttle from 'lodash.throttle';

// const FEEDBACKKEY = 'feedback-form-state';
// let feedbackFormState = {
//   // clear() {
//   //   keys = Object.keys(this);
//   //   keys.forEach(key => {
//   //     // clear all values from object, eccept this function
//   //     if (key !== 'clear') {
//   //       delete this[key];
//   //     }
//   //   });
//   // },
// };

// const refs = document.querySelector('.js-feedback-form');

// refs.addEventListener('submit', onFormSubmit);
// refs.addEventListener('input', throttle(onFormInput, 500));

// populateContent();

// function onFormSubmit(evt) {
//   evt.preventDefault();

//   console.log(feedbackFormState);
//   evt.currentTarget.reset();
//   localStorage.removeItem(FEEDBACKKEY);
//   feedbackFormState = {};
// }

// function onFormInput(evt) {
//   feedbackFormState[evt.target.name] = evt.target.value;
//   localStorage.setItem(FEEDBACKKEY, JSON.stringify(feedbackFormState));
// }

// function populateContent() {
//   const feedback = JSON.parse(localStorage.getItem(FEEDBACKKEY));
//   if (!feedback) {
//     return;
//   }
//   //   console.log('feedback', feedback);

//   const feedbackKeys = Object.keys(feedback);
//   feedbackKeys.forEach(key => {
//     const formElement = refs.querySelector(`*[name=${key}]`);
//     // console.log(formElement);
//     formElement.value = feedback[key];
//     feedbackFormState[key] = feedback[key];
//   });
// }
