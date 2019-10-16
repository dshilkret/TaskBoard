import axios from 'axios';

const getProjects = () => {

    axios.get('http://localhost:8080/projects')
    .then(projects => {
        console.log(projects);
    })
    .catch(err => {
        console.log(err);
    })


}


getProjects();
