"use strict";

class WireS extends Gate {
  constructor(boardParent, iId, iX, iY, iOrientation) {
    super(boardParent, iId, iX, iY, iOrientation, 1, 1);
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

    //ctx.fillStyle = Gate.LOGIC_STATE_COLOR[this.m_outputLogicState];
    ctx.fillStyle = 'black';
    ctx.fillRect(-iWidth / 6 , -iHeight / 2
                , iWidth / 3 , iHeight);

    let grdFill = ctx.createLinearGradient(0, -iHeight / 2, 0, iHeight / 2);
    grdFill.addColorStop(1, Gate.LOGIC_STATE_COLOR[this.m_inputLogicState[0]]);
    grdFill.addColorStop(0, Gate.LOGIC_STATE_COLOR[this.m_outputLogicState[0]]);
    ctx.fillStyle = grdFill;
    ctx.fillRect(-iWidth / 6 + iLineWidth, -iHeight / 2 + iLineWidth
                , iWidth / 3 - 2 * iLineWidth , iHeight - 2 * iLineWidth);
    ctx.restore();
  }

  updateInputLogicState() {
    this.m_inputLogicState[0] = this.m_boardParent.getNeighbourLogicState(this.m_iId, this.m_iOrientation + 6);
    super.updateInputLogicState();
  }

  updateOutputLogicState() {
    let oldOutputLogicState = this.m_outputLogicState[0];
    this.m_outputLogicState[0] = this.m_inputLogicState[0];
    if (oldOutputLogicState != this.m_outputLogicState[0]) {
      super.updateOutputLogicState();
    }
  }//*/
}
