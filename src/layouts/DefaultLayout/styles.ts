import styled from "styled-components";

export const Container = styled.div`
  min-height: calc(100vh - 15rem);
  display: flex;
  flex-direction: column;
  max-width: 1120px;
  margin: 4rem auto;
  padding: 2.5rem;
  background-color: ${(props) => props.theme["gray-800"]};
  border-radius: 8px;
`;
