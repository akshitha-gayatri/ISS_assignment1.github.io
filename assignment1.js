function showSection(sectionId) {
    const sections = document.querySelectorAll('section');

    sections.forEach(section => {
        section.style.display = 'none';
    });

    if (sectionId === 'blogs') {
        document.getElementById('blogs').style.display = 'block';
    } else {
        document.getElementById('blogs').style.display = 'none';
        document.getElementById(sectionId).style.display = 'block';
    }
}


function getStoredValue(key) {
    return localStorage.getItem(key) || 0;
}

function setStoredValue(key, value) {
    localStorage.setItem(key, value);
}

function like(blogId) {
    console.log(`Like function called for blog: ${blogId}`);

    let likesElement = document.getElementById(`likes_${blogId}`);
    if (!likesElement) {
        console.error(`Likes element not found for blog: ${blogId}`);
        return;
    }

    let currentLikes = parseInt(likesElement.innerText);
    currentLikes++;
    likesElement.innerText = currentLikes;
    setStoredValue(`likes_${blogId}`, currentLikes);
}

function addComment(blogId) {
    console.log(`Add comment function called for blog: ${blogId}`);

    let commentsContainer = document.getElementById(`comments_${blogId}`);
    
    if (!commentsContainer) {
        console.error(`Comments container not found for blog: ${blogId}`);
        return;
    }

    const commentInput = document.createElement("input");
    commentInput.type = "text";
    commentInput.placeholder = "Add a comment";
    commentInput.className = "comment-input";

    const submitButton = document.createElement("button");
    submitButton.textContent = "Submit";
    submitButton.onclick = function () {
        submitComment(blogId, commentInput);
    };

    commentsContainer.appendChild(commentInput);
    commentsContainer.appendChild(submitButton);
}

function submitComment(blogId, commentInput) {
    let commentsContainer = document.getElementById(`comments_${blogId}`);
    
    if (!commentsContainer) {
        console.error(`Comments container not found for blog: ${blogId}`);
        return;
    }

    let comment = commentInput.value.trim();

    if (comment !== "") {
        let existingComments = JSON.parse(getStoredValue(`comments_${blogId}`)) || [];
        existingComments.push(comment);

        commentsContainer.innerHTML = ""; 

        existingComments.forEach(c => {
            const commentDiv = document.createElement("div");
            commentDiv.textContent = c;
            commentsContainer.appendChild(commentDiv);
        });

        setStoredValue(`comments_${blogId}`, JSON.stringify(existingComments));

        commentsContainer.removeChild(commentInput);
        commentsContainer.removeChild(commentInput.nextSibling); 
    }
}


function hoverSection(section) {
    section.classList.toggle('hovered');
}

function clickSection(section) {
    var sections = document.getElementsByClassName('section');
    for (var i = 0; i < sections.length; i++) {
        sections[i].classList.remove('clicked');
    }

    section.classList.add('clicked');

    showSection(section.id);
}

function showSection(sectionId) {
    var sections = document.getElementsByClassName('section');
    for (var i = 0; i < sections.length; i++) {
        if (sections[i].id === sectionId) {
            sections[i].style.display = 'block';
        } else {
            sections[i].style.display = 'none';
        }
    }
}





window.onload = function () {
    console.log("Page loaded.");

    const isDarkMode = localStorage.getItem('darkMode') === 'true';

    if (isDarkMode) {
        document.body.classList.add('dark-mode');

    }

    
    ['blog1', 'blog2'].forEach(blogId => {
        let likesElement = document.getElementById(`likes_${blogId}`);
        if (likesElement) {
            likesElement.innerText = getStoredValue(`likes_${blogId}`);
        } else {
            console.error(`Likes element not found for blog: ${blogId}`);
        }
    });

    ['blog1', 'blog2'].forEach(blogId => {
        let storedComments = JSON.parse(getStoredValue(`comments_${blogId}`)) || [];
        let commentsContainer = document.getElementById(`comments_${blogId}`);

        if (commentsContainer) {
            commentsContainer.innerHTML = storedComments.map(c => `<div>${c}</div>`).join('');
        } else {
            console.error(`Comments container not found for blog: ${blogId}`);
        }
    });

   
};

function toggleDarkMode() {
    const body = document.body;
    body.classList.toggle('dark-mode');

}

function showSection(sectionId) {
    const sections = document.querySelectorAll('section');

    sections.forEach(section => {
        section.style.display = 'none';
    });

    if (sectionId === 'blogs') {
        document.getElementById('blogs').style.display = 'flex';
    } else {
        document.getElementById('blogs').style.display = 'none';
        document.getElementById(sectionId).style.display = 'block';
    }
}

