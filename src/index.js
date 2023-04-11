// Code here

// get IDs from HTML file
// beer-list
const beerList = document.getElementById("beer-list");

//class from HTML file
// beer-details
const beerDetails = document.getElementsByClassName("beer-details");

//ids from HTML file
// beer-name
// id for base img beer-image: has alt and src
// em (italics text) has beer-description
const beerName = document.getElementById("beer-name");
const beerImage = document.getElementById("beer-image");

// description-form -> label for description -> txtareaid = description (same info as beer-description)
const beerDesc = document.getElementById("beer-description");
const beertxtDesc = document.getElementById("description");

// review-list -> review-form -> label for review -> txtareaid = review
const beerRevList = document.getElementById("review-list");
const beerReviewList = beerRevList.querySelectorAll("li");
console.log(beerReviewList);

// from https://developer.mozilla.org/en-US/docs/Web/API/HTML_DOM_API
// from https://developer.mozilla.org/en-US/docs/Web/API/Fetch_API
// from https://rapidapi.com/guides/fetch-api-async-await

//const db = "http://localhost:3000/beers/";
//const res = fetch(db).then(response => {
	//console.log(response);
//});

async function getResponse() {
  //using the provided url for GET API and the async function
  const dbUrl = "http://localhost:3000/beers/";
  const beerId = 1; //in the example they are from 1 to 10
  const baseBeerDb = await fetch(dbUrl);
	const response = await fetch(dbUrl+`${beerId}`);

  //console.log(baseBeerDb);
  //using this to get the entire beer data list
  if (!baseBeerDb.ok) {
		throw new Error(`HTTP error! status: ${baseBeerDb.status}`);
	}
  const beerData = await baseBeerDb.json(); // Extracting data as a JSON Object from the baseBeerDb response
  
  //console.log(response);
  //using this to only select 1 item from the beerData in a new array in the const variable called response
  if (!response.ok) {
		throw new Error(`HTTP error! status: ${response.status}`);
	}
  const data = await response.json(); // Extracting data as a JSON Object from the response

  //console log for the whole beer data list
  //console.log(beerData); //console log for data retrieved from fetch() 
  //using [beerId] pushes array by 1
  //need to find a way to open the data array from the API URL File

  //for(let key in beerData) { //this line gets the specific key element when the beerData is loaded
      //console.log("key is showing: " + beerData[key]["name"]);
  //}
 
  // from https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/keys
  //const iterator = beerData.keys();

  //for (const key of iterator) {
    //console.log(`the value of iterator in key is: ${key}`); //used for debugging list, not actual iteration
    // replaceWith only puts one element at the end of the list
    // beerList.replaceWith("<li>" + beerData[key]["name"] + "</li>");
    // this method also would add to the existing list, not replace the template
    //beerList.innerHTML += "<li>" + beerData[key]["name"] + "</li>";
  //}

  // a better iteration and reduce function to replace the li items on the HTML page.
    // Reduce will iterate over all the array items and returns a single value.
    let listItems = beerData.reduce((result, item) => {
      // Add a string to the result for the current item. This syntax is using template literals.
      result += `<li>${item["name"]}</li>`;
      
      // Always return the result in the reduce callback, it will be the value or result in the next iteration.
      return result;
    }, ''); // The '' is an empty string, it is the initial value result.
    // Get the element from the DOM in which to display the list, this should be an ul or ol element.
    
  // Set the inner HTML for the nav list items within the beer-list ul for HTML
  beerList.innerHTML = listItems;

  // extra and unused keys for debug
  // let BeerListName = beerData[keys]["name"];
  // beerList.innerHTML = BeerListName;
  // console.log("the ID is: " + beerData['id']);
  // console.log("the Image is: " + beerData['image_url']);
  // console.log("the Description is: " + beerData['description']);
  // console.log("the review is: " + beerData['reviews']);

  //console log for a specific beer data
  // console.log(data); //console log for data retrieved from fetch()
  // console.log("the ID is: " + data['id']);
  // console.log("the Name is: " + data['name']);
  // console.log("the Image URL is: " + data['image_url']);
  // console.log("the Description is: " + data['description']);
  // console.log("the review is: " + data['reviews']);

  // new variable names to save data
  //const dataId = data['id'];
  const dataName = data['name'];
  const dataImageUrl = data['image_url'];
  const dataDesc = data['description'];
  const dataReview = data['reviews'];

  //setting the image URL directly, it is currently not possible to assign alt and src to a new variable
  document.getElementById("beer-image").src = dataImageUrl;
  document.getElementById("beer-image").alt = dataDesc;

  //remaking img html tag for debug
  //const imgSrc = `<img id="beer-image" alt="${description}" src="${beerImage}" />`;
  //console.log(imgSrc);
  //beerImage.innerHTML = imageUrl;
  //console.log(beerImage);

  //accessing from document.getElementById then setting values of the 1 data['id'] beer value
  beerName.innerText = dataName;
  beerDesc.innerText = dataDesc;
  beertxtDesc.innerText = dataDesc;

  //loading the list of review items for a specific data['id'] beer value
  // Reduce will iterate over all the array items and returns a single value.
  let listReviewItems = dataReview.reduce((result, item) => {
    // Add a string to the result for the current item. This syntax is using template literals.
    result += `<li>${item}</li>`;
    //result += `${item}\n`;
    // Always return the result when list iteration is complete.
    return result;
  }, ''); // The '' is an empty string, it is the initial value result.
  // Get the element from the DOM in which to display the list, this should be an ul or ol element.
  
  // Set the innerHTML for the list items within the review-list ul for HTML
  //beerRevList.innerHTML = listReviewItems;
  //console.log(listReviewItems);
  //beerReviewList.innerHTML = listReviewItems;
  beerRevList.innerHTML = listReviewItems;
}
getResponse(); //calling the async GET function above that goes through the db.json URL file
