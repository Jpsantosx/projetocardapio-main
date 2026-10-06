const orderDialog = document.getElementById('order-dialog');
const orderDialogTitle = document.getElementById('order-dialog-title');
const orderDialogKicker = document.getElementById('order-dialog-kicker');
const orderDialogContent = document.getElementById('order-dialog-content');
const orderDialogFeedback = document.getElementById('order-dialog-feedback');
const openCartButton = document.getElementById('open-cart');
const closeOrderDialogButton = document.getElementById('close-order-dialog');
const cartCount = document.getElementById('cart-count');
const cartStorageKey = 'la-bella-trattoria-order';
const demoConfig = window.restaurantDemoConfig;
const cart = [];
let cartStorageError = false;

const createOrderItemId = () =>
    globalThis.crypto && typeof globalThis.crypto.randomUUID === 'function'
        ? globalThis.crypto.randomUUID()
        : `${Date.now()}-${Math.random().toString(36).slice(2)}`;

const ingredientLists = {
    'Bruschetta al Pomodoro': ['Pão rústico tostado', 'Tomate fresco', 'Manjericão', 'Azeite'],
    'Caprese di Bufala': ['Mozzarella de búfala', 'Tomate', 'Manjericão'],
    'Carpaccio di Manzo': ['Carne bovina', 'Rúcula', 'Parmesão', 'Alcaparras'],
    'Arancini Siciliani': ['Risoto', 'Mozzarella', 'Ragù'],
    'Melanzane alla Parmigiana': ['Berinjela', 'Molho de tomate', 'Parmesão'],
    'Frittura di Calamari': ['Lulas', 'Empanado', 'Limão'],
    'Tagliatelle alla Bolognese': ['Tagliatelle artesanal', 'Molho bolonhesa'],
    'Spaghetti alla Carbonara': ['Spaghetti', 'Guanciale', 'Pecorino', 'Gema de ovo'],
    'Lasagna alla Napoletana': ['Massa', 'Ragù', 'Mozzarella', 'Ricota'],
    'Ravioli di Ricotta e Spinaci': ['Ravioli', 'Ricota', 'Espinafre', 'Manteiga', 'Sálvia'],
    'Gnocchi alla Sorrentina': ['Nhoque de batata', 'Molho de tomate', 'Mozzarella'],
    'Fettuccine ai Frutti di Mare': ['Fettuccine', 'Frutos do mar', 'Vinho branco'],
    'Margherita': ['Molho San Marzano', 'Mozzarella fior di latte', 'Manjericão'],
    'Marinara': ['Molho de tomate', 'Alho', 'Orégano', 'Azeite extravirgem'],
    'Diavola': ['Salame picante', 'Mozzarella', 'Molho de tomate defumado'],
    'Quattro Formaggi': ['Gorgonzola', 'Parmesão', 'Mozzarella', 'Fontina'],
    'Prosciutto e Rucola': ['Presunto de Parma', 'Rúcula', 'Parmesão'],
    'Capricciosa': ['Cogumelos', 'Alcachofra', 'Azeitonas', 'Presunto cozido'],
    'Negroni': ['Gin', 'Vermute tinto', 'Campari'],
    'Aperol Spritz': ['Aperol', 'Prosecco', 'Água com gás'],
    'Bellini': ['Espumante', 'Purê de pêssego'],
    'Limoncello Tonic': ['Licor de limão siciliano', 'Água tônica', 'Hortelã'],
    'Americano': ['Vermute tinto', 'Campari', 'Soda'],
    'Espresso Martini': ['Vodca', 'Café espresso', 'Licor de baunilha'],
    'Tiramisù Classico': ['Mascarpone', 'Café', 'Cacau'],
    'Panna Cotta alla Vaniglia': ['Creme', 'Baunilha', 'Calda de frutas'],
    'Cannoli Siciliani': ['Massa crocante', 'Ricota doce', 'Pistache'],
    'Affogato al Caffè': ['Gelato de creme', 'Espresso'],
    'Torta Caprese': ['Chocolate', 'Amêndoas'],
    'Gelato Artigianale': ['Gelato do dia', 'Dois sabores à escolha'],
};

