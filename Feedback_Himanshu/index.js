document.getElementById("submitBtn").addEventListener("click", submitFeedback);

function submitFeedback() {
  const teacher = document.getElementById("teacher").value;
  const feedback = document.getElementById("feedback").value;
  const rating = document.querySelector('input[name="star"]:checked');

  if (!teacher || !feedback || !rating) {
    alert("Please fill all fields including rating.");
    return;
  }

  const feedbackList = document.getElementById("feedbackList");

  const item = document.createElement("div");
  item.className = "feedback-item";

  const heading = document.createElement("h3");
  heading.textContent = `${teacher} - ${'★'.repeat(rating.value)}${'☆'.repeat(5 - rating.value)}`;

  const para = document.createElement("p");
  para.textContent = feedback;

  item.appendChild(heading);
  item.appendChild(para);
  feedbackList.appendChild(item);

  document.getElementById("teacher").value = "";
  document.getElementById("feedback").value = "";
  document.querySelectorAll('input[name="star"]').forEach(r => r.checked = false);
}
