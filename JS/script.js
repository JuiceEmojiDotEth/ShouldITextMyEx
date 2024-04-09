const hooraySound = new Audio('Sounds/hooray.wav');
const circusMusic = new Audio('Sounds/Entrance_of_the_Gladiators.mp3');

const messages = [
    "Fuck No",
    "Don't Be Stupid",
    "Did You Hit Your Head Recently?",
    "Remember Why You Broke Up?",
    "Seriously, Just Don't",
    "Go Drink Water Instead",
    "Call a Friend, Not Your Ex",
    "Write a Journal, Not a Text",
    "Still a Bad Idea",
    "How About No?",
    "Time to Reevaluate Life Choices?",
    "This Button Will Keep Saying No",
    "Consider This a Sign to Move On"
];

let currentIndex = 0;

function getRandomPosition(element) {
    const x = Math.max(window.innerWidth - element.clientWidth, 0);
    const y = Math.max(window.innerHeight - element.clientHeight, 0);
    const randomX = Math.floor(Math.random() * x);
    const randomY = Math.floor(Math.random() * y);
    return [randomX, randomY];
}

// Add a flag to track if the circus music has been played
let circusMusicPlayed = false; // Moved to the top for global access

document.getElementById("yesButton").addEventListener("click", function() {
    this.innerText = messages[currentIndex];
    currentIndex = (currentIndex + 1) % messages.length;

    // Move the button to a random position on the page
    const [randomX, randomY] = getRandomPosition(this);
    this.style.position = 'absolute'; // Use absolute positioning
    this.style.left = randomX + 'px';
    this.style.top = randomY + 'px';

    // Play the circus music if it has not been played yet
    if (!circusMusicPlayed) {
        circusMusic.play();
        circusMusicPlayed = true; // Set the flag to true after playing
    }
    showVolumeControl(); // Add this line at the end of the "yesButton" click event listener
    // New code to show the clown image
    let clownImage = document.getElementById('clownImage');
    clownImage.style.display = 'block'; // Show the clown image
    setTimeout(() => { clownImage.style.display = 'none'; }, 2000); // Hide after 2 seconds
});

// Define the fire function based on the confetti parameters from the screenshot
function fire(particleRatio, opts) {
    let count = 200;
    let defaults = {
        origin: { y: 0.7 }
    };
    confetti(Object.assign({}, defaults, opts, {
        particleCount: Math.floor(count * particleRatio)
    }));
}

let canPlaySound = true; // Add this line to declare the canPlaySound variable

document.getElementById('noButton').addEventListener('click', function() {

     // Stop and reset the circus music
        circusMusic.pause();
        circusMusic.currentTime = 0;

    fire(0.25, {
        spread: 26,
        startVelocity: 55,
    });
    fire(0.2, {
        spread: 60,
    });
    fire(0.35, {
        spread: 100,
        decay: 0.91,
        scalar: 0.8
    });
    fire(0.1, {
        spread: 120,
        startVelocity: 25,
        decay: 0.92,
        scalar: 1.2
    });
    fire(0.1, {
        spread: 120,
        startVelocity: 45,
    });
    
     // Play the "hooray" sound effect if allowed by the throttle
     if (canPlaySound) {
        try {
            hooraySound.volume = document.getElementById('volumeSlider').value;
            hooraySound.play();
        } catch (error) {
            console.error("Audio playback failed", error);
        }
        canPlaySound = false;
        setTimeout(() => {
            canPlaySound = true;
        }, 300); // Throttle sound to play every 300 milliseconds

    // Allow the music to be played again if "Yes" is clicked after "No"
        circusMusicPlayed = false;    
    }
    showVolumeControl(); // Add this line at the end of the "noButton" click event listener
});

document.getElementById('volumeSlider').addEventListener('input', function() {
    hooraySound.volume = this.value;
    circusMusic.volume = this.value;
});

const volumeSlider = document.getElementById('volumeSlider');
volumeSlider.value = localStorage.getItem('volume') || 0.5; // Default to 0.5 if not set

volumeSlider.addEventListener('input', function() {
    localStorage.setItem('volume', this.value);
    // Update the volume of audio elements as before
});

function showVolumeControl() {
    document.querySelector('.volume-control').style.display = 'block';
}

/* 
Confetti animation powered by canvas-confetti
https://github.com/catdad/canvas-confetti
ISC License - Copyright (c) 2020, Kiril Vatev
*/

/* 
"Hooray" sound effect provided by Vesperia94 on freesound.org:
https://freesound.org/s/403057/
Licensed under CC0 (Public Domain)
*/

/* 
"Entrance of the Gladiators" performed by the U.S. Marine Band, circa 1999
Composer: Julius Fučík (1872–1916)
Recording is in the public domain.
Source: Wikipedia - https://en.wikipedia.org/wiki/File:Julius_Fu%C4%8D%C3%ADk%27s_%22Entrance_of_the_Gladiators%22,_performed_by_the_U.S._Marine_Band.oga
*/