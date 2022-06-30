// b1 : Call API để lấy danh sách giáo viên và hiển thị

// chạy hàm main khi mở ứng dụng
main();

function main() {
  //b1 gọi API lấy dữ liệu, trả dữ liệu method : GET
  axios({
    url: "https://62bc904d6b1401736cfd0eb4.mockapi.io/InfoTeacher",
    method: "GET",
  }).then(function (result) {
    // biến product nhận dữ liệu từ API

    var products = result.data;

    for (var i = 0; i < products.lenght; i++) {
      var product = products[i];
      products[i] = new Product(
        product.id,
        product.taiKhoan,
        product.matKhau,
        product.hoTen,
        product.email,
        product.ngonNgu,
        product.loaiND,
        product.moTa,
        product.hinhAnh
      );
    }

    //gọi hàm display

    display(products);
  });
}

function display(products) {
  var html = "";
  for (var i = 0; i < products.length; i++) {
    var product = products[i];
    html += `
   <tr>
   <td>${i + 1}</td>
   <td>${product.taiKhoan}</td>
   <td>${product.matKhau}</td>
   <td>${product.hoTen}</td>
   <td>${product.email}</td>
   <td>${product.ngonNgu}</td>
   <td>${product.loaiND}</td>   
<td>

<button
 class = "btn btn-danger" 
 data-type= "delete" 
 data-id = "${product.id}"> Delete</button>
 <button class = "btn btn-success" 
   
  data-toggle="modal" 
  data-target="#myModal"
  data-type ="update"
  data-id = ${product.id}> Update
  </button>
</td>
   </tr>
    `;
  }
  // DOM tới info product  và  inner.HTML bằng biến HTML
  document.getElementById("tblDanhSachNguoiDung").innerHTML = html;
}

// hàm thêm sản phẩm
function addProduct() {
  //b1: DOM
  const taiKhoan = document.getElementById("TaiKhoan").value;
  const matKhau = document.getElementById("MatKhau").value;
  const hoTen = document.getElementById("HoTen").value;
  const email = document.getElementById("Email").value;
  const ngonNgu = document.getElementById("loaiNgonNgu").value;
  const loaiND = document.getElementById("loaiNguoiDung").value;
  const hinhAnh = document.getElementById("HinhAnh").value;
  const moTa = document.getElementById("MoTa").value;

  var isValid = validation();

  if (!isValid) {
    alert("Vui lòng nhập vào các giá trị");
    return;
  }

  //b2 khởi tạo Product
  const product = new Product(
    null,
    taiKhoan,
    hoTen,
    matKhau,
    email,
    loaiND,
    ngonNgu,
    moTa,
    hinhAnh
  );

  //b3 : gọi API thêm METHOD : "POST"

  apiAddProduct(product)
    .then(function (result) {
      main();
      resetForm();
    })
    .catch(function (error) {
      console.log(error);
    });
}

// xóa sản phẩm
function deleteProduct(productId) {
  apiDeleteProduct(productId)
    .then(function () {
      // xóa thành công
      main();
    })
    .catch(function (error) {
      console.log(error);
    });
}

// đưa  sản phẩm lên modal và sửa
function showUpdateModal(productId) {
  document.querySelector(".modal-title").innerHTML = "Cập nhật Sản Phẩm";
  document.querySelector(".modal-footer").innerHTML = `
    <button class='btn btn-primary'data-type="update" >Cập nhật</button>;
    <button class="btn btn-secondary"
    data-dismiss ="modal" >Hủy </button>`;

  //Call API lấy chi tiết
  apiGetProductdetail(productId)
    .then(function (result) {
      // thành công
      var product = result.data;
      document.getElementById("MaGV").value = product.id;
      document.getElementById("TaiKhoan").value = product.taiKhoan;
      document.getElementById("HoTen").value = product.hoTen;
      document.getElementById("MatKhau").value = product.matKhau;
      document.getElementById("Email").value = product.email;
      document.getElementById("loaiNguoiDung").value = product.loaiND;
      document.getElementById("loaiNgonNgu").value = product.ngonNgu;
      document.getElementById("MoTa").value = product.moTa;
      document.getElementById("HinhAnh").value = product.hinhAnh;
    })

    .catch(function (error) {
      console.log(error);
    });
}

