// if remember me is false set cookie for session and but if it's true set cookie for 24 hours;
function setCookie(cookieName, cookieValue) {
  let now = new Date();
  now.setTime(now.getTime() + 24 * 60 * 60 * 1000);
  document.cookie = `${cookieName}=${cookieValue};path=/;expires=${now}; Secure`;
}

function deleteCookie(cookieName, cookieValue = "") {
  let now = new Date();
  let expDay = 1;
  now.setTime(now.getTime() - expDay * 24 * 60 * 60 * 1000);
  document.cookie = `${cookieName}=${cookieValue};path=/;expires=${now};`;
}

// all cookies is separated from each other with (;) sign and we need to split them and then search between them
function getCookie(cookieName) {
  let cookiesArray = document.cookie.split(";") ?? [];
  let mainCookie = null;
  cookiesArray.some((cookie) => {
    if (cookie.includes(cookieName)) {
      mainCookie = cookie.substring(cookie.indexOf("=") + 1);
      return true;
    }
  });
  return mainCookie;
}

// if we need to save a special cookie in localStorage
async function setInLocalStorage(itemName, itemContent) {
  itemName && itemContent && await window.localStorage.setItem(itemName, JSON.stringify(itemContent));
}

// if we need to get a special item in localStorage
function getFromLocalStorage(itemName) {
  return JSON.parse(localStorage.getItem(itemName));
}

// if we need to remove a special item in localStorage
function removeFromLocalStorage(itemName) {
  return localStorage.removeItem(itemName);
}

// When we need to fetch something from an API
async function fetchData(url, requestMethod = "GET", bodyParams = {}) {
  let output = await fetch(url, {
    method: requestMethod,
    headers: {
      "Accept": "Application/json",
      "Content-Type": "Application/json"
    },
    body: JSON.stringify(bodyParams)
  }).then(response => response.json())
    .then(result => result).catch(error => error)

  console.log(output)
  return output
}

// When we need to fetch something from an API
async function fetchGETData(url, queryParams = "") {
  console.log(url + queryParams);
  let output = await fetch(url + queryParams, {
    method: "GET",
    headers: {
      "Content-Type": "Application/json"
    }
  }).then(response => response.json())
    .then(result => result).catch(error => error)

  console.log(output);
  return output
}

// When we need to separate number by 3 digits
const numberSeparator = (balance) => {
  balance = balance.toString().split("");
  balance = Number(balance.join(""));
  balance = Intl.NumberFormat('en-US').format(balance)
  return balance;
};

const getStringArrayBasedOnBreaks = (description) => {
  var stringArray = description.trim().split("\n").join("").split("\\n");
  return stringArray;
}

export { getCookie, fetchGETData, getStringArrayBasedOnBreaks, deleteCookie, setCookie, setInLocalStorage, getFromLocalStorage, removeFromLocalStorage, fetchData, numberSeparator }