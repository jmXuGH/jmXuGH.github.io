export default function () {
    var hideBox = $1('.hideBox');
    var itemUp = $1('.itemUp');
    var service_item = $2('.itemUp .service_item');
    var prev = 0;
    var closeHideBox = $1('.closeHideBox p')
    for (var i = 0, len = service_item.length; i < len; i++) {
        (function (x) {
            service_item[x].onmouseenter = function () {
                var _this = this;
                animate(itemUp, {
                    top: -32
                }, function () {
                    service_item[prev].classList.remove('itemActive');
                    _this.classList.add('itemActive');
                    prev = x;
                })
                animate(hideBox, {
                    top: 23
                })
            }
        })(i)

    }
    closeHideBox.onclick = function(){
        var itemActive = $1('.itemActive');
        itemActive.classList.remove('itemActive');
        animate(itemUp, {
            top: 0
        })
        animate(hideBox, {
            top: 230
        })
    }

}