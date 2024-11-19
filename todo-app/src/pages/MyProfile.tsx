import React from 'react';
import { IonPage, IonHeader, IonToolbar, IonTitle, IonContent, IonButtons, IonMenuButton, IonButton, IonInput, IonText, IonAvatar } from '@ionic/react';
import jsonData from '../data.json';

const MyProfile: React.FC = () => {

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonButtons slot='start'>
            <IonMenuButton />
          </IonButtons >
        </IonToolbar>
      </IonHeader>
      <IonContent>
        <div className="page-wrapper">
          <div className="login-form">
            <h2>Mi perfil</h2>
            <IonAvatar>
              <img src={jsonData.users[0].picture} alt="User Avatar" />
            </IonAvatar>
            <label htmlFor="user">Uusario</label>
            <IonInput type="text" id="user" placeholder="usuario" value={jsonData.users[0].username} className="input-field"/>

            <label htmlFor="email">Correo</label>
            <IonInput type="email" id="email" placeholder="Correo" value={jsonData.users[0].email} className="input-field"/>

            <IonButton expand="block" className="login-button btn_primary_custom">Editar perfil</IonButton>

          </div>
        </div>
      </IonContent>
    </IonPage>
  );
}

export default MyProfile;
