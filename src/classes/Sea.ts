import Ship from "./Ship";
import { createNewShip, timeBeforePort } from "../setTime";
import ILoad from "../interfaces/ILoad";
import Gate from "./Gate";
import { newGame } from "../main";
import { app } from "./GameSimulation";
import * as PIXI from "../pixi/pixi.min (1)";

class Sea {
  payload: ILoad | null;
  id: number;
  timerId: any;
  _gate: any;
  port: any;
  gate: any;
  changeUnloadedQueue: number;
  changeLoadedQueue: number;
  constructor() {
    this.id = 0;
    this._gate = new Gate();
    this.changeUnloadedQueue = 300;
    this.changeLoadedQueue = 300;
  }
  createViewShip(
    changeQueue: number,
    y: number,
    isLoaded: boolean,
    border: number,
    backgroundColor: number
  ) {
    const rect = new PIXI.Graphics()
      .lineStyle(5, border)
      .beginFill(backgroundColor)
      .moveTo(-50, -25)
      .lineTo(50, -25)
      .lineTo(50, 25)
      .lineTo(-50, 25)
      .closePath()
      .endFill();

    // console.log(this);
    if (!isLoaded) {
      // console.log(this.gate.unloadedQueue.length);
      this.changeUnloadedQueue = 300 + this.gate.unloadedQueue.length * 110;
    } else {
      // console.log(this.gate.loadedQueue.length);
      this.changeLoadedQueue = 300 + this.gate.loadedQueue.length * 110;
    }
    // @ts-ignore
    // window.stage = app.stage;
    (rect.x = 800), (rect.y = 800);
    app.stage.addChild(rect);
    const result = createjs.Tween.get(rect)
      .to({ y: 220 }, 20)
      .to({ x: 730 }, 20)
      .to({ x: 729 }, 10)
      .to({ x: changeQueue }, 2000)
      .to({ y: y }, 500);

    // createjs.Tween.get(temp1)
    //     .to({ rotation: Math.PI/2}, 2000, createjs.Ease.getPowInOut(1))

    return rect;
  }
  startMakingShips() {
    this.timerId = setInterval(() => {
      // console.log("startMakingShips");
      let rand = Math.round(Math.random());
      if (!this.id) {
        rand = 1;
      }
      const id = this.id.toString();
      const payload = rand ? { id: this.id.toString() } : null;
      const isLoaded = rand ? true : false;
      const color = rand ? "red" : "green";
      const currentShip = new Ship(id, payload, isLoaded, color);
      let currentViewShip: any;
      this.id++;
      if (!isLoaded) {
        // creating a view of the ship
        currentViewShip = this.createViewShip(
          this.changeUnloadedQueue,
          157,
          false,
          0x58ff59,
          0x4d34ff
        );
        currentShip.canvas = currentViewShip;
      } else {
        currentViewShip = this.createViewShip(
          this.changeLoadedQueue,
          417,
          true,
          0xfd0100,
          0xfd0100
        );
        currentShip.canvas = currentViewShip;
      }
      newGame.gate.receiveShip(currentShip, isLoaded);
      // currentViewShip

      // setTimeout(() => {
      //   newGame.gate.receiveShip(currentShip, isLoaded);
      // }, timeBeforePort);
    }, createNewShip);
  }
  stopMakingShips() {
    clearInterval(this.timerId);
  }
}

export default Sea;
