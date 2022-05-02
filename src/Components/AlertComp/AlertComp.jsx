import React, {useContext} from 'react'
import { Alert } from 'react-bootstrap'
import loginContext from '../../Context/Login/Context'

function AlertComp() {
    const context = useContext(loginContext);
    const { errors, setError } = context;

    const dialog = document.getElementById('dialog');

    if (errors.error !== ''){
        dialog.style.display = '';

        setTimeout(() => {
            dialog.style.display = 'none';
            setError({error: '', errType: ''});
        }, 2000);
    }

    const styling = {
        display : 'none',
        position: 'fixed',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        opacity: '0.7',
        zIndex: '100'
    }

    return (
        <div id="dialog" style={styling}>
            <Alert variant={errors['errType']}>
                <Alert.Heading>{errors['error']}</Alert.Heading>
            </Alert>
        </div>
    )
}

export default AlertComp