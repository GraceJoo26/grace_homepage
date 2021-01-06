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
        
        
        for(; i <= pfizer.length -1; i++){
            codingBox.append(codingCode);
            var modalBox = codingBox.find('.modalBox');
            var html = codingBox.find('.html');
            var css = codingBox.find('.css');
            var jQuery = codingBox.find('.jQuery');
            
            html.eq(i).css({'backgroundImage' : 'url('+ codingUrl + pfizer[i].html + ')'});
            css.eq(i).css({'backgroundImage' : 'url('+ codingUrl + pfizer[i].css + ')'});
            jQuery.eq(i).css({'backgroundImage' : 'url('+ codingUrl + pfizer[i].jQuery + ')'});
            
            var exitBtn = codingBox.find('.exit');
            
    };
    
          exitBtn.on('click',function(e){
              e.preventDefault();
              modalBox.stop().hide();
          })
       
       

        
    })
})(jQuery);