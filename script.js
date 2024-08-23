function addItem() {
    var itemInput = document.getElementById("itemInput");
    var quantityInput = document.getElementById("quantityInput");

    var itemName = itemInput.value.trim();
    var quantity = quantityInput.value.trim();

    if (quantity) {
        var quantityPattern = /^(\d+)(\s*(kg|g)?)$/i;
        var quantityMatch = quantity.match(quantityPattern);
        if (quantityMatch) {
            quantity = quantityMatch[1] + (quantityMatch[3] ? ' ' + quantityMatch[3].toLowerCase() : '');
        } else {
            alert("يرجى إدخال كمية صحيحة مع الوحدة (اختياري).");
            return;
        }
    }

    if (itemName) {
        var li = document.createElement("li");
        li.innerHTML = `${itemName}${quantity ? ' (كمية: ' + quantity + ')' : ''} 
            <button class="delete-btn" onclick="deleteItem(this)"><i class="fas fa-trash"></i> حذف</button>
        `;
        document.getElementById("itemsList").appendChild(li);
        itemInput.value = "";
        quantityInput.value = "";
    } else {
        alert("يرجى إدخال اسم المنتج.");
    }
}

function deleteItem(button) {
    var li = button.parentElement;
    li.remove();
}

function saveList() {
    var itemsList = [];
    var items = document.querySelectorAll("#itemsList li");
    items.forEach(item => {
        itemsList.push(item.innerText.replace("حذف", "").trim());
    });
    localStorage.setItem("shoppingList", JSON.stringify(itemsList));
    alert("تم حفظ القائمة بنجاح.");
}

function toggleDarkMode() {
    document.body.classList.toggle('dark-mode');
    document.querySelector('header').classList.toggle('dark-mode');
    document.querySelector('.container').classList.toggle('dark-mode');
    document.querySelectorAll('h2').forEach(h => h.classList.toggle('dark-mode'));
    document.querySelectorAll('li').forEach(li => li.classList.toggle('dark-mode'));

    // تغيير أيقونة الوضع المظلم
    document.getElementById('moonIcon').classList.toggle('active');
    document.getElementById('sunIcon').classList.toggle('active');

    // حفظ الحالة في LocalStorage
    if (document.body.classList.contains('dark-mode')) {
        localStorage.setItem('dark-mode', 'enabled');
    } else {
        localStorage.setItem('dark-mode', 'disabled');
    }
}

document.addEventListener('DOMContentLoaded', () => {
    // التحقق من الوضع المظلم المحفوظ
    if (localStorage.getItem('dark-mode') === 'enabled') {
        toggleDarkMode();
    }

    // إضافة حدث لتبديل الوضع المظلم عند النقر
    document.querySelector('#toggleDarkMode').addEventListener('click', toggleDarkMode);
});
