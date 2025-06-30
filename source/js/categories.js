const urlParams = new URLSearchParams(window.location.search);
const categoryName =  urlParams.get('category');

let fa,H;

fetch('../categories-pathData.json')
.then(response => {
    if(!response.ok) throw new Error('can not get the json file');
    return response.json(); 
})
.then(function(data){
    // console.log(data);
    fa=data['fa'];
    H=data['H'];
    let u = 1;
    for(let i = 0; i < H.length; ++i)
        if(H[i] == categoryName){
            u = i;
            break;
        }
    for(;u && u != 1; u = fa[u]){
        // console.log(`category_${H[u]}`);
        let categoryTitle = document.getElementById(`category_${H[u]}`);
        categoryTitle.classList.add("categoryTitles_chosen");
        categoryTitle.open = true;
    }
});

