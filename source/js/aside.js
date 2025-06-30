let h2 = document.getElementsByTagName('h2');
let h3 = document.getElementsByTagName('h3');
let asiderH2 = document.getElementsByClassName("asiderH2");
let asiderH3 = document.getElementsByClassName("asiderH3");
let asideHeadings = document.getElementsByClassName("asiderH3");
let asiderDetails = document.getElementsByClassName("asiderDetails");
let pos = -1, posh3 = -1;
// 加入eps保证点击侧边栏时必定出现特效。
let eps = 5;
// h2Style设置的是内联样式。优先级最高
// 但请注意，setAttribute会覆盖其他内联设置
let h2Style = "border-left: 4px solid;padding-left: 2px", h3Style = "border-left: 2px solid;padding-left: 1px;";

function addStyleh2(x) {
    if (x == -1) return;
    asiderH2[x].setAttribute('style', h2Style);
    asiderDetails[x].open = true;
}
function delStyleh2(x) {
    if (x == -1) return;
    asiderH2[x].setAttribute('style', "");
    asiderDetails[x].open = false;
}
function addStyleh3(x) {
    if (x == -1) return;
    asiderH3[x].setAttribute('style', h3Style);
}
function delStyleh3(x) {
    if (x == -1) return;
    asiderH3[x].setAttribute('style', "");
}

//加入滚动监听，页面的移动
document.addEventListener("scroll", function () {
    let x = window.pageYOffset;
    while (pos + 1 < h2.length && x + eps > h2[pos + 1].offsetTop ) {
        delStyleh2(pos);
        ++pos;
        addStyleh2(pos);
    }
    while (pos >= 0 && x + eps < h2[pos].offsetTop) {
        delStyleh2(pos);
        --pos;
        addStyleh2(pos);
    }
    while (posh3 + 1 < h3.length && x + eps > h3[posh3 + 1].offsetTop ) {
        delStyleh3(posh3);
        ++posh3;
        addStyleh3(posh3);
    }
    while (posh3 >= 0 && x + eps < h3[posh3].offsetTop ) {
        delStyleh3(posh3);
        --posh3;
        addStyleh3(posh3);
    }
});
