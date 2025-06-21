// 最大路径条数N，并不是多少文章，而是这棵树有多少个边
let N = 100000;
// 最多层数K
let K = 30;

let buf = 0, fa = new Array(N + 5);
let head = new Array(N + 5), to = new Array(N + 5), nxt = new Array(N + 5), vis = new Array(N + 5);
let map = {}, H = new Array(N + 5), content = new Array(N + 5);
let cnt = 1, edge_num = 0;

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
        if( vis[x] == -2) res = `<details open class="categoryTitles_chosen"><summary class="categoryTitles" style="padding-left:${depth * K}px">${H[x]}</summary>`;
        else if (vis[x] == -1) res = `<details open><summary class="categoryTitles" style="padding-left:${depth * K}px">${H[x]}</summary>`;
        else res = `<details><summary class="categoryTitles" style="padding-left:${depth * K}px">${H[x]}</summary>`;
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

hexo.extend.helper.register('categories_folder', function (data, path) {
    for (let i = 0; i < N + 5; ++i) vis[i] = 0;
    if (buf == 0) {
        data.forEach(post => {
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
            content[u].push([this.url_for(post.path), post.title]);
        });
    }
    if (path != "") {
        const pathArr = path.split('/');
        let u = map[pathArr[pathArr.length - 2]];
        //被特定选中的分类标一个-2
        vis[u]=-2;
        u=fa[u];
        //需要打开的路径标记-1
        while (u != 1) {
            vis[u] = -1;
            u = fa[u];
        }
    }
    buf = 1;
    return dfs(1, -1);
});