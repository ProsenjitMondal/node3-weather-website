console.log('Client side javascript file is loaded');

var weatherForm = document.querySelector('form');
var search = document.querySelector('input');
var messageOne = document.querySelector('#message-1');
var messageTwo = document.querySelector('#message-2');
var messageThree = document.querySelector('#message-3');

weatherForm.addEventListener('submit', function(event) {
    event.preventDefault();
    var location = search.value;
    messageOne.textContent = 'Loading...';
    messageTwo.textContent = '';
    messageThree.textContent = '';

    if (location) {
        fetch('/weather?address=' + location).then(response => {
            response.json().then(data => {
                if (data.error) {
                    search.focus();
                    messageOne.textContent = data.error;
                } else {
                    messageOne.textContent = data.location;
                    messageTwo.textContent = data.message;
                    messageThree.textContent = "Highest Temperature: " + data.temperatureHigh + " degree and Lowest Temperature: " + data.temperatureLow + " degree";
                    search.value = '';
                }
            });
        });
    } else {
        messageOne.textContent = 'You must provide an address';
        search.focus();
    }
});