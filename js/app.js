console.log('sanity check');

const form = document.querySelector('form');

const requestURL = 'https://tasty.p.rapidapi.com/recipes/list?from=0&size=20&q=';

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

form.addEventListener('submit', function(evt){
    evt.preventDefault();
    
    let input = document.querySelector('#input'); //need to clear input later on
    let request = parseInputs(requestURL,input.value); //parse inputted value to url so we can fetch
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
        console.log(responseData.results);
    })
    .catch((error) => {
        console.log('ERROR: ', error);
    })
})


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