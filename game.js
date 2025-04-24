
const levelresults = document.getElementById('level');
const playerpoints = document.getElementById("playerH");
const playerresultsinv = document.getElementById("inv");
const oj = document.getElementById("gamestr");
const maingame = document.getElementById('main'); 
const combactparser = document.getElementById("combactparser");

const enmey = {
  xpos: 5,
  ypos: 5,
  health: 5,
  ch: `%`,
  attackpower: 2, 
  alive: true
} 




const player1 = {
  xpos: 2,
  ypos: 2,
  ch: '$',
  health: 10,
  attackpower: 3,
  alive: true
}; 


function RNG(max, min) {
  return Math.floor((Math.random() * max) + min);
}

let level0 = `
##################################
#................................#
#................................#
#................................#
#................................#
#................................#
#................................#
#................................#
###########^^^^^^^^###############`;

let level1 = `
###########////////###############
#...............................,#
#...............................,#
<...............................,>
<...............................,>
<...............................,>
#...............................,#
#...............................,#
###########^^^^^^^^###############`
let level7 = `
##################################
#................................#
#................................#
#................................>
#................................>
#................................>
#................................#
#................................#
###########^^^^^^^^###############`
let level6 = `
#################################
#...............................#
#...............................#
<...............................#
<...............................#
<...............................#
#...............................#
#...............................#
#################################`
let level8 = `
###########////////##############
#...............................#
#...............................#
#...............................>
#...............................>
#...............................>
#...............................#
#...............................#
#################################`
let level2 = `
###########////////##############
#...............................#
#...............................#
<...............................#
<...............................#
<...............................#
#...............................#
#...............................#
###########^^^^^^^^##############`
let level3 = `
###########////////##############
#...............................#
#...............................#
#...............................#
#...............................#
#...............................#
#...............................#
#...............................#
###########^^^^^^^^##############`
let level4 = `
###########////////##############
#...............................#
#...............................#
#...............................#
#...............................#
#...............................#
#...............................#
#...............................#
###########^^^^^^^^##############`
let level5 = `
###########////////##############
#...............................#
#...............................#
#...............................#
#...............................#
#...............................#
#...............................#
#...............................#
#################################`
  

   const levels = [level0,level1,level2,level3,level4,level5,level6,level7,level8];
   
 const  actors = {
   stallactors: {
     wall: `#`,
     doorwayRight: `>`,
     doorwayDown: `^`,
     doorwayLeft: `<`,
     doorwayUp: `/`
   },
   symbolsac: [`>`,`<`,`^`,`#`]
 };
  
 
   function metadatacol(levelstr) {
     let counter = 0;
     let rowscounter = ``;
     for (let index = 0; index < levelstr.length; index++) {
       if (levelstr.charAt(index) === `\n`) {
         counter++;
       } else if (counter === 1) {
         rowscounter += levelstr.charAt(index);
         } 
     }
        let metadata = [counter,rowscounter.trimStart().length]; 
     return metadata;
   }
   
   
   let memo = new Map(); // Use a Map for efficient key-value storage

function parser(levelstr, plaXpos, playYpos, enmeyXpos, enmeyYpos) {
const key = JSON.stringify([levelstr, plaXpos, playYpos, enmeyXpos, enmeyYpos, enmey.alive]);

// Check if the result for this key is already memoized
if (memo.has(key)) {
return memo.get(key); // Return the memoized result
}
function testing(params) {
console.log(`a`);
}

let metadatalvl = metadatacol(levelstr);
let y = metadatalvl[0];
let x = metadatalvl[1];
let purechs = levelstr.trim().replace(/\s+/g, ``);
let counter = 0;
let gamestr = ``;

for (let index = 0; index < y; index++) {
gamestr += `\n`;
for (let i = 0; i < x; i++) {
if (purechs.charAt(counter) === actors.stallactors.wall && playYpos === index && plaXpos === i && player1.alive === true) {
gamestr += actors.stallactors.wall;
counter++;
} else if (playYpos === index && plaXpos === i && player1.alive === true && enmeyYpos === index && enmeyXpos === i && enmey.alive === true) {
testing();
} else if (playYpos === index && plaXpos === i && player1.alive === true) {
gamestr += player1.ch;
counter++;
} else if (enmeyYpos === index && enmeyXpos === i && enmey.alive === true) {
gamestr += enmey.ch;
counter++;
} else if (actors.symbolsac.includes(purechs.charAt(counter))) {
gamestr += purechs.charAt(counter);
counter++;
} else {
gamestr += purechs.charAt(counter);
gamestr += ` `;
counter++;
}
}
}

// Memoize the result before returning
memo.set(key, gamestr);
return gamestr;
}

class shallActor {
constructor(xpos, ypos, health, dmgpoints, currentlevel) {
this.xpos = xpos;
this.ypos = ypos;
this.health = health;
this.dmgpoints = dmgpoints;
this.currentlevel = currentlevel;
}
}

function setactorspos(levelstr) {
let metadatalvl = metadatacol(levelstr);
let y = metadatalvl[0];
let x = metadatalvl[1];
let ypos = RNG(Math.max(2, y - 3), 2); // Ensure min is not greater than max
let xpos = RNG(Math.max(2, x - 3), 2); // Ensure min is not greater than max
let posarr = [ypos, xpos];
return posarr;
}

function mappos() {
let mapenmiespos = [];
for (let inx = 0; inx < levels.length; inx++) {
if (RNG(2, 1) === 1) {
const [enemyYPos, enemyXPos] = setactorspos(levels[inx]);
mapenmiespos.push(new shallActor(enemyXPos, enemyYPos, RNG(10, 1), RNG(10, 1), inx));
}
}
return mapenmiespos;
}

