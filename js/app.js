"use strict";

var Cell = function (x, y) {
    this.x = x;
    this.y = y;
    this.walls = {
        n: false,
        e: false,
        s: false,
        w: false
    };
    this.visited = false;
};

// Function returns an object of directions in which a move can be made
// Returns false if no move can be made from current position
Cell.prototype.canMoveIn = function () {
    
};

// Function selects random direction from the object passed in
var selectRandomDirection = function (cell) {
    
};

// array of cells that will forme the maze
var cells = [];

// Stack of cells
var stack = [];

// function move()
// set appropriate wall on current cell
// push current cell on stack
// return next cell
// set walls
var move = function (cell, dir) {
    setwalls();
    stack.push(cell);
    if (dir == 'n') {
        return cells[cell.x][cells.y - 1];
    } else if (dir == 'e') {
        return cells[cell.x + 1][cells.y];
    } else if (dir == 's') {
        return cells[cell.x][cells.y + 1];
    } else {
        return cells[cell.x - 1][cells.y;
    }
};


$("#form").submit(function (e) {
    var i, j; // loop variables
    var x, y;

    // Prevent default form submition action
    e.preventDefault();
    
    // Width and Height of the maze. This is a square maze
    var width = $("#width").val();
    
    // initialize maze
    for(y = 0; y < width; y += 1) {
        cells[y] = [];
        for(x = 0; x < width; x += 1) {
            cells[y][x] = new Cell(x, y);
            
            // Set maze boundry to true
            if(y == 0) {
                cells[y][x].walls.w = true;
            }
            if(x == 0) {
                cells[y][x].walls.n = true;
            }
            if(y == (width - 1)) {
                cells[y][x].walls.e = true;
            }
            if(x == (width - 1)) {
                cells[y][x].walls.s = true;
            }
        }
    }
    
    // push first cell on stack to start the loop
    stack.push(cells[0][0]);
    
    // loop until there are cells on the stack
    // When stack is empty all spaces have been taken
    var current_cell;
    while (current_cell = stack.pop()) {
        var possibleDirs;
        while(possibleDir = current_cell.canMoveIn()) {
            if (possibleDir) {
                var directions = possibleDir.keys();
                direction = directions[Math.floor(Math.random() * directions.length)];
                current_cell = move(current_cell, direction);
            }
        }
    }

    
    
    // Drawing Logic
    // Width of canvas width attribute
    var cell_w = $("canvas").attr("width") / width;
    
    var ctx = $("canvas")[0].getContext("2d");
    
    // Clear canvas for drawing grid
    ctx.clearRect(0, 0, $("canvas").attr("width"), $("canvas").attr("height"));
    
    // Draw grid
    var x = 0, y = 0;
    for (i = 0; i < width; i += 1 ) {
        x = 0;
        for(j = 0; j < width; j += 1 ) {
            ctx.strokeRect(x, y, cell_w, cell_w);
            x += cell_w;
        }
        y += cell_w;
    }
}); // End submit
