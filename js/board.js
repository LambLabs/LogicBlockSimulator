"use strict";

var GateType = {
  AND:    Symbol('And'),
  OR:     Symbol('Or'),
  NOT:    Symbol('Not'),
  INPUT:  Symbol('Input'),
  OUTPUT: Symbol('Output'),
};

class Board
{
  constructor(iWidthInGates, iHeightInGates, iGateWidth, iGateHeight, iX, iY) {
    this.m_iX = iX;
    this.m_iY = iY;
    this.m_iWidthInGates = iWidthInGates;
    this.m_iHeightInGates = iHeightInGates;
    this.m_iGateWidth = iGateWidth;
    this.m_iGateHeight = iGateHeight;
    this.m_iX = iX;
    this.m_iY = iY;
    this.m_aLogicGates = [];
    for (let y = 0; y < this.m_iHeightInGates; y++) {
      for (let x = 0; x < this.m_iWidthInGates; x++) {
        this.m_aLogicGates.push(null);
      }
    }
  }

  insertGate(iXInGates, iYInGates, eGateType, iOrientation) {
    let newId = iYInGates * this.m_iWidthInGates + iXInGates;
    let gate = null;
    switch (eGateType) {
      case GateType.AND:
        gate = new AndGate(newId, this.m_iGateWidth / 2, this.m_iGateHeight / 2, iOrientation);
        break;
      case GateType.OR:
        gate = new OrGate(newId, this.m_iGateWidth / 2, this.m_iGateHeight / 2, iOrientation);
        break;
      case GateType.INPUT:
        gate = new InputGate(newId, this.m_iGateWidth / 2, this.m_iGateHeight / 2, iOrientation);
        break;
      case GateType.OUTPUT:
        gate = new OutputGate(newId, this.m_iGateWidth / 2, this.m_iGateHeight / 2, iOrientation);
        break;
    }
    this.m_aLogicGates[newId] = gate;
  }

  draw(ctx) {
    ctx.save();
    ctx.translate(this.m_iX, this.m_iY);
    ctx.strokeStyle = '#606060';
    for (let y = 0, i = 0; y < this.m_iHeightInGates; y++) {
      for (let x = 0; x < this.m_iWidthInGates; x++, i++) {
        ctx.save();
        ctx.translate(x * this.m_iGateWidth, y * this.m_iGateHeight);
        let logicgate = this.m_aLogicGates[i];
        if (logicgate) {
          logicgate.draw(ctx);
        } else {
          ctx.strokeRect(0, 0, this.m_iGateWidth, this.m_iGateHeight);
        }

        ctx.restore();
      }
    }

    ctx.restore();
    return 0;
  }
}
