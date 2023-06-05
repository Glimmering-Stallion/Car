class Car{
    constructor(x, y, width, height){
        this.width = width; // Width of car
        this.height = height; // Height of car

        this.x = x; // X coordinate of car
        this. y = y; // Y coordinate of car
        this.angle = 0; // Angle of car

        this.velocity = 0; // Velocity of car
        this.acceleration = 0.1; // Acceleration of car
        this.maxVelocity = 8; // Max velocity of car
        this.friction = 0.015; // Friction applied to car

        this.sensor = new Sensor(this); // Create new sensor object (car is passed as argument)
        this.controls = new Controls(); // Create new controls object
    }

    update(borders){
        this.#movement(); // Call movement function
        this.sensor.update(borders); // Call update function of sensor object
    }

    #movement(){
        // Update velocity of car
        if(this.controls.forward) {
            this.velocity += this.acceleration; // Forward
        }
        if(this.controls.reverse) {
            this.velocity -= this.acceleration; // Reverse
        }

        // Update angle of car based on direction of velocity
        if(Math.abs(this.velocity) > 0) {
            const flip = (this.velocity > 0) ? 1 : -1; // Flip value based on direction of velocity

            // Update angle of car based on flip value
            if(this.controls.left) {
                this.angle += 0.02 * flip; // Turn left
            }
            if(this.controls.right) {
                this.angle -= 0.02 * flip; // Turn right
            }
        }

        // Cap forward and reverse velocity
        if(this.velocity > this.maxVelocity) {
            this.velocity = this.maxVelocity; // Set forward speed to max velocity
        }
        if(this.velocity < (-this.maxVelocity / 3)) {
            this.velocity = (-this.maxVelocity / 3); // Set reverse speed to a third of max velocity
        }

        // Apply friction to forward and reverse velocity
        if(this.velocity > 0) {
            this.velocity -= this.friction; // Apply friction to forward velocity
        }
        if(this.velocity < 0) {
            this.velocity += this.friction; // Apply friction to reverse velocity
        }
        if(Math.abs(this.velocity) < this.friction) {
            this.velocity = 0; // Set velocity to 0 if velocity is less than friction (avoids jittering)
        }

        this.x -= this.velocity * Math.sin(this.angle); // Update x coordinate of car (sin of angle)
        this.y -= this.velocity * Math.cos(this.angle); // Update y coordinate of car (cos of angle)
    }

    draw(ctx){
        ctx.save(); // Capture current state of context
        ctx.translate(this.x, this.y); // Translate context to current car position
        ctx.rotate(-this.angle); // Rotate context to current car angle

        ctx.beginPath(); // Begin drawing
        ctx.rect((-this.width / 2), (-this.height / 2), this.width, this.height); // Draw car as rectangle
        ctx.fillStyle = "red"; // Set fill color to red
        ctx.fill(); // Fill rectangle for car

        ctx.restore(); // Restore context to previous state
        this.sensor.draw(ctx); // Draw sensor on canvas using context
    }
}