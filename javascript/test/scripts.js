/*
 * Javascript
 */

$(document).ready(function()
{	
	console.log('hey its jq');
	/****INFINITE SCROLL****/
	// infinitescroll() is called on the element that surrounds 
	// the items you will be loading more of
	  $('#blog').infinitescroll({
	 
	    navSelector  : "div#pagination",            
	                   // selector for the paged navigation (it will be hidden)
	    nextSelector : "div#pagination a:first",    
	                   // selector for the NEXT link (to page 2)
	    itemSelector : "#blog div.single-entry"
	      
	                   // selector for all items you'll retrieve
	  },function(){
	  	$('.view-post','#blog .segment.post').off('click');
	  	afteritsdone();
	  });
	  
	  afteritsdone();
	  
		function afteritsdone(){
			console.log("expanding opened");
			
			/***** EXPAND/COLLAPSE BLOG ENTRY ******/
			var $scrollTo = 0;
			$('.view-post','#blog .segment.post').click(function(){
				console.log('times ran')
				$this = $(this).parents('.single-entry');
				if($this.find('.opened-post').is(":visible")){
					//CLOSE IT
					console.log('its closing!');
					$this.find('.view-post .collapse').css({'display':'none'}).siblings('span.expand').css({'display':'block'});
					$this.find(".centered-wrap","#blog .opened-post").animate({opacity:0},function(){
						$this.find('.opened-post').hide(500);
					});
				}else{
					//OPEN IT
					console.log('its opening');
					$this.find('.view-post .expand').css({'display':'none'}).siblings('span.collapse').css({'display':'block'});
					$this.find('.opened-post').show(500,function(){
						$scrollTo = $this.find('.opened-post').offset();
						if($(window).width() > 1024){
							$("html,body").animate({scrollTop:$scrollTo.top},function(){
								 resize_video();
								$this.find(".centered-wrap","#blog .opened-post").animate({opacity:1});
							});
						}else{
							if(/Android|webOS|iPhone|iPad|iPod|BlackBerry/i.test(navigator.userAgent)){
								$("html,body").animate({scrollTop:$scrollTo.top-70},function(){
									 resize_video();
									$this.find(".centered-wrap","#blog .opened-post").animate({opacity:1});
								});
							}else{
								if($(window).width() > 700){
									$("html,body").animate({scrollTop:$scrollTo.top},function(){
										 resize_video();
										$this.find(".centered-wrap","#blog .opened-post").animate({opacity:1});
									});
								}else{
									$("html,body").animate({scrollTop:$scrollTo.top-70},function(){
										 resize_video();
										$this.find(".centered-wrap","#blog .opened-post").animate({opacity:1});
									});
								}
							}
						}
						console.log($scrollTo.top);				
					});
				}		
			});
			/***** END EXPAND/COLLAPSE BLOG ENTRY ******/
		}

	
	/****PLACEHOLDER****/
		
		$('#holla-form input, #holla-form textarea').each(function()
		{
			$(this).val($(this).attr('placeholder'));
			$(this).attr('placeholder','');
			
			var $this = $(this);
			var $placeholder = $this.val();
			
			$this.focus(function()
			{
				if($this.val() == $placeholder)
				{
					$this.val('');
				}
				$this.addClass('activated');
			}).blur(function()
			{
				if(($this).val() == '')
				{
					$this.val($placeholder);
					$this.removeClass('activated');
					$placeholder = $this.val();
				}
			});
		});				$('.holla-form input, .holla-form textarea, .holla-form select').each(function()		{			if($(this).attr('type') != 'submit') {								var $this = $(this);								$this.focus(function()				{					$this.parents('.gfield').addClass('gfield-active');				}).blur(function()				{					if(($this).val() == '')						$this.parents('.gfield').removeClass('gfield-active');				});								if(($this).val() != '')					$this.parents('.gfield').addClass('gfield-active');			}		});
		
	/*** END PLACEHOLDER ***/ 
	/*********** RESIZING WINDOW STUFF ************/
	win = $(window);
	$(function(){
		//DID PAGE LOAD IN MOBILE VIEW OR STANDARD VIEW
		if ( win.width() < 900) {
		   var animMobile = false;
		   var animWeb = true;
		}
		else {
		   var animMobile = true;
		   var animWeb = false;
		};
		
		// RUN FUNCTION TO ANIMATE IN NEW MENUS
		win.resize(function() {
		  if (win.width() < 884) {
		     if(animMobile == true){
		     	animMobile = false;
		     	animWeb = true;
		     	animateMobile();
		     }    
		  }
		 else {
		 	if(animWeb == true){
		 		animWeb = false;
		 		animMobile = true;
		 		animateWeb();
		 	}   
		 }
		});	
	});
	
	function animateMobile(){
		$('#mobile-nav').css('display','block');
		$('#mobile-expand').css('display','none');
	//	console.log('animate mobile says: I FIRED!');
	};	
	function animateWeb(){
		if(!/Android|webOS|iPhone|iPad|iPod|BlackBerry|Silk/i.test(navigator.userAgent)){
			$('#mobile-nav').css('display','none');
			$('#mobile-expand').css('display','none');
			$('#hidden-nav').css({'width':'0px','display':'none'});
		//	console.log('animate web says: I FIRED!');
		};	
	};
	
//	alert(navigator.userAgent);
	/************** INDEX ****************/
	//center callout content;
	if(win.width() < 900){
		var $calloutHeight = $('#highlight-content').height();
		$('#highlight-content').css({'margin-top':-($calloutHeight/2)})
	}else{
		var $calloutHeight = $('#highlight-content').height();
		var $footerHeight = $('footer').height();
		$('#highlight-content').css({'margin-top':-($calloutHeight/2)-($footerHeight/2)});
	};
	
	if($('#highlight-content').length == 1){
		win.resize(function() {
			if(win.width() < 900){
				var $calloutHeight = $('#highlight-content').height();
				$('#highlight-content').css({'margin-top':-($calloutHeight/2)})
			}else{
				var $calloutHeight = $('#highlight-content').height();
				var $footerHeight = $('footer').height();
				$('#highlight-content').css({'margin-top':-($calloutHeight/2)-($footerHeight/2)})
			}
		});
	}
	
	/************************* START SLIDESHOW **********************/
	var $nextSlide = 0;
	var $processing = false;
	//Setting some variables 
	var $slideCount = $('.slide','#slide-container').length;
	var $slideWidth = $('#about-images').width();
	var $containerWidth = $slideWidth * ($slideCount)
	// set initial slide width for browser size
	$('.slide','#slide-container').css({'width':$slideWidth});
	
	// header properties
	var $headContainerHeight = $('#about-headers').height();
	var $headHeight = $('li.current','#about-headers').height();
	var $headCenterDistance = ($headContainerHeight - $headHeight)/2;
	
	// resizing based on browser size
	if($('#slide-container').length > 0){
		win.resize(function(){
			$slideWidth = $('#about-images').width();
			$('.slide','#slide-container').css({'width':$slideWidth});
			var $tempHeight = $('li.current','#about-headers').height();
	//		console.log('header height',$tempHeight);
			var $tempCenterDistance = ($headContainerHeight - $tempHeight)/2;
			$('li.current','#about-headers').css({'top':$tempCenterDistance});
		});		
	}

	
	//set initial header center
	$('#about-headers li').css({'margin-top':'0'});
	$('li.current','#about-headers').css({'top':$headCenterDistance,});
	
	// on click actions 
	 $('.previous-button','#about-images').click(function(){
	 	if($processing == true){
	 		return false;
	 	}else{
	 		$processing = true;
	 		$nextSlide--;
	 		
		 	if($nextSlide < 0){
		 		$nextSlide = $slideCount - 1;
		 	}
		 	$('li.current', '#content-container').delay(20).animate({'opacity':'0'},function(){
				$(this).removeClass('current').css({'display':'none'});
				$('#content-container li:eq('+$nextSlide+')').css({'display':'block'}).delay(20).animate({'opacity':'1'},function(){
					$(this).addClass('current');
				});
			});
		 	$('#about-headers li.current').delay(20).animate({'left':$slideWidth},function(){
		 		$('#about-headers li.current').css({'opacity':'0'}).removeClass('current');
		 		$('#about-headers li:eq('+$nextSlide+')').addClass('next').css({'display':'block','top':'0','left':'0'}).delay(20).animate({'opacity':'1','top':(($headContainerHeight - $('li.next','#about-headers').height())/2)},function(){$processing = false;}).removeClass('next').addClass('current');
		 	});
			$('#slide-container li:eq('+$nextSlide+')').css({'left':-$slideWidth}).addClass('next').delay(20).animate({'left':'0'},function(){
				$('#slide-container li.current').removeClass('current');
				$(this).removeClass('next').addClass('current');
			});
	 	};
	 	
	 });
	 
	 $('.next-button','#about-images').click(function(){
	 	if($processing == true){
	 		return false;
	 	}else{
	 		$processing = true;
		 	$nextSlide++;
			if($nextSlide > ($slideCount - 1)){
				$nextSlide = 0;
			}
			$('li.current', '#content-container').delay(20).animate({'opacity':'0'},function(){
				$(this).removeClass('current').css({'display':'none'});
				$('#content-container li:eq('+$nextSlide+')').css({'display':'block'}).delay(20).animate({'opacity':'1'},function(){
					$(this).addClass('current');
				});
			});
			$('#about-headers li.current').delay(20).animate({'left':-$slideWidth},function(){
		 		$('#about-headers li.current').css({'opacity':'0'}).removeClass('current');
		 		$('#about-headers li:eq('+$nextSlide+')').addClass('next').css({'display':'block','top':'0','left':'0'}).delay(20).animate({'opacity':'1','top':(($headContainerHeight - $('li.next','#about-headers').height())/2)},function(){$processing = false;}).removeClass('next').addClass('current');
		 	});
			$('#slide-container li:eq('+$nextSlide+')').css({'left':$slideWidth}).addClass('next').delay(20).animate({'left':'0'},function(){
				$('#slide-container li.current').removeClass('current');
				$(this).removeClass('next').addClass('current');
			});	
	 	};
	 });
	 
	 /************************************ NEW CONTACT PAGE */
	$info = $('.contact-info','#cont');
	$form = $('.contact-form','#cont');
	$social = $('.social-feeds','#cont');
	$wrap = $('#cont');
	$bonus = $('.bonus-item','#cont');
	
	// ON LOAD RULES
	if($wrap.length == 1){
		if(win.width() > 1400){
			$leftheight = $info.height();
			$midheight = $form.height();
			$rightheight = $social.height();
			$wrapheight = Math.max($leftheight, $midheight, $rightheight);
			$wrap.css({'height':$wrapheight+70,}).children('.segment').css({'height':$wrapheight});
		}
		else if (win.width() < 1400 && win.width() > 1100){
			$leftheight = $info.height();
			$midheight = $form.height();
			$topheight = Math.max($leftheight, $midheight);
			$wrap.children('.contact-info, .contact-form').css({'height':$topheight});
			bonus3();
		}
		else if (win.width() < 1100 && win.width() > 400){
			bonus2();
		}
		else if (win.width() < 400){
		}
	}
	
	var $firstPass1 = true;
	var $firstPass2 = true;
	var $firstPass3 = true;
	var $firstPass4 = true;
	
	// ON RESIZE RULES
	if($wrap.length == 1){
		win.resize(function() {
		if(win.width() > 1400){
				$bonus.css({'display':'none'});
				$leftheight = $info.height();
				$midheight = $form.height();
				$rightheight = $('.social-feeds ul','#cont').height();
				$wrapheight = Math.max($leftheight, $midheight, $rightheight);
				$wrap.css({'height':$wrapheight+70}).children('.segment').css({'height':$wrapheight});		
		}
		else if (win.width() < 1400 && win.width() > 1100){
				$('.segment','#cont').css({'height':'auto'});
				$leftheight = $info.height();
				$midheight = $form.height();
				$topheight = Math.max($leftheight, $midheight);
				$wrap.children('.contact-info , .contact-form').css({'height':$topheight});
				$wrap.css({'height':'auto'});
				bonus3();		
		}
		else if (win.width() < 1100 && win.width() > 400){
				$('.segment','#cont').css({'height':'auto'});
				$wrap.css({'height':'auto'});
				bonus2();
		}
		else if (win.width() < 400){
				$('.segment','#cont').css({'height':'auto'});
				$wrap.css({'height':'auto'});
				$bonus.css({'display':'none'});
		}
		});
	}
	
		function bonus3(){
		$bonus.css({'display':'none'});
		var $heightSocial = $social.height();
		var $socialRows = $heightSocial/200;
		var $socialNum = ($('.social-feeds li','#cont').length)-1;
		var $leftOverSpace = ($socialRows*3)-$socialNum;
		if($leftOverSpace != 0 ){
			if($leftOverSpace == 1){
				$bonus.css({'display':'block','width':'33.33333%'});
			}else{
				$bonus.css({'display':'block','width':'66.66666%'});
			};
		};
	};
	
	function bonus2(){
		$bonus.css({'display':'none'});
		var $heightSocial = $social.height();
		var $socialRows = $heightSocial/200;
		var $socialNum = ($('.social-feeds li','#cont').length)-1;
		var $leftOverSpace2 = ($socialRows*2)-$socialNum;
		if($leftOverSpace2 == 1){
			$bonus.css({'display':'block','width':'50%'});
		}else{
			$bonus.css({'display':'none'});
		};
	}
	 
	/***** OPEN AND CLOSE MOBILE NAV *****/
	
	$('#mobile-expand #menu li a').click(function(event){
		if($(this).is(':contains("Work")')){
			event.preventDefault();
			$('#hidden-nav').css('display','block').delay(20).animate({'width':'130px'});
		};
	});
		
	$('.drop-nav','#mobile-nav').click(function(){
		$('#mobile-nav').css('display','none');
		$('#mobile-expand').css('display','block');
	});
	$('.close','#mobile-expand').click(function(){
		$('#mobile-nav').css('display','block');
		$('#mobile-expand').css('display','none');
		$('#hidden-nav').css({'width':'0px','display':'none'});
	});
	
	$('.work','#mobile-expand').click(function(){
		if(!/Android|webOS|iPhone|iPad|iPod|BlackBerry|Silk/i.test(navigator.userAgent)){
			$('#hidden-nav').css('display','block').delay(20).animate({'width':'130px'});
		}else{
			$('#hidden-nav').css({'display':'block','width':'130'});	
		};		
	});
	
	/***** CENTERING TITLES ON WORK *****/
	(function($){
        $(window).load(function(){
          if($('#work') != 0){
          	var titleHeight = 0;
			var $count = 0;
			$('.video','#work').each(function(){
				titleHeight = $('.work-info h2',this).outerHeight(true);
			//	console.log('title height:', titleHeight);
				buttonHeight = $('.work-info a',this).outerHeight(true);
			//	console.log('button height:',buttonHeight);
				centerPadding = (260-(titleHeight + buttonHeight))/2;
			//	console.log(centerPadding);
				$('.work-info h2',this).css({'padding-top':centerPadding});
				$('.work-info a', this).addClass('inactive-on-mobile');
			});
          }
        });
    })(jQuery);

		if($('#work') != 0){
			$('.video','#work').click(function(){
				$('.work-info .inactive-on-mobile',this).removeClass('inactive-on-mobile');
				$(this).siblings().find('.work-info a').addClass('inactive-on-mobile');
			})
        };
        
	
	/**** STACK FOOTER ****/
	
	/*********** ON LOAD RULES **********/
	$(window).load(function(){
	    
	    var lis = $('li','#footer-content #connect');
	    
	    for(var i = 0; i < lis.length; i+=5) {
		  lis.slice(i, i+5).wrapAll("<div class='new'></div>");
		}
		
		if($(window).width() < 480){
		 	var lis = $('li','#footer-content #connect');
	    	
			lis.each(function(){
				if($(this).index()%5 == 0 && $(this).index() != 0){
					$(this).css({'display':'none'})
				}
			})

			var longestDiv = $('div.new').longestdiv();
			$('#connect','#footer-content').css({'width':longestDiv+20})
	    }
		
	});
	 
	 /********* ON RESIZE RULES *********/
	$(window).resize(function() {
	    if($(window).width() > 480){
	    	$('li','#footer-content #connect').css({'display':'inline-block'});
	    	$('#connect','#footer-content').css({'width':'auto'})
	    }else{
	    	var lis = $('li','#footer-content #connect');
	    	
			lis.each(function(){
				if($(this).index()%5 == 0 && $(this).index() != 0){
					$(this).css({'display':'none'})
				}
			})
			
			var longestDiv = $('div.new').longestdiv();
			$('#connect','#footer-content').css({'width':longestDiv+20})
	    }
	});
	
	/******** GETS THE LENGTH OF THE LONGEST DIV **********/
	(function( $ ){
		$.fn.longestdiv = function() {
			var max = 0;
			this.each(function() {
				max = Math.max( max, $(this).width() );
			});
			return max;
		};
	})( jQuery );
	
	/*********** IF UNDER 480 RULES *********/
	if($(window).width() < 480){
		var lis = $('li','#footer-content #connect');
		
		lis.each(function(){
			if($(this).index()%5 == 0 && $(this).index() != 0){
				$(this).css({'display':'none'})
			}
		})
	}
	
	
	
	   /***** RESIZE VIDEOS ******/
   $(window).load(function(){
	    /* do the resize on load */
	    resize_video();
	});
	 
	$(window).resize(function() {
	    resize_video();
	});
   
   function resize_video() {
	    $('.video iframe').each(function(){
	        var width = $(this).width();
	        var vidheight = (width * 0.5625);
	        $(this).css({height : vidheight});
	    });
   }
	
	/**** EASTER EGG ****/
	var keys     = [];
    var surfsup  = '83,85,82,70,83,32,85,80';
    var slugger  = '83,76,85,71,71,69,82';
	    
	     $(document)
        .keydown(
            function(e) {
                keys.push( e.keyCode );
                if ( keys.toString().indexOf( surfsup ) >= 0 ){
 
                    // do something when the konami code is executed
                console.log('hoorah!')
                $('#secret-container').css({'display':'block'});
                $('#shark').css({'display':'block'}).animate({'bottom':'-30px'},500,function(){
                	$('#shark').css({'display':'block'}).animate({'right':'100%'},3000,function(){
                		$(this).css({'display':'none','bottom':'-500px','right':'5%'});
                		$('#secret-container').css({'display':'none'});
                    	});
                    });
 
                    // empty the array containing the key sequence entered by the user
                keys = [];
            }else if ( keys.toString().indexOf( slugger ) >= 0 ){
 
                    // do something when the konami code is executed
                console.log('hoorah!')
                $('#secret-container').css({'display':'block'});
                $('#slugger').css({'display':'block'}).animate({'bottom':'-30px'},500,function(){
                	$('#slugger').css({'display':'block'}).animate({'right':'100%'},3000,function(){
                		$(this).css({'display':'none','bottom':'-500px','right':'5%'});
                		$('#secret-container').css({'display':'none'});
                    	});
                    });
 
                    // empty the array containing the key sequence entered by the user
                keys = [];
            }
        }
    );
	/**** MENU HIDE ****/

	if($('#work').length == 0){
		$('.link-subs').css({'display':'none'});
	}else{
		$('.work-menu').css({'height':'auto'}).addClass('open');
		$('.link-subs').css({'display':'block'});
	}
	
	$('.main-link','.work-menu').click(function(){
		if($(this).parent().hasClass('open')){
			$('.link-subs').css({'display':'none'});
			$(this).parent().css({'height':'35px'}).removeClass('open');
		}else{
			$(this).parent().css({'height':'auto'}).addClass('open');
			$('.link-subs').css({'display':'block'});
		}
			
		
	});
});
