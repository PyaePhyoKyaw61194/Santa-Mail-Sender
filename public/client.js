// define variables that reference elements on our page
const santaForm = document.forms[0];
const message = document.getElementById('error')

// listen for the form to be submitted and add a new dream when it is
santaForm.onsubmit = function (event) {

  const formData = new FormData(event.target);
  const username = formData.get('username')
  const wish = formData.get('wish')

  if (username == null || username.trim().length === 0) {
    event.preventDefault();
    message.innerHTML = "Please fill user name";
  }
  else if (wish == null || wish.trim().length === 0) {
    event.preventDefault();
    message.innerHTML = "Please fill wish";
  }
  else if (wish.trim().length >= 100) {
    event.preventDefault();
    message.innerHTML = "Wish should not be more than 100 words";
  }
};

