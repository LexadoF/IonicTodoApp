import React, { useEffect, useState } from 'react';
import { IonPage, IonHeader, IonToolbar, IonContent, IonButtons, IonMenuButton, IonButton, IonInput, IonAvatar } from '@ionic/react';
import jsonData from '../data.json';
import { Preferences } from '@capacitor/preferences';
import { Filesystem, Directory, Encoding } from '@capacitor/filesystem';
const FILE_NAME = 'data.json';

const MyProfile: React.FC = () => {
    const [users, setUsers] = useState<any[]>([]);
    const [currentUser, setCurrentUser] = useState<any | null>(null);
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
        const loadUsers = async () => {
            try {
                const file = await Filesystem.readFile({
                    path: FILE_NAME,
                    directory: Directory.Documents,
                    encoding: Encoding.UTF8,
                });
                const parsedData = JSON.parse(file.data as string);
                setUsers(parsedData.users || []);
            } catch (error) {
                console.error('Error reading file:', error);
                setUsers([]);
            }
        };

        loadUsers();
    }, []);

    useEffect(() => {
        const fetchCurrentUser = async () => {
            try {
                const userId = await getLoggedInUserId();
                if (userId) {
                    const user = users.find((user) => user.id === parseInt(userId, 10));
                    setCurrentUser(user);
                } else {
                    console.log('No user is logged in.');
                }
            } catch (error) {
                console.error('Error fetching current user:', error);
            }
        };

        if (users.length > 0) {
            fetchCurrentUser();
        }
    }, [users]);

    const handleInputChange = (key: string, value: string) => {
        if (currentUser) {
            setCurrentUser({ ...currentUser, [key]: value });
        }
    };

    const saveProfile = async () => {
        if (currentUser) {
            const updatedUsers = users.map((user) =>
                user.id === currentUser.id ? currentUser : user
            );
            setUsers(updatedUsers);

            try {
                await Filesystem.writeFile({
                    path: FILE_NAME,
                    directory: Directory.Documents,
                    data: JSON.stringify({ users: updatedUsers }),
                    encoding: Encoding.UTF8,
                });
            } catch (error) {
                console.error('Error saving profile:', error);
            }
        }
    };

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
                    <div className="page-form">
                        <h2>Mi perfil</h2>
                        {currentUser ? (
                            <>
                                <IonAvatar>
                                    <img src={currentUser.picture} alt="User Avatar" />
                                </IonAvatar>
                                <label htmlFor="user">Uusario</label>
                                <IonInput type="text" id="user" placeholder="usuario" onIonChange={(e) => handleInputChange('username', e.detail.value as string)} value={currentUser.username} className="input-field" />

                                <label htmlFor="email">Correo</label>
                                <IonInput type="email" id="email" placeholder="Correo" onIonChange={(e) => handleInputChange('email', e.detail.value as string)} value={currentUser.email} className="input-field" />

                                <IonButton expand="block" onClick={saveProfile} className="login-button btn_primary_custom">Editar perfil</IonButton>
                            </>
                        ) : (
                            <p>Cargando datos del usuario...</p>
                        )}
                    </div>
                </div>
            </IonContent>
        </IonPage>
    );
}

export default MyProfile;
