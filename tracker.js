// Retrieve Tracking Data from LocalStorage
const trackingData = JSON.parse(localStorage.getItem('trackingData')) || { comics: [], totalInteractions: 0, totalPoints: 0 };

// Display Points
const pointsDisplayElement = document.getElementById('points-display');
const pointBarElement = document.getElementById('point-bar');
pointsDisplayElement.textContent = `Points: ${trackingData.totalPoints || 0}`;
pointBarElement.style.width = `${Math.min(trackingData.totalPoints || 0, 100)}%`;

if (trackingData.totalPoints >= 100) {
    pointBarElement.classList.add('complete');
}

// Display Time Spent
const timeSpentElement = document.getElementById('time-spent');
const totalTimeSpent = trackingData.comics.reduce((sum, comic) => sum + (comic.timeSpent || 0), 0);
timeSpentElement.textContent = `Total Time Spent: ${totalTimeSpent} seconds`;

// Display Poll Responses
const interactionSummaryElement = document.getElementById('interaction-summary');
if (trackingData.comics && trackingData.comics.length > 0) {
    interactionSummaryElement.textContent = trackingData.comics.map((comicData, index) => `
Comic ${index + 1}:
Poll Responses:
${Object.entries(comicData.pollAnswers || {})
        .map(([question, response]) => `  - ${question}: ${response}`)
        .join('\n')}
`).join('\n\n');
} else {
    interactionSummaryElement.textContent = "No poll responses recorded.";
}

// Display Comments
const commentSummaryElement = document.getElementById('comment-summary');
if (trackingData.comics && trackingData.comics.length > 0) {
    commentSummaryElement.textContent = trackingData.comics.map((comicData, index) => `
Comic ${index + 1}:
Comments:
${comicData.comments && comicData.comments.length > 0
        ? comicData.comments.map(comment => `  - ${comment}`).join('\n')
        : "  - No comments"}
`).join('\n\n');
} else {
    commentSummaryElement.textContent = "No comments recorded.";
}

// Debugging Information
console.log("Tracking Data Loaded:", trackingData);
