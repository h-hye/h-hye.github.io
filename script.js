/* 수량 변경 */
function changeQty(btn, amount) {
    const qtyElement = btn.parentElement.querySelector(".qty");
    let current = parseInt(qtyElement.innerText);

    current += amount;
    if (current < 0) current = 0;

    qtyElement.innerText = current;
}

/* 금액 계산 */
function changeQty(btn, amount) {
    const quantityBox = btn.parentElement;
    const qtyElement = quantityBox.querySelector(".qty");

    let currentQty = parseInt(qtyElement.innerText);
    currentQty += amount;

    if (currentQty < 0) {
        currentQty = 0;
    }

    qtyElement.innerText = currentQty;

    updateTotalPrice();
}

function updateTotalPrice() {
    const menuItems = document.querySelectorAll(".menu-item");
    let total = 0;

    menuItems.forEach(function(item) {
        const price = parseInt(item.dataset.price);
        const qty = parseInt(item.querySelector(".qty").innerText);

        total += price * qty;
    });

    // 택배비 5000원 추가
    if (total > 0) total += 5000;
    document.getElementById("total-price").innerText = total.toLocaleString();
}

/* 주문 문자 전송하기 */
function sendSMS() {
    const items = document.querySelectorAll(".menu-item");
    const date = document.getElementById("delivery-date").value;
    const total = document.getElementById("total-price").innerText;

    let message = "진우네편육 주문서\n\n";
    let hasOrder = false;

    items.forEach(item => {
        const name = item.querySelector(".menu-name").innerText;
        const qty = parseInt(item.querySelector(".qty").innerText);

        if (qty > 0) {
            message += `🍽️${name} : ${qty}개\n`;
            hasOrder = true;
        }
    });

    if (!hasOrder) {
        alert("메뉴를 선택해 주세요!");
        return;
    }

    if (!date) {
        alert("배송 날짜를 선택해 주세요!");
        return;
    }

    message += `\n📅 배송 날짜: ${date}`;
    message += `\n💰 총 금액: ${total}원`;

    const phoneNumber = "+821076691158"; // 사장님 전화번호

    window.location.href = `sms:${phoneNumber}?body=${encodeURIComponent(message)}`;
}