import { Route, Switch } from 'react-router-dom';
import { ROUTES } from './consts/index.js';
import Nav from './components/Nav.js';
import Home from './pages/Home.js';
import About from './pages/About.js';
import Presets from './pages/Presets.js';
import Advanced from './pages/Advanced.js';
import styles from './css/app.module.css';
 
const App = () => {
  return (
    <div className={styles.app}>
      <Nav/>
      <Switch>
        <Route path={ROUTES.ABOUT}>
          <About/>
        </Route>

        <Route path={ROUTES.PRESETS}>
          <Presets/>
        </Route>

        <Route path={ROUTES.ADVANCED}>
          <Advanced/>
        </Route>

        <Route path={ROUTES.HOME}>
          <Home/>
        </Route>
      </Switch>
    </div>
  )
}

export default App;