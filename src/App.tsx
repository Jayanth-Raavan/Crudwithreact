import { BrowserRouter, Route, Routes } from 'react-router-dom';
import './App.css';
import { UsersTable } from './pages/UsersTable';
import { UsersForm } from './pages/UsersForm';
import Header from './components/Header';

function App() {
  return (
    <>
      <BrowserRouter>
        <Header />
        <Routes>
          <Route path='/' element={<UsersTable />} />
          <Route path='/add' element={<UsersForm />} />
          <Route path='/edit/:userId' element={<UsersForm />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
