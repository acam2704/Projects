document.getElementById('user_backbttn').addEventListener('click', () => {
    let user_data = localStorage.getItem('user');
    if(!user_data){
        let json = {rol: 'client'};
        localStorage.setItem('user', JSON.stringify());
    }
    else{user_data['rol'] = 'client';}
    localStorage.setItem('user', JSON.stringify(user_data));

    window.location.href = 'https://ingenia-a6dkhcarh6e3b0ak.mexicocentral-01.azurewebsites.net/Ingenia/Html/web.html';
});
const window_location = window.location['pathname'].split('/');
const window_pathname = window_location[window_location.length - 1];
const bttns = ['client_bttn', 'construction_worker_bttn'];
bttns.forEach(bttn => {
    let section = document.getElementById(bttn);
    let increase = 0;
    section.addEventListener('mouseenter', function() {
        if(window.matchMedia('(max-width: 768px)')){
            increase = 5;
            this.querySelectorAll('.textbttn').forEach(text => {text.style.transform = 'scale(1.01)';})
        }
        if(window.matchMedia('(min-width: 768px)')){
            const window_container = document.getElementsByClassName('content_window')[0];
            window_container.style.marginTop = 'calc(50vh - 300px)';
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

if(window_pathname === 'user.html'){
    const article_bttn_back = document.getElementById('article_bttn_back');
    article_bttn_back.style.width = '100%';
}

document.getElementById('client_bttn').addEventListener('click', () =>{
    let data = JSON.parse(localStorage.getItem('user') ?? '{}');
    data.rol = 'client';
    localStorage.setItem('user', JSON.stringify(data));
    window.location.href = 'https://ingenia-a6dkhcarh6e3b0ak.mexicocentral-01.azurewebsites.net/Ingenia/Html/session-log.html';
});