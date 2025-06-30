// 最大路径条数N，并不是多少文章，而是这棵树有多少个边
let N = 100000;
// 最多层数K
let K = 30;

let buf = 0, fa = new Array(N + 5);
let head = new Array(N + 5), to = new Array(N + 5), nxt = new Array(N + 5), vis = new Array(N + 5);
let map = {}, H = new Array(N + 5), content = new Array(N + 5);
let cnt = 1, edge_num = 0;

//此函数为deepseek生成，在generator中无法使用url_for，需要手写
function url_for(path) {
  const { config } = hexo;
  const { root } = config;
  // 如果路径以`http://`或`https://`开头，直接返回
  if (path.startsWith('http://') || path.startsWith('https://')) {
    return path;
  }
  // 确保路径以斜杠开头
  path = path.replace(/^([^/])/, '/$1');
  // 处理root路径
  if (root && root !== '/') {
    // 确保root以斜杠开头和结尾
    let rootPath = root.replace(/(^[^/])/, '/$1').replace(/([^/])$/, '$1/');
    // 将root和path连接起来
    return rootPath + path.replace(/^\//, '');
  }
  return path;
}

function add_edge(f, t) {
    nxt[++edge_num] = head[f];
    to[edge_num] = t;
    head[f] = edge_num;
    fa[t] = f;
}

function dfs(x, depth) {
    // console.log(`now come to >>${x} + ${vis[x]}`);
    let res = "";
    if (x != 1) {
        let id = `category_${H[x]}`;
        res = `<details id="${id}"><summary class="categoryTitles" style="padding-left:${depth * K}px">${H[x]}</summary>`;
    }
    vis[x] = 1;
    for (let i = head[x]; i; i = nxt[i]) {
        let dr = to[i];
        // console.log(`${x}->${dr}`);
        if (vis[dr] <= 0) res += dfs(dr, depth + 1);
    }
    if (content[x]) {
        for (let i = 0; i < content[x].length; ++i) {
            // console.log(content[x][i][0] + content[x][i][1]);
            res += `<p><a href="${content[x][i][0]}" class="categoryPostTitles" 
                          style="padding-left:${(depth + 1) * K}px" 
                          target="_blank" 
                          rel="noopener noreferrer">${content[x][i][1]}</a>
                    </p>`;
        }
    }
    if (x != 1) res += "</details>";
    return res;
}

hexo.extend.generator.register('categories_folder_generate', function (locals) {
    // console.log("this is categories_folder_generate");
    data = locals.posts;
    if (buf == 0) { 
        data.forEach(post => {
            for (let i = 0; i < N + 5; ++i) vis[i] = 0;
            let categories = post.categories;
            let u = 1; //root = 1
            categories.forEach(cat => {
                if (!map[cat.name]) {
                    map[cat.name] = ++cnt;
                    H[cnt] = cat.name;
                }
                add_edge(u, map[cat.name]);
                u = map[cat.name];
            });
            if (!content[u]) content[u] = [];
            content[u].push([url_for(post.path), post.title]);
        });
    }
    return;
}, {priority: 1});

hexo.extend.helper.register('categories_folder', function(){
    for (let i = 0;i <= cnt; ++i) vis[i] = 0;
    return dfs(1,-1);
});

//
hexo.extend.generator.register('hexo_vars', function(locals) {
  return {
    path: 'categories-pathData.json',
    data: JSON.stringify({
      fa: fa,
      H: H
    })
  };
}, {priority: 2});