import styled from "styled-components";

export const HeaderComp = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 3.125rem;

  img {
    width: 2.5rem;
  }

  nav {
    display: flex;
    gap: 0.5rem;
  }

  a {
    color: ${(props) => props.theme["gray-100"]};
    border-bottom: 3px solid transparent;
    border-top: 3px solid transparent;
    transition: 0.1s;

    &:hover {
      border-bottom: ${(props) => `3px solid ${props.theme["green-500"]}`};
    }

    &.active {
      color: ${(props) => props.theme["green-500"]};
    }

    svg {
      font-size: 2.5rem;
    }
  }
`;