const addOnSuggestions = {
    'Bruschetta al Pomodoro': ['Mozzarella de búfala adicional', 'Parmesão'],
    'Caprese di Bufala': ['Pão rústico', 'Azeitonas'],
    'Carpaccio di Manzo': ['Parmesão adicional', 'Alcaparras adicionais'],
    'Arancini Siciliani': ['Mozzarella extra', 'Molho de tomate'],
    'Melanzane alla Parmigiana': ['Mozzarella', 'Manjericão'],
    'Frittura di Calamari': ['Limão extra', 'Molho de tomate'],
    'Tagliatelle alla Bolognese': ['Parmesão', 'Manjericão'],
    'Spaghetti alla Carbonara': ['Guanciale adicional', 'Pecorino adicional'],
    'Lasagna alla Napoletana': ['Parmesão', 'Manjericão'],
    'Ravioli di Ricotta e Spinaci': ['Parmesão adicional', 'Sálvia adicional'],
    'Gnocchi alla Sorrentina': ['Mozzarella adicional', 'Manjericão'],
    'Fettuccine ai Frutti di Mare': ['Frutos do mar adicional'],
    'Margherita': ['Mozzarella extra', 'Azeitonas', 'Rúcula'],
    'Marinara': ['Azeitonas', 'Alcachofra', 'Rúcula'],
    'Diavola': ['Mozzarella adicional', 'Cogumelos', 'Azeitonas'],
    'Quattro Formaggi': ['Mozzarella adicional', 'Rúcula'],
    'Prosciutto e Rucola': ['Presunto de Parma adicional', 'Mozzarella'],
    'Capricciosa': ['Mozzarella', 'Rúcula'],
    'Tiramisù Classico': ['Mascarpone adicional', 'Cacau adicional'],
    'Panna Cotta alla Vaniglia': ['Calda de frutas adicional', 'Gelato de creme'],
    'Cannoli Siciliani': ['Pistache adicional', 'Chocolate'],
    'Affogato al Caffè': ['Gelato de creme adicional', 'Espresso adicional'],
    'Torta Caprese': ['Gelato de creme', 'Calda de frutas'],
    'Gelato Artigianale': ['Pistache', 'Calda de frutas'],
};

const normalizeIngredient = (value) =>
    value.normalize('NFD').replace(/[\u0300-\u036f]/g, '').toLowerCase();

const element = (tagName, className, text) => {
    const node = document.createElement(tagName);
    if (className) node.className = className;
    if (text !== undefined) node.textContent = orderText(text);
    return node;
};

const formatPrice = (value) => window.menuI18n
    ? window.menuI18n.money(value)
    : new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(value);

const orderText = (source, values = {}) => {
    const translated = window.menuI18n?.translate(source) || source;
    return Object.entries(values).reduce(
        (text, [key, value]) => text.replaceAll(`{${key}}`, String(value)),
        translated
    );
};

const readProduct = (card) => {
    const name = card.dataset.originalDishName || card.querySelector('h2').textContent.trim();
    const priceText = card.querySelector('.preco').textContent.match(/R\$\s*([\d.,]+)/)?.[1];
    const price = priceText
        ? Number(priceText.replace(/\./g, '').replace(',', '.'))
        : NaN;

    if (!Number.isFinite(price)) {
        throw new Error(`Preço inválido no item "${name}".`);
    }

    const product = {
        id: card.dataset.favoriteId,
        name,
        displayName: card.querySelector('h2').textContent.trim(),
        description: card.querySelector('.descricao').textContent.trim(),
        price,
        image: card.querySelector('img').getAttribute('src'),
        ingredients: ingredientLists[name] || [],
        extras: addOnSuggestions[name] || [],
    };
    product.sizes = card.closest('.menu-section').id === 'Pizzas'
        ? demoConfig.pizzaSizes
        : null;

    return product;
};

const productLabel = (product) =>
    [...document.querySelectorAll('.card')].find((card) => card.dataset.productId === product.id)
        ?.querySelector('h2').textContent.trim()
    || product.displayName
    || product.name;

const ingredientLabel = (ingredient) =>
    window.menuI18n?.translateIngredient(ingredient) || ingredient;

const products = new Map();

document.querySelectorAll('.card').forEach((card) => {
    const product = readProduct(card);
    const addButton = element('button', 'add-to-order', 'Escolher ingredientes');
    const shareButton = element('button', 'share-product', 'Compartilhar');
    const actions = element('div', 'card-actions');
    const image = card.querySelector('img');

    card.dataset.productId = product.id;
    card.dataset.dietary = demoConfig.noMeatListed.includes(product.name)
        ? 'no-meat-listed'
        : 'standard';
    card.dataset.searchIngredients = product.ingredients.join(' ');
    image.alt = `${product.name}. ${product.description}.`;
    image.loading = 'lazy';
    image.decoding = 'async';
    products.set(product.id, product);

    addButton.type = 'button';
    addButton.setAttribute('aria-label', `Personalizar ${product.name} e adicionar ao pedido`);
    addButton.addEventListener('click', () => openCustomizer(product));
    shareButton.type = 'button';
    shareButton.setAttribute('aria-label', `Compartilhar ${product.name}`);
    shareButton.addEventListener('click', () => {
        window.shareMenuItem(productLabel(product), product.id);
    });
    actions.append(shareButton, addButton);
    card.querySelector('.card-content').append(actions);

    if (card.dataset.dietary === 'no-meat-listed') {
        const label = element('span', 'dietary-badge', 'Sem carne na descrição');
        card.querySelector('.card-title-group').append(label);
    }
});
document.dispatchEvent(new CustomEvent('menu:metadata-ready'));

window.menuOrderApi = {
    refreshCatalog() {
        document.querySelectorAll('.card').forEach((card) => {
            const updatedProduct = readProduct(card);
            const currentProduct = products.get(updatedProduct.id);
            if (currentProduct) Object.assign(currentProduct, updatedProduct);
        });
    },
    getProducts() {
        return [...products.values()];
    },
    getCartSnapshot() {
        const items = cart.map((item) => {
            const product = products.get(item.productId);
            return {
                name: product.name,
                quantity: item.quantity,
                size: sizeLabel(item) || '',
                unitPrice: unitPrice(item),
                removed: [...item.removed],
                extras: [...item.extras],
                notes: item.notes,
            };
        });
        return {
            items,
            total: Math.round(items.reduce((sum, item) => sum + item.unitPrice * item.quantity, 0) * 100) / 100,
        };
    },
};

