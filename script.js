//  Create new XMLHttpRequest object
const projectsList = document.querySelector(".projects__list");

const req = new XMLHttpRequest();

function requestUserRepos(username) {
    //  Inform GitHub endpoint with the given username
    const url = `https://api.github.com/users/${username}/repos`;

    //  Open a new connection, using a GET request via URL endpoint
    //  Provide three arguments: GET/POST, URL, async true/false
    req.open('GET', url, true);

    //  When request is received, process it here
    req.onload = function() {
        //  Parse received data into JSON
        const data = JSON.parse(this.response);

        console.log(data);

        for (let i in data) {
            //  Create an anchor to receive the repo's content
            const project = document.createElement('a');

            //  Set its link to the actual repo and the classes for style
            project.setAttribute('href', data[i].html_url);
            project.setAttribute('target', '_blank');
            project.classList.add('card', 'project');

            //  Create a variable for the icon color according to the repo's language
            let techIconColor;
            switch (data[i].language) {
                case 'JavaScript': {
                    techIconColor = 'js';
                    break;
                };
                case "TypeScript": {
                    techIconColor = 'ts';
                    break;
                };
                case "HTML": {
                    techIconColor = 'html';
                    break;
                };
                case "CSS": {
                    techIconColor = 'css';
                    break;
                };
                case "EJS": {
                    techIconColor = 'ejs';
                    break;
                };
                default: {
                    techIconColor = 'default';
                    break;
                };
            };

            //  Getting the number of branches in the repo
            const branchesCount = getBranches(data[i].branches_url.split(/{\/branch}/)[0]).length;

            //  Insert the project's HTML into the anchor
            project.innerHTML = `
                <div class="project__header">
                    <img class="icon" src="./assets/folder.svg" alt="folder-icon">
                    <h3 class="generic-info">${data[i].name}</h3>
                </div>

                <p class="project-description">${data[i].description}</p>

                <div class="project__footer">
                    <div>
                        <div class="data">
                            <img class="icon" src="./assets/star.svg" alt="favourites icon">
                            <span>${data[i].stargazers_count}</span>
                        </div>

                        <div class="data">
                            <img class="icon" src="./assets/git-branch.svg" alt="git branch icon">
                            <span>${branchesCount}</span>
                        </div>
                    </div>

                    <div>
                        <div class="tech-icon ${techIconColor}"></div>
                        <span>${data[i].language}</span>
                    </div>
                </div>
            `;  

            //  Insert the anchor into the projects list div
            projectsList.appendChild(project);
        };  
    };
        
    //  Send the request to the server
    req.send();
};

//  Get branches from a given repo
function getBranches(branchUrl) {
    let branches;

    req.open('GET', branchUrl, false);

    req.onload = function() {
        branches = JSON.parse(req.response);
    };
    
    req.send();

    return branches;
};

//  Call the repos request function
requestUserRepos('manuela-monteiro');