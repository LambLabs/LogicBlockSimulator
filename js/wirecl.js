"use strict";

class WireCL extends Gate {
  constructor(boardParent, iId, iX, iY, iOrientation) {
    super(boardParent, iId, iX, iY, iOrientation, 2, 2);
    this.m_outputOrientation[1] = 9;
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
    ctx.rotate((Math.PI / 180) * -90);

    //ctx.fillStyle = Gate.LOGIC_STATE_COLOR[this.m_outputLogicState];
    for (let i = 0; i < 2; i++) {
      ctx.fillStyle = 'black';
      ctx.fillRect(-iWidth / 6 , -iHeight / 2
                  , iWidth / 3 , iHeight);

      let grdFill = ctx.createLinearGradient(0, -iHeight / 2, 0, iHeight / 2);
      let j = (i==0)?1:0;
      grdFill.addColorStop(1, Gate.LOGIC_STATE_COLOR[this.m_inputLogicState[j]]);
      grdFill.addColorStop(0, Gate.LOGIC_STATE_COLOR[this.m_outputLogicState[j]]);
      ctx.fillStyle = grdFill;
      ctx.fillRect(-iWidth / 6 + iLineWidth, -iHeight / 2 + iLineWidth
                  , iWidth / 3 - 2 * iLineWidth , iHeight - 2 * iLineWidth);
      ctx.rotate((Math.PI / 180) * 90);
    }

    ctx.restore();
  }

  updateInputLogicState() {
    this.m_inputLogicState[0] = this.m_boardParent.getNeighbourLogicState(this.m_iId, this.m_iOrientation + 6);
    this.m_inputLogicState[1] = this.m_boardParent.getNeighbourLogicState(this.m_iId, this.m_iOrientation + 3);
    super.updateInputLogicState();
  }

  updateOutputLogicState() {
    let oldOutputLogicState0 = this.m_outputLogicState[0];
    let oldOutputLogicState1 = this.m_outputLogicState[1];
    this.m_outputLogicState[0] = this.m_inputLogicState[0];
    this.m_outputLogicState[1] = this.m_inputLogicState[1];
    if (oldOutputLogicState0 != this.m_outputLogicState[0]
     || oldOutputLogicState1 != this.m_outputLogicState[1]) {
      super.updateOutputLogicState();
    }
  }//*/
}
