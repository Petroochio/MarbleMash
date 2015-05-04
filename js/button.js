//Function for making bubble objects and adding them to the game
"use strict";
var game = game || {};

game.Button = function() {
    /** constructor for circular button
    * @param ctx : the canvas drawing context
    * @param x : new x coord
    * @param y : new y coord
    * @param radius : width of the rectangle
    * @param id : string  for the button
    * @param color : rendering color
   */
    var Button = function(ctx, x, y, radius, id, color) {
        this.ctx = ctx;
        this.x = x;
        this.y = y;
        this.radius = radius;
        //        this.width = undefined;
        //        this.height = undefined;
        this.id = id;
        this.color = color;

        this.held = false;
        this.currentlyPressed = false;
        this.previouslyPressed = false;
    };

    /** constructor for rectangular button
    * @param ctx : the canvas drawing context
    * @param x : new x coord
    * @param y : new y coord
    * @param width : width of the rectangle
    * @param height : height of the rectangle
    * @param id : string id for the button
    * @param color : rendering color
   */
    /*var Button = function(ctx, x, y, width, height, id, color){
        this.ctx = ctx;
        this.x = x;
        this.y = y;
        this.width = width;
        this.height = height;
        this.radius = undefined;
        this.id = id;
        this.color = color;

        this.held = false;
        this.currentlyPressed = false;
        this.previouslyPressed = false;
    }*/

    var p = Button.prototype;

    p.update = function(dt) {        
        if(game.controller.touching &&
           game.controller.xTap >= this.x-this.radius && game.controller.xTap <= this.x+this.radius &&
           game.controller.yTap >= this.y-this.radius && game.controller.yTap <= this.y+this.radius){
            this.currentlyPressed = true;
        }else if(!game.controller.touching){
            this.currentlyPressed = false;
        }

    };

    //render the button
    p.render = function()
    {
        this.ctx.save();
        this.ctx.lineWidth = 5;
        this.ctx.shadowBlur= 15;
        this.ctx.shadowColor = this.color;

        //draw based on current press state
        if(!this.currentlyPressed){
            game.DrawLib.drawCircle(this.ctx, this.x, this.y, this.radius, 'black', this.color);
            game.DrawLib.drawText(this.ctx, this.id, this.x, this.y+(this.radius-(this.radius/4))/2, this.radius-(this.radius/4), this.color);
        }
        else{
            this.ctx.shadowBlur = 0;
            game.DrawLib.drawCircle(this.ctx, this.x, this.y, this.radius-this.radius/4, 'black', this.color);
            game.DrawLib.drawText(this.ctx, this.id, this.x, this.y+(this.radius-(this.radius/2))/2, this.radius-(this.radius/2), this.color);
        }
        this.ctx.restore();
    }

    //check and see if the button is currently held down
    p.setHeld = function(){
        if(this.currentlyPressed == true && this.previouslyPressed == true)
        {
            this.held = true;
        }
        else if (this.currentlyPressed == false && this.previouslyPressed == true)
        {
            this.held = false;
        }
    };

    /** update the button state
    * @param state : current pressed state of the button 
    */
    p.updateState = function(state){
        this.previouslyPressed = this.currentlyPressed;
        this.currentlyPressed = state;
    };

    return Button;
}();