$(function () {
    // 判断购物车是否有数据
    if (localStorage.getItem('goods')) {
        var goodArr = localStorage.getItem('goods');
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
                            <li class="price" unit-price = "${val.price}">¥${val.price}</li>
                            <li class="quantity">
                                <p class="btns"><a  class="float-l subtract">-</a><input class="float-l " type="text" value = "${item.num}"><a
                                         class="float-l add" >+</a></p>
                                <p class="txt">有货</p>
                            </li>
                            <li class="sum" allPrice = "${val.price * item.num}">¥${val.price * item.num}.00</li>
                            <li class="action"><a class = "del"  goodId = "${item.goodId}">删除</a><a >移到我的关注</a></li>
                        </ul>
                </div>
`
                        total += item.num;
                        $('.goods_cart_box').append(goodDom);
                    }
                })
            })
            $('.count_num').text(total);

            var scrollT = document.body.scrollTop || document.documentElement.scrollTop;
            var windowHeight = document.documentElement.clientHeight;
            var botHeight = $('.bottom').offset().top + $('.bottom')[0].clientHeight;
            if (scrollT + windowHeight <= botHeight) {
                $('.bottom').addClass("botFixed")
                $('.botCon').css("border", "none")
            } else {
                $('.bottom').removeClass("botFixed")
            }
            $(window).scroll(function () {
                scrollT = document.body.scrollTop || document.documentElement.scrollTop;
                if (scrollT + windowHeight <= botHeight) {
                    $('.bottom').addClass("botFixed")
                    $('.botCon').css("border", "none")
                } else {
                    $('.bottom').removeClass("botFixed")
                }
                // console.log($(document.documentElement).scrollTop());
            })
            //计算商品总价
            allPrice();
            // 计算选中商品数量
            countShopping();
        }, 'json');

        // 删除
        $(".goods_cart_box").on("click", ".action .del", function () {
            var delGoodId = $(this).attr("goodId")
            $.each(goodArr, function (index, item) {
                if (delGoodId == item.goodId) {
                    console.log(goodArr);
                    goodArr.splice(index, 1);
                    
                    return false
                }
            })
            if (goodArr.length > 0) {
                localStorage.setItem("goods", JSON.stringify(goodArr));
            } else {
                localStorage.clear();
                var newLi = '<li style="line-height:80px; text-align:center; color: #999;">购物车暂无数据！</li>';
                $('.content').html(newLi);
            }
            $(this).parent().parent().parent().remove();
            countShopping();
            alert(' 商品成功移出购物车！');
        })
    } else {
        var newLi = '<li style="line-height:80px; text-align:center; color: #999;">购物车暂无数据！</li>';
        $('.content').html(newLi);
    }

    // 全选

    $('.con').on('click', '.header .cart-checkbox input', function () {
        if ($(this).prop("checked")) {

            $(".goods_cart_box .cart-item .cart-checkbox input").prop('checked', true);
            $('.bottom .botConLeft .botCheck').prop('checked', true);
        } else {
            $(".goods_cart_box .cart-item .cart-checkbox input").prop('checked', false);
            $('.bottom .botConLeft .botCheck').prop('checked', false);
        }
        countShopping();
        return;
    })

    $('.wrap').on('click', '.bottom .botConLeft .botCheck', function () {

        if ($(this).prop("checked")) {

            $(".goods_cart_box .cart-item .cart-checkbox input").prop('checked', true);
            $('.header .cart-checkbox input').prop('checked', true);
        } else {
            $(".goods_cart_box .cart-item .cart-checkbox input").prop('checked', false);
            $('.header .cart-checkbox input').prop('checked', false);
        }
        countShopping();
        return;
    })

    $('.wrap').on('click', '.goods_con .cart-item .cart-checkbox input', function () {
        // console.log(this);
        // var checkDom = $('.cart-item .cart-checkbox input').length;
        // for (var i = 0, len = checkDom.length; i < len; i++) {
        //     console.log(i);
        //     console.log(checkDom[i]);
        // }
        $('.cart-item .cart-checkbox input').each(function (index, item) {
            if (!$(item).prop('checked')) {
                $('.header .cart-checkbox input').prop('checked', false);
                $('.bottom .botConLeft .botCheck').prop('checked', false);
                return false;
            }
            $('.header .cart-checkbox input').prop('checked', true);
            $('.bottom .botConLeft .botCheck').prop('checked', true);
        })
        countShopping();
    })

    // 计算选中商品数量
    function countShopping() {
        var num = 0
        var sum = 0
        $('.cart-item .cart-checkbox input').each(function (index, item) {
            if ($(item).prop('checked')) {
                num++
                $(this).each(function (index, item1) {
                    var itemSum = Number($(item1).parent().siblings().eq(5).attr('allPrice'));
                    sum += itemSum
                })
            }
        })
        $('.checkCount .num').text(num);
        $('.moneyNum').text(sum+'.00');
        return num;
    }

    // 加商品
    $('.goods_cart_box').on('click', '.add', function () {
        var nums = $(this).prev().val();
        nums++;
        $(this).prev().val(nums);
        var zongjia = $($(this).parent().parent().prev()).attr('unit-price') * nums;
        $($(this).parent().parent().next()).text("￥" + zongjia + '.00')
        $($(this).parent().parent().next()).attr('allPrice', zongjia);
        //allPrice();
        countShopping();
    });

    //减商品
    $('.goods_cart_box').on('click', '.subtract', function () {
        var nums = $(this).next().val();
        if (nums > 1) {
            nums--;
            $(this).next().val(nums);
            var zongjia = $($(this).parent().parent().prev()).attr('unit-price') * nums;
            $($(this).parent().parent().next()).text("￥" + zongjia + '.00');
            $($(this).parent().parent().next()).attr('allPrice', zongjia);
            //allPrice();
            countShopping();
        }

    })
    // 计算总价

    function allPrice() {
        var allPrice = 0;
        $('.cart-item .cart-checkbox input').each(function (index, item) {
            if ($(item).prop('checked')) {
                console.log(this);
            }
        })
        // $('.sum').each(function (index, item) {
        //     var num = $(item).attr('allPrice');
        //     num = Number(num);
        //     allPrice += num;
        // })
        $('.moneyNum').text(allPrice + '.00')
    }

})



