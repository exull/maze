"use strict";

var Cell = function (x, y) {
    this.x = x;
    this.y = y;
    this.walls = {
        n: true,
        e: true,
        s: true,
        w: true
    };
    this.visited = false;
};

// Function returns an object of directions in which a move can be made
// Returns false if no move can be made from current position
Cell.prototype.canMoveIn = function () {
    var possibleDir = {};
    if (this.x > 0) {
        if (!cells[this.y][this.x - 1].visited) {
            possibleDir['w'] = true;
        }
    } 
    if (this.x < cells[0].length - 1) {
        if (!cells[this.y][this.x + 1].visited) {
            possibleDir['e'] = true;
        }
    } 
    if (this.y > 0) {
        if (!cells[this.y - 1][this.x].visited) {
            possibleDir['n'] = true;
        }
    } 
    if (this.y < cells.length - 1) {
        if (!cells[this.y + 1][this.x].visited) {
            possibleDir['s'] = true;
        }
    }
    if (!jQuery.isEmptyObject(possibleDir)) {
        return possibleDir;
    } else {
        return false;
    }
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
    cell.walls[dir] = false;
    stack.push(cell);
    var nextCell;
    if (dir == 'n') {
        nextCell = cells[cell.y - 1][cell.x];
    } else if (dir == 'e') {
        nextCell = cells[cell.y][cell.x + 1];
    } else if (dir == 's') {
        nextCell = cells[cell.y + 1][cell.x];
    } else {
        nextCell = cells[cell.y][cell.x - 1];
    }
    switch (dir) {
        case 'n':
            nextCell.walls.s = false;
        case 'e':
            nextCell.walls.w = false;
        case 's':
            nextCell.walls.n = false;
        case 'w':
            nextCell.walls.e = false;
    }
    cell.visited = true;
    nextCell.visited = true;
    return nextCell;
};


$("#form").submit(function (e) {
    var i, j; // loop variables
    var x, y;

    // Prevent default form submition action
    e.preventDefault();
    
    // Width and Height of the maze. This is a square maze
    var width = $("#width").val();
//    Maze.height = $("#width").val();
    
    // initialize maze
    for(y = 0; y < width; y += 1) {
        cells[y] = [];
        for(x = 0; x < width; x += 1) {
            cells[y][x] = new Cell(x, y);
        }
    }
    
    // push first cell on stack to start the loop
    stack.push(cells[0][0]);
    
    // loop until there are cells on the stack
    // When stack is empty all spaces have been taken
    var curr_cell, prev_cell;
    while (curr_cell = stack.pop()) {
        var possibleDirs;
        while(possibleDirs = curr_cell.canMoveIn()) {
//            curr_cell.visited = true;
            if (possibleDirs) {
                var directions = Object.keys(possibleDirs);
                var direction = directions[Math.floor(Math.random() * directions.length)];
                alert("Current cell " + curr_cell.x + " " + curr_cell.y + "\nDirections: " + directions +"\nDirection: " + direction);
                curr_cell = move(curr_cell, direction);
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
