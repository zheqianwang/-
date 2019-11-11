//表格数据初始化
var spreaddata = "";
// 当前key值
var datakey = "";
// 绑定input id
var inputid = "";
//判断是否为获取坐标
var isPosition = false;
//spreadjs代码
var spreadcode = "";

var objectdata = {};
$(function() {
	
	$("#extractDataApi").click(function() {
		initdata2();


	});
	// $("#doImport1").click(function(){
	// 	$(".main-menu").css("left","0px");
	// });
	// $(".close-menu").click(function(){
	// 	$(".main-menu").css("left","-121px");
	// });
});
function initspreadcode(){
	spreadcode = {};
	$dataServiceProxy.invokeMethod('Genersoft.SCM.PSKB.Core.PSKBJsReport','GetMouldField',[mouldID]).then(function(result){
		for(var a in result.data.Table){
			spreadcode[result.data.Table[a].BACKUP1]=result.data.Table[a].JSRFTEXT;
		}
	});
}
function inputservice() {
	$(".setValue").on("click", function() {
		// 绑定input id
		inputid = $(this)[0].id;
		var td = $(this);
		var txt = td.text();
		var input = $("<input style='width:90px;' type='text' value='" + txt + "'/>");
		td.html(input);
		input.click(function() {
			return false;
		});
		// 获取焦点
		input.trigger("focus");
		// 文本框失去焦点后提交内容，重新变为文本
		input.blur(function() {
			var newtxt = $(this).val();
			// 判断文本有没有修改
			if (newtxt != txt) {
				td.html(newtxt);
				/*
				 * 不需要使用数据库的这段可以不需要 var caid = $.trim(td.prev().text());
				 * //ajax异步更改数据库,加参数date是解决缓存问题 var url =
				 * "../common/Handler2.ashx?caname=" + newtxt + "&caid=" + caid +
				 * "&date=" + new Date();
				 * //使用get()方法打开一个一般处理程序，data接受返回的参数（在一般处理程序中返回参数的方法
				 * context.Response.Write("要返回的参数");） //数据库的修改就在一般处理程序中完成
				 * $.get(url, function(data) { if(data=="1") { alert("该类别已存在！");
				 * td.html(txt); return; } alert(data); td.html(newtxt); });
				 */
			} else {
				td.html(newtxt);
			}
		});
	});
	$(".setPosition").on("click", function() {
		// 绑定input id
		inputid = $(this)[0].id;
		isPosition = true;
		var td = $(this);
		var txt = td.text();
		var input = $("<input style='width:90px;' type='text' value='" + txt + "'/>");
		td.html(input);
		input.click(function() {
			return false;
		});
		// 获取焦点
		input.trigger("focus");
		// 文本框失去焦点后提交内容，重新变为文本
		input.blur(function() {
			var newtxt = $(this).val();
			// 判断文本有没有修改
			if (newtxt != txt) {
				td.html(newtxt);
			} else {
				td.html(newtxt);
			}
		});
	});
}
//多数据源测试
function initdata2() {
	//initspreadcode();
	var moulddataId = [
		"d0163b5f-1999-5d19-21cc-69029342ceaf",
		"6ac7ca60-26a5-a3b2-9861-616cb14b2e00"
		];
		var aaa = 1;
	for(var aa in Models){
		
		$dataServiceProxy.invokeMethod('Genersoft.SCM.PSKB.Core.PSKBJsReport','GetObjectDatas',[Models[aa],moulddataId[aa]]).then(function(result){
			
			if(result){
				console.log(result.data);
				var flag = true;
				for(var a in result.data){
					if(flag){
						for(var b in result.data[a][0]){
							objectdata[a+"_"+b] = result.data[a][0][b];
						}
					}else if(a.indexOf("List") === -1){
						objectdata[a] = result.data[a];
					}
					flag = false;
				}
				console.log(aaa);
				if(aaa == Models.length){
					console.log(objectdata);
					loadingData2(objectdata);
				}
				aaa += 1; 
			}
		});
	}
}

