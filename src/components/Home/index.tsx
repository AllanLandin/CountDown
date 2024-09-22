import { Play, HandPalm } from "@phosphor-icons/react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as zod from "zod";
import { useState, useEffect } from "react";
import { differenceInSeconds } from "date-fns";

import {
  HomeContainer,
  InputContainer,
  CountDownContainer,
  Separator,
  StartBtn,
  TaskInput,
  AmountMinutes,
  StopBtn,
} from "./styles";

const newCycleFormValidationSchema = zod.object({
  task: zod.string().min(1, "Informe a tarefa"),
  minutesAmount: zod
    .number()
    .min(5, "O ciclo precisa ser de no mínimo 5 minutos")
    .max(60, "O ciclo precisa ser de no máximo 60 minutos."),
});

type NewCycleFormData = zod.infer<typeof newCycleFormValidationSchema>;

interface Cycle {
  id: string;
  task: string;
  minutesAmount: number;
  startDate: Date;
  interruptedDate?: Date;
  finishedDate?: Date;
}

export function Home() {
  const [cycles, setCycles] = useState<Cycle[]>([]);
  const [activeCycleID, setActiveCycleID] = useState<string | undefined>("");
  const [amountSecondsPassed, setAmountSecondsPassed] = useState<number>(0);

  const activeCycle = cycles.find((cycle) => cycle.id === activeCycleID);

  const { register, handleSubmit, watch, reset } = useForm<NewCycleFormData>({
    resolver: zodResolver(newCycleFormValidationSchema),
    defaultValues: {
      task: "",
      minutesAmount: 0,
    },
  });

  useEffect(() => {
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
  }, [activeCycle]);

  function handleInterruptCycle() {
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

  function handleCreateNewCycle(data: NewCycleFormData) {
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

    reset();
  }

  const totalSeconds = activeCycle ? activeCycle.minutesAmount * 60 : 0;
  const currentSeconds = activeCycle ? totalSeconds - amountSecondsPassed : 0;

  const currentAmountMinutes = Math.floor(currentSeconds / 60);
  const currentAmountRestSeconds = currentSeconds % 60;

  const minutes = String(currentAmountMinutes).padStart(2, "0");
  const seconds = String(currentAmountRestSeconds).padStart(2, "0");

  useEffect(() => {
    if (activeCycle) {
      document.title = `${minutes}:${seconds}`;
    }
  }, [minutes, seconds]);

  const task = watch("task");
  let isSubmitDisabled = !task;

  return (
    <HomeContainer>
      <form onSubmit={handleSubmit(handleCreateNewCycle)}>
        <InputContainer>
          <label htmlFor="task">Vou trabalhar em</label>
          <TaskInput
            id="task"
            list="task-suggestions"
            placeholder="Dê um nome para o seu projeto "
            {...register("task")} // registra um input a um form
            disabled={!!activeCycle}
          />
          <datalist id="task-suggestions">
            <option value="Projeto 1" />
            <option value="Projeto 2" />
            <option value="Projeto 3" />
          </datalist>

          <label htmlFor="minutes">durante</label>
          <AmountMinutes
            id="minutes"
            placeholder="00"
            step={5}
            type="number"
            min={5}
            max={60}
            {...register("minutesAmount", { valueAsNumber: true })}
            disabled={!!activeCycle}
          />

          <span>minutos.</span>
        </InputContainer>

        <CountDownContainer>
          <span>{minutes[0]}</span>
          <span>{minutes[1]}</span>
          <Separator>:</Separator>
          <span>{seconds[0]}</span>
          <span>{seconds[1]}</span>
        </CountDownContainer>

        {activeCycle ? (
          <StopBtn type="button" onClick={handleInterruptCycle}>
            <HandPalm />
            Interromper
          </StopBtn>
        ) : (
          <StartBtn type="submit" disabled={isSubmitDisabled}>
            <Play />
            Começar
          </StartBtn>
        )}
      </form>
    </HomeContainer>
  );
}
