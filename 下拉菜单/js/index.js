
//确定页面的最大高度
var maxHeight = 400;

$(function(){

    $(".dropdown > li").hover(function() {
    
         var $container = $(this),
             $list = $container.find("ul"),
             $anchor = $container.find("a"),
             height = $list.height() * 1.1,      
             multiplier = height / maxHeight;     
        
        // 保存当前选定的导航的初始高度           
        $container.data("origHeight", $container.height());
        
        //给选定导航的a标签加class hover,鼠标离开导航，并在其下拉菜单滚动时，导航一直保留hover样式
        $anchor.addClass("hover");
        
        //显示下拉菜单，上边距是导航的高度   
        $list
            .show()
            .css({
                paddingTop: $container.data("origHeight")
            });
        
        // 当下拉菜单的高度小于最大高度时，则不运用滚动效果
        if (multiplier > 1) {
            $container
                .css({
                    height: maxHeight,
                    overflow: "hidden"
                })
                .mousemove(function(e) {
                    var offset = $container.offset();
                    var relativeY = ((e.pageY - offset.top) * multiplier) - ($container.data("origHeight") * multiplier);
                    if (relativeY > $container.data("origHeight")) {
                        $list.css("top", -relativeY + $container.data("origHeight"));
                    };
                });
        }
        
    }, function() {
    
        var $el = $(this);
        $el
            .height($(this).data("origHeight"))
            .find("ul")
            .css({ top: 0 })
            .hide()
            .end()
            .find("a")
            .removeClass("hover");
    
    });  
    
});