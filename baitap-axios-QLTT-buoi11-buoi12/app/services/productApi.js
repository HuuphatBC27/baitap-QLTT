var baseUrl = "https://62bc904d6b1401736cfd0eb4.mockapi.io/InfoTeacher";

// Hàm lấy danh sách
function apiGetProducts(search) {
  return axios({
    url: baseUrl,
    method: "GET",
    params: {
      taiKhoan: search, //product?name ="xiaomi"
    },
  });
}

// hàm Add sản phẩm
function apiAddProduct(Product) {
  return axios({
    url: baseUrl,
    method: "POST",
    data: Product,
  });
}
//xóa
function apiDeleteProduct(productId) {
  return axios({
    url: `${baseUrl}/${productId}`,
    method: "DELETE",
  });
}

// lấy chi tiết từng sản phẩm
function apiGetProductdetail(productId) {
  return axios({
    url: `${baseUrl}/${productId}`,
    method: "GET",
  });
}

//cập nhật sản phẩm

function apiUpdateProduct(product) {
  return axios({
    url: `${baseUrl}/${product.id}`,
    data: product,
    method: "PUT",
  });
}
