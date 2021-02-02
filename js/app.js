console.log('sanity check');

//Global Variables
const requestURL = 'https://tasty.p.rapidapi.com/recipes/list?from=0&size=20&q=';

//Element Selection
const form = document.querySelector('form');
const container = document.querySelector('#container');

//Helper function -- parse and concatenate inputted values to url to fetch
const parseInputs = (url, item) => {
    let parseItems = '';
    let itemArr = item.split(", ");
    for (let i=0; i < itemArr.length; i++){
        if(i===0){
            parseItems += itemArr[i];
        }else{
            parseItems += `%2C%20${itemArr[i]}`;
        }
    }
    return `${url}${parseItems}`;
}

//Fetching requested data from user input and making divs/card for each recipe
form.addEventListener('submit', function(evt){
    evt.preventDefault();
    
    let input = document.querySelector('#input'); //NOTE: need to clear input later on
    //using helper function to parse inputted value to url so we can fetch list of recipes
    let request = parseInputs(requestURL,input.value); 
    console.log(request);

    fetch(request, {
        method: "GET",
        headers: {
            'x-rapidapi-key': "45388f25f4msh17fcbb6e059988ep100f39jsn4c1085b3b42c",
            'x-rapidapi-host': "tasty.p.rapidapi.com"
        }
    })
    .then(function(response){
        return response.json();
    })
    .then(function(responseData){
        //console.log(responseData.results); //is array
        let recipeArray = responseData.results;
        console.log(recipeArray);

        //iterate through recipes
        for (let i=0; i<recipeArray.length; i++){
            //make div for each recipe
            let recipeName = recipeArray[i].name;
            let recipePrepTime = recipeArray[i]['prep_time_minutes'];
            let recipeCookTime = recipeArray[i]['cook_time_minutes'];
            let recipeServingSize = recipeArray[i]['num_servings'];
            makeDivs(i, recipeName, recipePrepTime, recipeCookTime, recipeServingSize);
        }
    })
    .catch((error) => {
        console.log('ERROR: ', error);
    })
})

//more helper functions

//make divs for each recipe object -> this will be like a card
const makeDivs = (i, name, prepTime, cookTime, servingSize) => {
    const div = document.createElement('div');
    div.setAttribute('class', 'card');
    div.textContent = `This is div ${i}`;
    container.appendChild(div);
    //console.log(div);
    addName(div, name);
    addTimesAndServingSize(div, prepTime, cookTime, servingSize);
}

//add name of recipe to div
const addName = (div, name) =>{
    const nameHeader = document.createElement('h2');
    nameHeader.setAttribute('class', `names`);
    nameHeader.textContent = name;
    div.appendChild(nameHeader);
}
//add prep time, cook time, and serving size to each card recipe
const addTimesAndServingSize = (div, prep, cook, servings) => {
    //create inner div
    const logisticDiv = document.createElement('div');
    logisticDiv.setAttribute('class','logistics');

    //create p tags for each component and given them class names
    //prep
    const prepP = document.createElement('p');
    prepP.setAttribute('class','prep');
    prepP.textContent = `Estimated prep time: ${prep}`;
    //cook
    const cookP = document.createElement('p');
    cookP.setAttribute('class','cook');
    cookP.textContent = `Estimated cook time: ${cook}`;
    //servings
    const servingsP = document.createElement('p');
    servingsP.setAttribute('class','servings');
    servingsP.textContent = `Estimated serving size: ${servings}`;

    //append p to inner div and then to recipe div
    logisticDiv.appendChild(prepP);
    logisticDiv.appendChild(cookP);
    logisticDiv.appendChild(servingsP);

    div.appendChild(logisticDiv);
}



// fetch((`${requestURL}bacon%2C%20egg`), { //will need to create a helper function to parse items like this
// 	method: "GET",
// 	headers: {
// 		'x-rapidapi-key': "45388f25f4msh17fcbb6e059988ep100f39jsn4c1085b3b42c",
// 		'x-rapidapi-host': "tasty.p.rapidapi.com"
// 	}
// })
// .then(function(res){
//     return res.json();
// })
// .then(function(resData){
//     console.log(resData.results);
//     // for(let i=0; i< resData.results.length; i++){
//     //     //console.log(resData.results[i].name); gets name of recipe
//     //     //console.log(resData.results[i]['thumbnail_url']); //thumbnail url
//     //     //console.log(resData.results[i]['prep_time_minutes']); //prep time -> a lot come out as null so set a default to N/A
//     //     //console.log(resData.results[i]['cook_time_minutes']); //cook time -> set default to n/a
//     //     //console.log(resData.results[i]['num_servings']); //num of servings
//     //     //console.log(resData.results[0].instructions[0]['display_text']); //first step in instructions, diff per recipe -> will need to do a loop
//     // } 
// })
// .catch((error) => {
//     console.log('ERROR: ', error);
// })