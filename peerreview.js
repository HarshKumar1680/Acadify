// Add a new review
function addReview() {
    const studentName = document.getElementById("studentName").value.trim();
    const tc = parseInt(document.getElementById("tc").value);
    const cc = parseInt(document.getElementById("cc").value);
    const t = parseInt(document.getElementById("t").value);
    const ps = parseInt(document.getElementById("ps").value);

    if (!studentName || isNaN(tc) || isNaN(cc) || isNaN(t) || isNaN(ps)) {
        alert("Please fill in all fields correctly!");
        return;
    }

    const reviews = JSON.parse(localStorage.getItem('peerReviews')) || [];

    reviews.push({
        studentName,
        ratings: { tc, cc, t, ps }
    });

    localStorage.setItem('peerReviews', JSON.stringify(reviews));

    alert("Review submitted successfully!");

    // Clear input fields
    document.getElementById("studentName").value = "";
    document.getElementById("tc").value = "";
    document.getElementById("cc").value = "";
    document.getElementById("t").value = "";
    document.getElementById("ps").value = "";

    calculateScores(); // Update the reviews list
}

// View and compute scores
function calculateScores() {
    const reviews = JSON.parse(localStorage.getItem('peerReviews')) || [];
    const resultsDiv = document.getElementById("results");

    resultsDiv.innerHTML = "";

    if (reviews.length === 0) {
        resultsDiv.innerHTML = "<p>No reviews submitted yet.</p>";
        return;
    }

    const scoresMap = {};

    reviews.forEach(review => {
        const { studentName, ratings } = review;
        const totalScore = (ratings.tc + ratings.cc + ratings.t + ratings.ps) / 4;
        scoresMap[studentName] = totalScore;
    });

    for (let student in scoresMap) {
        resultsDiv.innerHTML += `<p><strong>${student}</strong>: ${scoresMap[student].toFixed(2)} / 5.0</p>`;
    }
}

// On page load, show any saved reviews
document.addEventListener('DOMContentLoaded', calculateScores);


// Go back to Dashboard
function goToDashboard() {
    window.location.href = 'index.html'; // Assuming your dashboard is named index.html
}

// View all submitted reviews in detail
function viewAllReviews() {
    const reviews = JSON.parse(localStorage.getItem('peerReviews')) || [];
    const allReviewsDiv = document.getElementById("allReviews");

    allReviewsDiv.innerHTML = "<h3>All Submitted Reviews</h3>";

    if (reviews.length === 0) {
        allReviewsDiv.innerHTML += "<p>No reviews submitted yet.</p>";
        return;
    }

    reviews.forEach((review, index) => {
        allReviewsDiv.innerHTML += `
            <div style="background: #f9f9f9; padding: 10px; margin: 10px 0; border-radius: 5px;">
                <strong>${index + 1}. ${review.studentName}</strong><br>
                Task Contribution: ${review.ratings.tc}<br>
                Collaboration & Communication: ${review.ratings.cc}<br>
                Timeliness: ${review.ratings.t}<br>
                Problem-Solving: ${review.ratings.ps}
            </div>
        `;
    }); 




    
}

