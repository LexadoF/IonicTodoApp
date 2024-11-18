import { IonApp, IonRouterOutlet, IonSplitPane, setupIonicReact } from '@ionic/react';
import { IonReactRouter } from '@ionic/react-router';
import { Redirect, Route } from 'react-router-dom';
import Menu from './components/Menu';

/* Core CSS required for Ionic components to work properly */
import '@ionic/react/css/core.css';

/* Basic CSS for apps built with Ionic */
import '@ionic/react/css/normalize.css';
import '@ionic/react/css/structure.css';
import '@ionic/react/css/typography.css';

/* Optional CSS utils that can be commented out */
import '@ionic/react/css/padding.css';
import '@ionic/react/css/float-elements.css';
import '@ionic/react/css/text-alignment.css';
import '@ionic/react/css/text-transformation.css';
import '@ionic/react/css/flex-utils.css';
import '@ionic/react/css/display.css';

/**
 * Ionic Dark Mode
 * -----------------------------------------------------
 * For more info, please see:
 * https://ionicframework.com/docs/theming/dark-mode
 */

/* import '@ionic/react/css/palettes/dark.always.css'; */
/* import '@ionic/react/css/palettes/dark.class.css'; */
import '@ionic/react/css/palettes/dark.system.css';

/* Theme variables */
import './theme/variables.css';
import Login from './pages/Login';
import CreateAccount from './pages/CreateAccount';
import MyProfile from './pages/MyProfile';
import Reports from './pages/Reports';
import Calendar from './pages/calendar';
import NewTask from './pages/NewTask';
import Settings from './pages/Settings';
import Tasks from './pages/Tasks';

setupIonicReact();

const App: React.FC = () => {
  return (
    <IonApp>
      <IonReactRouter>
        <IonSplitPane contentId="main">
          <Menu />
          <IonRouterOutlet id="main">
            <Route path="/login" component={Login}></Route>
            <Route path="/create-account" component={CreateAccount}></Route>
            <Route path="/profile" component={MyProfile}></Route>
            <Route path="/reports" component={Reports}></Route>
            <Route path="/tasks" component={Tasks}></Route>
            <Route path="/calendar" component={Calendar}></Route>
            <Route path="/new-task" component={NewTask}></Route>
            <Route path="/settings" component={Settings}></Route>
            <Redirect exact from="/" to="/login" />
          </IonRouterOutlet>
        </IonSplitPane>
      </IonReactRouter>
    </IonApp>
  );
};

export default App;
