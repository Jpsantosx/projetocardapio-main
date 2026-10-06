const demoStorageKey = 'la-bella-trattoria-local-demo-v1';
const demoOrderStates = [
    ['received', 'Recebido'],
    ['sent', 'Enviado'],
    ['preparing', 'Em preparo'],
    ['completed', 'Concluído'],
];
const legacyDemoOrderStates = ['received', 'sent', 'preparing', 'completed', 'ready'];
const demoReservationStates = [
    ['requested', 'Solicitada'],
    ['confirmed', 'Confirmada na demonstração'],
    ['declined', 'Indisponível na demonstração'],
    ['cancelled', 'Cancelada'],
];
const restaurantProfileStorageKey = 'la-bella-trattoria-profile-demo-v1';
const reservationTimeSlots = ['18:00', '18:30', '19:00', '19:30', '20:00', '20:30', '21:00', '21:30'];
const shortCodePattern = /^[A-HJ-NP-Z2-9]{6}$/;
const shortCodeAlphabet = 'ABCDEFGHJKLMNPQRSTUVWXYZ23456789';
const defaultReservationProfile = {
    openDays: [0, 2, 3, 4, 5, 6],
    capacityByTime: Object.fromEntries(reservationTimeSlots.map((time) => [time, 20])),
};
const demoDefaultOffer = {
    title: 'Sugestão da casa (exemplo)',
    description: 'Edite este texto no painel. Não representa uma oferta disponível.',
    items: [],
};
const demoEmptyData = () => ({
    orders: [],
    reservations: [],
    waitlist: [],
    menu: {},
    reviews: [],
    offer: { ...demoDefaultOffer },
});

const demoCards = [...document.querySelectorAll('.card')];
const demoProductSelect = document.getElementById('demo-menu-product');
const demoStorageNotice = document.getElementById('demo-storage-notice');
let demoStorageAvailable = true;
let demoDataInvalid = false;
let demoDataCodesMigrated = false;

const makeDemoId = (prefix) => {
    const suffix = globalThis.crypto?.randomUUID
        ? globalThis.crypto.randomUUID().slice(0, 8)
        : Math.random().toString(36).slice(2, 10);
    return `${prefix}-${suffix.toUpperCase()}`;
};

const generateShortCode = (usedCodes = []) => {
    const reserved = new Set(usedCodes);
    for (let attempt = 0; attempt < 100; attempt += 1) {
        const bytes = new Uint8Array(6);
        if (globalThis.crypto?.getRandomValues) globalThis.crypto.getRandomValues(bytes);
        else bytes.forEach((_, index) => { bytes[index] = Math.floor(Math.random() * 256); });
        const code = [...bytes].map((byte) => shortCodeAlphabet[byte % shortCodeAlphabet.length]).join('');
        if (!reserved.has(code)) return code;
    }
    throw new Error('Não foi possível criar um código único para a demonstração.');
};

const migrateDemoCodes = (data) => {
    const usedCodes = new Set();
    let migrated = false;
    data.orders.forEach((order) => {
        if (!shortCodePattern.test(order.id) || usedCodes.has(order.id)) {
            order.id = generateShortCode(usedCodes);
            migrated = true;
        }
        usedCodes.add(order.id);
    });
    data.reservations.forEach((reservation) => {
        if (!shortCodePattern.test(reservation.code) || usedCodes.has(reservation.code)) {
            reservation.code = generateShortCode(usedCodes);
            migrated = true;
        }
        usedCodes.add(reservation.code);
    });
    return migrated;
};

const cleanText = (value, maxLength) =>
    typeof value === 'string' ? value.trim().slice(0, maxLength) : '';

const demoText = (source, values = {}) => {
    const translated = window.menuI18n?.translate(source) || source;
    return Object.entries(values).reduce(
        (text, [key, value]) => text.replaceAll(`{${key}}`, String(value)),
        translated
    );
};

const validDemoEntry = (entry) =>
    entry && typeof entry === 'object' && typeof entry.id === 'string';

