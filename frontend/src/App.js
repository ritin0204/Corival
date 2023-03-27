import './App.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Header from './components/Header';
import Home from './components/Home';
import { Container } from 'reactstrap';


function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Header />
        <Container>
          <Routes>
            <Route path="/" element={<Home />} />
            {/* <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} /> */}
          </Routes>
        </Container>
      </BrowserRouter>
    </div>
  );
}

export default App;
