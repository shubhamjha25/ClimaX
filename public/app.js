let mainNav = document.getElementById('js-menu');
let navBarToggle = document.getElementById('js-navbar-toggle');

navBarToggle.addEventListener('click', function () {
    
    mainNav.classList.toggle('active');
});

const curDate = document.getElementById("date");
let weatherCondition = document.getElementById("weather-condition");

const temp = "Clouds";

const getCurrentDay = () => {
    let currentTime = new Date();
    var weekdays = ["SUN", "MON", "TUE", "WED", "THU", "FRI", "SAT"];
    return weekdays[currentTime.getDay()];
};

const getCurrentTime = () => {
    var timeNow = new Date();
    var month = timeNow.getMonth();
    var day = timeNow.getDate();
    var year = timeNow.getFullYear();

    var months = ["JAN", "FEB", "MAR", "APR", "MAY", "JUNE", "JULY", "AUG", "SEP", "OCT", "NOV", "DEC"];

    let hours = timeNow.getHours();
    let minutes = timeNow.getMinutes();

    let meredian = "AM";

    if(hours > 11) {
        meredian = "PM";
        if(hours > 12)
            hours = hours - 12;
    }    

    if (minutes < 10) {
        minutes = "0" + minutes;
    }

    return `${months[month]} ${day}  |  ${hours}:${minutes}${meredian}`;
};

curDate.innerHTML = getCurrentDay() + " | " + getCurrentTime();