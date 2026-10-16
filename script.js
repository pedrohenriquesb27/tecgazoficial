/**
 * Tecgáz Aquecedores - Interatividade JavaScript
 * Funcionalidades: Carrossel de 5 banners, Seletor Dinâmico de Unidades,
 * Modal de Orçamento Rápido, Menu Mobile e Integração WhatsApp.
 */

document.addEventListener('DOMContentLoaded', () => {
    // Inicializar ícones Lucide
    if (window.lucide) {
        window.lucide.createIcons();
    }

    // Configuração das Unidades
    const UNITS_CONFIG = {
        mooca: {
            name: "Unidade Mooca (São Paulo)",
            phoneFormatted: "(11) 99134-6356",
            phoneRaw: "5511991346356",
            address: "Rua da Mooca, 2850 - Mooca, São Paulo - SP, CEP 03165-000",
            region: "Zona Leste, Centro, Zona Sul e Região Metropolitana",
            hours: "Seg à Sex: 08h às 18h | Sáb: 08h às 13h",
            mapsUrl: "https://maps.google.com/?q=Mooca,+São+Paulo+-+SP"
        },
        guarulhos: {
            name: "Unidade Guarulhos",
            phoneFormatted: "(11) 94030-0560",
            phoneRaw: "5511940300560",
            address: "Av. Paulo Faccini, 1420 - Centro / Maia, Guarulhos - SP, CEP 07115-260",
            region: "Guarulhos, Zona Norte de SP, Alto Tietê e Região",
            hours: "Seg à Sex: 08h às 18h | Sáb: 08h às 13h",
            mapsUrl: "https://maps.google.com/?q=Guarulhos+-+SP"
        }
    };

    /* ==========================================================================
       1. CARROSSEL DO HERO (5 BANNERS COM AUTOPLAY E TRANSIÇÃO SUAVE)
       ========================================================================== */
    const slides = document.querySelectorAll('.carousel-slide');
    const indicators = document.querySelectorAll('.carousel-indicator');
    const prevBtn = document.getElementById('carousel-prev');
    const nextBtn = document.getElementById('carousel-next');
    const carouselContainer = document.getElementById('hero-carousel');

    let currentSlide = 0;
    const totalSlides = slides.length;
    let carouselInterval = null;
    const AUTO_DELAY = 6000;

    function showSlide(index) {
        if (index < 0) {
            currentSlide = totalSlides - 1;
        } else if (index >= totalSlides) {
            currentSlide = 0;
        } else {
            currentSlide = index;
        }

        slides.forEach((slide, idx) => {
            if (idx === currentSlide) {
                slide.classList.add('active');
            } else {
                slide.classList.remove('active');
            }
        });

        indicators.forEach((indicator, idx) => {
            if (idx === currentSlide) {
                indicator.classList.add('active');
                indicator.classList.remove('bg-slate-300', 'bg-white/40');
                indicator.classList.add('bg-[#E52421]', 'w-10');
            } else {
                indicator.classList.remove('active', 'bg-[#E52421]', 'w-10');
                indicator.classList.add('bg-slate-300', 'w-3');
            }
        });
    }

    function startAutoplay() {
        if (carouselInterval) clearInterval(carouselInterval);
        carouselInterval = setInterval(() => {
            showSlide(currentSlide + 1);
        }, AUTO_DELAY);
    }

    function stopAutoplay() {
        if (carouselInterval) {
            clearInterval(carouselInterval);
            carouselInterval = null;
        }
    }

    if (slides.length > 0) {
        showSlide(0);
        startAutoplay();

        if (prevBtn) {
            prevBtn.addEventListener('click', () => {
                showSlide(currentSlide - 1);
                startAutoplay();
            });
        }

        if (nextBtn) {
            nextBtn.addEventListener('click', () => {
                showSlide(currentSlide + 1);
                startAutoplay();
            });
        }

        indicators.forEach((indicator) => {
            indicator.addEventListener('click', (e) => {
                const targetIdx = parseInt(e.currentTarget.getAttribute('data-index'), 10);
                showSlide(targetIdx);
                startAutoplay();
            });
        });

        if (carouselContainer) {
            carouselContainer.addEventListener('mouseenter', stopAutoplay);
            carouselContainer.addEventListener('mouseleave', startAutoplay);
            carouselContainer.addEventListener('touchstart', stopAutoplay, { passive: true });
            carouselContainer.addEventListener('touchend', startAutoplay, { passive: true });
        }

        let touchStartX = 0;
        let touchStartY = 0;
        let touchEndX = 0;
        let touchEndY = 0;

        if (carouselContainer) {
            carouselContainer.addEventListener('touchstart', (e) => {
                if (e.touches && e.touches.length > 0) {
                    touchStartX = e.touches[0].clientX;
                    touchStartY = e.touches[0].clientY;
                }
            }, { passive: true });

            carouselContainer.addEventListener('touchend', (e) => {
                if (e.changedTouches && e.changedTouches.length > 0) {
                    touchEndX = e.changedTouches[0].clientX;
                    touchEndY = e.changedTouches[0].clientY;
                    handleSwipe();
                }
            }, { passive: true });
        }

        function handleSwipe() {
            const diffX = touchEndX - touchStartX;
            const diffY = touchEndY - touchStartY;
            
            if (Math.abs(diffX) > Math.abs(diffY) && Math.abs(diffX) > 35) {
                if (diffX > 0) {
                    showSlide(currentSlide - 1);
                } else {
                    showSlide(currentSlide + 1);
                }
                startAutoplay();
            }
        }
    }

    /* ==========================================================================
       2. SELETOR DINÂMICO DE UNIDADES (MOOCA X GUARULHOS)
       ========================================================================== */
    const unitSelectorButtons = document.querySelectorAll('.unit-selector-btn');
    const unitDisplayCards = document.querySelectorAll('.unit-info-card');

    window.openUnitWhatsApp = function(unitKey, customMessage = "") {
        const unit = UNITS_CONFIG[unitKey] || UNITS_CONFIG.mooca;
        let message = customMessage;
        if (!message) {
            message = `Olá! Vim pelo site da Tecgáz e gostaria de solicitar um orçamento com a ${unit.name}.`;
        }
        const encoded = encodeURIComponent(message);
        const url = `https://wa.me/${unit.phoneRaw}?text=${encoded}`;
        window.open(url, '_blank');
    };

    function setActiveUnitTab(selectedKey) {
        unitSelectorButtons.forEach(btn => {
            const key = btn.getAttribute('data-unit');
            if (key === selectedKey) {
                btn.classList.add('bg-[#E52421]', 'text-white', 'shadow-lg', 'scale-105');
                btn.classList.remove('bg-white', 'text-[#222222]', 'hover:bg-gray-100');
            } else {
                btn.classList.remove('bg-[#E52421]', 'text-white', 'shadow-lg', 'scale-105');
                btn.classList.add('bg-white', 'text-[#222222]', 'hover:bg-gray-100');
            }
        });

        unitDisplayCards.forEach(card => {
            const key = card.getAttribute('data-unit');
            if (key === selectedKey) {
                card.classList.remove('hidden');
                card.classList.add('flex');
            } else {
                card.classList.add('hidden');
                card.classList.remove('flex');
            }
        });
    }

    unitSelectorButtons.forEach(btn => {
        btn.addEventListener('click', () => {
            const key = btn.getAttribute('data-unit');
            setActiveUnitTab(key);
        });
    });

    /* ==========================================================================
       3. MODAL DE ORÇAMENTO RÁPIDO
       ========================================================================== */
    const budgetModal = document.getElementById('budget-modal');
    const openBudgetButtons = document.querySelectorAll('.btn-open-budget');
    const closeBudgetBtn = document.getElementById('btn-close-modal');
    const budgetForm = document.getElementById('quick-budget-form');

    function openModal(defaultProduct = "") {
        if (!budgetModal) return;
        budgetModal.classList.remove('hidden');
        budgetModal.classList.add('flex');
        document.body.style.overflow = 'hidden';

        if (defaultProduct && budgetForm) {
            const productSelect = budgetForm.querySelector('#modal-product');
            if (productSelect) {
                productSelect.value = defaultProduct;
            }
        }
    }

    function closeModal() {
        if (!budgetModal) return;
        budgetModal.classList.add('hidden');
        budgetModal.classList.remove('flex');
        document.body.style.overflow = '';
    }

    openBudgetButtons.forEach(btn => {
        btn.addEventListener('click', (e) => {
            e.preventDefault();
            const product = btn.getAttribute('data-product') || "";
            openModal(product);
        });
    });

    if (closeBudgetBtn) {
        closeBudgetBtn.addEventListener('click', closeModal);
    }

    if (budgetModal) {
        budgetModal.addEventListener('click', (e) => {
            if (e.target === budgetModal) {
                closeModal();
            }
        });
    }

    if (budgetForm) {
        budgetForm.addEventListener('submit', (e) => {
            e.preventDefault();

            const name = document.getElementById('modal-name')?.value.trim() || "Cliente";
            const unitKey = document.getElementById('modal-unit')?.value || "mooca";
            const product = document.getElementById('modal-product')?.value || "Aquecedor a Gás";
            const details = document.getElementById('modal-details')?.value.trim() || "";

            const unit = UNITS_CONFIG[unitKey];
            let text = `*NOVA SOLICITAÇÃO DE ORÇAMENTO - TECGÁZ*\n\n`;
            text += `👤 *Nome:* ${name}\n`;
            text += `📍 *Unidade Preferencial:* ${unit.name}\n`;
            text += `🔥 *Interesse:* ${product}\n`;
            if (details) {
                text += `📝 *Observações:* ${details}\n`;
            }
            text += `\nEnviado através do site institucional da Tecgáz.`;

            const encoded = encodeURIComponent(text);
            const url = `https://wa.me/${unit.phoneRaw}?text=${encoded}`;
            
            closeModal();
            budgetForm.reset();
            window.open(url, '_blank');
        });
    }

    /* ==========================================================================
       4. BOTÃO FLUTUANTE DE WHATSAPP COM SELETOR DE UNIDADE
       ========================================================================== */
    const whatsappFloatingBtn = document.getElementById('whatsapp-floating-btn');
    const whatsappFloatingMenu = document.getElementById('whatsapp-floating-menu');

    if (whatsappFloatingBtn && whatsappFloatingMenu) {
        whatsappFloatingBtn.addEventListener('click', (e) => {
            e.stopPropagation();
            whatsappFloatingMenu.classList.toggle('hidden');
        });

        document.addEventListener('click', (e) => {
            if (!whatsappFloatingMenu.contains(e.target) && !whatsappFloatingBtn.contains(e.target)) {
                whatsappFloatingMenu.classList.add('hidden');
            }
        });
    }

    /* ==========================================================================
       5. MENU MOBILE RESPONSIVO
       ========================================================================== */
    const mobileMenuBtn = document.getElementById('mobile-menu-btn');
    const mobileMenu = document.getElementById('mobile-menu');
    const mobileMenuLinks = document.querySelectorAll('.mobile-nav-link');

    if (mobileMenuBtn && mobileMenu) {
        mobileMenuBtn.addEventListener('click', () => {
            mobileMenu.classList.toggle('hidden');
            const isOpen = !mobileMenu.classList.contains('hidden');
            mobileMenuBtn.setAttribute('aria-expanded', isOpen);
        });

        mobileMenuLinks.forEach(link => {
            link.addEventListener('click', () => {
                mobileMenu.classList.add('hidden');
                mobileMenuBtn.setAttribute('aria-expanded', 'false');
            });
        });
    }

    /* ==========================================================================
       6. SCROLL HEADER SHADOW
       ========================================================================== */
    const mainHeader = document.getElementById('main-header');
    window.addEventListener('scroll', () => {
        if (window.scrollY > 40) {
            mainHeader?.classList.add('shadow-md', 'bg-white/95', 'backdrop-blur-md');
            mainHeader?.classList.remove('bg-white');
        } else {
            mainHeader?.classList.remove('shadow-md', 'bg-white/95', 'backdrop-blur-md');
            mainHeader?.classList.add('bg-white');
        }
    });

    /* ==========================================================================
       7. SCROLL REVEAL / TRANSIÇÕES FLUIDAS POR ROLAGEM (INTERSECTION OBSERVER)
       ========================================================================== */
    function initScrollReveal() {
        const revealElements = document.querySelectorAll('.reveal-on-scroll');
        if (!revealElements.length) return;

        if (window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
            return;
        }

        document.body.classList.add('reveal-ready');

        const observerOptions = {
            root: null,
            rootMargin: '0px 0px -40px 0px',
            threshold: 0.1
        };

        const revealObserver = new IntersectionObserver((entries, observer) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('is-revealed');
                    observer.unobserve(entry.target);
                }
            });
        }, observerOptions);

        revealElements.forEach(el => {
            const rect = el.getBoundingClientRect();
            if (rect.top < window.innerHeight - 30 && rect.bottom > 0) {
                el.classList.add('is-revealed');
            } else {
                revealObserver.observe(el);
            }
        });
    }

    initScrollReveal();

    console.log("TECGAZ Aquecedores: Scripts e animações de scroll carregados com sucesso.");
});
