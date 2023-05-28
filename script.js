const url = "https://api.github.com/users/";
const seachBar = document.querySelector(".search_user");
const submitButton = document.querySelector(".search_submit");
const error = document.querySelector(".search_error");
const avatar = document.querySelector(".avatar");
const userName = document.querySelector(".name");
const gitDate = document.querySelector(".dateGit");
const numRepos = document.querySelector(".number_Repos");
const numFollowers = document.querySelector(".number_folowers");
const numFollowing = document.querySelector(".number_following");
const bio = document.querySelector(".bio");
const mapData = document.querySelector(".map_return");
const twitterData = document.querySelector(".twitter_return");
const websiteData = document.querySelector(".website_retuen");
const compantData = document.querySelector(".company_return");
const loginData = document.querySelector(".login");
const mode = document.querySelector(".mode");
const modeText = document.querySelector(".mode_text");
const modeIcon = document.querySelector(".mode_icon");

mode.addEventListener("click", () => {
  document.body.classList.toggle("dark-theme");
  if (document.body.classList.contains("dark-theme")) {
    modeIcon.src = "/assets/icon-sun.svg";
    modeText.innerText = "Light";
  } else {
    modeIcon.src = "/assets/icon-moon.svg";
    modeText.innerText = "Dark";
  }
});

mode.addEventListener("click", () => {
  document.body.classList.toggle("light_theme");
  if (document.body.classList.contains("light_theme")) {
    modeIcon.src = "/assets/icon-moon.svg";
    modeText.innerText = "Dark";
  } else {
    modeIcon.src = "/assets/icon-sun.svg";
    modeText.innerText = "Light";
  }
});

submitButton.addEventListener("click", () => {
  if (seachBar.value !== "") {
    getUserData(url + seachBar.value);
  }
});

seachBar.addEventListener("keydown", (e) => {
  if (e.key == "Enter") {
    getUserData(url + seachBar.value);
  }
});

function getUserData(userAcount) {
  fetch(userAcount)
    .then((res) => res.json())
    .then((data) => {
      console.log(data);
      updateUser(data);
    })
    .catch((error) => {
      console.log(error);
      throw error;
    });
}

function updateUser(data) {
  if (data.message === "Not Found") {
    error.style.display = "block";
  } else {
    error.style.display = "none";
    avatar.src = data.avatar_url;
    userName.innerText = data.name;
    gitDate.innerText =
      "Joined " +
      data.created_at.substring(8, 10) +
      " " +
      data.created_at.substring(5, 7) +
      " " +
      data.created_at.substring(0, 4);
    numRepos.innerText = data.public_repos;
    numFollowers.innerText = data.followers;
    numFollowing.innerText = data.following;
    bio.innerText = data.bio == null ? "This profile has no bio" : data.bio;
    mapData.innerText = data.location == null ? "No location" : data.location;
    if (data.location == null) {
      mapData.classList.add("noavalible");
      mapData.innerText = "No avalible";
    } else {
      mapData.classList.remove("noavalible");
      mapData.innerText = data.location;
    }
    if (data.twitter_username == null) {
      twitterData.classList.add("noavalible");
      twitterData.innerText = "No avalible";
    } else {
      twitterData.classList.remove("noavalible");
      twitterData.innerText = data.twitter_username;
    }
    if (data.blog == []) {
      websiteData.classList.add("noavalible");
      websiteData.innerText = "No avalible";
    } else {
      websiteData.classList.remove("noavalible");
      websiteData.innerText = data.blog;
    }
    websiteData.href = data.blog;
    if (data.company == null) {
      compantData.classList.add("noavalible");
      compantData.innerText = "No avalible";
    } else {
      compantData.classList.remove("noavalible");
      compantData.innerText = data.company;
    }
    loginData.innerText = "@" + data.login;
  }
}