//update sản phẩm đã sửa và call API đưa lên giao diện
function updateProduct() {
  // b1 : DOM lấy value
  const id = document.getElementById("MaGV").value;
  const taiKhoan = document.getElementById("TaiKhoan").value;
  const hoTen = document.getElementById("HoTen").value;
  const matKhau = document.getElementById("MatKhau").value;
  const email = document.getElementById("Email").value;
  const loaiND = document.getElementById("loaiNguoiDung").value;
  const ngonNgu = document.getElementById("loaiNgonNgu").value;
  const moTa = document.getElementById("MoTa").value;
  const hinhAnh = document.getElementById("HinhAnh").value;
  //b2 : Khởi tạo product

  const product = new Product(
    id, // dùng hidden input để có id
    taiKhoan,
    hoTen,
    matKhau,
    email,
    loaiND,
    ngonNgu,
    moTa,
    hinhAnh
  );
  //b3 : gọi API cập nhật sản phẩm
  apiUpdateProduct(product)
    .then(function (result) {
      // chỉ mới cập nhật ở data chưa lên giao diện phải gọi hàm main để update
      main();
      resetForm();
    })
    .catch(function (error) {
      console.log(error);
    });
}

// Hàm reset Form và đóng modal
function resetForm() {
  document.getElementById("MaGV").value = "";
  document.getElementById("TaiKhoan").value = "";
  document.getElementById("HoTen").value = "";
  document.getElementById("MatKhau").value = "";
  document.getElementById("Email").value = "";
  document.getElementById("loaiNguoiDung").value = "";
  document.getElementById("loaiNgonNgu").value = "";
  document.getElementById("HinhAnh").value = "";
  document.getElementById("MoTa").value = "";

  //đóng modal
  $("#myModal").modal("hide");
}

//DOM
document
  .getElementById("btnThemNguoiDung")
  .addEventListener("click", showAddModal);

function showAddModal() {
  // thay đổi text heading
  document.querySelector(".modal-title").innerHTML = "Thêm sản phẩm";
  document.querySelector(".modal-footer").innerHTML = `
  <button class='btn btn-primary'data-type="add" >Thêm GV</button>;
  <button class="btn btn-secondary"
  data-dismiss ="modal" >Hủy </button>`;
}
// ủy quyền cho các nút ở modal-footer
document.querySelector(".modal-footer").addEventListener("click", handleSubmit);

function handleSubmit(event) {
  var type = event.target.getAttribute("data-type");
  switch (type) {
    case "add":
      addProduct();
      break;
    case "update":
      updateProduct();
    default:
      break;
  }
}

// ủy quyền cho nút xóa và cập nhật

document
  .getElementById("tblDanhSachNguoiDung")
  .addEventListener("click", handleProductAction);

function handleProductAction(event) {
  //loại button : delete || update
  var type = event.target.getAttribute("data-type");
  // id : id sản phẩm
  var id = event.target.getAttribute("data-id");
  switch (type) {
    case "delete":
      deleteProduct(id);
      break;
    case "update": {
      //cập nhật giao diện
      showUpdateModal(id);
      break;
    }
    default:
      break;
  }
}

//DOM input search
document.getElementById("searchGV").addEventListener("keypress", hadleSearch);
function hadleSearch(evt) {
  if (evt.key !== "Enter") return;
  var value = evt.target.value;
  apiGetProducts(value).then(function (result) {
    // biến product nhận dữ liệu từ API
    var products = result.data;
    for (var i = 0; i < products.lenght; i++) {
      var product = products[i];
      products[i] = new Product(
        product.id,
        product.taiKhoan,
        product.matKhau,
        product.hoTen,
        product.email,
        product.ngonNgu,
        product.loaiND,
        product.moTa,
        product.hinhAnh
      );
    }
    //gọi hàm display
    display(products);
  });
}

