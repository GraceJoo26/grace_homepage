(function($){
    $.ajax({
      url:'../data/portfolio.json',
      dataType:'json',
      context:document.body
    }).done(function(data){
      var portfolio = data;

console.log(portfolio);
      
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
        console.log( airPer );
        airPer = (scaleR - setN) * 100;
        // console.log( airPer );
        backImg.css({backgroundPositionY: -(airPer) + 'px'})
        
      }
  
    }); // win.on('scroll')

    
 //----- portWrap_배열
 var insertCode='<dl class="portBox"><dt><span class ="hidden_context">사진</span></dt><dd class="name"></dd><dd class="period"></dd><dd class="participant"></dd><dd class="size"></dd><dd class ="language"></dd><div class="pTagWrap"><p class="detailInfo"><a href="#">상세설명</a></p><p class="homepage"><a href="#">홈페이지</a></p></div></dd></dl>';
 var portWrap=$('.portWrap');
 var url='../img/'
 console.log(insertCode);
 
 //----- for문으로 앞으로 만들게 될 포트폴리오도 처리할 수 있게 json에서 불러오기
 var i = 0;
 for(; i < portfolio.length; i+=1){
   portWrap.append(insertCode);
   portWrap.find('dt').eq(i).css({'backgroundImage':'url(' + url + portfolio[i].picture + ')'});
   portWrap.find('.name').eq(i).text(portfolio[i].name);
   portWrap.find('.period').eq(i).text(portfolio[i].period);
   portWrap.find('.participant').eq(i).text(portfolio[i].hmany);
   portWrap.find('.size').eq(i).text(portfolio[i].device);
   portWrap.find('.language').eq(i).text(portfolio[i].language);


 }










    /* function setup(){
  window.addEventListener("DOMContentLoaded",generateSnowflakes,!1),
  window.addEventListener("resize",setResetFlag,!1)
}
function getSupportedPropertyName(a){
  for(var b=0;b<a.length;b++)
  if("undefined"!=typeof document.body.style[a[b]])
  return a[b];
  return null
}
function Snowflake(a,b,c,d){
  this.element=a,
  this.speed=b,
  this.xPos=c,
  this.yPos=d,
  this.counter=0,
  this.sign=Math.random()<.5?1:-1,
  this.element.style.opacity=.1+Math.random(),
  this.element.style.fontSize=12+50*Math.random()+"px"
}
function setTranslate3DTransform(a,b,c){
  var d="translate3d("+b+"px, "+c+"px, 0)";
  a.style[transformProperty]=d
}
function generateSnowflakes(){
  var a=document.querySelector(".snowflake"),
  b=a.parentNode;
  browserWidth=document.documentElement.clientWidth,
  browserHeight=document.documentElement.clientHeight;
  for(var c=0;c<numberOfSnowflakes;c++){
    var d=a.cloneNode(!0);b.appendChild(d);
    var e=getPosition(50,browserWidth),
    f=getPosition(50,browserHeight),
    g=5+40*Math.random(),
    h=new Snowflake(d,g,e,f);
    snowflakes.push(h)
  }
  b.removeChild(a),moveSnowflakes()
}
function moveSnowflakes(){
  for(var a=0;a<snowflakes.length;a++){
    var b=snowflakes[a];b.update()
  }
  if(resetPosition){
    browserWidth=document.documentElement.clientWidth,
    browserHeight=document.documentElement.clientHeight;
    for(var a=0;a<snowflakes.length;a++){
      var b=snowflakes[a];
      b.xPos=getPosition(50,browserWidth),
      b.yPos=getPosition(50,browserHeight)
    }
    resetPosition=!1
  }
  requestAnimationFrame(moveSnowflakes)
}
function getPosition(a,b){
  return Math.round(-1*a+Math.random()*(b+2*a))
}
function setResetFlag(a){
  resetPosition=!0
}
var requestAnimationFrame=window.requestAnimationFrame||window.mozRequestAnimationFrame||window.webkitRequestAnimationFrame||window.msRequestAnimationFrame,
transforms=["transform","msTransform","webkitTransform","mozTransform","oTransform"],transformProperty=getSupportedPropertyName(transforms),snowflakes=[],browserWidth,browserHeight,
numberOfSnowflakes=50,
resetPosition=!1;setup(),
Snowflake.prototype.update=function(){
  this.counter+=this.speed/5e3,
  this.xPos+=this.sign*this.speed*Math.cos(this.counter)/40,
  this.yPos+=Math.sin(this.counter)/40+this.speed/30,
  setTranslate3DTransform(this.element,Math.round(this.xPos),
  Math.round(this.yPos)),
  this.yPos>browserHeight&&(this.yPos=-50)
}; */
  
});


  })(jQuery);