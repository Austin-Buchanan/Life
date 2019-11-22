function Main(){
    // Initialize
    var lifeState = randomState(60, 30);
    render(lifeState);
    
    // Run Life
    runLife(lifeState);
}

Main();

function runLife(stateArray) {
    if (typeof stateArray !== 'undefined'){
        console.clear();
        render(stateArray);
        stateArray = nextState(stateArray);
        setTimeout(function(){runLife(stateArray)}, 1000);
    }
    else {
        return "error";
    }
}


function deadState(width, height) {
  var deadArray = [];
  for (var i = 0; i < height; i++){
    var buffer = [];
    for (var j = 0; j < height; j++){
      buffer.push(0);
    }
    deadArray[i] = buffer;
  }
  return deadArray;
}

function randomState(width, height){
  var randomArray = deadState(width, height);
  for(var i = 0; i < height; i++){
    for(var j = 0; j < width; j++){
      if(Math.random() >= 0.7){
        randomArray[i][j] = 1;
      }
    }
  }
  return randomArray;
}

function render(inArray){
  // Handle ceiling
  var ceilingString = "";
  if(typeof inArray !== 'undefined'){
    for (var i = 0; i < inArray.length; i++){
      ceilingString += "_";
    }
    console.log(ceilingString);
    
    // Create dead output array with same dimensions as inArray
    var outArray = [];
    var widthCounter = 0;
    var heightCounter = 0;
    for(var k = 0; k < inArray.length; k++){
      for(var j = 0; j < inArray[k].length; j++){
        widthCounter++;
      }
      heightCounter++;
    }
    outArray = deadState(widthCounter, heightCounter);
    
    // Write body to output array
    for (var i = 0; i < inArray.length; i++){
      for (var j = 0; j < inArray[i].length; j++){
        if(inArray[i][j] === 1){
          outArray[i][j] = "O";
        }
        else {
          outArray[i][j] = " ";
        }
      }
      console.log(outArray[i].join(''));
    }
    
    // Handle floor
    console.log(ceilingString);
  }
  else {
    return "error";
  }
}

// Counting functions
function leftUpCheck(x, y, baseArray){
  if (typeof baseArray !== 'undefined'){
    if(baseArray[x - 1][y - 1] === 1){
      return 1;
    }
    else {
      return 0;
    }    
  }
  else {
      return 0;
  }
}
function straightUpCheck(x, y, baseArray){
  if (typeof baseArray !== 'undefined'){
     if(baseArray[x - 1][y] === 1){
      return 1;
    }
    else {
      return 0;
    } 
  }
  else {
      return 0;
  }
}
function rightUpCheck(x, y, baseArray){
    if (typeof baseArray !== 'undefined'){
       if(baseArray[x - 1][y + 1] === 1){
      return 1;
        }
        else {
        return 0;
        } 
    }    
    else {
        return 0;
    }
}
function leftCheck(x, y, baseArray){
  if (typeof baseArray !== 'undefined'){
      if(baseArray[x][y - 1] === 1){
      return 1;
    }
    else {
      return 0;
    }
  }
  else {
      return 0;
  }
}
function rightCheck(x, y, baseArray){
    if(typeof baseArray !== 'undefined'){
        if(baseArray[x][y + 1] === 1){
          return 1;
        }
        else {
          return 0;
        }   
    }
    else return 0;
}
function leftDownCheck(x, y, baseArray){
  if (typeof baseArray !== 'undefined'){
    if(baseArray[x + 1][y - 1] === 1){
      return 1;
    }
    else {
      return 0;
    }      
  }
  else {
      return 0;
  }
}
function straightDownCheck(x, y, baseArray){
    if (typeof baseArray !== 'undefined'){
        if(baseArray[x + 1][y] === 1){
            return 1;
        }
        else {
            return 0;
        }
    }
    else {
        return 0;
    }    
}
function rightDownCheck(x, y, baseArray){
  if (typeof baseArray !== 'undefined'){
    if(baseArray[x + 1][y + 1] === 1){
        return 1;
    }
    else {
        return 0;
    }
  }
  else {
      return 0;
  }
}

