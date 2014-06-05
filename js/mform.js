	
		function _onfocus(event){
			cheak_edit(event);
		}
		
		function _onblur(event){
			cheak_edit(event);
		}	
			
		function cheak_edit(event){
			var startval = ($('#'+event.id).attr('startval')!=null)?$('#'+event.id).attr('startval'):'';
			
			if (event.value == ""+startval) {
					$('#'+event.id).val($('#'+event.id).attr('defval'));
					$("#"+event.id).removeClass('edit_f_te');
					return;
				}
			
			if ($('#'+event.id).attr('defval') != null)
				if (event.value.length!=0){
					if ((event.value != $('#'+event.id).attr('defval'))){
							$("#"+event.id).addClass('edit_f_te');
						}else{
							$('#'+event.id).val(""+startval);
							$("#"+event.id).addClass('edit_f_te');
						}
				}else {
					$('#'+event.id).val($('#'+event.id).attr('defval'));
					$("#"+event.id).removeClass('edit_f_te');
				}
				$('#'+event.id).removeClass('edit_f_error');
		}
		


	function pushmsg(event) {
                var str = 'p=1';
				var sform=null; var ft='';
				var v = 0;
				$(event).parents('form').each(function(){
					sform =  this;
				});

				// vemail="true"
				$(sform).find("input[vemail*='true']").each(function(){
					if (validate($(this).val())==false){
						$(this).addClass('edit_f_error');
						v = 1;
					}
				});
				
				$(sform).find("input[vphone='true']").each(function(){
					if (validatephone($(this).val())==false){
						$(this).addClass('edit_f_error');
						v = 1;
					}
				});	
				
				$(sform).find("input[type='text'], textarea, select").each(function(){
					str +=  "&" + $(this).attr('id')+'='+encodeURIComponent(
					(($(this).attr('sname')!=null)?$(this).attr('sname'):$(this).attr('defval'))
					+':;:'+$(this).val());
					if (($(this).attr('defval')==$(this).val()) && ($(this).attr('require')!=null)){
						$(this).addClass('edit_f_error');
						v = 1;
					}
				});


				$(sform).find("input[type='radio']:checked, input[type='checkbox']:checked").each(function(){
					str += "&" + $(this).attr('id')+'='+encodeURIComponent(
					(($(this).attr('sname')!=null)?$(this).attr('sname'):$(this).attr('defval'))
					+':;:'+$(this).val());
				}); 

				if (v==1) return;
				
				ft = $(sform).find('.label_to').text();
				
				$(sform).children().hide();
				$(sform).find(".progressimg").show();
				
				
				str +=  "&tmes=" + encodeURIComponent(ft);
				

                $.ajax({
                    url: "ap_s/apushmsg.php",
                    data: str,
                    dataType: "jsonp",
                    success: function (data, textStatus) {
                      	 	if (data.error=="0"){
                       	 				$(sform).find(".progressimg").hide();
							$(sform).find('.label_sndok').show();
							$(sform).find('a[goal="true"]').click();
								}
                        	else {
								$(sform).find('.label_sndok').show();
                        	}		
                    },
                     error: 
					 function (request, status, error) {
        				alert('Error!');//alert(request.responseText);
    			}
				/*	 function () {
                        alert('Error!');
                    }*/
                });
}


	function validate(address) {
	   var reg = /^([A-Za-z0-9_\-\.])+\@([A-Za-z0-9_\-\.])+\.([A-Za-z]{2,4})$/;
	   if(reg.test(address) == false) {
		  return false;
	   }
	   return true;
	}
	

	function validatephone(phone) {
		var reg = /^\+?[+\-()\s\d]+$/;
		return reg.test(phone);
	}	

	
		
	function generateGuid() {
	    var result, i, j;
	    result = '';
	    for(j=0; j<32; j++) {
	        if( j == 8 || j == 12|| j == 16|| j == 20)
	            result = result + '-';
	        i = Math.floor(Math.random()*16).toString(16).toUpperCase();
	        result = result + i;
	    }
	    return result;
	}
	
	
	function bmf(){
	
		$("form").each(function(){
			$(this).find("input[type='text'], textarea").bind('focus', function() {
				_onfocus(this);
			});

			$(this).find("input[type='text'], textarea").bind('blur', function() {
				_onblur(this);
			});
			
			$(this).find('*').each(function(){
					if ($(this).attr('id')==null){
						$(this).attr('id',generateGuid() );
					} 
				});
			$(this).find("input[type='text'], textarea").each(function(){
						if ($(this).attr('sname')==null){
						$(this).attr('sname',$(this).attr('defval'));
					}
				});				
		});
	}
	
	function init_forms(){
		bmf();
	}
	
	$(function(){
               init_forms();
			  
    });
