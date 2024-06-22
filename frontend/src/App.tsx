import { BrowserRouter,Route,Routes } from "react-router-dom";
import { Signup } from "./pages/Signup";
import { Signin } from "./pages/Signin";
import { Landing } from "./pages/Landing";
import { About } from "./pages/About";
import {AllProblems} from './pages/allProblems'
import { ProblemDetailPage } from "./pages/ProblemDetailPage";
import React from "react";

function App(){
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path='/signup' element={<Signup />} />
          <Route path='/signin' element={<Signin />} />
          <Route path='/landing' element={<Landing />} />
          <Route path='/about' element={<About />} />
          <Route path='/problems' element={<AllProblems />} />
          <Route path="/problems/:id" element={<ProblemDetailPage />} />

        </Routes>
      </BrowserRouter>
    </>
  )
}
export default App