import IShip from "../interfaces/IShip";
import ILoad from "../interfaces/ILoad";

class Ship implements IShip {
  isLoaded: boolean;
  id: string;
  payload: ILoad;
  color: string;
  canvas: any;
  pierIndex: any;
  constructor(
    id: string,
    payload: ILoad | null,
    isLoaded: boolean,
    color: string
  ) {
    this.id = id;
    this.payload = payload;
    this.isLoaded = isLoaded;
    this.color = color;
  }

  load(payload: ILoad) {
    this.payload = payload;
  }
  unload(): ILoad {
    const toGive = this.payload;
    this.payload = null;
    return toGive;
  }
  goToPier(index: number) {
    // console.log("index of pier is ", index);
    let y;
    switch (index) {
      case 0:
        y = 515;
        break;
      case 1:
        y = 370;
        break;
      case 2:
        y = 225;
        break;
      case 3:
        y = 80;
        break;
    }
    createjs.Tween.get(this.canvas)

      .to({ y: 220 }, 1000, createjs.Ease.getPowInOut(1))
      .to({ x: 177 }, 1000, createjs.Ease.getPowInOut(1))
      .to({ rotation: Math.PI / 2 }, 500)
      .to({ y: y }, 1000)
      .to({ rotation: 0 }, 500)
      .to({ x: 100 }, 1000);
  }

  goAway() {
    createjs.Tween.get(this.canvas)
      .to({ x: 177 }, 1000, createjs.Ease.getPowInOut(1))
      .to({ rotation: Math.PI / 2 }, 500)
      .to({ y: 350 }, 1000, createjs.Ease.getPowInOut(1))
      .to({ rotation: 0 }, 500)
      .to({ x: 1000 }, 4000);
  }
}

export default Ship;
