import { elements } from "./baseView"


const showProject = project => {

    const markup = `
     <article class="dashboard-project">
        <div class="dashboard-project__title">
            ${project.title}
        </div>
        <p class="dashboard-project__description">
            ${project.description}
        </p>
        <a href="#${project._id}" class="dashboard-project-details__btn">Detalji</a>
    </article>
    `

    elements.dashboardProjectsList.insertAdjacentHTML('beforeend', markup);


}

export const showAllUserProjects = (projects) => {

    projects.forEach(project => {
        showProject(project);
    })

}