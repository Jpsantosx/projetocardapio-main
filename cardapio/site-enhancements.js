const menuConfig = window.restaurantDemoConfig;
const shareFeedback = document.getElementById('share-feedback');
const shareMenuButton = document.getElementById('share-menu');
const menuLinkFallback = document.getElementById('menu-link-fallback');
const menuQrImage = document.getElementById('menu-qr-image');
const menuQrLink = document.getElementById('download-menu-qr');
const menuUrl = new URL(menuConfig.publicMenuUrl);

const showShareFallback = (url) => {
    menuLinkFallback.href = url;
    menuLinkFallback.hidden = false;
    shareFeedback.textContent = 'Não foi possível abrir o compartilhamento. Copie ou abra o link abaixo.';
};

const shareLink = async (title, url) => {
    shareFeedback.textContent = '';
    menuLinkFallback.hidden = true;
    if (navigator.share) {
        try {
            await navigator.share({ title, url });
            shareFeedback.textContent = 'Link compartilhado.';
            return;
        } catch (error) {
            if (error.name === 'AbortError') return;
        }
    }

    if (navigator.clipboard?.writeText) {
        try {
            await navigator.clipboard.writeText(url);
            shareFeedback.textContent = 'Link copiado para a área de transferência.';
            menuLinkFallback.hidden = true;
            return;
        } catch {
            showShareFallback(url);
            return;
        }
    }

    showShareFallback(url);
};

window.shareMenuItem = (name, productId) => {
    const card = [...document.querySelectorAll('.card')]
        .find((candidate) => candidate.dataset.productId === productId);
    const itemUrl = new URL(menuUrl);
    itemUrl.searchParams.set('prato', productId);
    if (card) itemUrl.hash = card.closest('.menu-section').id;
    return shareLink(`${name} | La Bella Trattoria`, itemUrl.href);
};

shareMenuButton.addEventListener('click', () => shareLink('Cardápio La Bella Trattoria', menuUrl.href));

const qrUrl = new URL('https://quickchart.io/qr');
qrUrl.searchParams.set('text', menuUrl.href);
qrUrl.searchParams.set('size', '352');
qrUrl.searchParams.set('margin', '2');
menuQrImage.dataset.src = qrUrl.href;
menuQrLink.href = qrUrl.href;

const loadQrCode = () => {
    if (!menuQrImage.dataset.src || menuQrImage.src) return;
    menuQrImage.src = menuQrImage.dataset.src;
    menuQrImage.addEventListener('error', () => {
        menuQrImage.alt = 'Não foi possível carregar o QR Code. Use o botão para tentar abri-lo.';
    }, { once: true });
};

if ('IntersectionObserver' in window) {
    const qrObserver = new IntersectionObserver((entries) => {
        if (entries.some((entry) => entry.isIntersecting)) {
            loadQrCode();
            qrObserver.disconnect();
        }
    });
    qrObserver.observe(menuQrImage);
} else {
    loadQrCode();
}

const sharedProductId = new URLSearchParams(window.location.search).get('prato');
if (sharedProductId) {
    const sharedCard = [...document.querySelectorAll('.card')]
        .find((card) => card.dataset.productId === sharedProductId);
    if (sharedCard) {
        window.setTimeout(() => {
            sharedCard.scrollIntoView({
                behavior: window.matchMedia('(prefers-reduced-motion: reduce)').matches ? 'auto' : 'smooth',
                block: 'center',
            });
            sharedCard.tabIndex = -1;
            sharedCard.focus({ preventScroll: true });
        }, 0);
    }
}
