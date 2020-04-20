import React from 'react';
import { BrowserRouter as Router, Route} from 'react-router-dom';

// import AuthChecker from './loading/authCheck'
import Auth from './auth/auth'
import Appbar from './appBar/appbar'

import { Provider } from 'react-redux'
import store from './redux/store'
// import { Paper } from '@material-ui/core';
import sceleton from './component/posts/sceleton'
import wel from './auth/login_page_slide'
import messenger from './home/massegenger/masenger'
import messengerl from './messenger/main'

function App() {

  return (
    
    <div className="App">
      <Provider store={store}>
       
        <Router>

          {/* <Route exact path="/authChecker" component={AuthChecker} /> */}

          <Route exact path="/testl" component={messengerl} />
          <Route exact path="/test" component={messenger} />
          <Route exact path="/auth" component={Auth} />
          <Route exact path="/" component={Appbar} />
          {/* <Route exact path="/" component={Navigation} /> */}


        </Router>
      </Provider>

    </div>
  );
}

export default App;
