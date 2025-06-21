let container = document.getElementById("container");
let footer = document.getElementById("footer");

// 如果页面过短则自动把footer放在底部
if (container.offsetHeight + footer.scrollHeight < window.innerHeight) {
    footer.setAttribute('style', 'position: absolute;');
    footer.style.bottom = 0;
}
else footer.setAttribute('style','');

//在缩放时即使更新
window.addEventListener('resize', function() {
    console.log(this.window.innerHeight);
    if (container.offsetHeight + footer.scrollHeight < window.innerHeight) {
        footer.setAttribute('style', 'position: absolute;');
        footer.style.bottom = 0;
    }
    else footer.setAttribute('style','');
});