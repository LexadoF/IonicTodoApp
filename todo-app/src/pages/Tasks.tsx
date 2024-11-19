import React from 'react';
import { IonPage, IonHeader, IonToolbar, IonTitle, IonContent, IonButtons, IonMenuButton, IonCol, IonGrid, IonRow, IonButton } from '@ionic/react';
import jsonData from '../data.json';
import './Tasks.css'; // Import the CSS file
import { useHistory } from 'react-router';

const Tasks: React.FC = () => {
  const tasks = jsonData.tasks;
  const history = useHistory();

  const categorizePriority = (priorityToCategorize: string) => {
    switch (priorityToCategorize) {
      case 'High':
        return 'Alta';
      case 'Medium':
        return 'Media';
      case 'Low':
        return 'Baja';
      default:
        break;
    }
  }

  const handleNewTask = () => {
    history.push('/new-task');
  };
  const handleCalendar = () => {
    history.push('/calendar');
  };

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonButtons slot="start">
            <IonMenuButton />
          </IonButtons>
          <IonTitle>Tasks</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent>
        <div className="page-wrapper tasks-wrapper">
          <h1>Tareas</h1>

          <div className="container-buttons">
            <IonButton expand="block" onClick={handleCalendar} className="view-calendar-button btn_primary_custom reduced_width_btn">Ver calendario</IonButton>
            <IonButton expand="block" onClick={handleNewTask} className="new-task-button btn_primary_custom reduced_width_btn">Nueva tarea</IonButton>
          </div>

          <IonGrid>
            <IonRow className="table-header">
              <IonCol><strong>Título</strong></IonCol>
              <IonCol><strong>Descripción</strong></IonCol>
              <IonCol><strong>Fecha límite</strong></IonCol>
              <IonCol><strong>Prioridad</strong></IonCol>
              <IonCol><strong>¿Completado?</strong></IonCol>
            </IonRow>

            {tasks.map((task) => (
              <IonRow key={task.id} className="table-row">
                <IonCol>{task.title}</IonCol>
                <IonCol>{task.description}</IonCol>
                <IonCol>{task.due_date}</IonCol>
                <IonCol>{categorizePriority(task.priority)}</IonCol>
                <IonCol>{task.completed ? "Sí" : "No"}</IonCol>
              </IonRow>
            ))}
          </IonGrid>
        </div>
      </IonContent>
    </IonPage>
  );
};

export default Tasks;
