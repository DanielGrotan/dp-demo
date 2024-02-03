"use client";

import {
  Card,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { useDP } from "@/hooks/dp";
import { useConfigStore, useVisualizationStore } from "@/lib/store";
import { cn } from "@/lib/utils";
import { motion } from "framer-motion";
import { useEffect, useState } from "react";

type GameState = {
  currentIndex: number;
  turn: number;
  picksRemaining: number;
};

type CellProps = null | {
  decision?: "take" | "give";
  state: GameState;
  nextState?: GameState;
  scores: [number, number];
  currentNumber?: number;
};

function createTable(n: number, m: number): CellProps[][][] {
  return new Array(n + 1)
    .fill(0)
    .map(() => new Array(2).fill(0).map(() => new Array(m + 1).fill(null)));
}

type VisualizationProps = {
  visualizationTrigger: boolean;
};

export function Visualization({ visualizationTrigger }: VisualizationProps) {
  const numbers = useConfigStore((state) => state.numbers);
  const turnsBeforeSwap = useConfigStore((state) => state.turnsBeforeSwap);

  const [table, setTable] = useState<CellProps[][][]>(() =>
    createTable(numbers.length, turnsBeforeSwap)
  );
  const nextIteration = useDP(numbers, turnsBeforeSwap, visualizationTrigger);

  const setCurrentCell = useVisualizationStore((state) => state.setCurrentCell);
  const setComparingCells = useVisualizationStore(
    (state) => state.setComparingCells
  );

  const visualizationInterval = useConfigStore(
    (state) => state.visualizationIntervalMS
  );

  useEffect(() => {
    setTable(createTable(numbers.length, turnsBeforeSwap));
  }, [visualizationTrigger]);

  useEffect(() => {
    const interval = setInterval(() => {
      const iterationResult = nextIteration();

      if (!iterationResult) {
        cleanUp();
        return;
      }

      const { state, decision, nextState, comparingCells, scores } =
        iterationResult;

      table[state.currentIndex][state.turn][
        turnsBeforeSwap - state.picksRemaining
      ] = {
        state,
        decision,
        nextState,
        scores,
        currentNumber: numbers[state.currentIndex],
      };

      setTable([...table]);
      setCurrentCell([
        state.currentIndex,
        state.turn,
        turnsBeforeSwap - state.picksRemaining,
      ]);

      if (nextState !== undefined) {
        setComparingCells(
          comparingCells.map((cell) => [
            // @ts-ignore
            cell.currentIndex,
            // @ts-ignore
            cell.turn,
            // @ts-ignore
            turnsBeforeSwap - cell.picksRemaining,
          ])
        );
      }
    }, visualizationInterval);

    function cleanUp() {
      clearInterval(interval);
    }

    return cleanUp;
  }, [table, visualizationInterval]);

  return (
    <div className="flex gap-4 overflow-x-auto scrollbar-thin scrollbar-thumb-gray-900 scrollbar-track-gray-100 p-4">
      {table.map((column, idx) => (
        <Column key={idx} column={column} index={[idx]} />
      ))}
    </div>
  );
}

type ColumnProps = {
  column: CellProps[][];
  index: [number];
};

function Column({ column, index }: ColumnProps) {
  return (
    <div className="flex flex-col gap-4 justify-end">
      {column.map((row, idx) => (
        <Row key={idx} row={row} index={[...index, idx]} />
      ))}
    </div>
  );
}

type RowProps = {
  row: CellProps[];
  index: [number, number];
};

function Row({ row, index }: RowProps) {
  if (row.every((val) => val === null)) return null;

  return (
    <div className="flex gap-4 justify-end">
      {row.map((cell, idx) => (
        <Cell key={idx} cell={cell} index={[...index, idx]} />
      ))}
    </div>
  );
}

function Cell({
  cell,
  index,
}: {
  cell: CellProps;
  index: [number, number, number];
}) {
  const currentCell = useVisualizationStore((state) => state.currentCell);
  const comparingCells = useVisualizationStore((state) => state.comparingCells);

  if (!cell) {
    return null;
  }

  const { state, decision, nextState, scores, currentNumber } = cell;

  return (
    <motion.div
      initial={{ opacity: 0.5, x: -100 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.5 }}>
      <Card
        className={cn(
          "w-[205px]",
          index.join(",") === currentCell.join(",") && "border-green-600",
          comparingCells.some((cell) => cell.join(",") === index.join(",")) &&
            "border-orange-600"
        )}>
        <CardHeader>
          <CardTitle>Cell Info:</CardTitle>
          <CardDescription className="flex flex-col">
            <span>Current Number: {currentNumber ?? "?"}</span>
            <span>Current Index: {state.currentIndex}</span>
            <span>Current Turn: {state.turn}</span>
            <span>Picks Remaining: {state.picksRemaining}</span>
            <span>Scores: {scores.join(", ")}</span>
            {decision ? (
              <span>Decision: {decision}</span>
            ) : (
              <span>Decision: No decision, because game is over</span>
            )}
            {nextState && (
              <span>
                Next State: ({nextState.currentIndex}, {nextState.turn},{" "}
                {nextState.picksRemaining})
              </span>
            )}
          </CardDescription>
        </CardHeader>
      </Card>
    </motion.div>
  );
}
