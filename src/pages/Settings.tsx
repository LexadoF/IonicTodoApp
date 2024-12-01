import React, { useEffect, useState } from 'react';
import { IonPage, IonHeader, IonToolbar, IonTitle, IonContent, IonButtons, IonMenuButton, IonButton, IonInput, IonToggle, IonSelect, IonSelectOption, IonCheckbox, useIonAlert } from '@ionic/react';
import data from '../data.json';
import { Preferences } from '@capacitor/preferences';
import { Filesystem, Directory, Encoding } from '@capacitor/filesystem';
const FILE_NAME = 'data.json';

const Settings: React.FC = () => {
    const [presentAlert] = useIonAlert();
    const [settings, setSettings] = useState<any[]>([]);
    const [currentUserId, setCurrentUserId] = useState<string>('');
    const [allowNots, setAllowNots] = useState<boolean>(false);
    const [RecordType, setRecordType] = useState<string>('');
    const [isSync, setIsSync] = useState<boolean>(false);

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
        const loadSettings = async () => {
            try {
                const file = await Filesystem.readFile({
                    path: FILE_NAME,
                    directory: Directory.Documents,
                    encoding: Encoding.UTF8,
                });
                const allSettings = JSON.parse(file.data as string).settings || [];
                const cuSettings = allSettings.filter((setting: any) => setting.user_id === parseInt(currentUserId, 10));
                setSettings(cuSettings);
            } catch (error) {
                console.error('Error reading file:', error);
                setSettings([]);
            }
        };

        loadSettings();
    }, [currentUserId]);

    const handleSave = async () => {
        const newSetting = {
            id: settings.length + 1,
            allow_notifications: allowNots,
            notification_type: `${RecordType}` || 'noisy',
            sync_between_devices: isSync,
            user_id: parseInt(currentUserId, 10),

        }
        const updatedStettings = [...settings, newSetting];
        try {
            await Filesystem.writeFile({
                path: FILE_NAME,
                directory: Directory.Documents,
                data: JSON.stringify({ tasks: updatedStettings }),
                encoding: Encoding.UTF8,
            });

            setSettings(updatedStettings);
            presentAlert({
                header: 'Éxito',
                message: 'Has modificado tus configuraciones.',
                buttons: [
                    {
                        text: 'OK',
                    },
                ],
            });
        } catch (error) {
            console.error('Error writing file:', error);
            presentAlert({
                header: 'Error',
                buttons: ['OK'],
            });
        }
    };

    console.log(settings)
    return (
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
                        <IonToggle labelPlacement="end" onIonChange={(e) => setAllowNots(e.detail.checked)} ><p>Recibir notificaciones</p></IonToggle>

                        <IonSelect onIonChange={(e) => setRecordType(e.detail.value)} label="Tipo de recordatorio" placeholder="Tipo de recordatorio">
                            <IonSelectOption value="silent">Notificar</IonSelectOption>
                            <IonSelectOption value="noisy">Sonar</IonSelectOption>
                        </IonSelect>

                        <h3>Sincronización</h3>
                        <IonCheckbox labelPlacement="end" onIonChange={(e) => setIsSync(e.detail.checked)}>Sincronizar entre dispositivos</IonCheckbox>

                        <h3>Privacidad</h3>
                        <IonButton expand="block" className="change-pass-button btn_primary_custom">Cambiar mi clave</IonButton>
                        <IonButton expand="block" className="mfa-button btn_primary_custom">Autenticación de dos factores</IonButton>
                        <hr />
                        <IonButton expand="block" onClick={handleSave} className="save-button btn_primary_custom">Guardar</IonButton>
                    </div>
                </div>
            </IonContent>
        </IonPage>
    );
}

export default Settings;
