import Pier from "./Pier";
import IShip from "../interfaces/IShip";
import IPier from "../interfaces/IPier";
import { app } from "./GameSimulation";
import * as PIXI from "../pixi/pixi.min (1)";

export default class Port {
  pierArr: IPier[];
  shipLine: any[];
  pierSpacing: number;
  gateSpacing: number;
  constructor(quantity: number) {
    this.pierArr = [];
    this.shipLine = [];
    this.pierSpacing = 0;
    this.gateSpacing = 0;
    for (let i = 0; i < quantity; i++) {
      this.pierArr.push(new Pier(i));
      // 45* 125 это пирс
      // кораблю 105*40
      const rect = new PIXI.Graphics()
        .lineStyle(5, 0xffd800)
        .beginFill(0x4d34ff)
        .drawRect(0, this.pierSpacing, 45, 125);

      app.stage.addChild(rect);
      this.pierSpacing += 150;
    }
    for (let i = 0; i <= 1; i++) {
      const rect = new PIXI.Graphics()
        .beginFill(0xffd800)
        .drawRect(233, this.gateSpacing, 10, 185);
      // rect.lineStyle(1, 0xffd800);
      app.stage.addChild(rect);
      this.gateSpacing += 390;
    }
  }
  searchExactPier(bool: boolean) {
    if (bool) {
      const pier = this.pierArr.find((el) => {
        return !el.shipMoored && !el.payload;
      });
      if (pier === undefined) {
        return null;
      }
      return pier;
    }

    const pier: any = this.pierArr.find((el) => {
      return !el.shipMoored && !!el.payload;
    });
    if (pier === undefined) {
      return null;
    }
    return pier;
  }
  showPierArr() {
    return this.pierArr;
  }
  addShipToLine(ship: IShip) {
    this.shipLine.push(ship);
    return this.shipLine;
  }
}
