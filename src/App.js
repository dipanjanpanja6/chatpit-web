import React from "react"
import { BrowserRouter as Router, Route } from "react-router-dom"
// import AuthChecker from './loading/authCheck'
import { Provider } from "react-redux"
import Auth from "./auth/auth"
import DashboardLayout from "./Layouts/DashboardLayout"
import messenger from "./messenger/main"
import store from "./redux/store"

function App() {
  return (
    <div style={{ background: localStorage.bgColor ? localStorage.bgColor : "linear-gradient( 0deg, #d3ebff, #f0f8ff 20%)" }} className="Apphead">
      <Provider store={store}>
        <Router>
          {/* <Route exact path="/authChecker" component={AuthChecker} /> */}

          <Route exact path="/test" component={messenger} />
          <Route exact path="/auth" component={Auth} />
          <Route exact path="/" component={DashboardLayout} />
          {/* <Route exact path="/" component={Navigation} /> */}
          {/* <Route exact path="/sitemap" component={Sitemap} /> */}
        </Router>
      </Provider>
    </div>
  )
}

export default App
