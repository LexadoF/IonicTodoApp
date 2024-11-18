import React from 'react';
import { IonPage, IonHeader, IonToolbar, IonTitle, IonContent, IonMenuButton, IonButtons } from '@ionic/react';

const CreateAccount: React.FC = () => (
  <IonPage>
    <IonHeader>
      <IonToolbar>
        <IonButtons slot='start'>
          <IonMenuButton />
        </IonButtons >
        <IonTitle>CreateAccount</IonTitle>
      </IonToolbar>
    </IonHeader>
    <IonContent>
      <h1>CreateAccount Page</h1>
    </IonContent>
  </IonPage>
);

export default CreateAccount;