const unitPrice = (item) => {
    const product = products.get(item.productId);
    const size = product.sizes?.find((option) => option.id === item.sizeId);
    return Math.round(product.price * (size?.multiplier || 1) * 100) / 100;
};

const sizeLabel = (item) =>
    products.get(item.productId).sizes?.find((option) => option.id === item.sizeId)?.label;

const saveCart = () => {
    try {
        localStorage.setItem(cartStorageKey, JSON.stringify(cart));
        cartStorageError = false;
    } catch {
        cartStorageError = true;
    }
};

const sanitizeSavedCartItem = (savedItem) => {
    if (!savedItem || typeof savedItem !== 'object' || typeof savedItem.productId !== 'string') {
        return null;
    }

    const product = products.get(savedItem.productId);
    if (!product) return null;

    const asKnownSelections = (selection, allowedOptions) =>
        Array.isArray(selection)
            ? [...new Set(selection.filter((option) =>
                typeof option === 'string' && allowedOptions.includes(option)))]
            : [];
    const quantity = Number(savedItem.quantity);

    return {
        id: typeof savedItem.id === 'string' ? savedItem.id : createOrderItemId(),
        productId: product.id,
        quantity: Number.isInteger(quantity) ? Math.max(1, Math.min(99, quantity)) : 1,
        sizeId: product.sizes?.some((size) => size.id === savedItem.sizeId)
            ? savedItem.sizeId
            : 'regular',
        removed: asKnownSelections(savedItem.removed, product.ingredients),
        extras: asKnownSelections(savedItem.extras, product.extras),
        notes: typeof savedItem.notes === 'string' ? savedItem.notes.slice(0, 250) : '',
    };
};

try {
    const savedCart = JSON.parse(localStorage.getItem(cartStorageKey) || '[]');
    if (!Array.isArray(savedCart)) throw new Error('Formato de pedido inválido.');
    savedCart.forEach((savedItem) => {
        const item = sanitizeSavedCartItem(savedItem);
        if (item) cart.push(item);
    });
    if (savedCart.length !== cart.length) saveCart();
} catch {
    cartStorageError = true;
    cart.length = 0;
}

const totalQuantity = () => cart.reduce((total, item) => total + item.quantity, 0);

const setDialogFeedback = (message = '') => {
    const notices = [];
    if (cartStorageError) {
        notices.push('Este navegador não conseguiu salvar o pedido. Você ainda pode continuar com o WhatsApp.');
    }
    if (message) notices.push(message);
    orderDialogFeedback.textContent = notices.join(' ');
};

const updateCartCount = () => {
    const count = totalQuantity();
    cartCount.textContent = String(count);
    openCartButton.setAttribute(
        'aria-label',
        `Abrir pedido, ${count} ${count === 1 ? 'item' : 'itens'}`
    );
};

const updateDialog = (mode, title, kicker) => {
    orderDialog.classList.toggle('is-checkout', mode === 'checkout');
    orderDialogKicker.textContent = orderText(kicker);
    orderDialogTitle.textContent = mode === 'product' ? title : orderText(title);
    orderDialogContent.replaceChildren();
    setDialogFeedback();

    if (!orderDialog.open) orderDialog.showModal();
};

const checkboxGroup = (legendText, options, name, selected = []) => {
    const fieldset = element('fieldset', 'option-group');
    fieldset.append(element('legend', '', legendText));

    if (!options.length) {
        fieldset.append(element('p', 'option-help', 'Não há opções cadastradas para este prato.'));
        return fieldset;
    }

    options.forEach((option, index) => {
        const label = element('label', 'option-choice');
        const input = document.createElement('input');
        const inputId = `${name}-${index}`;

        input.type = 'checkbox';
        input.name = name;
        input.value = option;
        input.id = inputId;
        input.checked = selected.includes(option);
        label.classList.toggle('is-checked', input.checked);
        input.addEventListener('change', () => {
            label.classList.toggle('is-checked', input.checked);
        });
        label.htmlFor = inputId;
        label.append(input, element('span', '', ingredientLabel(option)));
        fieldset.append(label);
    });

    return fieldset;
};

