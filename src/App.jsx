import { BrowserRouter, Routes, Route } from "react-router-dom";
import Projects from "./components/Portfolio";
import ProjectDetails from "./components/ProjectDetails";


function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Projects />} />
         <Route path="/projects/:id" element={<ProjectDetails />} />
        
      </Routes>
    </BrowserRouter>
  );
}

export default App;