const cleanDemoData = (stored) => {
    if (!stored || typeof stored !== 'object') return demoEmptyData();
    const data = demoEmptyData();

    data.orders = Array.isArray(stored.orders)
        ? stored.orders.filter((entry) =>
            validDemoEntry(entry) && legacyDemoOrderStates.includes(entry.status))
            .slice(-80)
            .map((entry) => {
                const items = Array.isArray(entry.items)
                    ? entry.items.filter((item) => item && typeof item === 'object').slice(0, 30).map((item) => ({
                        name: cleanText(item.name, 100),
                        quantity: Math.max(1, Math.min(99, Number(item.quantity) || 1)),
                        size: cleanText(item.size, 60),
                        unitPrice: Number.isFinite(Number(item.unitPrice))
                            ? Math.max(0, Math.min(9999, Number(item.unitPrice)))
                            : 0,
                        removed: Array.isArray(item.removed)
                            ? item.removed.filter((value) => typeof value === 'string').slice(0, 20).map((value) => cleanText(value, 70))
                            : [],
                        extras: Array.isArray(item.extras)
                            ? item.extras.filter((value) => typeof value === 'string').slice(0, 20).map((value) => cleanText(value, 70))
                            : [],
                        notes: cleanText(item.notes, 240),
                    }))
                    : [];
                const total = Number(entry.total);
                return {
                    id: entry.id.slice(0, 32),
                    status: entry.status === 'ready' ? 'completed' : entry.status,
                    createdAt: typeof entry.createdAt === 'string' && Number.isFinite(Date.parse(entry.createdAt))
                        ? entry.createdAt
                        : '',
                    items,
                    total: Number.isFinite(total) && total >= 0 && total <= 99999 ? total : 0,
                };
            })
        : [];
    data.reservations = Array.isArray(stored.reservations)
        ? stored.reservations.filter((entry) =>
            validDemoEntry(entry)
            && demoReservationStates.some(([value]) => value === entry.status)
            && /^\d{4}-\d{2}-\d{2}$/.test(entry.date)
            && /^\d{2}:\d{2}$/.test(entry.time)
            && Number.isInteger(Number(entry.guests)))
            .slice(-80)
            .map((entry) => ({
                id: entry.id.slice(0, 32),
                code: typeof entry.code === 'string' ? entry.code.slice(0, 6).toUpperCase() : '',
                date: entry.date,
                time: entry.time,
                guests: Math.max(1, Math.min(12, Number(entry.guests))),
                status: entry.status,
            }))
        : [];
    if (migrateDemoCodes(data)) demoDataCodesMigrated = true;
    data.waitlist = Array.isArray(stored.waitlist)
        ? stored.waitlist.filter((entry) =>
            validDemoEntry(entry)
            && Number.isInteger(Number(entry.guests))
            && Number(entry.guests) >= 1
            && Number(entry.guests) <= 6)
            .slice(-80)
            .map((entry) => ({
                id: entry.id.slice(0, 32),
                guests: Number(entry.guests),
            }))
        : [];
    data.reviews = Array.isArray(stored.reviews)
        ? stored.reviews.filter((entry) =>
            validDemoEntry(entry)
            && Number.isInteger(Number(entry.rating))
            && Number(entry.rating) >= 1
            && Number(entry.rating) <= 5
            && ['pending', 'approved'].includes(entry.status))
            .slice(-80)
            .map((entry) => ({
                id: entry.id.slice(0, 32),
                name: cleanText(entry.name, 50),
                rating: Number(entry.rating),
                comment: cleanText(entry.comment, 300),
                status: entry.status,
            }))
        : [];
    if (stored.menu && typeof stored.menu === 'object' && !Array.isArray(stored.menu)) {
        demoCards.forEach((card) => {
            const item = stored.menu[card.dataset.productId];
            if (!item || typeof item !== 'object') return;
            const price = Number(item.price);
            data.menu[card.dataset.productId] = {
                description: cleanText(item.description, 220),
                price: Number.isFinite(price) && price > 0 && price <= 9999 ? price : null,
                allergens: cleanText(item.allergens, 240),
                portion: cleanText(item.portion, 70),
                spice: ['none', 'mild', 'medium', 'hot', 'unknown'].includes(item.spice)
                    ? item.spice
                    : 'unknown',
                nonAlcoholic: ['not-applicable', 'yes', 'no', 'unknown'].includes(item.nonAlcoholic)
                    ? item.nonAlcoholic
                    : 'unknown',
                ingredients: cleanText(item.ingredients, 400),
                image: typeof item.image === 'string'
                    && item.image.length <= 500000
                    && /^data:image\/(?:jpeg|png|webp);base64,[A-Za-z0-9+/=]+$/.test(item.image)
                    ? item.image
                    : '',
                available: item.available !== false,
            };
        });
    }
    if (stored.offer && typeof stored.offer === 'object') {
        data.offer = {
            title: cleanText(stored.offer.title, 70) || demoDefaultOffer.title,
            description: cleanText(stored.offer.description, 180) || demoDefaultOffer.description,
            items: Array.isArray(stored.offer.items)
                ? stored.offer.items.filter((id) =>
                    typeof id === 'string' && demoCards.some((card) => card.dataset.productId === id))
                    .slice(0, 8)
                : [],
        };
    }
    return data;
};

let demoData = demoEmptyData();
try {
    const savedData = localStorage.getItem(demoStorageKey);
    if (savedData) {
        try {
            demoData = cleanDemoData(JSON.parse(savedData));
        } catch {
            demoDataInvalid = true;
        }
    }
} catch {
    demoStorageAvailable = false;
}

const announceDemoStorage = (target = document.getElementById('demo-admin-feedback')) => {
    if (demoDataInvalid) {
        target.textContent = 'Os dados demonstrativos salvos estão inválidos. Apague-os pelo painel para recomeçar.';
    } else if (!demoStorageAvailable) {
        target.textContent = 'O navegador bloqueou o armazenamento local. Os dados podem desaparecer ao fechar esta página.';
    }
};

const saveDemoData = (feedbackTarget) => {
    try {
        localStorage.setItem(demoStorageKey, JSON.stringify(demoData));
        demoStorageAvailable = true;
        demoDataInvalid = false;
        demoStorageNotice.textContent = '';
        if (feedbackTarget) feedbackTarget.textContent = 'Alteração salva somente neste navegador.';
        return true;
    } catch {
        demoStorageAvailable = false;
        if (feedbackTarget) {
            feedbackTarget.textContent = 'Não foi possível salvar no navegador. Reduza o tamanho da imagem e tente novamente.';
        }
        return false;
    }
};

const findDemoCard = (productId) =>
    demoCards.find((card) => card.dataset.productId === productId);

const findDemoProduct = (productId) =>
    window.menuOrderApi.getProducts().find((product) => product.id === productId);

