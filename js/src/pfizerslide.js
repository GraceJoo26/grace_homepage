(function($){
    $.ajax({
        url:'../data/coding.json',
      dataType:'json',
      context:document.body
    }).done(function(file){
        var pfizer = file;


        var codingBox = $('#codingBox');
        var codingWrap = $('.codingWrap');
        var codingPicUl  = $('codingPicUl');
        
        var i = 0;
        var codingCode = '<div class = "modalBox"><ul class = "modalUl"><li class = "html">HTML</li><li class = "css">CSS</li><li class = "jQuery">jQuery</li></ul><div class = "jQuerylist"></div><li class = "exit"><a href = "#">닫기</a></li></div>';
        var codingUrl = '../../img/pfizer/coding/';
        var codingExplain = $('.coding_explain_02');
        
        
        for(; i <= pfizer.length -1; i++){
            codingBox.append(codingCode);
            var modalBox = codingBox.find('.modalBox');
            var html = codingBox.find('.html');
            var css = codingBox.find('.css');
            var jQuery = codingBox.find('.jQuery');
            
            html.eq(i).css({'backgroundImage' : 'url('+ codingUrl + pfizer[i].html + ')'});
            css.eq(i).css({'backgroundImage' : 'url('+ codingUrl + pfizer[i].css + ')'});
            jQuery.eq(i).css({'backgroundImage' : 'url('+ codingUrl + pfizer[i].jQuery + ')'});
            codingExplain.eq(i).text(pfizer[i].explain);
            
            var exitBtn = codingBox.find('.exit');
            
                };
               
               
         //slideBanner만들기
            
        var codingUl = $('.codingPicUl');
        var codingLi = codingUl.children('li');
        var cloneLi = codingLi.eq(-1).clone(true);
        var newUl = codingUl.prepend(cloneLi);
        var newLi = newUl.children('li');
        var newLen = newLi.length; 
         codingUl.css({'position':'relative' , 'marginLeft': -100 + '%', 'width': ( (100 * newLen)) + '%'  });
         newLi.css({width:(100/newLen)+'%'});
         newUl.css({'position':'relative' ,'left': -100 + '%' , 'width': ( (100 * newLen)) + '%'  });
        var prevbtn = $('.prev');
        var nextbtn = $('.next');
        var codingWrap = $('.codingWrap');
        var codingBtn = codingWrap.children('.coding_button');
        var modalBox = $('.modalBox');
        var slideN = 0;
    
              nextbtn.on( 'click', function(e){
                e.preventDefault();
                if( slideN >= codingLi.length -1 ){
                  slideN = -1;
                  codingUl.css({ left : ( slideN * -100 ) + '%' });
              }
              slideN+=1;
              codingUl.stop().animate({ left : ( slideN * -100 ) + '%' });

              codingBtn.on('click',function(e){
                e.preventDefault();
                if(modalBox.css("display") == "none"){
                    modalBox.eq(slideN).stop().show();
                    modalBox.eq(slideN).siblings().hide();
                    modalBox.eq(slideN).fadeIn();
                    modalBox.eq(slideN).find('.close').find('a').focus();
                    codingWrap.css({display : 'block'});
                }
            }); 

            });

            prevbtn.on('click',function(e){
              e.preventDefault();
              if(slideN <= -1){
                slideN = codingLi.length -1;
                codingUl.css({left: (-100 * slideN) + '%'});
              }
              slideN-=1;
                codingUl.animate({left: (-100 * slideN) + '%'});
            })





            exitBtn.on('click',function(e){
                e.preventDefault();
                modalBox.stop().hide();
            })
                  
                  
                  
                  
    })
})(jQuery);