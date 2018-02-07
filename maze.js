const windowSize = 400;
const cellSize = 20;
let totalCells = Math.floor(windowSize/cellSize) * Math.floor(windowSize/cellSize);
let visitedTotal = 0

function Cell(_x,_y){
    this.x = _x;
    this.y = _y;
    this.id = "div" + this.x + '_' + this.y;
    this.isvisted = false;
}
Cell.prototype.createDiv = function(){
    $('.mazeHolder').append('<div id="' + this.id + '"></div>')
    $('.mazeHolder').find('#'+this.id).css({
        'top'       : this.x * cellSize,
        'left'      : this.y * cellSize,
        'width'     : cellSize + 'px',
        'height'    : cellSize + 'px',
        'box-sizing': 'border-box'
    });
}
Cell.prototype.visit = function(){
    this.isVisted= true;
    $('#'+this.id).css({
        'background':'pink'
    })
    visitedTotal++;
}
Cell.prototype.hasFreeNeighbours = function(){

    //left
    if ( this.x>0 && !cells[this.x-1][this.y].isVisted)
        return true;
    //right
    if ( this.x<Math.floor(windowSize/cellSize)-1 && !cells[this.x+1][this.y].isVisted)
        return true;
    //top
    if ( this.y>0 && !cells[this.x][this.y-1].isVisted)
        return true;
    //bottom
    if ( this.y<Math.floor(windowSize/cellSize)-1 && !cells[this.x][this.y+1].isVisted)
        return true;
    return false;
}
Cell.prototype.highlight = function(){
    $('#'+this.id).css({
        'background':'green'
    })
}
Cell.prototype.unhighlight = function(){
    $('#'+this.id).css({
        'background':'pink'
    })
}
Cell.prototype.removeWalls = function(next){
    if (this.x < next.x){
        $('#'+this.id).css({'border-bottom-color':'transparent'})
        $('#'+next.id).css({'border-top-color':'transparent'})
    }
    else if (this.x > next.x){
        $('#'+this.id).css({'border-top-color':'transparent'})
        $('#'+next.id).css({'border-bottom-color':'transparent'})
    }
    else if (this.y < next.y){
        $('#'+this.id).css({'border-right-color':'transparent'})
        $('#'+next.id).css({'border-left-color':'transparent'})
    }
    else if (this.y > next.y){
        $('#'+this.id).css({'border-left-color':'transparent'})
        $('#'+next.id).css({'border-right-color':'transparent'})
    }


}
Cell.prototype.pickRandomNeighbour = function(){
    let tempNeighbours = [];
    //left
    if ( this.x>0 && !cells[this.x-1][this.y].isVisted)
        tempNeighbours.push({
            i:this.x-1,
            j:this.y
        });
    //right
    if ( this.x<Math.floor(windowSize/cellSize)-1 && !cells[this.x+1][this.y].isVisted)
        tempNeighbours.push({
            i:this.x+1,
            j:this.y
        });
    //top
    if ( this.y>0 && !cells[this.x][this.y-1].isVisted)
        tempNeighbours.push({
            i:this.x,
            j:this.y-1
        });
    //bottom
    if ( this.y<Math.floor(windowSize/cellSize)-1 && !cells[this.x][this.y+1].isVisted)
        tempNeighbours.push({
            i:this.x,
            j:this.y+1
        });
    let rand = Math.floor(Math.random()*tempNeighbours.length)
    return ( cells [ tempNeighbours[rand].i ][ tempNeighbours[rand].j ] );
}



$('.mazeHolder').css({
    'width'  : windowSize + 'px',
    'height' : windowSize + 'px',
})
/* init array of cells */
let cells = [];
for (let i=0; i<Math.floor(windowSize/cellSize); i++){
    cells[i]= [];
    for (let j=0; j<Math.floor(windowSize/cellSize); j++){
        cells[i][j] = new Cell(i,j)
        cells[i][j].createDiv();
    }
}

/* pick a random spot */
let startX = Math.floor(Math.random()*10);
let startY = Math.floor(Math.random()*10);
let stack = []
cells[startX][startY].visit();
let current = cells[startX][startY];
stack.push (current);
current.highlight();

function myLoop () {           //  create a loop function
   setTimeout(function () {
        if (!current.hasFreeNeighbours()){
            if ( visitedTotal < totalCells){
            current.unhighlight();
            current = stack.pop();
            current.highlight();
            myLoop(); 
            }
        }
        else if ( visitedTotal < totalCells){
            current.unhighlight();
            let next = current.pickRandomNeighbour();
            current.removeWalls(next);
            current = next;
            current.visit();
            current.highlight();
            stack.push(current);
            myLoop();        
                
        }
        console.log('yet') 
   }, 50)
}

myLoop();
