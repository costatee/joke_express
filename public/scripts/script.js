document.addEventListener('DOMContentLoaded', function() {
    let isDarkMode = false;

    function fadeInDiv(div) {
        // Set initial opacity to 0 using CSS
        div.style.opacity = 0;
        
        // Calculate the number of frames and duration for the animation
        const frames = 60; 
        const duration = 1000; 
        const deltaOpacity = 1 / frames;
        
        // Function to animate the div
        let currentOpacity = 0;
        const animate = () => {
            currentOpacity += deltaOpacity;
            div.style.opacity = currentOpacity;
            
            // Check if animation is complete
            if (currentOpacity < 1) {
                requestAnimationFrame(animate);
            }
        };
        
        animate();
    }
    
    const buttonContainer = document.getElementById('buttonContainer');
    const jokeContainer = document.getElementById('jokeContainer');
    const jokeSetup = document.getElementById('jokeSetup');
    const jokeDelivery = document.getElementById('jokeDelivery');
    const jokeSingle = document.getElementById('jokeSingle');
    const darkModeButton = document.getElementById('darkmode');
    
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

            jokeSingle.innerText = data.joke;
            jokeSetup.innerText = data.setup;
            jokeDelivery.innerText = data.delivery;
            
            // Fade in jokeContainer with the new joke
            jokeContainer.style.opacity = 1;
        } catch (error) {
            console.error('Error fetching and displaying joke:', error);
        }
    }

    // Function to handle dark mode button click
    function handleDarkModeClick() {
        // Toggle dark mode
        if (isDarkMode) {
            document.body.classList.remove('dark-mode');
            darkModeButton.innerHTML = '⬛️'; // Change button text to ⬛️ when switching to white theme
        } else {
            document.body.classList.add('dark-mode');
            darkModeButton.innerHTML = '⬜️'; // Change button text to ⬜️ when switching to black theme
        }
        isDarkMode = !isDarkMode; // Toggle dark mode state
    }

    document.getElementById('getJoke').addEventListener('click', handleClick);
    darkModeButton.addEventListener('click', handleDarkModeClick);
});
