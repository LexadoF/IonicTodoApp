import React, { useEffect, useState } from 'react';
import { IonPage, IonHeader, IonToolbar, IonTitle, IonContent, IonButtons, IonMenuButton, IonCol, IonGrid, IonRow, IonButton } from '@ionic/react';
import { useHistory } from 'react-router';
import jsonData from '../data.json';
import './Tasks.css';
import { Filesystem, Directory, Encoding } from '@capacitor/filesystem';
import { Preferences } from '@capacitor/preferences';
const FILE_NAME = 'data.json';

const Tasks: React.FC = () => {
    const history = useHistory();
    const [tasks, setTasks] = useState<any[]>([]);
    const [currentUserId, setCurrentUserId] = useState<string>('');

    const getLoggedInUserId = async () => {
        try {
            const { value } = await Preferences.get({ key: 'loggedInUserId' });
            return value;
        } catch (error) {
            console.error('Error retrieving user ID:', error);
            return null;
        }
    };
    useEffect(() => {
        const fetchCurrentUser = async () => {
            try {
                const userId = await getLoggedInUserId();
                if (userId) {
                    setCurrentUserId(userId);
                } else {
                    console.log('No user is logged in.');
                }
            } catch (error) {
                console.error('Error fetching current user:', error);
            }
        };

        fetchCurrentUser();
    }, []);

    useEffect(() => {
        const loadTasks = async () => {
            try {
                const file = await Filesystem.readFile({
                    path: FILE_NAME,
                    directory: Directory.Documents,
                    encoding: Encoding.UTF8,
                });
                const allTasks = JSON.parse(file.data as string).tasks || [];
                const cuTasks = allTasks.filter((task: any) => task.user_id === parseInt(currentUserId, 10));
                setTasks(cuTasks);
            } catch (error) {
                console.error('Error reading file:', error);
                setTasks([]);
            }
        };

        loadTasks();
    }, [currentUserId]);

    // console.log(tasks, currentUserId)

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