const applyDemoMenuItem = (card) => {
    const item = demoData.menu[card.dataset.productId];
    const product = findDemoProduct(card.dataset.productId);
    const priceElement = card.querySelector('.preco');
    const image = card.querySelector('img');
    const addButton = card.querySelector('.add-to-order');
    let availabilityLabel = card.querySelector('.demo-availability');
    let allergenLabel = card.querySelector('.demo-allergen-note');

    if (!item) {
        availabilityLabel?.remove();
        allergenLabel?.remove();
        card.removeAttribute('data-demo-unavailable');
        addButton.disabled = false;
        addButton.textContent = 'Escolher ingredientes';
        addButton.setAttribute('aria-label', `Personalizar ${product.name} e adicionar ao pedido`);
    } else {
        if (item.description) card.querySelector('.descricao').textContent = item.description;
        if (item.price !== null) {
            priceElement.textContent = new Intl.NumberFormat('pt-BR', {
                style: 'currency',
                currency: 'BRL',
                maximumFractionDigits: 2,
            }).format(item.price);
        }
        if (item.image) {
            image.src = item.image;
            image.alt = `${product.name}. Imagem de demonstração.`;
        }

        card.querySelector('.demo-allergen-note')?.remove();
        if (item.allergens) {
            allergenLabel = document.createElement('p');
            allergenLabel.className = 'demo-allergen-note';
            allergenLabel.textContent = `Alergênicos informados (não verificados): ${item.allergens}`;
            card.querySelector('.card-content').insertBefore(allergenLabel, card.querySelector('.card-actions'));
        }

        card.querySelector('.demo-availability')?.remove();
        if (!item.available) {
            availabilityLabel = document.createElement('span');
            availabilityLabel.className = 'demo-availability';
            availabilityLabel.textContent = 'Indisponível na demonstração';
            card.querySelector('.card-title-group').append(availabilityLabel);
            card.dataset.demoUnavailable = 'true';
            addButton.disabled = true;
            addButton.textContent = 'Indisponível';
            addButton.setAttribute('aria-label', `${product.name} indisponível na demonstração`);
        } else {
            card.removeAttribute('data-demo-unavailable');
            addButton.disabled = false;
            addButton.textContent = 'Escolher ingredientes';
            addButton.setAttribute('aria-label', `Personalizar ${product.name} e adicionar ao pedido`);
        }
    }

    const portion = item?.portion
        || (card.closest('.menu-section').id === 'Pizzas' ? 'Porção individual (exemplo)' : '1 porção (exemplo)');
    const spicy = item?.spice || (/Diavola/i.test(product.name) ? 'hot' : 'none');
    const beverage = card.closest('.menu-section').id === 'Drinks';
    const nonAlcoholic = item?.nonAlcoholic || (beverage ? 'unknown' : 'not-applicable');
    const ingredients = item?.ingredients
        ? item.ingredients.split(',').map((value) => value.trim()).filter(Boolean)
        : product.ingredients;
    card.dataset.demoIngredients = ingredients.join('|');
    card.dataset.searchIngredients = ingredients.join(' ');
    renderDishDetails(card, {
        portion,
        spice: spicy,
        nonAlcoholic,
        ingredients,
        beverage,
    });
};

const renderDishDetails = (card, details) => {
    let panel = card.querySelector('.demo-dish-details');
    if (!panel) {
        panel = document.createElement('details');
        panel.className = 'demo-dish-details';
        const summary = document.createElement('summary');
        summary.textContent = 'Detalhes demonstrativos';
        panel.append(summary);
        const portion = document.createElement('p');
        portion.dataset.detail = 'portion';
        const spice = document.createElement('p');
        spice.dataset.detail = 'spice';
        const nonAlcoholic = document.createElement('p');
        nonAlcoholic.dataset.detail = 'nonalcoholic';
        const ingredients = document.createElement('p');
        ingredients.dataset.detail = 'ingredients';
        panel.append(portion, spice, nonAlcoholic, ingredients);
        card.querySelector('.card-content').insertBefore(panel, card.querySelector('.card-actions'));
    }
    const locale = window.menuI18n;
    const label = (source) => locale ? locale.t(source) : source;
    const sourceValues = {
        portion: `${label('Porção demonstrativa')}: ${details.portion}`,
        spice: `${label('Picância demonstrativa')}: ${label(statusLabel([
            ['none', 'Sem picância (exemplo)'],
            ['mild', 'Leve (exemplo)'],
            ['medium', 'Média (exemplo)'],
            ['hot', 'Picante (exemplo)'],
            ['unknown', 'A confirmar'],
        ], details.spice))}`,
        nonalcoholic: details.beverage
            ? `${label('Opção sem álcool demonstrativa')}: ${label(statusLabel([
                ['yes', 'Sim (exemplo)'],
                ['no', 'Não (exemplo)'],
                ['unknown', 'A confirmar'],
                ['not-applicable', 'Não aplicável (exemplo)'],
            ], details.nonAlcoholic))}`
            : `${label('Opção sem álcool demonstrativa')}: ${label('Não aplicável (exemplo)')}`,
    };
    ['portion', 'spice', 'nonalcoholic'].forEach((key) => {
        const node = panel.querySelector(`[data-detail="${key}"]`);
        node.dataset.sourceText = sourceValues[key];
        node.textContent = label(sourceValues[key]);
    });
    const ingredientLine = panel.querySelector('[data-detail="ingredients"]');
    ingredientLine.dataset.sourceIngredients = details.ingredients.join('|');
    ingredientLine.textContent =
        `${label('Ingredientes de exemplo, não verificados')}: ${details.ingredients.map((value) =>
            locale ? locale.translateIngredient(value) : value).join(', ') || label('A confirmar')}`;
    panel.querySelector('summary').textContent = label('Detalhes demonstrativos');
    const warning = panel.querySelector('.demo-detail-warning');
    if (!warning) {
        const note = document.createElement('span');
        note.className = 'demo-detail-warning';
        note.textContent = label('Exemplos não confirmados pelo restaurante. Não use para avaliar alergias ou segurança alimentar.');
        panel.append(note);
    } else {
        warning.textContent = label('Exemplos não confirmados pelo restaurante. Não use para avaliar alergias ou segurança alimentar.');
    }
};

