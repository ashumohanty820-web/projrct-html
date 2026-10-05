// This is the attendance percentage we want to reach.
const attendanceTarget = 75;

// Find the form, the two input boxes, and the place where we show the answer.
const form = document.getElementById('attendanceForm');
const totalInput = document.getElementById('totalClasses');
const attendedInput = document.getElementById('attendedClasses');
const resultBox = document.getElementById('result');

// Run this code when the student presses the calculate button.
form.addEventListener('submit', function (event) {
  // Keep the browser from refreshing the page when the form is submitted.
  event.preventDefault();

  const totalClasses = Number(totalInput.value);
  const attendedClasses = Number(attendedInput.value);

  // Check that the numbers make sense before doing the calculation.
  if (totalClasses <= 0 || attendedClasses < 0 || attendedClasses > totalClasses) {
    showMessage('Please enter a total above 0, and make sure attended classes are not more than total classes.');
    return;
  }

  // Attendance percentage = (classes attended / total classes) x 100.
  const percentage = (attendedClasses / totalClasses) * 100;
  let advice;

  if (percentage >= attendanceTarget) {
    // Work out how many future classes can be missed without going under 75%.
    const canMiss = Math.floor((attendedClasses / (attendanceTarget / 100)) - totalClasses);
    advice = canMiss > 0
      ? `You are meeting the 75% goal. You can miss up to ${canMiss} more ${canMiss === 1 ? 'class' : 'classes'} and stay at 75% or above.`
      : 'You are meeting the 75% goal. Try to attend your upcoming classes to keep it that way.';
  } else {
    // Work out how many consecutive classes must be attended to reach 75%.
    const needToAttend = Math.ceil((attendanceTarget * totalClasses - 100 * attendedClasses) / (100 - attendanceTarget));
    advice = `You need to attend the next ${needToAttend} ${needToAttend === 1 ? 'class' : 'classes'} in a row to reach 75%.`;
  }

  resultBox.hidden = false;
  resultBox.className = percentage >= attendanceTarget ? 'result success' : 'result';
  resultBox.innerHTML = `
    <div class="result-heading">
      <strong>${percentage.toFixed(1)}%</strong>
      <span>${percentage >= attendanceTarget ? 'Goal reached ✓' : 'Target: 75%'}</span>
    </div>
    <div class="meter" aria-label="Attendance progress">
      <div class="meter-fill" style="width: ${Math.min(percentage, 100)}%"></div>
    </div>
    <p>${advice}</p>
  `;
});

// Show an error message in the same result area.
function showMessage(message) {
  resultBox.hidden = false;
  resultBox.className = 'result error';
  resultBox.textContent = message;
}
