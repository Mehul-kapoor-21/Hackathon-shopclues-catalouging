import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Form from "./components/home/Form";
import Catalog from "./pages/Catalog";
import Catalog1 from "./pages/Catalog1";




function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Form/>} />
          <Route path="/catalog" element={<Catalog1 />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
