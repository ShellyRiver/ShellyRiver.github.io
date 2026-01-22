document.addEventListener("DOMContentLoaded", () => {
    let projects = [];

    fetch('js/projects.json')
        .then(response => {
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            return response.json();
        })
        .then(data => {
            projects = data;
            const grid = document.querySelector('.grid');
            grid.innerHTML = projects.map((project, index) => createProjectCard(project, index)).join('');
            addEventListeners();
        })
        .catch(error => {
            console.error('There has been a problem with your fetch operation:', error);
        });

    function addEventListeners() {
        const modal = document.getElementById('project-details-modal');
        const modalContent = document.getElementById('modal-project-content');
        const closeButton = document.querySelector('.close-button');

        document.querySelectorAll('.details-btn').forEach(button => {
            button.addEventListener('click', (e) => {
                e.preventDefault();
                const projectIndex = e.target.dataset.projectIndex;
                const project = projects[projectIndex];
                modalContent.innerHTML = marked.parse(project.details);
                modal.style.display = 'flex';
            });
        });

        closeButton.addEventListener('click', () => {
            modal.style.display = 'none';
        });

        window.addEventListener('click', (event) => {
            if (event.target == modal) {
                modal.style.display = 'none';
            }
        });
    }
});

function createProjectCard(project, index) {
    return `
        <div class="cardWrap">
          <div class="card">
            <div class="face front">
              <div class="focus-labels">
                ${project.focus.map(f => `<span class="focus-label">${f}</span>`).join('')}
              </div>
              <h3 class="projTitle">${project.title}</h3>
              <p class="desc">${project.description}</p>
            </div>
            <div class="face back">
              <div class="back-content">
                <h4>Key Contributions:</h4>
                <ul>
                  ${project.bullets.map(bullet => `<li>${bullet}</li>`).join('')}
                </ul>
                <div class="tech">
                  ${project.tech.split(',').map(t => `<span class="tag">${t.trim()}</span>`).join('')}
                </div>
                <div class="links">
                  <a href="#" class="btn details-btn" data-project-index="${index}">Details</a>
                </div>
              </div>
            </div>
          </div>
        </div>
    `;
}