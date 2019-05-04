"use strict";
console.log('test');
var canvas = document.querySelector('canvas');
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

var ctx = canvas.getContext('2d');

main();

function main()
{
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  let andgate1 = new AndGate(100,100,0);
  let andgate2 = new AndGate(150,100,9);
  let inputgate1 = new InputGate(50,100,3);
  andgate1.draw(ctx);
  andgate2.draw(ctx);
  inputgate1.draw(ctx);
}
