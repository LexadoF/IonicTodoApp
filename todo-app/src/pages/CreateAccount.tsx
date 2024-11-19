import React from 'react';
import { IonPage, IonContent, IonInput, IonButton, IonText, IonCheckbox } from '@ionic/react';
import { useHistory } from 'react-router';
import './createAccount.css';

const CreateAccount: React.FC = () => {
    const history = useHistory();

    const handleContinue = () => {
        history.push('/profile');
    };

    const handleLogin = () => {
        history.push('/login');
    };

    return (
        <IonPage>
            <IonContent className="login-container">
                <div className="page-wrapper">
                    <div className="page-form">
                        <h2>Crea tu cuenta</h2>
                        <label htmlFor="email">Correo</label>
                        <IonInput type="email" id="email" placeholder="Ingrese su correo" className="input-field" />
                        <label htmlFor="password">Contraseña</label>
                        <div className="password-field">
                            <IonInput type="password" id="password" placeholder="Ingrese su clave" className="input-field" />
                        </div>
                        <div className="terms-conditions">
                            <IonCheckbox />Estoy de acuerdo con los <span className='terms-link span-link'>Términos y condiciones</span>
                        </div>
                        <IonButton expand="block" onClick={handleContinue} className="continue-register-button btn_primary_custom">Continue</IonButton>

                        <IonText color="medium">
                            <p>¿Ya tienes cuenta?<span className="login-link span-link" onClick={handleLogin}> Inicia Sesión</span></p>
                        </IonText>
                    </div>
                </div>
            </IonContent>
        </IonPage>
    );
}

export default CreateAccount;
