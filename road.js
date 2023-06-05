class Road{
    constructor(x, width, laneCount = 3){
        this.x = x; // X coordinate of road relative to canvas
        this.width = width; // Width of road (in pixels)
        this.laneCount = laneCount; // Number of lanes in road

        // Horizontal bounds of road
        this.leftBound = x - (width / 2); // Left bound of road
        this.rightBound = x + (width / 2); // Right bound of road

        // Vertical bounds of road
        const height = 1000000; // Height of road (in pixels)
        this.topBound = -height; // Top bound of road
        this.bottomBound = height; // Bottom bound of road

        // Corners of road
        const topLeft = {x: this.leftBound, y: this.topBound};
        const topRight = {x: this.rightBound, y: this.topBound};
        const bottomLeft = {x: this.leftBound, y: this.bottomBound};
        const bottomRight = {x: this.rightBound, y: this.bottomBound};
        
        // Borders of road
        this.borders = [
            // [topLeft, bottomLeft],
            // [topRight, bottomRight]
            [{x:topLeft.x, y:0}, {x:topRight.x, y:0}],
        ]; // Array of border objects
    }

    getLaneCenter(laneIndex){
        const laneWidth = this.width / this.laneCount; // Width of each lane
        return this.leftBound + (laneWidth * Math.min(laneIndex, this.laneCount - 1)) + (laneWidth / 2); // Return center of given lane index
    }

    draw(ctx){
        ctx.lineWidth = 4;
        ctx.strokeStyle = "white";

        // Draw lane lines using linear interpolation
        for(let i = 0; i <= this.laneCount; i++){
            const x = lerp(
                this.leftBound,
                this.rightBound,
                (i / this.laneCount)
            ); // Get x coordinate of each lane line using linear interpolation


            ctx.setLineDash([15, 20]); // Set lane line dash
            ctx.beginPath(); // Begin drawing road
            ctx.moveTo(x, this.topBound); //Move to initial top x position of road
            ctx.lineTo(x, this.bottomBound); // Specify destination to bottom x position of road
            ctx.stroke(); // Execute line drawing
        }

        ctx.setLineDash([]);
        this.borders.forEach((border)=>{
            ctx.beginPath(); // Begin drawing road
            ctx.moveTo(border[0].x, border[0].y); //Move to initial top x position of road
            ctx.lineTo(border[1].x, border[1].y); // Specify destination to bottom x position of road
            ctx.stroke(); // Execute line drawing
        });
    }
}