const searchInput = document.getElementById('menu-search');
const clearSearchButton = document.getElementById('clear-search');
const searchStatus = document.getElementById('search-status');
const emptyState = document.getElementById('empty-state');
const favoritesFilter = document.getElementById('favorites-filter');
const favoritesCount = document.getElementById('favorites-count');
const sortMenu = document.getElementById('sort-menu');
const dietaryFilter = document.getElementById('dietary-filter');
const backToTop = document.querySelector('.back-to-top');
const menuSections = [...document.querySelectorAll('.menu-section')];
const menuCards = menuSections.flatMap((section) => [...section.querySelectorAll('.card')]);
const storageKey = 'la-bella-trattoria-favorites';
const favoriteIds = new Set();
const originalCardOrder = new Map();
let showFavoritesOnly = false;
let storageError = false;

const normalizeText = (value) =>
    value.normalize('NFD').replace(/[\u0300-\u036f]/g, '').toLowerCase();

const createCardId = (card) => {
    const name = normalizeText(card.querySelector('h2').textContent)
        .replace(/[^a-z0-9]+/g, '-')
        .replace(/^-|-$/g, '');

    return `${card.closest('.menu-section').id.toLowerCase()}-${name}`;
};

const setFavoriteButtonState = (button, isFavorite, name) => {
    button.setAttribute('aria-pressed', String(isFavorite));
    button.setAttribute(
        'aria-label',
        `${isFavorite ? 'Remover dos' : 'Adicionar aos'} favoritos: ${name}`
    );
    button.title = isFavorite ? 'Remover dos favoritos' : 'Adicionar aos favoritos';
    button.textContent = isFavorite ? '♥' : '♡';
};

const updateFavoriteCount = () => {
    const count = menuCards.filter((card) => favoriteIds.has(card.dataset.favoriteId)).length;
    favoritesCount.textContent = String(count);
    favoritesFilter.setAttribute('aria-pressed', String(showFavoritesOnly));
};

const setStorageError = () => {
    storageError = true;
};

try {
    const savedFavorites = JSON.parse(localStorage.getItem(storageKey) || '[]');
    if (!Array.isArray(savedFavorites) || savedFavorites.some((id) => typeof id !== 'string')) {
        throw new Error('The saved favorites have an invalid format.');
    }
    savedFavorites.forEach((id) => favoriteIds.add(id));
} catch {
    setStorageError();
    favoriteIds.clear();
}

menuCards.forEach((card, index) => {
    const title = card.querySelector('h2');
    const badge = card.querySelector('.badge');
    const content = card.querySelector('.card-content');
    const cardId = createCardId(card);
    const titleGroup = document.createElement('div');
    const meta = document.createElement('div');
    const favoriteButton = document.createElement('button');
    const grid = card.closest('.grid-cards');

    card.dataset.favoriteId = cardId;
    originalCardOrder.set(card, grid ? [...grid.children].indexOf(card) : index);

    titleGroup.className = 'card-title-group';
    if (badge) titleGroup.append(badge);
    titleGroup.append(title);

    meta.className = 'card-meta';
    favoriteButton.className = 'favorite-toggle';
    favoriteButton.type = 'button';
    setFavoriteButtonState(favoriteButton, favoriteIds.has(cardId), title.textContent.trim());
    favoriteButton.addEventListener('click', () => {
        if (favoriteIds.has(cardId)) {
            favoriteIds.delete(cardId);
        } else {
            favoriteIds.add(cardId);
        }

        try {
            localStorage.setItem(storageKey, JSON.stringify([...favoriteIds]));
            storageError = false;
        } catch {
            setStorageError();
        }

        setFavoriteButtonState(favoriteButton, favoriteIds.has(cardId), title.textContent.trim());
        updateFavoriteCount();
        updateMenu();
    });

    meta.append(titleGroup, favoriteButton);
    content.prepend(meta);
});

const priceOf = (card) => {
    const price = card.querySelector('.preco').textContent.match(/R\$\s*([\d.,]+)/)?.[1];
    return price
        ? Number(price.replace(/\./g, '').replace(',', '.'))
        : Number.POSITIVE_INFINITY;
};