function countNeighbors(x, y, baseArray){
  if(typeof baseArray !== 'undefined'){
    var neighbors = 0;
    var position = "";  
    // Corners
    if(x === 0 && y === 0){
      position = "top left";
    }
    if(x === 0 && y === baseArray[x].length - 1){
      position = "top right";
    }
    if(x === baseArray.length && y === 0){
      position = "bottom left";
    }
    if(x === baseArray.length && y === baseArray[x].length - 1){
      position = "bottom right";
    }
    // Top Row, not corners
    if(x === 0 && position === ""){
      position = "top row";
    }
    // Bottom Row, not coners
    if(x === baseArray.length - 1 && position === ""){
      position = "bottom row";
    }
    // Left Side in middle rows
    if(y === 0 && position === ""){
      position = "left side";
    }
    // Right Side in middle rows
    if(y === baseArray[x].length - 1 && position === ""){
      position = "right side";
    }
    
    switch(position){
      case "top left":
        neighbors += rightCheck(x, y, baseArray) + rightDownCheck(x, y, baseArray) + straightDownCheck(x, y, baseArray);
        break;
      case "top right":
        neighbors += leftCheck(x, y, baseArray) + leftDownCheck(x, y, baseArray) + straightDownCheck(x, y, baseArray);
        break;
      case "bottom left":
        neighbors += straightUpCheck(x, y, baseArray) + rightUpCheck(x, y, baseArray) + rightCheck(x, y, baseArray);
        break;
      case "bottom right":
        neighbors += straightUpCheck(x, y, baseArray) + leftCheck(x, y, baseArray) + leftUpCheck(x, y, baseArray);
        break;
      case "top row":
        neighbors += leftCheck(x, y, baseArray) + leftDownCheck(x, y, baseArray) + straightDownCheck(x, y, baseArray) + rightDownCheck(x, y, baseArray) + rightCheck(x , y, baseArray);
        break;
      case "bottom row":
        neighbors += leftCheck(x, y, baseArray) + leftUpCheck(x, y, baseArray) + straightUpCheck(x, y, baseArray) + rightUpCheck(x, y, baseArray) + rightCheck(x, y, baseArray);
        break;
      case "left side":
        neighbors += straightUpCheck(x, y, baseArray) + rightUpCheck(x, y, baseArray) + rightDownCheck(x, y, baseArray) + rightCheck(x, y, baseArray) + straightDownCheck(x, y, baseArray);
        break;
      case "right side":
        neighbors += straightUpCheck(x, y, baseArray) + leftUpCheck(x, y, baseArray) + leftCheck(x, y, baseArray) + leftDownCheck(x, y, baseArray) + straightDownCheck(x, y, baseArray);
        break;
      default:
        neighbors += leftUpCheck(x, y, baseArray) + straightUpCheck(x, y, baseArray) + rightUpCheck(x, y, baseArray) + leftCheck(x, y, baseArray) + rightCheck(x, y, baseArray)
                        + leftDownCheck(x, y, baseArray) + straightDownCheck(x, y, baseArray) + rightDownCheck(x, y, baseArray);
        break;
    }  
    return neighbors;
  }
  else {
    return "error";
  }
}

function nextState(stateArray){
  if(typeof stateArray !== 'undefined'){
    // Create outArray with same dimensions as stateArray
    var outArray = [];
    var widthCounter = 0;
    var heightCounter = 0;
    for(var i = 0; i < stateArray.length; i++){
      heightCounter++;
    }
    for(var j = 0; j < stateArray[0].length; j++){
        widthCounter++;
    }
    outArray = deadState(widthCounter, heightCounter);
    
    // Evaluate life and death, writing to outArray
    for(var k = 0; k < stateArray.length; k++){
      for(var m = 0; m < stateArray[k].length; m++){
        var neighbors = countNeighbors(k, m, stateArray);
        // The Living
        if(stateArray[k][m] === 1){
          if(neighbors <= 1 || neighbors > 3){
            outArray[k][m] = 0;
          }
          else {
            outArray[k][m] = 1;
          }
        }
        // The Dead
        else {
          if(neighbors === 3){
            outArray[k][m] = 1;
          }
          else{
            outArray[k][m] = 0;
          }
        }
      }
    }
    return outArray;
  }
  else {
    return "error";
  }
}

// Tester functions
function testSuite(){
  // Test0: Test for dead with no neighbors staying dead
  var init_state0 = [
    [0,0,0],
    [0,0,0],
    [0,0,0]
  ];
  var expected_next_state0 = [
    [0,0,0],
    [0,0,0],
    [0,0,0]
  ];
  if(JSON.stringify(nextState(init_state0)) !== JSON.stringify(expected_next_state0)){
    console.log("Failed Test0.");
  }
  else {
    console.log("Passed Test0.");
  }
  
  // Test1: Dead cells with exactly 3 neighbors should come alive.
  var init_state1 = [
    [0,0,1],
    [0,1,1],
    [0,0,0]
  ];
  var expected_next_state1 = [
    [0,1,1],
    [0,1,1],
    [0,0,0]
  ];
  if(JSON.stringify(nextState(init_state1)) !== JSON.stringify(expected_next_state1)){
    console.log("Failed Test1.");
    console.log("Expected:");
    console.log(expected_next_state1);
    console.log("Actual:")
    console.log(nextState(init_state1));
  }
  else {
    console.log("Passed Test1.");
  }
  
  // Test2: Live cells with no neighbors should die.
  var init_state2 = [
    [0,0,0],
    [0,1,0],
    [0,0,0]
  ];
  var expected_next_state2 = [
    [0,0,0],
    [0,0,0],
    [0,0,0]
  ];
  if(JSON.stringify(nextState(init_state2)) !== JSON.stringify(expected_next_state2)){
    console.log("Failed Test2.");
    console.log("Expected:");
    console.log(expected_next_state2);
    console.log("Actual:");
    console.log(nextState(init_state2));
  }
  else {
    console.log("Passed Test2.");
  }
  
   // Test3: Live cells with 1 neighbor should die.
  var init_state3 = [
    [0,0,0],
    [1,1,0],
    [0,0,0]
  ];
  var expected_next_state3 = [
    [0,0,0],
    [0,0,0],
    [0,0,0]
  ];
  if(JSON.stringify(nextState(init_state3)) !== JSON.stringify(expected_next_state3)){
    console.log("Failed Test3.");
    console.log("Expected:");
    console.log(expected_next_state3);
    console.log("Actual:");
    console.log(nextState(init_state3));
  }
  else {
    console.log("Passed Test3.");
  }
  
   // Test4: Live cells with more than 3 neighbors should die.
  var init_state4 = [
    [1,1,1],
    [1,1,1],
    [1,1,1]
  ];
  var expected_next_state4 = [
    [1,0,1],
    [0,0,0],
    [1,0,1]
  ];
  if(JSON.stringify(nextState(init_state4)) !== JSON.stringify(expected_next_state4)){
    console.log("Failed Test4.");
    console.log("Expected:");
    console.log(expected_next_state4);
    console.log("Actual:");
    console.log(nextState(init_state4));
  }
  else {
    console.log("Passed Test4.");
  }
}