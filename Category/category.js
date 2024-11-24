const products = [
    {
        id: 1,
        name: "Sữa tắm dưỡng da",
        price: 120000,
        category: "hang-tieu-dung",
        image: "../Image/sutam.webp",
        description: "Sữa tắm dưỡng da mềm mại, phù hợp mọi loại da."
    },
    {
        id: 2,
        name: "Bàn học thông minh",
        price: 1500000,
        category: "ban-ghe",
        image: "../Image/banhoclamviec.webp",
        description: "Bàn học thông minh tích hợp đèn LED và giá sách."
    },
    {
        id: 3,
        name: "Bó hoa tươi",
        price: 250000,
        category: "hoa-tuoi",
        image: "../Image/hoahong.webp",
        description: "Bó hoa tươi đẹp, phù hợp làm quà tặng đặc biệt."
    },
    {
        id: 4,
        name: "Giày thể thao",
        price: 800000,
        category: "giay-dep",
        image: "../Image/giaybata.webp",
        description: "Giày thể thao phong cách, dành cho mọi hoạt động."
    },
    {
        id: 5,
        name: "Balo du lịch",
        price: 500000,
        category: "do-du-lich",
        image: "../Image/balodulich.webp",
        description: "Balo du lịch bền bỉ, không thấm nước."
    }
];

// Render sản phẩm theo phân loại
function renderProductsByCategory(category) {
    const productsContainer = document.querySelector(".products");
    productsContainer.innerHTML = "";

    const filteredProducts = products.filter(product => product.category === category);

    if (filteredProducts.length === 0) {
        productsContainer.innerHTML = "<p>Không có sản phẩm thuộc loại này.</p>";
        return;
    }

    filteredProducts.forEach(product => {
        const productCard = document.createElement("div");
        productCard.className = "product-card";
        productCard.innerHTML = `
            <img src="${product.image}" alt="${product.name}">
            <h3>${product.name}</h3>
            <p>${product.price.toLocaleString()} VND</p>
            <button onclick="viewProductDetail(${product.id})">Xem chi tiết</button>
            <button onclick="addToCart(${product.id})">Thêm vào giỏ</button>
        `;
        productsContainer.appendChild(productCard);
    });
}

// Lấy tham số phân loại từ URL
function getCategoryFromURL() {
    const urlParams = new URLSearchParams(window.location.search);
    return urlParams.get('category');
}

// Tự động render khi trang tải
document.addEventListener("DOMContentLoaded", () => {
    const category = getCategoryFromURL();
    if (category) {
        renderProductsByCategory(category);
    } else {
        alert("Không tìm thấy loại sản phẩm!");
    }
});
