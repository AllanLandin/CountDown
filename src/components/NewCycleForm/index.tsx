import { HandPalm, Play } from "@phosphor-icons/react";
import {
  AmountMinutes,
  FormContainer,
  InputContainer,
  StartBtn,
  StopBtn,
  TaskInput,
} from "./styles";
import { useContext } from "react";
import { cycleContext } from "../../contexts/cycleContext";
import { CountDown } from "../CountDown";
import { useFormContext } from "react-hook-form";

export function NewCycleForm() {
  const { activeCycle, interruptCurrentCycle } = useContext(cycleContext);
  const { watch, register } = useFormContext();

  const task = watch("task");
  let isSubmitDisabled = !task;

  return (
    <FormContainer>
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
          min={1}
          max={60}
          {...register("minutesAmount", { valueAsNumber: true })}
          disabled={!!activeCycle}
        />
        <span>minutos.</span>
      </InputContainer>
      <CountDown />
      {activeCycle ? (
        <StopBtn type="button" onClick={interruptCurrentCycle}>
          <HandPalm />
          Interromper
        </StopBtn>
      ) : (
        <StartBtn type="submit" disabled={isSubmitDisabled}>
          <Play />
          Começar
        </StartBtn>
      )}
    </FormContainer>
  );
}
