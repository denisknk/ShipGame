import Port from "./Port";
import Sea from "./Sea";
import IPort from "./Port";
import Gate from "./Gate";
import * as PIXI from "../pixi/pixi.min (1)";
import { createNewShip } from "../setTime";

export let app = new PIXI.Application({
  width: 675,
  height: 575,
  backgroundColor: 0x4d34ff,
});
document.body.appendChild(app.view);
document.body.style.display = "flex";
document.body.style.justifyContent = "center";

class GameSimulation {
  sea: any;
  _port: IPort;
  _gate: any;

  constructor(num: number) {
    this.sea = new Sea();

    this._port = new Port(num);
    this.sea.port = this._port;

    this._gate = new Gate();
    this.sea.gate = this._gate;
  }
  set port(num: any) {
    this._port = new Port(num);
  }
  get port() {
    return this._port;
  }

  get gate(): any {
    return this._gate;
  }

  start() {
    this.sea.startMakingShips();
    setTimeout(() => {
      this._gate.lineLoop();
    }, createNewShip);
    return this;
  }
  stop() {
    this.sea.stopMakingShips();
    this._gate.stopLoop();
  }
}

export default GameSimulation;
