let pagination = document.getElementById("pagination");
let articles = document.getElementById("articles");

// 如果页面过短则自动把页码放在底部
if (articles.offsetHeight + pagination.offsetHeight + 10 + footer.offsetHeight < window.innerHeight) {
    // console.log(pagination.offsetHeight);
    pagination.setAttribute('style', `position:absolute;bottom: ${footer.offsetHeight + 10}px;left:50%;transform:translateX(-50%)`);
}