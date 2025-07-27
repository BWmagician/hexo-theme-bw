let container = document.getElementById("container");
let footer = document.getElementById("footer"); 
let pagination = document.getElementById("pagination");
let articles = document.getElementById("articles");

function max(a, b){
    return a > b ? a : b;
}

// 如果页面过短则自动把footer放在底部，防止latex加载带来的高度变化
const resizeObserverContainer = new ResizeObserver(x => {
    console.log(container.offsetHeight);
    let navHeight = max(window.innerHeight*0.07 , 65);
    let paginationHeight = pagination ? pagination.offsetHeight : 0;
    let footerHeight = 100;

    if(articles){
        if (pagination && articles.offsetHeight + paginationHeight + navHeight + footerHeight + 20 < window.innerHeight) {
            // console.log(pagination.offsetHeight);
            pagination.setAttribute('style', `position:absolute;bottom: ${footerHeight + 10}px;left:50%;transform:translateX(-50%)`);
            footer.setAttribute('style', 'position: absolute;');
            footer.style.bottom = 0;
        }
        else footer.setAttribute('style','');
        // 如果页面过短则自动把页码放在底部
    }
    else{
        if ( container.offsetHeight + footerHeight < window.innerHeight){
            footer.setAttribute('style', 'position: absolute;');
            footer.style.bottom = 0;
        }
        else footer.setAttribute('style',''); 
    }
});

resizeObserverContainer.observe(container);

//由于deatails标签的展开不会被监听，额外加一个点击事件的监听
// window.addEventListener('click', function() {
//     console.log(this.window.innerHeight);
//     console.log(container.getBoundingClientRect().height);
//     if (container.offsetHeight + footer.scrollHeight < window.innerHeight) {
//         footer.setAttribute('style', 'position: absolute;');
//         footer.style.bottom = 0;
//     }
//     else footer.setAttribute('style','');
// });

function isMobile() {
    let userAgent = navigator.userAgent.toLowerCase();
    return /android|webos|iphone|ipad|ipod|blackberry|iemobile|opera mini/i.test(userAgent);
}

let mobileStr = "";

if(isMobile()){
    document.body.setAttribute('style','font-size:4rem;');
    document.documentElement.style.setProperty('--navText', '5rem');
    document.documentElement.style.setProperty('--codeWrap', 'pre');
    document.documentElement.style.setProperty('--arcText', '4rem');
}

let nav = document.getElementById('navigation');
console.log(nav.offsetHeight);
if(nav.scrollHeight>100){
    mobileStr = "mobile";
}

//亮暗模式
let ldPic = document.getElementById("lightDarkButton");
function checkMode(){
    if(modelCount==0){
        document.documentElement.style.setProperty('--bgcolor', 'white');
        document.documentElement.style.setProperty('--txtcolor', 'black');
        document.documentElement.style.setProperty('--sdcolor','rgba(0, 0, 0, 0.135)');
        document.documentElement.style.setProperty('--cdcolor', 'rgb(234, 234, 234)');
        ldPic.src=`/img/light${mobileStr}.drawio.svg`;
    }
    if(modelCount==1){
        document.documentElement.style.setProperty('--bgcolor', '#252525');
        document.documentElement.style.setProperty('--txtcolor', '#c7c7c7ff');
        document.documentElement.style.setProperty('--sdcolor','rgba(255, 255, 255, 0.135)');
        document.documentElement.style.setProperty('--cdcolor', 'rgba(62, 62, 62, 1)');
        ldPic.src=`/img/dark${mobileStr}.drawio.svg`;
    }
}

let modelCount = localStorage.getItem('bwthemeMode');
let bodyElement = document.body;

if(!modelCount){
    modelCount=0;
}
checkMode();

function changeModel(){
    ++modelCount;
    modelCount%=2;
    localStorage.setItem('bwthemeMode',modelCount);
    checkMode();
}