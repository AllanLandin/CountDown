import { CountDownContainer, Separator } from "./styles";
import { useContext, useEffect } from "react";
import { cycleContext } from "../../contexts/cycleContext";
import { differenceInSeconds } from "date-fns";

export function CountDown() {
  const {
    amountSecondsPassed,
    activeCycle,
    totalSeconds,
    markCurrentCycleAsFinished,
    setSecondsPassed,
  } = useContext(cycleContext);

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

  useEffect(() => {
    let interval: number;

    if (activeCycle) {
      interval = setInterval(() => {
        const secondsDiffFromStart = differenceInSeconds(
          new Date(),
          activeCycle.startDate
        );

        if (secondsDiffFromStart >= totalSeconds) {
          markCurrentCycleAsFinished();

          setSecondsPassed(totalSeconds);
          clearInterval(interval);
        } else {
          setSecondsPassed(secondsDiffFromStart);
        }
      }, 1000);
    }

    return () => {
      clearInterval(interval);
    };
  }, [activeCycle]);

  return (
    <CountDownContainer>
      <span>{minutes[0]}</span>
      <span>{minutes[1]}</span>
      <Separator>:</Separator>
      <span>{seconds[0]}</span>
      <span>{seconds[1]}</span>
    </CountDownContainer>
  );
}
