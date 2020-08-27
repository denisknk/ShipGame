import ILoad from "./ILoad";

interface IShip {
  id: string;
  isLoaded: boolean;
  payload: ILoad;
  color: string;
  canvas: any;
  pierIndex: any;
  goToPier: (number: number) => void;
  goAway: () => void;
}

export default IShip;
