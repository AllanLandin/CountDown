import styled from "styled-components";

export const CountDownContainer = styled.div`
  display: flex;
  gap: 1rem;
  font-size: 10rem;
  font-family: "Roboto Mono", sans-serif;
  line-height: 8rem;

  span {
    background-color: ${(props) => props.theme["gray-700"]};
    padding: 2rem 1rem;
    color: ${(props) => props.theme["gray-100"]};
    border-radius: 8px;
  }
`;

export const Separator = styled.div`
  background-color: transparent;
  color: ${(props) => props.theme["green-500"]};
  padding: 2rem 0rem;
`;
