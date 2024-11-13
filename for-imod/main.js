// script.js
document.addEventListener('DOMContentLoaded', () => {
    const voteForBtn = document.getElementById('vote-for');
    const confirmVoteForBtn = document.getElementById('confirm-vote-for');
    const voteAgainstBtn = document.getElementById('vote-against');
    const confirmVoteAgainstBtn = document.getElementById('confirm-vote-against');

    voteForBtn.addEventListener('click', () => {
        confirmVoteForBtn.style.display = 'inline-block';
    });

    confirmVoteForBtn.addEventListener('click', () => {
        axios.post('http://localhost:5500/for-imod', { voteOption: 'for' })
            .then(response => {
                alert('Tak for din stemme!');
                confirmVoteForBtn.style.display = 'none';
                voteForBtn.disabled = true;
                voteAgainstBtn.disabled = true;
            })
            .catch(error => {
                console.error('Error:', error);
            });
    });

    voteAgainstBtn.addEventListener('click', () => {
        confirmVoteAgainstBtn.style.display = 'inline-block';
    });

    confirmVoteAgainstBtn.addEventListener('click', () => {
        axios.post('http://localhost:5500/for-imod', { voteOption: 'against' })
            .then(response => {
                alert('Tak for din stemme!');
                confirmVoteAgainstBtn.style.display = 'none';
                voteForBtn.disabled = true;
                voteAgainstBtn.disabled = true;
            })
            .catch(error => {
                console.error('Error:', error);
            });
    });
});