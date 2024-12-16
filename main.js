let input = document.getElementsByTagName("input")[0];
let theTimes = document.getElementsByClassName("times")[0];
let date = document.getElementsByClassName("date")[0];
let nameOfCity = document.getElementsByClassName("nameOfCity")[0];

let inputValue = "";

let time = {
  Fajr: "",
  Dhuhr: "",
  Asr: "",
  Maghrib: "",
  Isha: "",
};
function getPrayerTimes(city) {
  return new Promise((resolve, reject) => {
    axios
      // .get("https://api.aladhan.com/v1/timingsByAddress/29-11-2024?address=cairo")
      .get(
        `https://api.aladhan.com/v1/timingsByAddress/29-11-2024?address=${city}`
      )
      .then((response) => {
        let times = response.data.data.timings;
        times = Object.entries(times);

        for (arr of times) {
          switch (arr[0]) {
            case "Fajr":
              time.Fajr = arr[1];
              showOnScreen("div", "time", theTimes, "Fajr", time.Fajr);
              break;
            case "Dhuhr":
              time.Dhuhr = arr[1];
              showOnScreen("div", "time", theTimes, "Dhuhr", time.Dhuhr);
              break;
            case "Asr":
              time.Asr = arr[1];
              showOnScreen("div", "time", theTimes, "Asr", time.Asr);
              break;
            case "Maghrib":
              time.Maghrib = arr[1];
              showOnScreen("div", "time", theTimes, "Maghrib", time.Maghrib);
              break;
            case "Isha":
              time.Isha = arr[1];
              showOnScreen("div", "time", theTimes, "Isha", time.Isha);
              break;
          }
        }
        resolve();
      })
      .catch(function (error) {
        alert(error.response.data.data);
        // console.log(error);
        // console.log(error.response.data.data);
      });
  });
}

input.onchange = function () {
  inputValue = input.value;
  theTimes.innerHTML = "";
  getPrayerTimes(inputValue).then(() => {
    handleElementOnScreen(inputValue);
  });
};

function handleElementOnScreen(inputValue) {
  nameOfCity.innerHTML = inputValue;
  date.innerHTML = getTheDate();
}
function getTheDate() {
  let today = new Date();

  // let day = (today.getDay() + 1).toString();
  let day = today.getDate();
  let Months = [
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "Jun",
    "Jul",
    "Aug",
    "Sep",
    "Oct",
    "Nov",
    "Dec",
  ];
  let month = Months[today.getMonth().toString()];
  let year = today.getFullYear().toString();
  let theDate = `${month} ${day} ${year}`;
  // console.log(today);
  // console.log(day);
  // console.log(month);
  // console.log(year);a
  // console.log(theDate);
  return theDate;
}

// start global functions

// show posts and users On Screen function
function showOnScreen(tag, parentClass, containerList, text, time) {
  // create parent for post / user
  let parentItem = createElement(tag, parentClass, null, containerList);

  // create first child of parent for post / user
  let childOneparentItem = createElement(tag, "name", text, parentItem);

  // create second child of parent for post / user
  let childTwoparentItem = createElement(tag, "prayer'sTime", time, parentItem);
}

// createElement function
function createElement(tag, className, textcontent, parent) {
  let element = document.createElement(tag);
  if (className) element.className = className;
  if (textcontent) element.textContent = textcontent;
  if (parent) parent.appendChild(element);
  return element;
}
// end global functions
