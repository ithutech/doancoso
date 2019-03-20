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
    
    var worksheets = [
        '', // defaults to first worksheet without id
        'ouab0ad'];

    worksheets.forEach(function (worksheet) {
        $.googleSheetToJSON('1zp6llWxAzKUd1mf5e_kkI2n-Q1teywaET7OU6iidUJA', worksheet)
            .done(function (rows) {
                var strText = "<table border=1>";
                var strText = "<table class='dtable'>";
                strText += "<tr> <th>SĐT Giảng Viên</th>  <th>Email GV</th>  <th>Tên GV</th>  <th>Tên SV</th>  <th>Lớp</th> <th>Mã SV</th>  <th>Ngành</th>  <th>Email SV</th>  <th>Số ĐT </th>   ";
                var count = 0;
                rows.forEach(function (row) {
                    var strMaSV = row['masv'].replace(/ /g,'');
                    if (strMaSV == masv) {
                        count++;
                        strText += "<tr>";
                        Object.getOwnPropertyNames(row).forEach(function (name) {
                            if (name == 'tt')
                                return;
                            
                            var val = [].concat(row[name]).join(' / ');
                            strText += "<td>" + val + "</td>";
                        });
                        strText += "</tr>";
                    }
                    return;
                });
                if (count == 0)
				{
                    $("#InfoSV").html('Không tìm thấy thông tin sinh viên');
				}
                else {
                    $("#InfoSV").html(strText);
                }
            })
            .fail(function (err) {
                console.log('error!', err);
            });
    });
}