const openCustomizer = (product, existingItem = null) => {
    const ingredients = product.ingredients;
    const extras = product.extras.filter((extra) =>
        !ingredients.some((ingredient) =>
            normalizeIngredient(ingredient) === normalizeIngredient(extra)));

    updateDialog('product', productLabel(product), orderText('Personalize seu prato'));
    const form = element('form', 'customizer-form');
    const description = element('p', 'customizer-description', product.description);
    const price = element('p', 'customizer-price', `${formatPrice(product.price)} por unidade`);
    const ingredientsNote = element(
        'p',
        'ingredient-disclaimer',
        'Lista resumida conforme a descrição do cardápio. Consulte a equipe sobre alergênicos e contaminação cruzada.'
    );
    const quantityLabel = element('label', 'form-field');
    const quantityInput = document.createElement('input');
    const notesLabel = element('label', 'form-field');
    const notesInput = document.createElement('textarea');
    const actions = element('div', 'dialog-actions');
    const submit = element(
        'button',
        'primary-action',
        existingItem ? 'Salvar alterações' : 'Adicionar ao pedido'
    );
    const cancel = element('button', 'secondary-action', 'Voltar ao cardápio');
    let sizeSelect = null;
    let sizeField = null;

    if (product.sizes) {
        sizeField = element('label', 'form-field');
        sizeSelect = document.createElement('select');
        sizeSelect.name = 'pizza-size';
        sizeSelect.setAttribute('aria-label', 'Tamanho da pizza');
        product.sizes.forEach((size) => {
            const option = document.createElement('option');
            const optionPrice = Math.round(product.price * size.multiplier * 100) / 100;
            option.value = size.id;
            option.textContent = `${orderText(size.label)} — ${formatPrice(optionPrice)}`;
            option.selected = (existingItem?.sizeId || 'regular') === size.id;
            sizeSelect.append(option);
        });
        sizeField.append(element('span', '', 'Tamanho (preços ilustrativos)'), sizeSelect);
        const updateSizePrice = () => {
            const selectedSize = product.sizes.find((size) => size.id === sizeSelect.value);
            price.textContent = `${formatPrice(product.price * selectedSize.multiplier)} por unidade`;
        };
        sizeSelect.addEventListener('change', updateSizePrice);
        updateSizePrice();
    }

    quantityLabel.append(element('span', '', 'Quantidade'));
    quantityInput.type = 'number';
    quantityInput.name = 'quantity';
    quantityInput.min = '1';
    quantityInput.max = '99';
    quantityInput.required = true;
    quantityInput.value = String(existingItem?.quantity || 1);
    quantityLabel.append(quantityInput);

    notesLabel.append(element('span', '', 'Observações deste prato'));
    notesInput.name = 'notes';
    notesInput.maxLength = 250;
    notesInput.rows = 3;
    notesInput.placeholder = 'Ex.: ponto da carne, preferência de preparo…';
    notesInput.value = existingItem?.notes || '';
    notesLabel.append(notesInput);

    submit.type = 'submit';
    cancel.type = 'button';
    cancel.addEventListener('click', () => {
        if (existingItem) renderCart();
        else orderDialog.close();
    });

    form.append(
        description,
        ...(sizeField ? [sizeField] : []),
        price,
        checkboxGroup(orderText('Ingredientes para retirar'), ingredients, 'remove-ingredient', existingItem?.removed),
        checkboxGroup(orderText('Acréscimos sugeridos'), extras, 'add-ingredient', existingItem?.extras),
        element(
            'p',
            'price-disclaimer',
            'Disponibilidade e valor dos acréscimos serão confirmados pela equipe. Eles não entram no subtotal.'
        ),
        quantityLabel,
        notesLabel
    );

    const suggestedNames = demoConfig.recommendations[product.name] || [];
    const suggestions = suggestedNames
        .map((name) => [...products.values()].find((candidate) => candidate.name === name))
        .filter(Boolean);
    if (suggestions.length && !existingItem) {
        const recommendationGroup = element('div', 'recommendation-group');
        recommendationGroup.append(
            element('h3', '', 'Talvez também combine'),
            element('p', 'recommendation-note', 'Sugestões individuais, sem preço de combo ou desconto.')
        );
        suggestions.forEach((suggestion) => {
            const recommendation = element(
                'button',
                'recommendation-button',
                `${suggestion.name} · ${formatPrice(suggestion.price)}`
            );
            recommendation.type = 'button';
            recommendation.addEventListener('click', () => openCustomizer(suggestion));
            recommendationGroup.append(recommendation);
        });
        form.append(recommendationGroup);
    }

    const allergiesNote = element(
        'p',
        'allergy-reminder',
        'A remoção de ingredientes não garante ausência de alergênicos ou contato cruzado na cozinha.'
    );
    actions.append(cancel, submit);
    form.append(allergiesNote, actions);
    form.addEventListener('submit', (event) => {
        event.preventDefault();
        if (!form.reportValidity()) return;

        const updatedItem = {
            id: existingItem?.id || createOrderItemId(),
            productId: product.id,
            quantity: Math.max(1, Math.min(99, Number(quantityInput.value))),
            sizeId: sizeSelect?.value || 'regular',
            removed: [...form.querySelectorAll('[name="remove-ingredient"]:checked')].map((input) => input.value),
            extras: [...form.querySelectorAll('[name="add-ingredient"]:checked')].map((input) => input.value),
            notes: notesInput.value.trim(),
        };

        if (existingItem) {
            const existingIndex = cart.findIndex((item) => item.id === existingItem.id);
            if (existingIndex >= 0) cart[existingIndex] = updatedItem;
        } else {
            cart.push(updatedItem);
        }

        saveCart();
        updateCartCount();
        renderCart(existingItem ? 'Personalização atualizada.' : 'Item adicionado ao pedido.');
    });

    orderDialogContent.append(form);
};

