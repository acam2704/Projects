document.getElementById('user_backbttn').addEventListener('click', () => {
    window.location.href = 'https://ingenia-a6dkhcarh6e3b0ak.mexicocentral-01.azurewebsites.net/Ingenia/Html/web.html';
});
const bttns = ['client_bttn', 'construction_worker_bttn'];
bttns.forEach(bttn => {
    let section = document.getElementById(bttn);
    if(window.matchMedia('(max-width: 768px)')){
        section.addEventListener('mouseenter', function() {
            this.querySelectorAll('img').forEach(img => {
                img.style.boxShadow = '0 0 10px rgb(0,0,0,0.1)';
                img.style.transform = 'rotate(15deg) scale(1.05)';
            });
            this.querySelectorAll('a').forEach(a => {
                a.style.transform = 'translateX(10px)';
                a.style.marginTop = '25px';
            });
            this.querySelectorAll('.textbttn').forEach(text => {
                text.style.transform = 'scale(1.01)';
            })
        });
    } else{
        section.addEventListener('mouseenter', function() {
            this.querySelectorAll('img').forEach(img => {
                img.style.boxShadow = '0 0 10px rgb(0,0,0,0.1)';
                img.style.transform = 'rotate(10deg) scale(1.05)';
            });
            this.querySelectorAll('a').forEach(a => {
                a.style.transform = 'translateX(5px)';
                a.style.marginTop = '25px';
            })
        });
    }
    
    section.addEventListener('mouseleave', function(){
        this.querySelectorAll('img').forEach(img => {
            img.style.boxShadow = 'none';
            img.style.transform = 'rotate(0deg) scale(1)';
        });
        this.querySelectorAll('a').forEach(a => {
            a.style.transform = 'translateX(0px)';
            a.style.marginTop = '15px';
        });
        this.querySelectorAll('.textbttn').forEach(text => {
            text.style.transform = 'scale(1)';
        })
    })
});