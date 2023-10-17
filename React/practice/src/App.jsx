import { BrowserRouter, Route, Routes } from "react-router-dom";
import Theme from "./pages/Theme";

import Home from "./pages/Home";
import AddImage from "./pages/AddImage";
import AddIcon from "./pages/AddIcon";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path={"/"} element={<Home />}></Route>
        <Route path={"/theme"} element={<Theme />}></Route>
        <Route path={"/addIcon"} element={<AddIcon />}></Route>
        <Route path={"/addImage"} element={<AddImage />}></Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
