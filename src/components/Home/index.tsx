import { Play } from "@phosphor-icons/react";
import { useForm } from "react-hook-form"
import { zodResolver} from "@hookform/resolvers/zod"
import * as zod from 'zod'

import {
  HomeContainer,
  InputContainer,
  CountDownContainer,
  Separator,
  StartBtn,
  TaskInput,
  AmountMinutes,
} from "./styles";

const newCycleFormValidationSchema = zod.object({
  task: zod.string().min(1, "Informe a tarefa"),
  minutesAmount: zod
  .number()
  .min(5, "O ciclo precisa ser de no mínimo 5 minutos")
  .max(60, "O ciclo precisa ser de no máximo 60 minutos.")
})

type NewCycleFormData = zod.infer<typeof newCycleFormValidationSchema>

export function Home() {
  const {register, handleSubmit, watch, formState, reset} = useForm<NewCycleFormData>({
    resolver: zodResolver(newCycleFormValidationSchema),
    defaultValues: {
      task: '',
      minutesAmount: 0
    }
  })

  function handleCreateNewCycle(data: NewCycleFormData){
    console.log(data)
    reset();
  }
  
  console.log(formState.errors)

  const task = watch('task'); 
  let isSubmitDisabled = !task

  return (
    <HomeContainer>
      <form onSubmit={handleSubmit(handleCreateNewCycle)}>
        <InputContainer>
          <label htmlFor="task">Vou trabalhar em</label>
          <TaskInput
            id="task"
            list="task-suggestions"
            placeholder="Dê um nome para o seu projeto "
            {...register('task')} // registra um input a um form
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
            {...register('minutesAmount', {valueAsNumber: true})}
          />

          <span>minutos.</span>
        </InputContainer>

        <CountDownContainer>
          <span>0</span>
          <span>0</span>
          <Separator>:</Separator>
          <span>0</span>
          <span>0</span>
        </CountDownContainer>

        <StartBtn type="submit" disabled={isSubmitDisabled}>
          <Play />
          Começar
        </StartBtn>
      </form>
    </HomeContainer>
  );
}