const renderDemoMenu = () => {
    demoCards.forEach(applyDemoMenuItem);
    window.menuOrderApi.refreshCatalog();
    document.getElementById('menu-search').dispatchEvent(new Event('input', { bubbles: true }));
    renderDemoOffer();
};

const demoMoney = (value) => new Intl.NumberFormat('pt-BR', {
    style: 'currency',
    currency: 'BRL',
}).format(value);

const renderDemoOffer = () => {
    document.getElementById('demo-offer-title').textContent = demoData.offer.title;
    document.getElementById('demo-offer-description').textContent = demoData.offer.description;
    const selected = demoData.offer.items
        .map((id) => findDemoProduct(id))
        .filter(Boolean);
    document.getElementById('demo-offer-combo').textContent = selected.length
        ? `Itens selecionados: ${selected.map((product) => product.name).join(', ')}.`
        : 'Nenhum item de combo selecionado no painel de teste.';
    document.getElementById('demo-offer-price').textContent = selected.length
        ? `Soma ilustrativa dos itens: ${demoMoney(selected.reduce((sum, product) => sum + product.price, 0))}.`
        : 'A soma ilustrativa aparecerá depois de selecionar itens.';
};

const statusLabel = (options, value) =>
    options.find(([option]) => option === value)?.[1] || 'Estado desconhecido';

const formatDemoDate = (value) => {
    const [year, month, day] = value.split('-').map(Number);
    return new Intl.DateTimeFormat(window.menuI18n?.locale || 'pt-BR', { dateStyle: 'medium' })
        .format(new Date(year, month - 1, day));
};

const showTrackedOrder = (order) => {
    const result = document.getElementById('order-tracking-result');
    result.replaceChildren();
    if (!order) {
        result.textContent = 'Não encontramos esse código nos pedidos fictícios deste navegador.';
        return;
    }

    const card = document.createElement('div');
    card.className = 'demo-tracking-card';
    card.append(
        document.createElement('strong'),
        document.createElement('p'),
    );
    card.children[0].textContent = demoText('Pedido de teste {code}', { code: order.id });
    card.children[1].textContent = demoText(
        'Etapa atual: {status}. Esta atualização existe somente nesta demonstração.',
        { status: demoText(statusLabel(demoOrderStates, order.status)) }
    );
    const timeline = document.createElement('ol');
    timeline.className = 'demo-order-timeline';
    demoOrderStates.forEach(([value, label]) => {
        const item = document.createElement('li');
        item.textContent = `${demoText(label)}${value === order.status ? ` (${demoText('etapa atual')})` : ''}`;
        item.setAttribute('aria-current', value === order.status ? 'step' : 'false');
        timeline.append(item);
    });
    card.append(timeline);
    result.append(card);
};

document.getElementById('create-demo-order').addEventListener('click', () => {
    const snapshot = window.menuOrderApi.getCartSnapshot();
    const feedback = document.getElementById('order-tracking-result');
    if (!snapshot.items.length) {
        feedback.textContent = demoText('Adicione pelo menos um prato ao pedido antes de registrá-lo.');
        return;
    }
    const usedCodes = [
        ...demoData.orders.map((item) => item.id),
        ...demoData.reservations.map((item) => item.code),
    ];
    const order = {
        id: generateShortCode(usedCodes),
        status: 'received',
        createdAt: new Date().toISOString(),
        items: snapshot.items,
        total: snapshot.total,
    };
    demoData.orders.push(order);
    document.getElementById('tracking-order-id').value = order.id;
    if (!saveDemoData(feedback)) {
        demoData.orders.pop();
        return;
    }
    showTrackedOrder(order);
    renderDemoAdmin();
});

document.getElementById('track-order-form').addEventListener('submit', (event) => {
    event.preventDefault();
    const id = document.getElementById('tracking-order-id').value.trim().toUpperCase();
    showTrackedOrder(demoData.orders.find((order) => order.id === id));
});

const reservationForm = document.getElementById('demo-reservation-form');
const reservationDate = reservationForm.elements.date;
const reservationCodeInput = document.getElementById('reservation-code');
const reservationLookupResult = document.getElementById('reservation-lookup-result');
const reservationTimeSelect = reservationForm.elements.time;
const reservationGuestCount = reservationForm.elements.guests;
const orderCodeInput = document.getElementById('tracking-order-id');
let reservationProfileLoadError = false;

const readReservationProfile = () => {
    reservationProfileLoadError = false;
    try {
        const stored = localStorage.getItem(restaurantProfileStorageKey);
        if (!stored) return defaultReservationProfile;
        const profile = JSON.parse(stored);
        if (!profile || !Array.isArray(profile.openDays) || !profile.capacityByTime) {
            throw new Error('Formato de disponibilidade inválido.');
        }
        return {
            openDays: [...new Set(profile.openDays.map(Number).filter((day) =>
                Number.isInteger(day) && day >= 0 && day <= 6))],
            capacityByTime: Object.fromEntries(reservationTimeSlots.map((time) => {
                const capacity = Number(profile.capacityByTime[time]);
                if (!Number.isInteger(capacity) || capacity < 0 || capacity > 200) {
                    throw new Error('Capacidade inválida.');
                }
                return [time, capacity];
            })),
        };
    } catch {
        reservationProfileLoadError = true;
        return defaultReservationProfile;
    }
};

let reservationProfile = readReservationProfile();

const todayValue = () => {
    const current = new Date();
    return [
        current.getFullYear(),
        String(current.getMonth() + 1).padStart(2, '0'),
        String(current.getDate()).padStart(2, '0'),
    ].join('-');
};
reservationDate.min = todayValue();

const reservationIsActive = (reservation) =>
    !['cancelled', 'declined'].includes(reservation.status);

