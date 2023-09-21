import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import QrCode from './QrCode';
import { Container } from '@mui/material';


function App() {
  return (
    <><Container >
      <Router>
        <Link to="/" style={{ textDecoration: 'none', color: 'white' }}></Link>
        <Routes>
          <Route exact path='/' element={<QrCode />}></Route>
        </Routes>
      </Router>
    </Container>
    </>
  );
}

export default App;
