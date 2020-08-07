var fl = document.querySelector('.fl')
var dr = document.querySelector('.addr')
var addr_box = document.querySelector('.addr-box')
// console.log(addr_box);
fl.onmouseenter = function () {
    dr.style.cssText = "background-color:#fff;height: 31px; border: 1px solid #ccc; border-bottom: none; ";
    // console.log('asdasd');
    addr_box.style.cssText = "display:block;";


}
fl.onmouseleave = function () {
    dr.style.cssText = "background-color:#e3e4e5; height: 30px; border-bottom: none;";
    // console.log('asdasd');
    addr_box.style.cssText = "dispaly:none !important;"
}
var xiala1 = document.querySelector('.xiala1')
var xiala_box1 = document.querySelector('.xiala-box1')
var myjdli = document.querySelector('.myjdli')
xiala1.onmouseenter = function () {
    myjdli.style.cssText =
        "background-color:#fff;height: 31px; border: 1px solid #ccc; border-bottom: none; ";
    // console.log('asdasd');
    xiala_box1.style.cssText = "display:block;"

}
xiala1.onmouseleave = function () {
    myjdli.style.cssText = "background-color:#e3e4e5; height: 30px; border-bottom: none;";
    // console.log('asdasd');
    xiala_box1.style.cssText = "dispaly:none !important;"
}




var xiala2 = document.querySelector('.xiala2')
var xiala_box2 = document.querySelector('.xiala-box2')
var myjdli1 = document.querySelector('.myjdli1')
xiala2.onmouseenter = function () {
    myjdli1.style.cssText =
        "background-color:#fff;height: 31px; border: 1px solid #ccc; border-bottom: none; ";
    // console.log('asdasd');
    xiala_box2.style.cssText = "display:block;"

}
xiala2.onmouseleave = function () {
    myjdli1.style.cssText = "background-color:#e3e4e5; height: 30px; border-bottom: none;";
    // console.log('asdasd');
    xiala_box2.style.cssText = "dispaly:none !important;"
}

var timer1 = null;
fl.onclick = function (ev) {
    var e = ev || event;
    var target = e.target || e.srcElement;
    if (target.parentNode.className == 'item') {
        event.preventDefault();
        dr.lastChild.innerText = target.innerText;
        var act = this.querySelector('.active');
        act.classList.remove('active');
        act.classList.add('item')
        target.parentNode.classList.add('active')
        target.parentNode.classList.remove('item');
        clearTimeout(timer1);
        timer1 = setTimeout(function () {
            addr_box.style.cssText = "dispaly:none !important;"
        }, 600)
    }

}

// var contenList_div = $2('.addr .conten-list div');

// var contenList = $1('.conten-list');

// contenList.onclick = function (ev) {
//     var e = ev || event;
//     if (e.className === 'item') {

//     }
// }

var fr = $1('.fr');

fr.onmouseover = function (ev) {
    var e = ev || event;
    var target = e.target || e.srcElement;
    if (target.className === 'servP') {
        getNextNode(target).style.display = 'block';
        target.style.cssText = "background-color:#fff;height: 31px; border: 1px solid #ccc; border-bottom: none; ";
        target.onmouseleave = () => {
            target.style.cssText = "background-color:#e3e4e5; height: 30px; border-bottom: none;";
            getNextNode(target).style.display = 'none';
        }
    }
    if (target.className === 'fore3-xialaBox') {
        getPrevNode(target).style.cssText = "background-color:#fff;height: 31px; border: 1px solid #ccc; border-bottom: none; ";
        target.style.display = 'block';
        target.onmouseleave = () => {
            target.style.display = 'none';
            getPrevNode(target).style.cssText = "background-color:#e3e4e5; height: 30px; border-bottom: none;";
        }
    }
    if (target.className === 'dh') {
        getNextNode(target).style.display = 'block';
        target.style.cssText = "background-color:#fff;height: 31px; border: 1px solid #ccc; border-bottom: none; ";
        target.onmouseleave = () => {
            target.style.cssText = "background-color:#e3e4e5; height: 30px; border-bottom: none;";
            getNextNode(target).style.display = 'none';
        }
    }
    if (target.className === 'fore3-xialaBox1  clearBoth') {
        getPrevNode(target).style.cssText = "background-color:#fff;height: 31px; border: 1px solid #ccc; border-bottom: none; ";
        target.style.display = 'block';
        target.onmouseleave = () => {
            target.style.display = 'none';
            getPrevNode(target).style.cssText = "background-color:#e3e4e5; height: 30px; border-bottom: none;";
        }
    }
}

// 解决输入框字体提示问题
var serchipt = $1('.serchipt');
var phd = $1('.phd');
serchipt.oninput = function () {
    if (serchipt.value.length) {
        phd.style.display = 'none';
    } else {
        phd.style.display = 'block';
    }
}








// 轮播图

var tr = $1('.lb1 .tR');
var tl = $1('.lb1 .tL');
var imgs = $2('.lb1_img_box img');
var points = $2('.point p');
var showIndex = 0;
var prevIndex = 0;
var timer;
// 进入页面执行
animate(imgs[showIndex], {
    'opacity': 1
}, function () {
    // 自动播放下一页
    timer = setInterval(function () {
        tnext();
    }, 3000);
});


