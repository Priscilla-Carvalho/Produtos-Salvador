// ============================================
// PRODUTOS SALVADOR - REI DO TORRESMO
// JAVASCRIPT COMPLETO
// ============================================

document.addEventListener("DOMContentLoaded", function () {
  // ==========================================
  // MENU MOBILE
  // ==========================================

  const navToggle = document.querySelector(".nav-toggle");
  const nav = document.querySelector("nav");
  const headerCta = document.querySelector(".header-cta");

  if (navToggle && nav) {
    navToggle.addEventListener("click", function () {
      nav.classList.toggle("nav-open");

      if (headerCta) {
        headerCta.classList.toggle("cta-open");
      }
    });
  }

  // ==========================================
  // FECHAR MENU AO CLICAR EM UM LINK
  // ==========================================

  document.querySelectorAll("nav a").forEach(function (link) {
    link.addEventListener("click", function () {
      if (nav) {
        nav.classList.remove("nav-open");
      }

      if (headerCta) {
        headerCta.classList.remove("cta-open");
      }
    });
  });

  // ==========================================
  // ROLAGEM SUAVE
  // ==========================================

  document.querySelectorAll('a[href^="#"]').forEach(function (link) {
    link.addEventListener("click", function (e) {
      const targetId = this.getAttribute("href");

      if (targetId && targetId.length > 1) {
        const target = document.querySelector(targetId);

        if (target) {
          e.preventDefault();

          target.scrollIntoView({
            behavior: "smooth",
            block: "start",
          });
        }
      }
    });
  });

  // ==========================================
  // VER TODOS OS PRODUTOS
  // ==========================================

  const btnProdutos = document.getElementById("btn-ver-produtos");

  const produtosExtras = document.querySelectorAll(".extra-product");

  if (btnProdutos) {
    btnProdutos.addEventListener("click", function () {
      const produtosEstaoVisiveis =
        produtosExtras.length > 0 &&
        produtosExtras[0].classList.contains("show-product");

      // ======================================
      // MOSTRAR PRODUTOS
      // ======================================

      if (!produtosEstaoVisiveis) {
        produtosExtras.forEach(function (produto) {
          produto.classList.add("show-product");
        });

        btnProdutos.textContent = "MOSTRAR MENOS ↑";

        setTimeout(function () {
          if (produtosExtras.length > 0) {
            produtosExtras[0].scrollIntoView({
              behavior: "smooth",
              block: "center",
            });
          }
        }, 100);
      }

      // ======================================
      // ESCONDER PRODUTOS
      // ======================================
      else {
        produtosExtras.forEach(function (produto) {
          produto.classList.remove("show-product");
        });

        btnProdutos.textContent = "VER TODOS OS PRODUTOS →";

        const produtosSection = document.getElementById("produtos");

        if (produtosSection) {
          produtosSection.scrollIntoView({
            behavior: "smooth",
            block: "start",
          });
        }
      }
    });
  }

  // ==========================================
  // LINK ATIVO DO MENU
  // ==========================================

  const sections = document.querySelectorAll("section[id]");

  const navLinks = document.querySelectorAll("nav a");

  // ==========================================
  // BOLINHA AMARELA DO MENU
  // ==========================================

  const navUl = document.querySelector("nav ul");

  const navIndicator = document.querySelector(".nav-indicator");

  const navItems = document.querySelectorAll("nav a");

  function moveIndicator(target) {
    if (!navIndicator || !target) {
      return;
    }

    navIndicator.style.left = target.offsetLeft + "px";

    navIndicator.style.width = target.offsetWidth + "px";
  }

  if (navIndicator && navItems.length) {
    const activeLink = document.querySelector("nav a.active");

    if (activeLink) {
      moveIndicator(activeLink);
    }

    navItems.forEach(function (link) {
      link.addEventListener("mouseenter", function () {
        moveIndicator(link);
      });
    });

    if (navUl) {
      navUl.addEventListener("mouseleave", function () {
        const current = document.querySelector("nav a.active");

        if (current) {
          moveIndicator(current);
        }
      });
    }
  }

  // ==========================================
  // MARCAR LINK ATIVO
  // ==========================================

  function marcarLinkAtivo() {
    let atual = "";

    sections.forEach(function (section) {
      const topo = section.offsetTop - 120;

      if (window.scrollY >= topo) {
        atual = section.getAttribute("id");
      }
    });

    navLinks.forEach(function (link) {
      link.classList.remove("active");

      if (link.getAttribute("href") === "#" + atual) {
        link.classList.add("active");
      }
    });

    const activeNow = document.querySelector("nav a.active");

    if (activeNow) {
      moveIndicator(activeNow);
    }
  }

  window.addEventListener("scroll", marcarLinkAtivo);

  marcarLinkAtivo();

  // ==========================================
  // ENCOMENDAS
  // ==========================================
  //
  // FUNCIONA NO TOPO E NO RODAPÉ
  //
  // Ao clicar:
  // 1. Não abre #encomendas
  // 2. Vai até o botão verdadeiro
  // 3. O botão chama atenção por 5 segundos
  //
  // ==========================================

  const linksEncomendas = document.querySelectorAll('a[href="#encomendas"]');

  const botaoEncomenda = document.getElementById("botao-encomenda");

  if (linksEncomendas.length && botaoEncomenda) {
    linksEncomendas.forEach(function (link) {
      link.addEventListener("click", function (e) {
        e.preventDefault();

        // Fecha menu mobile

        if (nav) {
          nav.classList.remove("nav-open");
        }

        if (headerCta) {
          headerCta.classList.remove("cta-open");
        }

        // Vai até o botão verdadeiro

        botaoEncomenda.scrollIntoView({
          behavior: "smooth",
          block: "center",
        });

        // Espera a rolagem terminar

        setTimeout(function () {
          // Reinicia a animação

          botaoEncomenda.classList.remove("chamar-encomenda");

          void botaoEncomenda.offsetWidth;

          // Começa animação

          botaoEncomenda.classList.add("chamar-encomenda");

          // Para depois de 5 segundos

          setTimeout(function () {
            botaoEncomenda.classList.remove("chamar-encomenda");
          }, 5000);
        }, 700);
      });
    });
  }

  // ==========================================
  // REVENDEDOR
  // ==========================================
  //
  // FUNCIONA NO TOPO E NO RODAPÉ
  //
  // Ao clicar:
  // 1. Vai até a seção revendedor
  // 2. Encontra o botão
  // 3. Faz o botão chamar atenção
  // 4. Mantém por 5 segundos
  //
  // ==========================================

  const linksRevendedor = document.querySelectorAll('a[href="#revendedor"]');

  const secaoRevendedor = document.getElementById("revendedor");

  const botaoRevendedor = document.getElementById("botao-revendedor");

  if (linksRevendedor.length && secaoRevendedor && botaoRevendedor) {
    linksRevendedor.forEach(function (link) {
      link.addEventListener("click", function (event) {
        event.preventDefault();

        // Fecha menu mobile

        if (nav) {
          nav.classList.remove("nav-open");
        }

        if (headerCta) {
          headerCta.classList.remove("cta-open");
        }

        // Vai até a seção

        secaoRevendedor.scrollIntoView({
          behavior: "smooth",
          block: "center",
        });

        // Espera a rolagem

        setTimeout(function () {
          // Reinicia animação

          botaoRevendedor.classList.remove("chamar-atencao");

          void botaoRevendedor.offsetWidth;

          // Começa animação

          botaoRevendedor.classList.add("chamar-atencao");

          // Para depois de 5 segundos

          setTimeout(function () {
            botaoRevendedor.classList.remove("chamar-atencao");
          }, 5000);
        }, 700);
      });
    });
  }

  // =========================================================
  // CARRINHO DE COMPRAS
  // =========================================================

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

  const cartGoProducts = document.getElementById("cart-go-products");

  // ==========================================
  // WHATSAPP
  // ==========================================

  const whatsappNumber = "351913667138";

  // ==========================================
  // CARRINHO
  // ==========================================

  let carrinho = [];

  // ==========================================
  // ABRIR CARRINHO
  // ==========================================

  function abrirCarrinho() {
    if (!cartPanel || !cartOverlay) {
      return;
    }

    cartPanel.classList.add("cart-open");

    cartOverlay.classList.add("cart-open");

    document.body.style.overflow = "hidden";
  }

  // ==========================================
  // FECHAR CARRINHO
  // ==========================================

  function fecharCarrinho() {
    if (!cartPanel || !cartOverlay) {
      return;
    }

    cartPanel.classList.remove("cart-open");

    cartOverlay.classList.remove("cart-open");

    document.body.style.overflow = "";
  }

  // ==========================================
  // EVENTOS DO CARRINHO
  // ==========================================

  if (cartButton) {
    cartButton.addEventListener("click", abrirCarrinho);
  }

  if (cartClose) {
    cartClose.addEventListener("click", fecharCarrinho);
  }

  if (cartOverlay) {
    cartOverlay.addEventListener("click", fecharCarrinho);
  }

  // ==========================================
  // ADICIONAR PRODUTO
  // ==========================================

  document.querySelectorAll(".product-card").forEach(function (card) {
    const button = card.querySelector(".btn-add-cart");

    if (!button) {
      return;
    }

    button.addEventListener("click", function () {
      const nome = card.dataset.product;

      const preco = Number(card.dataset.price);

      const unidade = card.dataset.unit;

      const imagemElement = card.querySelector("img");

      const imagem = imagemElement ? imagemElement.getAttribute("src") : "";

      const produtoExistente = carrinho.find(function (item) {
        return item.nome === nome;
      });

      if (produtoExistente) {
        produtoExistente.quantidade += 1;
      } else {
        carrinho.push({
          nome: nome,

          preco: preco,

          unidade: unidade,

          imagem: imagem,

          quantidade: 1,
        });
      }

      atualizarCarrinho();

      // Animação do carrinho

      if (cartButton) {
        cartButton.classList.remove("cart-bump");

        void cartButton.offsetWidth;

        cartButton.classList.add("cart-bump");

        setTimeout(function () {
          cartButton.classList.remove("cart-bump");
        }, 500);
      }
    });
  });

  // ==========================================
  // FORMATAR PREÇO
  // ==========================================

  function formatarPreco(valor) {
    return valor.toLocaleString("pt-PT", {
      style: "currency",
      currency: "EUR",
    });
  }

  // ==========================================
  // ATUALIZAR CARRINHO
  // ==========================================

  function atualizarCarrinho() {
    if (!cartItems) {
      return;
    }

    const quantidadeTotal = carrinho.reduce(function (total, item) {
      return total + item.quantidade;
    }, 0);

    const valorTotal = carrinho.reduce(function (total, item) {
      return total + item.preco * item.quantidade;
    }, 0);

    // CONTADOR

    if (cartCount) {
      cartCount.textContent = quantidadeTotal;
    }

    // TEXTO DO CABEÇALHO

    if (cartItemsText) {
      if (quantidadeTotal === 0) {
        cartItemsText.textContent = "0 produtos";
      } else if (quantidadeTotal === 1) {
        cartItemsText.textContent = "1 produto";
      } else {
        cartItemsText.textContent = quantidadeTotal + " produtos";
      }
    }

    // TOTAL

    if (cartTotal) {
      cartTotal.textContent = formatarPreco(valorTotal);
    }

    // BOTÃO WHATSAPP

    if (checkoutWhatsapp) {
      checkoutWhatsapp.disabled = carrinho.length === 0;
    }

    // ========================================
    // CARRINHO VAZIO
    // ========================================

    if (carrinho.length === 0) {
      cartItems.innerHTML = `

        <div class="cart-empty">

          <i class="fa-solid fa-cart-shopping"></i>

          <h3>
            Seu carrinho está vazio
          </h3>

          <p>
            Adicione os produtos que deseja encomendar.
          </p>

          <button
            type="button"
            id="cart-go-products"
            class="btn"
          >
            VER PRODUTOS
          </button>

        </div>

      `;

      const novoBotaoProdutos = document.getElementById("cart-go-products");

      if (novoBotaoProdutos) {
        novoBotaoProdutos.addEventListener("click", function () {
          fecharCarrinho();

          const produtos = document.getElementById("produtos");

          if (produtos) {
            produtos.scrollIntoView({
              behavior: "smooth",
              block: "start",
            });
          }
        });
      }

      return;
    }

    // ========================================
    // RENDERIZAR PRODUTOS
    // ========================================

    cartItems.innerHTML = "";

    carrinho.forEach(function (item, index) {
      const subtotal = item.preco * item.quantidade;

      const elemento = document.createElement("div");

      elemento.className = "cart-item";

      elemento.innerHTML = `

          <img
            class="cart-item-image"
            src="${item.imagem}"
            alt="${item.nome}"
          >

          <div class="cart-item-info">

            <h3>
              ${item.nome}
            </h3>

            <div class="cart-item-price">
              ${formatarPreco(item.preco)}
              ${item.unidade}
            </div>

            <div class="cart-quantity">

              <button
                type="button"
                class="quantity-minus"
                data-index="${index}"
              >
                −
              </button>

              <span>
                ${item.quantidade}
              </span>

              <button
                type="button"
                class="quantity-plus"
                data-index="${index}"
              >
                +
              </button>

            </div>

            <div class="cart-item-subtotal">
              ${formatarPreco(subtotal)}
            </div>

          </div>

          <button
            type="button"
            class="cart-remove"
            data-index="${index}"
            aria-label="Remover ${item.nome}"
          >
            <i class="fa-solid fa-trash"></i>
          </button>

        `;

      cartItems.appendChild(elemento);
    });

    // ========================================
    // BOTÕES +
    // ========================================

    cartItems.querySelectorAll(".quantity-plus").forEach(function (button) {
      button.addEventListener("click", function () {
        const index = Number(button.dataset.index);

        carrinho[index].quantidade += 1;

        atualizarCarrinho();
      });
    });

    // ========================================
    // BOTÕES -
    // ========================================

    cartItems.querySelectorAll(".quantity-minus").forEach(function (button) {
      button.addEventListener("click", function () {
        const index = Number(button.dataset.index);

        if (carrinho[index].quantidade > 1) {
          carrinho[index].quantidade -= 1;
        } else {
          carrinho.splice(index, 1);
        }

        atualizarCarrinho();
      });
    });

    // ========================================
    // BOTÕES REMOVER
    // ========================================

    cartItems.querySelectorAll(".cart-remove").forEach(function (button) {
      button.addEventListener("click", function () {
        const index = Number(button.dataset.index);

        carrinho.splice(index, 1);

        atualizarCarrinho();
      });
    });
  }

  // ==========================================
  // LIMPAR CARRINHO
  // ==========================================

  if (clearCart) {
    clearCart.addEventListener("click", function () {
      if (carrinho.length === 0) {
        return;
      }

      carrinho = [];

      atualizarCarrinho();
    });
  }

  // ==========================================
  // IR PARA PRODUTOS
  // ==========================================

  if (cartGoProducts) {
    cartGoProducts.addEventListener("click", function () {
      fecharCarrinho();

      const produtos = document.getElementById("produtos");

      if (produtos) {
        produtos.scrollIntoView({
          behavior: "smooth",
          block: "start",
        });
      }
    });
  }

  // ==========================================
  // FINALIZAR PEDIDO NO WHATSAPP
  // ==========================================

  if (checkoutWhatsapp) {
    checkoutWhatsapp.addEventListener("click", function () {
      if (carrinho.length === 0) {
        return;
      }

      let mensagem =
        "Olá! Gostaria de fazer uma encomenda pelo site da Produtos Salvador.%0A%0A";

      mensagem += "🛒 *MEU PEDIDO*%0A%0A";

      carrinho.forEach(function (item) {
        const subtotal = item.preco * item.quantidade;

        mensagem += "• " + item.nome + "%0A";

        mensagem += "  Quantidade: " + item.quantidade + "%0A";

        mensagem +=
          "  Preço: " + formatarPreco(item.preco) + " " + item.unidade + "%0A";

        mensagem += "  Subtotal: " + formatarPreco(subtotal) + "%0A%0A";
      });

      const valorTotal = carrinho.reduce(function (total, item) {
        return total + item.preco * item.quantidade;
      }, 0);

      mensagem += "💰 *TOTAL: " + formatarPreco(valorTotal) + "*%0A%0A";

      mensagem += "Gostaria de confirmar a minha encomenda. Obrigado!";

      const url = "https://wa.me/" + whatsappNumber + "?text=" + mensagem;

      window.open(url, "_blank");
    });
  }

  // ==========================================
  // INICIALIZAR CARRINHO
  // ==========================================

  atualizarCarrinho();
});
