console.log('Client side js file is loaded ')

const weatherForm = document.querySelector('form');
const searchElem = document.querySelector('input')
const errorMsg = document.querySelector('#errorMsg');
const msg = document.querySelector('#msg');

const getLocation = (location) => {
    fetch(`http://localhost:3000/weather?address=${location}`).then((response)=>{
     response.json().then((data, error)=>{
         console.log(data)
         console.log('TTTTT', error)
        if(data.error){
            console.log(data.error)
            errorMsg.textContent = data.error;
            return; 
        }
        errorMsg.textContent = data.location;
        msg.textContent = data.forecast;
     
    })
    })
    // .catch((error)=>{
    //     errorMsg.textContent = 'Please try other location'
    // })
}




weatherForm.addEventListener('submit', (event )=>{
    event.preventDefault();
    const location = searchElem.value;
    errorMsg.textContent = 'Loading'
    getLocation(location)
});


