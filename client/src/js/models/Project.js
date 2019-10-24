import axios from 'axios';


export default class Project {

    constructor() {}


    allUserProjects() {

        return axios.get(
            'http://localhost:8080/projects'
        ).then(response => {

            this.allUserProjects = response.data.projects;
        
        })

    }


}