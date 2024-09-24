import { CountDownContainer, Separator } from "./styles";
import { useContext, useEffect } from "react";
import { cycleContext } from "../../contexts/cycleContext";

export function CountDown() {
  const { activeCycle, totalSeconds, amountSecondsPassed } =
    useContext(cycleContext);

  const currentSeconds = activeCycle ? totalSeconds - amountSecondsPassed : 0;

  const currentAmountMinutes = Math.floor(currentSeconds / 60);
  const currentAmountRestSeconds = currentSeconds % 60;

  const minutes = String(currentAmountMinutes).padStart(2, "0");
  const seconds = String(currentAmountRestSeconds).padStart(2, "0");

  useEffect(() => {
    document.title = "Coundown";

    if (activeCycle) {
      document.title = `${minutes}:${seconds}`;
    }
  }, [minutes, seconds]);

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
