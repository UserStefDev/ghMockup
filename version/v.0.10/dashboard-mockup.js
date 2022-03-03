
function HideAll(){
    let sections = document.querySelectorAll('section');
    sections.forEach(element =>{
        if(!element.classList.contains('hidden')){
            element.classList.add('hidden');
        }
    });
    let navbtns = document.querySelectorAll('.navbtn');
    navbtns.forEach(element =>{
        if(element.classList.contains('selected')){
            element.classList.remove('selected');
        }
    });
}
function NavTo(sectionID){
    HideAll();
    console.log(sectionID);
    
    let section = document.getElementById(sectionID);
    section.classList.toggle('hidden');

    let navbtn = document.querySelector(`[data-navto="${sectionID}"]`);
    navbtn.classList.toggle('selected');
}


window.addEventListener('load', (ev)=>{
    console.log('Welcome.');

    let loginBtn = document.getElementById('login');
    loginBtn.addEventListener('click', (e)=>{
        
        let navbtns = document.querySelectorAll('.navbtn');
        navbtns.forEach(element => {
            element.addEventListener('click', (ev)=>{
                NavTo(ev.target.dataset.navto);
            });
        });
        let navLinks = document.querySelectorAll('[data-nav]');
        navLinks.forEach(element => {
            element.addEventListener('click', (ev)=>{
                NavTo(ev.target.dataset.nav);
            });
        });

        let loginCard = document.getElementById('login-card');
        loginCard.classList.add('hidden');


        NavTo(e.target.dataset.navto);
    });
});