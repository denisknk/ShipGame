import IShip from "../interfaces/IShip";
import { newGame } from "../main";
import { loopThroughArrays, timeToGiveAwayLoad } from "../setTime";
import { app } from "./GameSimulation";
import * as PIXI from "../pixi/pixi.min (1)";
import Ship from "./Ship";

class Gate {
  currentShip: IShip;
  loadedQueue: any[];
  unloadedQueue: any[];
  exitQueue: any[];
  loadedQueueView: any[];
  unloadedQueueView: any[];
  intervalId: any;

  constructor() {
    this.loadedQueue = [];
    this.unloadedQueue = [];
    this.exitQueue = [];
  }
  receiveShip(ship: IShip, isLoaded: boolean) {
    if (isLoaded) {
      this.loadedQueue.push(ship);
    } else {
      this.unloadedQueue.push(ship);
    }
  }

  shiftShipQueue(isLoaded: boolean) {
    if (isLoaded) {
      this.loadedQueue.shift();
      this.loadedQueue.forEach((ship, index) => {
        // console.log("shift");
        createjs.Tween.get(ship.canvas).to(
          { x: 300 + index * 110 },
          500,
          createjs.Ease.getPowInOut(1)
        );
      });
    } else {
      this.unloadedQueue.shift();
      this.unloadedQueue.forEach((ship, index) => {
        // console.log("shift");
        createjs.Tween.get(ship.canvas).to(
          { x: 300 + index * 110 },

          500,
          createjs.Ease.getPowInOut(1)
        );
      });
    }
  }

  stopLoop() {
    clearInterval(this.intervalId);
  }
  lineLoop() {
    let count: number = 0;
    this.intervalId = setInterval(() => {
      count++;

      console.log(
        this.unloadedQueue,
        this.loadedQueue,
        this.exitQueue
        // newGame.port.pierArr
      );
      if (this.loadedQueue[0] && count % 3 === 0) {
        // console.log("case1", this.loadedQueue[0]);
        const pier: any = newGame.port.searchExactPier(true);
        if (!pier) return;
        // console.log("id is ", parseInt(pier.id));
        const ship = this.loadedQueue[0];
        ship.pierIndex = parseInt(pier.id);
        this.shiftShipQueue(true);
        pier.currentShip = ship;
        pier.payload = ship.payload;
        pier.shipMoored = true;
        ship.goToPier(parseInt(pier.id));

        setTimeout(() => {
          this.exitQueue.push(ship);
        }, timeToGiveAwayLoad);
      }

      if (this.unloadedQueue[0] && count % 3 === 1) {
        // console.log("case2", this.unloadedQueue[0]);

        const ship = this.unloadedQueue[0];
        const pier = newGame.port.searchExactPier(false);
        if (!pier) return;
        ship.pierIndex = pier.id;
        // console.log("id is ", parseInt(pier.id));
        pier.currentShip = ship;
        // pier.currentShip = this.unloadedQueue[0];
        pier.payload = ship.payload;
        pier.shipMoored = true;
        ship.goToPier(parseInt(pier.id));
        // console.log("unloadedQueue is ", this.unloadedQueue);
        this.shiftShipQueue(false);

        setTimeout(() => {
          this.exitQueue.push(ship);
        }, timeToGiveAwayLoad);
      }
      if (this.exitQueue[0] && count % 3 === 2) {
        // console.log("case3");
        const ship = this.exitQueue[0];
        this.exitQueue.shift();

        const pier = newGame.port.pierArr[ship.pierIndex];
        // console.log(pier);
        ship.goAway();
        setTimeout(() => {
          pier.currentShip = null;
          pier.shipMoored = false;
        }, 2000);
      }
    }, loopThroughArrays);
  }
}

export default Gate;
