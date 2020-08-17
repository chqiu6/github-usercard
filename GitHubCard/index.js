import axios from "axios";
/*
  STEP 1: using axios, send a GET request to the following URL
    (replacing the placeholder with your Github name):
    https://api.github.com/users/<your name>
*/
axios
.get("https://api.github.com/users/chqiu6")
.then(res => {
  console.log("step 1 res data", res);
})
.catch(err => {
  console.log("step 1 err msg", err);
});
/*
  STEP 2: Inspect and study the data coming back, this is YOUR
    github info! You will need to understand the structure of this
    data in order to use it to build your component function

    Skip to STEP 3.
*/

/*
  STEP 4: Pass the data received from Github into your function,
    and append the returned markup to the DOM as a child of .cards
*/
axios 
.get("https://api.github.com/users/chqiu6")
.then(res =>{
  console.log("step4 res ",res);
  const cards = document.querySelector(".cards");
  cards.appendChild(cardMake(res));
})
.catch(err =>{
  console.log("step4 err",err);
});

/*
  STEP 5: Now that you have your own card getting added to the DOM, either
    follow this link in your browser https://api.github.com/users/<Your github name>/followers,
    manually find some other users' github handles, or use the list found at the
    bottom of the page. Get at least 5 different Github usernames and add them as
    Individual strings to the friendsArray below.

    Using that array, iterate over it, requesting data for each user, creating a new card for each
    user, and adding that card to the DOM.
*/

const followersArray = ["tetondan", "dustinmyers", "justsml", "luishrd", "bigknell"];
followersArray.forEach(instructors => {
  axios
  .get(`http://api.github.com/users/${instructors}`)
  .then(res => {
    console.log("step 5 res", res);
    const instructorCard = cardMake(res);
    const cards = document.querySelector(".cards");
    cards.appendChild(instructorCard);
  })
  .catch(err =>{
    console.log("step 5 err", err);
  });
});
/*
  STEP 3: Create a function that accepts a single object as its only argument.
    Using DOM methods and properties, create and return the following markup:

    <div class="card">
      <img src={image url of user} />
      <div class="card-info">
        <h3 class="name">{users name}</h3>
        <p class="username">{users user name}</p>
        <p>Location: {users location}</p>
        <p>Profile:
          <a href={address to users github page}>{address to users github page}</a>
        </p>
        <p>Followers: {users followers count}</p>
        <p>Following: {users following count}</p>
        <p>Bio: {users bio}</p>
      </div>
    </div>
*/
function cardMake(res){
  const cardDiv = document.createElement("div");
  const imgUrl = document.createElement("img");
  const cardInfo = document.createElement("div");
  const h3Name = document.createElement("h3");
  const pUsername = document.createElement("p");
  const pLocation = document.createElement("p");
  const pProfile = document.createElement("p");
  const aLink = document.createElement("a");
  const pFollowers = document.createElement("p");
  const pFollowing = document.createElement("p");
  const pBio = document.createElement("p");

cardDiv.appendChild(imgUrl);
cardDiv.appendChild(cardInfo);
cardInfo.appendChild(h3Name);
cardInfo.appendChild(pUsername);
cardInfo.appendChild(pLocation);
cardInfo.appendChild(pProfile);
pProfile.appendChild(aLink);
cardInfo.appendChild(pFollowers);
cardInfo.appendChild(pFollowing);
cardInfo.appendChild(pBio);

cardDiv.classList.add("card");
cardInfo.classList.add("card-info");
h3Name.classList.add("name");
pUsername.classList.add("username");

imgUrl.src = res.data.avatar_url;
h3Name.textContent = res.data.name;
pUsername.textContent = res.data.login;
pLocation.textContent = res.data.location;
pProfile.textContent = "Profile: ";
aLink.href = res.data.html_url;
aLink.textContent = res.data.html_url;
pFollowers.textContent = `Followers : ${res.data.followers}`;
pFollowing.textContent = `Following : ${res.data.following}`;
pBio.textContent = `Bio : ${res.data.bio}`;

return cardDiv;
}
/*
  List of LS Instructors Github username's:
    tetondan
    dustinmyers
    justsml
    luishrd
    bigknell
*/
