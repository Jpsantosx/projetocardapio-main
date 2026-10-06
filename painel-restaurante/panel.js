(() => {
    "use strict";

    const profileStorageKey = "la-bella-trattoria-profile-demo-v1";
    const demoStorageKey = "la-bella-trattoria-local-demo-v1";
    const timeSlots = ["18:00", "18:30", "19:00", "19:30", "20:00", "20:30", "21:00", "21:30"];
    const shortCodePattern = /^[A-HJ-NP-Z2-9]{6}$/;
    const shortCodeAlphabet = "ABCDEFGHJKLMNPQRSTUVWXYZ23456789";
    const orderStatuses = {
        received: "Aguardando envio",
        sent: "Enviado",
        preparing: "Em produção",
        completed: "Concluído"
    };
    const defaultProfile = {
        name: "La Bella Trattoria",
        address: "Rua Itália, 120, Centro, São Paulo - SP",
        hours: "Terça a domingo, das 18h às 23h",
        payments: "Pix, dinheiro e cartões (exemplo)",
        delivery: "Raio ilustrativo de 5 km. Taxa de exemplo: R$ 8",
        pickup: "Prazo ilustrativo de 20 a 30 minutos",
        contact: "@labellatrattoria38 (demonstrativo)",
        openDays: [0, 2, 3, 4, 5, 6],
        capacityByTime: Object.fromEntries(timeSlots.map((time) => [time, 20]))
    };

    const profileContainer = document.querySelector("#restaurant-profile");
    const profileForm = document.querySelector("#restaurant-profile-form");
    const profileFeedback = document.querySelector("#profile-feedback");
    const capacityFields = document.querySelector("#capacity-fields");
    const reservationsList = document.querySelector("#reservations-list");
    const ordersList = document.querySelector("#orders-list");
    const orderFilters = document.querySelector("#order-filters");
    const orderSearch = document.querySelector("#order-search");
    let profile = readProfile();
    let activeOrderFilter = "all";

    function cloneDefaults() {
        return {
            ...defaultProfile,
            openDays: [...defaultProfile.openDays],
            capacityByTime: { ...defaultProfile.capacityByTime }
        };
    }

    function cleanProfile(value) {
        const clean = cloneDefaults();
        if (!value || typeof value !== "object") return clean;

        for (const key of ["name", "address", "hours", "payments", "delivery", "pickup", "contact"]) {
            if (typeof value[key] === "string") clean[key] = value[key].slice(0, 180);
        }
        if (Array.isArray(value.openDays)) {
            clean.openDays = [...new Set(value.openDays.map(Number).filter((day) => Number.isInteger(day) && day >= 0 && day <= 6))];
        }
        if (value.capacityByTime && typeof value.capacityByTime === "object") {
            for (const time of timeSlots) {
                const seats = Number(value.capacityByTime[time]);
                if (Number.isInteger(seats) && seats >= 0 && seats <= 200) clean.capacityByTime[time] = seats;
            }
        }
        return clean;
    }

    function readProfile() {
        try {
            const raw = localStorage.getItem(profileStorageKey);
            return raw ? cleanProfile(JSON.parse(raw)) : cloneDefaults();
        } catch {
            showProfileFeedback("Não foi possível ler as informações salvas neste navegador.", true);
            return cloneDefaults();
        }
    }

    function showProfileFeedback(message, isError) {
        profileFeedback.textContent = message;
        profileFeedback.classList.toggle("storage-error", Boolean(isError));
    }

    function addProfileItem(title, value) {
        const item = document.createElement("article");
        item.className = "profile-item";
        const heading = document.createElement("h3");
        heading.textContent = title;
        const content = document.createElement("p");
        content.textContent = value || "Não informado";
        item.append(heading, content);
        profileContainer.append(item);
    }

    function renderProfile() {
        profileContainer.replaceChildren();
        addProfileItem("Estabelecimento", profile.name);
        addProfileItem("Endereço", profile.address);
        addProfileItem("Horário de funcionamento", profile.hours);
        addProfileItem("Formas de pagamento", profile.payments);
        addProfileItem("Entrega", profile.delivery);
        addProfileItem("Retirada", profile.pickup);
        addProfileItem("Contato", profile.contact);
    }

    function renderProfileForm() {
        for (const key of ["name", "address", "hours", "payments", "delivery", "pickup", "contact"]) {
            profileForm.elements.namedItem(key).value = profile[key];
        }
        profileForm.querySelectorAll('input[name="openDays"]').forEach((input) => {
            input.checked = profile.openDays.includes(Number(input.value));
        });
        capacityFields.replaceChildren();
        for (const time of timeSlots) {
            const label = document.createElement("label");
            label.append(document.createTextNode(`${time} · lugares`));
            const input = document.createElement("input");
            input.type = "number";
            input.name = `capacity-${time}`;
            input.min = "0";
            input.max = "200";
            input.step = "1";
            input.required = true;
            input.value = String(profile.capacityByTime[time]);
            input.setAttribute("aria-label", `Capacidade total às ${time}`);
            label.append(input);
            capacityFields.append(label);
        }
    }

    function readDemoReservations() {
        let stored;
        try {
            stored = localStorage.getItem(demoStorageKey);
            if (!stored) return { orders: [], reservations: [] };
            const data = JSON.parse(stored);
            if (!data || typeof data !== "object"
                || (data.reservations !== undefined && !Array.isArray(data.reservations))
                || (data.orders !== undefined && !Array.isArray(data.orders))) {
                throw new Error("Formato de pedidos ou reservas inválido.");
            }

            const usedCodes = new Set();
            let changed = false;
            const nextCode = () => {
                for (let attempt = 0; attempt < 100; attempt += 1) {
                    const bytes = new Uint8Array(6);
                    if (globalThis.crypto?.getRandomValues) globalThis.crypto.getRandomValues(bytes);
                    else bytes.forEach((_, index) => { bytes[index] = Math.floor(Math.random() * 256); });
                    const code = [...bytes].map((byte) => shortCodeAlphabet[byte % shortCodeAlphabet.length]).join("");
                    if (!usedCodes.has(code)) return code;
                }
                throw new Error("Não foi possível criar um código único para a demonstração.");
            };

            data.orders = (data.orders || []).filter((order) =>
                order && typeof order === "object" && typeof order.id === "string");
            data.reservations = data.reservations || [];
            data.orders.forEach((order) => {
                if (typeof order.id !== "string" || !shortCodePattern.test(order.id) || usedCodes.has(order.id)) {
                    order.id = nextCode();
                    changed = true;
                }
                usedCodes.add(order.id);
                if (!Object.hasOwn(orderStatuses, order.status)) {
                    order.status = order.status === "ready" ? "completed" : "received";
                    changed = true;
                } else if (order.status === "ready") {
                    order.status = "completed";
                    changed = true;
                }
                if (!Array.isArray(order.items)) {
                    order.items = [];
                    changed = true;
                }
                order.items = order.items.filter((item) => item && typeof item === "object").slice(0, 30).map((item) => ({
                    name: typeof item.name === "string" ? item.name.slice(0, 100) : "Item demonstrativo",
                    quantity: Math.max(1, Math.min(99, Number(item.quantity) || 1)),
                    size: typeof item.size === "string" ? item.size.slice(0, 60) : "",
                    unitPrice: Number.isFinite(Number(item.unitPrice)) ? Math.max(0, Number(item.unitPrice)) : 0,
                    removed: Array.isArray(item.removed) ? item.removed.filter((value) => typeof value === "string").slice(0, 20) : [],
                    extras: Array.isArray(item.extras) ? item.extras.filter((value) => typeof value === "string").slice(0, 20) : [],
                    notes: typeof item.notes === "string" ? item.notes.slice(0, 240) : ""
                }));
                if (typeof order.createdAt !== "string" || !Number.isFinite(Date.parse(order.createdAt))) {
                    order.createdAt = "";
                }
                const total = Number(order.total);
                order.total = Number.isFinite(total) && total >= 0 ? total : 0;
            });
            data.reservations.forEach((reservation) => {
                if (!reservation || typeof reservation !== "object") return;
                if (typeof reservation.code !== "string"
                    || !shortCodePattern.test(reservation.code)
                    || usedCodes.has(reservation.code)) {
                    reservation.code = nextCode();
                    changed = true;
                }
                usedCodes.add(reservation.code);
                if (Object.prototype.hasOwnProperty.call(reservation, "name")) {
                    delete reservation.name;
                    changed = true;
                }
            });
            if (changed) localStorage.setItem(demoStorageKey, JSON.stringify(data));
            return data;
        } catch {
            throw new Error("Não foi possível ler ou atualizar pedidos e reservas neste navegador.");
        }
    }

    function formatReservationDate(date) {
        const parsed = new Date(`${date}T12:00:00`);
        return Number.isNaN(parsed.getTime())
            ? date
            : new Intl.DateTimeFormat("pt-BR", { dateStyle: "long" }).format(parsed);
    }

    function activeReservation(reservation) {
        return !["cancelled", "declined"].includes(reservation.status);
    }

    function reservationStatus(reservation) {
        if (reservation.status === "cancelled" || reservation.status === "declined") return "Cancelada";
        if (reservation.status === "confirmed") return "Confirmada";
        return "Ativa (registro anterior)";
    }

    function formatOrderDate(value) {
        if (!value) return "Data não registrada";
        const date = new Date(value);
        return Number.isNaN(date.getTime())
            ? "Data não registrada"
            : new Intl.DateTimeFormat("pt-BR", { dateStyle: "short", timeStyle: "short" }).format(date);
    }

    function formatMoney(value) {
        return new Intl.NumberFormat("pt-BR", { style: "currency", currency: "BRL" }).format(value);
    }

    function createOrderItem(item) {
        const line = document.createElement("li");
        const name = `${item.quantity} × ${item.name}${item.size ? `, ${item.size}` : ""}`;
        const parts = [name];
        if (item.removed.length) parts.push(`Sem: ${item.removed.join(", ")}`);
        if (item.extras.length) parts.push(`Acréscimos solicitados: ${item.extras.join(", ")}`);
        if (item.notes) parts.push(`Observação: ${item.notes}`);
        line.textContent = parts.join(". ");
        return line;
    }

    function setOrderCounts(orders) {
        for (const status of Object.keys(orderStatuses)) {
            const count = orders.filter((order) => order.status === status).length;
            document.querySelector(`#orders-count-${status}`).textContent = String(count);
        }
    }

    function renderOrders() {
        let data;
        try {
            data = readDemoReservations();
        } catch (error) {
            const message = document.createElement("p");
            message.className = "storage-error";
            message.textContent = error.message;
            ordersList.replaceChildren(message);
            return;
        }

        const orders = data.orders.slice().sort((first, second) =>
            (Date.parse(second.createdAt) || 0) - (Date.parse(first.createdAt) || 0));
        setOrderCounts(orders);
        const query = orderSearch.value.trim().toUpperCase();
        const visibleOrders = orders.filter((order) =>
            (activeOrderFilter === "all" || order.status === activeOrderFilter)
            && (!query || order.id.includes(query)));

        if (!orders.length) {
            const empty = document.createElement("div");
            empty.className = "empty-state orders-empty";
            const message = document.createElement("p");
            message.textContent = "Ainda não há pedidos demonstrativos neste navegador.";
            const link = document.createElement("a");
            link.href = "../cardapio/#Demonstracoes";
            link.textContent = "Abrir o cardápio para registrar um pedido de teste";
            empty.append(message, link);
            ordersList.replaceChildren(empty);
            return;
        }
        if (!visibleOrders.length) {
            const empty = document.createElement("p");
            empty.className = "empty-state";
            empty.textContent = "Nenhum pedido corresponde a este filtro.";
            ordersList.replaceChildren(empty);
            return;
        }

        const fragment = document.createDocumentFragment();
        for (const order of visibleOrders) {
            const article = document.createElement("article");
            article.className = "order-row";
            const content = document.createElement("div");
            content.className = "order-main";
            const heading = document.createElement("div");
            heading.className = "order-card-heading";
            const code = document.createElement("h3");
            code.textContent = `Pedido ${order.id}`;
            const status = document.createElement("span");
            status.className = `order-status status-${order.status}`;
            status.textContent = orderStatuses[order.status];
            heading.append(code, status);
            const metadata = document.createElement("p");
            const itemCount = order.items.reduce((sum, item) => sum + item.quantity, 0);
            metadata.textContent = `${formatOrderDate(order.createdAt)} · ${itemCount} ${itemCount === 1 ? "item" : "itens"} · ${formatMoney(order.total)}`;
            content.append(heading, metadata);

            const details = document.createElement("details");
            details.className = "order-items";
            const summary = document.createElement("summary");
            summary.textContent = "Ver itens";
            const list = document.createElement("ul");
            if (order.items.length) {
                order.items.forEach((item) => list.append(createOrderItem(item)));
            } else {
                const legacyItem = document.createElement("li");
                legacyItem.textContent = "Pedido de teste antigo sem itens associados.";
                list.append(legacyItem);
            }
            details.append(summary, list);
            content.append(details);

            const controls = document.createElement("label");
            controls.className = "order-status-control";
            controls.append(document.createTextNode("Atualizar etapa"));
            const select = document.createElement("select");
            select.dataset.orderId = order.id;
            select.setAttribute("aria-label", `Atualizar etapa do pedido ${order.id}`);
            for (const [value, label] of Object.entries(orderStatuses)) {
                const option = document.createElement("option");
                option.value = value;
                option.textContent = label;
                option.selected = order.status === value;
                select.append(option);
            }
            controls.append(select);
            article.append(content, controls);
            fragment.append(article);
        }
        ordersList.replaceChildren(fragment);
    }

    function updateOrderStatus(orderId, status) {
        try {
            if (!Object.hasOwn(orderStatuses, status)) throw new Error("Etapa de pedido inválida.");
            const data = readDemoReservations();
            const order = data.orders.find((item) => item.id === orderId);
            if (!order) throw new Error("Esse pedido não foi encontrado no armazenamento deste navegador.");
            order.status = status;
            localStorage.setItem(demoStorageKey, JSON.stringify(data));
            renderOrders();
        } catch (error) {
            const message = document.createElement("p");
            message.className = "storage-error";
            message.textContent = error.message || "Não foi possível atualizar a etapa do pedido.";
            ordersList.prepend(message);
        }
    }

    function renderReservations() {
        let data;
        try {
            data = readDemoReservations();
        } catch (error) {
            const message = document.createElement("p");
            message.className = "storage-error";
            message.textContent = error.message;
            reservationsList.replaceChildren(message);
            return;
        }

        const reservations = data.reservations
            .filter((reservation) => reservation && typeof reservation === "object")
            .sort((first, second) => `${first.date || ""}${first.time || ""}`.localeCompare(`${second.date || ""}${second.time || ""}`));
        if (reservations.length === 0) {
            const empty = document.createElement("p");
            empty.className = "empty-state";
            empty.textContent = "Ainda não há reservas neste navegador.";
            reservationsList.replaceChildren(empty);
            return;
        }

        const fragment = document.createDocumentFragment();
        for (const reservation of reservations) {
            const row = document.createElement("article");
            row.className = "reservation-row";
            const details = document.createElement("div");
            details.className = "reservation-details";
            const title = document.createElement("strong");
            title.textContent = `${formatReservationDate(reservation.date || "")} às ${reservation.time || "horário não informado"}`;
            const description = document.createElement("span");
            const guests = Number(reservation.guests) || 0;
            description.textContent = `${reservation.code || "Sem código"} · ${guests} ${guests === 1 ? "pessoa" : "pessoas"} · ${reservationStatus(reservation)}`;
            details.append(title, description);
            row.append(details);

            if (activeReservation(reservation) && reservation.id) {
                const cancelButton = document.createElement("button");
                cancelButton.className = "secondary-button";
                cancelButton.type = "button";
                cancelButton.dataset.cancelReservation = String(reservation.id);
                cancelButton.textContent = "Cancelar reserva";
                row.append(cancelButton);
            }
            fragment.append(row);
        }
        reservationsList.replaceChildren(fragment);
    }

    function saveProfile(nextProfile) {
        try {
            localStorage.setItem(profileStorageKey, JSON.stringify(nextProfile));
            profile = nextProfile;
            renderProfile();
            showProfileFeedback("Informações salvas neste navegador.");
        } catch {
            showProfileFeedback("Não foi possível salvar. O armazenamento local pode estar indisponível ou cheio.", true);
        }
    }

    function cancelReservation(reservationId) {
        try {
            const data = readDemoReservations();
            const reservation = data.reservations.find((item) => item && String(item.id) === reservationId);
            if (!reservation) {
                renderReservations();
                return;
            }
            if (!activeReservation(reservation)) return;
            reservation.status = "cancelled";
            localStorage.setItem(demoStorageKey, JSON.stringify(data));
            renderReservations();
        } catch (error) {
            const message = document.createElement("p");
            message.className = "storage-error";
            message.textContent = error.message || "Não foi possível cancelar a reserva.";
            reservationsList.prepend(message);
        }
    }

    profileForm.addEventListener("submit", (event) => {
        event.preventDefault();
        if (!profileForm.reportValidity()) return;

        const formData = new FormData(profileForm);
        const nextProfile = {
            name: String(formData.get("name") || "").trim(),
            address: String(formData.get("address") || "").trim(),
            hours: String(formData.get("hours") || "").trim(),
            payments: String(formData.get("payments") || "").trim(),
            delivery: String(formData.get("delivery") || "").trim(),
            pickup: String(formData.get("pickup") || "").trim(),
            contact: String(formData.get("contact") || "").trim(),
            openDays: formData.getAll("openDays").map(Number),
            capacityByTime: Object.fromEntries(timeSlots.map((time) => [time, Number(formData.get(`capacity-${time}`))]))
        };
        saveProfile(cleanProfile(nextProfile));
    });

    document.querySelector("#reset-profile").addEventListener("click", () => {
        saveProfile(cloneDefaults());
        renderProfileForm();
    });

    document.querySelector("#refresh-reservations").addEventListener("click", renderReservations);
    document.querySelector("#refresh-orders").addEventListener("click", () => {
        renderOrders();
        renderReservations();
    });
    orderSearch.addEventListener("input", renderOrders);
    orderFilters.addEventListener("click", (event) => {
        const button = event.target.closest("[data-order-filter]");
        if (!button) return;
        activeOrderFilter = button.dataset.orderFilter;
        orderFilters.querySelectorAll("[data-order-filter]").forEach((filter) => {
            filter.setAttribute("aria-pressed", String(filter === button));
        });
        renderOrders();
    });
    ordersList.addEventListener("change", (event) => {
        const select = event.target.closest("select[data-order-id]");
        if (select) updateOrderStatus(select.dataset.orderId, select.value);
    });
    reservationsList.addEventListener("click", (event) => {
        const button = event.target.closest("[data-cancel-reservation]");
        if (button) cancelReservation(button.dataset.cancelReservation);
    });

    window.addEventListener("storage", (event) => {
        if (event.key === demoStorageKey) {
            renderOrders();
            renderReservations();
        }
        if (event.key === profileStorageKey) {
            profile = readProfile();
            renderProfile();
            renderProfileForm();
        }
    });

    renderProfile();
    renderProfileForm();
    renderOrders();
    renderReservations();
})();
