import Main from "./main";
import Basket from "./basket";
import useSelector from "../store/use-selector";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import ItemControl from "./item-control";

/**
 * Приложение
 * @returns {React.ReactElement}
 */
function App() {
  const activeModal = useSelector((state) => state.modals.name);

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Main />} />
        <Route path="/:itemId" element={<ItemControl />} />
      </Routes>
      {activeModal === "basket" && <Basket />}
    </BrowserRouter>
  );
}

export default App;
