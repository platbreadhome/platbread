$(document).ready(function(){
    
    /*모달테스트용으로 띄우도록*/
    $(function(){
        for(let i = 1; i<=100;  i++){

            $('#modal-num' + i).click(function(){
                $('.modal-overlay').css('display','block');
                $('.modal-overlay .modal:nth-of-type('+ i +')').css('display','flex');
                console.log('c');
            });
        
        }
        
    });

    /* ************************
    * 공통UI 스크립트
    ************************ */

    var $j360 = jQuery.noConflict();
    $j360( function() {            

        $j360('.daterange-double input[name="daterange"]').daterangepicker({
         
        opens: 'center',
        locale: {
            format: 'YYYY-MM-DD',
            "separator": " ~ ", //시작일시와종료일시구분자
            "format":'YYYY-MM-DD', //일시노출포맷
            "applyLabel":"확인",//확인버튼텍스트
            "cancelLabel":"취소", //취소버튼텍스트
            "daysOfWeek":["일","월","화","수","목","금","토"],
            "monthNames":["1월","2월","3월","4월","5월","6월","7월","8월","9월","10월","11월","12월"]
        },
        timePicker:false,//시간노출여부
        showDropdowns:true, //년월수동설정여부
        autoApply:false, //확인/취소버튼사용여부
        timePicker24Hour:true, //24시간노출여부(ex>true:23:50,false:PM11:50)
        timePickerSeconds:true, //초노출여부
        singleDatePicker:false,  //하나의달력사용여부
        //utoUpdateInput :false, //사용자가 날짜를 선택하기 전까지는 아무날짜도 안보이게 설정
            "buttonClasses": "btn btn-default btn-radius",

        });

       
           
        $j360('.daterange-single input[name="daterange"]').daterangepicker({
            opens: 'center',
            locale: {
                format: 'YYYY-MM-DD',
                "applyLabel":"확인",//확인버튼텍스트
                "cancelLabel":"취소", //취소버튼텍스트
                "daysOfWeek":["일","월","화","수","목","금","토"],
                "monthNames":["1월","2월","3월","4월","5월","6월","7월","8월","9월","10월","11월","12월"]
            },
            timePicker:false,//시간노출여부
            showDropdowns:true, //년월수동설정여부
            autoApply:true, //확인/취소버튼사용여부
            timePicker24Hour:true, //24시간노출여부(ex>true:23:50,false:PM11:50)
            timePickerSeconds:true, //초노출여부
            singleDatePicker:true,  //하나의달력사용여부
            // "buttonClasses": "btn"
        });

        /* ---------------daterange 달 선택 가능하도록 커스텀-------------*/
        $('.daterange-month').each(function () {
            const $container = $(this); // 현재 컨테이너
            const $input = $container.find('input[name="daterange"]');
            const $button = $container.find('.btn');
    
            // 동적으로 Month Picker 생성
            const createMonthPicker = () => {
                const $modal = $("<div class='daterangepicker daterange-month-picker'>");
                const $calendar = $('<div>', { class: 'drp-calendar' });
    
                // 12개월 버튼 추가
                for (let i = 1; i <= 12; i++) {
                    const month = i.toString().padStart(2, '0'); // 두 자리로 포맷
                    $('<button>', {
                        class: 'month-btn btn btn-default',
                        'data-month': month,
                        text: `${i}월`,
                    }).appendTo($calendar);
                }
    
                $calendar.appendTo($modal);
                return $modal;
            };
    
            // Month Picker 추가 (input-group-append 뒤에 삽입)
            const $modal = createMonthPicker().insertAfter($container.find('.input-group-append'));
    
            // 디폴트 월 설정
            const setDefaultMonth = () => {
                const currentMonth = moment().format('MM'); // 현재 월
                const currentYear = moment().format('YYYY'); // 현재 연도
                $modal.find(`.month-btn[data-month="${currentMonth}"]`).addClass('active'); // 현재 월 활성화
                $input.val(`${currentYear}-${currentMonth}`); // 입력 필드에 디폴트 값 설정
            };
    
            // Month Picker 열기
            const openMonthPicker = () => {
                const offset = $input.offset();
                $modal.css({
                    top: $input.outerHeight(),
                }).show();
            };
    
            // Month Picker 닫기
            const closeMonthPicker = () => $modal.hide();
    
            // Input 클릭 시 Month Picker 열기
            $input.on('click', function (e) {
                e.preventDefault();
                openMonthPicker();
            });
    
            // Button 클릭 시 Month Picker 열기
            $button.on('click', function (e) {
                e.preventDefault();
                openMonthPicker();
            });
    
            // Month 버튼 클릭 시 값 설정
            $modal.on('click', '.month-btn', function () {
                const selectedMonth = $(this).data('month'); // 선택된 월
                const currentYear = moment().format('YYYY'); // 현재 연도
                const formattedDate = `${currentYear}-${selectedMonth}`; // YYYY-MM 포맷
                $input.val(formattedDate); // Input 값 설정
                $(this).siblings('.btn').removeClass('active');
                $(this).addClass('active');
                closeMonthPicker(); // Month Picker 닫기
            });
    
            // 외부 클릭 시 Month Picker 닫기
            $(document).on('click', function (e) {
                if (!$(e.target).closest($container).length && !$(e.target).closest($modal).length) {
                    closeMonthPicker();
                }
            });
    
            // 초기 설정
            setDefaultMonth();
        });
        /* ---------------daterange 달 선택 가능하도록 커스텀-------------*/


        // 달력버튼 클릭해도 기능가능하도록
        $('.daterange-single .btn').on('click', function() {
            $(this).closest('.daterange-single').find('input[name="daterange"]').focus();
        });
        $('.daterange-double .btn').on('click', function() {
            var myParents = $(this).parent().hasClass('dropdown-select');
            if( myParents == false){
                $(this).closest('.daterange-double').find('input[name="daterange"]').focus();
            }
            
        });
        // $('.daterange-month .btn').on('click', function() {
        //     $(this).closest('.daterange-month').find('input[name="daterange"]').focus();
        // });
        //드롭다운을 이용한 날짜

        function formatDate(date) {
            var d = new Date(date),
                month = '' + (d.getMonth() + 1),
                day = '' + d.getDate(),
                year = d.getFullYear();
    
            if (month.length < 2) month = '0' + month;
            if (day.length < 2) day = '0' + day;
    
            return [year, month, day].join('-');
        }
    
        // Function to update date range input
        function updateDateRange(days) {
            var today = new Date();
            var pastDate = new Date(today);
            pastDate.setDate(pastDate.getDate() - days);
    
            var dateRange = formatDate(pastDate) + ' ~ ' + formatDate(today);
            $('#dateDrop').closest('.daterange-double').find('input[name="daterange"]').val(dateRange);
        }
        // Click event for other dropdown items
        $('#dateDrop .dropdown-item').on('click', function() {
            var text = $(this).text();
            switch (text) {
                case '오늘':
                    updateDateRange(0);
                    break;
                case '1주일':
                    updateDateRange(7);
                    break;
                case '1개월':
                    updateDateRange(30);
                    break;
                case '2개월':
                    updateDateRange(60);
                    break;
                case '3개월':
                    updateDateRange(90);
                    break;
                case '6개월':
                    updateDateRange(180);
                    break;
                case '1년':
                    updateDateRange(365);
                    break;
                default:
                    break;
            }
        });
    });

    
    /*COLOR MODE*/
    $('.theme-mode').click(function() {
        const dataTheme = $('html').attr('data-theme');
        if (dataTheme === 'dark') {
            $('html').attr('data-theme', 'light');
            $(this).find('.eicon-mode-dark').attr('class','eicon-mode-white');
        } else {
            $('html').attr('data-theme', 'dark');
            $(this).find('.eicon-mode-white').attr('class','eicon-mode-dark');
        }
    });
    
    /*input checkbox name 동일값 전체선택*/
    // 전체 선택 체크박스 클릭 이벤트
    $('.all-check').on('change', function () {
        // 현재 체크박스의 name 값을 가져옴
        let name = $(this).attr('name');

        // 동일한 name 값을 가진 체크박스의 상태 동기화
        $(`input[name="${name}"]`).prop('checked', $(this).is(':checked'));
        });

        // 개별 체크박스 변경 이벤트
        $('input[type="checkbox"]').not('.all-check').on('change', function () {
            // 현재 클릭한 체크박스의 name 값을 가져옴
            let name = $(this).attr('name');

            // 동일한 name 값을 가진 체크박스들의 상태 확인
            let allChecked = $(`input[name="${name}"]`).length === $(`input[name="${name}"]:checked`).length;

            // 전체선택 체크박스의 상태 업데이트
            $(`.all-check[name="${name}"]`).prop('checked', allChecked);
        });
        
    /*input indetermiante*/
    $(function () {
        $(".--indeterminate:checkbox").prop("indeterminate", true);

        $(":checkbox").click(function () {
            if ($(this).is(":indeterminate")) {
                $(this).prop("indeterminate", false);
                $(this).prop("checked", true);
            }
        });
    });

    //숫자만입력
    $(".onlyNumber").keyup(function(event){
        if (!(event.keyCode >=37 && event.keyCode<=40)) {
        var inputVal = $(this).val();
        $(this).val(inputVal.replace(/[^0-9]/gi,''));
        }
    });
    //영문만입력
    $(".onlyAlphabet").keyup(function(event){
        if (!(event.keyCode >=37 && event.keyCode<=40)) {
        var inputVal = $(this).val();
        $(this).val(inputVal.replace(/[^a-z]/gi,''));
        }
    });
    //영문숫자만입력
    $(".notHangul").keyup(function(event){
        if (!(event.keyCode >=37 && event.keyCode<=40)) {
        var inputVal = $(this).val();
        $(this).val(inputVal.replace(/[^a-z0-9]/gi,''));
        }
    });
    //한글만입력
    $(".onlyHangul").keyup(function(event){
        if (!(event.keyCode >=37 && event.keyCode<=40)) {
        var inputVal = $(this).val();
        $(this).val(inputVal.replace(/[a-z0-9]/gi,''));
        }
    });

    /*input 비밀번호보기*/
    $('.form-pwd i').on('click',function(){
        $(this).toggleClass('active');
        if($(this).hasClass('active')){
            $(this).children().removeClass('eicon-eyes-close');
            $(this).children().addClass('eicon-eyes-open');
            $(this).prev('input').attr('type',"text");
        }else{
            $(this).prev('input').attr('type','password');
            $(this).children().addClass('eicon-eyes-close');
            $(this).children().removeClass('eicon-eyes-open');
        }
    });

    $( ".draggable-wrap" ).draggable({
        handle: ".draggable",
        containment: "parent"});

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

      //라디오버튼 체크 미체크
      document.querySelectorAll('input[type="radio"]').forEach(radio => {
        radio.addEventListener('click', function (e) {
            if (this.wasChecked) {
                this.checked = false;
                this.wasChecked = false;
            } else {
                document.querySelectorAll('input[type="radio"]').forEach(r => r.wasChecked = false);
                this.wasChecked = true;
            }
        });
    });
       
    //파일찾기 클릭시
    $('.custom-file-wrap .btn').on('click', function(){
        $(this).parents('.custom-file-wrap').find('.custom-file-input').click();
    });
    $('.custom-file-input').on('change', function() {
        var fileName = $(this).val().split("\\").pop();
        $('.custom-file-label').addClass("selected").html(fileName);
    });
    

    $('.dropdown .btn').click(function(){
        $(this).parent().children('.dropdown-menu').toggle();
    });

    $('.dropright').click(function(){
        var p = Math.round($(this).width() + 4);
        $(this).children('.dropdown-menu').css({
            'transform' : 'translate3d('+ p +'px, 0, 0)'
        });
    });
    $('.dropup').click(function(){
        var h = $(this).children('.dropdown-menu').outerHeight(true);
        var p = Math.round($(this).height() + h)*-1;
        $(this).children('.dropdown-menu').css({
            'transform' : 'translate3d(0,'+ p +'px, 0)'
        });
    });
    $('.dropleft').click(function(){
        
        if($(this).width() >= $('.dropdown-menu').width()){
            var p = Math.round($(this).width() + 4)*-1;
            $(this).children('.dropdown-menu').css({
                'transform' : 'translate3d(' + p +'px, 0, 0)'
            });
        }else if($(this).width() < $('.dropdown-menu').width()){
            var w = $(this).children('.dropdown-menu').outerWidth(true);
            var p = Math.round($(this).width()+( w - $(this).width()) + 4)*-1;
            $(this).children('.dropdown-menu').css({
                'transform' : 'translate3d(' + p +'px, 0, 0)'
            });
        }
    });
    
    /* ************************
    * 툴팁
************************ */   
$('.tooltip').hover(
    function () {
        let rect = $(this).get(0).getBoundingClientRect();

        let tooltipX = rect.left;
        let tooltipY = rect.top;
        let tooltipW = rect.width;
        let tooltipH = rect.height;

        console.log(tooltipX, tooltipY, tooltipW, tooltipH);

        const tooltip = $(this).children('.tooltiptext');

        // 올바른 클래스명 사용 & hasClass에서 점(.) 제거
        if ($(this).hasClass('tooltip-top')) {
        $(tooltip).css({
            'left': tooltipX + (tooltipW / 2) + 'px',
            'top': tooltipY + 'px'
        }).show();
        }else if($(this).hasClass('tooltip-bottom')){
            $(tooltip).css({
            'left': tooltipX + (tooltipW / 2) + 'px',
            'top': tooltipY + tooltipH + 'px'
        }).show();
        }else if($(this).hasClass('tooltip-left')){
            $(tooltip).css({
            'left': tooltipX + 'px',
            'top': tooltipY - (tooltipH / 2)+ 'px'
        }).show();
        }else if($(this).hasClass('tooltip-right')){
            $(tooltip).css({
            'left': tooltipX + tooltipW + 'px',
            'top': tooltipY - (tooltipH / 2) + 'px'
        }).show();
        }
    },
    function () {
    // 마우스 떠났을 때 툴팁 숨기기
    $(this).children('.tooltiptext').hide();
});
    
    /*dropdown select 기능*/
    $('.dropdown-select .dropdown-item').click(function(){        
        var txt = $(this).text();
        $(this).siblings().removeClass('active');
        $(this).addClass('active');
        $(this).parents('.dropdown-select').children('.btn').text(txt);
        $(this).parent('.dropdown-menu').toggle();
    });

     /*dropdown multi select - 여러개 멀티셀렉터여도 독립적으로 사용 가능*/
     function updateTitle(dropdown) {
        var selectedItems = [];
        dropdown.find(".dropdown-menu input[type='checkbox']:checked").each(function() {
            selectedItems.push($(this).siblings("label").children('span').text());
        });

        var defaultTitle = dropdown.find(".dropdown-toggle").data('default-title');
        if (selectedItems.length > 0) {
            dropdown.find(".dropdown-toggle").text(selectedItems.join(", "));
        } else {
            dropdown.find(".dropdown-toggle").text(defaultTitle);
        }
    }

    $('.dropdown-multiselect .dropdown-toggle').each(function() {
        $(this).data('default-title', $(this).text());
    });

    $(".dropdown-menu input[type='checkbox']").on("change", function() {
        var dropdown = $(this).closest('.dropdown-multiselect');
        if ($(this).attr('id').includes('check-all')) {
            var isChecked = $(this).is(':checked');
            dropdown.find(".dropdown-menu input[type='checkbox']").prop('checked', isChecked);
        }
        updateTitle(dropdown);
    });

    $(".dropdown-multiselect .dropdown-toggle").on('click', function() {
        var dropdown = $(this).closest('.dropdown-multiselect');
        updateTitle(dropdown);
    });

    /*tab 기능 - nav 중첩되어도 문제안됌*/
    $('.nav-wrap .nav-link').click(function(){
        var tab_id = $(this).attr('data-tab');
        // $(this).parents('.nav-wrap').find('.tab-content').removeClass('active');
        // $(this).parents('.nav-wrap').find('.nav-link').removeClass('active');
         
        $(this).closest('.nav-wrap').children('.tab-content').removeClass('active');
        $(this).closest('.nav-item').siblings().children('.nav-link').removeClass('active');
        
        $(this).addClass('active');
        $('.data-tab-'+tab_id).addClass('active');

        console.log('tabs!!');
    });

    /*모달창 alert창일 경우 modal-overlay에 modal-blur 추가*/
    $(function() {
        // .modal-alert의 display 상태를 체크하는 함수
        function checkModalDisplay() {
            if ($('.modal-alert').css('display') === 'flex') {
                $('.modal-overlay').addClass('modal-blur');
                console.log('blur');
            } else {
                $('.modal-overlay').removeClass('modal-blur');
                console.log('blur -');
            }
        }
    
        // 모든 버튼 클릭 시 checkModalDisplay 함수를 호출
        $('button, .modal-overlay').on('click', function() {
            checkModalDisplay();
        });
    
        // 페이지 로드 후 초기 상태 확인
        checkModalDisplay();
    
        // modal-alert의 상태가 변경될 때마다 확인
        $('.modal-alert').on('transitionend webkitTransitionEnd oTransitionEnd MSTransitionEnd', function() {
            checkModalDisplay();
        });
    });

    
    /*모달 닫기*/
    $('.modal-overlay').click(function(event) {
        // 클릭한 요소가 .modal이 아닐 때만 실행
        if (!$(event.target).closest('.modal-content').length) {
            $(this).children('.modal').css('display','none');
            $('.modal-overlay').fadeOut(); // 모달 숨기기
        }
    });
    $('.modal-header .close').click(function(){
        $(this).parents('.modal').css('display','none');
        $(this).parents('.modal-overlay').fadeOut(); 
    });

    /*모달 창내리기
    $('.modal-header .minimize').click(function(){
        $(this).parents('.modal').addClass('--minimize');
    });*/

    
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

    /*아코디언*/
    $('.accordion-title').is(function(){
        var hasActive = $(this).hasClass('active');

        if(hasActive){
            $(this).parents('.accordion-wrap').find('.accodion-content').css('display','block');
        }else{
            $(this).parents('.accordion-wrap').find('.accodion-content').css('display','none');
        }
    });
    $('.accordion-title').click(function(){
        $(this).toggleClass('active');
        $(this).parents('.accordion-wrap').find('.accodion-content').slideToggle();
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
    
    /*볼륨설정*/
    // 슬라이더 초기값에 따라 배경 및 스타일 업데이트
    $('[class*="soundVolume"] .form-range').each(function () {
        const $this = $(this);
        const value = $this.val();
        const min = $this.attr('min');
        const max = $this.attr('max');
        const percentage = ((value - min) / (max - min)) * 100;

        // 슬라이더 배경 업데이트
        $this.css('background', `linear-gradient(to right, var(--primary-100) ${percentage}%, #dee2e6 ${percentage}%)`);

        // 초기 텍스트 업데이트
        $this.closest("[class*='soundVolume']").find('.volume-txt').text(`Volume : ${value}`);

        // 아이콘 및 필터 스타일 업데이트
        const $icon = $this.closest("[class*='soundVolume']").find('.icon-container span');
        updateIconStyle($icon, value);
    });

    // 슬라이더 값에 따라 배경, 텍스트, 아이콘 스타일 업데이트
    $('[class*="soundVolume"] .form-range').on('input', function () {
        const $this = $(this);
        const value = $this.val();
        const min = $this.attr('min');
        const max = $this.attr('max');
        const percentage = ((value - min) / (max - min)) * 100;

        // 슬라이더 배경 업데이트
        $this.css('background', `linear-gradient(to right, var(--primary-100) ${percentage}%, #dee2e6 ${percentage}%)`);

        // 해당 슬라이더의 볼륨 텍스트 업데이트
        $this.closest("[class*='soundVolume']").find('.volume-txt').text(`Volume : ${value}`);

        // 아이콘 및 필터 스타일 업데이트
        const $icon = $this.closest("[class*='soundVolume']").find('.icon-container span');
        updateIconStyle($icon, value);
    });

    // 아이콘 클릭 시 슬라이더 값 0 설정 및 클래스 변경
    $('[class*="soundVolume"] .form-label').on('click', function () {
        const $label = $(this);
        const $slider = $label.closest("[class*='soundVolume']").find('.form-range');
        const $icon = $label.find('.icon-container span');

        // 슬라이더 값 0 설정
        $slider.val(0).trigger('input'); // Trigger input event to update background

        // 아이콘 및 필터 스타일 업데이트
        updateIconStyle($icon, 0);
    });

    // 아이콘 스타일 업데이트 함수
    function updateIconStyle($icon, value) {
        if (value > 0) {
            $icon.removeClass('eicon-volume-mute').addClass('eicon-volume-on');
            $icon.closest('.icon-container').css('filter', 'brightness(0) saturate(100%) invert(36%) sepia(30%) saturate(4133%) hue-rotate(219deg) brightness(97%) contrast(87%)');
        } else {
            $icon.removeClass('eicon-volume-on').addClass('eicon-volume-mute');
            $icon.closest('.icon-container').css('filter', 'brightness(0) saturate(100%) invert(50%) sepia(1%) saturate(0%) hue-rotate(141deg) brightness(96%) contrast(93%)');
        }
    }

    /*table 오름차순 내림차순 정렬 가능한 쿼리*/
    $(".tbl").each(function () {
        const $table = $(this);
        const $thead = $table.find("thead");

        $thead.find(".up, .down").on("click", function (e) {
            e.stopPropagation(); // th 클릭 방지
            const $btn = $(this);
            const isAsc = $btn.hasClass("up");
            const $th = $btn.closest("th");
            const colIndex = $th.index();
            const type = $th.data("type");
            const $tbody = $table.find("tbody");
            const rows = $tbody.find("tr").get();

            // 정렬
            rows.sort(function (a, b) {
            let A = $(a).children().eq(colIndex).text().trim();
            let B = $(b).children().eq(colIndex).text().trim();

            if (type === "number") {
                A = parseFloat(A);
                B = parseFloat(B);
            }

            if (A < B) return isAsc ? -1 : 1;
            if (A > B) return isAsc ? 1 : -1;
            return 0;
            });

            $.each(rows, function (_, row) {
            $tbody.append(row);
            });

            // 다른 열의 버튼들 초기화
            $thead.find(".up, .down").removeClass("active");

            // 현재 클릭한 버튼에만 active 추가
            $btn.addClass("active");
        });
    });
    
    /*.tbl-sticky시 해당 col 태그에 min,max width 값 동일하게 넣기*/

    // $(".tbl-sticky > table col").each(function() {
    //     var width = $(this).css("width");
    //     $(this).css({
    //         "min-width": width,
    //         "max-width": width
    //     });

    // });

    $(".tbl-sticky table").each(function() {
        var totalWidth = 0;
        $(this).find("col").each(function() {
            var width = parseInt($(this).css('width'));
            totalWidth += width;
        });
       //$(this).css('min-width', totalWidth + 'px');
    });
    
    // $(".tbl-sticky > table .col-sticky").each(function(index) {
    //     var prevWidth = 0;
    //     $(this).prevAll().each(function() {
    //         prevWidth += $(this).outerWidth();
    //     });
    //     $(this).css("left", prevWidth + "px");
    // });
    
    // 왼쪽 고정
    $(".tbl-sticky > table .col-sticky").each(function() {
        var prevWidth = 0;
        $(this).prevAll().each(function() {
            prevWidth += $(this).outerWidth();
        });
        $(this).css({left: prevWidth + "px"});
    });

    // 오른쪽 고정
    $(".tbl-sticky > table .col-sticky.--right").each(function() {
        var nextWidth = 0;
        $(this).nextAll().each(function() {
            nextWidth += $(this).outerWidth();
        });
        $(this).css({ left:"auto", right: nextWidth + "px"});
    });



    /*차트 혹 테이블 내 데이터없을시 아이콘 적용 */
    $('.data-none .icon-container').each(function() {
        $(this).find('span').addClass('eicon-warning-solid');
    });

    $('.chart-group .data-none .icon-container').each(function() {
        // .chart-group 내에 .tbl이 포함된 경우
        if ($(this).closest('.chart-content').find('.tbl').length > 0) {
            $(this).find('span').addClass('eicon-warning-solid');
        } else {
            // .chart-group 내에 .tbl이 포함되지 않은 경우
            $(this).find('span').addClass('eicon-chart-stick');
        }
    });

    /* ********************************************************************************************************************************************* */
    /* **************************************************            header 부분 script            ************************************************* */
    /* ********************************************************************************************************************************************* */

    // $('.menu').click(function(){
    //     $('header').animate({
    //         width: 'toggle'
    //     },400 , "linear");
    // });

    $('header').hover(function(){
        $(this).addClass('--hover');
        // $('.main-header').toggleClass('--react');
    },function(){
        $(this).removeClass('--hover');
    });
    $('.headerFxd .form-switch input').click(function(){
        if($(this).is(':checked') === true){
            $('header').addClass('--fxd');
        }else{
            $('header').removeClass('--fxd');
        }
    });

    

    /* ************************
    * nav메뉴 선택시 표시
    ************************ */
    // $('nav .gnb-item').hover(function(){
    //     $(this).find('.lnb').slideToggle();

    // });

     $('nav a').click(function(){
        if($(this).hasClass('arrow') === false){ 
            $('header nav a').removeClass('active');
            $(this).addClass('active');  
           // $(this).parents('.gnb-item').find('i').addClass('active');
        }

        /*하위메뉴가 있는 메뉴*/
        if($(this).hasClass('arrow') === true){
            $(this).removeClass('active');
        }        
       $(this).siblings('.lnb').slideToggle();
       $(this).toggleClass('up');
    });

   $(function(){
        // 스크롤 여부를 확인하는 함수
        function checkScroll() {
            // document의 전체 높이와 윈도우 높이를 비교
            var hasVerticalScrollbar = 768 > $('nav').height();

            if (hasVerticalScrollbar) {
                $('.nav-bottom').addClass('shadow');
            } else {
                $('.nav-bottom').removeClass('shadow');
            }
        }

        // 페이지 로드 시 체크
        checkScroll();

        // 윈도우 크기 변경 시에도 체크 (예: 리사이즈 이벤트)
        $(window).on('resize', function() {
            checkScroll();
        });
   });
    
   /* ************************
    * 사용자명 클릭시 마이페이지/로그아웃 메뉴 표시
    ************************ */
    $('.user_name').click(function(){
        $('.user_page').toggle();    
    });



    /* ************************
    * 이미지슬라이드
    ************************ */
    var swiper = new Swiper(".swiper", {
        // cssMode: true,
        navigation: {
          nextEl: ".swiper-button-next",
          prevEl: ".swiper-button-prev",
        },
        pagination: {
          el: ".swiper-pagination",
        },
        // mousewheel: true,
        // keyboard: true,
      });


    /* ********************************************************************************************************************************************* */
    /* **************************************************            etc            ************************************************* */
    /* ********************************************************************************************************************************************* */

    /*폼형태의 페이지에서는 min-width값 줘야함*/
    $('.content-wrap').each(function() {
        if ($(this).find('.form-wrap').length) {
            $('.main-content').css('min-width', '998px');
        }
    });

     /* ************************
    * 리스트내 가로세로 이미지에 따른 스트레치
    ************************ */
     $(".video-thumbnail img").each(function() { 
        var imgWidth = this.naturalWidth;
        var imgHeight = this.naturalHeight;
        
        if(imgHeight > imgWidth){
            $(this).css({'width':'auto', 'height':'100%'});
        }else{
            $(this).css({'width':'100%', 'height':'auto'})
        }
    });

   /*타운보드 root_directory*/
   $('.root_directory li a').click(function(){
    var myparent = $(this).parent().hasClass('leaf');
    if( myparent == true){
        $(this).parent().toggleClass('');
    }else if( myparent == false){
        $(this).parent().toggleClass('open');
    $(this).parent().parent('li').children('ul').toggle();
    }
});

$('.root_directory li .directory-wrap').dblclick(function(){
    var myparent2 = $(this).parent().parent('li').children('ul');
    if(myparent2.length == true){
        $(this).parent().toggleClass('open');
        $(myparent2).toggle();
    }

});

$('.root_directory li .directory-wrap').click(function(){
    $('.root_directory li .directory-wrap').parent().removeClass('--selected');
    $(this).parent().toggleClass('--selected');
});

$('.selectbox').click(function(){
    $(this).children('ul').toggle();
    $(this).toggleClass('focus');
});


/*테이블리스트 드래그로 순서 변경*/
$(function() {
    $(".sortable-list  tbody").sortable({         
        items: 'tr:has(td)',
        connectWith: 'tbody',   //tbody의 자식엘리먼트 공유                        
        cursor: "move",
        placeholder: "sortable-placeholder",
    helper: fixHelper= function(e, ui)
    {
        ui.children().each(function() {
            $(this).width($(this).width());
        });
        return ui;
    }
    }).disableSelection();
});

// Initialize on page load
updateSpans();
/*새로생긴 리스트들도 드래그 가능할수있게함.*/

addListForm.submit(function (e) {
    $(".sortable-list  tbody").sortable({
        connectWith: 'tbody',
        placeholder: "sortable-placeholder",
    });
});

$(document).on("submit", ".addCard", function (e) {
    $(".sortable-list  tbody").sortable({
        connectWith: 'tbody',
        placeholder: "sortable-placeholder",
    });
});




}); 