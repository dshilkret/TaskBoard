import axios from 'axios';

export default class Auth {

    constructor(){};


    signUp(username, email, password, confirmPassword) {

        console.log(username, email, password, confirmPassword)
        return axios.post(
        'http://localhost:8080/register',
        {
            username: username,
            email: email,
            password: password,
            confirmPassword: confirmPassword
        },
        { headers: { 'Accept' : 'aplication/json' }}
        );

    }

    signIn(email, password) {

        // let bodyFormData = new FormData();

        // bodyFormData.append('email', email);
        // bodyFormData.append('password', password);
        console.log(email, password);

        return axios.post(
            'http://localhost:8080/login',
            {
                email: email,
                password: password
            },
            { headers: { 'Accept' : 'aplication/json' }}
        )
        .then(response => {
            
            this.userId = response.data.userId;
            this.token = response.data.token;
            this.tokenCreatedAt = new Date();
            this.expiryDate = new Date();
            this.expiryDate.setHours(this.tokenCreatedAt.getHours() + 2);

            localStorage.setItem('authToken', response.data.token);
            localStorage.setItem('userId', response.data.userId);
            localStorage.setItem('tokenCreatedAt', this.tokenCreatedAt);
            localStorage.setItem('expiryDate', this.expiryDate);


        })
        .catch(err => {
            console.log(err);
        }) 


    }

    displayAuthDataSavedInBrowser() {

        const authToken = localStorage.getItem('authToken');
        const userId = localStorage.getItem('userId');
        const tokenCreatedAt = localStorage.getItem('tokenCreatedAt');
        const expiryDate = localStorage.getItem('expiryDate');
        console.log('1');
        if(authToken && userId && tokenCreatedAt && expiryDate) {
            console.log('2');
            this.authToken = authToken;
            this.userId = userId;
            this.tokenCreatedAt = tokenCreatedAt;
            this.expiryDate = expiryDate;

        }

    }

    clearAuthDataFromStorage() {

        window.localStorage.clear();

    }


}