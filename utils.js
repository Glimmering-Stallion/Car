// calculates intermediate value(s) between two adjacent values
function lerp(A, B, t) {
    return A + (B - A) * t;
}

// calculates intersection of two lines, given start and end points of each line
function getIntersection(A, B, C, D) {
    // const denominator = ((B.x - A.x) * (D.y - C.y)) - ((B.y - A.y) * (D.x - C.x)); // Calculate denominator

    // if(denominator == 0){
    //     return null;
    // }

    // const t = ((A.x - C.x) * (D.y - C.y) - (A.y - C.y) * (D.x - C.x)) / denominator; // Calculate t
    // const u = -((A.x - C.x) * (B.y - A.y) - (A.y - C.y) * (B.x - A.x)) / denominator; // Calculate u

    // if(t > 0 && t < 1 && u > 0){
    //     const x = A.x + (t * (B.x - A.x)); // Calculate x
    //     const y = A.y + (t * (B.y - A.y)); // Calculate y
    //     return {x, y, offset: Math.sqrt(Math.pow(x - A.x, 2) + Math.pow(y - A.y, 2))}; // Return intersection object
    // } else {
    //     return null;
    // }

    const tTop = (D.x - C.x) * (A.y - C.y) - (D.y - C.y) * (A.x - C.x);
    const uTop = (C.x - A.x) * (A.y - B.y) - (C.y - A.y) * (A.x - B.x);
    const bottom = (D.x - C.x) * (B.y - A.y) - (D.y - C.y) * (B.x - A.x);

    if(bottom != 0){
        const t = tTop / bottom;
        const u = uTop / bottom;

        if((t >= 0 && t <= 1) && (u >= 0 && u <= 1)){
            return {
                x: lerp(A.x, B.x, t),
                y: lerp(A.y, B.y, t),
                offset: t
            }
        }
    }
}