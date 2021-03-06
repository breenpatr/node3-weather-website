
//this is the client side javascript. heroku keys

const weatherForm = document.querySelector('form')
const search = document.querySelector('input')
const messageOne = document.querySelector('#message-1')
const messageTwo = document.querySelector('#message-2')
//messageOne.textContent = 'From Javascript'

weatherForm.addEventListener('submit', (e) => {
    console.log('event listener')
    // prevents the default submit for html form 
    e.preventDefault()
    const location = search.value
    messageOne.textContent = "Loading..."
    messageTwo.textContent = ""
    fetch('http://localhost:3000/weather?address=' + location).then((response) => {
        response.json().then((data) =>{
            if(data.error) {
                messageOne.textContent = data.error
                messageTwo.textContent = ''
            }
            else {
                messageOne.textContent = data.location
                messageTwo.textContent = data.forecast
            }
        })
    })
})