function tnext() {
    //重置上次显示样式
    imgs[prevIndex].className = '';
    points[prevIndex].className = '';
    imgs[prevIndex].style.opacity = 0.02;
    // 下标递增
    showIndex++;
    //判断临界值
    if (showIndex >= imgs.length) {
        showIndex = 0;
    }
    // 当前显示的样式
    imgs[showIndex].className = 'show';
    points[showIndex].className = 'active';
    // 跟新上次显示的下标
    prevIndex = showIndex;
    animate(imgs[showIndex], { 'opacity': 1 });
}

function tprev() {
    //重置上次显示样式
    imgs[prevIndex].className = '';
    points[prevIndex].className = '';
    imgs[prevIndex].style.opacity = 0.02;
    // 下标递增
    showIndex--;
    //判断临界值
    if (showIndex < 0) {
        showIndex = imgs.length - 1;
    }
    console.log(showIndex);
    // 当前显示的样式
    imgs[showIndex].className = 'show';
    points[showIndex].className = 'active';
    // 跟新上次显示的下标
    prevIndex = showIndex;
    animate(imgs[showIndex], { 'opacity': 1 });
}

tr.onclick = function () {
    // 清除所有计时器
    clearInterval(timer);
    clearInterval(imgs[showIndex].timer);
    tnext();
    // 开启自动播放到下一页
    timer = setInterval(function() {
        tnext();
    }, 3000);
}

tl.onclick = function () {
    // 清除所有计时器
    clearInterval(timer);
    clearInterval(imgs[showIndex].timer);
    tprev();
    // 开启自动播放到下一页
    timer = setInterval(function() {
        tnext();
    }, 3000);
}

// 小点hover换图

for (var i = 0, len = points.length; i < len; i++) {
    points[i].index = i;
    points[i].onmouseenter = function () {
        //清除所有计时器
        clearInterval(timer);
        clearInterval(imgs[showIndex].timer);

        //重置上次样式
        imgs[prevIndex].className = '';
        points[prevIndex].className = '';
        imgs[prevIndex].style.opacity = 0.02;

        showIndex = this.index;

        // 显示当前样式
        imgs[showIndex].className = 'show';
        points[showIndex].className = 'active';
        //跟新上次显示下标
        prevIndex = showIndex;

        // 开始动画
        animate(imgs[showIndex], { 'opacity': 1 });

        // 自动播放下一页
        animate(imgs[showIndex], {
            'opacity': 1
        }, function () {
            // 自动播放下一页
            timer = setInterval(function () {
                tnext();
            }, 3000);
        });
    }
}



// 轮播图2

var tr2 = $1('.lb2 .tR');
var tl2 = $1('.lb2 .tL');
var lb2Boxs = $2('.lb2_imgBox .lb2_imgBox_item');
var lb2showIndex = 0;
var lb2prevIndex = 0;
var timer2;
// 进入页面执行
animate(lb2Boxs[lb2showIndex], {
    'opacity': 1
}, function () {
    // 自动播放下一页
    timer2 = setInterval(function () {
        tnext2();
    }, 5000);
});


function tnext2() {
    //重置上次显示样式
    lb2Boxs[lb2prevIndex].classList.remove( 'show' );
    lb2Boxs[lb2prevIndex].style.opacity = 0.02;
    // 下标递增
    lb2showIndex++;
    //判断临界值
    if (lb2showIndex >= lb2Boxs.length) {
        lb2showIndex = 0;
    }
    // 当前显示的样式
    lb2Boxs[lb2showIndex].classList.add( 'show' );
    // 跟新上次显示的下标
    lb2prevIndex = lb2showIndex;
    animate(lb2Boxs[lb2showIndex], { 'opacity': 1 });
}

function tprev2() {
    //重置上次显示样式
    lb2Boxs[lb2prevIndex].classList.remove( 'show' );
    lb2Boxs[lb2prevIndex].style.opacity = 0.02;
    // 下标递增
    lb2showIndex--;
    //判断临界值
    if (lb2showIndex < 0) {
        lb2showIndex = lb2Boxs.length - 1;
    }
    // 当前显示的样式
    lb2Boxs[lb2showIndex].classList.add( 'show' );
    // 跟新上次显示的下标
    lb2prevIndex = lb2showIndex;
    animate(lb2Boxs[lb2showIndex], { 'opacity': 1 });
}


tr2.onclick = function () {
    // 清除所有计时器
    clearInterval(timer2);
    clearInterval(lb2Boxs[lb2showIndex].timer);
    tnext2();
    // 开启自动播放到下一页
    timer2 = setInterval(function() {
        tnext2();
    }, 3000);
}

tl2.onclick = function () {
    // 清除所有计时器
    clearInterval(timer2);
    clearInterval(lb2Boxs[lb2showIndex].timer);
    tprev2();
    // 开启自动播放到下一页
    timer2 = setInterval(function() {
        tnext2();
    }, 3000);
}
