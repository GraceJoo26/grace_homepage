(function($){
    $.ajax({
      url:'../data/portfolio.json',
      dataType:'json',
      context:document.body
    }).done(function(data){
      var portfolio = data;


      
    var win = $(window);
    var winH = win.outerHeight();
    
    var headBox = $('#headBox');
    var h1=headBox.children('h1');
    
    var frontImg = headBox.find('.front_image');
    var backImg = headBox.find('.back_image');
  
    var setN = 1.5;
  
    // 브라우저 스크롤시 수행
    
    win.on('scroll', function(){
      var winSt = $(this).scrollTop();
      var per = winSt / winH;
      var per_02= (winSt/winH)-0.01;
      var scaleR = 1+per;
      var scaleM= 1+per_02;
      var opacityR;
    
      //4.logo사라지게 만들기
      //5.logo사라지는 동안 앞에 투명막 생긱게 하기

  var logoR = 0.5;
  if(per >= logoR){
   logoPer = (1 + logoR) - per;    
   h1.css({opacity: logoPer, transform:'scale('+ (logoR + per) + ')' });
    
   headBox.addClass('default');
  }else{
      headBox.removeClass('default');
  }
    
    
      // 1. frontImg가 점점 커지게( transform:scale() );
    // 2. 점점 사라지게
    opacityR = setN + 1 - per; 
      if(scaleR <= setN){
        // console.log('scale: ', 1 + per);
        frontImg.css({transform:'scale(' + scaleM + ')'});

      }else if(scaleR >= setN + 1){      
        // console.log('opacity: ', opacityR+1);
          
        frontImg.css({opacity: opacityR});
        backImg.css({opacity:opacityR});
      }
  
      //6. frontImg의 투명도가 0이되면 headBox사라지게 만들기
      if(opacityR<0){
          headBox.hide();
      }else{headBox.show();}
      //
  
     // 3. 비행기 나타나면서 올라가기
     if(scaleR > setN){
        var airPer = (scaleR - setN) * 100;
       
        airPer = (scaleR - setN) * 100;
        // console.log( airPer );
        backImg.css({backgroundPositionY: -(airPer) + 'px'})
        
      }
  
    }); // win.on('scroll')

    
 //----- portWrap_배열
 var insertCode='<dl class="portBox"><dt><span class ="hidden_context">사진</span></dt><dd class="name"></dd><dd class="period"></dd><dd class="participant"></dd><dd class="size"></dd><dd class ="language"></dd><div class="pTagWrap"><p class="detailInfo"><a href="#">상세설명</a></p><p class="homepage"><a href="#">홈페이지</a></p></div></dd></dl>';
 var portWrap=$('.portWrap');
 var url='../img/'
 

 var homepage;
 var detailInfo;
 var portDl;
 
 //----- for문으로 앞으로 만들게 될 포트폴리오도 처리할 수 있게 json에서 불러오기
 var i = 0;
 for(; i < portfolio.length; i+=1){
   portWrap.append(insertCode);
   portDl = portWrap.children('dl').eq(i);
   homepage = portDl.find('.homepage');
   detailInfo = portWrap.find('.detailInfo');
   portWrap.find('dt').eq(i).css({'backgroundImage':'url(' + url + portfolio[i].picture + ')'});
   portWrap.find('.name').eq(i).text(portfolio[i].name);
   portWrap.find('.period').eq(i).text(portfolio[i].period);
   portWrap.find('.participant').eq(i).text(portfolio[i].hmany);
   portWrap.find('.size').eq(i).text(portfolio[i].device);
   portWrap.find('.language').eq(i).text(portfolio[i].language);
   portWrap.find('homepage').eq(i).text();
   homepage.find('a').attr({'href': portfolio[i].url , 'target':'_blank'});
   detailInfo.find('a').eq(i).attr({'href': portfolio[i].url_02 , 'target':'_blank'});
   
   
   //마우스 올렸을 때 class 없애기
   homepage.find('a').on('mouseenter focus',function(e){
    e.preventDefault();
    $(this).addClass('on');
  
});
    homepage.find('a').on('mouseleave blur', function(){
    $(this).removeClass('on');
})
    detailInfo.find('a').on('mouseenter focus',function(e){
      e.preventDefault();
      $(this).addClass('on');
    
    });
      detailInfo.find('a').on('mouseleave blur', function(){
      $(this).removeClass('on');
    })

 }

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








  
});


  })(jQuery);