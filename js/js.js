$(function(){

	var sub = $('#sub')
	var activeRow
	var activeMenu
	var timer
	var mouseInSub = false //判断鼠标是否在子菜单
	var mouseTrack = []
	var moveHandler = function(e){
		mouseTrack.push({
			x:e.pageX,
			y:e.pageY
		})
		console.log('mouseTrack',mouseTrack)
		if(mouseTrack.length > 3){
			mouseTrack.shift()
		}
	}

	sub.on('mouseenter',function(e){
		mouseInSub = true
	}).on('mouseleave',function(e){
		mouseInSub = false
	})

	$('#test.wrap')
		.on('mouseenter',function(e){
			sub.removeClass('none')
			$(document).bind('mousemove',moveHandler)
		})
		.on('mouseleave',function(e){
			sub.addClass('none')
			if(activeRow){
				activeRow.removeClass('active')
				activeRow = null
			}
			if(activeMenu){
				activeMenu.addClass('none')
				activeMenu = null
			}
			$(document).unbind('mousemove',moveHandler)
		})
		.on('mouseenter','li',function(e){
			if(!activeRow){
				activeRow = $(e.target).addClass('active')
				activeMenu = $('#' + activeRow.data('id'))
				activeMenu.removeClass('none')
				return 
			}
			if(timer){
				clearTimeout(timer)
			}

			var currMousePos = mouseTrack[mouseTrack.length - 1] //当前坐标
			var leftCorner = mouseTrack[mouseTrack.length - 2] //上一个坐标

			var delay = needDelay(sub,leftCorner,currMousePos)
			if(delay){
				timer = setTimeout(function(){
					//start 
					//移除上一个当前项样式，给当前项目添加样式
					if(mouseInSub){
						return
					}
					activeRow && activeRow.removeClass('active')
					activeMenu && activeMenu.addClass('none')
					activeRow = $(e.target)
					activeRow.addClass('active')
					activeMenu = $('#' + activeRow.data('id'))
					activeMenu.removeClass('none')
					//end
					timer = null
				},300)
			}else{
				var pervActiveRow = activeRow //?这么赋值，不相互影响？
				var pervActiveMenu = activeMenu
				activeRow = $(e.target)
				activeMenu = $('#' + activeRow.data('id'))
				pervActiveRow.removeClass('active') //上一次
				pervActiveMenu.addClass('none') //上一次
				activeRow.addClass('active')
				activeMenu.removeClass('none')
			}
		})
})