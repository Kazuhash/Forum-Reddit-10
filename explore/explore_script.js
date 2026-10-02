function toggleJoin(button) {
    if (button.innerText === 'Join') {
        button.innerText = 'Joined';
        button.classList.replace('btn-primary', 'btn-outline');
    } else {
        button.innerText = 'Join';
        button.classList.replace('btn-outline', 'btn-primary');
    }
}