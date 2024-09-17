import { createGlobalStyle } from "styled-components";

export const GlobalStyle = createGlobalStyle`
    *{
        margin: 0;
        padding: 0;
        outline: 0;
    }

    body{
        font-family: "Roboto", sans-serif;
        background-color: ${(props) => props.theme["gray-900"]};
        padding: 0 0.5rem;
    }
`;