function initdata() {
	initspreadcode();
	 objectdata = {};
	var moulddataId = [
		//"d0163b5f-1999-5d19-21cc-69029342ceaf",
		"6ac7ca60-26a5-a3b2-9861-616cb14b2e00"];
	for(var a in Models){
		$dataServiceProxy.invokeMethod('Genersoft.SCM.PSKB.Core.PSKBJsReport','GetObjectDatas',[Models[a],moulddataId[a]]).then(function(result){
			console.log(result.data);
			var flag = true;
			for(var a in result.data){
				if(flag){
					for(var b in result.data[a][0]){
						objectdata[b] = result.data[a][0][b];
					}
				}else{
					objectdata[a] = result.data[a];
				}
				flag = false;
			}
		
		});
	}
	console.log(objectdata);
	 loadingData(objectdata);
}

//多数据源测试
function loadingData2(data){
	spreaddata = "";
	if (data) {
		spreaddata = data;
		if(formsheet){
			spreadss.suspendPaint();
			$dataServiceProxy.invokeMethod('Genersoft.SCM.PSKB.Core.PSKBJsReport','GetMouldField',[mouldID]).then(function(result){
				for(var a in result.data.Table){
					var filedText = result.data.Table[a].JSRFTEXT;
					var htmlcode = filedText+";";
					console.log(htmlcode);
					eval(htmlcode);
				}
			});
			console.log(spreaddata);
			for(var p in spreaddata){
				  if(Array.isArray(spreaddata[p]) && datamouldlist.indexOf(p)> -1){
						var tableColumns = [], 
					    names = [],
					    labels = [];
						var table = formsheet.tables.findByName(p);
						if(table){
							table.autoGenerateColumns(false);
							var tableValue = table.getSlicerData();
							labels = tableValue.columnNames;
							
							var tabledata = tableValue.data[0];
							tabledata.forEach(function (name, index) {
								if(name.value){
									var str = name.value;
									var strd = str.substring(1,str.length-1);
									 names.push(strd.split(".")[1]);
								}
							 });
							 labels.forEach(function (name, index) {
								 var tableColumn = new GC.Spread.Sheets.Tables.TableColumn();
								 tableColumn.name(name);
								 tableColumn.dataField(names[index]);
								 tableColumns.push(tableColumn);
							 });
							 table.bindColumns(tableColumns);
							 table.bindingPath(p);
						}
				   }
				}
			
			spreadss.resumePaint();
			var source = new GC.Spread.Sheets.Bindings.CellBindingSource(spreaddata);
			formsheet.setDataSource(source);
			
		}
		showTip("加载数据成功！", "info");
	}

}

function loadingData(data){
	spreaddata = "";
	if (data) {
		spreaddata = data;
		if(formsheet){
			spreadss.suspendPaint();
			for(var a in spreadcode){
				var htmlcode = spreadcode[a]+";";
				console.log(htmlcode);
				eval(htmlcode);
			}
			for(var p in spreaddata){
				  if(Array.isArray(spreaddata[p]) && datamouldlist.indexOf(p)> -1){
						var tableColumns = [], 
					    names = [],
					    labels = [];
						var table = formsheet.tables.findByName(p);
						if(table){
							table.autoGenerateColumns(false);
							var tableValue = table.getSlicerData();
							labels = tableValue.columnNames;
							
							var tabledata = tableValue.data[0];
							tabledata.forEach(function (name, index) {
								if(name.value){
									var str = name.value;
									var strd = str.substring(1,str.length-1);
									console.log(strd);
									 names.push(strd.split(".")[1]);
								}
							 });
							 labels.forEach(function (name, index) {
								 var tableColumn = new GC.Spread.Sheets.Tables.TableColumn();
								 tableColumn.name(name);
								 tableColumn.dataField(names[index]);
								 tableColumns.push(tableColumn);
							 });
							 table.bindColumns(tableColumns);
							 table.bindingPath(p);
						}
				   }
				}
			
			spreadss.resumePaint();
			var source = new GC.Spread.Sheets.Bindings.CellBindingSource(spreaddata);
			console.log(source);
			formsheet.setDataSource(source);
			
		}
		showTip("加载数据成功！", "info");
	}

}
// function setRowAndCol(key) {
// 	datakey = key;
// }