const reservationSeatsUsed = (date, time) =>
    demoData.reservations
        .filter((reservation) =>
            reservation.date === date
            && reservation.time === time
            && reservationIsActive(reservation))
        .reduce((total, reservation) => total + reservation.guests, 0);

const renderReservationTimes = () => {
    const date = reservationDate.value;
    const guests = Number(reservationGuestCount.value) || 1;
    const placeholder = document.createElement('option');
    placeholder.value = '';
    placeholder.textContent = demoText(date ? 'Selecione um horário disponível' : 'Escolha uma data primeiro');
    reservationTimeSelect.replaceChildren(placeholder);

    if (reservationProfileLoadError) {
        placeholder.textContent = demoText('Disponibilidade indisponível');
        reservationTimeSelect.disabled = true;
        document.getElementById('reservation-feedback').textContent = demoText(
            'Não foi possível ler as capacidades salvas no painel do restaurante.'
        );
        return;
    }
    if (!date || date < reservationDate.min) {
        reservationTimeSelect.disabled = true;
        return;
    }
    const day = new Date(`${date}T12:00:00`).getDay();
    if (!reservationProfile.openDays.includes(day)) {
        placeholder.textContent = demoText('Restaurante fechado nesta data');
        reservationTimeSelect.disabled = true;
        document.getElementById('reservation-feedback').textContent =
            demoText('Restaurante fechado nesta data');
        return;
    }

    let availableCount = 0;
    reservationTimeSlots.forEach((time) => {
        const option = document.createElement('option');
        const remaining = Math.max(0, reservationProfile.capacityByTime[time] - reservationSeatsUsed(date, time));
        option.value = time;
        if (remaining >= guests) {
            option.textContent = remaining === 1
                ? demoText('{time} - {count} lugar disponível', { time, count: remaining })
                : demoText('{time} - {count} lugares disponíveis', { time, count: remaining });
            availableCount += 1;
        } else {
            option.textContent = remaining
                ? demoText('{time} - restam {count}, insuficiente para o grupo', { time, count: remaining })
                : demoText('{time} - esgotado', { time });
            option.disabled = true;
        }
        reservationTimeSelect.append(option);
    });
    reservationTimeSelect.disabled = availableCount === 0;
    if (availableCount > 0) {
        document.getElementById('reservation-feedback').textContent = '';
    } else {
        document.getElementById('reservation-feedback').textContent = demoText(
            'Não há horários com lugares suficientes para este grupo nesta data.'
        );
    }
};

const showTrackedReservation = (reservation) => {
    reservationLookupResult.replaceChildren();
    const result = document.createElement('div');
    result.className = 'demo-tracking-card';
    if (!reservation) {
        result.textContent = demoText('Não encontramos esse código nas reservas salvas neste navegador.');
        reservationLookupResult.append(result);
        return;
    }
    const heading = document.createElement('strong');
    heading.textContent = demoText('Reserva {code}', { code: reservation.code });
    const details = document.createElement('p');
    details.textContent = demoText(
        '{date} às {time}, {count} {people}.',
        {
            date: formatDemoDate(reservation.date),
            time: reservation.time,
            count: reservation.guests,
            people: reservation.guests === 1 ? demoText('pessoa') : demoText('pessoas'),
        }
    );
    const status = document.createElement('p');
    status.textContent = reservation.status === 'cancelled' || reservation.status === 'declined'
        ? demoText('Estado: cancelada.')
        : reservation.status === 'confirmed'
            ? demoText('Estado: confirmada na demonstração.')
            : demoText('Estado: registro anterior, consulte o restaurante para confirmação.');
    result.append(heading, details, status);
    reservationLookupResult.append(result);
};

reservationDate.addEventListener('input', renderReservationTimes);
reservationGuestCount.addEventListener('input', renderReservationTimes);
[reservationCodeInput, orderCodeInput].forEach((input) => {
    input.addEventListener('input', () => {
        input.value = input.value.toUpperCase();
    });
});
document.getElementById('demo-reservation-lookup').addEventListener('submit', (event) => {
    event.preventDefault();
    if (!event.currentTarget.reportValidity()) return;
    const code = reservationCodeInput.value.trim().toUpperCase();
    showTrackedReservation(demoData.reservations.find((reservation) => reservation.code === code));
});

reservationForm.addEventListener('submit', (event) => {
    event.preventDefault();
    if (!reservationForm.reportValidity()) return;
    const formData = new FormData(reservationForm);
    const date = String(formData.get('date'));
    const time = String(formData.get('time'));
    const guestCount = Number(formData.get('guests'));
    const dateMinimum = todayValue();
    if (date < dateMinimum) {
        document.getElementById('reservation-feedback').textContent = demoText('Escolha uma data futura para o teste.');
        return;
    }
    if (reservationProfileLoadError) {
        document.getElementById('reservation-feedback').textContent = demoText(
            'Não foi possível confirmar a disponibilidade. Verifique o painel do restaurante.'
        );
        return;
    }

    try {
        const saved = localStorage.getItem(demoStorageKey);
        if (saved) demoData = cleanDemoData(JSON.parse(saved));
    } catch {
        document.getElementById('reservation-feedback').textContent = demoText(
            'Não foi possível verificar as reservas salvas. Tente novamente.'
        );
        return;
    }
    reservationProfile = readReservationProfile();
    if (reservationProfileLoadError) {
        document.getElementById('reservation-feedback').textContent = demoText(
            'Não foi possível confirmar a disponibilidade. Verifique o painel do restaurante.'
        );
        renderReservationTimes();
        return;
    }
    const day = new Date(`${date}T12:00:00`).getDay();
    const remaining = reservationProfile.capacityByTime[time] - reservationSeatsUsed(date, time);
    if (!reservationProfile.openDays.includes(day) || remaining < guestCount) {
        document.getElementById('reservation-feedback').textContent = demoText(
            'Esse horário não tem lugares suficientes. Escolha outra opção.'
        );
        renderReservationTimes();
        return;
    }

    const previousReservations = demoData.reservations;
    const usedCodes = [
        ...demoData.orders.map((order) => order.id),
        ...demoData.reservations.map((reservation) => reservation.code),
    ];
    const reservation = {
        id: makeDemoId('R'),
        code: generateShortCode(usedCodes),
        date,
        time,
        guests: guestCount,
        status: 'confirmed',
    };
    demoData.reservations.push(reservation);
    if (!saveDemoData(document.getElementById('reservation-feedback'))) {
        demoData.reservations = previousReservations;
        return;
    }
    document.getElementById('reservation-feedback').textContent = demoText(
        'Reserva de demonstração confirmada. Seu código é {code}. Guarde-o para consultar os dados.',
        { code: reservation.code }
    );
    reservationCodeInput.value = reservation.code;
    showTrackedReservation(reservation);
    reservationForm.reset();
    reservationDate.min = todayValue();
    reservationGuestCount.value = '2';
    renderReservationTimes();
    renderDemoAdmin();
});

