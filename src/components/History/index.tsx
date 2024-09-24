import { HistoryContainer, HistoryList, Status } from "./styles";
import { useContext } from "react";
import { cycleContext } from "../../contexts/cycleContext";
import { STATUSCOLORS } from "./styles";
import { formatDistance } from "date-fns";
import { ptBR } from "date-fns/locale";

export function Hystory() {
  const { cycles } = useContext(cycleContext);

  return (
    <HistoryContainer>
      <h1>Meu histórico</h1>
      <HistoryList>
        <table>
          <thead>
            <tr>
              <th>Tarefa</th>
              <th>Duração</th>
              <th>Início</th>
              <th>Status</th>
            </tr>
          </thead>
          <tbody>
            {cycles?.map((cycle) => {
              let cycleState: keyof typeof STATUSCOLORS;
              let statusMessage: string;
              if (cycle.finishedDate) {
                cycleState = "green";
                statusMessage = "Concluído";
              } else if (cycle.interruptedDate) {
                cycleState = "red";
                statusMessage = "Interrompido";
              } else {
                cycleState = "yellow";
                statusMessage = "Em andamento";
              }
              return (
                <tr>
                  <td>{cycle.task}</td>
                  <td>{cycle.minutesAmount} minutos</td>
                  <td>
                    {formatDistance(Date.now(), cycle.startDate, {
                      addSuffix: true,
                      locale: ptBR,
                    })}
                  </td>
                  <Status statusColor={cycleState}>{statusMessage}</Status>
                </tr>
              );
            })}
          </tbody>
        </table>
      </HistoryList>
    </HistoryContainer>
  );
}
