import { differenceInSeconds } from "date-fns";
import { createContext, useState } from "react";
import { ReactNode } from "react";

interface ICycleContextProvProps {
  children: ReactNode;
}

interface Cycle {
  id: string;
  task: string;
  minutesAmount: number;
  startDate: Date;
  interruptedDate?: Date;
  finishedDate?: Date;
}

interface ICycleContext {
  cycles: Cycle[] | undefined;
  activeCycle: Cycle | undefined;
  activeCycleID: string | undefined;
  amountSecondsPassed: number;
  totalSeconds: number;
  interruptCurrentCycle: () => void;
  createNewCycle: (data: ICreateNewCycleData) => void;
  markCurrentCycleAsFinished: () => void;
}

interface ICreateNewCycleData {
  task: string;
  minutesAmount: number;
}

export const cycleContext = createContext({} as ICycleContext);

export function CycleContextProvider({ children }: ICycleContextProvProps) {
  const [cycles, setCycles] = useState<Cycle[]>([]);
  const [activeCycleID, setActiveCycleID] = useState<string | undefined>("");
  const [amountSecondsPassed, setAmountSecondsPassed] = useState<number>(0);

  const activeCycle = cycles.find((cycle) => cycle.id === activeCycleID);
  const totalSeconds = activeCycle ? activeCycle.minutesAmount * 60 : 0;

  function interruptCurrentCycle() {
    setAmountSecondsPassed(0);
    setCycles((state) =>
      state.map((cycle) => {
        if (cycle.id === activeCycleID) {
          return { ...cycle, interruptedDate: new Date() };
        } else {
          return { ...cycle };
        }
      })
    );
    setActiveCycleID("");
  }

  function createNewCycle(data: ICreateNewCycleData) {
    setAmountSecondsPassed(0);
    const id = String(new Date().getTime());
    const newCycle: Cycle = {
      id,
      task: data.task,
      minutesAmount: data.minutesAmount,
      startDate: new Date(),
    };
    setCycles((state) => [...state, newCycle]);
    setActiveCycleID(id);
  }

  function markCurrentCycleAsFinished() {
    let interval: number;
    if (activeCycle) {
      interval = setInterval(() => {
        const secondsDiffFromStart = differenceInSeconds(
          new Date(),
          activeCycle.startDate
        );

        if (secondsDiffFromStart >= totalSeconds) {
          setCycles((state) =>
            state.map((cycle) => {
              if (cycle.id === activeCycleID) {
                return { ...cycle, finishedDate: new Date() };
              } else {
                return { ...cycle };
              }
            })
          );
          setActiveCycleID("");
          clearInterval(interval);
          setAmountSecondsPassed(totalSeconds);
        } else {
          setAmountSecondsPassed(secondsDiffFromStart);
        }
      }, 1000);
    }

    return () => {
      clearInterval(interval);
    };
  }

  return (
    <cycleContext.Provider
      value={{
        cycles,
        activeCycle,
        amountSecondsPassed,
        activeCycleID,
        totalSeconds,
        interruptCurrentCycle,
        createNewCycle,
        markCurrentCycleAsFinished,
      }}
    >
      {children}
    </cycleContext.Provider>
  );
}
