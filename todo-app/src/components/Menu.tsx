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
import { addOutline, calendarOutline, listOutline, logInOutline, personAddOutline, personOutline, settingsOutline, statsChartOutline } from 'ionicons/icons';
import './Menu.css';
import { useState } from 'react';
import jsonData from '../data.json';

interface AppPage {
  url: string;
  iosIcon: string;
  mdIcon: string;
  title: string;
}

const appPages: AppPage[] = [
  { title: 'My Profile', url: '/profile', iosIcon: personOutline, mdIcon: personOutline },
  { title: 'Reports', url: '/reports', iosIcon: statsChartOutline, mdIcon: statsChartOutline },
  { title: 'Tasks', url: '/tasks', iosIcon: listOutline, mdIcon: listOutline },
  { title: 'Calendar', url: '/calendar', iosIcon: calendarOutline, mdIcon: calendarOutline },
  { title: 'New Task', url: '/new-task', iosIcon: addOutline, mdIcon: addOutline },
  { title: 'Settings', url: '/settings', iosIcon: settingsOutline, mdIcon: settingsOutline },
];

const Menu: React.FC = () => {
  const location = useLocation();
  const userData = jsonData.users[0];
  
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