// Hàm check regexp
function validation() {
  let id = document.getElementById("MaGV").value;
  let taiKhoan = document.getElementById("TaiKhoan").value;
  let hoTen = document.getElementById("HoTen").value;
  let matKhau = document.getElementById("MatKhau").value;
  let email = document.getElementById("Email").value;
  let ngonNgu = document.getElementById("loaiNgonNgu").value;
  let loaiND = +document.getElementById("loaiNguoiDung").value;
  let moTa = +document.getElementById("MoTa").value;
  let hinhAnh = +document.getElementById("HinhAnh").value;

  let isValid = true;

  let letters = new RegExp("^[A-Za-z]+$");
  if (!isRequired(taiKhoan)) {
    isValid = false;
    document.getElementById(
      "text"
    ).innerHTML = `<span>tài khoản không được để trống</span>`;
  } else if (!minLength(taiKhoan, 8)) {
    isValid = false;
    document.getElementById(
      "text"
    ).innerHTML = `<span>Tên  phải có ít nhất 8 kí tự </span>`;
  } else if (!letters.test(taiKhoan)) {
    isValid = false;
    document.getElementById(
      "text"
    ).innerHTML = `<span>Tên  có kí tự không hợp lệ</span>`;
  } else {
    document.getElementById("text").innerHTML = "";
  }

  // Dùng regex để kiểm tra email có đúng định dạng hay không
  var emailPattern = new RegExp("[a-z0-9._%+-]+@[a-z0-9.-]+.[a-z]{2,}$");
  if (!isRequired(email)) {
    isValid = false;
    document.getElementById(
      "text3"
    ).innerHTML = `<span>Email  không được để trống</span>`;
  } else if (!emailPattern.test(email)) {
    isValid = false;
    document.getElementById(
      "text3"
    ).innerHTML = `<span>Email  không đúng định dạng</span>`;
  } else {
    document.getElementById("text3").innerHTML = "";
  }

  // Dùng regex để kiểm tra mật khẩu có đúng định dạng hay không
  var pwPattern = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/;
  if (!isRequired(matKhau)) {
    isValid = false;
    document.getElementById(
      "text2"
    ).innerHTML = `<span>Mật khẩu  không được để trống</span>`;
  } else if (!pwPattern.test(matKhau)) {
    isValid = false;
    document.getElementById(
      "text2"
    ).innerHTML = `<span>Mật khẩu  không đúng định dạng</span>`;
  } else {
    // Đúng
    document.getElementById("text2").innerHTML = "";
  }
  if (!isRequired(hoTen)) {
    isValid = false;
    document.getElementById(
      "text1"
    ).innerHTML = `<span>họ tên  không được để trống</span>`;
  } else {
    document.getElementById("text").innerHTML = "";
  }
  if (!isRequired(hinhAnh)) {
    isValid = false;
    document.getElementById(
      "text4"
    ).innerHTML = `<span>họ tên  không được để trống</span>`;
  } else {
    document.getElementById("text4").innerHTML = "";
  }

  if (!isRequired(loaiND)) {
    isValid = false;
    document.getElementById(
      "text5"
    ).innerHTML = `<span>người dùng  chưa được chọn</span>`;
  } else {
    document.getElementById("text5").innerHTML = "";
  }

  if (!isRequired(moTa)) {
    isValid = false;
    document.getElementById(
      "text7"
    ).innerHTML = `<span>mô tả  không được để trống</span>`;
  } else {
    document.getElementById("text7").innerHTML = "";
  }

  return isValid;
}

// Hàm kiểm tra input có rỗng hay không
function isRequired(value) {
  if (!value) {
    return false;
  }

  return true;
}

// Hàm kiểm tra input có đủ độ dài hay không
function minLength(value, limit) {
  if (value.length < limit) {
    return false;
  }
  return true;
}
