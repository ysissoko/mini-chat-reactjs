import './App.css';
import Chat from './pages/Chat';
import Login from './pages/Login'
import {
  BrowserRouter as Router,
  Switch,
  Route
} from "react-router-dom";
import {SocketContext, socket} from './contexts/socket';

function App() {
  return (
    <SocketContext.Provider value={socket}>
        {/* A <Switch> looks through its children <Route>s and
            renders the first one that matches the current URL. */}
            <Router>
              <Switch>
                <Route path="/chat" component={Chat}/>
                <Route exact path="/" component={Login}/>
              </Switch>
            </Router>
    </SocketContext.Provider>
  );
}

export default App;
