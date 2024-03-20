import { BrowserRouter, Routes, Route } from 'react-router-dom';
import MainPage from './MainPage';
import Nav from './Nav';
import TechnicianList from './TechnicianList';
import TechnicianForm from './TechnicianForm';
import TechnicianDetail from './TechnicianDetail';
import AppointmentList from './AppointmentList';

function App() {
  return (
    <BrowserRouter>
      <Nav />
      <div className="container">
        <Routes>
          <Route path="/" element={<MainPage />} />
          <Route path="technicians">
            <Route index element={<TechnicianList />} />
            <Route path="new" element={<TechnicianForm />} />
            <Route path=":id" element={<TechnicianDetail />} />
          </Route>
          <Route path="appointments">
            <Route index element={<AppointmentList />} />
            {/* <Route path="new" element={<TechnicianForm />} />
            <Route path=":id" element={<TechnicianDetail />} /> */}
          </Route>
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
