import React from 'react';
import { IonPage, IonHeader, IonToolbar, IonTitle, IonContent, IonSplitPane, IonButtons, IonMenuButton } from '@ionic/react';
import Menu from '../components/Menu';

const Login: React.FC = () => (
  <IonSplitPane contentId="main">
    <IonPage id="main">
      <IonHeader>
        <IonToolbar>
          <IonButtons slot='start'>
          <IonMenuButton />
          </IonButtons >
          <IonTitle>Login</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent>
        <h1>Login Page</h1>
      </IonContent>
    </IonPage>
  </IonSplitPane>
);

export default Login;
