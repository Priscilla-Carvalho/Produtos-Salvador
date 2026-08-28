document.addEventListener("DOMContentLoaded", () => {
  /* ================= MENU ================= */

  const menuToggle = document.getElementById("menu-toggle");

  const nav = document.getElementById("nav");

  const navLinks = document.querySelectorAll(".nav-link");

  if (menuToggle && nav) {
    menuToggle.addEventListener("click", () => {
      nav.classList.toggle("open");

      const icon = menuToggle.querySelector("i");

      if (nav.classList.contains("open")) {
        icon.classList.remove("fa-bars");
        icon.classList.add("fa-xmark");
      } else {
        icon.classList.remove("fa-xmark");
        icon.classList.add("fa-bars");
      }
    });
  }

  navLinks.forEach((link) => {
    link.addEventListener("click", () => {
      if (nav) {
        nav.classList.remove("open");
      }

      if (menuToggle) {
        const icon = menuToggle.querySelector("i");

        if (icon) {
          icon.classList.remove("fa-xmark");
          icon.classList.add("fa-bars");
        }
      }
    });
  });

  /* ================= LINK ATIVO ================= */

  const sections = document.querySelectorAll("section[id]");

  function updateActiveLink() {
    let currentSection = "inicio";

    sections.forEach((section) => {
      const top = section.offsetTop - 140;

      if (window.scrollY >= top) {
        currentSection = section.getAttribute("id");
      }
    });

    navLinks.forEach((link) => {
      link.classList.remove("active");

      if (link.getAttribute("href") === "#" + currentSection) {
        link.classList.add("active");
      }
    });
  }

  window.addEventListener("scroll", updateActiveLink);

  updateActiveLink();

  /* ================= VER PRODUTOS ================= */

  const showMoreButton = document.getElementById("show-more-products");

  const extraProducts = document.querySelectorAll(".extra-product");

  let productsExpanded = false;

  if (showMoreButton) {
    showMoreButton.addEventListener("click", () => {
      productsExpanded = !productsExpanded;

      extraProducts.forEach((product) => {
        product.classList.toggle("show", productsExpanded);
      });

      if (productsExpanded) {
        showMoreButton.innerHTML = `
            MOSTRAR MENOS
            <i class="fa-solid fa-chevron-up"></i>
          `;
      } else {
        showMoreButton.innerHTML = `
            VER TODOS OS PRODUTOS
            <i class="fa-solid fa-chevron-down"></i>
          `;

        const productsSection = document.getElementById("produtos");

        if (productsSection) {
          productsSection.scrollIntoView({
            behavior: "smooth",
            block: "start",
          });
        }
      }
    });
  }

  /* =====================================================
     CARRINHO
  ===================================================== */

  const cartButton = document.getElementById("cart-button");

  const cartPanel = document.getElementById("cart-panel");

  const cartOverlay = document.getElementById("cart-overlay");

  const cartClose = document.getElementById("cart-close");

  const cartItems = document.getElementById("cart-items");

  const cartCount = document.getElementById("cart-count");

  const cartItemsText = document.getElementById("cart-items-text");

  const cartTotal = document.getElementById("cart-total");

  const checkoutWhatsapp = document.getElementById("checkout-whatsapp");

  const clearCart = document.getElementById("clear-cart");

  const whatsappNumber = "351913667138";

  let cart = [];

  /* =====================================================
     CARREGAR CARRINHO SALVO
  ===================================================== */

  try {
    const savedCart = localStorage.getItem("produtosSalvadorCart");

    if (savedCart) {
      cart = JSON.parse(savedCart);
    }
  } catch {
    cart = [];
  }

  /* =====================================================
     SALVAR CARRINHO
  ===================================================== */

  function saveCart() {
    localStorage.setItem("produtosSalvadorCart", JSON.stringify(cart));
  }

  /* =====================================================
     FORMATAR PREÇO
  ===================================================== */

  function formatPrice(value) {
    return value.toLocaleString("pt-PT", {
      style: "currency",
      currency: "EUR",
    });
  }

  /* =====================================================
     PREÇOS DE REVENDEDOR
  ===================================================== */

  function getUnitPrice(item) {
    const quantity = item.quantity;

    /* TORRESMO PURURUCA */

    if (item.name === "TORRESMO") {
      if (quantity >= 30) {
        return 2.5;
      }

      if (quantity >= 10) {
        return 3.0;
      }

      return 3.99;
    }

    /* TORRESMO PRÉ-FRITO */

    if (item.name === "TORRESMO PRÉ-FRITO") {
      if (quantity >= 2) {
        return 9.99;
      }

      return 11.99;
    }

    /* PÃO DE QUEIJO */

    if (item.name === "PÃO DE QUEIJO") {
      if (quantity >= 5) {
        return 5.5;
      }

      return 6.99;
    }

    /* COXINHA */

    if (item.name === "COXINHA") {
      if (quantity >= 5) {
        return 5.5;
      }

      return 6.99;
    }

    /* BOLINHA DE QUEIJO */

    if (item.name === "BOLINHA DE QUEIJO") {
      if (quantity >= 5) {
        return 5.5;
      }

      return 6.99;
    }

    /* PASTELZINHO */

    if (item.name === "PASTELZINHO DE CARNE") {
      if (quantity >= 5) {
        return 5.5;
      }

      return 6.99;
    }

    /* OUTROS PRODUTOS */

    return item.price;
  }

  /* =====================================================
     VERIFICAR SE TEM DESCONTO
  ===================================================== */

  function hasResellerDiscount(item) {
    return getUnitPrice(item) < item.price;
  }

  /* =====================================================
     AVISO DE PRÓXIMO DESCONTO
  ===================================================== */

  function getDiscountMessage(item) {
    const quantity = item.quantity;

    /* TORRESMO */

    if (item.name === "TORRESMO") {
      if (quantity < 10) {
        const faltam = 10 - quantity;

        return `
          Adicione mais ${faltam}
          ${faltam === 1 ? "pacote" : "pacotes"}
          e pague €3,00 cada.
        `;
      }

      if (quantity >= 10 && quantity < 30) {
        const faltam = 30 - quantity;

        return `
          Adicione mais ${faltam}
          ${faltam === 1 ? "pacote" : "pacotes"}
          e pague €2,50 cada.
        `;
      }

      return "";
    }

    /* TORRESMO PRÉ-FRITO */

    if (item.name === "TORRESMO PRÉ-FRITO") {
      if (quantity < 2) {
        return `
          Adicione mais 1 pacote
          e pague €9,99 cada.
        `;
      }

      return "";
    }

    /* PRODUTOS COM DESCONTO A PARTIR DE 5 */

    const produtosCinco = [
      "COXINHA",
      "PÃO DE QUEIJO",
      "BOLINHA DE QUEIJO",
      "PASTELZINHO DE CARNE",
    ];

    if (produtosCinco.includes(item.name)) {
      if (quantity < 5) {
        const faltam = 5 - quantity;

        return `
          Adicione mais ${faltam}
          ${faltam === 1 ? "pacote" : "pacotes"}
          e pague €5,50 cada.
        `;
      }
    }

    return "";
  }

  /* =====================================================
     ABRIR CARRINHO
  ===================================================== */

  function openCart() {
    if (!cartPanel || !cartOverlay) {
      return;
    }

    cartPanel.classList.add("open");

    cartOverlay.classList.add("open");

    document.body.classList.add("no-scroll");
  }

  /* =====================================================
     FECHAR CARRINHO
  ===================================================== */

  function closeCart() {
    if (!cartPanel || !cartOverlay) {
      return;
    }

    cartPanel.classList.remove("open");

    cartOverlay.classList.remove("open");

    document.body.classList.remove("no-scroll");
  }

  if (cartButton) {
    cartButton.addEventListener("click", openCart);
  }

  if (cartClose) {
    cartClose.addEventListener("click", closeCart);
  }

  if (cartOverlay) {
    cartOverlay.addEventListener("click", closeCart);
  }

  /* =====================================================
     ADICIONAR PRODUTOS
  ===================================================== */

  document.querySelectorAll(".product-card").forEach((card) => {
    const button = card.querySelector(".add-cart");

    if (!button) {
      return;
    }

    button.addEventListener("click", () => {
      const name = card.dataset.product;

      const price = Number(card.dataset.price);

      const unit = card.dataset.unit;

      const imageElement = card.querySelector(".product-image img");

      const image = imageElement ? imageElement.getAttribute("src") : "";

      const existing = cart.find((item) => item.name === name);

      if (existing) {
        existing.quantity += 1;
      } else {
        cart.push({
          name,
          price,
          unit,
          image,
          quantity: 1,
        });
      }

      saveCart();

      updateCart();

      const original = button.innerHTML;

      button.innerHTML = `
            <i class="fa-solid fa-check"></i>
            Adicionado
          `;

      button.style.background = "#25d366";

      setTimeout(() => {
        button.innerHTML = original;

        button.style.background = "";
      }, 900);

      if (cartButton) {
        cartButton.animate(
          [
            {
              transform: "scale(1)",
            },

            {
              transform: "scale(1.18)",
            },

            {
              transform: "scale(1)",
            },
          ],

          {
            duration: 400,
          },
        );
      }
    });
  });

  /* =====================================================
     ATUALIZAR CARRINHO
  ===================================================== */

  function updateCart() {
    if (!cartItems || !cartCount || !cartTotal || !cartItemsText) {
      return;
    }

    const quantity = cart.reduce((total, item) => total + item.quantity, 0);

    const total = cart.reduce((sum, item) => {
      const unitPrice = getUnitPrice(item);

      return sum + unitPrice * item.quantity;
    }, 0);

    cartCount.textContent = quantity;

    cartTotal.textContent = formatPrice(total);

    if (quantity === 0) {
      cartItemsText.textContent = "0 produtos";
    } else if (quantity === 1) {
      cartItemsText.textContent = "1 produto";
    } else {
      cartItemsText.textContent = `${quantity} produtos`;
    }

    if (checkoutWhatsapp) {
      checkoutWhatsapp.disabled = cart.length === 0;
    }

    /* CARRINHO VAZIO */

    if (cart.length === 0) {
      cartItems.innerHTML = `

        <div class="cart-empty">

          <i class="fa-solid fa-basket-shopping"></i>

          <h3>
            Seu carrinho está vazio
          </h3>

          <p>
            Escolha seus produtos favoritos
            e adicione-os à sua encomenda.
          </p>

        </div>

      `;

      return;
    }

    cartItems.innerHTML = "";

    cart.forEach((item, index) => {
      const unitPrice = getUnitPrice(item);

      const subtotal = unitPrice * item.quantity;

      const discount = hasResellerDiscount(item);

      const discountMessage = getDiscountMessage(item);

      const element = document.createElement("div");

      element.className = "cart-item";

      element.innerHTML = `

          <img
            src="${item.image}"
            alt="${item.name}"
            class="cart-item-image"
          />


          <div class="cart-item-info">

            <h3>
              ${item.name}
            </h3>


            ${
              discount
                ? `
                  <div
                    style="
                      color: #159447;
                      font-size: 9px;
                      font-weight: 800;
                      margin-top: 3px;
                    "
                  >
                    ✓ PREÇO DE REVENDEDOR APLICADO
                  </div>
                `
                : ""
            }


            <div class="cart-item-price">

              ${
                discount
                  ? `
                    <span
                      style="
                        text-decoration: line-through;
                        color: #9b8878;
                        margin-right: 5px;
                      "
                    >
                      ${formatPrice(item.price)}
                    </span>
                  `
                  : ""
              }

              ${formatPrice(unitPrice)}

              ${item.unit}

            </div>


            ${
              discountMessage
                ? `
                  <div
                    style="
                      margin-top: 5px;
                      padding: 5px 7px;
                      border-radius: 7px;
                      background: #fff5d7;
                      color: #7a5c40;
                      font-size: 8px;
                      line-height: 1.4;
                    "
                  >
                    💡 ${discountMessage}
                  </div>
                `
                : ""
            }


            <div class="cart-item-bottom">

              <div class="quantity-control">

                <button
                  type="button"
                  class="quantity-minus"
                  data-index="${index}"
                >
                  −
                </button>

                <span>
                  ${item.quantity}
                </span>

                <button
                  type="button"
                  class="quantity-plus"
                  data-index="${index}"
                >
                  +
                </button>

              </div>


              <div class="cart-subtotal">

                ${formatPrice(subtotal)}

              </div>

            </div>

          </div>


          <button
            type="button"
            class="cart-remove"
            data-index="${index}"
            aria-label="Remover produto"
          >

            <i class="fa-solid fa-trash"></i>

          </button>

        `;

      cartItems.appendChild(element);
    });

    /* BOTÃO MAIS */

    cartItems.querySelectorAll(".quantity-plus").forEach((button) => {
      button.addEventListener("click", () => {
        const index = Number(button.dataset.index);

        cart[index].quantity += 1;

        saveCart();

        updateCart();
      });
    });

    /* BOTÃO MENOS */

    cartItems.querySelectorAll(".quantity-minus").forEach((button) => {
      button.addEventListener("click", () => {
        const index = Number(button.dataset.index);

        if (cart[index].quantity > 1) {
          cart[index].quantity -= 1;
        } else {
          cart.splice(index, 1);
        }

        saveCart();

        updateCart();
      });
    });

    /* REMOVER */

    cartItems.querySelectorAll(".cart-remove").forEach((button) => {
      button.addEventListener("click", () => {
        const index = Number(button.dataset.index);

        cart.splice(index, 1);

        saveCart();

        updateCart();
      });
    });
  }

  /* =====================================================
     LIMPAR CARRINHO
  ===================================================== */

  if (clearCart) {
    clearCart.addEventListener("click", () => {
      if (cart.length === 0) {
        return;
      }

      cart = [];

      saveCart();

      updateCart();
    });
  }

  /* =====================================================
     FINALIZAR NO WHATSAPP
  ===================================================== */

  if (checkoutWhatsapp) {
    checkoutWhatsapp.addEventListener("click", () => {
      if (cart.length === 0) {
        return;
      }

      let message =
        "Olá! Gostaria de fazer uma encomenda na Produtos Salvador.\n\n";

      message += "🛒 *MEU PEDIDO*\n\n";

      cart.forEach((item) => {
        const unitPrice = getUnitPrice(item);

        const subtotal = unitPrice * item.quantity;

        const discount = hasResellerDiscount(item);

        message += `• *${item.name}*\n`;

        message += `Quantidade: ${item.quantity}\n`;

        if (discount) {
          message += `Preço normal: ${formatPrice(item.price)} ${item.unit}\n`;

          message += `Preço revendedor: ${formatPrice(unitPrice)} ${item.unit}\n`;
        } else {
          message += `Preço: ${formatPrice(unitPrice)} ${item.unit}\n`;
        }

        message += `Subtotal: ${formatPrice(subtotal)}\n\n`;
      });

      const total = cart.reduce((sum, item) => {
        const unitPrice = getUnitPrice(item);

        return sum + unitPrice * item.quantity;
      }, 0);

      message += `💰 *TOTAL: ${formatPrice(total)}*\n\n`;

      message +=
        "Gostaria de confirmar a disponibilidade e combinar a entrega/levantamento.";

      const url = `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(message)}`;

      window.location.href = url;
    });
  }

  /* =====================================================
     TABELA REVENDEDOR
  ===================================================== */

  const openResellerTable = document.getElementById("open-reseller-table");

  const resellerTablePanel = document.getElementById("reseller-table-panel");

  const resellerTableOverlay = document.getElementById(
    "reseller-table-overlay",
  );

  const closeResellerTable = document.getElementById("close-reseller-table");

  function openTable() {
    if (!resellerTablePanel || !resellerTableOverlay) {
      return;
    }

    resellerTablePanel.classList.add("open");

    resellerTableOverlay.classList.add("open");

    document.body.classList.add("no-scroll");
  }

  function closeTable() {
    if (!resellerTablePanel || !resellerTableOverlay) {
      return;
    }

    resellerTablePanel.classList.remove("open");

    resellerTableOverlay.classList.remove("open");

    document.body.classList.remove("no-scroll");
  }

  if (openResellerTable) {
    openResellerTable.addEventListener("click", openTable);
  }

  if (closeResellerTable) {
    closeResellerTable.addEventListener("click", closeTable);
  }

  if (resellerTableOverlay) {
    resellerTableOverlay.addEventListener("click", closeTable);
  }

  /* ================= ESC ================= */

  document.addEventListener("keydown", (event) => {
    if (event.key === "Escape") {
      closeCart();

      closeTable();

      if (nav) {
        nav.classList.remove("open");
      }
    }
  });

  /* ================= INICIAR ================= */

  updateCart();
});
