$(function () {
    $.ajax({
        url: './data/goods.json',
        type: 'get',
        dataType: 'json',
        success: function (json) {
            $.each(json, function (index, val) {
                var goodsDom = `
<div class="goodsBox">
    <div class="goodsCon">
        <div class="imgBox"><img src="${val.imgSrc}" alt=""></div>
        <div class="price"> <em>￥</em><i>${val.price}</i></div>
        <div class="intro">${val.intro}<i></i></div>
        <div class="commit"><a href="">${val.commit}</a> 条评价</div>
        <div class="shop"><span>${val.shop}</span><a
                href="https://mall.jd.com/index-1000093210.html?from=pc"></a></div>
        <div class="icon"> <i>自营</i></div>
        <div class="p-operate">
            <a href="#" class="p-o-btn foc1"><i></i>对比</a>
            <a href="#" class="p-o-btn foc2"><i></i>关注</a>
            <a goodId = "${val.goodsId}" href="./toShoppingCard.html" class="p-o-btn foc3"><i></i> 加入购物车</a>
        </div>
    </div>
</div>`
                $('.con').append(goodsDom);
            })
        }
    });

    $('.con').on("click", ".foc3", function () {
        var goodArr = [];
        var goodId = $(this).attr('goodId');
        if (localStorage.getItem('goods')) {
            goodArr = JSON.parse(localStorage.getItem('goods'))
        }
        // 标记是否加入购物车
        var flag = false;
        $.each(goodArr, function (imdex, item) {
            if (item.goodId === goodId) {
                flag = true;
                item.num++;
                return false;
            };
        });

        // 购物车没有商品num++

        if (!flag) {
            console.log(goodArr);
            goodArr.push({ goodId: goodId, num: 1 });
        }
        // 将数据存到localStorage中
        localStorage.setItem('thisGoodsId', goodId);
        localStorage.setItem('goods', JSON.stringify(goodArr));
    })

})