const sortCards = () => {
    const direction = sortMenu.value;

    menuSections.forEach((section) => {
        const grid = section.querySelector('.grid-cards');
        const cards = [...grid.querySelectorAll('.card')];

        cards.sort((left, right) => {
            if (direction === 'price-asc') {
                return priceOf(left) - priceOf(right)
                    || originalCardOrder.get(left) - originalCardOrder.get(right);
            }
            if (direction === 'price-desc') {
                return priceOf(right) - priceOf(left)
                    || originalCardOrder.get(left) - originalCardOrder.get(right);
            }
            return originalCardOrder.get(left) - originalCardOrder.get(right);
        });

        cards.forEach((card) => grid.append(card));
    });
};

const updateMenu = () => {
    const query = normalizeText(searchInput.value.trim());
    let visibleCards = 0;
    const hasFavorites = favoriteIds.size > 0;

    menuSections.forEach((section) => {
        const sectionName = normalizeText(section.querySelector('.titulo h2').textContent);
        const sectionMatches = Boolean(query) && sectionName.includes(query);
        let visibleInSection = 0;

        section.querySelectorAll('.card').forEach((card) => {
            const matchesSearch = !query
                || sectionMatches
                || normalizeText(`${card.textContent} ${card.dataset.searchIngredients || ''}`).includes(query);
            const matchesFavorites = !showFavoritesOnly
                || favoriteIds.has(card.dataset.favoriteId);
            const matchesDietary = dietaryFilter.value !== 'no-meat-listed'
                || card.dataset.dietary === 'no-meat-listed';
            const matches = matchesSearch && matchesFavorites && matchesDietary;

            card.hidden = !matches;
            visibleInSection += Number(matches);
        });

        section.hidden = visibleInSection === 0;
        visibleCards += visibleInSection;
    });

    clearSearchButton.hidden = !query;
    emptyState.hidden = visibleCards > 0;
    if (!visibleCards) {
        emptyState.textContent = showFavoritesOnly && !hasFavorites
            ? 'Você ainda não salvou favoritos. Use o coração nos pratos para guardá-los aqui.'
            : 'Nenhum prato encontrado. Tente outro nome ou ingrediente.';
    }

    searchStatus.textContent = showFavoritesOnly
        ? `${visibleCards} ${visibleCards === 1 ? 'favorito encontrado' : 'favoritos encontrados'}.`
        : query
            ? `${visibleCards} ${visibleCards === 1 ? 'prato encontrado' : 'pratos encontrados'}.`
            : `${visibleCards} pratos no cardápio.`;
    if (dietaryFilter.value === 'no-meat-listed') {
        searchStatus.textContent = `${visibleCards} ${visibleCards === 1 ? 'prato sem carne descrita' : 'pratos sem carne descrita'}.`;
    }

    if (storageError) {
        searchStatus.textContent += ' Não foi possível acessar ou salvar os favoritos neste navegador.';
    }
};

const resetFiltersForNavigation = () => {
    if (searchInput.value) searchInput.value = '';
    if (showFavoritesOnly) showFavoritesOnly = false;
    dietaryFilter.value = 'all';
    updateFavoriteCount();
    updateMenu();
};

searchInput.addEventListener('input', updateMenu);
clearSearchButton.addEventListener('click', () => {
    searchInput.value = '';
    updateMenu();
    searchInput.focus();
});

favoritesFilter.addEventListener('click', () => {
    showFavoritesOnly = !showFavoritesOnly;
    updateFavoriteCount();
    updateMenu();
});

dietaryFilter.addEventListener('change', updateMenu);
document.addEventListener('menu:metadata-ready', updateMenu);
sortMenu.addEventListener('change', sortCards);
sortCards();
updateFavoriteCount();
updateMenu();

