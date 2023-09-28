import * as React from "react";
import * as ReactDOM from "react-dom";
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import 'rsuite/dist/rsuite.min.css';

import Header from "./components/header";
import Root from "./routes/root";
import UrgentCare from "./routes/urgentcare";
import BerylBikes from "./routes/berylbikes";

import Container from '@mui/material/Container';


ReactDOM.createRoot(document.getElementById("root")).render(
  <>
    <Router>
      <Header />
      <br />
      <Container>
        <Routes>
          <Route path="/" element={<Root />} />
          <Route path="/urgent-care" element={<UrgentCare />} />
          <Route path="/beryl-bikes" element={<BerylBikes />} />
        </Routes>
      </Container>
    </Router>
  </>
);
