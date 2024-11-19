import React from 'react';
import { IonPage, IonHeader, IonToolbar, IonTitle, IonContent, IonButtons, IonMenuButton, IonButton, IonInput, IonTextarea, IonSelect, IonSelectOption } from '@ionic/react';

const NewTask: React.FC = () => (
  <IonPage>
    <IonHeader>
      <IonToolbar>
        <IonButtons slot='start'>
          <IonMenuButton />
        </IonButtons >
        <IonTitle>Nueva tarea</IonTitle>
      </IonToolbar>
    </IonHeader>
    <IonContent>
      <div className="page-wrapper">
        <div className="page-form">
          <h2>Nueva tarea</h2>
          <label htmlFor="title">Titulo</label>
          <IonInput type="text" id="title" placeholder="Titulo" className="input-field" />

          <label htmlFor="description">Descripción</label>
          <IonTextarea id="description" placeholder="Ingrese su correo" className="input-field" />

          <label htmlFor="date">Fecha</label>
          <IonInput type="date" id="date" placeholder="Ingrese su correo" />

          <label htmlFor="priority">Prioridad</label>
          <IonSelect label="Selecciona una prioridad" placeholder="Prioridad">
            <IonSelectOption value="high">Alta</IonSelectOption>
            <IonSelectOption value="medium">Media</IonSelectOption>
            <IonSelectOption value="low">Baja</IonSelectOption>
          </IonSelect>

          <IonButton expand="block" className="continue-register-button btn_primary_custom">Guardar</IonButton>
        </div>
      </div>
    </IonContent>
  </IonPage>
);

export default NewTask;
