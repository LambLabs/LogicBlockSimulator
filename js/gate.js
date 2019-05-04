"use strict";
var LogicState = {
  LOW: 0,
  HIGH: 1,
  ZZZ: 2,
};

class Gate
{
  static get LOGIC_STATE_COLOR() {
    return ['white', 'red', 'gray'];
  }

  constructor(iX, iY, iOrientation, iInputCount) {
    this.m_iX = iX;
    this.m_iY = iY;
    this.m_iOrientation = iOrientation; //0 3 6 9
    this.m_outputLogicState = LogicState.ZZZ;
    this.m_iInputCount = iInputCount;
    this.m_inputLogicState = [];
    for (let i = 0; i < this.m_iInputCount; i++) {
      this.m_inputLogicState.push(LogicState.ZZZ);
    }
  }

  draw(ctx) {
    return 0;
  }
}
