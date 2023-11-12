const send = document.querySelector(".circle");
// for error
const dayError = document.querySelector(".error-day");
const mthError = document.querySelector(".error-mth");
const yrError = document.querySelector(".error-yr");
// for label
const d_label = document.querySelector(".d-red");
const m_label = document.querySelector(".m-red");
const y_label = document.querySelector(".y-red");

function emptyChecker(arr) {
  ans = true;
  for (let i = 0; i < arr.length; i++) {
    if (arr[i] == "") {
      ans = false;
      break;
    }
  }
  return ans;
}

function dateCalc(date) {
  now = new Date();
  let diff = Math.floor(now.getTime() - date.getTime());
  let day = 1000 * 60 * 60 * 24;

  let d = Math.floor(diff / day);
  let m = Math.floor(d / 31);
  let y = Math.floor(m / 12);

  return [d, m, y];
}

function checker(arr) {
  limits = {
    0: 31,
    1: 12,
    2: 2023,
  };
  numOfDates = {
    1: 31,
    2: 29,
    3: 31,
    4: 30,
    5: 31,
    6: 30,
    7: 31,
    8: 31,
    9: 30,
    10: 31,
    11: 30,
    12: 31,
  };
  if (numOfDates[arr[1]] < arr[0]) {
    for (let i = 0; i < 3; i++) {
      document.querySelector(`.error-day`).textContent = "Must be a valid date";
      document.querySelector(
        `${i == 0 ? "#dd" : i == 1 ? "#mm" : "#yy"}`
      ).style.borderColor = "hsl(0,100%,67%";
      document.querySelector(
        `${i == 0 ? ".d" : i == 1 ? ".m" : ".y"}-red`
      ).style.color = "hsl(0, 100%, 67%)";
    }
  } else if (
    !emptyChecker(arr) ||
    arr[0] > limits[0] ||
    arr[1] > limits[1] ||
    arr[2] > limits[2]
  ) {
    for (let i = 0; i < 3; i++) {
      if (!arr[i]) {
        document.querySelector(
          `.error${`${i == 0 ? "-day" : i == 1 ? "-mth" : "-yr"}`}`
        ).textContent = "This field is required";
        document.querySelector(
          `${i == 0 ? "#dd" : i == 1 ? "#mm" : "#yy"}`
        ).style.borderColor = "hsl(0,100%,67%";
        document.querySelector(
          `${i == 0 ? ".d" : i == 1 ? ".m" : ".y"}-red`
        ).style.color = "hsl(0, 100%, 67%)";
      } else if (arr[i] > limits[i]) {
        document.querySelector(
          `.error${`${i == 0 ? "-day" : i == 1 ? "-mth" : "-yr"}`}`
        ).textContent = `Must be a valid ${
          i == 0 ? "day" : i == 1 ? "month" : "year"
        }`;
        document.querySelector(
          `${i == 0 ? "#dd" : i == 1 ? "#mm" : "#yy"}`
        ).style.borderColor = "hsl(0,100%,67%";
        document.querySelector(
          `${i == 0 ? ".d" : i == 1 ? ".m" : ".y"}-red`
        ).style.color = "hsl(0, 100%, 67%)";
      } else {
        document.querySelector(
          `.error${`${i == 0 ? "-day" : i == 1 ? "-mth" : "-yr"}`}`
        ).textContent = "";
        document.querySelector(
          `${i == 0 ? "#dd" : i == 1 ? "#mm" : "#yy"}`
        ).style.borderColor = "black";
        document.querySelector(
          `${i == 0 ? ".d" : i == 1 ? ".m" : ".y"}-red`
        ).style.color = "black";
      }
    }
  } else if (emptyChecker(arr)) {
    document.querySelector(
      `.error${`${i == 0 ? "-day" : i == 1 ? "-mth" : "-yr"}`}`
    ).textContent = "";
    document.querySelector(
      `${i == 0 ? "#dd" : i == 1 ? "#mm" : "#yy"}`
    ).style.borderColor = "black";
    document.querySelector(
      `${i == 0 ? ".d" : i == 1 ? ".m" : ".y"}-red`
    ).style.color = "black";

    ans = dateCalc(new Date(arr[2], arr[1], arr[0]));
    // tada
    document.querySelector(".year").textContent = ans[2];
    document.querySelector(".month").textContent = ans[1];
    document.querySelector(".day").textContent = ans[0];
  }
}

send.addEventListener("click", function () {
  const dayInput = document.querySelector("#dd").value;
  const monthInput = document.querySelector("#mm").value;
  const yearInput = document.querySelector("#yy").value;

  checker([dayInput, monthInput, yearInput]);
});
