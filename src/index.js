import * as React from "react";
import * as ReactDOM from "react-dom";
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import 'rsuite/dist/rsuite.min.css';

import Header from "./components/header";
import Root from "./routes/root";

import UrgentCareMenu from "./routes/urgentcare-menu";
import UrgentCare from "./routes/urgentcare";
import UrgentCareHUD from "./routes/urgentcare-livehud";

import Container from '@mui/material/Container';


ReactDOM.createRoot(document.getElementById("root")).render(
  <>
    <Router>
      <Header />
      <br />
      <Container>
        <Routes>
          <Route path="/" element={<Root />} />
          <Route path="/urgent-care" element={<UrgentCareMenu />} />
          <Route path="/urgent-care/history" element={<UrgentCare />} />
          <Route path="/urgent-care/live-hud" element={<UrgentCareHUD />} />
        </Routes>
      </Container>
    </Router>
  </>
);
