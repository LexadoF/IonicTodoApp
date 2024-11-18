import React from 'react';
import { IonPage, IonHeader, IonToolbar, IonTitle, IonContent, IonButtons, IonMenuButton } from '@ionic/react';

const Tasks: React.FC = () => (
  <IonPage>
    <IonHeader>
      <IonToolbar>
        <IonButtons slot='start'>
          <IonMenuButton />
        </IonButtons >
        <IonTitle>Tasks</IonTitle>
      </IonToolbar>
    </IonHeader>
    <IonContent>
      <h1>Tasks Page</h1>
    </IonContent>
  </IonPage>
);

export default Tasks;
