import React from 'react';
import { BrowserRouter as Router, Route} from 'react-router-dom';

// import AuthChecker from './loading/authCheck'
import Auth from './auth/auth'
import Appbar from './appBar/appbar'
import Sitemap from './sitemap.xml'

import { Provider } from 'react-redux'
import store from './redux/store'
// import { Paper } from '@material-ui/core';
import sceleton from './component/posts/sceleton'
import messenger from './component/message/SoutBox'

function App() {
  
  const d = localStorage.getItem('chat_mode');
  const theme = JSON.parse(d);
  return (
    
    <div style={{background:theme.bgColor ? theme.bgColor : 'linear-gradient( 0deg, #d3ebff, #f0f8ff 20%)' }}  className="Apphead">
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
