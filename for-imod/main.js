// main.js

document.addEventListener('DOMContentLoaded', () => {
  const voteForBtn = document.getElementById('vote-for');
  const confirmVoteForBtn = document.getElementById('confirm-vote-for');
  const voteAgainstBtn = document.getElementById('vote-against');
  const confirmVoteAgainstBtn = document.getElementById('confirm-vote-against');
  const voteMessage = document.getElementById('vote-message');

  // Backend URL (Update this to your actual backend server URL)
  const backendUrl = 'https://eutanasi.kamillodev.com'; // Replace with your backend URL if different

  // Handle "Stem For" button click
  voteForBtn.addEventListener('click', () => {
    confirmVoteForBtn.style.display = 'inline-block';
  });

  // Handle "Bekræft Stem For" button click
  confirmVoteForBtn.addEventListener('click', () => {
    axios.post(`${backendUrl}/for-imod`, { voteOption: 'for' })
      .then(response => {
        alert('Tak for din stemme!');
        confirmVoteForBtn.style.display = 'none';
        voteForBtn.disabled = true;
        voteAgainstBtn.disabled = true;
        voteMessage.textContent = response.data.message;
      })
      .catch(error => {
        console.error('Error:', error);
        voteMessage.textContent = 'Der opstod en fejl under afgivelse af din stemme.';
      });
  });

  // Handle "Stem Imod" button click
  voteAgainstBtn.addEventListener('click', () => {
    confirmVoteAgainstBtn.style.display = 'inline-block';
  });

  // Handle "Bekræft Stem Imod" button click
  confirmVoteAgainstBtn.addEventListener('click', () => {
    axios.post(`${backendUrl}/for-imod`, { voteOption: 'against' })
      .then(response => {
        alert('Tak for din stemme!');
        confirmVoteAgainstBtn.style.display = 'none';
        voteForBtn.disabled = true;
        voteAgainstBtn.disabled = true;
        voteMessage.textContent = response.data.message;
      })
      .catch(error => {
        console.error('Error:', error);
        voteMessage.textContent = 'Der opstod en fejl under afgivelse af din stemme.';
      });
  });
});