const reviewForm = document.getElementById('demo-review-form');
reviewForm.addEventListener('submit', (event) => {
    event.preventDefault();
    if (!reviewForm.reportValidity()) return;
    const values = new FormData(reviewForm);
    demoData.reviews.push({
        id: makeDemoId('REV-DEMO'),
        name: cleanText(values.get('name'), 50),
        rating: Number(values.get('rating')),
        comment: cleanText(values.get('comment'), 300),
        status: 'pending',
    });
    saveDemoData(document.getElementById('review-feedback'));
    document.getElementById('review-feedback').textContent =
        'Comentário guardado como demonstração e aguardando moderação local. Não representa uma compra verificada.';
    reviewForm.reset();
    renderDemoAdmin();
});

const renderPublishedReviews = () => {
    const container = document.getElementById('published-demo-reviews');
    container.replaceChildren();
    const approved = demoData.reviews.filter((review) => review.status === 'approved');
    if (!approved.length) {
        const empty = document.createElement('p');
        empty.textContent = 'Ainda não há comentários aprovados nesta demonstração.';
        container.append(empty);
        return;
    }
    const average = approved.reduce((sum, review) => sum + review.rating, 0) / approved.length;
    const averageLabel = document.createElement('p');
    averageLabel.textContent =
        `Média demonstrativa: ${average.toFixed(1)} de 5, baseada em ${approved.length} comentário(s) local(is).`;
    container.append(averageLabel);
    approved.forEach((review) => {
        const article = document.createElement('article');
        const title = document.createElement('strong');
        const comment = document.createElement('p');
        const warning = document.createElement('span');
        title.textContent = `${review.name}, ${review.rating} de 5`;
        comment.textContent = review.comment;
        warning.className = 'demo-label';
        warning.textContent = 'Comentário fictício, não verificado';
        article.append(title, comment, warning);
        container.append(article);
    });
};

const renderDemoAdmin = () => {
    const reviewsList = document.getElementById('demo-admin-reviews');
    const waitlistList = document.getElementById('demo-admin-waitlist');
    reviewsList.replaceChildren();
    waitlistList.replaceChildren();

    if (!demoData.waitlist.length) {
        waitlistList.textContent = demoText('A fila demonstrativa está vazia.');
    }
    demoData.waitlist.forEach((entry, index) => {
        const row = document.createElement('article');
        row.className = 'demo-admin-entry';
        const description = document.createElement('p');
        description.textContent = demoText(
            'Grupo de {count} pessoa(s), posição simulada {position}.',
            { count: entry.guests, position: index + 1 }
        );
        const remove = document.createElement('button');
        remove.className = 'demo-secondary-button';
        remove.type = 'button';
        remove.textContent = demoText('Remover da fila de teste');
        remove.addEventListener('click', () => {
            demoData.waitlist = demoData.waitlist.filter((item) => item.id !== entry.id);
            saveDemoData(document.getElementById('demo-admin-feedback'));
            renderDemoAdmin();
        });
        row.append(description, remove);
        waitlistList.append(row);
    });

    const pending = demoData.reviews.filter((review) => review.status === 'pending');
    if (!pending.length) reviewsList.textContent = 'Nenhum comentário fictício aguardando moderação.';
    pending.forEach((review) => {
        const entry = document.createElement('article');
        entry.className = 'demo-admin-entry';
        const title = document.createElement('strong');
        title.textContent = `${review.name}, ${review.rating} de 5`;
        const comment = document.createElement('p');
        comment.textContent = review.comment;
        const actions = document.createElement('div');
        actions.className = 'demo-inline-controls';
        const approve = document.createElement('button');
        approve.className = 'demo-primary-button';
        approve.type = 'button';
        approve.textContent = 'Aprovar no teste';
        approve.addEventListener('click', () => {
            review.status = 'approved';
            saveDemoData(document.getElementById('demo-admin-feedback'));
            renderDemoAdmin();
            renderPublishedReviews();
        });
        const reject = document.createElement('button');
        reject.className = 'demo-secondary-button';
        reject.type = 'button';
        reject.textContent = 'Apagar';
        reject.addEventListener('click', () => {
            demoData.reviews = demoData.reviews.filter((item) => item.id !== review.id);
            saveDemoData(document.getElementById('demo-admin-feedback'));
            renderDemoAdmin();
        });
        actions.append(approve, reject);
        entry.append(title, comment, actions);
        reviewsList.append(entry);
    });
};

