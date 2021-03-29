/* Global Variables */
const baseURL ='https://api.openweathermap.org/data/2.5/weather?zip=';
const apiKey = '&appid=413275d5c7a010a03592d7ac70c30249&units=metric';

// Create a new date instance dynamically with JS
let d = new Date();
let newDate = (d.getMonth()+1)+ '-'+ d.getDate()+'-'+ d.getFullYear();

// Event listener to add function to existing HTML DOM element
document.getElementById('generate').addEventListener('click', performAction);

/* Function called by event listener */
function performAction (event) {
  event.preventDefault();

    //Getting the user inputs
    const zipNo = document.getElementById('zip').value;
    const userFeedback = document.getElementById('feelings').value;

    //Return Alert if the user sends empty values 
    if (zipNo.length === 0 || userFeedback.length === 0)
        return alert("Please fill up all values !") 
    
  
    getweather(baseURL, zipNo, apiKey)
      .then(function (userData) {

        //Giving Alert if the city was not found
        if (userData.cod !== 200)
        alert('Enter a valid Zip Code  ' + userData.message)
        console.log(userData);

        /* add data to post request*/
        postData('http://localhost:8000/add', { date: newDate, temp: userData.main.temp, content: userFeedback})
     })
     //Calling updateUI function to update browser content
      .then( function (newData) {
        updateUI()
      
 })
}

//Async Function to get data from web API
const getweather = async (baseURL, zipNo, apiKey) => {
    const res = await fetch(baseURL + zipNo + apiKey);
    try{
        const userData = await res.json();
        console.log(userData)
        return userData;
        
       // appropriately handle the error
      }  catch(error) {
        console.log("error", error);
  
      }
    }
     /*Async Function to POST data to server */
    const postData= async (url = '', data = {}) => {
  console.log(data);
  const req= await fetch(url, {
    method: 'POST',
    credentials: 'same-origin',
    headers: {
      'Content-Type': 'application/json'
    },

    // body data type must match "Content-Type" header 
    body: JSON.stringify({
      date: data.date,
      temp: data.temp,
      content: data.content
    })
  });
  try {
    const newData = await req.json();
    console.log(newData);
    return newData;

    // appropriately handle the error
  } catch (error) {
    console.log("error", error);
  
  }
}

/*Async Function to GET Project Data */
const updateUI = async () => {
  const request = await fetch('http://localhost:8000/all');
  try{
    const allData = await request.json();

    // update new entry values
        document.getElementById('date').innerHTML = 'Date of the day: ' + allData.date;
        document.getElementById('temp').innerHTML ='The current temperature: ' + allData.temp + ' Celicius degrees';
        document.getElementById('content').innerHTML = 'The user feedback: ' + allData.content;
    
     // appropriately handle the error
  }catch(error) {
    console.log("error", error);
    
  }
}