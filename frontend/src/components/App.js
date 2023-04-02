import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Header from './Header';
import Home from './Home';
import Login from './Login';
import {RecruiterSignup, CandidateSignup} from './Signup';
import { Container } from 'reactstrap';


const NotFound = () => {
  return (
    <div>
      <h1>404</h1>
      <h2>Page Not Found</h2>
    </div>
  );
};


const Competitions = () => {
  return (
    <div>
      <h1>Competitions</h1>
    </div>
  );
};

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Header />
        <Container>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/login" element={<Login />} />
            <Route path="/candidates/register" element={<CandidateSignup />} />
            <Route path="/recruiters/register" element={<RecruiterSignup />} />
            <Route path="/compete" element={<Competitions/>} />
            <Route path="/*" element={<NotFound />} />
          </Routes>
        </Container>
      </BrowserRouter>
    </div>
  );
};


export default App;