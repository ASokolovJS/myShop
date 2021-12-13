const toCurrency = (price) => {
  return new Intl.NumberFormat("ru-RU", {
    currency: "rub",
    style: "currency",
  }).format(price);
};

const toDate = (date) => {
  return new Intl.DateTimeFormat("ru-RU", {
    day: "2-digit",
    month: "long",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
  }).format(new Date(date));
};

document.querySelectorAll(".date").forEach((node) => {
  node.textContent = toDate(node.textContent);
});

document.querySelectorAll(".price").forEach((node) => {
  node.textContent = toCurrency(node.textContent);
});

//Уменьшение кол-во товара
const $card = document.querySelector("#card");
if ($card) {
  $card.addEventListener("click", (event) => {
    if (event.target.classList.contains("js-remove")) {
      const id = event.target.dataset.id;
      const csrf = event.target.dataset.csrf;
      fetch("/card/remove/" + id, {
        method: "delete",
        headers: {
          "X-XSRF-TOKEN": csrf,
        },
      })
        .then((res) => res.json())
        .then((card) => {
          if (card.products.length) {
            const html = card.products
              .map((c) => {
                return `
              <tr>
                <td>${c.title}</td>
                <td>
                  <button class="btn btn-outline-light btn-sm js-remove mx-2"
                  data-id="${c.id}"
                  data-csrf="${csrf}">-</button>
                  ${c.productValue} гр
                  <button class="btn btn-outline-light btn-sm js-add ms-2"
                  data-id="${c.id}"
                  data-csrf="${csrf}"
                  >+</button>
                </td>
                <td>
                <td>
                    <button
                      class="btn btn-outline-light btn-sm js-removeFull"
                      data-id="${c.id}"
                      data-csrf="${csrf}"
                    >Удалить</button>
                </td>
              </tr>
            `;
              })
              .join("");
            $card.querySelector("tbody").innerHTML = html;
            $card.querySelector(".price").textContent = toCurrency(card.price);
          } else {
            $card.innerHTML = `
            <h1 class="text-center mt-3">Корзина</h1>
            <table class="table text-center">
              <thead>
                <tr>
                  <th>Товаров нет</th>
                </tr>
              </thead>
            </table>`;
          }
        });
    }
  });
}

//Удаление выборочного товара
if ($card) {
  $card.addEventListener("click", (event) => {
    if (event.target.classList.contains("js-removeFull")) {
      const id = event.target.dataset.id;
      const csrf = event.target.dataset.csrf;
      fetch("/card/removeFull/" + id, {
        method: "delete",
        headers: {
          "X-XSRF-TOKEN": csrf,
        },
      })
        .then((res) => res.json())
        .then((card) => {
          if (card.products.length) {
            const html = card.products
              .map((c) => {
                return `
              <tr>
                <td>${c.title}</td>
                <td>
                  <button class="btn btn-outline-light btn-sm js-remove mx-2"
                  data-id="${c.id}"
                  data-csrf="${csrf}">-</button>
                  ${c.productValue} гр
                  <button class="btn btn-outline-light btn-sm js-add ms-2"
                  data-id="${c.id}"
                  data-csrf="${csrf}"
                  >+</button>
                </td>
                <td>
                  <button
                    class="btn btn-outline-light btn-sm js-removeFull"
                    data-id="${c.id}"
                    data-csrf="${csrf}"
                  >Удалить</button>
                </td>
              </tr>
            `;
              })
              .join("");
            $card.querySelector("tbody").innerHTML = html;
            $card.querySelector(".price").textContent = toCurrency(card.price);
          } else {
            $card.innerHTML = `
            <h1 class="text-center mt-3">Корзина</h1>
            <table class="table text-center">
              <thead>
                <tr>
                  <th>Товаров нет</th>
                </tr>
              </thead>
            </table>`;
          }
        });
    }
  });
}
//Добавление кол-во товара
if ($card) {
  $card.addEventListener("click", (event) => {
    if (event.target.classList.contains("js-add")) {
      const id = event.target.dataset.id;
      const body = new FormData();
      body.append("id", id);
      body.append("count", "50");
      const csrf = event.target.dataset.csrf;
      fetch("/card/update", {
        method: "POST",
        body: body,
        headers: {
          "X-XSRF-TOKEN": csrf,
        },
      })
        .then((res) => res.json())
        .then((card) => {
          console.log();
          if (card.products.length) {
            const html = card.products
              .map((c) => {
                return `
              <tr>
                <td>${c.title}</td>
                <td>
                  <button class="btn btn-outline-light btn-sm js-remove mx-2"
                  data-id="${c.id}"
                  data-csrf="${csrf}">-</button>
                  ${c.productValue} гр
                  <button class="btn btn-outline-light btn-sm js-add ms-2"
                  data-id="${c.id}"
                  data-csrf="${csrf}"
                  >+</button>
                </td>
                <td>
                <td>
                    <button
                      class="btn btn-outline-light btn-sm js-removeFull"
                      data-id="${c.id}"
                      data-csrf="${csrf}"
                    >Удалить</button>
                </td>
              </tr>
            `;
              })
              .join("");
            $card.querySelector("tbody").innerHTML = html;
            $card.querySelector(".price").textContent = toCurrency(card.price);
          } else {
            $card.innerHTML = `
            <h1 class="text-center mt-3">Корзина</h1>
            <table class="table text-center">
              <thead>
                <tr>
                  <th>Товаров нет</th>
                </tr>
              </thead>
            </table>`;
          }
        });
    }
  });
}

//Вешаем на каждую карточку обработчик добавления в корзину
const addBtn = document.querySelectorAll(".addBtn");
const body = document.querySelectorAll(".addCard");

for (let i = 0; i < addBtn.length; i++) {
  addBtn[i].addEventListener("click", () => {
    try {
      const item = new FormData(body[i]);
      const csrf = document.getElementById("csrf");
      fetch("/card/add", {
        method: "POST",
        body: item,
        headers: {
          "X-XSRF-TOKEN": csrf.value,
        },
      });
    } catch (error) {
      console.log(error);
    }
  });
}

//Всплывающие уведомления
var toastTrigger = document.querySelectorAll("#liveToastBtn");
var toastLiveExample = document.querySelectorAll("#liveToast");
for (let i = 0; i < toastTrigger.length; i++) {
  if (toastTrigger[i]) {
    toastTrigger[i].addEventListener("click", function () {
      var toast = new bootstrap.Toast(toastLiveExample[i]);

      toast.show();
    });
  }
}
