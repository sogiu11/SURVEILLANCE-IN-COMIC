// Retrieve Tracking Data from LocalStorage
const trackingData = JSON.parse(localStorage.getItem('trackingData')) || { comics: [], totalInteractions: 0, totalPoints: 0 };

// Display Points
const pointsDisplayElement = document.getElementById('points-display');
const pointBarElement = document.getElementById('point-bar');
pointsDisplayElement.textContent = `Points: ${trackingData.totalPoints}`;
pointBarElement.style.width = `${Math.min(trackingData.totalPoints, 100)}%`;

if (trackingData.totalPoints >= 100) {
    pointBarElement.classList.add('complete');
}

// Display Time Spent
const timeSpentElement = document.getElementById('time-spent');
const totalTimeSpent = trackingData.comics.reduce(
    (sum, comic) => sum + (comic.timeSpent || 0),
    0
);
timeSpentElement.textContent = `Total Time Spent: ${totalTimeSpent} seconds`;

// Display Poll Responses
const interactionSummaryElement = document.getElementById('interaction-summary');
interactionSummaryElement.textContent = trackingData.comics.map((comicData, index) => `
Comic ${index + 1}:
Poll Responses: ${Object.entries(comicData.pollAnswers || {})
    .map(([question, response]) => `${question}: ${response}`)
    .join(', ')}
`).join('\n\n');

// Display Comments
const commentSummaryElement = document.getElementById('comment-summary');
commentSummaryElement.textContent = trackingData.comics.map((comicData, index) => `
Comic ${index + 1}:
Comments: ${comicData.comments?.join(', ') || 'No comments'}
`).join('\n\n');
