class Controls{
    constructor(){
        this.forward = false; // Forward key pressed (initially false)
        this.reverse = false; // Reverse key pressed (initially false)
        this.left = false; // Left key pressed (initially false)
        this.right = false; // Right key pressed (initially false)
        this.#addKeyboardListeners(); // Add keyboard listeners
    }

    #addKeyboardListeners(){
        // Key down event listener
        document.onkeydown = (event)=>{
            console.log(event.key);
            switch(event.key){
                case "ArrowUp":
                    this.forward = true;
                    break;
                case "ArrowDown":
                    this.reverse = true;
                    break;
                case "ArrowLeft":
                    this.left = true;
                    break;
                case "ArrowRight":
                    this.right = true;
                    break;
            }

            // console.table(this); // Log controls object to console (debugging)
        }

        // Key up event listener
        document.onkeyup = (event)=>{
            console.log(event.key);
            switch(event.key){
                case "ArrowUp":
                    this.forward = false;
                    break;
                case "ArrowDown":
                    this.reverse = false;
                    break;
                case "ArrowLeft":
                    this.left = false;
                    break;
                case "ArrowRight":
                    this.right = false;
                    break;
            }

            // console.table(this); // Log controls object to console (debugging)
        }
    }
}