const fillDemoMenuForm = () => {
    const productId = demoProductSelect.value;
    const card = findDemoCard(productId);
    const saved = demoData.menu[productId];
    if (!card) return;
    document.getElementById('demo-menu-description').value =
        saved?.description || card.querySelector('.descricao').textContent;
    const priceText = card.querySelector('.preco').textContent.match(/R\$\s*([\d.,]+)/)?.[1];
    document.getElementById('demo-menu-price').value =
        saved?.price ?? Number(priceText?.replace(/\./g, '').replace(',', '.') || 0);
    document.getElementById('demo-menu-allergens').value = saved?.allergens || '';
    document.getElementById('demo-menu-portion').value = saved?.portion || '';
    document.getElementById('demo-menu-spice').value = saved?.spice || 'unknown';
    document.getElementById('demo-menu-nonalcoholic').value = saved?.nonAlcoholic || 'unknown';
    document.getElementById('demo-menu-ingredients').value = saved?.ingredients || '';
    document.getElementById('demo-menu-available').checked = saved?.available !== false;
    document.getElementById('demo-menu-image').value = '';
};

const imageFileAsDataUrl = (file) => new Promise((resolve, reject) => {
    if (!['image/jpeg', 'image/png', 'image/webp'].includes(file.type)) {
        reject(new Error('Escolha uma imagem JPG, PNG ou WebP.'));
        return;
    }
    if (file.size > 350 * 1024) {
        reject(new Error('Para este teste, a imagem precisa ter até 350 KB.'));
        return;
    }
    const reader = new FileReader();
    reader.addEventListener('load', () => {
        if (typeof reader.result !== 'string') {
            reject(new Error('Não foi possível ler a imagem.'));
            return;
        }
        resolve(reader.result);
    }, { once: true });
    reader.addEventListener('error', () => reject(new Error('Falha ao ler a imagem selecionada.')), { once: true });
    reader.readAsDataURL(file);
});

demoCards.forEach((card) => {
    const option = document.createElement('option');
    option.value = card.dataset.productId;
    option.textContent = card.querySelector('h2').textContent;
    demoProductSelect.append(option);
});
const demoOfferItems = document.getElementById('demo-offer-items');
demoCards.forEach((card) => {
    const option = document.createElement('option');
    option.value = card.dataset.productId;
    option.textContent = card.querySelector('h2').textContent;
    demoOfferItems.append(option);
});
demoProductSelect.addEventListener('change', fillDemoMenuForm);

document.getElementById('demo-menu-form').addEventListener('submit', async (event) => {
    event.preventDefault();
    const form = event.currentTarget;
    if (!form.reportValidity()) return;
    const target = document.getElementById('demo-menu-feedback');
    const productId = demoProductSelect.value;
    const card = findDemoCard(productId);
    const price = Number(document.getElementById('demo-menu-price').value);
    if (!card || !Number.isFinite(price) || price <= 0 || price > 9999) {
        target.textContent = 'Selecione um prato e informe um preço válido para o teste.';
        return;
    }
    const saved = demoData.menu[productId] || {};
    const file = document.getElementById('demo-menu-image').files[0];
    try {
        const image = file ? await imageFileAsDataUrl(file) : saved.image || '';
        demoData.menu[productId] = {
            description: cleanText(document.getElementById('demo-menu-description').value, 220),
            price,
            allergens: cleanText(document.getElementById('demo-menu-allergens').value, 240),
            portion: cleanText(document.getElementById('demo-menu-portion').value, 70),
            spice: document.getElementById('demo-menu-spice').value,
            nonAlcoholic: document.getElementById('demo-menu-nonalcoholic').value,
            ingredients: cleanText(document.getElementById('demo-menu-ingredients').value, 400),
            image,
            available: document.getElementById('demo-menu-available').checked,
        };
        saveDemoData(target);
        renderDemoMenu();
        fillDemoMenuForm();
    } catch (error) {
        target.textContent = error.message;
    }
});

document.getElementById('demo-offer-form').addEventListener('submit', (event) => {
    event.preventDefault();
    if (!event.currentTarget.reportValidity()) return;
    const values = new FormData(event.currentTarget);
    demoData.offer = {
        title: cleanText(values.get('title'), 70),
        description: cleanText(values.get('description'), 180),
        items: values.getAll('items').filter((id) =>
            typeof id === 'string' && demoCards.some((card) => card.dataset.productId === id))
            .slice(0, 8),
    };
    saveDemoData(document.getElementById('demo-offer-feedback'));
    renderDemoOffer();
});

document.getElementById('demo-waitlist-form').addEventListener('submit', (event) => {
    event.preventDefault();
    const form = event.currentTarget;
    if (!form.reportValidity()) return;
    const guests = Number(new FormData(form).get('guests'));
    if (!Number.isInteger(guests) || guests < 1 || guests > 6) {
        document.getElementById('waitlist-feedback').textContent =
            demoText('Selecione um grupo de 1 a 6 pessoas para a demonstração.');
        return;
    }
    const entry = { id: makeDemoId('FILA-DEMO'), guests };
    if (demoData.waitlist.length >= 80) demoData.waitlist.shift();
    demoData.waitlist.push(entry);
    const position = demoData.waitlist.length;
    const saved = saveDemoData();
    document.getElementById('waitlist-feedback').textContent = saved
        ? demoText(
            'Posição simulada: {position}. Espera ilustrativa: {minutes} minutos. Esta fila é local, não envia aviso e não reserva mesa.',
            { position, minutes: position * 8 }
        )
        : demoText('Não foi possível salvar a fila neste navegador. Nenhuma mesa foi reservada.');
    renderDemoAdmin();
});

