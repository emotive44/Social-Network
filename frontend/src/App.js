import React from 'react';
import { BrowserRouter as Router, Route, Switch} from 'react-router-dom';

import NavBar from './components/common/Navbar';

const App = () => {
  return (
    <Router>
      <NavBar />
    </Router>
  );
}

export default App;
