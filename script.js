let tetris = document.createElement('div');
tetris.classList.add('tetris');

for (let i=1; i<181; i++) {
  let exel = document.createElement('div');
  exel.classList.add('exel');
  tetris.appendChild(exel);
}

let main = document.getElementsByClassName('app')[0];
main.appendChild(tetris);

let exel = document.getElementsByClassName('exel');
let i=0;

for (let y=18; y>0; y--){
  for (let x=1; x<11; x++){
    exel[i].setAttribute('posX', x);
    exel[i].setAttribute('posY', y);
    i++;
  }
}

let x=5, y=15;
let mainArr = [
  [
    [0, 1],
    [0, 2],
    [0, 3]
  ],
  [
    [1, 0],
    [0, 1],
    [1, 1],
  ],
  [
    [1, 0],
    [0, 1],
    [0, 2],
  ],
  [
    [1, 0],
    [1, 1],
    [1, 2],
  ],
  [
    [1, 0],
    [-1, 1],
    [0, 1],
  ],
  [
    [1, 0],
    [1, 1],
    [2, 1],
  ],
  [
    [1, 0],
    [2, 0],
    [1, 1],
  ]
];

let currentFigure = 0;
let figureBody = 0;

function create() {
  function getRandom() {
    return Math.round(Math.random()*(mainArr.length - 1));
  }

  currentFigure = getRandom();

  figureBody = [
    document.querySelector(`[posX = "${x}"][posY = "${y}"]`),
    document.querySelector(`[posX = "${x + mainArr[currentFigure][0][0]}"][posY = "${y + mainArr[currentFigure][0][1]}"]`),
    document.querySelector(`[posX = "${x + mainArr[currentFigure][1][0]}"][posY = "${y + mainArr[currentFigure][1][1]}"]`),
    document.querySelector(`[posX = "${x + mainArr[currentFigure][2][0]}"][posY = "${y + mainArr[currentFigure][2][1]}"]`)
  ];

  for (let j = 0; j < figureBody.length; j++) {
    figureBody[j].classList.add("figure");
  }
}

let score = 0;
let input = document.getElementById('scores');
input.value = `Ваши очки: ${score}`;

let startButton = document.getElementById('startButton');

startButton.addEventListener('click',function () {
  create();
});

function move() {
  let moveFlag = true;
  let coordinates = [
    [figureBody[0].getAttribute('posX'), figureBody[0].getAttribute('posY')],
    [figureBody[1].getAttribute('posX'), figureBody[1].getAttribute('posY')],
    [figureBody[2].getAttribute('posX'), figureBody[2].getAttribute('posY')],
    [figureBody[3].getAttribute('posX'), figureBody[3].getAttribute('posY')]
  ];

  for (let i = 0; i < coordinates.length; i++) {
    if (coordinates[i][1] == 1 || document.querySelector(`[posX = "${coordinates[i][0]}"][posY = "${coordinates[i][1] -1}"]`).classList.contains('set')) {
      moveFlag = false;
      break;
    }
  }

  if (moveFlag) {
    for (let j = 0; j < figureBody.length; j++) {
      figureBody[j].classList.remove("figure");
    }

    figureBody = [
      document.querySelector(`[posX = "${coordinates[0][0]}"][posY = "${coordinates[0][1] -1}"]`),
      document.querySelector(`[posX = "${coordinates[1][0]}"][posY = "${coordinates[1][1] -1}"]`),
      document.querySelector(`[posX = "${coordinates[2][0]}"][posY = "${coordinates[2][1] -1}"]`),
      document.querySelector(`[posX = "${coordinates[3][0]}"][posY = "${coordinates[3][1] -1}"]`)
    ];

    for (let j = 0; j < figureBody.length; j++) {
      figureBody[j].classList.add("figure");
    }
  } else {
    for (let j = 0; j < figureBody.length; j++) {
      figureBody[j].classList.remove("figure");
      figureBody[j].classList.add("set");
    }

    for (let i= 1; i<15; i++) {
      let count = 0;
      for (let k=1; k < 11; k++) {
        if (document.querySelector(`[posX = "${k}"][posY = "${i}"]`).classList.contains('set')) {
          count++;

          if (count === 10) {
            score += 10;
            input.value = `Ваши очки: ${score}`;

            for (let m = 1; m < 11; m++) {
              document.querySelector(`[posX = "${m}"][posY = "${i}"]`).classList.remove('set');
            }

            let set = document.querySelectorAll('.set');
            let newSet = [];

            for (let s = 0; s< set.length; s++) {
              let setCoordinates = [set[s].getAttribute('posX'), set[s].getAttribute('posY')];

              if (setCoordinates[1] > i) {
                set[s].classList.remove('set');
                newSet.push(document.querySelector(`[posX = "${setCoordinates[0]}"][posY = "${setCoordinates[1] - 1}"]`))
              }
            }

            for (let a = 0; a< newSet.length; a++) {
              newSet[a].classList.add('set');
            }

            i--;
          }
        }
      }
    }

    for (let n = 1; n < 11; n++) {
      if (document.querySelector(`[posX = "${n}"][posY = "15"]`).classList.contains('set')) {
        clearInterval(interval);
        alert(`Game over. Your scores: ${score}`);
        break;
      }
    }

    create();
  }
}

let interval = setInterval(() => {
  move()
}, 300);

let flag = true;

window.addEventListener('keydown', function (event) {
  let coordinates1 = [figureBody[0].getAttribute('posX'), figureBody[0].getAttribute('posY')];
  let coordinates2 = [figureBody[1].getAttribute('posX'), figureBody[1].getAttribute('posY')];
  let coordinates3 = [figureBody[2].getAttribute('posX'), figureBody[2].getAttribute('posY')];
  let coordinates4 = [figureBody[3].getAttribute('posX'), figureBody[3].getAttribute('posY')];

  function getNewState(a) {

    flag = true;

    let figureNew = [
      document.querySelector(`[posX = "${+coordinates1[0] + a}"][posY = "${coordinates1[1]}"]`),
      document.querySelector(`[posX = "${+coordinates2[0] + a}"][posY = "${coordinates2[1]}"]`),
      document.querySelector(`[posX = "${+coordinates3[0] + a}"][posY = "${coordinates3[1]}"]`),
      document.querySelector(`[posX = "${+coordinates4[0] + a}"][posY = "${coordinates4[1]}"]`)
    ];

    for (let i =0; i< figureNew.length; i++) {
      if (!figureNew[i] || figureNew[i].classList.contains('set')) {
        flag = false;
      }

      if (flag) {
        for (let j = 0; j < figureBody.length; j++) {
          figureBody[j].classList.remove("figure");
        }

        figureBody = figureNew;

        for (let j = 0; j < figureBody.length; j++) {
          figureBody[j].classList.add("figure");
        }
      }
    }
  }

  if (event.keyCode === 37) {
    getNewState(-1);
  } else if (event.keyCode === 39) {
    getNewState(1)
  } else if (event.keyCode === 40) {
    move();
  }
});