const offerForm = document.getElementById('demo-offer-form');
offerForm.elements.title.value = demoData.offer.title;
offerForm.elements.description.value = demoData.offer.description;
[...demoOfferItems.options].forEach((option) => {
    option.selected = false;
});
demoData.offer.items.forEach((id) => {
    const option = [...demoOfferItems.options].find((item) => item.value === id);
    if (option) option.selected = true;
});
renderDemoOffer();
renderDemoMenu();
renderDemoAdmin();
renderPublishedReviews();
fillDemoMenuForm();
announceDemoStorage();
if (demoDataInvalid || !demoStorageAvailable) announceDemoStorage(demoStorageNotice);
if (demoDataCodesMigrated) {
    demoDataCodesMigrated = false;
    saveDemoData();
}
renderReservationTimes();

const adminDialog = document.getElementById('demo-admin-dialog');
document.getElementById('open-demo-admin').addEventListener('click', () => adminDialog.showModal());
document.getElementById('close-demo-admin').addEventListener('click', () => adminDialog.close());

window.addEventListener('storage', (event) => {
    if (event.key === restaurantProfileStorageKey) {
        reservationProfile = readReservationProfile();
        renderReservationTimes();
    }
    if (event.key === demoStorageKey) {
        try {
            demoData = event.newValue ? cleanDemoData(JSON.parse(event.newValue)) : demoEmptyData();
            demoDataInvalid = false;
            renderDemoMenu();
            renderDemoOffer();
            renderDemoAdmin();
            renderPublishedReviews();
            renderReservationTimes();
            const lookupCode = reservationCodeInput.value.trim().toUpperCase();
            if (lookupCode) {
                showTrackedReservation(demoData.reservations.find((reservation) => reservation.code === lookupCode));
            }
        } catch {
            demoDataInvalid = true;
            demoStorageNotice.textContent = 'Os dados demonstrativos salvos estão inválidos.';
        }
    }
});

document.addEventListener('app:localechange', () => {
    renderReservationTimes();
    const lookupCode = reservationCodeInput.value.trim().toUpperCase();
    if (lookupCode) {
        showTrackedReservation(demoData.reservations.find((reservation) => reservation.code === lookupCode));
    }
});

document.getElementById('reset-demo-data').addEventListener('click', () => {
    if (!window.confirm('Apagar os pedidos, reservas, fila de espera, avaliações e alterações de demonstração deste navegador?')) {
        return;
    }
    demoData = demoEmptyData();
    try {
        localStorage.removeItem(demoStorageKey);
        demoStorageAvailable = true;
        demoDataInvalid = false;
        demoStorageNotice.textContent = '';
        document.getElementById('demo-admin-feedback').textContent = 'Dados de demonstração apagados deste navegador.';
    } catch {
        demoStorageAvailable = false;
        document.getElementById('demo-admin-feedback').textContent =
            'O navegador não permitiu apagar os dados locais.';
    }
    renderDemoMenu();
    renderDemoOffer();
    renderDemoAdmin();
    renderPublishedReviews();
    offerForm.elements.title.value = demoData.offer.title;
    offerForm.elements.description.value = demoData.offer.description;
    [...demoOfferItems.options].forEach((option) => {
        option.selected = false;
    });
    fillDemoMenuForm();
    document.getElementById('order-tracking-result').replaceChildren();
    document.getElementById('tracking-order-id').value = '';
    reservationForm.reset();
    reservationForm.elements.guests.value = '2';
    reviewForm.reset();
    document.getElementById('waitlist-feedback').replaceChildren();
    document.getElementById('demo-waitlist-form').reset();
});

const preferenceKey = 'la-bella-local-accessibility-v1';
const htmlRoot = document.documentElement;
const contrastToggle = document.getElementById('contrast-toggle');
const textSizeLabel = document.getElementById('text-size-label');
let preference = { textSize: 0, highContrast: false };
let preferenceStorageAvailable = true;

try {
    const savedPreference = JSON.parse(localStorage.getItem(preferenceKey) || '{}');
    if ([0, 1, 2].includes(savedPreference.textSize)) {
        preference.textSize = savedPreference.textSize;
    }
    preference.highContrast = savedPreference.highContrast === true;
} catch {
    preferenceStorageAvailable = false;
}

const applyPreference = () => {
    const textSizes = ['', 'large', 'largest'];
    const labels = ['Texto padrão', 'Texto aumentado', 'Texto maior'];
    if (preference.textSize === 0) htmlRoot.removeAttribute('data-text-size');
    else htmlRoot.dataset.textSize = textSizes[preference.textSize];
    if (preference.highContrast) htmlRoot.dataset.contrast = 'high';
    else htmlRoot.removeAttribute('data-contrast');
    textSizeLabel.textContent = labels[preference.textSize];
    contrastToggle.checked = preference.highContrast;
    document.getElementById('text-smaller').disabled = preference.textSize === 0;
    document.getElementById('text-larger').disabled = preference.textSize === 2;
};

const savePreference = () => {
    applyPreference();
    try {
        localStorage.setItem(preferenceKey, JSON.stringify(preference));
        preferenceStorageAvailable = true;
    } catch {
        preferenceStorageAvailable = false;
        textSizeLabel.textContent = 'Preferência aplicada só até fechar esta página';
    }
};

document.getElementById('text-smaller').addEventListener('click', () => {
    preference.textSize = Math.max(0, preference.textSize - 1);
    savePreference();
});
document.getElementById('text-larger').addEventListener('click', () => {
    preference.textSize = Math.min(2, preference.textSize + 1);
    savePreference();
});
contrastToggle.addEventListener('change', () => {
    preference.highContrast = contrastToggle.checked;
    savePreference();
});
document.getElementById('reset-accessibility').addEventListener('click', () => {
    preference = { textSize: 0, highContrast: false };
    savePreference();
});
applyPreference();
if (!preferenceStorageAvailable) {
    textSizeLabel.textContent = 'Ajustes aplicados, mas não salvos';
}
