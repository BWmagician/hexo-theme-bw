let container = document.getElementById("container");
let footer = document.getElementById("footer");

// 如果页面过短则自动把footer放在底部，防止latex加载带来的高度变化
const resizeObserverContainer = new ResizeObserver(x => {
    console.log(container.offsetHeight);
    if (container.offsetHeight + footer.scrollHeight < window.innerHeight) {
        footer.setAttribute('style', 'position: absolute;');
        footer.style.bottom = 0;
    }
    else footer.setAttribute('style','');
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