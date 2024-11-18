import React from 'react';
import { IonPage, IonHeader, IonToolbar, IonTitle, IonContent, IonButtons, IonMenuButton } from '@ionic/react';

const MyProfile: React.FC = () => (
  <IonPage>
    <IonHeader>
      <IonToolbar>
      <IonButtons slot='start'>
          <IonMenuButton />
        </IonButtons >
        <IonTitle>MyProfile</IonTitle>
      </IonToolbar>
    </IonHeader>
    <IonContent>
      <h1>MyProfile Page</h1>
    </IonContent>
  </IonPage>
);

export default MyProfile;