const optionSummary = (item) => {
    const details = [];
    const selectedSizeLabel = sizeLabel(item);
    if (selectedSizeLabel) details.push(`${orderText('Tamanho')}: ${orderText(selectedSizeLabel)}`);
    if (item.removed.length) details.push(`${orderText('Sem')}: ${item.removed.map(ingredientLabel).join(', ')}`);
    if (item.extras.length) {
        details.push(`${orderText('Acréscimos a confirmar')}: ${item.extras.map(ingredientLabel).join(', ')}`);
    }
    if (item.notes) details.push(`${orderText('Observação')}: ${item.notes}`);
    return details;
};

const updateCartItemQuantity = (item, amount) => {
    item.quantity = Math.max(1, Math.min(99, item.quantity + amount));
    saveCart();
    updateCartCount();
    renderCart();
};

const cartLine = (item) => {
    const product = products.get(item.productId);
    const line = element('article', 'cart-line');
    const image = document.createElement('img');
    const content = element('div', 'cart-line-content');
    const titleRow = element('div', 'cart-line-heading');
    const details = element('ul', 'cart-line-options');
    const quantity = element('div', 'quantity-control');
    const priceRow = element('div', 'cart-line-footer');
    const decrement = element('button', 'quantity-button', '−');
    const increment = element('button', 'quantity-button', '+');
    const edit = element('button', 'text-action', 'Editar');
    const remove = element('button', 'remove-action', 'Remover');
    const summaries = optionSummary(item);

    image.className = 'cart-line-image';
    image.src = product.image;
    image.alt = '';
    image.loading = 'lazy';

    titleRow.append(element('h3', '', productLabel(product)));
    if (item.quantity > 1) {
        titleRow.append(element('span', 'cart-line-multiplier', `× ${item.quantity}`));
    }
    content.append(titleRow);

    if (summaries.length) {
        summaries.forEach((summary) => details.append(element('li', '', summary)));
        content.append(details);
    } else {
        content.append(element('p', 'cart-line-default', orderText('Sem alterações')));
    }

    decrement.type = 'button';
    decrement.setAttribute('aria-label', `${orderText('Diminuir quantidade de')} ${productLabel(product)}`);
    increment.type = 'button';
    increment.setAttribute('aria-label', `${orderText('Aumentar quantidade de')} ${productLabel(product)}`);
    decrement.disabled = item.quantity <= 1;
    decrement.addEventListener('click', () => updateCartItemQuantity(item, -1));
    increment.addEventListener('click', () => updateCartItemQuantity(item, 1));
    quantity.append(decrement, element('span', '', String(item.quantity)), increment);

    edit.textContent = orderText('Editar');
    edit.type = 'button';
    edit.addEventListener('click', () => openCustomizer(product, item));
    remove.textContent = orderText('Remover');
    remove.type = 'button';
    remove.addEventListener('click', () => {
        const index = cart.findIndex((cartItem) => cartItem.id === item.id);
        if (index >= 0) cart.splice(index, 1);
        saveCart();
        updateCartCount();
        renderCart('Item removido do pedido.');
    });
    priceRow.append(element('strong', '', formatPrice(unitPrice(item) * item.quantity)));
    const lineActions = element('div', 'cart-line-actions');
    lineActions.append(quantity, edit, remove);
    content.append(priceRow, lineActions);
    line.append(image, content);
    return line;
};

