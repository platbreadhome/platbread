$(function() {
/* ************************
    * 달력 
************************ */
   var $j360 = jQuery.noConflict();
    $j360( function() {
        $j360('input[name="daterange"').daterangepicker({
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
        
        var structureAdded = false; // 원하는 구조가 추가되었는지 여부를 나타내는 변수
        $j360('input[name="daterange"]').on("click", function(){
            // 원하는 구조가 이미 추가되었는지 확인
            if (!structureAdded) {
                // 구조가 추가되지 않았다면 추가하고, 추가되었다고 표시
                $(".drp-buttons").append("<div style='float:left'><button class='btn btn-default mar-0'>1주일</button> <button class='btn btn-default'>1개월</button></div>");
                structureAdded = true;
            }
        });
        $j360('.daterange-single input[name="daterange"]').daterangepicker({
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
            autoApply:true, //확인/취소버튼사용여부
            timePicker24Hour:true, //24시간노출여부(ex>true:23:50,false:PM11:50)
            timePickerSeconds:true, //초노출여부
            singleDatePicker:true,  //하나의달력사용여부
            "buttonClasses": "btn"
            });

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
/* ************************
    * ligh/dark mode
************************ */
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
/* ************************
    * 체크박스
************************ */
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

    //라디오버튼 이미 체크된 상태 다시 선택시 해제되게.
    $('.form-waschecked input[type="radio"]').on('click', function () {
        const $this = $(this);

        if ($this.data('wasChecked')) {
            $this.prop('checked', false);
            $this.data('wasChecked', false);
        } else {
            $('input[type="radio"]').data('wasChecked', false);
            $this.data('wasChecked', true);
        }
    });


    //파일찾기 클릭시
// 버튼 클릭 시 해당 input[type=file] 열기 (disabled면 무시)
$('.custom-file-wrap .btn').on('click', function () {
  const $input = $(this).closest('.custom-file-wrap').find('.custom-file-input');
  if (!$input.prop('disabled')) $input.trigger('click');
});

// 파일 선택 시 라벨 갱신 (single/multiple 모두 대응)
$('.custom-file-input').on('change', function () {
  const files = this.files;
  const $label = $(this).siblings('.custom-file-label');

  if (!files || files.length === 0) {
    $label.removeClass('selected').text('선택하신 파일이 없습니다.').removeAttr('title');
    return;
  }

  if (files.length === 1) {
    $label.addClass('selected')
          .text(files[0].name)
          .attr('title', files[0].name);
  } else {
    const names = Array.from(files).map(f => f.name);
    $label.addClass('selected')
          .text(names.join(', '))
          .attr('title', names.join('\n'));
  }
});


/* ************************
    * 드래그앤드롭 파일업로드
************************ */
    $(function() { 
        $('.file-drop-wrap').each(function() {
            var fileDropWrap = $(this);
            var fileDropArea = fileDropWrap.find('.file-drop-area');
            var fileInput = fileDropWrap.find('input[type="file"]');
            var fileList = fileDropWrap.find('.file-list'); // 파일 리스트
    
            fileDropArea.on('click', function(e) {
                // 파일명이나 삭제 버튼 클릭 시 file-input이 열리지 않도록 예외 처리
                if (!$(e.target).closest('.file-name').length && !$(e.target).closest('.file-delete').length) {
                    fileInput.click();
                }
            });
    
            fileInput.on('change', function(e) {
                handleFiles(e.target.files, fileInput, fileList);
            });
    
            fileDropArea.on('dragenter dragover', function(e) {
                e.preventDefault();
                e.stopPropagation();
                fileDropArea.addClass('dragging');
            });
    
            fileDropArea.on('dragleave', function(e) {
                e.preventDefault();
                e.stopPropagation();
                fileDropArea.removeClass('dragging');
            });
    
            fileDropArea.on('drop', function(e) {
                e.preventDefault();
                e.stopPropagation();
                fileDropArea.removeClass('dragging');
    
                var files = e.originalEvent.dataTransfer.files;
                handleFiles(files, fileInput, fileList);
            });
        });
        
        //file-disabled시 input disable처리
        $('.file-drop-wrap').each(function() {
            var $wrap = $(this);
            var $input = $wrap.find('.file-input');

            if ($wrap.hasClass('file-disabled')) {
                $input.prop('disabled', true);
            } else {
                $input.prop('disabled', false);
            }
        });

        
        function handleFiles(files, fileInput, fileList) {
            var isSingleFile = fileInput.hasClass('just-one');
    
            if (isSingleFile) {
                fileList.empty(); // 단일 파일 업로드 모드일 때 리스트 초기화
            }
    
            var maxFiles = isSingleFile ? 1 : files.length;
    
            for (var i = 0; i < maxFiles; i++) {
                (function(file) { // 클로저 활용하여 개별 참조 보장
                    var listItem = $('<li class="file-wrap">');
                    var fileInfo = $('<div class="file-info">');
                    var fileName = $('<a href="#" class="file-name">').text(file.name).attr('data-file-type', file.type);
    
                    if (file.type.startsWith('image/')) {
                        var reader = new FileReader();
                        reader.onload = function(e) {
                            var img = $('<img>').attr('src', e.target.result).addClass('file-thumbnail');
                            fileInfo.prepend(img);
                            fileName.attr('data-file-url', e.target.result);
                        };
                        reader.readAsDataURL(file);
                    } else {
                        var fileIcon = $('<i class="icon-container"><span class="eicon-document"></span></i>');
                        var fileUrl = URL.createObjectURL(file);
                        fileName.attr('data-file-url', fileUrl);
                        fileInfo.prepend(fileIcon);
                    }
    
                    var closeButton = $('<a class="file-delete btn btn-round btn-regular btn-less btn-default btn-transparent"><i class="icon-container"><span class="eicon-cancel"></span></i><span class="text-blind">삭제</span></a>');
    
                    fileInfo.append(fileName);
                    listItem.append(fileInfo).append(closeButton);
                    fileList.append(listItem);
                })(files[i]);
            }
        }
    
        // 파일 삭제 기능 추가
        $('.file-list').on('click', '.file-delete', function(e) {
            e.preventDefault();
            e.stopPropagation();
            $(this).closest('li').remove();
        });
    
        // 파일명 클릭 시 미리보기 활성화 (`file-preview` 클래스가 있는 경우만)
        $(document).on('click', '.file-name', function(e) {
            e.preventDefault();
            e.stopPropagation();
    
            var fileList = $(this).closest('.file-list');
    
            // 🔹 `.file-preview`가 있는 경우만 미리보기 실행
            if (!fileList.hasClass('file-preview')) {
                //alert("미리보기를 사용할 수 없습니다.");
                return;
            }
    
            var fileUrl = $(this).attr('data-file-url');
            var fileType = $(this).attr('data-file-type');
    
            if (!fileUrl) {
                //alert("파일 미리보기를 불러올 수 없습니다.");
                return;
            }
    
            $('.modal-overlay').remove(); // 기존 모달 제거 후 생성
    
            var modalOverlay = $('<div class="modal-overlay"></div>');
            var modal = $('<div class="modal modal-md modal-center modal-upload">');
            var modalContent = $('<div class="modal-content">');
            var modalHeader = $('<div class="modal-header"><h4 class="modal-title">미리보기</h4><button class="btn btn-round btn-regular btn-less btn-transparent modal-close"><i class="icon-container i-gray"><span class="eicon-cancel text-blind">닫기</span></i></button></div>');
            var modalBody = $('<div class="modal-body">');
    
            if (fileType.startsWith('image/')) {
                modalBody.html('<img src="' + fileUrl + '" style="max-width: 100%; height: auto; display: block; margin: auto;">');
            } else {
                modalBody.html('<p>파일을 다운로드하려면 <a href="' + fileUrl + '" download>여기를 클릭</a></p>');
            }
    
            modalContent.append(modalHeader).append(modalBody);
            modal.append(modalContent);
            modalOverlay.append(modal);
            $('body').append(modalOverlay);
    
            modalOverlay.css('display', 'block');
            modal.addClass('flex');
    
            $(document).on('click', '.modal-close', function() {
                $('.modal-overlay').fadeOut(200, function() {
                    $(this).remove();
                });
            });
    
            $(document).on('click', '.modal-overlay', function(e) {
                if ($(e.target).hasClass('modal-overlay')) {
                    $('.modal-overlay').fadeOut(200, function() {
                        $(this).remove();
                    });
                }
            });
        });
    });

/* ************************
    * 드롭다운
************************ */
    $('.dropdown .btn').click(function(){
        //disabled가 있으면 .dropdown-menu가 펼쳐지지 않음
        if ($(this).hasClass('disabled')) {
            e.preventDefault();
            e.stopPropagation();
            return;
        }
        
        $(this).parent('.dropdown').children('.dropdown-menu').toggle();

        // 드롭다운 클릭시 다른 드롭다운 모두 닫히게
        var $drops = $(this).closest('.dropdown').find('.dropdown-menu');
        $(".dropdown .dropdown-menu").not($drops).slideUp(10);
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
        var p = Math.round($(this).width() + 4)*1;
        $(this).children('.dropdown-menu').css({
            'transform' : 'translate3d('+ p +'px, 0, 0)'
        });
        // if($(this).width() >= $('.dropdown-menu').width()){
        //     var p = Math.round($(this).width() + 4)*-1;
        //     $(this).children('.dropdown-menu').css({
        //         'transform' : 'translate3d(' + p +'px, 0, 0)'
        //     });
        // }else if($(this).width() < $('.dropdown-menu').width()){
        //     var w = $(this).children('.dropdown-menu').outerWidth(true);
        //     var p = Math.round($(this).width()+( w - $(this).width()) + 4)*-1;
        //     $(this).children('.dropdown-menu').css({
        //         'transform' : 'translate3d(' + p +'px, 0, 0)'
        //     });
        // }
    });
     //드롭다운 외부 클릭시 .dropdown-menu 닫힘
    $(document).on("click", function (e) {
        if (!$(e.target).closest(".dropdown").length) {
            $(".dropdown .dropdown-menu:visible").slideUp(200);
        }
    });
    
    //드롭다운 단일, 다중에 따른 형태
    $(function () {
        /** dropdown-select (단일 선택) **/
        $('.dropdown-select .dropdown-item').on('click', function(e) {
            e.preventDefault();
    
            var $this = $(this);
            var txt = $this.text();
    
            $this.closest('.dropdown-select').find('.btn').text(txt);
            $this.addClass('active').siblings().removeClass('active');
            $this.closest('.dropdown-menu').hide();
        });
    
        $('.dropdown-select').each(function () {
            var activeItem = $(this).find('.dropdown-item.active');
            if (activeItem.length > 0) {
                $(this).find('.btn').text(activeItem.text());
            }
        });
    
        /** dropdown-multiselect (다중 선택) **/       

        function updateTitle(dropdown) {
            var selectedItems = [];
            var allItems = dropdown.find(".dropdown-menu input[type='checkbox']").not(".check-all");
            var checkedItems = allItems.filter(":checked");
            var checkedCount = checkedItems.length; // 체크된 항목 갯수
            var totalCount = allItems.length; // 전체 항목갯수
            var allChecked = checkedCount === totalCount;
    
            if (allChecked && totalCount > 0) {
                dropdown.find(".dropdown-toggle").html("<span class='text-ellipsis'>전체 (" + checkedCount + ")</span>");
            } else if (checkedCount > 0) {
                checkedItems.each(function () {
                    selectedItems.push($(this).siblings("label").children("span").text());
                });
                var labelText = selectedItems.join(", ");
                dropdown.find(".dropdown-toggle").html("<span class='text-ellipsis'>" + labelText + "</span>");
            } else {
                var defaultTitle = dropdown.find(".dropdown-toggle").data("default-title");
                dropdown.find(".dropdown-toggle").html("<span class='text-ellipsis'>" + defaultTitle + "</span>");
            }
        }
    
        
        // 드롭다운 안쪽 클릭 시 닫히지 않게      
         $(".dropdown-menu input[type='checkbox']").on("change", function () {
            var dropdown = $(this).closest(".dropdown-multiselect");
    
            if ($(this).hasClass("check-all")) {
                var isChecked = $(this).is(":checked");
                dropdown.find(".dropdown-menu input[type='checkbox']").prop("checked", isChecked);
            } else {
                var allCheckbox = dropdown.find(".check-all");
                var allItems = dropdown.find(".dropdown-menu input[type='checkbox']").not(".check-all");
                var allChecked = allItems.length === allItems.filter(":checked").length;
                allCheckbox.prop("checked", allChecked);
            }
    
            updateTitle(dropdown);
        });
    
        $(".dropdown-multiselect .dropdown-toggle").each(function () {
            $(this).data("default-title", $(this).text());
        });

        $(".dropdown-multiselect .dropdown-toggle").on("click", function (e) {
            e.stopPropagation(); // <- 이게 핵심! 외부 클릭 이벤트로 인식되지 않게 막아줌
            
            var dropdown = $(this).closest(".dropdown-multiselect");
            updateTitle(dropdown);
        });
        
        //전체에 체크 미리 되어있을때 페이지 로드시 모두 선택되어있도록 표시
        setTimeout(function () {
            $(".dropdown-multiselect").each(function () {
                var dropdown = $(this);
                var checkAll = dropdown.find(".check-all");
          
                if (checkAll.is(":checked")) {
                    dropdown.find(".dropdown-menu input[type='checkbox']").not(".check-all").prop("checked", true);
                }
          
                var allItems = dropdown.find(".dropdown-menu input[type='checkbox']").not(".check-all");
                var allChecked = allItems.length === allItems.filter(":checked").length;
                checkAll.prop("checked", allChecked);
          
                updateTitle(dropdown);
            });
          }, 0);
    
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
/* ************************
    * 아코디언
************************ */
$('.accordion-item.open .accordion-content').show();

$('.accordion-single .accordion-title').click(function () {
const $wrap = $(this).closest('.accordion-single');
const $item = $(this).parent('.accordion-item');
const $content = $item.children('.accordion-content');

if (!$item.hasClass('open')) {
    // 같은 그룹 내에서만 닫기
    $wrap.find('.accordion-item.open').each(function () {
        $(this).children('.accordion-content').slideUp();
        $(this).removeClass('open');
    });

    // 현재 항목 열기
    $item.addClass('open');
    $content.slideDown();
} else {
    // 현재 항목 닫기
    $item.removeClass('open');
    $content.slideUp();
}
});

/*아코디언*/
$('.accordion-multi .accordion-title').click(function () {
const $item = $(this).parent('.accordion-item');
const $content = $item.children('.accordion-content');

if (!$item.hasClass('open')) {
    // 현재 항목 열기
    $item.addClass('open');
    $content.slideDown();
} else {
    // 현재 항목 닫기
    $item.removeClass('open');
    $content.slideUp();
}
});
/* ************************
    * nav tab
************************ */
    /*tab 기능 - nav 중첩되어도 문제안됌*/
    $('.nav-wrap .nav-link').click(function(){
        var tab_id = $(this).attr('data-tab');
        // $(this).parents('.nav-wrap').find('.tab-content').removeClass('active');
        // $(this).parents('.nav-wrap').find('.nav-link').removeClass('active');
         
        $(this).closest('.nav-wrap').children('.tab-content').removeClass('active');
        $(this).closest('.nav-item').siblings().children('.nav-link').removeClass('active');
        
        $(this).addClass('active');
        $('.data-tab-'+tab_id).addClass('active');
    });

/* ************************
    * table
************************ */
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

    // $(".tbl-sticky table").each(function() {
    //     var totalWidth = 0;
    //     $(this).find("col").each(function() {
    //         var width = parseInt($(this).css('width'));
    //         totalWidth += width;
    //     });
    //     $(this).css('min-width', totalWidth + 'px');
    // });
    
    // $(".tbl-sticky > table .col-sticky").each(function(index) {
    //     var prevWidth = 0;
    //     $(this).prevAll().each(function() {
    //         prevWidth += $(this).outerWidth();
    //     });
    //     $(this).css("left", prevWidth + "px");
    // });

/* ************************
    * modal
************************ */
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

/* ************************
    * 백그라운드 슬라이드
************************ */
 $(function() {
    $( ".draggable-wrap" ).draggable({
        handle: ".draggable",
        containment: "parent"});
    });


    $(function () {
        // 컨테이너별로 독립 동작 (여러 g-preview가 있어도 OK)
        $('.g-preview').each(function () {
            const $wrap = $(this);

            function clamp(n, lo, hi) { return Math.max(lo, Math.min(n, hi)); }

            function paint($input) {
            const min  = Number($input.attr('min') ?? 0);
            const max  = Number($input.attr('max') ?? 100);
            const val  = Number($input.val() ?? 0);
            const span = (max > min) ? (max - min) : 1; // 0분모 방지
            let pct = ((val - min) / span) * 100;
            pct = clamp(pct, 0, 100);

            // CSS 변수 미정의 시 기본색으로 폴백
            $input.css(
                'background',
                `linear-gradient(to right, var(--progressbar-bg, #4caf50) ${pct}%, var(--progressbar-tack, #e9ecef) ${pct}%)`
            );
            }

            // 초기 페인트(비활성 포함 모든 .form-range)
            $wrap.find('.form-range').each(function () {
            paint($(this));
            });

            // 값이 변할 때 갱신 (스크립트로 값 변경해도 반영되도록 change도 함께)
            $wrap.on('input change', '.form-range', function () {
            paint($(this));
            });
        });
    });
});

/* ************************
    * 프로그래스
************************ */

$(function () {
  // 모든 컴포넌트 초기화
  document.querySelectorAll(".progress-wrap").forEach(initProgress);

  function initProgress(wrap){
    const fill = wrap.querySelector(".progress-circle-fill");
    const percentTxt = wrap.querySelector(".progress-txt");

    const state = wrap.dataset.state || "success";

    // data-target 있으면 그 값, 없으면 success/fail=100, uploading=75
    const target = ("target" in wrap.dataset)
      ? clampInt(wrap.dataset.target, 0, 100)
      : (state === "uploading" ? 75 : 100);

    let p = 0; // 0~100

    function setProgress(percent){
      p = clampInt(percent, 0, 100);

      // 링 채우기
      fill.setAttribute("stroke-dasharray", `${p}, 100`);

      // 중앙 퍼센트
      percentTxt.textContent = `${p}%`;

      // ✅ 라벨 텍스트는 건드리지 않음
      // 완료 처리: target이 100일 때만 done
      if (p >= 100 && target === 100){
        wrap.classList.add("done");
        wrap.classList.add(state); // success/fail/uploading/encoding
      } else {
        wrap.classList.remove("done", "success", "fail", "uploading", "encoding");
      }
    }

    // 초기값
    setProgress(0);

    // 데모 자동 진행(테스트용)
    const timer = setInterval(() => {
      if (p >= target) return clearInterval(timer);
      setProgress(p + 1);
    }, 18);

    // 외부 제어 필요하면:
    // wrap.setProgress = setProgress;
  }

  function clampInt(v, min, max){
    const n = Math.round(Number(v));
    if (!Number.isFinite(n)) return min;
    return Math.min(max, Math.max(min, n));
  }
});
