(function ($) {
    // treeDOM1;
	var defaultData;
	
	var setting = {
		data: {
			simpleData: {
				enable: true
			}
		}
	}
	
	var methods = {
		getData: function () {
			var ids=[];
			$("#muls-select option").each(function(){
				ids.push($(this).val());
			});
			return ids;
		},
		getExchange: function () {
			var defaultId = [];
			var arrAdd = [];
			var arrDel = [];
			var nowId = [];
			$.each(defaultData, function(i,item) {
				defaultId.push(item.id);
			});
			$("#muls-select option").each(function(){
				var id = $(this).val();
				var obj = {};
				var index = defaultId.indexOf(id);
				if(index<0){
					obj.id = id;
					obj.name = $(this).text();
					arrAdd.push(obj);
				}
				nowId.push(id);
			});
			$.each(defaultId, function(i,item) {
				var id = item;
				var obj = {};
				var index = nowId.indexOf(id);
				if(index<0){
					obj.id = id;
					obj.name = defaultData[i].name;
					arrDel.push(obj);
				}
			});
			var result = {
				"addList": arrAdd,
				"delList": arrDel
			}
			return result;
		}
	};
	
	var initLeftView = function (obj,setting) {
        treeDOM1 = $.fn.zTree.init($('#treeDemoL'),setting, obj);
    }
	
    var initRightView = function (obj){
    	$.each(obj, function(i,item) {
    		$("#muls-select").append("<option value='"+item.id+"'>"+item.name+"</option>");
    	});
    }
	
	$.fn.zbMulSelect = function (options) {
    	
    	if (methods[options]) {
			return methods[options].apply(this, Array.prototype.slice.call(arguments, 1));
		} else if (typeof options === 'object' || !options) {
			
			var $this = $(this);
			
	    	var defaults = {
		        initDataL: [
		        ],
		        initDataR: []
		    };
		    
	        var opts = $.extend(defaults, options);

	        defaultData = opts.initDataR;
	        
			return this.each(function () {
				
				initLeftView(opts.initDataL,setting);
				
				if(opts.initDataR){
					if(opts.initDataR.length>0){
						initRightView(opts.initDataR);
					}
				}
				
				$("#addtoR").click(function(){
					doAddToR();
				});
				
				$("#removeL").click(function(){
					doRemoveToL();
				});
				
				$("#removeAll").click(function(){
					$("#muls-select").empty();
				});
				
				$("#addAll").click(function(){
					$("#muls-select").empty();
					$.each(opts.initDataL, function(i,item) {
						if(item.isParent){
			    			return;
			    		}
						$("#muls-select").append("<option value='"+item.id+"'>"+item.id+"   "+item.name+"</option>");
					});
				});
				
			});
		} else {
			$.error('Method ' + options + ' does not exist on jQuery.MyTest');
		}
    }
    //点击获取树节点
    function doAddToR(){
    	var nodes = treeDOM1.getSelectedNodes(true);
//    	var sum = $("#muls-select option").size();
    	$.each(nodes, function(i,item) {
//    		if(item.children){
//    			return;
//    		}
//    		if(sum!=0){
//    			if(checkIsExist(item.id)){
//	    			return;
//	    		}
//    		}
    		alert(item.name);
    	});
    }
    
    function doRemoveToL(){
    	$("#muls-select option:selected").each(function(){
			$(this).remove();
    	});
    }
    
    function checkIsExist(id){
    	var f = false;
    	$("#muls-select option").each(function(){
			if(id==$(this).val()){
				f = true;
			}
    	});
    	return f;
    }
	
})(jQuery);