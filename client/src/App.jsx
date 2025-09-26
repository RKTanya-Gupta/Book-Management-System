import { BrowserRouter, Routes, Route } from "react-router-dom";
import Nav from "./Nav";
import Books from "./Books";
import CreateBook from "./CreateBook";
import UpdateBook from "./UpdateBook";

function App() {
  return (
    <BrowserRouter>
      <Nav />
      <Routes>
        <Route path="/" element={<Books />} />
        <Route path="/create" element={<CreateBook />} />
        <Route path="/update/:id" element={<UpdateBook />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;