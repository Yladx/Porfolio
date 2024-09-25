document.addEventListener('DOMContentLoaded', () => {
    fetch('project.json')
      .then(response => {
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        return response.json();
      })
      .then(portfolioData => {
        const cardRow = document.getElementById('card-row');
        const modalContainer = document.getElementById('modals'); // Container for modals
  
        // Function to render cards
        const renderCards = (data) => {
          cardRow.innerHTML = ''; // Clear existing cards
          data.forEach((project, index) => {
            const classificationBadges = project.classification.map(tag => {
              let badgeId;
              switch(tag) {
                case 'HTML': badgeId = 'html'; break;
                case 'CSS': badgeId = 'cssl'; break;
                case 'Java': badgeId = 'java'; break;
                case 'C++': badgeId = 'cplus'; break;
                case 'JS': badgeId = 'js'; break;
                default: badgeId = '';
              }
              return `<span class="badge bg-primary" id="${badgeId}">${tag}</span>`;
            }).join(' ');
  
            const cardHTML = `
              <div class="col-xxl-6 col-xl-6 col-lg-6 col-md-6 col-sm-12 mb-3" data-category="${project.image.category}">
                <div class="card clickable-card Porfolio-card" data-bs-toggle="modal" data-bs-target="#modalIde${index + 1}">
                  <div class="card-body">
                    <div class="row mb-1">
                      <div class="col-xxl-6 cold-lg-12">
                        <span class="card-text mb-0 project-title">${project.project_title}</span>
                      </div>
                      <div class="col-xxl-6 cold-lg-12 d-flex justify-content-end">
                        ${classificationBadges}
                      </div>
                    </div>
                    <p class="card-text mb-1">
                      <img src="${project.image.src}" class="pixelated-image" alt="${project.image.alt}" />
                    </p>
                  </div>
                </div>
              </div>
            `;
  
            cardRow.innerHTML += cardHTML;
  
            // Generate the modal
            const modalHTML = `
              <div class="modal fade" id="modalIde${index + 1}" tabindex="-1" data-bs-backdrop="static" data-bs-keyboard="false" role="dialog" aria-labelledby="modalTitleId${index + 1}" aria-hidden="true">
                <div class="modal-dialog modal-dialog-scrollable modal-dialog-centered custom-modal-size" role="document">
                  <div class="modal-content">
                    <div class="modal-header">
                      <h5 class="modal-title" id="modalTitleId${index + 1}">${project.project_title}</h5>
                      <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                    </div>
                    <div class="modal-body">
                      ${project.modal.type === 'carousel' ? `
                        <div id="carouselExample${index + 1}" class="carousel slide" data-bs-interval="false">
                          <div class="carousel-inner">
                            ${project.modal.content.map((slide, slideIndex) => `
                              <div class="carousel-item ${slideIndex === 0 ? 'active' : ''}">
                                <img src="${slide.img}" class="d-block w-100" alt="${slide.caption}">
                                <div class="carousel-caption d-none d-md-block">
                                  <h5>${slide.caption}</h5>
                                  <p>${slide.description}</p>
                                </div>
                              </div>
                            `).join('')}
                          </div>
                          <button class="carousel-control-prev" type="button" data-bs-target="#carouselExample${index + 1}" data-bs-slide="prev">
                            <span class="carousel-control-prev-icon" aria-hidden="true"></span>
                            <span class="visually-hidden">Previous</span>
                          </button>
                          <button class="carousel-control-next" type="button" data-bs-target="#carouselExample${index + 1}" data-bs-slide="next">
                            <span class="carousel-control-next-icon" aria-hidden="true"></span>
                            <span class="visually-hidden">Next</span>
                          </button>
                        </div>
                      ` : `
                        <div class="video-container">
                          <iframe src="${project.modal.content.videoSrc}" allow="autoplay" frameborder="0"></iframe>
                        </div>
                      `}
                      <div class="card card-body">
                        ${project.modal.content.description}
                      </div>
                    </div>
                    <div class="modal-footer">
                               <a href="${project.image.githublink}" class="btn btn-secondary" target="_blank">View on GitHub<i class="bi bi-github text-dark mx-1 fs-3 p-2"></i> </a>
                    </div>
                  </div>
                </div>
              </div>
            `;
  
            modalContainer.innerHTML += modalHTML; // Append the modal to the modal container
          });
        };
  
        // Initial render of all cards
        renderCards(portfolioData);
  
        // Add tab click event listeners
        const tabs = document.querySelectorAll('#category-tabs .nav-link');
        tabs.forEach(tab => {
          tab.addEventListener('click', (e) => {
            e.preventDefault();
            const category = e.target.getAttribute('data-category');
  
            // Remove active class from all tabs
            tabs.forEach(tab => tab.classList.remove('active'));
            // Add active class to the clicked tab
            e.target.classList.add('active');
  
            // Filter cards based on selected category
            const filteredData = category === 'all' ? portfolioData : portfolioData.filter(project => project.image.category === category);
            renderCards(filteredData);
  
            // Optionally, handle no visible cards case (e.g., show a message)
            if (filteredData.length === 0) {
              cardRow.innerHTML = '<p>No projects found in this category.</p>';
            }
          });
        });
      })
      .catch(error => console.error('Error fetching the portfolio data:', error));
  });
  