const scrollToTarget = (target, event) => {
    event.preventDefault();
    const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const headerHeight = document.getElementById('header').offsetHeight;
    const destination = Math.max(
        0,
        window.scrollY + target.getBoundingClientRect().top - headerHeight - 12
    );
    window.scrollTo({
        top: destination,
        behavior: reducedMotion ? 'auto' : 'smooth',
    });

    if (event.detail === 0) {
        if (!target.hasAttribute('tabindex')) target.setAttribute('tabindex', '-1');
        target.focus({ preventScroll: true });
    }
};

document.querySelectorAll('a[href^="#"]').forEach((link) => {
    link.addEventListener('click', (event) => {
        const target = document.getElementById(decodeURIComponent(link.hash.slice(1)));
        if (!target) return;

        if (link.matches('.menu-nav a, .hero-link')) resetFiltersForNavigation();
        if (link.matches('.back-to-top')) resetFiltersForNavigation();

        if (link.hash !== window.location.hash) {
            history.pushState(null, '', link.hash);
        }

        scrollToTarget(target, event);
    });
});

window.addEventListener('popstate', () => {
    const targetId = decodeURIComponent(window.location.hash.slice(1)) || 'Home';
    const target = document.getElementById(targetId);
    if (!target) return;

    resetFiltersForNavigation();
    const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const destination = Math.max(
        0,
        window.scrollY + target.getBoundingClientRect().top
            - document.getElementById('header').offsetHeight - 12
    );
    window.scrollTo({
        top: destination,
        behavior: reducedMotion ? 'auto' : 'smooth',
    });
});

if ('IntersectionObserver' in window) {
    const header = document.getElementById('header');
    const navigation = document.querySelector('.menu-nav');
    const sectionObserver = new IntersectionObserver((entries) => {
        entries.forEach((entry) => {
            if (!entry.isIntersecting) return;

            document.querySelectorAll('.menu-nav a[aria-current="location"]')
                .forEach((link) => link.removeAttribute('aria-current'));
            const activeLink = document.querySelector(`.menu-nav a[href="#${entry.target.id}"]`);
            activeLink?.setAttribute('aria-current', 'location');

            if (activeLink && navigation && navigation.scrollWidth > navigation.clientWidth) {
                const navigationBounds = navigation.getBoundingClientRect();
                const linkBounds = activeLink.getBoundingClientRect();
                const linkLeft = navigation.scrollLeft + linkBounds.left - navigationBounds.left;
                const linkRight = linkLeft + linkBounds.width;
                const visibleLeft = navigation.scrollLeft;
                const visibleRight = visibleLeft + navigation.clientWidth;

                if (linkLeft < visibleLeft - 2 || linkRight > visibleRight + 2) {
                    const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
                    navigation.scrollTo({
                        left: linkLeft < visibleLeft
                            ? linkLeft
                            : linkRight - navigation.clientWidth,
                        behavior: reducedMotion ? 'auto' : 'smooth',
                    });
                }
            }
        });
    }, {
        rootMargin: `-${header.offsetHeight}px 0px -${Math.round(window.innerHeight * 0.65)}px 0px`,
    });

    document.querySelectorAll('#Home, .menu-section')
        .forEach((section) => sectionObserver.observe(section));

    const homeObserver = new IntersectionObserver(([entry]) => {
        backToTop.hidden = entry.isIntersecting;
    }, { threshold: 0.05 });
    homeObserver.observe(document.getElementById('Home'));

    if (!window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
        const revealObserver = new IntersectionObserver((entries, observer) => {
            entries.forEach((entry) => {
                if (!entry.isIntersecting) return;
                entry.target.classList.add('is-visible');
                observer.unobserve(entry.target);
            });
        }, { rootMargin: '0px 0px -7% 0px', threshold: 0.08 });

        document.querySelectorAll('.menu-section .titulo, .menu-section .card')
            .forEach((element, index) => {
                element.classList.add('reveal-on-scroll');
                element.style.setProperty('--reveal-delay', `${Math.min(index % 3, 2) * 65}ms`);
                revealObserver.observe(element);
            });
    }
} else {
    backToTop.hidden = false;
}
