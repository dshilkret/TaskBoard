import axios from 'axios';
import {elements} from './views/baseView';

import Auth from './models/Auth';
import Project from './models/Project';

import * as authView from './views/authView';
import * as dashboardView from './views/dashboardView';

/** GENERAL STATE */

const state = {};





// const getProjects = () => {

//     axios.get('http://localhost:8080/projects')
//     .then(projects => {
//         console.log(projects);
//     })
//     .catch(err => {
//         console.log(err);
//     })


// }


// getProjects();


/** AUTH CONTROLLERS */

const LoginController = () => {

    console.log('login');
    const data = authView.getLoginFormData();
    
    state.user = new Auth();
    
    state.user.signIn(data.email, data.password)
    .then(() => {
        
        window.location.replace('http://localhost:3000');
    
    })
    .catch(err => console.log(err));


}

if(window.location.href === 'http://localhost:3000/login.html') {
    elements.signInForm.addEventListener('submit', e => {
        e.preventDefault();
        LoginController();
    })
}

const RegisterController = () => {

    const data = authView.getRegisterFromData();

    new Auth().signUp(data.username, data.email, data.password, data.confirmPassword)
    .then(() => {
        window.location.replace('http://localhost:3000/login.html');
    })
    .catch(err => console.log(err.response.data));

}

if(window.location.href === 'http://localhost:3000/register.html') {
    elements.signUpForm.addEventListener('submit', e => {
        e.preventDefault();
        RegisterController();
    })
}

const LogoutController = () => {

    if(state.user) {
        state.user.clearAuthDataFromStorage();
        
        window.location.replace('http://localhost:3000/login.html')
    }

}

if(window.location.href === 'http://localhost:3000/'){
    elements.logoutBtn.addEventListener('click', e => {
        LogoutController('http://localhost:3000/login.html');
    })
}
/** DASHBOARD CONTROLLER */

const DashboardController = () => {

    state.projects = new Project(); 
    state.projects.allUserProjects()
    .then(() => {
        const projects = state.projects.allUserProjects;
        dashboardView.showAllUserProjects(projects);
    })
    .catch(err => console.log(err));


}

window.addEventListener('load', () => {

    state.user = new Auth();
    state.user.displayAuthDataSavedInBrowser();
    console.log(state.user);
    let tokenExpired;
    if(state.user.expiryDate && state.user.tokenCreatedAt) {

        tokenExpired = (new Date() - new Date(state.user.tokenCreatedAt)) > 3600000;

    }

    console.log(tokenExpired);
    console.log(state.user.userId);
    console.log(state.user.authToken);
    console.log(state.user.tokenCreatedAt);

    if(!state.user.userId || !state.user.authToken || tokenExpired) {

        if(window.location.href !== 'http://localhost:3000/login.html' && window.location.href !== 'http://localhost:3000/register.html'){
        
            window.location.replace('http://localhost:3000/login.html');
        
        } 

    } else if(state.user.userId && state.user.authToken && !tokenExpired) {
        
        if( window.location.href === 'http://localhost:3000/login.html' || window.location.href === 'http://localhost:3000/register.html'){
            
            window.location.replace('http://localhost:3000/');

        }

        DashboardController();
    }

})