// Defining text characters for the empty and full hearts for you to use later.
const EMPTY_HEART = '♡'
const FULL_HEART = '♥'

// Your JavaScript code goes here!


document.addEventListener('DOMContentLoaded', function() {
  const errorModal = document.getElementById('modal');
  const hearts = document.querySelectorAll('.like-glyph');

  // Add the .hidden class to the error modal initially
  errorModal.classList.add('hidden');

  // Event listener for clicks on heart icons
  hearts.forEach(heart => {
    heart.addEventListener('click', function(event) {
      const heartIcon = event.target;
      if (heartIcon.classList.contains('activated-heart')) {
        // If the heart is already filled, remove the activated class and change it back to empty heart
        heartIcon.classList.remove('activated-heart');
        heartIcon.textContent = EMPTY_HEART;
      } else {
        // If the heart is empty, try to like it
        mimicServerCall()
          .then(() => {
            // If the server call is successful, fill the heart and add the activated class
            heartIcon.textContent = FULL_HEART;
            heartIcon.classList.add('activated-heart');
          })
          .catch(error => {
            // If the server call fails, display the error modal with the error message
            const errorMessage = document.getElementById('modal-message');
            errorMessage.textContent = error;
            errorModal.classList.remove('hidden');
            // Hide the modal after 3 seconds
            setTimeout(() => {
              errorModal.classList.add('hidden');
            }, 3000);
          });
      }
    });
  });
});


//------------------------------------------------------------------------------
// Don't change the code below: this function mocks the server response
//------------------------------------------------------------------------------

function mimicServerCall(url="http://mimicServer.example.com", config={}) {
  return new Promise(function(resolve, reject) {
    setTimeout(function() {
      let isRandomFailure = Math.random() < .2
      if (isRandomFailure) {
        reject("Random server error. Try again.");
      } else {
        resolve("Pretend remote server notified of action!");
      }
    }, 300);
  });
}
