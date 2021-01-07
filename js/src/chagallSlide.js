(function($){
    $.ajax({
        url:'../data/chagallcoding.json',
      dataType:'json',
      context:document.body
    }).done(function(file){
        var chagall = file;


        var chCodingBox = $('#ch_codingBox');
        var codingWrap = $('.codingWrap');
        
        var i = 0;
        var codingCode = '<div class = "modalBox"><ul class = "modalUl"><li class = "html">HTML</li><li class = "css">CSS</li><li class = "jQuery">jQuery</li></ul><div class = "jQuerylist"></div><li class = "exit"><a href = "#">닫기</a></li></div>';
        var codingUrl = '../img/chagall/coding/';
        var codingExplain = $('.ch_coding_explain_02');
        var explainUl, explainLi;
        var liCode = '<li></li>'
        
        
        
        for(; i <= chagall.length -1; i++){
            chCodingBox.append(codingCode);
            var modalBox = chCodingBox.find('.modalBox');
            var html = chCodingBox.find('.html');
            var css = chCodingBox.find('.css');
            var jQuery = chCodingBox.find('.jQuery');
            
            explainUl = codingExplain.children('ul');
            explainUl.append(liCode);
            var explainLi = explainUl.find('li');
            
            html.eq(i).css({'backgroundImage' : 'url('+ codingUrl + chagall[i].html + ')'});
            css.eq(i).css({'backgroundImage' : 'url('+ codingUrl + chagall[i].css + ')'});
            jQuery.eq(i).css({'backgroundImage' : 'url('+ codingUrl + chagall[i].jQuery + ')'});
            explainLi.eq(i).text(chagall[i].explain);

            var exitBtn = chCodingBox.find('.exit');
            
                };
        var cloneExplainLi = explainLi.eq(-1).clone(true);
         explainUl.prepend(cloneExplainLi);  
        var newExLi = explainUl.find('li');
         explainUl.css({position:'relative',marginLeft:-100+'%', width: (400 * newExLi.length)+'px'  });
         explainLi.css({width:(100/newExLi.length) + '%'});
         newExLi.css({width:(100/newExLi.length) + '%'});
               
         //slideBanner만들기
            
        var codingUl = $('.ch_codingPicUl');
        var codingLi = codingUl.children('li');
        var cloneLi = codingLi.eq(-1).clone(true);
        var newUl = codingUl.prepend(cloneLi);
        var newLi = newUl.children('li');
        var newLen = newLi.length; 
         
        codingUl.css({'position':'relative' , 'marginLeft': -100 + '%', 'width': ( (100 * newLen)) + '%'  });
         codingLi.css({width:(100/newLen)+'%'});
         newLi.css({width:(100/newLen)+'%'});
         /* newUl.css({'position':'relative' ,'left': -100 + '%' , 'width': ( (100 * newLen)) + '%'  }); */
        
        
         var prevbtn = $('.prev');
        var nextbtn = $('.next');
        var chCodingWrap = $('.ch_codingWrap');
        var codingBtn = chCodingWrap.children('.ch_coding_button');
        var modalBox = $('.modalBox');

        
        var slideN = 0;
    
              nextbtn.on( 'click', function(e){
                e.preventDefault();
                if( slideN >= codingLi.length -1 ){
                  slideN = -1;
                  codingUl.css({ left : ( slideN * -100 ) + '%' });
                  explainUl.css({ left : ( slideN * -100 + '%')});
              }
              slideN+=1;
              codingUl.stop().animate({ left : ( slideN * -100 ) + '%' });
              explainUl.stop().animate({ left: ( slideN * -100 ) + '%' });

              codingBtn.on('click',function(e){
                e.preventDefault();
                if(modalBox.css("display") == "none"){
                    modalBox.eq(slideN).stop().show();
                    modalBox.eq(slideN).siblings().hide();
                    modalBox.eq(slideN).fadeIn();
                    modalBox.eq(slideN).find('.close').find('a').focus();
                    chCodingWrap.css({display : 'block'});
                    codingExplain.css({display : 'block'});
                    codingExplain.eq(slideN).text();
                }
              }); 
            });

            prevbtn.on('click',function(e){
              e.preventDefault();
              if(slideN <= -1){
                slideN = codingLi.length -1;
                codingUl.css({left: (-100 * slideN) + '%'});
                explainUl.css({ left : ( slideN * -100 + '%')});
              }
              slideN-=1;
                codingUl.animate({left: (-100 * slideN) + '%'});
                explainUl.stop().animate({ left: ( slideN * -100 ) + '%' });
            })
            


        

            exitBtn.on('click',function(e){
                e.preventDefault();
                modalBox.stop().hide();
            })
                  
                  
                  
                  
    })
})(jQuery);