
function waterFall () {
  // 1- 确定图片的宽度 - 滚动条宽度
  var pageWidth = getClient().width-8;
  var columns = 3; // 3 列
  var itemWidth = parseInt(pageWidth/columns); // 得到item的宽度
  $(".item").width(itemWidth); // 设置到item的宽度
  
  var arr = [];

  $(".masonry .item").each(function(i){
    var height = $(this).find("img").height();
    var width = $(this).find("img").width();
    var bi = itemWidth/width; // 获取缩小的比值
    var boxheight = parseInt(height*bi); // 图片的高度*比值 = item的高度

    if (i < columns) {
      // 2- 确定第一行
      $(this).css({
        top:0,
        left:(itemWidth) * i
      });
      arr.push(boxheight);

    } else {
      // 其他行
      // 3- 找到数组中最小高度  和 它的索引
      var minHeight = arr[0];
      var index = 0;
      for (var j = 0; j < arr.length; j++) {
        if (minHeight > arr[j]) {
          minHeight = arr[j];
          index = j;
        }
      }
      // 4- 设置下一行的第一个盒子位置
      // top值就是最小列的高度 
      $(this).css({
        top:arr[index],
        left:$(".masonry .item").eq(index).css("left")
      });

      // 5- 修改最小列的高度 
      // 最小列的高度 = 当前自己的高度 + 拼接过来的高度
      arr[index] = arr[index] + boxheight;
    }
  });
}


// clientWidth 处理兼容性
function getClient() {
  return {
    width: window.innerWidth || document.documentElement.clientWidth || document.body.clientWidth,
    height: window.innerHeight || document.documentElement.clientHeight || document.body.clientHeight
  }
}



 // 页面尺寸改变时实时触发
window.onresize = function() {
  // 重新定义瀑布流
  waterFall();
};



// 初始化
window.onload = function(){
  
  // 实现瀑布流
  waterFall();

}