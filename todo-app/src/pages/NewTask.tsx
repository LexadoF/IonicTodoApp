import React from 'react';
import { IonPage, IonHeader, IonToolbar, IonTitle, IonContent, IonButtons, IonMenuButton } from '@ionic/react';

const NewTask: React.FC = () => (
  <IonPage>
    <IonHeader>
      <IonToolbar>
        <IonButtons slot='start'>
          <IonMenuButton />
        </IonButtons >
        <IonTitle>NewTask</IonTitle>
      </IonToolbar>
    </IonHeader>
    <IonContent>
      <h1>NewTask Page</h1>
    </IonContent>
  </IonPage>
);

export default NewTask;
