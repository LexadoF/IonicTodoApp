import React from 'react';
import { IonPage, IonHeader, IonToolbar, IonTitle, IonContent, IonButtons, IonMenuButton, IonButton, IonInput, IonToggle, IonSelect, IonSelectOption, IonCheckbox } from '@ionic/react';

const Settings: React.FC = () => (
    <IonPage>
        <IonHeader>
            <IonToolbar>
                <IonButtons slot='start'>
                    <IonMenuButton />
                </IonButtons >
                <IonTitle>Ajustes</IonTitle>
            </IonToolbar>
        </IonHeader>
        <IonContent>
            <div className="page-wrapper">
                <div className="page-form">
                    <h2>Ajustes</h2>
                    <h3>Notificaciones</h3>
                    <IonToggle labelPlacement="end"><p>Recibir notificaciones</p></IonToggle>

                    <IonSelect label="Tipo de recordatorio" placeholder="Tipo de recordatorio">
                        <IonSelectOption value="silent">Notificar</IonSelectOption>
                        <IonSelectOption value="noisy">Sonar</IonSelectOption>
                    </IonSelect>

                    <h3>Sincronización</h3>
                    <IonCheckbox labelPlacement="end">Sincronizar entre dispositivos</IonCheckbox>

                    <h3>Privacidad</h3>
                    <IonButton expand="block" className="change-pass-button btn_primary_custom">Cambiar mi clave</IonButton>
                    <IonButton expand="block" className="mfa-button btn_primary_custom">Autenticación de dos factores</IonButton>
                    <hr />
                    <IonButton expand="block" className="save-button btn_primary_custom">Guardar</IonButton>
                </div>
            </div>
        </IonContent>
    </IonPage>
);

export default Settings;
