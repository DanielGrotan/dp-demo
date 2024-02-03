import { create } from "zustand";

type ConfigStore = {
  numbers: number[];
  turnsBeforeSwap: number;
  visualizationIntervalMS: number;
  setConfig(numbers: number[], turnsBeforeSwap: number): void;
  setVisualizationInterval(intervalMS: number): void;
};

export const useConfigStore = create<ConfigStore>((set) => ({
  numbers: [],
  turnsBeforeSwap: 1,
  visualizationIntervalMS: 1000,
  setConfig(numbers, turnsBeforeSwap) {
    set({ numbers, turnsBeforeSwap });
  },
  setVisualizationInterval(intervalMS) {
    set({
      visualizationIntervalMS: intervalMS,
    });
  },
}));

type VisualizationStore = {
  currentCell: [number, number, number];
  comparingCells: [number, number, number][];
  setCurrentCell(cell: [number, number, number]): void;
  setComparingCells(cells: [number, number, number][]): void;
};

export const useVisualizationStore = create<VisualizationStore>((set) => ({
  currentCell: [0, 0, 0],
  comparingCells: [
    [0, 0, 0],
    [0, 0, 0],
  ],
  setCurrentCell(cell) {
    set({
      currentCell: cell,
    });
  },
  setComparingCells(cells) {
    set({
      comparingCells: cells,
    });
  },
}));
