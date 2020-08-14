"use strict";

var GateType = {
  AND:             Symbol('And'),
  OR:              Symbol('Or'),
  NOT:             Symbol('Not'),
  INPUT:           Symbol('Input'),
  OUTPUT:          Symbol('Output'),
  WIRES:           Symbol('WireStrate'),
  WIREL:           Symbol('WireLeft'),
  WIRER:           Symbol('WireRight'),
  WIRECL:          Symbol('WireCrossLeft'),
  WIRECR:          Symbol('WireCrossRight'),
  WIRET:           Symbol('WireT'),
  WIRETR:          Symbol('WireTR'),
  WIRETL:          Symbol('WireTL'),
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
    this.m_iPropagationTime = 10;
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
        gate = new AndGate(this, newId, this.m_iGateWidth / 2, this.m_iGateHeight / 2, iOrientation);
        break;
      case GateType.OR:
        gate = new OrGate(this, newId, this.m_iGateWidth / 2, this.m_iGateHeight / 2, iOrientation);
        break;
      case GateType.NOT:
        gate = new NotGate(this, newId, this.m_iGateWidth / 2, this.m_iGateHeight / 2, iOrientation);
        break;
      case GateType.INPUT:
        gate = new InputGate(this, newId, this.m_iGateWidth / 2, this.m_iGateHeight / 2, iOrientation);
        break;
      case GateType.OUTPUT:
        gate = new OutputGate(this, newId, this.m_iGateWidth / 2, this.m_iGateHeight / 2, iOrientation);
        break;
      case GateType.WIRES:
        gate = new WireS(this, newId, this.m_iGateWidth / 2, this.m_iGateHeight / 2, iOrientation);
        break;
      case GateType.WIREL:
        gate = new WireL(this, newId, this.m_iGateWidth / 2, this.m_iGateHeight / 2, iOrientation);
        break;
      case GateType.WIRER:
        gate = new WireR(this, newId, this.m_iGateWidth / 2, this.m_iGateHeight / 2, iOrientation);
        break;
      case GateType.WIRECL:
        gate = new WireCL(this, newId, this.m_iGateWidth / 2, this.m_iGateHeight / 2, iOrientation);
        break;
      case GateType.WIRECR:
        gate = new WireCR(this, newId, this.m_iGateWidth / 2, this.m_iGateHeight / 2, iOrientation);
        break;
      case GateType.WIRET:
        gate = new WireT(this, newId, this.m_iGateWidth / 2, this.m_iGateHeight / 2, iOrientation);
        break;
      case GateType.WIRETR:
        gate = new WireTR(this, newId, this.m_iGateWidth / 2, this.m_iGateHeight / 2, iOrientation);
        break;
      case GateType.WIRETL:
        gate = new WireTL(this, newId, this.m_iGateWidth / 2, this.m_iGateHeight / 2, iOrientation);
        break;
      default:
        console.log('Error wrong GateType' + eGateType);
        return;
    }
    this.m_aLogicGates[newId] = gate;
  }

  getNeighbourLogicState(iId, iOrientation) {
    let iY = Math.floor(iId / this.m_iWidthInGates);
    let iX = iId % this.m_iWidthInGates;
    let iOrientationFinal = iOrientation % 12;
    switch (iOrientationFinal) {
      case 0:
        iY = iY - 1;
        break;
      case 3:
        iX = iX + 1;
        break;
      case 6:
        iY = iY + 1;
        break;
      case 9:
        iX = iX - 1;
        break;
    }
    if (iY >= 0 && iY < this.m_iHeightInGates && iX >= 0 && iX < this.m_iWidthInGates) {
      iId = iX + iY * this.m_iWidthInGates;
      let gate = this.m_aLogicGates[iId];
      if (gate) {
        return gate.getLogicState(iOrientationFinal + 6);
      }
    }

    return LogicState.ZZZ;
  }

  scheduleUpdateOutputLogicState(iId) {
    let gate = this.m_aLogicGates[iId];
    window.setTimeout(gate.updateOutputLogicState.bind(gate),this.m_iPropagationTime);
  }

  scheduleUpdateInputLogicState(iId, iOrientation) {
    let iY = Math.floor(iId / this.m_iWidthInGates);
    let iX = iId % this.m_iWidthInGates;
    switch (iOrientation) {
      case 0:
        iY = iY - 1;
        break;
      case 3:
        iX = iX + 1;
        break;
      case 6:
        iY = iY + 1;
        break;
      case 9:
        iX = iX - 1;
        break;
    }
    if (iY >= 0 && iY < this.m_iHeightInGates && iX >= 0 && iX < this.m_iWidthInGates) {
      iId = iX + iY * this.m_iWidthInGates;
      let gate = this.m_aLogicGates[iId];
      if (gate) {
        window.setTimeout(gate.updateInputLogicState.bind(gate),this.m_iPropagationTime);
      }
    }
  }

  onclick(event) {
    console.log('click ' + event.clientX + ' ' + event.clientY);
    let mouseX = event.clientX;
    let mouseY = event.clientY;
    let iY = Math.floor(mouseY / this.m_iGateHeight);
    let iX = Math.floor(mouseX / this.m_iGateWidth);
    let iId = iX + iY * this.m_iWidthInGates;
    let gate = this.m_aLogicGates[iId];
    console.log('X: ' + iX + ' Y: ' + iY);
    if (gate instanceof InputGate) {
      gate.updateOutputLogicState();
    }
  }

  draw(ctx) {
    ctx.save();
    ctx.translate(this.m_iX, this.m_iY);
    //ctx.strokeStyle = '#606060';
    ctx.strokeStyle = '#EBEBEB';
    ctx.lineWidth = 1;
    for (let y = 0, i = 0; y < this.m_iHeightInGates; y++) {
      for (let x = 0; x < this.m_iWidthInGates; x++, i++) {
        ctx.save();
        ctx.translate(x * this.m_iGateWidth, y * this.m_iGateHeight);
        // Small grid (3x3)
        for(let i = 0; i < 3; i++)
          for(let j = 0; j < 3; j++)
            ctx.strokeRect(i*this.m_iGateWidth/3+0.5, j*this.m_iGateHeight/3+0.5, this.m_iGateWidth/3, this.m_iGateHeight/3);
        //ctx.strokeRect(0, 0, this.m_iGateWidth, this.m_iGateHeight);
        
        let logicgate = this.m_aLogicGates[i];
        if (logicgate) {
          logicgate.draw(ctx);
        }

        ctx.restore();
      }
    }

    ctx.restore();
    return 0;
  }
}
