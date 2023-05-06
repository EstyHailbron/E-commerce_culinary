
$("#signup").click(function () {
  $(".message").css("transform", "translateX(100%)");
  if ($(".message").hasClass("login")) {
    $(".message").removeClass("login");
  }
  $(".message").addClass("signup");
});

$("#login").click(function () {
  $(".message").css("transform", "translateX(0)");
  if ($(".message").hasClass("login")) {
    $(".message").removeClass("signup");
  }
  $(".message").addClass("login");
});
// // התחברות
const _sighUpButton = document.querySelector('#_sighUpButton');
let ourUsers = JSON.parse(localStorage.getItem('uesrsDetails')) || [];

_sighUpButton.onclick = () => {
  let flag = false;
  // input שומר את הערך שהוכנס בכל 
  const UserName = document.querySelector('.username').value;
  const userCode = document.querySelector('.userCode').value;
  const user_email = document.querySelector('.user_email').value;
  // // ולידציות לבדיקת תקינות הקלט 
  if (UserName === "" || userCode === "" || user_email === "") {
    alert('יש לציין את כל הפרטים');
    return;
  }
  for (let i = 0; i < ourUsers.length; i++) {
    // אם השם הנוכחי קיים כבר 

    if (ourUsers[i].Name === UserName && ourUsers[i].Mail === user_email && ourUsers[i].Password === userCode) {
      flag = true;
    }
  }
  if (flag === false) {
    let object = {
      Name: UserName,
      Mail: user_email,
      Password: userCode,
      number: "",
      inputname: "",
      buexpirey: "",
      ccv: "",
    }
    ourUsers.push(object);
    localStorage.setItem('uesrsDetails', JSON.stringify(ourUsers));
    alert('נוספת בהצלחה למערכת!!');
    localStorage.setItem('currentUser', JSON.stringify(object));

    //////////////////////////////////
    // מעבר לדף הבית

    location.href =`index.html`;
    //window.location.assign("https://www.w3schools.com")

  }
  else {
    alert('➡ log in -משתמש קיים. עבור ל');
    Name = "";
    Password = "";
    Mail = "";

  }

}

const login_ = document.querySelector('#login_2');
const oldUsers = JSON.parse(localStorage.getItem('uesrsDetails'));
login_.onclick = () => {
  debugger;
  let correct = false;
  const name1 = document.querySelector('.nameLog').value;
  const Password2 = document.querySelector('.passwordlog').value;
  if (name1 === "" || Password2 === "") {
    alert('חלק מהפרטים לא הושלמו!');
    return;
  }
  for (let j = 0; j < oldUsers.length && correct === false; j++) {
    if (oldUsers[j].Name === name1 && oldUsers[j].Password === Password2) {
      correct = true;
      alert(' שלום' + " " + name1);
      localStorage.setItem('currentUser', JSON.stringify(oldUsers[j]));
      debugger
      // מעבר לדף הבית
      const url = new URL(location.href);
      // url.pathname = `./index.html`;
      // location.href = url;
      location.href =`index.html`;

      // location.href=`/index.html`
      debugger

      //////////////////////////////////

    }
  }
  if (correct === false) {
    alert('  עבור  להרשמה הפרטים אינם תואמים ,נסה שוב!');
  }

}