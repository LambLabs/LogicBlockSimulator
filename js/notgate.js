"use strict";

class NotGate extends Gate {
  constructor(boardParent, iId, iX, iY, iOrientation) {
    super(boardParent, iId, iX, iY, iOrientation, 1, 1);
  }

  draw(ctx) {
    let iX = this.m_iX;
    let iY = this.m_iY;
    let iWidth = 36 * 2 / 2;
    let iHeight = 36 * 2 / 2;
    let iLineWidth = 10 / 2;
    let iSecWidth = 30 / 2;

    ctx.save();
    ctx.translate(iX, iY);
    ctx.rotate((Math.PI / 180) * 30 * this.m_iOrientation);
    ctx.fillStyle = '#595959';
    ctx.fillRect(-iWidth / 2, -iHeight / 2, iWidth, iHeight);

    /*
    ctx.save();
    ctx.rotate((Math.PI / 180) * 90);
    for (let i = 0; i < 2; i++)
    {
      ctx.beginPath();
      if (i == 3) {
        ctx.moveTo(-iWidth / 2 + iLineWidth, -iHeight / 2 + iSecWidth + iLineWidth * Math.SQRT2 / 2);
        ctx.lineTo(-iWidth / 2 + iSecWidth, -iHeight / 2 + iSecWidth + iLineWidth * Math.SQRT2 / 2);
        ctx.lineTo(-iWidth / 2 + iSecWidth, -iHeight / 2 + iHeight - iSecWidth - iLineWidth * Math.SQRT2 / 2);
        ctx.lineTo(-iWidth / 2 + iLineWidth, -iHeight / 2 + iHeight - iSecWidth - iLineWidth * Math.SQRT2 / 2);
      } else {
        ctx.moveTo(-iWidth / 2 + iLineWidth, -iHeight / 2 + iLineWidth + iLineWidth * Math.SQRT2 / 2);
        ctx.lineTo(-iWidth / 2 + iSecWidth, -iHeight / 2 + iSecWidth + iLineWidth * Math.SQRT2 / 2);
        ctx.lineTo(-iWidth / 2 + iSecWidth, -iHeight / 2 + iHeight - iSecWidth - iLineWidth * Math.SQRT2 / 2);
        ctx.lineTo(-iWidth / 2 + iLineWidth, -iHeight / 2 + iHeight - iLineWidth - iLineWidth * Math.SQRT2 / 2);
      }
      ctx.closePath();
      ctx.strokeStyle = Gate.LOGIC_STATE_COLOR[(i == 1) ? this.m_inputLogicState[0] : this.m_outputLogicState[0]];
      ctx.stroke();
      ctx.fillStyle = Gate.LOGIC_STATE_COLOR[(i == 1) ? this.m_inputLogicState[0] : this.m_outputLogicState[0]];
      ctx.fill();
      ctx.rotate((Math.PI / 180) * 180);
    }

    ctx.restore();
    //*/
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
