import { useEffect, useState } from "react";

function createDP(
  numbers: number[],
  turnsBeforeSwap: number
): [number, number][][][] {
  const dp = new Array(numbers.length + 1);

  for (let i = 0; i < numbers.length + 1; i++) {
    dp[i] = new Array(2);

    for (let j = 0; j < 2; j++) {
      dp[i][j] = new Array(turnsBeforeSwap + 1);

      for (let k = 0; k < turnsBeforeSwap + 1; k++) {
        dp[i][j][k] = [0, 0];
      }
    }
  }

  return dp;
}

export function useDP(
  numbers: number[],
  turnsBeforeSwap: number,
  trigger: boolean
) {
  const [dp, setDP] = useState(() => createDP(numbers, turnsBeforeSwap));

  let [{ currentIndex, turn, picksRemaining, doneIterating }, setCurrentState] =
    useState({
      currentIndex: numbers.length,
      turn: 1,
      picksRemaining: 0,
      doneIterating: numbers.length === 0,
    });

  useEffect(() => {
    setDP(createDP(numbers, turnsBeforeSwap));
    setCurrentState({
      currentIndex: numbers.length,
      turn: 1,
      picksRemaining: 0,
      doneIterating: numbers.length === 0,
    });
  }, [trigger]);

  function updateIndices() {
    if (++picksRemaining > turnsBeforeSwap) {
      picksRemaining = 0;
      if (--turn < 0) {
        turn = 1;
        --currentIndex;
      }
    }

    if (currentIndex < 0) {
      doneIterating = true;
    }

    setCurrentState({ currentIndex, turn, picksRemaining, doneIterating });
  }

  function nextIteration() {
    if (doneIterating) return;

    let takeScore,
      takeState,
      giveScore,
      giveState,
      decision: "take" | "give" | undefined,
      nextState,
      a,
      b;

    if (currentIndex == numbers.length) {
      takeScore = [0, 0] as [number, number];
      giveScore = [0, 0] as [number, number];
    } else {
      if (picksRemaining <= 1) {
        [a, b] = dp[currentIndex + 1][(turn + 1) % 2][turnsBeforeSwap];

        if (turn == 0) {
          takeScore = [numbers[currentIndex] + a, b];
        } else {
          takeScore = [a, numbers[currentIndex] + b];
        }

        takeState = {
          currentIndex: currentIndex + 1,
          turn: (turn + 1) % 2,
          picksRemaining: turnsBeforeSwap,
        };
      } else {
        [a, b] = dp[currentIndex + 1][turn][picksRemaining - 1];

        if (turn == 0) {
          takeScore = [numbers[currentIndex] + a, b];
        } else {
          takeScore = [a, numbers[currentIndex] + b];
        }

        takeState = {
          currentIndex: currentIndex + 1,
          turn: turn,
          picksRemaining: picksRemaining - 1,
        };
      }

      [a, b] = dp[currentIndex + 1][turn][picksRemaining];

      if (turn == 0) {
        giveScore = [a, numbers[currentIndex] + b];
      } else {
        giveScore = [numbers[currentIndex] + a, b];
      }

      giveState = {
        currentIndex: currentIndex + 1,
        turn,
        picksRemaining,
      };

      if (turn == 0) {
        if (takeScore[0] > giveScore[0]) {
          // @ts-ignore
          dp[currentIndex][turn][picksRemaining] = takeScore;
          decision = "take";
          nextState = takeState;
        } else {
          // @ts-ignore
          dp[currentIndex][turn][picksRemaining] = giveScore;
          decision = "give";
          nextState = giveState;
        }
      } else {
        if (takeScore[1] > giveScore[1]) {
          // @ts-ignore
          dp[currentIndex][turn][picksRemaining] = takeScore;
          decision = "take";
          nextState = takeState;
        } else {
          // @ts-ignore
          dp[currentIndex][turn][picksRemaining] = giveScore;
          decision = "give";
          nextState = giveState;
        }
      }
    }

    const returnValue = {
      decision,
      state: {
        currentIndex: currentIndex,
        turn: turn,
        picksRemaining: picksRemaining,
      },
      nextState,
      comparingCells: [takeState, giveState],
      scores: dp[currentIndex][turn][picksRemaining],
    };

    setDP([...dp]);

    updateIndices();

    return returnValue;
  }

  return nextIteration;
}
