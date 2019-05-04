"use strict";
console.log('test');
var canvas = document.querySelector('canvas');
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

var ctx = canvas.getContext('2d');
var board = null;

main();

function main()
{
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  board = new Board(20, 10, 50, 50, 0, 0);
  board.insertGate(2, 2, GateType.AND, 0);
  board.insertGate(2, 1, GateType.OUTPUT, 0);
  board.insertGate(4, 2, GateType.OR, 9);
  board.insertGate(1, 2, GateType.INPUT, 3);
  board.insertGate(4, 1, GateType.INPUT, 6);
  board.insertGate(3, 3, GateType.INPUT, 3);
  board.insertGate(3, 2, GateType.WIRESTRATE, 9);
  board.insertGate(4, 3, GateType.WIRELEFT, 0);

  board.insertGate(6, 6, GateType.OR, 0);
  board.insertGate(5, 6, GateType.INPUT, 3);
  board.insertGate(6, 5, GateType.WIRESTRATE, 0);
  board.insertGate(6, 4, GateType.WIRERIGHT, 3);
  board.insertGate(7, 4, GateType.WIRESTRATE, 3);
  board.insertGate(8, 4, GateType.WIRERIGHT, 6);
  board.insertGate(8, 5, GateType.WIRESTRATE, 6);
  board.insertGate(8, 6, GateType.WIRERIGHT, 9);
  board.insertGate(7, 6, GateType.WIRESTRATE, 9);

  board.insertGate(7, 1, GateType.INPUT, 3);
  board.insertGate(8, 1, GateType.NOT, 3);
  board.insertGate(9, 1, GateType.WIRESTRATE, 3);
  board.insertGate(10, 1, GateType.WIRESTRATE, 3);
  board.insertGate(11, 1, GateType.OR, 6);
  board.insertGate(12, 1, GateType.NOT, 9);
  board.insertGate(13, 1, GateType.WIRET, 0);
  board.insertGate(14, 1, GateType.OUTPUT, 3);
  board.insertGate(11, 3, GateType.WIRERIGHT, 9);
  board.insertGate(10, 3, GateType.NOT, 9);
  board.insertGate(9, 3, GateType.OR, 0);
  board.insertGate(8, 3, GateType.NOT, 3);
  board.insertGate(7, 3, GateType.INPUT, 3);
  board.insertGate(9, 2, GateType.WIRERIGHT, 3);
  board.insertGate(10, 2, GateType.WIRESTRATE, 3);
  board.insertGate(11, 2, GateType.WIRECROSSLEFT, 6);
  //board.insertGate(11, 2, GateType.WIRECROSSRIGHT, 3);
  board.insertGate(12, 2, GateType.WIRESTRATE, 3);
  board.insertGate(13, 2, GateType.WIRELEFT, 0);


  canvas.addEventListener('click', click, false);
  draw();
}

function click(event)
{
  console.log('click ' + event.clientX + ' ' + event.clientY);
  board.onclick(event);
}

function draw()
{
  board.draw(ctx);

  //console.log('draw');
  window.setTimeout(draw, 100);
}
