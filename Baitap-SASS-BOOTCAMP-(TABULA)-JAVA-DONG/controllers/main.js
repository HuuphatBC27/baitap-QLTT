// b1 : Call API để lấy danh sách giáo viên và hiển thị

// chạy hàm main khi mở ứng dụng
main();

function main() {
  //b1 gọi API lấy dữ liệu, trả dữ liệu method : GET
  axios({
    url: "https://62bc904d6b1401736cfd0eb4.mockapi.io/InfoTeacher",
    method: "GET",
  }).then(function (result) {
    // biến teachers nhận dữ liệu từ API

    var teachers = result.data;

    for (var i = 0; i < teachers.lenght; i++) {
      var teacher = teachers[i];
      teachers[i] = new Teacher(
        teacher.id,
        teacher.taiKhoan,
        teacher.hoTen,
        teacher.matKhau,
        teacher.email,
        teacher.loaiND,
        teacher.ngonNgu,
        teacher.moTa,
        teacher.hinhAnh
      );
    }

    //gọi hàm display

    display(teachers);
  });
}
function display(teachers) {
  // if (teacher.loaiND === GV) {
  // } else {
  //   alert("không có danh sách GV");
  // }
  var html = "";
  for (var i = 0; i < teachers.length; i++) {
    var teacher = teachers[i];
    html += ` 
      <div class="col-xl-3 col-lg-6 col-sm-6 pb-5 ps-5">
        <div class="info-img">
          <img src="${teacher.hinhAnh}" width ="100%" />
        </div>
        <div class="info-content">
            <p>${teacher.ngonNgu}</p>
            <h3>${teacher.hoTen}</h3>
            <span>${teacher.moTa}</span>
        </div>  
      </div>    
 
    `;
  }
  // DOM tới info teacher  và  inner.HTML bằng biến HTML
  document.getElementById("danhSachGV").innerHTML = html;
}
