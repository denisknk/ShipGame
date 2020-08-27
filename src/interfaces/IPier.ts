import ILoad from "./ILoad";

export default interface IPier {
  id: string;
  payload: ILoad;
  shipMoored: boolean;
  load: (payload: ILoad) => void;
  unload: () => ILoad;
}
