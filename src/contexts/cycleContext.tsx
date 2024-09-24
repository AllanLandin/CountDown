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
  setSecondsPassed: (seconds: number) => void;
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
    const id = String(new Date().getTime());
    const newCycle: Cycle = {
      id,
      task: data.task,
      minutesAmount: data.minutesAmount,
      startDate: new Date(),
    };
    setCycles((state) => [...state, newCycle]);
    setActiveCycleID(id);
    setAmountSecondsPassed(0);
  }

  function markCurrentCycleAsFinished() {
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
  }

  function setSecondsPassed(seconds: number) {
    setAmountSecondsPassed(seconds);
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
        setSecondsPassed,
      }}
    >
      {children}
    </cycleContext.Provider>
  );
}
