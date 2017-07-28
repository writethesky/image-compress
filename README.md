# image-compress

图片压缩工具


## 使用示例

### CommonJs方式

```
var image_compress = require('images-compress');

var input_dom = document.getElementById("img");
image_compress(input_dom.files[0], 100, 100, function(base64){
    
    console.log(base64);
});
```

### 普通方式

```
<script type="text/javascript" src="images-compress.min.js"></script>

var input_dom = document.getElementById("img");
image_compress(input_dom.files[0], 100, 100, function(base64){
    
    console.log(base64);
});
```