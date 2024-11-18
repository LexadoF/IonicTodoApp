import React from 'react';
import { IonPage, IonHeader, IonToolbar, IonTitle, IonContent, IonButtons, IonMenuButton } from '@ionic/react';

const Reports: React.FC = () => (
  <IonPage>
    <IonHeader>
      <IonToolbar>
        <IonButtons slot='start'>
          <IonMenuButton />
        </IonButtons >
        <IonTitle>Reports</IonTitle>
      </IonToolbar>
    </IonHeader>
    <IonContent>
      <h1>Reports Page</h1>
    </IonContent>
  </IonPage>
);

export default Reports;
