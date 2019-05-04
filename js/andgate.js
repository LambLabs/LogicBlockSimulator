"use strict";

class AndGate extends Gate {
  constructor(iX, iY, iOrientation) {
    super(iX, iY, iOrientation, 2);
  }

  draw(ctx) {
    let iX = this.m_iX;
    let iY = this.m_iY;
    let iWidth = 100 / 2;
    let iHeight = 100 / 2;
    let iLineWidth = 10 / 2;
    let iSecWidth = 30 / 2;

    ctx.save();
    ctx.translate(iX, iY);
    ctx.rotate((Math.PI / 180) * 30 * this.m_iOrientation);
    ctx.fillStyle = 'black';
    ctx.fillRect(-iWidth / 2, -iHeight / 2, iWidth, iHeight);

    ctx.save();
    for (let i = 0; i < 3; i++)
    {
      ctx.beginPath();
      ctx.moveTo(-iWidth / 2 + iLineWidth, -iHeight / 2 + iLineWidth + iLineWidth * Math.SQRT2 / 2);
      ctx.lineTo(-iWidth / 2 + iSecWidth, -iHeight / 2 + iSecWidth + iLineWidth * Math.SQRT2 / 2);
      ctx.lineTo(-iWidth / 2 + iSecWidth, -iHeight / 2 + iHeight - iSecWidth - iLineWidth * Math.SQRT2 / 2);
      ctx.lineTo(-iWidth / 2 + iLineWidth, -iHeight / 2 + iHeight - iLineWidth - iLineWidth * Math.SQRT2 / 2);
      ctx.closePath();
      ctx.strokeStyle = Gate.LOGIC_STATE_COLOR[(i == 0 || i == 2) ? this.m_inputLogicState[i] : this.m_outputLogicState];
      ctx.stroke();
      ctx.fillStyle = Gate.LOGIC_STATE_COLOR[(i == 0 || i == 2) ? this.m_inputLogicState[i] : this.m_outputLogicState];
      ctx.fill();
      ctx.rotate((Math.PI / 180) * 90);
    }

    ctx.restore();

    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    ctx.fillStyle = 'white';
    ctx.font = '8px serif';
    ctx.fillText('AND', 0, iHeight / 2 - (iSecWidth - iLineWidth) / 2 - iLineWidth);
    ctx.restore();
  }
}
