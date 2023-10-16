import { createGlobalStyle } from "styled-components";
import reset from "styled-reset";

const GlobalStyles = createGlobalStyle`
    ${reset}
   
    *{
        box-sizing: border-box;
        margin: 0;
        padding: 0;
    }
    
    body{
        line-height: 1;
        font-family: 'Noto Sans KR', sans-serif;
    }

    html, body, div, span, h1, h2, h3, h4, h5, h6, p, 
    a, dl, dt, dd, ol, ul, li, form, label, table{
        // font-size: 10px;
        vertical-align: baseline;
    }

    a{
        text-decoration: none;
        color: inherit;
    }

    ol, ul{
        list-style: none;
    }

    button {
        cursor: pointer;
    }
`;

export default GlobalStyles;

// 사용방법:
// styled-components 와 styled-reset를 설치하고,
// 최상위 경로에 이런식으로 import 해준다
//
// function App() {
//   return (
//     <BrowserRouter>
//       <GlobalStyles />
//       <Routes>
//         <Route />
//         <Route />
//       </Routes>
//     </BrowserRouter>
//   );
// }

//경로: src/styles/GlobalStyles.js
