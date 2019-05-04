"use strict";

class WireL extends Gate {
  constructor(boardParent, iId, iX, iY, iOrientation) {
    super(boardParent, iId, iX, iY, iOrientation, 1);
    //this.m_outputLogicState = LogicState.HIGH;
  }

  draw(ctx) {
    let iX = this.m_iX;
    let iY = this.m_iY;
    let iWidth = 100 / 2;
    let iHeight = 100 / 2;
    let iLineWidth = 5 / 2;
    let iSecWidth = 30 / 2;

    ctx.save();
    ctx.translate(iX, iY);
    ctx.rotate((Math.PI / 180) * 30 * this.m_iOrientation);

    //ctx.save();
    ctx.fillStyle = 'black';
    ctx.beginPath();
    ctx.moveTo(-iWidth / 6, -iHeight / 2);
    ctx.lineTo(+iWidth / 6, -iHeight / 2);
    ctx.lineTo(+iWidth / 6, +iHeight / 6);
    ctx.lineTo(-iWidth / 6, -iHeight / 6);
    ctx.closePath();
    ctx.fill();

    ctx.beginPath();
    ctx.moveTo(-iWidth / 2, +iHeight / 6);
    ctx.lineTo(-iWidth / 2, -iHeight / 6);
    ctx.lineTo(-iWidth / 6, -iHeight / 6);
    ctx.lineTo(+iWidth / 6, +iHeight / 6);
    ctx.closePath();
    ctx.fill();

    let grdFill = ctx.createLinearGradient(0, -iHeight / 2, 0, iHeight / 2);
    grdFill.addColorStop(1, Gate.LOGIC_STATE_COLOR[this.m_inputLogicState[0]]);
    grdFill.addColorStop(0, Gate.LOGIC_STATE_COLOR[this.m_outputLogicState]);
    ctx.fillStyle = grdFill;
    ctx.beginPath();
    ctx.moveTo(-iWidth / 6 + iLineWidth, -iHeight / 2 + iLineWidth);
    ctx.lineTo(+iWidth / 6 - iLineWidth, -iHeight / 2 + iLineWidth);
    ctx.lineTo(+iWidth / 6 - iLineWidth, +iHeight / 6 - iLineWidth);
    ctx.lineTo(-iWidth / 6 + iLineWidth, -iHeight / 6 + iLineWidth);
    ctx.closePath();
    ctx.fill();

    grdFill = ctx.createLinearGradient(+iWidth / 2, 0, -iWidth / 2, 0);
    grdFill.addColorStop(1, Gate.LOGIC_STATE_COLOR[this.m_inputLogicState[0]]);
    grdFill.addColorStop(0, Gate.LOGIC_STATE_COLOR[this.m_outputLogicState]);
    ctx.fillStyle = grdFill;
    ctx.beginPath();
    ctx.moveTo(-iWidth / 2 + iLineWidth, +iHeight / 6 - iLineWidth);
    ctx.lineTo(-iWidth / 2 + iLineWidth, -iHeight / 6 + iLineWidth);
    ctx.lineTo(-iWidth / 6 + iLineWidth, -iHeight / 6 + iLineWidth);
    ctx.lineTo(+iWidth / 6 - iLineWidth, +iHeight / 6 - iLineWidth);
    ctx.closePath();
    ctx.fill();
    //ctx.fillRect(-iWidth / 6 + iLineWidth, -iHeight / 2 + iLineWidth
    //            , iWidth / 3 - 2 * iLineWidth , iHeight - 2 * iLineWidth);
    ctx.restore();
  }

  updateInputLogicState() {
    this.m_inputLogicState[0] = this.m_boardParent.getNeighbourLogicState(this.m_iId, this.m_iOrientation + 9);
    super.updateInputLogicState();
  }

  updateOutputLogicState() {
    let oldOutputLogicState = this.m_outputLogicState;
    this.m_outputLogicState = this.m_inputLogicState[0];
    if (oldOutputLogicState != this.m_outputLogicState) {
      super.updateOutputLogicState();
    }
  }//*/
}
