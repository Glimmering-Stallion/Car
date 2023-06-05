// file:///Users/bryan/Documents/College/Computer%20Science/Personal%20Projects/Self%20Driving%20Car%20Simulation/index.html

const canvas = document.getElementById("myCanvas"); // Get reference to given canvas id
canvas.width = 500; // Set canvas width

const ctx = canvas.getContext("2d"); // Get context of canvas
const road = new Road(canvas.width / 2, canvas.width * 0.3); // Create new road object
const car = new Car(road.getLaneCenter(1), 100, 30, 50); // Create new car object

animate(); // Call animate function

function animate(){
    car.update(road.borders); // Update car

    canvas.height = window.innerHeight; // Set canvas height to window height

    ctx.save(); // Capture current state of context
    ctx.translate(0, -car.y + (canvas.height * 0.8)); // Translate context to current car position (lock car to center of screen)

    road.draw(ctx); // Draw road on canvas using context
    car.draw(ctx); // Draw car on canvas using context

    ctx.restore(); // Restore context to previous state
    requestAnimationFrame(animate); // Call animate function
}