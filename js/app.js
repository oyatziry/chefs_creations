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

    //if user submits another request, clear current recipes on container
    container.innerHTML = "";
    
    let input = document.querySelector('#input'); //NOTE: need to clear input later on
    //using helper function to parse inputted value to url so we can fetch list of recipes
    let request = parseInputs(requestURL,input.value); 
    console.log(request);

    //change landing page css so container with div recipe cards can fit
    document.querySelector('body').style.backgroundColor = '#fbf1e3';
    document.querySelector('body').style.display = 'revert';
    form.style.display = 'flex';
    form.style.justifyContent = 'flex-end';

    //Getting/fetching data from Tasty API
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
            //get specified data from recipe array
            let recipeName = recipeArray[i].name;
            let thumbnailURL = recipeArray[i]['thumbnail_url'];
            let recipePrepTime = recipeArray[i]['prep_time_minutes'];
            let recipeCookTime = recipeArray[i]['cook_time_minutes'];
            let recipeServingSize = recipeArray[i]['num_servings'];
            let recipeDescription = recipeArray[i]['description'];
            let recipeInstructionsArr = recipeArray[i]['instructions']; //will return array of objects

            //call makeDivs to start listing recipes
            makeDivs(i, recipeName, thumbnailURL, recipePrepTime, recipeCookTime, recipeServingSize, recipeDescription, recipeInstructionsArr);
        }
    })
    .catch((error) => {
        console.log('ERROR: ', error);
    })
})

//more helper functions

//make divs for each recipe object -> this will be like a card
const makeDivs = (i, name, thumbnail, prepTime, cookTime, servingSize, descriptions, instructionsArr) => {
    const div = document.createElement('div');
    div.setAttribute('class', 'card');
    container.appendChild(div);
    //helper functions to add text and image to each Recipe div
    addName(div, name);
    addImage(div, thumbnail);
    addTimesAndServingSize(div, prepTime, cookTime, servingSize, descriptions, instructionsArr);
}

//add name of recipe to div
const addName = (div, name) => {
    const nameHeader = document.createElement('h2');
    nameHeader.setAttribute('class', `names`);
    nameHeader.textContent = name;
    div.appendChild(nameHeader);
}

//add image of recipe -> Note: data sends in a url of image
const addImage = (div, imageURL) => {
    const img = document.createElement('img');
    img.setAttribute('src', imageURL);
    img.setAttribute('alt', 'Image of Recipe');
    img.setAttribute('height', '300px');
    div.appendChild(img);
}

//add prep time, cook time, and serving size to each card recipe
const addTimesAndServingSize = (div, prep, cook, servings, description, arrInstructions) => {
    //create inner div
    const logisticDiv = document.createElement('div');
    logisticDiv.setAttribute('class','logistics');

    //create p tags for each component and given them class names
    //prep
    const prepP = document.createElement('p');
    prepP.setAttribute('class','prep');
    prep = changeNullOrUndefined(prep);
    prepP.textContent = `Prep time: ${prep}`;
    //cook
    const cookP = document.createElement('p');
    cookP.setAttribute('class','cook');
    cook = changeNullOrUndefined(cook);
    cookP.textContent = `Cook time: ${cook}`;
    //servings
    const servingsP = document.createElement('p');
    servingsP.setAttribute('class','servings');
    servings = changeNullOrUndefined(servings);
    servingsP.textContent = `Serving size: ${servings}`;

    //description
    const des = document.createElement('p');
    des.setAttribute('class', 'descriptions');
    description = changeNullOrUndefined(description);
    des.innerHTML = `Description: ${description}`;
    //div.appendChild(des);

    //create modal button
    const modalBtn = document.createElement('button');
    modalBtn.setAttribute('id', 'modal-button');
    modalBtn.textContent = "Let's start creating!";
    modalBtn.style.marginBottom = '10px';

    //append p to inner div and then to recipe div
    logisticDiv.appendChild(prepP);
    logisticDiv.appendChild(cookP);
    logisticDiv.appendChild(servingsP);
    logisticDiv.appendChild(des);
    logisticDiv.appendChild(modalBtn);

    div.appendChild(logisticDiv);

    //create modal
    modalBtn.onclick = function(){
        console.log('modal button clicked!');
        //create modal div
        const modalDiv = document.createElement('div');
        modalDiv.setAttribute('class', 'modal-div');

        //create modal div for content
        const modalContent = document.createElement('div');
        modalContent.setAttribute('class','modal-content');

        //add header to modal div
        const modalHeader = document.createElement('h2');
        modalHeader.setAttribute('class', 'modal-header');
        modalHeader.textContent = `Let's start creating!`;

        //add instruction list to modal div
        //Note: instructions are in an array of objects so we need to iterate to get each step
        const list = document.createElement('ol');
        list.setAttribute('class', 'instructions-list');
        for(let j=0; j<arrInstructions.length; j++){
            const li = document.createElement('li');
            li.setAttribute('class','instruction-li');
            li.textContent = arrInstructions[j]['display_text'];
            list.appendChild(li);
        }

        //append everything
        modalContent.appendChild(modalHeader);
        modalContent.appendChild(list);
        modalDiv.appendChild(modalContent);
        document.querySelector('body').appendChild(modalDiv);

        //open modal
        modalDiv.style.display = 'block';

        // When the user clicks anywhere outside of the modal, close it
        window.onclick = function(event) {
            if (event.target == modalDiv) {
                modalDiv.style.display = "none";
            }
        }
    };
}

//checks if API is return null, undefined, or empty string and changes to N/A
const changeNullOrUndefined = (text) => {
    if(text === null){
        return 'N/A';
    }
    else if(text === undefined){
        return 'N/A';
    }
    else if(text === ""){
        return 'N/A';
    }
    else{
        return text;
    }
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
            // console.log(resData.results[i].instructions[j]['display_text']);
//     // } 
// })
// .catch((error) => {
//     console.log('ERROR: ', error);
// })