import React from 'react';
import { BrowserRouter as Router, Route} from 'react-router-dom';

import AppBar from './appbar/appbar'
// import AuthChecker from './loading/authCheck'
import Auth from './auth/auth'
import Home from './home/home';
import Massenger from './home/massegenger/masenger'
import Messenger from './home/massegenger/index'

import { Provider } from 'react-redux'
import store from './redux/store'


function App() {

  return (
    <div className="App">
      <Provider store={store}>
        {/* <AppBar /> */}
        <Router>

          {/* <Route exact path="/authChecker" component={AuthChecker} /> */}

          <Route exact path="/test" component={Messenger} />
          <Route exact path="/auth" component={Auth} />
          <Route exact path="/" component={Home} />
          {/* <Route exact path="/" component={Navigation} /> */}


        </Router>
      </Provider>

    </div>
  );
}

export default App;
