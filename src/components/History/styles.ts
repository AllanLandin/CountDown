import styled from "styled-components";

export const HistoryContainer = styled.div`
  color: ${(props) => props.theme["gray-100"]};

  flex: 1;
  display: flex;
  flex-direction: column;
  gap: 2rem;

  h1 {
    font-size: 1.2rem;
    font-weight: bold;
  }
`;

export const HistoryList = styled.div`
  flex: 1;
  overflow: auto;
  border-radius: 8px;

  table {
    width: 100%;
    border-collapse: collapse;
    min-width: 600px;
    text-align: left;

    th {
      background-color: ${(props) => props.theme["gray-600"]};
      padding: 1rem 1.2rem;
      line-height: 1.6;
    }

    td {
      background-color: ${(props) => props.theme["gray-700"]};
      padding: 1rem 1.2rem;
      line-height: 1.6;
      border-top: 4px solid ${(props) => props.theme["gray-800"]};
    }
  }
`;

const STATUSCOLORS = {
  yellow: "yellow-500",
  green: "green-500",
  red: "red-500",
} as const;

interface IStatusProps {
  statusColor: keyof typeof STATUSCOLORS;
}

export const Status = styled.td<IStatusProps>`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  background-color: blue;

  &::before {
    content: "";
    width: 0.5rem;
    height: 0.5rem;
    border-radius: 100%;
    background: ${(props) => props.theme[STATUSCOLORS[props.statusColor]]};
  }
`;
