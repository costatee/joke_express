

document.addEventListener('DOMContentLoaded', function() {
    // Function to handle button click
    async function handleClick() {
        try {
            // Fetch a new joke from the server
            const response = await fetch("/joke");
            const data = await response.json();
            console.log(data)

            // Update the content of the joke container with the new joke parts
            document.getElementById('jokeSetup').innerText = data.setup;
            document.getElementById('jokeDelivery').innerText = data.delivery;
        } catch (error) {
            console.error('Error fetching and displaying joke:', error);
        }
    }


    document.getElementById('getJoke').addEventListener('click', handleClick);

    const jokeContainer = document.getElementById('jokeContainer');
    const buttonContainer = document.getElementById('buttonContainer');

    // fade in
    function unfade(element) {
        var op = 0.1;  // initial opacity
        element.style.display = 'block';
        var timer = setInterval(function () {
            if (op >= 1){
                clearInterval(timer);
            }
            element.style.opacity = op;
            element.style.filter = 'alpha(opacity=' + op * 100 + ")";
            op += op * 0.1;
        }, 40);
    }

    // fade out
    function fade(element) {
        var op = 1;
        var timer = setInterval(function () {
            if (op <= 0.1){
                clearInterval(timer);
                element.style.display = 'none';
            }
            element.style.opacity = op;
            element.style.filter = 'alpha(opacity=' + op * 100 + ")";
            op -= op * 0.1;
        }, 150);
    }
    
});