function currentlevelenmiespos(leveldata, enemies) {
// 'enemies' here is the 'mapthefunc' array of shallActor objects
let foundEnemy = false;
for (let i = 0; i < enemies.length; i++) {
if (enemies[i].currentlevel === leveldata) {
enmey.ypos = enemies[i].ypos;
enmey.xpos = enemies[i].xpos;
foundEnemy = true;
break; // Assuming only one enemy per level for now
}
}

if (!foundEnemy) {
enmey.ypos = -1; // Or some other indicator that no enemy is present
enmey.xpos = -1;
}
}

function fighting(params) {
  
  combactparser.style.visibility = `visible`;
}

let currentLevelIndex = 0; // Start at the first level
let gamestatecrrent = 1;

function gamestate() {
    let mapthefunc = mappos()
    setInterval(() => {
        if (gamestatecrrent === 1) {
          currentlevelenmiespos(currentLevelIndex,mapthefunc);
          fighting();
        }
    }, 100);

    addEventListener("keydown", (event) => {
        let newX = player1.xpos;
        let newY = player1.ypos;

        switch (event.key) {
            case "ArrowUp":
                newY = player1.ypos - 1;
                break;
            case "ArrowDown":
                newY = player1.ypos + 1;
                break;
            case "ArrowLeft":
                newX = player1.xpos - 1;
                break;
            case "ArrowRight":
                newX = player1.xpos + 1;
                break;
            default:
                break;
        }

        if (!isWall(levels[currentLevelIndex], newX, newY)) {
            player1.xpos = newX;
            player1.ypos = newY;
            checkLevelTransition(levels[currentLevelIndex],player1.xpos,player1.ypos,currentLevelIndex, mapthefunc)
          }
        });
      };
  
      /*
      checkLevelTransition(levelData, player1.xpos, player1.ypos);
*/
function isWall(levelstr, x, y) {
    let metadatalvl = metadatacol(levelstr);
    let maxY = metadatalvl[0];
    let maxX = metadatalvl[1];
    let purechs = levelstr.trim().replace(/\s+/g, ``);
    let index = y * maxX + x; // Calculate the index in the flattened string

    if (purechs.charAt(index) === actors.stallactors.wall) {
        return true; // Out of bounds is considered a wall
      }
      else if (index >= 0 && index < purechs.length) {
          return purechs.charAt(index) === actors.stallactors.wall;
      }
         else {
         }
                


    return false; // Default to wall if index is out of bounds of the purechs string
}

function checkLevelTransition(levelstr, x, y, leveldata) {
  let metadatalvl = metadatacol(levelstr);
  let maxX = metadatalvl[1];
  let purechs = levelstr.trim().replace(/\s+/g, ``);
  let index = y * maxX + x;
  if (index >= 0 && index < purechs.length) {
      const charAtPosition = purechs.charAt(index);
      switch (leveldata) {
        case 0:
          doordown(1,charAtPosition)
          break;
        case 1:
          doorup(0,charAtPosition)
          doordown(2,charAtPosition)
          doorright(6,charAtPosition)
          doorleft(7,charAtPosition)
          break;
        case 2:
          doorup(1,charAtPosition)
          doordown(3,charAtPosition)
          doorleft(8,charAtPosition)
          break;
        case 3:
          doorup(2,charAtPosition)
          doordown(4,charAtPosition)
          break;
        case 4:
          doorup(3,charAtPosition)
          doordown(5,charAtPosition)
          break;
        case 5:
          doorup(4,charAtPosition)
          break;
        case 6:
          doorleft(1,charAtPosition)
          break;
        case 7:
          doordown(8,charAtPosition)
          doorright(1,charAtPosition)
          break;
        case 8:
          doorup(7,charAtPosition)
          doorright(2,charAtPosition)
          break;
        default:
          break;
      }
    }
  };


  
  function doorup(targetvallevel,charAtPosition) {
    if (charAtPosition === actors.stallactors.doorwayUp) {
      currentLevelIndex = targetvallevel;
      player1.xpos = Math.floor(metadatacol(levels[currentLevelIndex])[1] / 2); // Center horizontally
      player1.ypos = Math.floor(metadatacol(levels[currentLevelIndex])[0] / 2); // Reset player position at the top
      levelData = levels[currentLevelIndex];
    }
  }
  function doordown(targetvallevel,charAtPosition) {
    if (charAtPosition === actors.stallactors.doorwayDown) {
      currentLevelIndex = targetvallevel;
      player1.xpos = Math.floor(metadatacol(levels[currentLevelIndex])[1] / 2); // Center horizontally
      player1.ypos = Math.floor(metadatacol(levels[currentLevelIndex])[0] / 2); // Reset player position at the top
      levelData = levels[currentLevelIndex];
  }
  }
  function doorleft(targetvallevel,charAtPosition) {
    if (charAtPosition === actors.stallactors.doorwayLeft ) {
      currentLevelIndex = targetvallevel;
      player1.xpos = Math.floor(metadatacol(levels[currentLevelIndex])[1] / 2); // Center horizontally
      player1.ypos = Math.floor(metadatacol(levels[currentLevelIndex])[0] / 2); // Reset player position at the top
      levelData = levels[currentLevelIndex];
  } 
  }
  function doorright(targetvallevel,charAtPosition) {
    if (charAtPosition === actors.stallactors.doorwayRight ) {
      currentLevelIndex = targetvallevel;
      player1.xpos = Math.floor(metadatacol(levels[currentLevelIndex])[1] / 2); // Center horizontally
      player1.ypos = Math.floor(metadatacol(levels[currentLevelIndex])[0] / 2); // Reset player position at the top
      levelData = levels[currentLevelIndex]; // Update levelData
  }
  }  

gamestate();