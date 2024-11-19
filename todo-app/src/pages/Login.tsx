import React from 'react';
import { IonPage, IonContent, IonInput, IonButton, IonText } from '@ionic/react';
import { useHistory } from 'react-router';
import './login.css';

const Login: React.FC = () => {
  const history = useHistory();

  const handleRegister = () => {
      history.push('/create-account');
  };

  const handleLogin = () => {
    history.push('/profile');
};
  return (
    <IonPage>
      <IonContent className="login-container">
        <div className="page-wrapper">
          <div className="page-form">
            <img src="assets/cloud.png" alt="Cloud" className="cloud-image" />
            <h2>Inicio de sesión</h2>
            <p className="paragraph-sub">Muy buenos días =)</p>

            <label htmlFor="email">Correo</label>
            <IonInput type="email" id="email" placeholder="ejemplo@email.com" className="input-field" />

            <label htmlFor="password">Contraseña</label>
            <div className="password-field">
              <IonInput type="password" id="password" placeholder="********" className="input-field" />
              {/* <IonButton fill="clear" className="eye-button">👁️</IonButton> */}
            </div>

            <IonButton expand="block" className="login-button btn_primary_custom" onClick={handleLogin}>Iniciar Sesión</IonButton>

            <IonText color="medium">
              <p><span className="register-link span-link" onClick={handleRegister}>Regístrese</span></p>
              <p >¿Olvidaste tu clave? </p>
            </IonText>
          </div>
        </div>
      </IonContent>
    </IonPage>
  );
}

export default Login;
