import {elements} from './baseView';


export const getLoginFormData = () => {
    return {
        'email': elements.loginFormEmail.value,
        'password': elements.loginFormPassword.value
    }

}

export const getRegisterFromData = () => {

    return {
        'username': elements.registerUsername.value,
        'email': elements.registerEmail.value,
        'password': elements.registerPassword.value,
        'confirmPassword': elements.registerConfirmPassword.value
    }
}