import React from 'react';
import { BrowserRouter as Router, Route} from 'react-router-dom';

// import AuthChecker from './loading/authCheck'
import Auth from './auth/auth'
import Appbar from './appBar/appbar'

import { Provider } from 'react-redux'
import store from './redux/store'
// import { Paper } from '@material-ui/core';
import messenger from './messenger/main'

function App() {

  
  return (
    
    <div style={{background:localStorage.bgColor ? localStorage.bgColor : 'linear-gradient( 0deg, #d3ebff, #f0f8ff 20%)' }}  className="Apphead">
      <Provider store={store}>
       
        <Router>

          {/* <Route exact path="/authChecker" component={AuthChecker} /> */}

          <Route exact path="/test" component={messenger} />
          <Route exact path="/auth" component={Auth} />
          <Route exact path="/" component={Appbar} />
          {/* <Route exact path="/" component={Navigation} /> */}
          {/* <Route exact path="/sitemap" component={Sitemap} /> */}


        </Router>
      </Provider>

    </div>
  );
}

export default App;
