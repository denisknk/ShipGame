import ILoad from "../interfaces/ILoad";
import IPier from "./Pier";
import IShip from "../interfaces/IShip";

class Pier implements IPier {
  payload: ILoad;
  id: string;
  shipMoored: boolean;
  currentShip: IShip;
  constructor(id: number) {
    this.id = id.toString();
    this.payload = null; // загружена ли пристань
    this.shipMoored = false; // корабль пришвартован
  }

  load(payload: ILoad) {
    this.payload = payload;
  }
  unload(): ILoad {
    const toGive = this.payload;
    this.payload = null;
    return toGive;
  }
}

//

export default Pier;
