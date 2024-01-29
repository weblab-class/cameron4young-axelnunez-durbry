import {post} from "./utilities";

const createCanvas = (name, moderators, visitors) => {
  let pixelTest = []; 
  for (let i = 0; i<15; i++){
    let row = [];
    for(let j = 0; j<15;j++){
      row.push("#FFFFFF");
    }
    pixelTest.push(row);
  }

  console.log(pixelTest);
  const newCanvas = {
    "name": name,
    "moderators": moderators,
    "pixels": pixelTest,
    "visitors": visitors
  }
  post("/api/canvas/", newCanvas);
};
  
  export default createCanvas;