function getData() {
    $.getJSON("../data/data.json", function (data) {
        console.log(data);

        $.each(data.Students, function (idx, student) {
            $("#content").append(`<div>
            <p>Name: ${student.studentName}</p>
            <p>GPA: ${student.studentGPA}</p>
            <p>${student.studentAddress.streetNumber}<br>
            ${student.studentAddress.city} 
            ${student.studentAddress.state} 
            ${student.studentAddress.zipcode}</p>
            </div>`);
            console.log(student.studentName);
            console.log(student.studentGPA);
            console.log(student.studentAddress.streetNumber);
            console.log(student.studentAddress.city);
            console.log(student.studentAddress.state);
            console.log(student.studentAddress.zipcode);
        });

    }).fail(function (e) {
        console.log("hello", e);
    });
}

function addEventListener() {
    $("#submit").click(function (e) {
        e.preventDefault();
        let cityZipName = $("#cityZip").val();

        getWeather(cityZipName);
    });
}

function getWeather(cityZip) {
    $.get(
        `https://api.weatherapi.com/v1/forecast.json?key=fe1594254c15481593c184418211309&q=${cityZip}&aqi=no&days=6`,
        function (data) {
            const days = ['SUN', 'MON', 'TUES', 'WED', 'THURS', 'FRI', 'SAT'];

            const months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];

            // Clear the page before adding new data
            $("#forecast").html("");

            data.forecast.forecastday.forEach((forecastDay) => {

                const date = new Date(forecastDay.date);

                $("#forecast").append(`
                <div class="forecastDay">
                    <div class="day">${days[date.getDay()]}</div>
                    <div class="date">${date.getDate()}</div>
                    <div class="month">${months[date.getMonth()]}</div>
                    <div class="wInfo">
                        <img src="${forecastDay.day.condition.icon}" />
                    </div>
                    <div class="condition">${forecastDay.day.condition.text}</div>
                    <div class="avgTemp">${forecastDay.day.avgtemp_f}</div>
                    <div class="hiLo">${forecastDay.day.maxtemp_f} / ${forecastDay.day.mintemp_f}</div>
                </div>
                `)
            });

            $("#content #wInfo").html(`<img src="${data.current.condition.icon}" />`);
        }
    ).fail(function (e) {
        console.log(e);
    });
}

$(document).ready(function () {
    // getData();
    addEventListener();
});