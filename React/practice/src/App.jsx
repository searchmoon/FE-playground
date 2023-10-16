import { BrowserRouter, Route, Routes } from "react-router-dom";
import Theme from "./pages/Theme";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path={"/"} element={<Theme />}></Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
