"use strict";

class NotGate extends Gate {
  constructor(boardParent, iId, iX, iY, iWidth, iHeight, iOrientation) {
    super(boardParent, iId, iX, iY, iWidth, iHeight, iOrientation, 1, 1);
  }

  draw(ctx) {
    let iX = this.m_iX;
    let iY = this.m_iY;
    let iWidth = this.m_iWidth;
    let iHeight = this.m_iHeight;
    let iLineWidth = 0;
    let iSecWidth = 60 / 2;

    ctx.save();
    ctx.translate(iX, iY);
    ctx.rotate((Math.PI / 180) * 30 * this.m_iOrientation);
    ctx.fillStyle = '#595959';
    ctx.fillRect(-iWidth / 2, -iHeight / 2, iWidth, iHeight);

    //*
    ctx.save();
    for (let i = 0; i < 1; i++)
    { 
      ctx.rotate((Math.PI / 180) * -90);
      ctx.beginPath();
      ctx.moveTo(-iWidth / 2, - iHeight / 12);
      ctx.lineTo(-iWidth / 2 + iWidth / 6 , 0);
      ctx.lineTo(-iWidth / 2, + iHeight / 12);
      ctx.lineTo(-iWidth / 2, - iHeight / 12);
      ctx.closePath();
      
      ctx.strokeStyle = Gate.LOGIC_STATE_COLOR[this.m_inputLogicState[i]];
      ctx.stroke();
      ctx.fillStyle = Gate.LOGIC_STATE_COLOR[this.m_inputLogicState[i]];
      ctx.fill();
    }
    ctx.restore();
    //*/

    ctx.strokeStyle = '#595959';
    ctx.strokeRect(-iWidth / 2 + 0.5, - iHeight / 2 +0.5, iWidth-1, iHeight-1);

    ctx.fillStyle = Gate.LOGIC_STATE_COLOR[this.m_outputLogicState[0]];
    //ctx.fillRect(-iWidth / 2 + iSecWidth + iLineWidth * Math.SQRT2 / 2, -iHeight / 2 + iSecWidth + iLineWidth * Math.SQRT2 / 2, iWidth - 2 * (iSecWidth + iLineWidth * Math.SQRT2 / 2), iHeight - 2 * (iSecWidth+iLineWidth * Math.SQRT2 / 2));
    ctx.fillRect(-iWidth / 2 + iWidth / 3, -iHeight / 2
                , iWidth / 3, iHeight / 3);

    ctx.rotate((Math.PI / 180) * 0);
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    ctx.fillStyle = 'white';
    ctx.font = '8px Calibri';
    ctx.fillText('NOT', 0, iHeight / 2 - (iSecWidth - iLineWidth) / 2 - iLineWidth);
    ctx.restore();
  }

  updateInputLogicState() {
    this.m_inputLogicState[0] = this.m_boardParent.getNeighbourLogicState(this.m_iId, this.m_iOrientation + 6);
    super.updateInputLogicState();
  }

  updateOutputLogicState() {
    let oldOutputLogicState = this.m_outputLogicState[0];
    if (this.m_inputLogicState[0] == LogicState.ZZZ) {
      this.m_outputLogicState[0] = LogicState.ZZZ;
    } else if (this.m_inputLogicState[0] == LogicState.HIGH) {
      this.m_outputLogicState[0] = LogicState.LOW;
    } else {
      this.m_outputLogicState[0] = LogicState.HIGH;
    }
    if (oldOutputLogicState != this.m_outputLogicState[0]) {
      super.updateOutputLogicState();
    }
  }
}
