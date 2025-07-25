let postContent = document.getElementById("postContent");

//给代码块的列号对齐，没用
let gutterLine = document.querySelectorAll(".gutter .line");
let codeLine = document.querySelectorAll(".code .line");
let code = document.querySelectorAll(".highlight .code");

let resizeObserverCode = new Array(code.length);

// for(let i = 0; i < code.length; ++i) {
//     resizeObserverCode[i] = new ResizeObserver(x => {
//         for (let i = 0; i < gutterLine.length; ++i) {
//             gutterLine[i].setAttribute('style', `height:${codeLine[i].offsetHeight}px`);
//             console.log(gutterLine[i],codeLine[i],codeLine[i].offsetTop);
//         }
//     });

//     resizeObserverCode[i].observe(code[i]);
// }

let codePosition = new Array(code.length);
let codeLineSet = new Array(code.length); 

for (let i = 0; i < code.length; ++i) {
    codePosition[i] = code[i].getBoundingClientRect().top + window.scrollY;
    codeLineSet[i] = [];
}

for (let i = 0, j = 0; i < codeLine.length; ++i) {
    let codeLinePos = codeLine[i].getBoundingClientRect().top + window.scrollY;
    while(j + 1 < code.length && codeLinePos >= codePosition[j + 1]) ++j;
    codeLineSet[j].push(i);
    // console.log(i,j,codeLineSet[j][codeLineSet[j].length-1]);
    // console.log(codeLinePos, codePosition[j]);
}

let codeLinePosition = new Array(codeLine.length);

for(let i = 0; i < code.length; ++i) {
    resizeObserverCode[i] = new ResizeObserver(x => { 
        // console.log(i);
        for (let j = 0; j < codeLineSet[i].length; ++j) {
            let k = codeLineSet[i][j];
            codeLinePosition[k] = codeLine[k].getBoundingClientRect().top; 
            // console.log("codeLinePosition:",codeLinePosition[k]);
        }
        for (let j = 0; j < codeLineSet[i].length; ++j) {
            let k = codeLineSet[i][j], realHeight = 0;
            // console.log(j,k);
            if(j == 0){
                realHeight = codeLinePosition[k+1] - code[i].getBoundingClientRect().top - 3;
            }
            else if(j == codeLineSet[i].length - 1){
                realHeight = 0;
            }
            else{
                realHeight
                = codeLinePosition[k+1] - codeLinePosition[k];
            }
            // console.log(`k:${k},realHeight:${realHeight}`);
            gutterLine[k].setAttribute('style', `height:${realHeight}px`);
        }
    });

    resizeObserverCode[i].observe(code[i]);
}

if(isMobile()){
    console.log(postContent);
    postContent.setAttribute('style',`font-size:${3.5}rem;margin-right:${10}svw;margin-left:${10}svw;padding-right:${0}vw;`);
}