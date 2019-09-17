// Get the input field
var input = document.getElementById("inMaSV");
// Execute a function when the user releases a key on the keyboard
input.addEventListener("keyup", function(event) {
  // Number 13 is the "Enter" key on the keyboard
  if (event.keyCode === 13) {
    // Cancel the default action, if needed
    event.preventDefault();
    // Trigger the button element with a click
    document.getElementById("btnDoSV").click();
  }
});

function stepGetSinhVien() {
    var masv = $.trim($("input[name='txtMaSV']").val());
    if(masv == ''){
        alert("VUI LÒNG NHẬP MÃ SINH VIÊN");
        return false;
    }
    doLoading()
        .then(doGetSinhVien)
        .then(doComplete);
}
function doLoading() {
    return new Promise(function (resolve, reject) {
        document.querySelector('.js-loading').classList.remove('is-hidden');
        resolve();
    });
}
function doGetSinhVien() {
    return new Promise(function (resolve, reject) {
        sinhVienGet()
        resolve();
    });
}

function doComplete() {
    return new Promise(function (resolve, reject) {
        setTimeout(() => {
            document.querySelector('.js-loading').classList.add('is-hidden');
        },1000);
        resolve();
    });
}

function sinhVienGet() {
	$("#InfoSV").html('');
    var masv = $.trim($("input[name='txtMaSV']").val()).replace(/ /g,'');
    var url ="https://script.google.com/macros/s/AKfycbxrioCVwQiWs8Yq66aS8LyUWqQq576dXxKpZJR4v4CPd8wAcSE/exec?id="+masv;
    var count = 1;
    var strText = "<table border=1>";
    var strText = "<table class='dtable'>";
    strText += "<tr> <th>Mã SV</th>  <th>Họ tên</th>  <th>Email SV</th>  <th>Điện thoại SV</th>  <th>Lớp</th> <th>Ngành</th>  <th>Tên GV</th>  <th>Email GV</th>  <th>Số ĐT GV</th>   ";
    $.getJSON(url, function( data ) {
        var items = [];
        $.each( data, function( key, val ) {
            if(val.length==0){
                count=0;
                return;
            }
            strText += "<tr>";
            strText+="<td>"+val[0]["masv"]+"</td>";
            strText+="<td>"+val[0]["hoten"]+"</td>";
            strText+="<td>"+val[0]["sv-email"]+"</td>";
            strText+="<td>"+val[0]["sv-sdt"]+"</td>";
            strText+="<td>"+val[0]["malop"]+"</td>";
            strText+="<td>"+val[0]["nganh"]+"</td>";
            strText+="<td>"+val[0]["gvhoten"]+"</td>";
            strText+="<td>"+val[0]["gvemail"]+"</td>";
            strText+="<td>"+val[0]["gvdienthoai"]+"</td>";
            strText += "</tr>";
        });
        if (count == 0)
        {
            $("#InfoSV").html('Không tìm thấy thông tin sinh viên');
        }
        else {
            $("#InfoSV").html(strText);
        }
    });
}