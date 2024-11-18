import React from 'react';
import { IonPage, IonHeader, IonToolbar, IonTitle, IonContent, IonSplitPane } from '@ionic/react';

const Login: React.FC = () => (
  <IonSplitPane contentId="main">
    <IonPage id="main">
      <IonHeader>
        <IonToolbar>
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
