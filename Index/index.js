const products = [
    {
        id: 1,
        name: "Sữa tắm dưỡng da",
        price: 120000,
        image: "../Image/sutam.webp",
        description: "Sữa tắm dưỡng da mềm mại, phù hợp mọi loại da."
    },
    {
        id: 2,
        name: "Bàn học thông minh",
        price: 1500000,
        image: "../Image/banhoclamviec.webp",
        description: "Bàn học thông minh tích hợp đèn LED và giá sách."
    },
    {
        id: 3,
        name: "Bó hoa tươi",
        price: 250000,
        image: "../Image/hoahong.webp",
        description: "Bó hoa tươi đẹp, phù hợp làm quà tặng đặc biệt."
    },
    {
        id: 4,
        name: "Giày thể thao",
        price: 800000,
        image: "../Image/giaybata.webp",
        description: "Giày thể thao phong cách, dành cho mọi hoạt động."
    },
    {
        id: 5,
        name: "Balo du lịch",
        price: 500000,
        image: "../Image/balodulich.webp",
        description: "Balo du lịch bền bỉ, không thấm nước."
    }
];

// Render danh sách sản phẩm ra giao diện
function renderProducts() {
    const productContainer = document.querySelector(".products");
    if (!productContainer) return;

    productContainer.innerHTML = "";
    products.forEach(product => {
        const productCard = document.createElement("div");
        productCard.className = "product-card";
        productCard.innerHTML = `
            <img src="${product.image}" alt="${product.name}">
            <h3>${product.name}</h3>
            <p>${product.price.toLocaleString()} VND</p>
            <button onclick="viewProductDetail(${product.id})">Xem chi tiết</button>
            <button onclick="addToCart(${product.id})">Thêm vào giỏ</button>
        `;
        productContainer.appendChild(productCard);
    });
}

// Xem chi tiết sản phẩm
function viewProductDetail(productId) {
    const selectedProduct = products.find(product => product.id === productId);
    if (selectedProduct) {
        localStorage.setItem("selectedProduct", JSON.stringify(selectedProduct));
        window.location.href = "../Index/product.html";
    }
}

// Thêm sản phẩm vào giỏ hàng
function addToCart(productId) {
    const cart = JSON.parse(localStorage.getItem("cart")) || [];
    const product = products.find(item => item.id === productId);
    if (product) {
        cart.push(product);
        localStorage.setItem("cart", JSON.stringify(cart));
        alert(`${product.name} đã được thêm vào giỏ hàng!`);
    }
}

// Hiển thị chi tiết sản phẩm
function renderProductDetail() {
    const productDetail = document.querySelector("#product-detail");
    if (!productDetail) return;

    const selectedProduct = JSON.parse(localStorage.getItem("selectedProduct"));
    if (!selectedProduct) {
        productDetail.innerHTML = "<p>Không tìm thấy thông tin sản phẩm.</p>";
        return;
    }

    productDetail.innerHTML = `
        <img src="${selectedProduct.image}" alt="${selectedProduct.name}">
        <h1>${selectedProduct.name}</h1>
        <p>${selectedProduct.price.toLocaleString()} VND</p>
        <p>${selectedProduct.description}</p>
        <button onclick="addToCart(${selectedProduct.id})">Thêm vào giỏ</button>
    `;
}

// Hiển thị nội dung giỏ hàng
function renderCart() {
    const cartContainer = document.querySelector("#cart-items");
    const cartTotal = document.querySelector("#cart-total");
    if (!cartContainer || !cartTotal) return;

    const cart = JSON.parse(localStorage.getItem("cart")) || [];
    cartContainer.innerHTML = "";
    let total = 0;

    if (cart.length === 0) {
        cartContainer.innerHTML = "<p>Giỏ hàng của bạn đang trống.</p>";
    } else {
        cart.forEach(item => {
            const cartItem = document.createElement("li");
            cartItem.innerHTML = `
                <img src="${item.image}" alt="${item.name}">
                <span>${item.name}</span>
                <span>${item.price.toLocaleString()} VND</span>
            `;
            cartContainer.appendChild(cartItem);
            total += item.price;
        });
    }

    cartTotal.innerHTML = `Tổng tiền: ${total.toLocaleString()} VND`;
}

// Xóa giỏ hàng
function clearCart() {
    localStorage.removeItem("cart");
    alert("Giỏ hàng đã được xóa!");
    renderCart();
}

// Tự động chạy chức năng khi tải trang
document.addEventListener("DOMContentLoaded", () => {
    if (document.querySelector("#product-detail")) {
        renderProductDetail();
    }
    if (document.querySelector("#cart-items")) {
        renderCart();
    }
    if (document.querySelector(".products")) {
        renderProducts();
    }
});

// Hiển thị form thanh toán
function showCheckoutForm() {
    const cart = JSON.parse(localStorage.getItem("cart")) || [];
    if (cart.length === 0) {
        alert("Giỏ hàng của bạn đang trống. Vui lòng thêm sản phẩm trước khi thanh toán!");
        return;
    }

    document.getElementById("checkout-form").style.display = "block";
    document.getElementById("checkout-button").style.display = "none";
}

// Xử lý thanh toán
function processPayment(event) {
    event.preventDefault();

    const name = document.getElementById("name").value.trim();
    const email = document.getElementById("email").value.trim();
    const phone = document.getElementById("phone").value.trim();
    const address = document.getElementById("address").value.trim();

    if (!name || !email || !phone || !address) {
        alert("Vui lòng nhập đầy đủ thông tin!");
        return;
    }

    const cart = JSON.parse(localStorage.getItem("cart")) || [];
    let total = cart.reduce((sum, item) => sum + item.price, 0);

    const summary = `
        Cảm ơn bạn, ${name}!
        Thông tin đơn hàng đã được ghi nhận:
        Email: ${email}
        Số điện thoại: ${phone}
        Địa chỉ: ${address}
        Tổng tiền: ${total.toLocaleString()} VND.
    `;

    alert(summary);
    clearCart();
    document.getElementById("checkout-form").style.display = "none";
    document.getElementById("checkout-button").style.display = "block";
}
