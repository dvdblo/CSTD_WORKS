// Breakout

// David Blanco
// A01786713

// This program contains the game functions of the game "Breakout"

"use strict";

//Detects the colision between two rectangle objects
function boxOverlap(obj1, obj2) {

    //Sides of object one
    const L1 = obj1.position.x - obj1.halfSize.x;
    const R1 = obj1.position.x + obj1.halfSize.x;
    const T1 = obj1.position.y - obj1.halfSize.y;
    const B1 = obj1.position.y + obj1.halfSize.y;

    //Sides of object two
    const L2 = obj2.position.x - obj2.halfSize.x;
    const R2 = obj2.position.x + obj2.halfSize.x;
    const T2 = obj2.position.y - obj2.halfSize.y;
    const B2 = obj2.position.y + obj2.halfSize.y;

    // Compare the values to determine if the objects overlap
    if (L1 < R2 && R1 > L2 && T1 < B2 && B1 > T2) {

        //Amount of overlap in X
        const overlapX = Math.min(R1, R2) - Math.max(L1, L2);
        //Amount of overlap in Y
        const overlapY = Math.min(B1, B2) - Math.max(T1, T2);

        //Gives preference to the major overlap
        if (overlapX < overlapY) {
            if (obj1.position.x < obj2.position.x) {
                return "left";
            } else {
                return "right";
            }
        } else {
            if (obj1.position.y < obj2.position.y) {
                return "top";
            } else {
                return "bottom";
            }
        }
    }
}

//Function to initialize a text label
class TextLabel {
    constructor(x, y, font, color, opacity, backColor, height, opacityBack) {
        this.x = x;
        this.y = y;
        this.font = font;
        this.color = color;
        this.opacity = opacity;
        this.opacityBack = opacityBack;
        this.backColor = backColor;
        this.height = height;
        this.weight = height*0.557;  //This number can change depending on the proportion of the font.
        
    }

    //Function to draw the text
    draw(ctx, text) {

        ctx.save();  //The changes affect only to this object
    
        //To put a background under the text
        ctx.globalAlpha = this.opacityBack;
        ctx.fillStyle = this.backColor;
        ctx.fillRect(this.x, this.y - this.height + this.height/7, this.weight*text.length, this.height + 5);

        //To draw the text
        ctx.globalAlpha = this.opacity;
        ctx.font = this.font;
        ctx.fillStyle = this.color;
        ctx.fillText(text, this.x, this.y);
        
        ctx.restore();  //The changes affect only to this object
    }
}