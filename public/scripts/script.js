document.addEventListener('DOMContentLoaded', function() {
    // Function to fade in a div
    function fadeInDiv(div) {
        // Set initial opacity to 0 using CSS
        div.style.opacity = 0;
        
        // Calculate the number of frames and duration for the animation
        const frames = 60; // Assuming 60 FPS
        const duration = 1000; // 1 second
        
        // Calculate the change in opacity per frame
        const deltaOpacity = 1 / frames;
        
        // Function to animate the div
        let currentOpacity = 0;
        const animate = () => {
            currentOpacity += deltaOpacity;
            div.style.opacity = currentOpacity;
            
            // Check if animation is complete
            if (currentOpacity < 1) {
                requestAnimationFrame(animate); // Continue animation
            }
        };
        
        // Start the animation
        animate();
    }
    
    const buttonContainer = document.getElementById('buttonContainer');
    const jokeContainer = document.getElementById('jokeContainer');
    const jokeSetup = document.getElementById('jokeSetup');
    const jokeDelivery = document.getElementById('jokeDelivery');
    const jokeSingle = document.getElementById('jokeSingle');
    
    // Call fadeInDiv after buttonContainer is defined
    fadeInDiv(buttonContainer);

    // Function to handle button click
    async function handleClick() {
        try {
            // Fade out the current joke gradually
            jokeContainer.style.transition = "opacity 1s ease-in-out";
            jokeContainer.style.opacity = 0;
            
            // Wait for the fade out transition to complete
            await new Promise(resolve => setTimeout(resolve, 750));

            // Fetch a new joke from the server
            const response = await fetch("/joke");
            const data = await response.json();
            console.log(data);

            jokeSingle.innerText = data.joke;
            jokeSetup.innerText = data.setup;
            jokeDelivery.innerText = data.delivery;
            
            // Fade in jokeContainer with the new joke
            jokeContainer.style.opacity = 1;
        } catch (error) {
            console.error('Error fetching and displaying joke:', error);
        }
    }

    document.getElementById('getJoke').addEventListener('click', handleClick);
});
