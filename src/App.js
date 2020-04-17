import React from 'react';
import { BrowserRouter as Router, Route} from 'react-router-dom';

// import AuthChecker from './loading/authCheck'
import Auth from './auth/auth'
import Home from './home/home';
import Massenger from './home/massegenger/masenger'
import Messenger from './home/massegenger/index'
import Loading from './loading/loading'

import { Provider } from 'react-redux'
import store from './redux/store'
import { Paper } from '@material-ui/core';


function App() {

  return (
    <div className="App">
      <Provider store={store}>
       
        <Router>

          {/* <Route exact path="/authChecker" component={AuthChecker} /> */}

          <Route exact path="/test" component={Loading} />
          <Route exact path="/auth" component={Auth} />
          <Route exact path="/" component={Home} />
          {/* <Route exact path="/" component={Navigation} /> */}


        </Router>
      </Provider>

    </div>
  );
}

export default App;
