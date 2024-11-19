import React, { useState } from 'react';
import {
  IonPage,
  IonHeader,
  IonToolbar,
  IonContent,
  IonButtons,
  IonMenuButton,
  IonButton,
  IonGrid,
  IonRow,
  IonCol,
  IonDatetime,
  IonText,
  IonTitle,
  IonInput,
  IonModal,
  IonIcon
} from '@ionic/react';
import { calendarOutline } from 'ionicons/icons';

import './reports.css';

const Reports: React.FC = () => {
  const [selectedDate, setSelectedDate] = useState<string | any>('2024-11-04');
  const [showDatePicker, setShowDatePicker] = useState<boolean>(false);

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonButtons slot='start'>
            <IonMenuButton />
          </IonButtons >
          <IonTitle>Reportes de productividad</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent className="ion-padding">
        <div className="page-wrapper reports-wrapper">

          <h2>Informes</h2>
          <IonGrid>
            <IonRow>
              <IonCol size="12" className="ion-text-center">
                <div className="date-input-wrapper">
                  <IonInput
                    value={selectedDate}
                    readonly
                    onClick={() => setShowDatePicker(true)}
                    className="date-input"
                  />
                  <IonButton fill="clear" onClick={() => setShowDatePicker(true)}>
                    <IonIcon slot="start" ios={calendarOutline} md={calendarOutline} />
                  </IonButton>
                </div>
                <IonModal isOpen={showDatePicker} onDidDismiss={() => setShowDatePicker(false)}>
                  <div className="centered-modal-content">
                    <IonDatetime
                      presentation="date"
                      multiple={false}
                      value={selectedDate}
                      onIonChange={e => {
                        setSelectedDate(e.detail.value!);
                        setShowDatePicker(false);
                      }}
                    />
                  </div>
                </IonModal>
              </IonCol>
            </IonRow>
            <IonRow>
              <IonCol className="ion-text-center">
                <IonText>
                  Semana actual
                </IonText>
                <div>
                  <svg width="100" height="100">
                    <circle
                      cx="50"
                      cy="50"
                      r="40"
                      stroke="green"
                      strokeWidth="5"
                      fill="none"
                      strokeDasharray="251"
                      strokeDashoffset="90"
                      transform="rotate(-90 50 50)"
                    />
                    <text x="50%" y="50%" textAnchor="middle" dy=".3em" fontSize="20">
                      64%
                    </text>
                  </svg>
                </div>
              </IonCol>
              <IonCol className="ion-text-center">
                <IonText>
                  Semana anterior
                </IonText>
                <div>
                  <svg width="100" height="100">
                    <circle
                      cx="50"
                      cy="50"
                      r="40"
                      stroke="red"
                      strokeWidth="5"
                      fill="none"
                      strokeDasharray="251"
                      strokeDashoffset="150"
                      transform="rotate(-90 50 50)"
                    />
                    <text x="50%" y="50%" textAnchor="middle" dy=".3em" fontSize="20">
                      40%
                    </text>
                  </svg>
                </div>
              </IonCol>
              <IonCol className="ion-text-center">
                <IonText>
                  Último mes
                </IonText>
                <div>
                  <svg width="100" height="100">
                    <circle
                      cx="50"
                      cy="50"
                      r="40"
                      stroke="blue"
                      strokeWidth="5"
                      fill="none"
                      strokeDasharray="251"
                      strokeDashoffset="25"
                      transform="rotate(-90 50 50)"
                    />
                    <text x="50%" y="50%" textAnchor="middle" dy=".3em" fontSize="20">
                      90%
                    </text>
                  </svg>
                </div>
              </IonCol>
            </IonRow>
            <IonRow>
              <IonCol>
                Promedio de tiempo
                <div className="svg-container">
                  <p>5h 20m</p>
                </div>
              </IonCol>
              <IonCol>
                Tareas completadas
                <div className="svg-container">
                  <p>12</p>
                </div>
              </IonCol>
            </IonRow>
          </IonGrid>
        </div>
      </IonContent>
    </IonPage>
  );
}

export default Reports;
