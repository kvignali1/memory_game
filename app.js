const tilesContainer = document.querySelector('.tiles');
const colors = ["red", "blue", "green", "teal", "purple", "yellow", "grey", "white"];
const colorsPickList = [...colors, ...colors];
const tileCount = colorsPickList.length;

// play again function
function playAgain(){
  window.location.reload();
}

// current game state
let revealedCount = 0;
let activeTile = null;
let awaitingEndOfMove = false;

function buildTile(color){
  const element = document.createElement('div');

  element.classList.add("tile");
  element.setAttribute("data-color", color);
  element.setAttribute("data-revealed", "false");

  element.addEventListener("click", () => {
    const revealed = element.getAttribute("data-revealed");

    if(
      awaitingEndOfMove
      || revealed === "true"
      || element === activeTile
      ) {
          return;
    }

    element.style.backgroundColor = color;

    if (!activeTile){
      activeTile = element;

      return;
    }

    const colorToMatch = activeTile.getAttribute("data-color");
    if(colorToMatch === color) {
      // making sure that if a user clicks a revealed tile that it doesnt log that tile at the active tile.
      activeTile.setAttribute("data-revealed", "true");
      element.setAttribute("data-revealed", "true");
      
      awaitingEndOfMove = false;
      activeTile = null;
      revealedCount += 2;

      if(revealedCount === tileCount){
        alert("You Win!");
      } 
      return;
    }

    awaitingEndOfMove = true;

    setTimeout(() => {
      element.style.backgroundColor = null;
      activeTile.style.backgroundColor = null;
      awaitingEndOfMove = false;
      activeTile = null;
    }, 800);
  });

  return element;
}

// Building Tiles
for(let i = 0; i < tileCount; i++) {
  const randomIndex = Math.floor(Math.random() * colorsPickList.length);
  const color = colorsPickList[randomIndex];
  const tile = buildTile(color);

  colorsPickList.splice(randomIndex, 1);
  tilesContainer.appendChild(tile);

}
