import React, { useEffect, useState } from 'react';
import { IonPage, IonContent, IonInput, IonButton, IonText, IonCheckbox, useIonAlert } from '@ionic/react';
import { useHistory } from 'react-router';
import './createAccount.css';
import data from '../data.json';
import { Directory, Encoding, Filesystem } from '@capacitor/filesystem';
const FILE_NAME = 'data.json';

const CreateAccount: React.FC = () => {
    const history = useHistory();
    const [presentAlert] = useIonAlert();
    const [email, setEmail] = useState<string>('');
    const [password, setPassword] = useState<string>('');
    const [termsAccepted, setTermsAccepted] = useState<boolean>(false);
    const [users, setUsers] = useState<any[]>([]);

    useEffect(() => {
        const loadUsers = async () => {
            try {
                const file = await Filesystem.readFile({
                    path: FILE_NAME,
                    directory: Directory.Documents,
                    encoding: Encoding.UTF8,
                });
                setUsers(JSON.parse(file.data as string).users || []);
            } catch (error) {
                console.error('Error reading file:', error);
                setUsers([]);
            }
        };

        loadUsers();
    }, []);

    const handleContinue = async () => {
        if (!email.trim() || !password.trim()) {
            presentAlert({
                header: 'Error',
                message: 'Por favor complete todos los campos.',
                buttons: ['OK'],
            });
            return;
        }

        if (!termsAccepted) {
            presentAlert({
                header: 'Error',
                message: 'Debe aceptar los términos y condiciones.',
                buttons: ['OK'],
            });
            return;
        }

        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email.trim())) {
            presentAlert({
                header: 'Error',
                message: 'Por favor ingrese un correo válido.',
                buttons: ['OK'],
            });
            return;
        }

        if (password.length < 6) {
            presentAlert({
                header: 'Error',
                message: 'Su clave debe tener mínimo 6 caracteres',
                buttons: ['OK'],
            });
            return;
        }

        const newUser = {
            id: users.length + 1,
            username: '',
            email: email.trim(),
            password: password,
            picture: 'https://picsum.photos/200',
        };
        const updatedUsers = [...users, newUser];

        try {
            await Filesystem.writeFile({
                path: FILE_NAME,
                directory: Directory.Documents,
                data: JSON.stringify({ users: updatedUsers }),
                encoding: Encoding.UTF8,
            });

            setUsers(updatedUsers);

            presentAlert({
                header: 'Éxito',
                message: 'Cuenta creada exitosamente. ¡Bienvenido!',
                buttons: [
                    {
                        text: 'OK',
                        handler: () => history.push('/login'),
                    },
                ],
            });
        } catch (error) {
            console.error('Error writing file:', error);
            presentAlert({
                header: 'Error',
                message: 'No se pudo crear la cuenta. Intente nuevamente.',
                buttons: ['OK'],
            });
        }

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
                        <IonInput type="email" id="email" onIonChange={(e) => setEmail(e.detail.value as string)} placeholder="Ingrese su correo" className="input-field" />
                        <label htmlFor="password">Contraseña</label>
                        <div className="password-field">
                            <IonInput type="password" id="password" onIonChange={(e) => setPassword(e.detail.value as string)} placeholder="Ingrese su clave" className="input-field" />
                        </div>
                        <div className="terms-conditions">
                            <IonCheckbox checked={termsAccepted} onIonChange={(e) => setTermsAccepted(e.detail.checked)} />Estoy de acuerdo con los <span className='terms-link span-link'>Términos y condiciones</span>
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
