class Sensor{
    constructor(car){
        this.car = car; // Reference to car object
        this.rayCount = 1; // Number of rays to cast
        this.rayLength = 100; // Length of each ray
        this.raySpread = Math.PI * 2; // Spread of rays (in radians)

        this.rays = []; // Array of ray objects
        this.readings = []; // Array of ray readings
    }

    update(borders){
        this.#castRays(); // Call castRays function
        this.readings = []; // Reset readings array

        for(let i = 0; i < this.rays.length; i++){
            this.readings.push(this.#getReadings(this.rays[i], borders)); // Add ray reading to readings array
        }
    }

    #getReadings(ray, border){
        const intersections = []; // Array of intersection objects

        for(let i = 0; i < border.length; i++){
            const intersection = getIntersection(
                ray[0],
                ray[1],
                border[i][0],
                border[i][1]
            ); // Get intersection of ray and border

            if(intersection){
                intersections.push(intersection); // Add intersection to intersections array if intersection exists
            }
        }

        if(intersections.length > 0){
            const offsets = intersections.map(e=>e.offset); // Map offsets of intersections to new offsets array
            const closest = Math.min(...offsets); // Get smallest offset by spreading offsets array into Math.min function
            return intersections.find(e=>e.offset == closest); // Return intersection with closest offset
        } else {
            return null;
        }
    }

    #castRays(){
        // this.rays = []; // Reset rays array

        // for(let i = 0; i < this.rayCount; i++){
        //     const rayAngle = lerp(
        //         (this.raySpread / 2),
        //         (-this.raySpread / 2),
        //         this.rayCount == 1 ? 0.5 : (i / (this.rayCount - 1))
        //     ) + this.car.angle; // Get angle of ray using linear interpolation


        //     const start = {x: this.car.x, y: this.car.y}; // Start position of ray
        //     const end = {
        //         x: this.car.x + (Math.sin(rayAngle) * this.rayLength),
        //         y: this.car.y - (Math.cos(rayAngle) * this.rayLength)
        //     }; // End position of ray

        //     this.rays.push([start, end]); // Add ray to rays array
        // }
        const angle = Math.PI/2
        this.rays = [[
            { x: this.car.x, y: this.car.y },
            { x: this.car.x + Math.cos(angle) * this.rayLength, y: this.car.y - Math.sin(angle) * this.rayLength }
        ]];
    }

    draw(ctx){
        for(let i = 0; i < this.rayCount; i++){
            let end = this.rays[i][1]; // Get end position of ray
            if(this.readings[i]){
                end = this.readings[i]; // Set end position of ray to reading if reading exists
            }

            ctx.beginPath(); // Begin drawing ray
            ctx.lineWidth = 1;
            ctx.strokeStyle = "yellow";
            ctx.moveTo(this.rays[i][0].x, this.rays[i][0].y); // Move to start position of ray
            ctx.lineTo(end.x, end.y); // Specify destination to end position of ray
            ctx.stroke(); // Execute line drawing

            ctx.beginPath(); // Begin drawing ray
            ctx.lineWidth = 1;
            ctx.strokeStyle = "red";
            ctx.moveTo(this.rays[i][1].x, this.rays[i][1].y); // Move to start position of ray
            ctx.lineTo(end.x, end.y); // Specify destination to end position of ray
            ctx.stroke(); // Execute line drawing
        }
    }
}