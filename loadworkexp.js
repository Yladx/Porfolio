// Function to fetch and display work experience data
fetch('workexp.json')
  .then(response => response.json())
  .then(data => {
    const workExpContainer = document.getElementById('workExpContainer');
    data.forEach(item => {
      const timelineItem = document.createElement('li');
      timelineItem.classList.add('timeline-item');

      timelineItem.innerHTML = `
        <div class="timeline-info">
          <span>${item.year}</span>
        </div>
        <div class="timeline-marker"></div>
        <div class="timeline-content">
          <h3 class="timeline-title">${item.company}</h3>
          <p>${item.description}</p>
        </div>
      `;

      workExpContainer.appendChild(timelineItem);
    });
  })
  .catch(error => console.error('Error loading JSON data:', error));
