# Chefs Creations

Chef’s Creations is a website users can go to for recipe inspiration given the current pantry items they have available. Users will be able to add their food items in a form section and the algorithm would return a list of recipe ideas they could make given the inputted food items.

http://www.yatziryortiz.com/chefs_creations/


## Project Screenshots:

![landing-page2](https://user-images.githubusercontent.com/28818219/107005338-6b443000-6744-11eb-8511-379bc88332ff.png "Landing Page")

![recipe-lists2](https://user-images.githubusercontent.com/28818219/107005564-b8280680-6744-11eb-88c3-65ab5b24f8ff.png "Recipe List")

![modal-div](https://user-images.githubusercontent.com/28818219/107005648-d8f05c00-6744-11eb-99b2-95c949628cca.png "Modal Div")


## Technologies:

- HTML
- CSS
- Javascript (DOM manipulation)
- API: [Tasty API](https://rapidapi.com/apidojo/api/tasty/endpoints)
- Command Line
- Github


## User Stories

*MVP Goals:*
- As a user, I want a viable input form section to add my grocery items.
- As a user, I would like to be able to add at least one grocery item on the form to get recipe ideas.
- As a user, I want a button to indicate a feasible end to my inputted list. 
- As a user, I want a clean user interface design that is straightforward to use. 
- As a user, I want to be able to see options, like a list, of recipe ideas.
- As a user, I want to be able to access more information on the recipe ideas through a link.

*Stretch Goals:*
- As a user, I would like to add multiple grocery items on the form to get recipe ideas.
- As a user, I want to be able to see recipe ideas listed in a nice format with images.
- As a user, I would like to see my inputted grocery items after I have pushed the button to submit.
- As a user, I would like an indicator, like a progress ring, to let me know my recipe ideas are being processed. 
- As a user, I would like to open this page and have it formatted well on mobile. 


## Wireframes:

![landing-page](https://user-images.githubusercontent.com/28818219/107005729-fd4c3880-6744-11eb-83de-3a776addc3d3.jpg "Wireframe Landing Page")

![recipe-lists](https://user-images.githubusercontent.com/28818219/107005787-11903580-6745-11eb-8091-3aec5735ee99.jpg "Wireframe Recipe List")

## Unsolved Problems or Major Hurdles

Due to the inconsistency of the API, my web application does not currently fetch ingredients because I was running
into problems iterating and accessing them. As a continuation of my project, I would like to get this component onto the webpage.

Inconsistency among the API also pushed me to change my inital wireframe a bit. I built helper functions 
to handle null, undefined, or empty strings returned by the API to help me with this issue.

At times, my application may take a while to load leaving the user with uncertainty as to whether their data will be returned or
if the webpage "bugged out". As a continuation, I would like to build a progress ring or animation for that loading time.


