// 在aside.js之后
let postContent = document.getElementsByTagName("postContent");

//没有二级标题就把文章内容覆盖掉右侧边栏
if(asideHeadings.length==0){
    postContent[0].setAttribute('style','margin-right:20px');
    aside[0].setAttribute('style','z-index:-1;')
}

function cfp(x){
    return false;
}