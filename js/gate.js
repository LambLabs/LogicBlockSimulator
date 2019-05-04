"use strict";
var LogicState = {
  LOW: 0, //Symbol('HIGH')
  HIGH: 1,
  ZZZ: 2,
};

class Gate
{
  static get LOGIC_STATE_COLOR() {
    return ['white', 'red', 'gray'];
  }

  constructor(iId, iX, iY, iOrientation, iInputCount) {
    this.m_iId = iId;
    this.m_iX = iX;
    this.m_iY = iY;
    this.m_iOrientation = iOrientation; //0 3 6 9
    this.m_outputLogicState = LogicState.ZZZ;
    this.m_iInputCount = iInputCount;
    this.m_inputLogicState = [];
    this.m_inputOrientation = [];
    for (let i = 0; i < this.m_iInputCount; i++) {
      this.m_inputLogicState.push(LogicState.ZZZ);
      this.m_inputOrientation.push(0);
    }
  }

  draw(ctx) {
    return 0;
  }

  updateInputLogicState() {
    //ScheduleUpdateOutputLogicState(this.m_iId);
  }

  updateOutputLogicState() {
    //ScheduleUpdateInputLogicState(this.m_iId,this.m_iOrientation);
  }

  getLogicState(iOrientation) {
    return (iOrientation == this.m_iOrientation) ? this.m_outputLogicState : LogicState.ZZZ;
  }
}
