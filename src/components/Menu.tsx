import {
    IonAvatar,
    IonContent,
    IonIcon,
    IonItem,
    IonLabel,
    IonList,
    IonListHeader,
    IonMenu,
    IonMenuToggle,
    IonNote,
} from '@ionic/react';

import { useLocation } from 'react-router-dom';
import { calendarOutline, listOutline, personOutline, settingsOutline, statsChartOutline } from 'ionicons/icons';
import './Menu.css';
import jsonData from '../data.json';
import { useEffect, useState } from 'react';
import { Preferences } from '@capacitor/preferences';
import { Directory, Encoding, Filesystem } from '@capacitor/filesystem';
const FILE_NAME = 'data.json';
interface AppPage {
    url: string;
    iosIcon: string;
    mdIcon: string;
    title: string;
}

const appPages: AppPage[] = [
    { title: 'Mi perfil', url: '/profile', iosIcon: personOutline, mdIcon: personOutline },
    { title: 'Reportes', url: '/reports', iosIcon: statsChartOutline, mdIcon: statsChartOutline },
    { title: 'Tareas', url: '/tasks', iosIcon: listOutline, mdIcon: listOutline },
    { title: 'Calendario', url: '/calendar', iosIcon: calendarOutline, mdIcon: calendarOutline },
    { title: 'Ajustes', url: '/settings', iosIcon: settingsOutline, mdIcon: settingsOutline },
];

const Menu: React.FC = () => {
    const location = useLocation();
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
    const userData = currentUser;

    return (
        <IonMenu contentId="main" type="overlay">
            <IonContent>
                <IonList id="menu-list">
                    <IonListHeader>
                        <IonAvatar>
                            <img src={userData?.picture} alt="User Avatar" />
                        </IonAvatar>
                        <div>{userData?.username || 'Loading...'}</div>
                    </IonListHeader>
                    <IonNote>{userData?.email || 'Loading...'}</IonNote>
                    {appPages.map((appPage, index) => (
                        <IonMenuToggle key={index} autoHide={false}>
                            <IonItem
                                className={location.pathname === appPage.url ? 'selected' : ''}
                                routerLink={appPage.url}
                                routerDirection="none"
                                lines="none"
                                detail={false}
                            >
                                <IonIcon aria-hidden="true" slot="start" ios={appPage.iosIcon} md={appPage.mdIcon} />
                                <IonLabel>{appPage.title}</IonLabel>
                            </IonItem>
                        </IonMenuToggle>
                    ))}
                </IonList>
            </IonContent>
        </IonMenu>
    );
};

export default Menu;
