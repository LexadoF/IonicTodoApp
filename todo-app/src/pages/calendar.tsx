import React from 'react';
import { IonPage, IonHeader, IonToolbar, IonTitle, IonContent, IonButtons, IonMenuButton } from '@ionic/react';

const Calendar: React.FC = () => (
  <IonPage>
    <IonHeader>
      <IonToolbar>
        <IonButtons slot='start'>
          <IonMenuButton />
        </IonButtons >
        <IonTitle>Calendar</IonTitle>
      </IonToolbar>
    </IonHeader>
    <IonContent>
      <h1>Calendar Page</h1>
    </IonContent>
  </IonPage>
);

export default Calendar;