const renderBillSplitter = (subtotal) => {
    const panel = element('section', 'bill-splitter');
    const heading = element('h3', '', orderText('Dividir a conta (simulação)'));
    const description = element(
        'p',
        '',
        orderText('A divisão considera somente o subtotal dos pratos; extras e entrega ficam de fora. Nenhum pagamento é processado.')
    );
    const controls = element('div', 'bill-split-controls');
    const modeLabel = element('label', 'form-field');
    const modeSelect = document.createElement('select');
    modeSelect.setAttribute('aria-label', orderText('Forma de divisão'));
    [
        ['equal', orderText('Dividir igualmente')],
        ['items', orderText('Atribuir itens por pessoa')],
    ].forEach(([value, label]) => {
        const option = document.createElement('option');
        option.value = value;
        option.textContent = label;
        modeSelect.append(option);
    });
    modeLabel.append(element('span', '', orderText('Como dividir')), modeSelect);

    const peopleLabel = element('label', 'form-field');
    const peopleCount = document.createElement('input');
    peopleCount.type = 'number';
    peopleCount.min = '2';
    peopleCount.max = '12';
    peopleCount.step = '1';
    peopleCount.value = '2';
    peopleCount.required = true;
    peopleLabel.append(element('span', '', orderText('Número de pessoas')), peopleCount);
    controls.append(modeLabel, peopleLabel);

    const allocations = element('div', 'bill-item-allocations');
    const output = element('div', 'bill-split-result');
    output.setAttribute('role', 'status');
    output.setAttribute('aria-live', 'polite');

    const buildAllocations = () => {
        allocations.replaceChildren();
        if (modeSelect.value !== 'items') return;
        const people = Number(peopleCount.value);
        if (!Number.isInteger(people) || people < 2 || people > 12) return;
        cart.forEach((item) => {
            const product = products.get(item.productId);
            const row = element('fieldset', 'bill-item-row');
            row.append(element(
                'legend',
                '',
                `${productLabel(product)} · ${orderText('quantidade')}: ${item.quantity}`
            ));
            const shares = element('div', 'bill-share-grid');
            for (let person = 0; person < people; person += 1) {
                const label = element('label', 'form-field');
                const input = document.createElement('input');
                input.type = 'number';
                input.min = '0';
                input.max = String(item.quantity);
                input.step = '1';
                input.value = person === 0 ? String(item.quantity) : '0';
                input.dataset.itemId = item.id;
                input.dataset.person = String(person);
                input.inputMode = 'numeric';
                label.append(
                    element('span', '', `${orderText('Pessoa')} ${person + 1}`),
                    input
                );
                shares.append(label);
            }
            row.append(shares);
            allocations.append(row);
        });
    };

    const calculate = () => {
        const people = Number(peopleCount.value);
        if (!Number.isInteger(people) || people < 2 || people > 12) {
            output.textContent = orderText('Informe de 2 a 12 pessoas.');
            return;
        }
        output.replaceChildren();
        const totalCents = Math.round(subtotal * 100);
        const shares = Array.from({ length: people }, () => 0);
        if (modeSelect.value === 'equal') {
            const base = Math.floor(totalCents / people);
            const remainder = totalCents - base * people;
            shares.forEach((value, index) => {
                shares[index] = base + (index < remainder ? 1 : 0);
            });
        } else {
            for (const item of cart) {
                const inputs = [...allocations.querySelectorAll(`[data-item-id="${item.id}"]`)];
                const assigned = inputs.map((input) => Number(input.value));
                if (assigned.some((quantity) => !Number.isInteger(quantity) || quantity < 0)
                    || assigned.reduce((sum, quantity) => sum + quantity, 0) !== item.quantity) {
                    output.textContent = orderText(
                        'As quantidades atribuídas devem somar a quantidade de cada item.'
                    );
                    return;
                }
                const unitCents = Math.round(unitPrice(item) * 100);
                assigned.forEach((quantity, index) => {
                    shares[index] += quantity * unitCents;
                });
            }
        }
        const list = element('ul', 'bill-split-list');
        shares.forEach((amount, index) => {
            list.append(element(
                'li',
                '',
                `${orderText('Pessoa')} ${index + 1}: ${formatPrice(amount / 100)}`
            ));
        });
        output.append(
            element('strong', '', `${orderText('Total dividido')}: ${formatPrice(totalCents / 100)}`),
            list,
            element('small', '', orderText('Valores demonstrativos; não são cobranças.'))
        );
    };

    const calculateButton = element('button', 'demo-secondary-button', orderText('Calcular divisão'));
    calculateButton.type = 'button';
    calculateButton.addEventListener('click', calculate);
    modeSelect.addEventListener('change', () => {
        output.replaceChildren();
        buildAllocations();
    });
    peopleCount.addEventListener('input', () => {
        output.replaceChildren();
        buildAllocations();
    });
    buildAllocations();
    panel.append(
        heading,
        description,
        controls,
        allocations,
        calculateButton,
        output
    );
    return panel;
};

const renderCart = (message = '') => {
    updateDialog('cart', orderText('Seu pedido'), orderText('Confira os itens'));

    if (!cart.length) {
        const empty = element('div', 'cart-empty');
        empty.append(
            element('h3', '', orderText('Seu pedido está vazio')),
            element('p', '', orderText('Escolha um prato e ajuste ingredientes, quantidade e observações.')),
        );
        const close = element('button', 'primary-action', orderText('Voltar ao cardápio'));
        close.type = 'button';
        close.addEventListener('click', () => orderDialog.close());
        empty.append(close);
        orderDialogContent.append(empty);
        setDialogFeedback(message);
        return;
    }

    const list = element('div', 'cart-lines');
    cart.forEach((item) => list.append(cartLine(item)));

    const subtotal = cart.reduce((total, item) => total + unitPrice(item) * item.quantity, 0);
    const summary = element('div', 'cart-summary');
    const split = renderBillSplitter(subtotal);
    summary.append(
        element('p', 'cart-subtotal', `${orderText('Subtotal dos pratos')}: ${formatPrice(subtotal)}`),
        element(
            'p',
            'price-disclaimer',
            'Acréscimos e entrega não estão incluídos. A equipe confirma valores e disponibilidade pelo WhatsApp.'
        )
    );

    const actions = element('div', 'dialog-actions cart-dialog-actions');
    const continueShopping = element('button', 'secondary-action', orderText('Continuar escolhendo'));
    const checkout = element('button', 'primary-action', orderText('Informar entrega'));
    const clear = element('button', 'text-action', orderText('Esvaziar pedido'));
    continueShopping.type = 'button';
    checkout.type = 'button';
    clear.type = 'button';
    continueShopping.addEventListener('click', () => orderDialog.close());
    checkout.addEventListener('click', renderCheckout);
    clear.addEventListener('click', () => {
        cart.length = 0;
        saveCart();
        updateCartCount();
        renderCart('Pedido esvaziado.');
    });
    actions.append(continueShopping, checkout, clear);

    orderDialogContent.append(list, split, summary, actions);
    setDialogFeedback(message);
};

