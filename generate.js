$(document).ready(function(){
    initiallize();
});
function initiallize(){
    initialEvent();
}
function initialEvent(){
    $( "#btnGenerate" ).on( "click", function(){
        validation();
    });
    $( "#btnClear" ).on( "click", function(){
        clearData();
    });
}
function validation(){
    const url = $('#url').val();

    if(!url){
        alert('กรุณากรอกลิงก์!!');
    } else {
        generateQRCode();
    }
}
function clearData(){
    $('#url').val('');
    $("#imageQRCode").attr('src', 'https://www.thai-frozen.or.th/Content/Images/empty-img.png');
}
function generateQRCode(){
    const url = $('#url').val();
    $.ajax({
        method: 'post',
        url: 'http://localhost:3030/generateQR',
        data: {
            url: url
        }, success: function(res) {
            $("#imageQRCode").attr('src', res.resResult);
        }, error: function(err) {
            console.log('----- ERROR_AJAX_POST -----',err);
        }
    });
}