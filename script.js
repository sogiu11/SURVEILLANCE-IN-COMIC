const comics = [
    { 
        src: 'comic1.jpg', 
        caption: 'What Remains of Defiance?', 
        poll: [
            'Will the fight for freedom always remain a never-ending struggle?',
            'Does excessive surveillance destroy urban communities?',
            'Is it still important to resist when everything seems lost?'
        ]
    },
    { 
        src: 'comic2.jpg', 
        caption: 'Surveillance Capitalism in Action', 
        poll: [
            'Is surveillance necessary even in peaceful places like the mountains?',
            'Can meditation truly be free in a heavily monitored environment?',
            'Is technology gradually diminishing our sense of personal freedom?'
        ]
    },
    { 
        src: 'comic3.jpg', 
        caption: 'The Age of Algorithms', 
        poll: [
            'Should algorithms have control over education?',
            'Is it possible to rediscover critical thinking in a world dominated by algorithmic optimization?',
            'Is individual curiosity strong enough to challenge technological control?'
        ]
    },
    { 
        src: 'comic4.jpg', 
        caption: 'The World of Tomorrow?', 
        poll: [
            'Do you believe that algorithms have too much control on our life?',
            'Do you think a society like the one depicted in the comic is a realistic future scenario?',
            'Can humanity reclaim its freedom of thought in a world dominated by surveillance?'
        ]
    },
    { 
        src: 'comic5.jpg', 
        caption: 'Fractured Privacy', 
        poll: [
            'Is privacy still a human right in a fully digital world?',
            'Can society survive without technology for a single day?',
            'Are personal choices still personal in a monitored society?'
        ]
    }
];

let currentComicIndex = 0;
let userPoints = 0;
let trackingData = JSON.parse(localStorage.getItem('trackingData')) || { comics: [], totalInteractions: 0, totalPoints: 0 };

function updateComic() {
    const comic = comics[currentComicIndex];
    console.log("Updating comic:", comic);

    document.getElementById('current-comic').src = comic.src;
    document.getElementById('comic-caption').textContent = `Comic ${currentComicIndex + 1}: ${comic.caption}`;

    const pollContainer = document.getElementById('poll-container');
    if (!pollContainer) {
        console.error("Poll container not found!");
        return;
    }

    pollContainer.innerHTML = ''; // Pulisci i vecchi poll

    comic.poll.forEach(question => {
        console.log("Creating poll for question:", question);

        const questionElem = document.createElement('p');
        questionElem.textContent = question;
        pollContainer.appendChild(questionElem);

        ['Agree', 'Neutral', 'Disagree'].forEach(choice => {
            const button = document.createElement('button');
            button.textContent = choice;

            // Passa la domanda come chiusura
            button.onclick = (function(q) {
                return () => {
                    console.log(`Button clicked for question: ${q}, choice: ${choice}`);
                    recordPoll(q, choice);
                    alert(`You selected "${choice}" for: ${q}`);
                    updatePoints(10);
                };
            })(question);

            pollContainer.appendChild(button);
        });
    });
}

function recordPoll(question, response) {
    console.log("Current Comic Index:", currentComicIndex);
    console.log("Tracking Data Before:", trackingData);

    // Assicurati che l'array trackingData.comics abbia un elemento per currentComicIndex
    if (!trackingData.comics[currentComicIndex]) {
        trackingData.comics[currentComicIndex] = { pollAnswers: {}, interactions: [] };
    }

    // Registra la risposta del sondaggio
    trackingData.comics[currentComicIndex].pollAnswers[question] = response;

    // Salva i dati aggiornati in localStorage
    localStorage.setItem('trackingData', JSON.stringify(trackingData));

    console.log("Tracking Data After:", trackingData);
}

function updatePoints(points) {
    userPoints += points;
    trackingData.totalPoints = userPoints;
    document.getElementById('points-display').textContent = `Points: ${userPoints}`;
    const pointBar = document.getElementById('point-bar');
    pointBar.style.width = `${Math.min(userPoints, 100)}%`;
    if (userPoints >= 100) pointBar.classList.add('complete');
    localStorage.setItem('trackingData', JSON.stringify(trackingData));
}

function recordReaction(type) {
    alert(`You ${type}d this content!`);
    updatePoints(type === 'like' ? 2 : 1);
    trackingData.totalInteractions++;
    localStorage.setItem('trackingData', JSON.stringify(trackingData));
}

document.getElementById('like-button').addEventListener('click', () => recordReaction('like'));
document.getElementById('dislike-button').addEventListener('click', () => recordReaction('dislike'));

document.getElementById('prev-button').addEventListener('click', () => {
    currentComicIndex = (currentComicIndex - 1 + comics.length) % comics.length;
    updateComic();
});

document.getElementById('next-button').addEventListener('click', () => {
    currentComicIndex = (currentComicIndex + 1) % comics.length;
    updateComic();
});

document.getElementById('submit-comment').addEventListener('click', () => {
    const commentBox = document.getElementById('comment-box');
    const comment = commentBox.value;
    if (comment) {
        const commentList = document.getElementById('comments-list');
        const newComment = document.createElement('p');
        newComment.textContent = comment;
        commentList.appendChild(newComment);
        commentBox.value = '';
        alert('Comment submitted!');
        updatePoints(5);
        if (!trackingData.comics[currentComicIndex]) {
            trackingData.comics[currentComicIndex] = { pollAnswers: {}, comments: [] };
        }
        trackingData.comics[currentComicIndex].comments.push(comment);
        trackingData.totalInteractions++;
        localStorage.setItem('trackingData', JSON.stringify(trackingData));
    }
});

updateComic();
document.getElementById('consent-button').addEventListener('click', () => {
    console.log("Consent button clicked"); // Debug

    const fullscreenImage = document.getElementById('fullscreen-image');
    fullscreenImage.classList.remove('hidden');

    setTimeout(() => {
        fullscreenImage.classList.add('hidden');
        setTimeout(() => {
            console.log("Redirecting to summary.html");
            window.location.href = 'summary.html';
        }, 1);
    }, 6000);
});
