var Stripcheck = {
	options : {
		selector : {
			type : ''
		}
	},
	init : function() {
		$(document).on("ready", 	Stripcheck.selectPlugin);
		$(document).on("ready",     Stripcheck.datePicker);
		$(document).on("ready", 	Stripcheck.datePickerMask);
		$(document).on("ready",		Stripcheck.footerPopUp);
		
		$(document).on("click",  ".completionItem", Stripcheck.completionForm);
		$(document).on("click",  ".scheckbtn", Stripcheck.checkToggle);
		
	},
	
	timepicker : function(){ 
	    $(".time_format").inputmask("hh:mm"); 
	},
	datePicker : function() {
		$('.date-picker').datepicker({ format : 'yyyy.mm.dd', "setDate": new Date(), autoclose : true, todayBtn: "linked", todayHighlight: true });
	},
	datePickerMask : function(){ 
	    $('.dates_format').inputmask("yyyy.mm.dd");
	},
	
	checkToggle : function(){
		var tr = $(this).parent().parent();
		var td = $(this).parent();
		var id = tr.find(".completionId").val();
		if(id != null && id != ""){
			Cmmn.request('/stripcheck/toggle/', 'GET', {id : id}).then(function(data, textStatus) {				
				if (textStatus === 'success') {
					if(data == true){
						td.html('<a class="scheckbtn"><span class="glyphicon glyphicon-ok"></span></a>');
						tr.addClass("checkfalse");
						tr.removeClass("checktrue");
					} else {
						td.html('<a class="scheckbtn"><span class="glyphicon glyphicon-remove"></span></a>');
						tr.addClass("checktrue");
						tr.removeClass("checkfalse");
					}
				} else {
					console.log("failed");
				}
			});
		}
	},

	completionForm : function(){
		var id = $(this).parent().find(".completionId").val();
		if(id != null && id != ""){
			Cmmn.requestHtml('/stripcheck/route', 'GET', {id : id}).then(function(data, textStatus) {
				if (textStatus === 'success') {
					$("#completion").html(data);
				} else {
					console.log("failed");
				}
			});
		}
	},
	
	footerPopUp : function() {
        
	}
}

$(function() {
	Stripcheck.init();
});