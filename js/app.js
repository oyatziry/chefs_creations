console.log('sanity check');

const requestURL = 'https://tasty.p.rapidapi.com/recipes/list?from=0&size=20&tags=under_30_minutes&q=';
fetch((`${requestURL}bacon%2C%20egg`), { //will need to create a helper function to parse items like this
	method: "GET",
	headers: {
		'x-rapidapi-key': "45388f25f4msh17fcbb6e059988ep100f39jsn4c1085b3b42c",
		'x-rapidapi-host': "tasty.p.rapidapi.com"
	}
})
.then(function(res){
    return res.json();
})
.then(function(resData){
    console.log(resData.results);
    // for(let i=0; i< resData.results.length; i++){
    //     //console.log(resData.results[i].name); gets name of recipe
    //     //console.log(resData.results[i]['thumbnail_url']); //thumbnail url
    //     //console.log(resData.results[i]['prep_time_minutes']); //prep time -> a lot come out as null so set a default to N/A
    //     //console.log(resData.results[i]['cook_time_minutes']); //cook time -> set default to n/a
    //     //console.log(resData.results[i]['num_servings']); //num of servings
    //     //console.log(resData.results[0].instructions[0]['display_text']); //first step in instructions, diff per recipe -> will need to do a loop
    // } 
})
.catch((error) => {
    console.log('ERROR: ', error);
})