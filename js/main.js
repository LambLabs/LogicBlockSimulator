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
  board = new Board(10, 10, 50, 50, 0, 0);
  board.insertGate(2, 2, GateType.AND, 0);
  board.insertGate(2, 1, GateType.OUTPUT, 0);
  board.insertGate(4, 2, GateType.OR, 9);
  board.insertGate(1, 2, GateType.INPUT, 3);
  board.insertGate(4, 1, GateType.INPUT, 6);
  board.insertGate(4, 3, GateType.INPUT, 0);
  board.insertGate(3, 2, GateType.WIRE, 9);

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
  window.setTimeout(draw, 500);
}
