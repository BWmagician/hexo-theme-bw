let articleBox = document.getElementsByClassName("articleBox");
let articleTitles = document.getElementsByClassName("articleTitle");
if(isMobile()){
    for(let i = 0; i < articleBox.length; ++i){
        articleBox[i].setAttribute('style',`width:90svw;font-size: 3rem;margin-top:${2}svh;margin-bottom:${2}svh;padding-bottom:${2}svh;`);
    }
    for(let i = 0; i < articleTitles.length; ++i){
        articleTitles[i].setAttribute('style',`font-size: 4rem`);
    }
}