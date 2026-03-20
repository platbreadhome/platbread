$(document).ready(function(){
    /*모달테스트용으로 띄우도록*/
    $(function(){
        for(let i = 1; i<=100;  i++){

            $('#modal-num' + i).click(function(){
                $('.modal-overlay').css('display','block');
                $('.modal-overlay .modal:nth-of-type('+ i +')').css('display','flex');
                console.log('modal');
            });

            // $('#loading-num' + i).click(function(){
            //     $('.loading-overlay').css('display','block');
            //     $('.loading-overlay .loading:nth-of-type('+ i +')').css('display','flex');
            //     console.log('progress');
            // });

            //  $('#progress-num' + i).click(function(){
            //     $('.progress-overlay').css('display','block');
            //     $('.progress-overlay .progress:nth-of-type('+ i +')').css('display','flex');
            //     console.log('loading');
            // });
        }
    });

    $(function () {
  function openDimmed(selectorList, index) {
    const $overlay = $('.dimmed-overlay');
    // 1) 전체 초기화
    $overlay.show().children().hide();

    // 2) 각 후보 중 "해당 클래스 집합"에서만 인덱싱하여 표시
    //    (index는 1부터 들어오므로 -1)
    selectorList.forEach(sel => {
      $overlay.find(sel).eq(index - 1).css('display', 'flex');
    });
  }

  for (let i = 1; i <= 100; i++) {
    // progress-numX → .progress 중 X번째만
    $('#progress-num' + i).on('click', function () {
      openDimmed(['.progress'], i);
      console.log('progress ' + i);
    });

    // loading-numX → .loading 중 X번째만
    $('#loading-num' + i).on('click', function () {
      openDimmed(['.loading'], i);
      console.log('loading ' + i);
    });
  }
});
    
    /* ************************
    * 
    ************************ */

    /*모달창 리사이즈*/
    $(".resizable-bar").mousedown(function(e){
        var $resizable = $(this).closest('.resizable');
        e.preventDefault();
        var isResizing = true;
        var lastDownY = e.clientY;
        var offset = $resizable.offset();
        
        $(document).mousemove(function(e){
          if (!isResizing) return;
          $resizable.height(e.clientY - offset.top);
        }).mouseup(function(){
          isResizing = false;
        });
      });
    
    
    
    $('.--minimize-re').click(function(){
        var data_minimize = $(this).attr('data-minimize'); 
        console.log('.data-minimize-'+data_minimize);
        $('.data-minimize-'+data_minimize).toggleClass('--minimize');
    });
        

    /*판넬 닫침/펼침일때 화살표시 변경 */
    $('.wrap-toggle').click(function(){
        $(this).find('.eicon-chevron-right').toggleClass('eicon-chevron-left');
        $(this).find('.eicon-chevron-down').toggleClass('eicon-chevron-up');
        $(this).find('.eicon-chevron-up').toggleClass('eicon-chevron-down');
    });

    /*초기화버튼 화살표 spin */
    $('.btn-reset').click(function(){
        $(this).children('i').addClass('spin');           
        setTimeout(function(){			
            $('.btn-reset').children('i').removeClass('spin');
        },500);
    });

    

    /*인구범위 슬라이더 움직일때 툴팁보여주기*/
    $('.range-wrap').is(function(){
        var slideValue = $('.tooltiptext');
        var inputSlider = $('.form-range');

        $(inputSlider).on("propertychange change keyup paste input", function(){
            var txtvalue = $(inputSlider).val();
            $(slideValue).css('left', txtvalue + "%");
        });
    });
    
    

    
    
});