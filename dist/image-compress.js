/*! image-compress 2017-07-28 
 * image-compress v1.0.0 
 * (c) 2017 writethesky（撰天）
 * Released under the MIT License. 
 * https://github.com/writethesky/ 
 * https://github.com/writethesky/image-compress.git */
'use strict';

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

(function (w, factory) {
    if ((typeof module === "undefined" ? "undefined" : _typeof(module)) === "object" && _typeof(module.exports) === "object") {
        module.exports = factory(w, true);
    } else {
        factory(w, false);
    }
})(window, function (w, noGlobal) {

    function image_compress(blob, width, height, callback) {
        blob2base64(blob, function (base64) {
            draw_img(base64, width, height, function (base64) {
                callback(base64);
            });
        });
    }

    // blob转base64
    function blob2base64(blob, callback) {
        var a = new FileReader();
        a.onload = function (e) {
            callback(e.target.result);
        };
        a.readAsDataURL(blob);
    }

    //制作缩略图
    function draw_img(img, aim_w, aim_h, callback) {
        var tmp_img = new Image();
        tmp_img.src = img;

        var r = 0; //压缩比
        var mycanvas = document.createElement('canvas');
        var con = mycanvas.getContext("2d");
        var data;
        var new_img;

        tmp_img.addEventListener('load', function () {
            var img_h = tmp_img.height; //图片原高度
            var img_w = tmp_img.width; //图片原宽度
            var w_temp = img_w,
                h_temp = img_h; //
            if (img_w > aim_w && img_h > aim_h) {
                r = img_w / aim_w;
                if (img_h / r < aim_h) r = img_h / aim_h;

                w_temp = Math.ceil(img_w / r);
                h_temp = Math.ceil(img_h / r);

                new_img = resize_img(mycanvas, tmp_img, w_temp, h_temp);
            } else {
                if (img_w < aim_w && img_h < aim_h) {
                    //宽高都小于  
                    r = aim_w / img_w;
                    if (img_h * r < aim_h) r = aim_h / img_h;
                } else {
                    if (img_w < aim_w) {
                        //宽小于  
                        r = aim_w / img_w;
                    } else {
                        //高小于  
                        r = aim_h / img_h;
                    }
                }
                w_temp = Math.ceil(img_w * r);
                h_temp = Math.ceil(img_h * r);
                new_img = resize_img(mycanvas, tmp_img, w_temp, h_temp);
            }
            new_img.addEventListener('load', function () {
                con.clearRect(0, 0, mycanvas.width, mycanvas.height);
                mycanvas.width = aim_w;
                mycanvas.height = aim_h;
                con.drawImage(new_img, (new_img.width - aim_w) / 2, (new_img.height - aim_h) / 2, aim_w, aim_h, 0, 0, aim_w, aim_h);
                data = mycanvas.toDataURL();

                callback(data);
            });
        });
    }
    function resize_img(canvas1, obj_img, w, h) {
        //重置大小  
        canvas1.width = w;
        canvas1.height = h;
        canvas1.getContext('2d').drawImage(obj_img, 0, 0, canvas1.width, canvas1.height);
        var tmp_img = new Image();
        tmp_img.src = canvas1.toDataURL();

        return tmp_img;
    }

    if (!noGlobal) {
        w.image_compress = image_compress;
    }

    return image_compress;
});
