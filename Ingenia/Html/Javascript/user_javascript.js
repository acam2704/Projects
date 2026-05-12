document.getElementById('user_backbttn').addEventListener('click', () => {
    window.location.href = 'https://ingenia-a6dkhcarh6e3b0ak.mexicocentral-01.azurewebsites.net/Ingenia/Html/web.html';
});
const bttns = ['client_bttn', 'construction_worker_bttn'];
bttns.forEach(bttn => {
    let section = document.getElementById(bttn);
    let increase = 0;
    section.addEventListener('mouseenter', function() {
        if(window.matchMedia('(max-width: 768px)')){
            increase = 5;
            this.querySelectorAll('.textbttn').forEach(text => {text.style.transform = 'scale(1.01)';})
        }
        this.querySelectorAll('img').forEach(img => {
            img.style.boxShadow = `0 0 10px rgb(0,0,0,0.1)`;
            img.style.transform = `rotate(${10+increase}deg) scale(1.05)`;
        });
        this.querySelectorAll('a').forEach(a => {a.style.transform = `translateX(${5+increase}px)`;});
        this.querySelectorAll('.textbttn').forEach(text => {text.style.transform = 'scale(1.01)';})
    });
    section.addEventListener('mouseleave', function(){
        this.querySelectorAll('img').forEach(img => {
            img.style.boxShadow = 'none';
            img.style.transform = 'rotate(0deg) scale(1)';
        });
        this.querySelectorAll('a').forEach(a => {a.style.transform = 'translateX(0px)';});
        this.querySelectorAll('.textbttn').forEach(text => {text.style.transform = 'scale(1)';})
    })
});

document.getElementById('client_bttn').addEventListener('click', () =>{
    window.location.href = 'https://ingenia-a6dkhcarh6e3b0ak.mexicocentral-01.azurewebsites.net/Ingenia/Html/session-log.html';
});