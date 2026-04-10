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

/* 주소 검색 */
function execDaumPostcode() {
        new daum.Postcode({

            oncomplete: function(data) {
                console.log(data); // 확인용

                var addr = data.roadAddress || data.jibunAddress;
                // 우편번호와 주소 정보를 해당 필드에 넣는다.
                document.getElementById('postcode').value = data.zonecode;
                document.getElementById("address").value = addr;
                document.getElementById("detail").focus();
            }
            
        }).open();
    }

/* 주문 문자 전송하기 */
function sendSMS() {
    const items = document.querySelectorAll(".menu-item");
    const date = document.getElementById("delivery-date").value;
    const total = document.getElementById("total-price").innerText;
    const customerName = document.getElementById("customer-name").value;
    const customerPhone = document.getElementById("customer-phone").value;
    const postcode = document.getElementById("postcode").value;
    const address = document.getElementById("address").value;
    const detail = document.getElementById("detail").value;

    let message = "임말순편육 주문서\n";
    message += `━━━━━━━━━━━━━━━━━━━━━━━━━━\n\n`;
    let hasOrder = false;

    if (!date) {
        alert("배송 날짜를 선택해 주세요!");
        return;
    }

    if (!customerName || !customerPhone) {
        alert("주문자 정보를 입력해 주세요!");
        return;
    }

    if (!postcode || !address || !detail) {
    alert("배송지 정보를 모두 입력해 주세요!");
    return;
    }

    items.forEach(item => {
        const name = item.querySelector(".menu-name").innerText;
        const qty = parseInt(item.querySelector(".qty").innerText);

        if (qty > 0) {
            message += `🍽️ ${name} : ${qty}개\n`;
            hasOrder = true;
        }
    });
    if (!hasOrder) {
        alert("메뉴를 선택해 주세요!");
        return;
    }
    message += `💰 총 금액: ${total}원\n`;

    message += `--------------------------\n\n`;

    message += `👤 주문자: ${customerName}\n`;
    message += `📞 연락처: ${customerPhone}\n\n`;

    message += `📍 배송지\n`;
    message += `우편번호 : ${postcode}\n`;
    message += `주소 : ${address} ${detail}\n\n`;

    message += `--------------------------\n\n`;

    message += `📅 희망 배송 날짜: ${date}`;
    

    const phoneNumber = "+821076691158";
    window.location.href = `sms:${phoneNumber}?body=${encodeURIComponent(message)}`;
}