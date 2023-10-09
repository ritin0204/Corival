import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Header from './Header';
import Footer from './Footer';
import Home from './Home';
import Login from './AuthComponents/Login';
import CandidateSignup from './AuthComponents/CandidateSignup';
import RecruiterSignup from './AuthComponents/RecruiterSignup';
import Profile from './Profile/Profile';
import { Container } from 'reactstrap';

// Practice
import PracticePage from './PracticeComponent/Practice';
import PracticeDetails from './PracticeComponent/PracticeDetails';
import PracticeQuiz from './PracticeComponent/PracticeQuiz';
import PracticeResult from './PracticeComponent/PracticeResult';

// Contests
import ContestPage from './ContestComponents/ContestPage';
import ContestDetails from './ContestComponents/ContestDetails';
import ContestResult from './ContestComponents/ContestResult';
import ContestQuiz from './ContestComponents/ContestQuiz';

import Error from './UtilsComponents/Error';
import { useEffect, useState } from 'react';
import { getCurrentUser } from '../requests';
import SignUp from './AuthComponents/SignUp';


function App() {
  const [user, setUser] = useState(null);
  useEffect(() => {
      let response = getCurrentUser();
      response.then((data) => {
          setUser(data);
      });
  }, []);
  
  return (
    <div className="App">
      <BrowserRouter>
        <Header user={user}/>
        <Container>
          <Routes>
            <Route path="/" element={<Home />} />

            {/* Auth */}
            <Route path="/login" element={<Login />} />
            <Route path="/profile" element={<Profile/>} />
            <Route path='/register' element={<SignUp/>} />
            <Route path="/candidates/register" element={<CandidateSignup />} />
            <Route path="/recruiters/register" element={<RecruiterSignup />} />

            {/* Practice */}
            <Route path="/practice" element={<PracticePage/>} />
            <Route path="/practice/:id" element={<PracticeDetails/>} />
            <Route path="/practice/quiz/:id" element={<PracticeQuiz/>} />
            <Route path="/practice/:id/results" element={<PracticeResult/>} />

            {/* Competitions */}
            <Route path="/contests" element={<ContestPage />} />
            <Route path="/contest/:id" element={<ContestDetails />} />
            <Route path="/contest/:id/quiz/" element={<ContestQuiz />} />
            <Route path="/contest/:id/results" element={ <ContestDetails/>} />
            <Route path="/contest/:id/results/:user" element={<ContestResult />} />
            
            {/* 404 */}
            <Route path="/*" element={<Error status_code="404" message="Not Found!" />} />
          </Routes>
        </Container>
        <Footer/>
      </BrowserRouter>
    </div>
  );
};


export default App;