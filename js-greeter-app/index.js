// Set error effects
function setErr(elem, errMsg) {
  const hint = document.getElementById(elem);
  hint.style.display = "block";
  hint.innerHTML = errMsg;
  hint.parentElement.classList.add("form-error");
}

// Remove error effects
function removeErr(elem) {
  const hint = document.getElementById(elem);
  hint.style.display = "none";
  hint.parentElement.classList.remove("form-error");
}

document.querySelector("form").addEventListener("submit", e => {
  e.preventDefault();

  const name = document.getElementById("name");
  const gender = document.getElementsByName("gender");
  const status = document.getElementById("status");
  const dob = document.getElementById("date");
  const greeting = document.querySelector("#greeting");

  let d, year, birthDate, birthYear, age, title, time, greet;
  let nameVal, genderVal, statusVal, dobVal;
  let nameErr = (genderErr = statusErr = dobErr = true);

  if (name.value == "") {
    setErr("nameErr", "Insert Your Name");
  } else {
    let patt = /[^a-z0-9 ]/i;
    if (patt.test(name.value)) {
      setErr("nameErr", "Insert Your Valid Full Name");
    } else {
      removeErr("nameErr");
      nameErr = false;
      nameVal = name.value.trim();
    }
  }

  if (gender) {
    setErr("genderErr", "Select Your Gender");
    gender.forEach(button => {
      if (button.checked) {
        removeErr("genderErr");
        genderErr = false;
        genderVal = button.value;
      }
    });
  }

  if (status.value == "") {
    setErr("statusErr", "Select Your Marital Status");
  } else {
    removeErr("statusErr");
    statusErr = false;
    statusVal = status.value;
  }

  if (dob.value == "") {
    setErr("dobErr", "Select Your Date of Birth");
  } else {
    removeErr("dobErr");
    dobErr = false;
    dobVal = dob.value;
  }

  if ((nameErr || genderErr || statusErr || dobErr) === true) {
    return false;
  } else {
    d = new Date();

    time = d.getHours();
    greet =
      time < 12 ? "Good Morning" : time > 18 ? "Good Evening" : "Good Afternoon";

    year = d.getFullYear();
    birthDate = new Date(dobVal);
    birthYear = birthDate.getFullYear();
    age = year - birthYear >= 18 ? "adult" : "minor";

    if (genderVal == "male") {
      title = age == "adult" ? "Mr" : "Master";
    }

    if (genderVal == "female") {
      if (age == "minor") {
        title = "Miss";
      } else {
        title = statusVal == "single" || statusVal == "divorced" ? "Miss" : "Mrs";
      }
    }

    greeting.style.display = "block";
    greeting.innerHTML = `${greet}, ${title} ${nameVal}`;
  }
});
