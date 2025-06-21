// by deepseek 
// 把所有二级标题都拿出来

const cheerio = require('cheerio');

hexo.extend.filter.register('after_post_render', function (data) {
    const $ = cheerio.load(data.content);
    const headings = $('h2').map(function () {
        return {
            text: $(this).text(),
            id: $(this).attr('id')
        };
    }).get();
    data.toc = headings; // 将标题数组存储在data.toc中，可以在模板中使用
    return data;
});