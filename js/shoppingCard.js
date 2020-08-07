var goodArr = localStorage.getItem('goods');
        console.log(goodArr);
        goodArr = JSON.parse(goodArr);
        var goodDom = '';
        var total = 0;
        $.get('./data/goods.json', '', function (data) {

            $.each(goodArr, function (index, item) {
                $.each(data, function (index, val) {
                    if (item.goodId == val.goodsId) {
                        goodDom = `
                <div class="goods_con">
                        <ul class="cart-item float-l">
                            <p class="cart-checkbox"><input class="float-l" type="checkbox"></p>
                            <li class="p-img"><img src="${val.imgSrc}" alt=""></li>
                            <li class="goods">
                                <p class="msg">${val.intro}</p>
                                <p class="icon-box"><i class="icon"></i><a href="">选服务</a></p>
                            </li>
                            <li class="props">23.8英寸爆款</li>
                            <li class="price">¥${val.price}</li>
                            <li class="quantity">
                                <p class="btns"><a  class="float-l">-</a><input class="float-l" type="text" value = "${item.num}"><a
                                         class="float-l">+</a></p>
                                <p class="txt">有货</p>
                            </li>
                            <li class="sum">¥${val.price*item.num}.00</li>
                            <li class="action"><a href="">删除</a><a href="">移到我的关注</a></li>
                        </ul>
                </div>
`
                        total += item.num;
                        $('.goods_cart_box').append(goodDom);
                    }
                })
            })
            $('.count_num').text(total);

        }, 'json');