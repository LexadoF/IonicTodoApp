import React from 'react';
import { IonPage, IonHeader, IonToolbar, IonContent, IonInput, IonButton, IonText } from '@ionic/react';
import './login.css';

const Login: React.FC = () => (
  <IonPage>
    <IonContent className="login-container">
      <div className="login-wrapper">
        <div className="login-form">
        <img src="assets/cloud.png" alt="Cloud"className="cloud-image" />
          <h2>Inicio de sesión</h2>
          <p className='paragraph-sub'>Muy buenos días =)</p>

          <label htmlFor="email">Correo</label>
          <IonInput type="email" id="email" placeholder="ejemplo@email.com" className="input-field" />

          <label htmlFor="password">Contraseña</label>
          <div className="password-field">
            <IonInput type="password" id="password" placeholder="********" className="input-field" />
            {/* <IonButton fill="clear" className="eye-button">👁️</IonButton> */}
          </div>

          <IonButton expand="block" className="login-button ">Iniciar Sesión</IonButton>

          <IonText color="medium">
            <p className="register-link"><span>Regístrese</span></p>
            <p >¿Olvidaste tu clave? </p>
          </IonText>
        </div>
      </div>
    </IonContent>
  </IonPage>
);

export default Login;