const addFormField = (form, labelText, name, options = {}) => {
    const label = element('label', 'form-field');
    const control = options.multiline
        ? document.createElement('textarea')
        : document.createElement('input');

    label.append(element('span', '', labelText));
    control.name = name;
    control.id = `checkout-${name}`;
    control.required = Boolean(options.required);
    if (options.multiline) {
        control.rows = 3;
    } else {
        control.type = options.type || 'text';
        if (options.autocomplete) control.autocomplete = options.autocomplete;
    }
    if (options.maxLength) control.maxLength = options.maxLength;
    label.append(control);
    form.append(label);
    return control;
};

const renderCheckout = () => {
    updateDialog('checkout', 'Como prefere receber?', 'Finalizar pedido');
    const form = element('form', 'checkout-form');
    const nameInput = addFormField(form, 'Seu nome', 'customer-name', {
        required: true,
        autocomplete: 'name',
        maxLength: 100,
    });
    const serviceLabel = element('label', 'form-field');
    const serviceSelect = document.createElement('select');
    serviceSelect.id = 'checkout-service';
    serviceSelect.name = 'service';
    serviceSelect.required = true;
    serviceLabel.append(element('span', '', 'Tipo de pedido'));

    [
        ['', 'Selecione uma opção'],
        ['dine-in', 'Consumir no local'],
        ['pickup', 'Retirada no restaurante'],
        ['delivery', 'Entrega'],
    ].forEach(([value, text]) => {
        const option = document.createElement('option');
        option.value = value;
        option.textContent = orderText(text);
        serviceSelect.append(option);
    });

    serviceLabel.append(serviceSelect);
    form.append(serviceLabel);

    const deliveryFields = element('div', 'delivery-fields');
    const addressInput = addFormField(deliveryFields, 'Endereço de entrega', 'address', {
        required: true,
        autocomplete: 'street-address',
        maxLength: 180,
    });
    addFormField(deliveryFields, 'Complemento ou referência', 'reference', {
        maxLength: 120,
    });
    deliveryFields.append(element(
        'p',
        'delivery-demo-note',
        orderText(
            'Demonstração: taxa de {fee}, raio de {radius} km e prazo de {minutes}. Consulte a equipe para confirmar a cobertura e o valor reais.',
            {
                fee: formatPrice(demoConfig.deliveryFee),
                radius: demoConfig.deliveryRadiusKm,
                minutes: demoConfig.deliveryMinutes,
            }
        )
    ));
    deliveryFields.hidden = true;
    form.append(deliveryFields);

    const estimate = element('p', 'checkout-estimate', '');
    estimate.hidden = true;
    form.append(estimate);

    const paymentLabel = element('label', 'form-field');
    const paymentSelect = document.createElement('select');
    paymentSelect.name = 'payment';
    paymentSelect.id = 'checkout-payment';
    paymentLabel.append(element('span', '', 'Forma de pagamento (opções ilustrativas)'));
    [
        ['Combinar com o restaurante', 'Combinar com o restaurante'],
        ['Pix (exemplo)', 'Pix (exemplo)'],
        ['Dinheiro (exemplo)', 'Dinheiro (exemplo)'],
        ['Cartão de crédito (exemplo)', 'Cartão de crédito (exemplo)'],
        ['Cartão de débito (exemplo)', 'Cartão de débito (exemplo)'],
    ].forEach(([value, text]) => {
        const option = document.createElement('option');
        option.value = value;
        option.textContent = orderText(text);
        paymentSelect.append(option);
    });
    paymentLabel.append(paymentSelect);
    form.append(paymentLabel);

    const orderNotes = addFormField(form, 'Observação do pedido', 'order-notes', {
        multiline: true,
        maxLength: 300,
    });
    orderNotes.placeholder = 'Ex.: interfone, instruções gerais…';

    const whatsappNumber = document.documentElement.dataset.whatsappNumber.replace(/\D/g, '');
    const whatsappReady = /^\d{10,15}$/.test(whatsappNumber);
    const whatsappNotice = element(
        'p',
        whatsappReady ? 'whatsapp-notice' : 'whatsapp-notice is-not-configured',
        whatsappReady
            ? 'O pedido será aberto como mensagem para conferência. Ele só será confirmado após o envio no WhatsApp.'
            : 'O WhatsApp do restaurante ainda não foi configurado. O pedido não será enviado até informar o número no site.'
    );
    const actions = element('div', 'dialog-actions checkout-actions');
    const back = element('button', 'secondary-action', 'Voltar ao pedido');
    const send = element('button', 'primary-action', 'Abrir WhatsApp');
    back.type = 'button';
    send.type = 'submit';
    send.disabled = !whatsappReady;
    back.addEventListener('click', () => renderCart());
    actions.append(back, send);
    form.append(whatsappNotice, actions);

    serviceSelect.addEventListener('change', () => {
        const requiresAddress = serviceSelect.value === 'delivery';
        deliveryFields.hidden = !requiresAddress;
        addressInput.required = requiresAddress;
        estimate.hidden = !serviceSelect.value;
        const subtotal = cart.reduce((total, item) => total + unitPrice(item) * item.quantity, 0);
        const total = subtotal + (requiresAddress ? demoConfig.deliveryFee : 0);
        estimate.textContent = requiresAddress
            ? orderText(
                'Total estimado de demonstração: {subtotal} em pratos + {fee} de entrega = {total}. Confirme tudo com o restaurante.',
                {
                    subtotal: formatPrice(subtotal),
                    fee: formatPrice(demoConfig.deliveryFee),
                    total: formatPrice(total),
                }
            )
            : serviceSelect.value === 'pickup'
                ? orderText(
                    'Subtotal ilustrativo dos pratos: {subtotal}. Prazo de retirada de demonstração: {minutes}.',
                    { subtotal: formatPrice(subtotal), minutes: demoConfig.pickupMinutes }
                )
                : orderText('Subtotal ilustrativo dos pratos: {subtotal}.', {
                    subtotal: formatPrice(subtotal),
                });
    });

    form.addEventListener('submit', (event) => {
        event.preventDefault();
        if (!form.reportValidity()) return;
        if (!whatsappReady) {
            setDialogFeedback('Informe o número oficial do WhatsApp antes de enviar pedidos.');
            return;
        }

        const serviceNames = {
            'dine-in': 'Consumo no local',
            pickup: 'Retirada no restaurante',
            delivery: 'Entrega',
        };
        const lines = [
            'Olá! Gostaria de confirmar este pedido da La Bella Trattoria:',
            '',
            `Nome: ${nameInput.value.trim()}`,
            `Atendimento: ${serviceNames[serviceSelect.value]}`,
            `Pagamento solicitado: ${paymentSelect.value}`,
        ];

        if (serviceSelect.value === 'delivery') {
            lines.push(
                `Endereço: ${addressInput.value.trim()}`,
                `Referência: ${form.elements.reference.value.trim() || 'Não informada'}`,
                `Taxa de entrega ilustrativa: ${formatPrice(demoConfig.deliveryFee)} (confirmar valor real)`,
                `Prazo ilustrativo: ${demoConfig.deliveryMinutes}`
            );
        } else if (serviceSelect.value === 'pickup') {
            lines.push(`Prazo de retirada ilustrativo: ${demoConfig.pickupMinutes}`);
        }

        lines.push('', 'Itens:');
        cart.forEach((item) => {
            const product = products.get(item.productId);
            const chosenSize = sizeLabel(item);
            lines.push(
                `- ${item.quantity} × ${product.name}${chosenSize ? `, ${chosenSize}` : ''} (${formatPrice(unitPrice(item) * item.quantity)})`
            );
            item.removed.forEach((ingredient) => lines.push(`  Sem ${ingredient}`));
            item.extras.forEach((ingredient) =>
                lines.push(`  Acréscimo solicitado: ${ingredient}, valor a confirmar`)
            );
            if (item.notes) lines.push(`  Observação: ${item.notes}`);
        });

        const subtotal = cart.reduce((total, item) => total + unitPrice(item) * item.quantity, 0);
        lines.push('', `Subtotal dos pratos: ${formatPrice(subtotal)}`);
        if (serviceSelect.value === 'delivery') {
            lines.push(`Total estimado ilustrativo: ${formatPrice(subtotal + demoConfig.deliveryFee)}`);
        }
        lines.push('Confirmar valor de acréscimos e entrega antes do preparo.');
        if (orderNotes.value.trim()) lines.push(`Observação do pedido: ${orderNotes.value.trim()}`);
        lines.push('', 'Aguardo a confirmação do restaurante.');

        const whatsappUrl = `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(lines.join('\n'))}`;
        const whatsappWindow = window.open(whatsappUrl, '_blank');
        if (whatsappWindow) {
            whatsappWindow.opener = null;
            setDialogFeedback('Mensagem pronta. Revise e envie no WhatsApp para confirmar o pedido.');
        } else {
            const fallbackLink = element('a', 'whatsapp-fallback', 'Abrir mensagem do pedido');
            fallbackLink.href = whatsappUrl;
            fallbackLink.target = '_blank';
            fallbackLink.rel = 'noopener noreferrer';
            orderDialogFeedback.replaceChildren(
                document.createTextNode('O navegador bloqueou a nova janela. '),
                fallbackLink
            );
        }
    });

    orderDialogContent.append(form);
};

document.addEventListener('app:localechange', () => {
    window.menuOrderApi.refreshCatalog();
    if (!orderDialog.open) return;
    if (orderDialog.classList.contains('is-checkout')) renderCheckout();
    else if (cart.length) renderCart();
});

openCartButton.addEventListener('click', () => renderCart());
closeOrderDialogButton.addEventListener('click', () => orderDialog.close());
orderDialog.addEventListener('keydown', (event) => {
    if (event.key === 'Escape') orderDialog.close();
});
orderDialog.addEventListener('click', (event) => {
    if (event.target === orderDialog) orderDialog.close();
});

updateCartCount();
