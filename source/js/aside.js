let h2 = document.getElementsByTagName('h2');
let asideHeadings = document.getElementsByClassName("asideHeadings");
let pos = -1;
// myStyle设置的是内联样式。优先级最高
// 但请注意，setAttribute会覆盖其他内联设置
let myStyle = "border-left: 2px solid;";

function addStyle(x) {
    if (x == -1) return;
    asideHeadings[x].setAttribute('style', myStyle);
}
function delStyle(x) {
    if (x == -1) return;
    asideHeadings[x].setAttribute('style', "");
}

//加入滚动监听，页面的移动
document.addEventListener("scroll", function () {
    let x = window.pageYOffset;
    while (pos + 1 < h2.length && x > h2[pos + 1].offsetTop) {
        delStyle(pos);
        ++pos;
        addStyle(pos);
    }
    while (pos >= 0 && x < h2[pos].offsetTop) {
        delStyle(pos);
        --pos;
        addStyle(pos);
    }
});

let aside = document.getElementsByTagName("aside");