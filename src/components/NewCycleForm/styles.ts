import styled from "styled-components";

export const FormContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 2.5rem;
  align-items: center;
  justify-content: space-around;
`;

export const InputBase = styled.input`
  background-color: transparent;
  height: 2.5rem;
  border: 0;
  border-bottom: 2px solid ${(props) => props.theme["gray-500"]};
  font-weight: bold;
  font-size: inherit;
  padding: 0 0.5rem;
  color: ${(props) => props.theme["gray-100"]};
  transition: 0.1s;

  &::placeholder {
    color: ${(props) => props.theme["gray-500"]};
    font-size: 0.87rem;
  }

  &:focus {
    border-color: ${(props) => props.theme["green-500"]};
  }
`;

export const TaskInput = styled(InputBase)`
  flex: 1;
  &::-webkit-calendar-picker-indicator {
    display: none !important;
  }
`;
export const AmountMinutes = styled(InputBase)`
  width: 4rem;
  text-align: center;
`;

export const InputContainer = styled.div`
  color: ${(props) => props.theme["gray-100"]};
  font-weight: bold;
  display: flex;
  gap: 0.5rem;
  align-items: center;
  justify-content: center;

  input {
    border: 0;
    background-color: transparent;
    border-bottom: ${(props) => `2px solid ${props.theme["gray-400"]}`};
    color: ${(props) => props.theme["gray-400"]};
  }
`;

export const CountDownBtn = styled.button`
  width: 100%;
  border: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 1.2rem;
  border-radius: 8px;
  gap: 0.5rem;
  cursor: pointer;
  transition: 0.1s;

  svg {
    font-size: 1.1rem;
  }

  &:disabled {
    cursor: not-allowed;
    opacity: 0.7;
  }
`;

export const StartBtn = styled(CountDownBtn)`
  background-color: ${(props) => props.theme["green-500"]};
  color: ${(props) => props.theme["gray-100"]};

  &:not(:disabled):hover {
    background-color: ${(props) => props.theme["green-300"]};
  }
`;

export const StopBtn = styled(CountDownBtn)`
  background-color: ${(props) => props.theme["red-700"]};
  color: ${(props) => props.theme["gray-100"]};

  &:not(:disabled):hover {
    background-color: ${(props) => props.theme["red-500"]};
  }
`;
