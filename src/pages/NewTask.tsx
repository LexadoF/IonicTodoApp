import React, { useEffect, useState } from 'react';
import { IonPage, IonHeader, IonToolbar, IonTitle, IonContent, IonButtons, IonMenuButton, IonButton, IonInput, IonTextarea, IonSelect, IonSelectOption, IonIcon, useIonAlert } from '@ionic/react';
import { useHistory } from 'react-router';
import { arrowBack } from 'ionicons/icons';
import { Directory, Encoding, Filesystem } from '@capacitor/filesystem';
import { Preferences } from '@capacitor/preferences';
const FILE_NAME = 'data.json';

const NewTask: React.FC = () => {
    const history = useHistory();
    const [presentAlert] = useIonAlert();
    const [tasks, setTasks] = useState<any[]>([]);
    const [title, setTitle] = useState<string>('');
    const [desc, setDesc] = useState<string>('');
    const [date, setDate] = useState<string>('');
    const [priority, setPriority] = useState<string>('');
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
                setTasks(JSON.parse(file.data as string).tasks || []);
            } catch (error) {
                console.error('Error reading file:', error);
                setTasks([]);
            }
        };

        loadTasks();
    }, []);

    const handleSave = async () => {

        if (!title.trim() || !desc.trim() || !date.trim() || !priority.trim()) {
            presentAlert({
                header: 'Error',
                message: 'Por favor complete todos los campos.',
                buttons: ['OK'],
            });
            return;
        }
        const newTask = {
            id: tasks.length + 1,
            title: `${title}`,
            description: `${desc}`,
            due_date: `${date}`,
            priority: `${priority}`,
            user_id: parseInt(currentUserId, 10),
            completed: false,
        }
        const updatedTasks = [...tasks, newTask];
        try {
            await Filesystem.writeFile({
                path: FILE_NAME,
                directory: Directory.Documents,
                data: JSON.stringify({ tasks: updatedTasks }),
                encoding: Encoding.UTF8,
            });

            setTasks(updatedTasks);

            presentAlert({
                header: 'Éxito',
                message: 'Tarea creada exitosamente.',
                buttons: [
                    {
                        text: 'OK',
                        handler: () => history.push('/tasks'),
                    },
                ],
            });
        } catch (error) {
            console.error('Error writing file:', error);
            presentAlert({
                header: 'Error',
                message: 'No se pudo crear la tarea. Intente nuevamente.',
                buttons: ['OK'],
            });
        }
    };

    const navigateToTasks = () => {
        history.push('/tasks');
    };

    return (
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
                        <div className="header-divisor" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                            <IonButton fill="clear" className="back-arrow" onClick={navigateToTasks}>
                                <IonIcon icon={arrowBack} slot="icon-only" />
                            </IonButton>
                            <h2>Nueva tarea</h2>
                        </div>
                        <label htmlFor="title">Titulo</label>
                        <IonInput type="text" onIonChange={(e) => setTitle(e.detail.value as string)} id="title" placeholder="Titulo" className="input-field" />

                        <label htmlFor="description">Descripción</label>
                        <IonTextarea id="description" onIonChange={(e) => setDesc(e.detail.value as string)} placeholder="Ingrese descripción" className="input-field" />

                        <label htmlFor="date">Fecha</label>
                        <IonInput type="date" id="date" onIonChange={(e) => setDate(e.detail.value as string)} placeholder="Ingrese fecha" />

                        <label htmlFor="priority">Prioridad</label>
                        <IonSelect label="Selecciona una prioridad" onIonChange={(e) => setPriority(e.detail.value as string)} placeholder="Prioridad">
                            <IonSelectOption value="High">Alta</IonSelectOption>
                            <IonSelectOption value="Medium">Media</IonSelectOption>
                            <IonSelectOption value="Low">Baja</IonSelectOption>
                        </IonSelect>

                        <IonButton expand="block" onClick={handleSave} className="continue-register-button btn_primary_custom">Guardar</IonButton>
                    </div>
                </div>
            </IonContent>
        </IonPage>
    );
}

export default NewTask;
