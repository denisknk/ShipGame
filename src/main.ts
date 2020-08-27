import GameSimulation from "./classes/GameSimulation";

import { amountOfPiers } from "./setTime";
export const newGame = new GameSimulation(amountOfPiers);
newGame.start();
