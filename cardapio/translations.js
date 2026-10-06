const localeCodes = ['pt-BR', 'en', 'fr', 'it', 'es', 'zh-CN', 'ja', 'de'];
const localeRows = [
    ['Idioma', 'Language', 'Langue', 'Lingua', 'Idioma', '语言', '言語', 'Sprache'],
    ['Personalize seu prato', 'Customize your dish', 'Personnalisez votre plat', 'Personalizza il piatto', 'Personaliza tu plato', '自定义菜品', '料理をカスタマイズ', 'Gericht anpassen'],
    ['Ingredientes para retirar', 'Ingredients to remove', 'Ingrédients à retirer', 'Ingredienti da rimuovere', 'Ingredientes para quitar', '要去掉的食材', '抜く食材', 'Zutaten entfernen'],
    ['Acréscimos sugeridos', 'Suggested add-ons', 'Suppléments suggérés', 'Aggiunte suggerite', 'Extras sugeridos', '推荐加料', 'おすすめの追加', 'Vorgeschlagene Extras'],
    ['Diminuir quantidade de', 'Decrease quantity of', 'Diminuer la quantité de', 'Riduci la quantità di', 'Reducir cantidad de', '减少数量', '数量を減らす', 'Menge verringern:'],
    ['Aumentar quantidade de', 'Increase quantity of', 'Augmenter la quantité de', 'Aumenta la quantità di', 'Aumentar cantidad de', '增加数量', '数量を増やす', 'Menge erhöhen:'],
    ['Dividir a conta (simulação)', 'Split the bill (demo)', 'Partager l’addition (simulation)', 'Dividi il conto (simulazione)', 'Dividir la cuenta (simulación)', '分账（演示）', '割り勘（デモ）', 'Rechnung teilen (Demo)'],
    ['A divisão considera somente o subtotal dos pratos; extras e entrega ficam de fora. Nenhum pagamento é processado.', 'The split covers only the dish subtotal; add-ons and delivery are excluded. No payment is processed.', 'Le partage porte uniquement sur le sous-total des plats ; les suppléments et la livraison sont exclus. Aucun paiement n’est effectué.', 'La divisione considera solo il subtotale dei piatti; extra e consegna sono esclusi. Nessun pagamento viene elaborato.', 'El reparto solo incluye el subtotal de los platos; extras y entrega quedan excluidos. No se procesa ningún pago.', '分账仅计算菜品小计，不含加料和配送费。不会处理付款。', '分割の対象は料理の小計のみです。追加料金と配達料は含まれず、支払いは処理されません。', 'Die Aufteilung umfasst nur die Zwischensumme der Gerichte; Extras und Lieferung sind ausgeschlossen. Es wird keine Zahlung verarbeitet.'],
    ['Forma de divisão', 'Split method', 'Mode de partage', 'Metodo di divisione', 'Forma de división', '分账方式', '分け方', 'Aufteilungsmethode'],
    ['Dividir igualmente', 'Split equally', 'Partager à parts égales', 'Dividi in parti uguali', 'Dividir por igual', '平均分配', '均等に分ける', 'Gleichmäßig teilen'],
    ['Atribuir itens por pessoa', 'Assign items per person', 'Attribuer les articles par personne', 'Assegna gli articoli per persona', 'Asignar artículos por persona', '按人分配菜品', '品目を人ごとに割り当てる', 'Artikel pro Person zuordnen'],
    ['Como dividir', 'How to split', 'Comment partager', 'Come dividere', 'Cómo dividir', '如何分账', '分け方', 'So wird geteilt'],
    ['Número de pessoas', 'Number of people', 'Nombre de personnes', 'Numero di persone', 'Número de personas', '人数', '人数', 'Personenzahl'],
    ['quantidade', 'quantity', 'quantité', 'quantità', 'cantidad', '数量', '数量', 'Menge'],
    ['Pessoa', 'Person', 'Personne', 'Persona', 'Persona', '人', '人', 'Person'],
    ['Informe de 2 a 12 pessoas.', 'Enter 2 to 12 people.', 'Indiquez de 2 à 12 personnes.', 'Inserisci da 2 a 12 persone.', 'Indica de 2 a 12 personas.', '请输入 2 至 12 人。', '2〜12人で入力してください。', 'Gib 2 bis 12 Personen ein.'],
    ['As quantidades atribuídas devem somar a quantidade de cada item.', 'Assigned quantities must add up to the quantity of each item.', 'Les quantités attribuées doivent correspondre à la quantité de chaque article.', 'Le quantità assegnate devono corrispondere alla quantità di ogni articolo.', 'Las cantidades asignadas deben sumar la cantidad de cada artículo.', '分配数量必须等于每个菜品的数量。', '割り当てた数量は各品目の数量と一致する必要があります。', 'Die zugewiesenen Mengen müssen der Anzahl jedes Artikels entsprechen.'],
    ['Total dividido', 'Total split', 'Total partagé', 'Totale diviso', 'Total dividido', '分账总额', '分割合計', 'Geteilter Gesamtbetrag'],
    ['Valores demonstrativos; não são cobranças.', 'Demo amounts; no charges are made.', 'Montants indicatifs ; aucun paiement ne sera prélevé.', 'Importi dimostrativi; non verrà effettuato alcun addebito.', 'Importes demostrativos; no se realizan cargos.', '示例金额，不会收费。', 'デモ金額です。請求は発生しません。', 'Demo-Beträge; es werden keine Zahlungen abgebucht.'],
    ['Calcular divisão', 'Calculate split', 'Calculer le partage', 'Calcola divisione', 'Calcular división', '计算分账', '分割を計算', 'Aufteilung berechnen'],
    ['Divisão ilustrativa salva', 'Illustrative split saved', 'Partage indicatif enregistré', 'Divisione illustrativa salvata', 'División ilustrativa guardada', '示例分账已保存', 'デモの分割を保存しました', 'Beispielaufteilung gespeichert'],
    ['Detalhes demonstrativos', 'Demo details', 'Détails de démonstration', 'Dettagli dimostrativi', 'Detalles demostrativos', '演示详情', 'デモの詳細', 'Demo-Details'],
    ['Porção demonstrativa', 'Demo serving', 'Portion indicative', 'Porzione dimostrativa', 'Porción demostrativa', '示例份量', '目安の量', 'Beispielportion'],
    ['Picância demonstrativa', 'Demo spice level', 'Niveau de piquant indicatif', 'Livello di piccantezza dimostrativo', 'Nivel de picante demostrativo', '示例辣度', '辛さの目安', 'Beispiel-Schärfegrad'],
    ['Opção sem álcool demonstrativa', 'Demo non-alcoholic option', 'Option sans alcool indicative', 'Opzione analcolica dimostrativa', 'Opción sin alcohol demostrativa', '示例无酒精选项', 'ノンアルコールの目安', 'Beispiel für alkoholfreie Option'],
    ['Ingredientes de exemplo, não verificados', 'Example ingredients, unverified', 'Ingrédients indicatifs, non vérifiés', 'Ingredienti di esempio, non verificati', 'Ingredientes de ejemplo, no verificados', '示例食材，未经核实', '食材の例（未確認）', 'Beispielzutaten, nicht geprüft'],
    ['Exemplos não confirmados pelo restaurante. Não use para avaliar alergias ou segurança alimentar.', 'Examples not confirmed by the restaurant. Do not use to assess allergies or food safety.', 'Exemples non confirmés par le restaurant. Ne les utilisez pas pour évaluer les allergies ou la sécurité alimentaire.', 'Esempi non confermati dal ristorante. Non usarli per valutare allergie o sicurezza alimentare.', 'Ejemplos no confirmados por el restaurante. No los uses para evaluar alergias ni seguridad alimentaria.', '餐厅尚未确认这些示例。请勿据此判断过敏或食品安全。', 'レストラン未確認の例です。アレルギーや食品安全の判断に使用しないでください。', 'Beispiele, nicht vom Restaurant bestätigt. Nicht zur Beurteilung von Allergien oder Lebensmittelsicherheit verwenden.'],
    ['Lista de espera demonstrativa', 'Demo waitlist', 'Liste d’attente de démonstration', 'Lista d’attesa dimostrativa', 'Lista de espera demostrativa', '演示等候名单', 'デモの待ちリスト', 'Demo-Warteliste'],
    ['Simule sua posição sem informar nome ou contato. Não envia aviso nem reserva uma mesa.', 'Simulate your position without a name or contact details. No notification is sent and no table is reserved.', 'Simulez votre position sans nom ni coordonnées. Aucune notification ni réservation ne sera envoyée.', 'Simula la posizione senza nome o contatto. Non viene inviata alcuna notifica né prenotato un tavolo.', 'Simula tu posición sin nombre ni contacto. No se envían avisos ni se reserva mesa.', '无需姓名或联系方式即可模拟排队位置。不发送通知，也不预订餐桌。', '名前や連絡先なしで順番をシミュレーションします。通知や席の予約は行いません。', 'Simuliere deine Position ohne Namen oder Kontaktdaten. Es wird keine Nachricht gesendet und kein Tisch reserviert.'],
    ['Tamanho do grupo', 'Group size', 'Taille du groupe', 'Dimensione del gruppo', 'Tamaño del grupo', '人数', 'グループ人数', 'Gruppengröße'],
    ['Entrar na fila de teste', 'Join demo waitlist', 'Rejoindre la file de démonstration', 'Entra nella lista di prova', 'Entrar en la lista de prueba', '加入演示等候队列', 'デモの待ちリストに登録', 'Demo-Warteliste beitreten'],
    ['A fila demonstrativa está vazia.', 'The demo waitlist is empty.', 'La file d’attente de démonstration est vide.', 'La lista d’attesa dimostrativa è vuota.', 'La lista de espera demostrativa está vacía.', '演示等候队列为空。', 'デモの待ちリストは空です。', 'Die Demo-Warteliste ist leer.'],
    ['Remover da fila de teste', 'Remove from demo waitlist', 'Retirer de la file de démonstration', 'Rimuovi dalla lista di prova', 'Quitar de la lista de prueba', '从演示队列移除', 'デモの待ちリストから削除', 'Aus der Demo-Warteliste entfernen'],
    ['Grupo de {count} pessoa(s), posição simulada {position}.', 'Group of {count}, simulated position {position}.', 'Groupe de {count} personne(s), position simulée {position}.', 'Gruppo di {count} persona/e, posizione simulata {position}.', 'Grupo de {count} persona(s), posición simulada {position}.', '{count}人组，模拟位置{position}。', '{count}人グループ、シミュレーション上の順番は{position}番です。', 'Gruppe mit {count} Person(en), simulierte Position {position}.'],
    ['Selecione um grupo de 1 a 6 pessoas para a demonstração.', 'Select a group of 1 to 6 people for the demo.', 'Sélectionnez un groupe de 1 à 6 personnes pour la démonstration.', 'Seleziona un gruppo da 1 a 6 persone per la dimostrazione.', 'Selecciona un grupo de 1 a 6 personas para la demostración.', '请选择1至6人的演示队伍。', 'デモ用に1〜6人のグループを選んでください。', 'Wähle für die Demo eine Gruppe von 1 bis 6 Personen.'],
    ['Posição simulada: {position}. Espera ilustrativa: {minutes} minutos. Esta fila é local, não envia aviso e não reserva mesa.', 'Simulated position: {position}. Illustrative wait: {minutes} minutes. This local queue sends no notice and reserves no table.', 'Position simulée : {position}. Attente indicative : {minutes} minutes. Cette file locale n’envoie aucune notification et ne réserve aucune table.', 'Posizione simulata: {position}. Attesa indicativa: {minutes} minuti. Questa lista locale non invia notifiche e non prenota tavoli.', 'Posición simulada: {position}. Espera ilustrativa: {minutes} minutos. Esta lista local no envía avisos ni reserva mesa.', '模拟位置：{position}。预计等待：{minutes}分钟。此本地队列不会发送通知或预订餐桌。', 'シミュレーション上の順番：{position}番。目安の待ち時間：{minutes}分。このローカルの待ちリストは通知や席の予約を行いません。', 'Simulierte Position: {position}. Beispielwartezeit: {minutes} Minuten. Diese lokale Warteliste sendet keine Nachricht und reserviert keinen Tisch.'],
    ['Não foi possível salvar a fila neste navegador. Nenhuma mesa foi reservada.', 'The queue could not be saved in this browser. No table was reserved.', 'Impossible d’enregistrer la file dans ce navigateur. Aucune table n’a été réservée.', 'Impossibile salvare la lista in questo browser. Nessun tavolo è stato prenotato.', 'No se pudo guardar la lista en este navegador. No se reservó ninguna mesa.', '无法在此浏览器保存队列。未预订任何餐桌。', 'このブラウザーに待ちリストを保存できませんでした。席は予約されていません。', 'Die Warteliste konnte in diesem Browser nicht gespeichert werden. Es wurde kein Tisch reserviert.'],
    ['Sem alterações', 'No changes', 'Aucune modification', 'Nessuna modifica', 'Sin cambios', '无更改', '変更なし', 'Keine Änderungen'],
    ['Seu pedido está vazio', 'Your order is empty', 'Votre commande est vide', 'Il tuo ordine è vuoto', 'Tu pedido está vacío', '购物车为空', '注文は空です', 'Deine Bestellung ist leer'],
    ['Escolha um prato e ajuste ingredientes, quantidade e observações.', 'Choose a dish and adjust ingredients, quantity and notes.', 'Choisissez un plat et ajustez les ingrédients, la quantité et les notes.', 'Scegli un piatto e modifica ingredienti, quantità e note.', 'Elige un plato y ajusta ingredientes, cantidad y notas.', '选择菜品并调整食材、数量和备注。', '料理を選び、食材・数量・メモを調整してください。', 'Wähle ein Gericht und passe Zutaten, Menge und Hinweise an.'],
    ['Voltar ao cardápio', 'Back to menu', 'Retour au menu', 'Torna al menu', 'Volver al menú', '返回菜单', 'メニューに戻る', 'Zurück zum Menü'],
    ['Confira os itens', 'Review your items', 'Vérifiez vos articles', 'Controlla gli articoli', 'Revisa los artículos', '确认菜品', '注文内容を確認', 'Artikel prüfen'],
    ['Subtotal dos pratos', 'Dish subtotal', 'Sous-total des plats', 'Subtotale dei piatti', 'Subtotal de los platos', '菜品小计', '料理の小計', 'Zwischensumme der Gerichte'],
    ['Continuar escolhendo', 'Continue browsing', 'Continuer à choisir', 'Continua a scegliere', 'Seguir eligiendo', '继续选购', '選び続ける', 'Weiter auswählen'],
    ['Informar entrega', 'Enter delivery details', 'Renseigner la livraison', 'Inserisci i dati di consegna', 'Indicar datos de entrega', '填写配送信息', '配送情報を入力', 'Lieferdetails eingeben'],
    ['Editar', 'Edit', 'Modifier', 'Modifica', 'Editar', '编辑', '編集', 'Bearbeiten'],
    ['Remover', 'Remove', 'Supprimer', 'Rimuovi', 'Quitar', '移除', '削除', 'Entfernen'],
    ['Tamanho', 'Size', 'Taille', 'Dimensione', 'Tamaño', '尺寸', 'サイズ', 'Größe'],
    ['Sem', 'Without', 'Sans', 'Senza', 'Sin', '不加', '抜き', 'Ohne'],
    ['Acréscimos a confirmar', 'Add-ons to confirm', 'Suppléments à confirmer', 'Aggiunte da confermare', 'Extras por confirmar', '待确认的加料', '要確認の追加', 'Zu bestätigende Extras'],
    ['Observação', 'Note', 'Remarque', 'Nota', 'Nota', '备注', 'メモ', 'Hinweis'],
    ['Seu pedido', 'Your order', 'Votre commande', 'Il tuo ordine', 'Tu pedido', '你的订单', 'ご注文', 'Deine Bestellung'],
    ['Confira os itens', 'Review your items', 'Vérifiez vos articles', 'Controlla gli articoli', 'Revisa los artículos', '确认菜品', '注文内容を確認', 'Artikel prüfen'],
    ['Esvaziar pedido', 'Clear order', 'Vider la commande', 'Svuota ordine', 'Vaciar pedido', '清空订单', '注文を空にする', 'Bestellung leeren'],
    ['Escolher ingredientes', 'Choose ingredients', 'Choisir les ingrédients', 'Scegli gli ingredienti', 'Elegir ingredientes', '选择食材', '食材を選ぶ', 'Zutaten auswählen'],
    ['Compartilhar', 'Share', 'Partager', 'Condividi', 'Compartir', '分享', '共有', 'Teilen'],
    ['Fechar', 'Close', 'Fermer', 'Chiudi', 'Cerrar', '关闭', '閉じる', 'Schließen'],
    ['Não há opções cadastradas para este prato.', 'No options are listed for this dish.', 'Aucune option n’est indiquée pour ce plat.', 'Non ci sono opzioni registrate per questo piatto.', 'No hay opciones registradas para este plato.', '此菜品暂无可选项。', 'この料理には選択肢が登録されていません。', 'Für dieses Gericht sind keine Optionen hinterlegt.'],
    ['por unidade', 'per item', 'par unité', 'per unità', 'por unidad', '每份', '1個あたり', 'pro Stück'],
    ['Tamanho (preços ilustrativos)', 'Size (sample prices)', 'Taille (prix indicatifs)', 'Formato (prezzi dimostrativi)', 'Tamaño (precios ilustrativos)', '尺寸（示例价格）', 'サイズ（価格は例）', 'Größe (Beispielpreise)'],
    ['Quantidade', 'Quantity', 'Quantité', 'Quantità', 'Cantidad', '数量', '数量', 'Menge'],
    ['Observações deste prato', 'Notes for this dish', 'Remarques sur ce plat', 'Note per questo piatto', 'Notas de este plato', '此菜品备注', 'この料理へのメモ', 'Hinweise zu diesem Gericht'],
    ['Ex.: ponto da carne, preferência de preparo…', 'E.g. doneness, preparation preference…', 'Ex. : cuisson, préférence de préparation…', 'Es.: cottura, preferenze di preparazione…', 'Ej.: punto de cocción, preferencia de preparación…', '例如：熟度、烹饪偏好…', '例：焼き加減、調理の希望…', 'Z. B. Garstufe, Zubereitungswunsch…'],
    ['Voltar ao cardápio', 'Back to menu', 'Retour au menu', 'Torna al menu', 'Volver al menú', '返回菜单', 'メニューに戻る', 'Zurück zum Menü'],
    ['Talvez também combine', 'You might also like', 'Vous aimerez peut-être aussi', 'Potrebbe piacerti anche', 'Quizás también te guste', '你可能也喜欢', 'こちらもおすすめ', 'Das könnte auch passen'],
    ['Sugestões individuais, sem preço de combo ou desconto.', 'Individual suggestions, with no bundle price or discount.', 'Suggestions individuelles, sans prix de formule ni réduction.', 'Suggerimenti singoli, senza prezzo combo o sconto.', 'Sugerencias individuales, sin precio de combo ni descuento.', '单品推荐，不含套餐价或折扣。', 'セット価格や割引のない単品のおすすめです。', 'Einzelne Empfehlungen, ohne Kombipreis oder Rabatt.'],
    ['A remoção de ingredientes não garante ausência de alergênicos ou contato cruzado na cozinha.', 'Removing ingredients does not guarantee the absence of allergens or kitchen cross-contact.', 'Retirer des ingrédients ne garantit pas l’absence d’allergènes ou de contamination croisée en cuisine.', 'Rimuovere ingredienti non garantisce l’assenza di allergeni o contaminazione crociata in cucina.', 'Quitar ingredientes no garantiza ausencia de alérgenos ni contacto cruzado en cocina.', '移除食材并不保证没有过敏原或厨房交叉接触。', '食材を抜いても、アレルゲンや調理場での交差接触がないとは限りません。', 'Das Entfernen von Zutaten garantiert keine Allergenfreiheit oder Kreuzkontamination in der Küche.'],
    ['Adicionar ao pedido', 'Add to order', 'Ajouter à la commande', 'Aggiungi all’ordine', 'Añadir al pedido', '加入订单', '注文に追加', 'Zur Bestellung hinzufügen'],
    ['Item adicionado ao pedido.', 'Item added to your order.', 'Article ajouté à votre commande.', 'Articolo aggiunto all’ordine.', 'Artículo añadido al pedido.', '已添加到订单。', '注文に追加しました。', 'Artikel zur Bestellung hinzugefügt.'],
    ['Personalização atualizada.', 'Customization updated.', 'Personnalisation mise à jour.', 'Personalizzazione aggiornata.', 'Personalización actualizada.', '自定义已更新。', 'カスタマイズを更新しました。', 'Anpassung aktualisiert.'],
    ['Item removido do pedido.', 'Item removed from your order.', 'Article retiré de votre commande.', 'Articolo rimosso dall’ordine.', 'Artículo eliminado del pedido.', '已从订单移除。', '注文から削除しました。', 'Artikel aus der Bestellung entfernt.'],
    ['Acréscimos e entrega não estão incluídos. A equipe confirma valores e disponibilidade pelo WhatsApp.', 'Add-ons and delivery are not included. The restaurant confirms prices and availability on WhatsApp.', 'Les suppléments et la livraison ne sont pas inclus. Le restaurant confirme les prix et la disponibilité sur WhatsApp.', 'Extra e consegna non sono inclusi. Il ristorante conferma prezzi e disponibilità su WhatsApp.', 'Los extras y el envío no están incluidos. El restaurante confirma precios y disponibilidad por WhatsApp.', '加料和配送费不包含在内。餐厅会通过 WhatsApp 确认价格和供应情况。', '追加料金と配達料は含まれません。価格と在庫はレストランがWhatsAppで確認します。', 'Extras und Lieferung sind nicht enthalten. Das Restaurant bestätigt Preise und Verfügbarkeit per WhatsApp.'],
    ['Como prefere receber?', 'How would you like to receive your order?', 'Comment souhaitez-vous recevoir votre commande ?', 'Come preferisci ricevere l’ordine?', '¿Cómo prefieres recibir tu pedido?', '你希望如何取餐？', '受け取り方法を選択してください', 'Wie möchtest du deine Bestellung erhalten?'],
    ['Finalizar pedido', 'Complete order', 'Finaliser la commande', 'Completa l’ordine', 'Finalizar pedido', '完成订单', '注文を確定', 'Bestellung abschließen'],
    ['Tipo de pedido', 'Order type', 'Type de commande', 'Tipo di ordine', 'Tipo de pedido', '订单类型', '注文方法', 'Bestellart'],
    ['Forma de pagamento (opções ilustrativas)', 'Payment method (sample options)', 'Mode de paiement (options indicatives)', 'Metodo di pagamento (opzioni dimostrative)', 'Forma de pago (opciones ilustrativas)', '付款方式（示例选项）', '支払い方法（例）', 'Zahlungsart (Beispieloptionen)'],
    ['Voltar ao pedido', 'Back to order', 'Retour à la commande', 'Torna all’ordine', 'Volver al pedido', '返回订单', '注文に戻る', 'Zur Bestellung zurück'],
    ['Abrir WhatsApp', 'Open WhatsApp', 'Ouvrir WhatsApp', 'Apri WhatsApp', 'Abrir WhatsApp', '打开 WhatsApp', 'WhatsAppを開く', 'WhatsApp öffnen'],
    ['Abrir mensagem do pedido', 'Open order message', 'Ouvrir le message de commande', 'Apri il messaggio dell’ordine', 'Abrir mensaje del pedido', '打开订单消息', '注文メッセージを開く', 'Bestellnachricht öffnen'],
    ['Seu nome', 'Your name', 'Votre nom', 'Il tuo nome', 'Tu nombre', '姓名', 'お名前', 'Dein Name'],
    ['Selecione uma opção', 'Select an option', 'Sélectionnez une option', 'Seleziona un’opzione', 'Selecciona una opción', '请选择一项', '選択してください', 'Bitte auswählen'],
    ['Consumir no local', 'Dine in', 'Sur place', 'Consumazione sul posto', 'Consumir en el restaurante', '堂食', '店内で食べる', 'Vor Ort essen'],
    ['Retirada no restaurante', 'Restaurant pickup', 'À emporter', 'Ritiro al ristorante', 'Recoger en el restaurante', '到店自取', '店頭受け取り', 'Abholung im Restaurant'],
    ['Entrega', 'Delivery', 'Livraison', 'Consegna', 'Entrega', '配送', '配達', 'Lieferung'],
    ['Combinar com o restaurante', 'Arrange with the restaurant', 'À convenir avec le restaurant', 'Da concordare con il ristorante', 'Acordar con el restaurante', '与餐厅协商', 'レストランに確認', 'Mit dem Restaurant abstimmen'],
    ['Pix (exemplo)', 'Pix (sample)', 'Pix (exemple)', 'Pix (esempio)', 'Pix (ejemplo)', 'Pix（示例）', 'Pix（例）', 'Pix (Beispiel)'],
    ['Dinheiro (exemplo)', 'Cash (sample)', 'Espèces (exemple)', 'Contanti (esempio)', 'Efectivo (ejemplo)', '现金（示例）', '現金（例）', 'Bargeld (Beispiel)'],
    ['Cartão de crédito (exemplo)', 'Credit card (sample)', 'Carte de crédit (exemple)', 'Carta di credito (esempio)', 'Tarjeta de crédito (ejemplo)', '信用卡（示例）', 'クレジットカード（例）', 'Kreditkarte (Beispiel)'],
    ['Cartão de débito (exemplo)', 'Debit card (sample)', 'Carte de débit (exemple)', 'Carta di debito (esempio)', 'Tarjeta de débito (ejemplo)', '借记卡（示例）', 'デビットカード（例）', 'Debitkarte (Beispiel)'],
    ['Demonstração: taxa de {fee}, raio de {radius} km e prazo de {minutes}. Consulte a equipe para confirmar a cobertura e o valor reais.', 'Sample: fee {fee}, radius {radius} km and estimated time {minutes}. Contact the restaurant to confirm actual coverage and cost.', 'Exemple : frais de {fee}, rayon de {radius} km et délai de {minutes}. Contactez le restaurant pour confirmer la zone et le tarif réels.', 'Esempio: costo {fee}, raggio {radius} km e tempo {minutes}. Contatta il ristorante per confermare copertura e costo reali.', 'Ejemplo: tarifa {fee}, radio de {radius} km y plazo {minutes}. Consulta al restaurante para confirmar cobertura y coste reales.', '示例：费用 {fee}，范围 {radius} 公里，预计时间 {minutes}。请联系餐厅确认实际配送范围和费用。', '例：料金 {fee}、範囲 {radius} km、目安時間 {minutes}。実際の配達範囲と料金はレストランにご確認ください。', 'Beispiel: Gebühr {fee}, Radius {radius} km und Dauer {minutes}. Bitte bestätige tatsächliches Liefergebiet und Kosten beim Restaurant.'],
    ['Total estimado de demonstração: {subtotal} em pratos + {fee} de entrega = {total}. Confirme tudo com o restaurante.', 'Sample estimated total: {subtotal} for dishes + {fee} delivery = {total}. Confirm all details with the restaurant.', 'Total indicatif : {subtotal} pour les plats + {fee} de livraison = {total}. Vérifiez tous les détails auprès du restaurant.', 'Totale stimato dimostrativo: {subtotal} per i piatti + {fee} di consegna = {total}. Conferma tutto con il ristorante.', 'Total estimado de ejemplo: {subtotal} en platos + {fee} de entrega = {total}. Confirma todos los datos con el restaurante.', '示例预估总额：菜品 {subtotal} + 配送费 {fee} = {total}。请与餐厅确认所有信息。', '目安の合計：料理 {subtotal} + 配達料 {fee} = {total}。詳細はレストランにご確認ください。', 'Geschätzter Beispielgesamtbetrag: {subtotal} für Gerichte + {fee} Lieferung = {total}. Bitte bestätige alle Angaben beim Restaurant.'],
    ['Subtotal ilustrativo dos pratos: {subtotal}. Prazo de retirada de demonstração: {minutes}.', 'Sample dish subtotal: {subtotal}. Sample pickup time: {minutes}.', 'Sous-total indicatif des plats : {subtotal}. Délai de retrait indicatif : {minutes}.', 'Subtotale dimostrativo dei piatti: {subtotal}. Tempo di ritiro indicativo: {minutes}.', 'Subtotal ilustrativo de los platos: {subtotal}. Plazo de recogida de ejemplo: {minutes}.', '示例菜品小计：{subtotal}。示例自取时间：{minutes}。', '料理の小計例：{subtotal}。受け取り時間の目安：{minutes}。', 'Beispiel-Zwischensumme der Gerichte: {subtotal}. Beispiel-Abholzeit: {minutes}.'],
    ['Subtotal ilustrativo dos pratos: {subtotal}.', 'Sample dish subtotal: {subtotal}.', 'Sous-total indicatif des plats : {subtotal}.', 'Subtotale dimostrativo dei piatti: {subtotal}.', 'Subtotal ilustrativo de los platos: {subtotal}.', '示例菜品小计：{subtotal}。', '料理の小計例：{subtotal}。', 'Beispiel-Zwischensumme der Gerichte: {subtotal}.'],
    ['Sem picância (exemplo)', 'Not spicy (example)', 'Non épicé (exemple)', 'Non piccante (esempio)', 'Sin picante (ejemplo)', '不辣（示例）', '辛くない（例）', 'Nicht scharf (Beispiel)'],
    ['Leve (exemplo)', 'Mild (example)', 'Doux (exemple)', 'Leggero (esempio)', 'Suave (ejemplo)', '微辣（示例）', 'マイルド（例）', 'Mild (Beispiel)'],
    ['Média (exemplo)', 'Medium (example)', 'Moyen (exemple)', 'Medio (esempio)', 'Medio (ejemplo)', '中辣（示例）', '中辛（例）', 'Mittel (Beispiel)'],
    ['Picante (exemplo)', 'Hot (example)', 'Épicé (exemple)', 'Piccante (esempio)', 'Picante (ejemplo)', '辣（示例）', '辛い（例）', 'Scharf (Beispiel)'],
    ['A confirmar', 'To be confirmed', 'À confirmer', 'Da confermare', 'Por confirmar', '待确认', '要確認', 'Noch zu bestätigen'],
    ['Sim (exemplo)', 'Yes (example)', 'Oui (exemple)', 'Sì (esempio)', 'Sí (ejemplo)', '是（示例）', 'はい（例）', 'Ja (Beispiel)'],
    ['Não (exemplo)', 'No (example)', 'Non (exemple)', 'No (esempio)', 'No (ejemplo)', '否（示例）', 'いいえ（例）', 'Nein (Beispiel)'],
    ['Não aplicável (exemplo)', 'Not applicable (example)', 'Sans objet (exemple)', 'Non applicabile (esempio)', 'No aplicable (ejemplo)', '不适用（示例）', '該当なし（例）', 'Nicht zutreffend (Beispiel)'],
    ['Início', 'Home', 'Accueil', 'Home', 'Inicio', '首页', 'ホーム', 'Startseite'],
    ['Entradas', 'Starters', 'Entrées', 'Antipasti', 'Entrantes', '前菜', '前菜', 'Vorspeisen'],
    ['Massas', 'Pasta', 'Pasta', 'Pasta', 'Pastas', '意面', 'パスタ', 'Pasta'],
    ['Pizzas', 'Pizzas', 'Pizzas', 'Pizze', 'Pizzas', '披萨', 'ピザ', 'Pizzen'],
    ['Drinks', 'Drinks', 'Boissons', 'Bevande', 'Bebidas', '饮品', 'ドリンク', 'Getränke'],
    ['Sobremesas', 'Desserts', 'Desserts', 'Dolci', 'Postres', '甜点', 'デザート', 'Desserts'],
    ['Meu pedido', 'My order', 'Ma commande', 'Il mio ordine', 'Mi pedido', '我的订单', '注文', 'Meine Bestellung'],
    ['Pular para o cardápio', 'Skip to menu', 'Passer au menu', 'Vai al menu', 'Ir al menú', '跳至菜单', 'メニューへ移動', 'Zum Menü springen'],
    ['Cardápio de demonstração', 'Sample menu', 'Menu de démonstration', 'Menu dimostrativo', 'Menú de demostración', '演示菜单', 'デモメニュー', 'Beispielmenü'],
    ['Preços, horários, endereço, formas de pagamento, tamanhos e entrega abaixo são exemplos. Confirme os dados reais com o restaurante antes de visitar ou pedir.', 'Prices, hours, address, payment methods, sizes and delivery details below are examples. Confirm the real details with the restaurant before visiting or ordering.', 'Les prix, horaires, adresse, moyens de paiement, tailles et détails de livraison ci-dessous sont des exemples. Vérifiez les informations réelles auprès du restaurant avant de venir ou de commander.', 'Prezzi, orari, indirizzo, metodi di pagamento, dimensioni e consegna qui sotto sono esempi. Verifica i dati reali con il ristorante prima di venire o ordinare.', 'Los precios, horarios, dirección, métodos de pago, tamaños y detalles de entrega son ejemplos. Confirma los datos reales con el restaurante antes de visitarlo o pedir.', '以下价格、营业时间、地址、付款方式、尺寸和配送信息均为示例。到店或下单前请向餐厅确认实际信息。', '以下の価格、営業時間、住所、支払い方法、サイズ、配達情報は例です。来店・注文前にレストランへ実際の情報をご確認ください。', 'Preise, Öffnungszeiten, Adresse, Zahlungsmethoden, Größen und Lieferangaben sind Beispiele. Bitte bestätige die tatsächlichen Angaben beim Restaurant, bevor du es besuchst oder bestellst.'],
    ['Feito para escolher bem', 'Made for good choices', 'Pour bien choisir', 'Per scegliere bene', 'Para elegir bien', '轻松挑选', '選びやすいメニュー', 'Damit die Wahl leichtfällt'],
    ['O que combina com hoje?', 'What sounds good today?', 'Qu’est-ce qui vous ferait plaisir ?', 'Cosa ti va oggi?', '¿Qué te apetece hoy?', '今天想吃点什么？', '今日は何にしますか？', 'Worauf hast du heute Lust?'],
    ['Busque um prato, ingrediente ou organize pelo preço.', 'Search dishes or ingredients, or sort by price.', 'Recherchez un plat ou un ingrédient, ou triez par prix.', 'Cerca un piatto o un ingrediente, oppure ordina per prezzo.', 'Busca platos o ingredientes, u ordénalos por precio.', '搜索菜品或食材，也可按价格排序。', '料理や食材を検索したり、価格順に並べ替えたりできます。', 'Suche nach Gerichten oder Zutaten oder sortiere nach Preis.'],
    ['Buscar pratos e ingredientes', 'Search dishes and ingredients', 'Rechercher des plats et des ingrédients', 'Cerca piatti e ingredienti', 'Buscar platos e ingredientes', '搜索菜品和食材', '料理と食材を検索', 'Gerichte und Zutaten suchen'],
    ['Ex.: carbonara, tomate…', 'E.g. carbonara, tomato…', 'Ex. : carbonara, tomate…', 'Es.: carbonara, pomodoro…', 'Ej.: carbonara, tomate…', '例如：奶油培根意面、番茄…', '例：カルボナーラ、トマト…', 'Z. B. Carbonara, Tomate…'],
    ['Limpar', 'Clear', 'Effacer', 'Cancella', 'Borrar', '清除', 'クリア', 'Leeren'],
    ['Favoritos', 'Favorites', 'Favoris', 'Preferiti', 'Favoritos', '收藏', 'お気に入り', 'Favoriten'],
    ['Opções', 'Options', 'Options', 'Opzioni', 'Opciones', '选项', 'オプション', 'Optionen'],
    ['Todos os pratos', 'All dishes', 'Tous les plats', 'Tutti i piatti', 'Todos los platos', '所有菜品', 'すべての料理', 'Alle Gerichte'],
    ['Sem carne na descrição', 'No meat listed', 'Sans viande indiquée', 'Senza carne indicata', 'Sin carne indicada', '描述中未列肉类', '肉の記載なし', 'Kein Fleisch angegeben'],
    ['Ordenar', 'Sort', 'Trier', 'Ordina', 'Ordenar', '排序', '並べ替え', 'Sortieren'],
    ['Ordem do cardápio', 'Menu order', 'Ordre du menu', 'Ordine del menu', 'Orden del menú', '菜单顺序', 'メニュー順', 'Menüreihenfolge'],
    ['Menor preço', 'Lowest price', 'Prix croissant', 'Prezzo crescente', 'Menor precio', '价格从低到高', '価格の安い順', 'Niedrigster Preis'],
    ['Maior preço', 'Highest price', 'Prix décroissant', 'Prezzo decrescente', 'Mayor precio', '价格从高到低', '価格の高い順', 'Höchster Preis'],
    ['Pequenos pratos para começar a refeição.', 'Small plates to start your meal.', 'De petites assiettes pour commencer le repas.', 'Piccoli piatti per iniziare il pasto.', 'Pequeños platos para empezar la comida.', '适合开启用餐的小食。', '食事の始まりにぴったりの小皿料理。', 'Kleine Gerichte für den Auftakt.'],
    ['Receitas italianas para saborear sem pressa.', 'Italian recipes to enjoy at your own pace.', 'Des recettes italiennes à savourer sans se presser.', 'Ricette italiane da gustare con calma.', 'Recetas italianas para disfrutar sin prisas.', '慢慢品尝的意式经典。', 'ゆっくり味わうイタリア料理。', 'Italienische Rezepte zum Genießen ohne Eile.'],
    ['Clássicos preparados para compartilhar.', 'Classics made for sharing.', 'Des classiques à partager.', 'Classici da condividere.', 'Clásicos para compartir.', '适合分享的经典披萨。', 'シェアして楽しむ定番料理。', 'Klassiker zum Teilen.'],
    ['Ingredientes para sua bebida favorita.', 'Ingredients for your favorite drink.', 'Les ingrédients de votre boisson préférée.', 'Gli ingredienti del tuo drink preferito.', 'Ingredientes de tu bebida favorita.', '了解饮品所用食材。', 'ドリンクの材料をご覧ください。', 'Zutaten für dein Lieblingsgetränk.'],
    ['Um final doce para a refeição.', 'A sweet ending to your meal.', 'Une note sucrée pour finir le repas.', 'Un finale dolce per il pasto.', 'Un final dulce para la comida.', '为这顿饭画上甜蜜句号。', '食事の締めくくりに甘いひと品を。', 'Ein süßer Abschluss für dein Essen.'],
    ['Busque por outro nome ou ingrediente.', 'Try another dish or ingredient.', 'Essayez un autre plat ou ingrédient.', 'Prova un altro piatto o ingrediente.', 'Prueba otro plato o ingrediente.', '试试搜索其他菜名或食材。', '別の料理名や食材をお試しください。', 'Versuche einen anderen Gerichtsnamen oder eine andere Zutat.'],
    ['Tem alguma restrição alimentar?', 'Have a dietary restriction?', 'Avez-vous une restriction alimentaire ?', 'Hai restrizioni alimentari?', '¿Tienes alguna restricción alimentaria?', '有饮食限制吗？', '食事制限がありますか？', 'Gibt es Ernährungseinschränkungen?'],
    ['Consulte nossa equipe sobre os ingredientes e a possibilidade de contaminação cruzada antes de fazer seu pedido.', 'Ask the restaurant about ingredients and possible cross-contact before ordering.', 'Renseignez-vous auprès de notre équipe sur les ingrédients et les risques de contamination croisée avant de commander.', 'Prima di ordinare, chiedi al personale informazioni sugli ingredienti e sul possibile contatto crociato.', 'Consulta al equipo sobre los ingredientes y el posible contacto cruzado antes de pedir.', '下单前请向工作人员确认食材及交叉接触风险。', '注文前に、食材と交差接触の可能性についてスタッフにご確認ください。', 'Frage vor der Bestellung nach Zutaten und möglichem Kreuzkontakt.'],
    ['Pedidos e recursos em demonstração', 'Sample ordering and features', 'Commandes et fonctions de démonstration', 'Ordini e funzioni dimostrative', 'Pedidos y funciones de demostración', '订单与功能演示', '注文機能のデモ', 'Bestellung und Funktionen zum Ausprobieren'],
    ['Essas funções guardam informações somente neste navegador. Nada é enviado ao restaurante nem sincronizado com outro aparelho.', 'These features save information only in this browser. Nothing is sent to the restaurant or synced to another device.', 'Ces fonctions enregistrent les informations uniquement dans ce navigateur. Rien n’est envoyé au restaurant ni synchronisé avec un autre appareil.', 'Queste funzioni salvano i dati solo in questo browser. Nulla viene inviato al ristorante o sincronizzato con altri dispositivi.', 'Estas funciones guardan los datos solo en este navegador. No se envía nada al restaurante ni se sincroniza con otro dispositivo.', '这些功能仅在此浏览器中保存信息，不会发送给餐厅，也不会同步到其他设备。', 'これらの機能はこのブラウザーにのみ保存されます。レストランへの送信や他の端末との同期は行われません。', 'Diese Funktionen speichern Daten nur in diesem Browser. Es wird nichts an das Restaurant gesendet oder mit anderen Geräten synchronisiert.'],
    ['Protótipo local sem servidor, login ou proteção de dados. Use apenas informações fictícias. Não faça pedidos, reservas ou avaliações reais por estes formulários.', 'Local prototype with no server, login or data protection. Use fictional information only. Do not submit real orders, reservations or reviews through these forms.', 'Prototype local sans serveur, connexion ni protection des données. Utilisez uniquement des informations fictives. Ne faites pas de vraies commandes, réservations ou évaluations avec ces formulaires.', 'Prototipo locale senza server, accesso o protezione dei dati. Usa solo informazioni fittizie. Non inviare ordini, prenotazioni o recensioni reali tramite questi moduli.', 'Prototipo local sin servidor, inicio de sesión ni protección de datos. Usa solo información ficticia. No envíes pedidos, reservas ni reseñas reales con estos formularios.', '本地原型没有服务器、登录或数据保护。请仅使用虚构信息。请勿通过这些表单提交真实订单、预订或评价。', 'サーバー、ログイン、データ保護のないローカル試作です。架空の情報だけを使用してください。実際の注文、予約、口コミには使用しないでください。', 'Lokaler Prototyp ohne Server, Anmeldung oder Datenschutz. Verwende nur erfundene Angaben. Übermittle über diese Formulare keine echten Bestellungen, Reservierungen oder Bewertungen.'],
    ['Acompanhar pedido de teste', 'Track a sample order', 'Suivre une commande fictive', 'Segui un ordine di prova', 'Seguir un pedido de prueba', '追踪示例订单', 'テスト注文を追跡', 'Beispielbestellung verfolgen'],
    ['Adicione pratos ao pedido primeiro. Registre apenas um resumo demonstrativo, sem nome, contato ou endereço.', 'Add dishes to your order first. Only a sample summary is saved, without a name, contact details or address.', 'Ajoutez d’abord des plats à votre commande. Seul un récapitulatif fictif est enregistré, sans nom, coordonnées ni adresse.', 'Aggiungi prima i piatti all’ordine. Viene salvato solo un riepilogo dimostrativo, senza nome, contatti o indirizzo.', 'Añade platos al pedido primero. Solo se guarda un resumen de demostración, sin nombre, contacto ni dirección.', '请先添加菜品。只保存演示摘要，不包含姓名、联系方式或地址。', '先に料理を注文に追加してください。名前、連絡先、住所を含めず、デモ用の概要だけを保存します。', 'Füge zuerst Gerichte zur Bestellung hinzu. Es wird nur eine Beispielsübersicht ohne Name, Kontaktdaten oder Adresse gespeichert.'],
    ['Registrar pedido de teste', 'Record sample order', 'Enregistrer une commande fictive', 'Registra ordine di prova', 'Registrar pedido de prueba', '记录示例订单', 'テスト注文を記録', 'Beispielbestellung speichern'],
    ['Adicione pelo menos um prato ao pedido antes de registrá-lo.', 'Add at least one dish to your order before recording it.', 'Ajoutez au moins un plat à la commande avant de l’enregistrer.', 'Aggiungi almeno un piatto all’ordine prima di registrarlo.', 'Añade al menos un plato al pedido antes de registrarlo.', '记录前请至少添加一道菜。', '記録する前に、料理を1品以上注文に追加してください。', 'Füge vor dem Speichern mindestens ein Gericht zur Bestellung hinzu.'],
    ['Pedido de teste {code}', 'Sample order {code}', 'Commande fictive {code}', 'Ordine di prova {code}', 'Pedido de prueba {code}', '示例订单 {code}', 'テスト注文 {code}', 'Beispielbestellung {code}'],
    ['Etapa atual: {status}. Esta atualização existe somente nesta demonstração.', 'Current stage: {status}. This update exists only in this demo.', 'Étape actuelle : {status}. Cette mise à jour existe uniquement dans cette démonstration.', 'Stato attuale: {status}. Questo aggiornamento esiste solo in questa dimostrazione.', 'Etapa actual: {status}. Esta actualización solo existe en esta demostración.', '当前阶段：{status}。此更新仅存在于演示中。', '現在の段階: {status}。この更新はデモ内だけに保存されます。', 'Aktueller Schritt: {status}. Diese Aktualisierung gibt es nur in dieser Demo.'],
    ['Recebido', 'Received', 'Reçue', 'Ricevuto', 'Recibido', '已收到', '受付済み', 'Eingegangen'],
    ['Enviado', 'Sent', 'Envoyée', 'Inviato', 'Enviado', '已发送', '送信済み', 'Versendet'],
    ['Em produção', 'In production', 'En préparation', 'In preparazione', 'En preparación', '制作中', '調理中', 'In Zubereitung'],
    ['Concluído', 'Completed', 'Terminée', 'Completato', 'Completado', '已完成', '完了', 'Abgeschlossen'],
    ['etapa atual', 'current stage', 'étape actuelle', 'fase attuale', 'etapa actual', '当前阶段', '現在の段階', 'aktueller Schritt'],
    ['Código do pedido', 'Order code', 'Code de commande', 'Codice ordine', 'Código del pedido', '订单代码', '注文コード', 'Bestellcode'],
    ['Acompanhar', 'Track', 'Suivre', 'Segui', 'Seguir', '追踪', '追跡', 'Verfolgen'],
    ['Reserva de mesa demonstrativa', 'Sample table reservation', 'Réservation de table fictive', 'Prenotazione dimostrativa', 'Reserva de mesa de demostración', '餐桌预订演示', 'テーブル予約のデモ', 'Beispiel-Tischreservierung'],
    ['Escolha uma data, um horário disponível e o tamanho do grupo. O código permite consultar os dados salvos neste navegador.', 'Choose a date, an available time and your group size. Use the code to look up details saved in this browser.', 'Choisissez une date, un horaire disponible et la taille du groupe. Le code permet de consulter les informations enregistrées dans ce navigateur.', 'Scegli una data, un orario disponibile e la dimensione del gruppo. Il codice permette di consultare i dati salvati in questo browser.', 'Elige una fecha, una hora disponible y el tamaño del grupo. El código permite consultar los datos guardados en este navegador.', '选择日期、可用时段和人数。使用代码查询保存在此浏览器中的信息。', '日付、空き時間、人数を選択してください。コードを使って、このブラウザーに保存された情報を確認できます。', 'Wähle ein Datum, eine verfügbare Uhrzeit und die Gruppengröße. Mit dem Code kannst du die in diesem Browser gespeicherten Angaben abrufen.'],
    ['Reservar na demonstração', 'Book in demo', 'Réserver dans la démo', 'Prenota nella demo', 'Reservar en la demostración', '进行演示预订', 'デモで予約する', 'In der Demo reservieren'],
    ['Consultar reserva pelo código', 'Look up reservation by code', 'Consulter une réservation par code', 'Consulta la prenotazione tramite codice', 'Consultar reserva por código', '使用代码查询预订', 'コードで予約を確認', 'Reservierung per Code abrufen'],
    ['Consultar', 'Look up', 'Consulter', 'Consulta', 'Consultar', '查询', '確認', 'Abrufen'],
    ['Escolha uma data primeiro', 'Choose a date first', 'Choisissez d’abord une date', 'Scegli prima una data', 'Elige primero una fecha', '请先选择日期', '先に日付を選択してください', 'Wähle zuerst ein Datum'],
    ['Selecione um horário disponível', 'Select an available time', 'Choisissez un horaire disponible', 'Seleziona un orario disponibile', 'Elige una hora disponible', '选择可用时段', '空き時間を選択してください', 'Wähle eine verfügbare Uhrzeit'],
    ['Disponibilidade indisponível', 'Availability unavailable', 'Disponibilité indisponible', 'Disponibilità non disponibile', 'Disponibilidad no disponible', '暂时无法查看可用情况', '空き状況を確認できません', 'Verfügbarkeit nicht verfügbar'],
    ['Não foi possível ler as capacidades salvas no painel do restaurante.', 'Could not read the capacities saved in the restaurant panel.', 'Impossible de lire les capacités enregistrées dans le panneau du restaurant.', 'Impossibile leggere le capacità salvate nel pannello del ristorante.', 'No se pudieron leer las capacidades guardadas en el panel del restaurante.', '无法读取餐厅面板中保存的容量设置。', 'レストランパネルに保存された定員を読み込めませんでした。', 'Die im Restaurantbereich gespeicherten Kapazitäten konnten nicht gelesen werden.'],
    ['Restaurante fechado nesta data', 'Restaurant closed on this date', 'Restaurant fermé à cette date', 'Ristorante chiuso in questa data', 'Restaurante cerrado en esta fecha', '餐厅在此日期休息', 'この日は休業です', 'Restaurant an diesem Datum geschlossen'],
    ['{time} - {count} lugar disponível', '{time} - {count} seat available', '{time} - {count} place disponible', '{time} - {count} posto disponibile', '{time} - {count} plaza disponible', '{time} - 还有 {count} 个位置', '{time} - 空席 {count} 席', '{time} - {count} Platz verfügbar'],
    ['{time} - {count} lugares disponíveis', '{time} - {count} seats available', '{time} - {count} places disponibles', '{time} - {count} posti disponibili', '{time} - {count} plazas disponibles', '{time} - 还有 {count} 个位置', '{time} - 空席 {count} 席', '{time} - {count} Plätze verfügbar'],
    ['{time} - restam {count}, insuficiente para o grupo', '{time} - {count} left, not enough for this group', '{time} - {count} restant(s), pas assez pour ce groupe', '{time} - restano {count}, non bastano per il gruppo', '{time} - quedan {count}, no son suficientes para el grupo', '{time} - 剩余 {count} 个，不足以容纳此组', '{time} - 残り {count} 席、グループには不足', '{time} - noch {count}, nicht genug für diese Gruppe'],
    ['{time} - esgotado', '{time} - fully booked', '{time} - complet', '{time} - esaurito', '{time} - completo', '{time} - 已满', '{time} - 満席', '{time} - ausgebucht'],
    ['Não há horários com lugares suficientes para este grupo nesta data.', 'There are no times with enough seats for this group on this date.', 'Aucun horaire ne dispose d’assez de places pour ce groupe à cette date.', 'Non ci sono orari con posti sufficienti per questo gruppo in questa data.', 'No hay horarios con suficientes plazas para este grupo en esta fecha.', '此日期没有足够容纳该团队的时段。', 'この日にグループ人数分の空席がある時間はありません。', 'An diesem Datum gibt es keine Uhrzeit mit genügend Plätzen für diese Gruppe.'],
    ['Não encontramos esse código nas reservas salvas neste navegador.', 'We could not find that code among reservations saved in this browser.', 'Ce code ne figure pas parmi les réservations enregistrées dans ce navigateur.', 'Questo codice non è tra le prenotazioni salvate in questo browser.', 'No encontramos ese código entre las reservas guardadas en este navegador.', '在此浏览器保存的预订中未找到该代码。', 'このブラウザーに保存された予約にコードが見つかりません。', 'Dieser Code wurde unter den in diesem Browser gespeicherten Reservierungen nicht gefunden.'],
    ['Reserva {code}', 'Reservation {code}', 'Réservation {code}', 'Prenotazione {code}', 'Reserva {code}', '预订 {code}', '予約 {code}', 'Reservierung {code}'],
    ['{date} às {time}, {count} {people}.', '{date} at {time}, {count} {people}.', 'Le {date} à {time}, {count} {people}.', '{date} alle {time}, {count} {people}.', 'El {date} a las {time}, {count} {people}.', '{date} {time}，{count}{people}。', '{date} {time}、{count}{people}。', '{date} um {time}, {count} {people}.'],
    ['pessoa', 'person', 'personne', 'persona', 'persona', '人', '人', 'Person'],
    ['pessoas', 'people', 'personnes', 'persone', 'personas', '人', '人', 'Personen'],
    ['Estado: cancelada.', 'Status: cancelled.', 'État : annulée.', 'Stato: annullata.', 'Estado: cancelada.', '状态：已取消。', '状態: キャンセル済み。', 'Status: storniert.'],
    ['Estado: confirmada na demonstração.', 'Status: confirmed in the demo.', 'État : confirmée dans la démo.', 'Stato: confermata nella demo.', 'Estado: confirmada en la demostración.', '状态：演示中已确认。', '状態: デモで確定済み。', 'Status: in der Demo bestätigt.'],
    ['Estado: registro anterior, consulte o restaurante para confirmação.', 'Status: older record. Contact the restaurant to confirm.', 'État : ancien enregistrement. Contactez le restaurant pour confirmation.', 'Stato: registrazione precedente. Contatta il ristorante per confermare.', 'Estado: registro anterior. Consulta al restaurante para confirmar.', '状态：旧记录，请联系餐厅确认。', '状態: 以前の記録です。レストランに確認してください。', 'Status: älterer Eintrag. Bitte beim Restaurant bestätigen.'],
    ['Escolha uma data futura para o teste.', 'Choose a future date for this demo.', 'Choisissez une date future pour cette démo.', 'Scegli una data futura per questa demo.', 'Elige una fecha futura para la demostración.', '请选择未来日期进行演示。', 'デモには未来の日付を選択してください。', 'Wähle für diese Demo ein zukünftiges Datum.'],
    ['Não foi possível confirmar a disponibilidade. Verifique o painel do restaurante.', 'Availability could not be confirmed. Check the restaurant panel.', 'Impossible de confirmer la disponibilité. Vérifiez le panneau du restaurant.', 'Impossibile confermare la disponibilità. Controlla il pannello del ristorante.', 'No se pudo confirmar la disponibilidad. Revisa el panel del restaurante.', '无法确认可用情况。请检查餐厅面板。', '空き状況を確認できませんでした。レストランパネルを確認してください。', 'Die Verfügbarkeit konnte nicht bestätigt werden. Prüfe den Restaurantbereich.'],
    ['Não foi possível verificar as reservas salvas. Tente novamente.', 'Could not check saved reservations. Try again.', 'Impossible de vérifier les réservations enregistrées. Réessayez.', 'Impossibile verificare le prenotazioni salvate. Riprova.', 'No se pudieron comprobar las reservas guardadas. Inténtalo de nuevo.', '无法检查已保存的预订，请重试。', '保存された予約を確認できませんでした。もう一度お試しください。', 'Gespeicherte Reservierungen konnten nicht geprüft werden. Versuche es erneut.'],
    ['Esse horário não tem lugares suficientes. Escolha outra opção.', 'There are not enough seats at this time. Choose another option.', 'Il n’y a pas assez de places à cet horaire. Choisissez une autre option.', 'Non ci sono abbastanza posti a quest’ora. Scegli un’altra opzione.', 'No hay suficientes plazas a esa hora. Elige otra opción.', '此时段没有足够位置，请选择其他时段。', 'この時間は空席が足りません。別の時間を選択してください。', 'Zu dieser Uhrzeit gibt es nicht genügend Plätze. Wähle eine andere Option.'],
    ['Reserva de demonstração confirmada. Seu código é {code}. Guarde-o para consultar os dados.', 'Demo reservation confirmed. Your code is {code}. Keep it to look up the details.', 'Réservation de démonstration confirmée. Votre code est {code}. Conservez-le pour consulter les informations.', 'Prenotazione dimostrativa confermata. Il tuo codice è {code}. Conservalo per consultare i dati.', 'Reserva de demostración confirmada. Tu código es {code}. Guárdalo para consultar los datos.', '演示预订已确认。您的代码是 {code}。请保存代码以查询详情。', 'デモ予約が確定しました。コードは {code} です。情報の確認用に保存してください。', 'Demo-Reservierung bestätigt. Dein Code lautet {code}. Bewahre ihn für den Abruf der Angaben auf.'],
    ['Nome para a reserva', 'Name for sample reservation', 'Nom pour la réservation fictive', 'Nome per la prenotazione di prova', 'Nombre para la reserva de prueba', '演示预订姓名', 'テスト予約の名前', 'Name für die Beispielreservierung'],
    ['Data', 'Date', 'Date', 'Data', 'Fecha', '日期', '日付', 'Datum'],
    ['Horário', 'Time', 'Heure', 'Orario', 'Hora', '时间', '時間', 'Uhrzeit'],
    ['Selecione', 'Select', 'Sélectionner', 'Seleziona', 'Seleccionar', '请选择', '選択', 'Auswählen'],
    ['Pessoas', 'People', 'Personnes', 'Persone', 'Personas', '人数', '人数', 'Personen'],
    ['Salvar teste local', 'Save local sample', 'Enregistrer le test local', 'Salva test locale', 'Guardar prueba local', '保存本地测试', 'ローカルテストを保存', 'Lokalen Test speichern'],
    ['Lista de espera demonstrativa', 'Sample waitlist', 'Liste d’attente fictive', 'Lista d’attesa dimostrativa', 'Lista de espera de demostración', '候位名单演示', '順番待ちのデモ', 'Beispiel-Warteliste'],
    ['Simule sua posição sem informar nome ou contato. Não envia aviso nem reserva uma mesa.', 'Preview a queue position without entering a name or contact details. No notification is sent and no table is reserved.', 'Simulez votre position sans indiquer de nom ni de coordonnées. Aucun message n’est envoyé et aucune table n’est réservée.', 'Simula la posizione senza inserire nome o contatti. Non viene inviato alcun avviso e non viene riservato un tavolo.', 'Simula tu posición sin indicar nombre ni contacto. No se envía ningún aviso ni se reserva una mesa.', '无需提供姓名或联系方式即可模拟排队位置。不会发送通知，也不会预留餐桌。', '名前や連絡先を入力せずに順番を試せます。通知は送られず、席も予約されません。', 'Teste deine Warteposition ohne Namen oder Kontaktdaten. Es wird keine Nachricht gesendet und kein Tisch reserviert.'],
    ['Tamanho do grupo', 'Group size', 'Taille du groupe', 'Dimensione del gruppo', 'Tamaño del grupo', '同行人数', 'グループ人数', 'Gruppengröße'],
    ['1 pessoa', '1 person', '1 personne', '1 persona', '1 persona', '1人', '1人', '1 Person'],
    ['2 pessoas', '2 people', '2 personnes', '2 persone', '2 personas', '2人', '2人', '2 Personen'],
    ['3 pessoas', '3 people', '3 personnes', '3 persone', '3 personas', '3人', '3人', '3 Personen'],
    ['4 pessoas', '4 people', '4 personnes', '4 persone', '4 personas', '4人', '4人', '4 Personen'],
    ['5 pessoas', '5 people', '5 personnes', '5 persone', '5 personas', '5人', '5人', '5 Personen'],
    ['6 pessoas', '6 people', '6 personnes', '6 persone', '6 personas', '6人', '6人', '6 Personen'],
    ['Entrar na fila de teste', 'Join sample queue', 'Rejoindre la file fictive', 'Entra nella coda di prova', 'Entrar en la cola de prueba', '加入测试队列', 'テストの順番待ちに参加', 'In die Beispiel-Warteschlange einreihen'],
    ['Oferta e combo de demonstração', 'Sample offer and combo', 'Offre et formule fictives', 'Offerta e menu dimostrativi', 'Oferta y combo de demostración', '优惠与套餐演示', '特典とセットのデモ', 'Beispielangebot und Menü'],
    ['Valores e composição são exemplos locais, sem desconto e sem venda.', 'Prices and items are local examples, with no discount and no sale.', 'Les prix et la composition sont des exemples locaux, sans remise ni vente.', 'Prezzi e composizione sono esempi locali, senza sconti né vendite.', 'Los precios y la composición son ejemplos locales, sin descuento ni venta.', '价格和内容仅为本地示例，不含折扣，也不用于销售。', '価格と内容はローカルの例で、割引や販売はありません。', 'Preise und Zusammenstellung sind lokale Beispiele, ohne Rabatt und Verkauf.'],
    ['Avaliações da demonstração', 'Sample reviews', 'Avis de démonstration', 'Recensioni dimostrative', 'Reseñas de demostración', '评价演示', '口コミのデモ', 'Beispielbewertungen'],
    ['As avaliações ficam pendentes até serem aprovadas no painel local. Não há verificação de compra.', 'Reviews remain pending until approved in the local panel. Purchases are not verified.', 'Les avis restent en attente jusqu’à leur approbation dans le panneau local. Aucun achat n’est vérifié.', 'Le recensioni restano in attesa finché non vengono approvate nel pannello locale. Gli acquisti non sono verificati.', 'Las reseñas quedan pendientes hasta aprobarlas en el panel local. No se verifican compras.', '评价需在本地面板批准后显示。购买情况未经验证。', '口コミはローカルパネルで承認されるまで保留されます。購入確認はありません。', 'Bewertungen bleiben bis zur Freigabe im lokalen Bereich ausstehend. Käufe werden nicht überprüft.'],
    ['Nome demonstrativo', 'Sample name', 'Nom fictif', 'Nome dimostrativo', 'Nombre de ejemplo', '示例姓名', '表示名の例', 'Beispielname'],
    ['Nota', 'Rating', 'Note', 'Valutazione', 'Puntuación', '评分', '評価', 'Bewertung'],
    ['Comentário fictício', 'Sample comment', 'Commentaire fictif', 'Commento fittizio', 'Comentario ficticio', '示例评论', 'サンプルコメント', 'Beispielkommentar'],
    ['Enviar para moderação local', 'Submit for local review', 'Envoyer à la modération locale', 'Invia alla moderazione locale', 'Enviar a moderación local', '提交本地审核', 'ローカル審査に送信', 'Zur lokalen Moderation senden'],
    ['Acessibilidade', 'Accessibility', 'Accessibilité', 'Accessibilità', 'Accesibilidad', '无障碍', 'アクセシビリティ', 'Barrierefreiheit'],
    ['Ajustes visuais ficam salvos somente neste navegador.', 'Visual settings are saved only in this browser.', 'Les réglages visuels sont enregistrés uniquement dans ce navigateur.', 'Le impostazioni visive vengono salvate solo in questo browser.', 'Los ajustes visuales se guardan solo en este navegador.', '视觉设置仅保存在此浏览器中。', '表示設定はこのブラウザーにのみ保存されます。', 'Anzeigeeinstellungen werden nur in diesem Browser gespeichert.'],
    ['Tamanho do texto', 'Text size', 'Taille du texte', 'Dimensione del testo', 'Tamaño del texto', '文字大小', '文字サイズ', 'Textgröße'],
    ['Diminuir tamanho do texto', 'Decrease text size', 'Réduire la taille du texte', 'Riduci il testo', 'Reducir tamaño del texto', '缩小文字', '文字を小さくする', 'Text verkleinern'],
    ['Aumentar tamanho do texto', 'Increase text size', 'Augmenter la taille du texte', 'Ingrandisci il testo', 'Aumentar tamaño del texto', '放大文字', '文字を大きくする', 'Text vergrößern'],
    ['Texto padrão', 'Default text', 'Texte standard', 'Testo predefinito', 'Texto normal', '默认文字', '標準の文字サイズ', 'Standardtext'],
    ['Texto aumentado', 'Larger text', 'Texte agrandi', 'Testo ingrandito', 'Texto ampliado', '较大文字', '大きい文字', 'Größerer Text'],
    ['Texto maior', 'Largest text', 'Texte très agrandi', 'Testo molto ingrandito', 'Texto más grande', '最大文字', '最大の文字', 'Größter Text'],
    ['Ativar contraste reforçado', 'Enable enhanced contrast', 'Activer le contraste renforcé', 'Attiva il contrasto elevato', 'Activar contraste reforzado', '启用增强对比度', '高コントラストを有効にする', 'Erhöhten Kontrast aktivieren'],
    ['Restaurar padrão', 'Reset to default', 'Rétablir les valeurs par défaut', 'Ripristina predefiniti', 'Restablecer valores', '恢复默认设置', '初期設定に戻す', 'Auf Standard zurücksetzen'],
    ['O painel abaixo não tem autenticação e serve somente para testar alterações locais.', 'The panel below has no authentication and is only for testing local changes.', 'Le panneau ci-dessous n’a pas d’authentification et sert uniquement à tester des modifications locales.', 'Il pannello qui sotto non richiede autenticazione e serve solo a provare modifiche locali.', 'El panel de abajo no tiene autenticación y solo sirve para probar cambios locales.', '下方的面板没有身份验证，仅用于测试本地更改。', '以下のパネルには認証がなく、ローカル変更のテスト専用です。', 'Der folgende Bereich hat keine Anmeldung und dient nur zum Testen lokaler Änderungen.'],
    ['Abrir painel de demonstração', 'Open demo panel', 'Ouvrir le panneau de démonstration', 'Apri il pannello dimostrativo', 'Abrir panel de demostración', '打开演示面板', 'デモパネルを開く', 'Demobereich öffnen'],
    ['Informações para visitar e pedir', 'Visit and order information', 'Informations pour venir et commander', 'Informazioni per visita e ordini', 'Información para visitar y pedir', '到店与点餐信息', '来店・注文情報', 'Informationen für Besuch und Bestellung'],
    ['Os dados operacionais desta demonstração são fictícios e precisam ser substituídos antes da publicação.', 'Operational details in this demo are fictional and must be replaced before publication.', 'Les informations pratiques de cette démonstration sont fictives et doivent être remplacées avant publication.', 'I dati operativi di questa demo sono fittizi e devono essere sostituiti prima della pubblicazione.', 'Los datos operativos de esta demostración son ficticios y deben sustituirse antes de publicar.', '本演示中的运营信息均为虚构，发布前必须替换。', 'このデモの運営情報は架空です。公開前に置き換えてください。', 'Die Betriebsangaben in dieser Demo sind erfunden und müssen vor der Veröffentlichung ersetzt werden.'],
    ['Exemplos, não dados confirmados.', 'Examples, not verified information.', 'Exemples, informations non vérifiées.', 'Esempi, dati non verificati.', 'Ejemplos, no datos verificados.', '示例，未经核实的信息。', '例示であり、確認済みの情報ではありません。', 'Beispiele, keine bestätigten Angaben.'],
    ['Endereço, horários, taxas, prazos e pagamentos abaixo são apenas demonstração. Não use para uma visita ou compra real.', 'Address, hours, fees, timing and payment details below are samples only. Do not use them for a real visit or purchase.', 'L’adresse, les horaires, les frais, les délais et les paiements ci-dessous sont fictifs. Ne les utilisez pas pour une vraie visite ou un achat.', 'Indirizzo, orari, tariffe, tempi e pagamenti qui sotto sono solo dimostrativi. Non usarli per visite o acquisti reali.', 'La dirección, horarios, tarifas, plazos y pagos son solo ejemplos. No los uses para una visita o compra real.', '以下地址、营业时间、费用、时长和付款信息仅为演示。请勿用于实际到店或购买。', '住所、営業時間、料金、所要時間、支払い方法は例です。実際の来店や購入には使用しないでください。', 'Adresse, Öffnungszeiten, Gebühren, Zeiten und Zahlungsarten sind nur Beispiele. Verwende sie nicht für echte Besuche oder Käufe.'],
    ['Endereço de demonstração', 'Sample address', 'Adresse fictive', 'Indirizzo dimostrativo', 'Dirección de demostración', '示例地址', '住所の例', 'Beispieladresse'],
    ['Horários de demonstração', 'Sample hours', 'Horaires fictifs', 'Orari dimostrativi', 'Horario de demostración', '示例营业时间', '営業時間の例', 'Beispielöffnungszeiten'],
    ['Pagamentos de demonstração', 'Sample payment methods', 'Moyens de paiement fictifs', 'Metodi di pagamento dimostrativi', 'Métodos de pago de demostración', '示例付款方式', '支払い方法の例', 'Beispielzahlungsarten'],
    ['Entrega de demonstração', 'Sample delivery', 'Livraison fictive', 'Consegna dimostrativa', 'Entrega de demostración', '配送演示', '配達の例', 'Beispiellieferung'],
    ['Retirada de demonstração', 'Sample pickup', 'Retrait fictif', 'Ritiro dimostrativo', 'Recogida de demostración', '自取演示', '受け取りの例', 'Beispielabholung'],
    ['Opções alimentares', 'Dietary options', 'Options alimentaires', 'Opzioni alimentari', 'Opciones alimentarias', '饮食选项', '食事のオプション', 'Ernährungsoptionen'],
    ['Use o filtro “Sem carne na descrição” para encontrar sugestões.', 'Use the “No meat listed” filter to find suggestions.', 'Utilisez le filtre « Sans viande indiquée » pour trouver des suggestions.', 'Usa il filtro “Senza carne indicata” per trovare suggerimenti.', 'Usa el filtro “Sin carne indicada” para ver sugerencias.', '使用“描述中未列肉类”筛选查看建议。', '「肉の記載なし」フィルターで候補を探せます。', 'Nutze den Filter „Kein Fleisch angegeben“ für Vorschläge.'],
    ['Classificação baseada nas descrições resumidas, não garante preparo vegetariano, ausência de alergênicos ou contato cruzado.', 'This label is based on short descriptions. It does not guarantee vegetarian preparation or the absence of allergens or cross-contact.', 'Cette indication repose sur des descriptions succinctes. Elle ne garantit ni une préparation végétarienne ni l’absence d’allergènes ou de contact croisé.', 'Questa classificazione si basa su descrizioni sintetiche. Non garantisce preparazione vegetariana, assenza di allergeni o contatto crociato.', 'Esta clasificación se basa en descripciones breves. No garantiza una preparación vegetariana ni la ausencia de alérgenos o contacto cruzado.', '此分类基于简短描述，不保证素食制作，也不保证不含过敏原或无交叉接触。', 'この表示は簡単な説明に基づいています。ベジタリアン対応やアレルゲン・交差接触がないことを保証しません。', 'Diese Einordnung basiert auf Kurzbeschreibungen. Sie garantiert weder vegetarische Zubereitung noch Allergen- oder Kreuzkontaktfreiheit.'],
    ['Tamanhos de pizza demonstrativos', 'Sample pizza sizes', 'Tailles de pizza fictives', 'Dimensioni pizza dimostrative', 'Tamaños de pizza de demostración', '披萨尺寸演示', 'ピザサイズの例', 'Beispiel-Pizzagrößen'],
    ['Individual (25 cm), regular (30 cm) e família (35 cm). Os preços no personalizador são simulações calculadas a partir do preço atual do cardápio, não valores oficiais.', 'Individual (25 cm), regular (30 cm) and family (35 cm). Customizer prices are sample calculations based on current menu prices, not official prices.', 'Individuelle (25 cm), normale (30 cm) et familiale (35 cm). Les prix du personnalisateur sont des simulations calculées à partir du menu, pas des tarifs officiels.', 'Individuale (25 cm), normale (30 cm) e famiglia (35 cm). I prezzi nel personalizzatore sono simulazioni basate sul menu, non prezzi ufficiali.', 'Individual (25 cm), regular (30 cm) y familiar (35 cm). Los precios son simulaciones basadas en el menú actual, no precios oficiales.', '单人（25厘米）、标准（30厘米）和家庭（35厘米）。定制器价格根据菜单价格模拟计算，并非官方价格。', '個人用（25cm）、レギュラー（30cm）、ファミリー（35cm）。カスタマイズ画面の価格はメニュー価格から計算した例で、公式価格ではありません。', 'Einzel (25 cm), normal (30 cm) und Familie (35 cm). Die Preise im Konfigurator sind Beispielrechnungen auf Basis der aktuellen Menüpreise, keine offiziellen Preise.'],
    ['Compartilhe o cardápio', 'Share the menu', 'Partager le menu', 'Condividi il menu', 'Compartir el menú', '分享菜单', 'メニューを共有', 'Menü teilen'],
    ['Envie o link para alguém ou use o QR Code depois de conferir o endereço público do site.', 'Send someone the link or use the QR code after confirming the public website address.', 'Envoyez le lien ou utilisez le code QR après avoir vérifié l’adresse publique du site.', 'Invia il link o usa il codice QR dopo aver verificato l’indirizzo pubblico del sito.', 'Envía el enlace o usa el código QR después de confirmar la dirección pública del sitio.', '确认网站公开地址后，可分享链接或使用二维码。', '公開サイトのアドレスを確認してから、リンクやQRコードを共有してください。', 'Teile den Link oder nutze den QR-Code, nachdem du die öffentliche Website-Adresse geprüft hast.'],
    ['Compartilhar cardápio', 'Share menu', 'Partager le menu', 'Condividi il menu', 'Compartir menú', '分享菜单', 'メニューを共有', 'Menü teilen'],
    ['Copie ou abra este link do cardápio', 'Copy or open this menu link', 'Copiez ou ouvrez ce lien du menu', 'Copia o apri questo link del menu', 'Copia o abre este enlace del menú', '复制或打开此菜单链接', 'メニューのリンクをコピーまたは開く', 'Diesen Menülink kopieren oder öffnen'],
    ['QR Code para abrir o cardápio online', 'QR code to open the online menu', 'Code QR pour ouvrir le menu en ligne', 'Codice QR per aprire il menu online', 'Código QR para abrir el menú en línea', '打开在线菜单的二维码', 'オンラインメニューを開くQRコード', 'QR-Code zum Öffnen des Online-Menüs'],
    ['QR Code do endereço público do cardápio', 'QR code for the public menu address', 'Code QR de l’adresse publique du menu', 'Codice QR dell’indirizzo pubblico del menu', 'Código QR de la dirección pública del menú', '菜单公开地址的二维码', '公開メニューのQRコード', 'QR-Code für die öffentliche Menüadresse'],
    ['Abrir QR Code em tamanho grande', 'Open large QR code', 'Ouvrir le grand code QR', 'Apri il codice QR grande', 'Abrir código QR grande', '打开大尺寸二维码', '大きなQRコードを開く', 'Großen QR-Code öffnen'],
    ['Informações do restaurante (demonstração)', 'Restaurant information (sample)', 'Informations du restaurant (fictives)', 'Informazioni del ristorante (dimostrative)', 'Información del restaurante (de demostración)', '餐厅信息（演示）', 'レストラン情報（デモ）', 'Restaurantinformationen (Beispiel)'],
    ['Consulte a equipe para confirmar horários, endereço e informações sobre alergênicos.', 'Contact the restaurant to confirm hours, address and allergen information.', 'Contactez le restaurant pour confirmer les horaires, l’adresse et les informations sur les allergènes.', 'Contatta il ristorante per confermare orari, indirizzo e informazioni sugli allergeni.', 'Consulta al restaurante para confirmar horarios, dirección e información sobre alérgenos.', '请联系餐厅确认营业时间、地址和过敏原信息。', '営業時間、住所、アレルゲン情報はレストランにご確認ください。', 'Bitte bestätige Öffnungszeiten, Adresse und Allergeninformationen beim Restaurant.'],
    ['Reservas e outros recursos (demonstração)', 'Reservations and other features (sample)', 'Réservations et autres fonctions (démo)', 'Prenotazioni e altre funzioni (demo)', 'Reservas y otras funciones (demo)', '预订及其他功能（演示）', '予約などの機能（デモ）', 'Reservierungen und weitere Funktionen (Demo)'],
    ['La Bella Trattoria', 'La Bella Trattoria', 'La Bella Trattoria', 'La Bella Trattoria', 'La Bella Trattoria', 'La Bella Trattoria', 'La Bella Trattoria', 'La Bella Trattoria'],
    ['Escolher ingredientes', 'Choose ingredients', 'Choisir les ingrédients', 'Scegli gli ingredienti', 'Elegir ingredientes', '选择食材', '食材を選ぶ', 'Zutaten auswählen'],
    ['Personalizar', 'Customize', 'Personnaliser', 'Personalizza', 'Personalizar', '自定义', 'カスタマイズ', 'Anpassen'],
    ['Compartilhar', 'Share', 'Partager', 'Condividi', 'Compartir', '分享', '共有', 'Teilen'],
    ['Sem carne na descrição', 'No meat listed', 'Sans viande indiquée', 'Senza carne indicata', 'Sin carne indicada', '描述中未列肉类', '肉の記載なし', 'Kein Fleisch angegeben'],
    ['Clássico', 'Classic', 'Classique', 'Classico', 'Clásico', '经典', '定番', 'Klassiker'],
    ['Típico', 'Traditional', 'Traditionnel', 'Tipico', 'Típico', '传统', '伝統料理', 'Traditionell'],
    ['Chef', 'Chef’s choice', 'Suggestion du chef', 'Scelta dello chef', 'Sugerencia del chef', '主厨推荐', 'シェフのおすすめ', 'Empfehlung des Küchenchefs'],
    ['Premium', 'Specialty', 'Spécialité', 'Specialità', 'Especialidad', '精选', '特選', 'Spezialität'],
    ['Top', 'Favorite', 'Favori', 'Preferito', 'Favorito', '人气', '人気', 'Beliebt'],
    ['Uma mesa posta para viajar à Itália.', 'A table set for a taste of Italy.', 'Une table dressée pour goûter à l’Italie.', 'Una tavola pronta per un viaggio in Italia.', 'Una mesa lista para viajar a Italia.', '一桌佳肴，开启意式之旅。', 'イタリアを味わう食卓へ。', 'Ein gedeckter Tisch für eine Reise nach Italien.'],
    ['Massas, pizzas e receitas clássicas preparadas para aproveitar sem pressa.', 'Pasta, pizza and classic recipes to enjoy at your own pace.', 'Pâtes, pizzas et recettes classiques à savourer sans se presser.', 'Pasta, pizza e ricette classiche da gustare con calma.', 'Pastas, pizzas y recetas clásicas para disfrutar sin prisa.', '意面、披萨与经典食谱，值得慢慢享用。', 'パスタ、ピザ、定番料理をゆっくりお楽しみください。', 'Pasta, Pizza und klassische Rezepte zum Genießen ohne Eile.'],
    ['Ver o cardápio', 'View menu', 'Voir le menu', 'Vedi il menu', 'Ver el menú', '查看菜单', 'メニューを見る', 'Menü ansehen'],
];

const localeMaps = Object.fromEntries(localeCodes.map((locale, localeIndex) => [
    locale,
    new Map(localeRows.map((row) => [row[0], row[localeIndex]])),
]));
const dishTranslations = {
    'Bruschetta al Pomodoro': [
        'Toasted rustic bread with fresh tomato, basil and olive oil.',
        'Pain rustique grillé, tomate fraîche, basilic et huile d’olive.',
        'Pane rustico tostato con pomodoro fresco, basilico e olio d’oliva.',
        'Pan rústico tostado con tomate fresco, albahaca y aceite de oliva.',
        '烤乡村面包，搭配鲜番茄、罗勒和橄榄油。',
        'トーストした田舎風パンに、フレッシュトマト、バジル、オリーブオイル。',
        'Geröstetes Landbrot mit frischer Tomate, Basilikum und Olivenöl.',
    ],
    'Caprese di Bufala': [
        'Buffalo mozzarella, tomato and fresh basil.',
        'Mozzarella di bufflonne, tomate et basilic frais.',
        'Mozzarella di bufala, pomodoro e basilico fresco.',
        'Mozzarella de búfala, tomate y albahaca fresca.',
        '水牛芝士、番茄和新鲜罗勒。',
        '水牛モッツァレラ、トマト、フレッシュバジル。',
        'Büffelmozzarella, Tomate und frisches Basilikum.',
    ],
    'Carpaccio di Manzo': [
        'Thinly sliced beef with arugula, Parmesan and capers.',
        'Fines tranches de bœuf, roquette, parmesan et câpres.',
        'Sottili fette di manzo con rucola, Parmigiano e capperi.',
        'Láminas finas de ternera con rúcula, parmesano y alcaparras.',
        '牛肉薄片，搭配芝麻菜、帕玛森芝士和酸豆。',
        '薄切り牛肉にルッコラ、パルメザン、ケッパーを添えて。',
        'Dünn geschnittenes Rindfleisch mit Rucola, Parmesan und Kapern.',
    ],
    'Arancini Siciliani': [
        'Risotto balls filled with mozzarella and ragù.',
        'Boulettes de risotto farcies à la mozzarella et au ragù.',
        'Arancini di risotto ripieni di mozzarella e ragù.',
        'Bolas de risotto rellenas de mozzarella y ragú.',
        '烩饭团，内馅为马苏里拉芝士和肉酱。',
        'モッツァレラとラグーを詰めたライスコロッケ。',
        'Risottobällchen mit Mozzarella und Ragù.',
    ],
    'Melanzane alla Parmigiana': [
        'Baked eggplant with tomato sauce and Parmesan.',
        'Aubergine gratinée, sauce tomate et parmesan.',
        'Melanzane gratinate con salsa di pomodoro e Parmigiano.',
        'Berenjena gratinada con salsa de tomate y parmesano.',
        '烤茄子配番茄酱和帕玛森芝士。',
        'ナスのグラタン、トマトソースとパルメザン。',
        'Überbackene Aubergine mit Tomatensauce und Parmesan.',
    ],
    'Frittura di Calamari': [
        'Fresh breaded fried squid served with lemon.',
        'Calamars frais panés et frits, servis avec du citron.',
        'Calamari freschi impanati e fritti, serviti con limone.',
        'Calamares frescos rebozados y fritos, servidos con limón.',
        '新鲜鱿鱼裹粉炸制，配柠檬。',
        '衣をつけて揚げた新鮮なイカ、レモン添え。',
        'Frisch panierte und frittierte Tintenfische mit Zitrone.',
    ],
    'Tagliatelle alla Bolognese': [
        'Handmade pasta with slow-cooked Bolognese sauce.',
        'Pâtes maison avec une sauce bolognaise mijotée lentement.',
        'Pasta artigianale con ragù alla bolognese cotto lentamente.',
        'Pasta artesanal con salsa boloñesa cocinada a fuego lento.',
        '手工宽面配慢炖博洛尼亚肉酱。',
        '手打タリアテッレ、じっくり煮込んだボロネーゼソース。',
        'Hausgemachte Pasta mit langsam gekochter Bolognese.',
    ],
    'Spaghetti alla Carbonara': [
        'Classic recipe with guanciale, pecorino and egg yolk.',
        'Recette classique au guanciale, pecorino et jaune d’œuf.',
        'Ricetta classica con guanciale, pecorino e tuorlo d’uovo.',
        'Receta clásica con guanciale, pecorino y yema de huevo.',
        '经典做法，搭配猪颊肉、佩科里诺芝士和蛋黄。',
        'グアンチャーレ、ペコリーノ、卵黄を使った定番料理。',
        'Klassisches Rezept mit Guanciale, Pecorino und Eigelb.',
    ],
    'Lasagna alla Napoletana': [
        'Layers of pasta, ragù, mozzarella and ricotta.',
        'Couches de pâte, ragù, mozzarella et ricotta.',
        'Strati di pasta, ragù, mozzarella e ricotta.',
        'Capas de pasta, ragú, mozzarella y ricotta.',
        '层叠意面，搭配肉酱、马苏里拉和乳清芝士。',
        'パスタ、ラグー、モッツァレラ、リコッタの重ね焼き。',
        'Nudelschichten mit Ragù, Mozzarella und Ricotta.',
    ],
    'Ravioli di Ricotta e Spinaci': [
        'Pasta filled with ricotta, served with butter and sage.',
        'Pâtes farcies à la ricotta, beurre et sauge.',
        'Pasta ripiena di ricotta, con burro e salvia.',
        'Pasta rellena de ricotta, con mantequilla y salvia.',
        '乳清芝士馅意面，搭配黄油和鼠尾草。',
        'リコッタ入りラビオリ、バターとセージ添え。',
        'Ricotta-gefüllte Pasta mit Butter und Salbei.',
    ],
    'Gnocchi alla Sorrentina': [
        'Potato gnocchi baked with tomato sauce and mozzarella.',
        'Gnocchis de pommes de terre gratinés à la tomate et mozzarella.',
        'Gnocchi di patate al forno con pomodoro e mozzarella.',
        'Ñoquis de patata gratinados con tomate y mozzarella.',
        '土豆团子焗番茄酱和马苏里拉芝士。',
        'ジャガイモのニョッキ、トマトソースとモッツァレラのオーブン焼き。',
        'Kartoffelgnocchi mit Tomatensauce und Mozzarella überbacken.',
    ],
    'Fettuccine ai Frutti di Mare': [
        'Fresh pasta with seafood sautéed in white wine.',
        'Pâtes fraîches aux fruits de mer sautés au vin blanc.',
        'Pasta fresca con frutti di mare saltati al vino bianco.',
        'Pasta fresca con mariscos salteados al vino blanco.',
        '鲜意面配白葡萄酒炒海鲜。',
        '白ワインでソテーした魚介のフレッシュパスタ。',
        'Frische Pasta mit in Weißwein sautierten Meeresfrüchten.',
    ],
    'Margherita': [
        'San Marzano tomato sauce, fior di latte mozzarella and basil.',
        'Sauce tomate San Marzano, mozzarella fior di latte et basilic.',
        'Pomodoro San Marzano, mozzarella fior di latte e basilico.',
        'Tomate San Marzano, mozzarella fior di latte y albahaca.',
        '圣马扎诺番茄酱、鲜牛乳马苏里拉芝士和罗勒。',
        'サンマルツァーノトマトソース、フィオル・ディ・ラッテ、バジル。',
        'San-Marzano-Tomatensauce, Fior-di-Latte-Mozzarella und Basilikum.',
    ],
    'Marinara': [
        'Tomato sauce, garlic, oregano and extra-virgin olive oil.',
        'Sauce tomate, ail, origan et huile d’olive extra vierge.',
        'Pomodoro, aglio, origano e olio extravergine d’oliva.',
        'Tomate, ajo, orégano y aceite de oliva virgen extra.',
        '番茄酱、大蒜、牛至和特级初榨橄榄油。',
        'トマトソース、ニンニク、オレガノ、エクストラバージンオリーブオイル。',
        'Tomatensauce, Knoblauch, Oregano und natives Olivenöl extra.',
    ],
    'Diavola': [
        'Spicy salami, mozzarella and smoked tomato sauce.',
        'Salami piquant, mozzarella et sauce tomate fumée.',
        'Salame piccante, mozzarella e salsa di pomodoro affumicata.',
        'Salami picante, mozzarella y salsa de tomate ahumada.',
        '辣味萨拉米肠、马苏里拉芝士和烟熏番茄酱。',
        '辛口サラミ、モッツァレラ、スモークトマトソース。',
        'Pikante Salami, Mozzarella und geräucherte Tomatensauce.',
    ],
    'Quattro Formaggi': [
        'Gorgonzola, Parmesan, mozzarella and fontina cheeses.',
        'Gorgonzola, parmesan, mozzarella et fontina.',
        'Gorgonzola, Parmigiano, mozzarella e fontina.',
        'Gorgonzola, parmesano, mozzarella y fontina.',
        '戈贡佐拉、帕玛森、马苏里拉和丰蒂娜芝士。',
        'ゴルゴンゾーラ、パルメザン、モッツァレラ、フォンティーナ。',
        'Gorgonzola, Parmesan, Mozzarella und Fontina.',
    ],
    'Prosciutto e Rucola': [
        'Parma ham, arugula and Parmesan.',
        'Jambon de Parme, roquette et parmesan.',
        'Prosciutto di Parma, rucola e Parmigiano.',
        'Jamón de Parma, rúcula y parmesano.',
        '帕尔马火腿、芝麻菜和帕玛森芝士。',
        'パルマハム、ルッコラ、パルメザン。',
        'Parmaschinken, Rucola und Parmesan.',
    ],
    'Capricciosa': [
        'Mushrooms, artichoke, olives and cooked ham.',
        'Champignons, artichaut, olives et jambon cuit.',
        'Funghi, carciofi, olive e prosciutto cotto.',
        'Champiñones, alcachofa, aceitunas y jamón cocido.',
        '蘑菇、洋蓟、橄榄和熟火腿。',
        'キノコ、アーティチョーク、オリーブ、ハム。',
        'Pilze, Artischocken, Oliven und gekochter Schinken.',
    ],
    'Negroni': [
        'Gin, red vermouth and Campari.',
        'Gin, vermouth rouge et Campari.',
        'Gin, vermouth rosso e Campari.',
        'Ginebra, vermut rojo y Campari.',
        '金酒、红味美思和金巴利。',
        'ジン、スイートベルモット、カンパリ。',
        'Gin, roter Wermut und Campari.',
    ],
    'Aperol Spritz': [
        'Aperol, prosecco and sparkling water.',
        'Aperol, prosecco et eau pétillante.',
        'Aperol, prosecco e acqua frizzante.',
        'Aperol, prosecco y agua con gas.',
        '阿佩罗、普罗塞克起泡酒和苏打水。',
        'アペロール、プロセッコ、炭酸水。',
        'Aperol, Prosecco und Sprudelwasser.',
    ],
    'Bellini': [
        'Sparkling wine and peach purée.',
        'Vin pétillant et purée de pêche.',
        'Spumante e purea di pesca.',
        'Vino espumoso y puré de melocotón.',
        '起泡酒和桃泥。',
        'スパークリングワインと桃のピューレ。',
        'Schaumwein und Pfirsichpüree.',
    ],
    'Limoncello Tonic': [
        'Sicilian lemon liqueur, tonic water and mint.',
        'Liqueur de citron sicilien, tonic et menthe.',
        'Liquore al limone siciliano, tonica e menta.',
        'Licor de limón siciliano, tónica y menta.',
        '西西里柠檬利口酒、汤力水和薄荷。',
        'シチリアレモンリキュール、トニックウォーター、ミント。',
        'Sizilianischer Zitronenlikör, Tonic Water und Minze.',
    ],
    'Americano': [
        'Red vermouth, Campari and soda water.',
        'Vermouth rouge, Campari et eau gazeuse.',
        'Vermouth rosso, Campari e soda.',
        'Vermut rojo, Campari y soda.',
        '红味美思、金巴利和苏打水。',
        'スイートベルモット、カンパリ、ソーダ。',
        'Roter Wermut, Campari und Sodawasser.',
    ],
    'Espresso Martini': [
        'Vodka, espresso coffee and vanilla liqueur.',
        'Vodka, café espresso et liqueur de vanille.',
        'Vodka, caffè espresso e liquore alla vaniglia.',
        'Vodka, café espresso y licor de vainilla.',
        '伏特加、意式浓缩咖啡和香草利口酒。',
        'ウォッカ、エスプレッソ、バニラリキュール。',
        'Wodka, Espresso und Vanillelikör.',
    ],
    'Tiramisù Classico': [
        'Mascarpone, coffee and cocoa.',
        'Mascarpone, café et cacao.',
        'Mascarpone, caffè e cacao.',
        'Mascarpone, café y cacao.',
        '马斯卡彭芝士、咖啡和可可。',
        'マスカルポーネ、コーヒー、カカオ。',
        'Mascarpone, Kaffee und Kakao.',
    ],
    'Panna Cotta alla Vaniglia': [
        'Cream, vanilla and fruit sauce.',
        'Crème, vanille et coulis de fruits.',
        'Panna, vaniglia e salsa alla frutta.',
        'Nata, vainilla y salsa de frutas.',
        '奶油、香草和水果酱。',
        'クリーム、バニラ、フルーツソース。',
        'Sahne, Vanille und Fruchtsauce.',
    ],
    'Cannoli Siciliani': [
        'Crisp pastry, sweet ricotta and pistachio.',
        'Pâte croustillante, ricotta sucrée et pistache.',
        'Cialda croccante, ricotta dolce e pistacchio.',
        'Masa crujiente, ricotta dulce y pistacho.',
        '酥脆外皮、甜乳清芝士和开心果。',
        'サクサク生地、甘いリコッタ、ピスタチオ。',
        'Knuspriger Teig, süße Ricotta und Pistazie.',
    ],
    'Affogato al Caffè': [
        'Cream gelato with espresso.',
        'Glace à la crème avec espresso.',
        'Gelato alla crema con espresso.',
        'Helado de crema con espresso.',
        '奶油冰淇淋配意式浓缩咖啡。',
        'クリームジェラートにエスプレッソをかけて。',
        'Sahneeis mit Espresso.',
    ],
    'Torta Caprese': [
        'Soft, rich chocolate and almond cake.',
        'Gâteau moelleux et intense au chocolat et aux amandes.',
        'Torta morbida e intensa al cioccolato e mandorle.',
        'Pastel tierno e intenso de chocolate y almendras.',
        '口感柔软浓郁的巧克力杏仁蛋糕。',
        'しっとり濃厚なチョコレートとアーモンドのケーキ。',
        'Saftiger, kräftiger Schokoladen-Mandel-Kuchen.',
    ],
    'Gelato Artigianale': [
        'Two flavors of our daily-made gelato.',
        'Deux parfums de notre glace préparée chaque jour.',
        'Due gusti del nostro gelato preparato ogni giorno.',
        'Dos sabores de nuestro helado elaborado a diario.',
        '每日制作的手工冰淇淋，可选两种口味。',
        '毎日作るジェラートを2種類お選びいただけます。',
        'Zwei Sorten unseres täglich frisch zubereiteten Gelatos.',
    ],
};

const localizedDishNames = {
    'Caprese di Bufala': ['Buffalo mozzarella Caprese', 'Caprese à la mozzarella de bufflonne', 'Caprese di bufala', 'Caprese de búfala', '水牛芝士卡普雷塞', '水牛モッツァレラのカプレーゼ', 'Caprese mit Büffelmozzarella'],
    'Carpaccio di Manzo': ['Beef carpaccio', 'Carpaccio de bœuf', 'Carpaccio di manzo', 'Carpaccio de ternera', '牛肉卡尔帕乔', '牛肉のカルパッチョ', 'Rindercarpaccio'],
    'Arancini Siciliani': ['Sicilian arancini', 'Arancini siciliens', 'Arancini siciliani', 'Arancini sicilianos', '西西里炸饭团', 'シチリア風アランチーニ', 'Sizilianische Arancini'],
    'Melanzane alla Parmigiana': ['Eggplant Parmesan', 'Aubergine à la parmesane', 'Melanzane alla parmigiana', 'Berenjena a la parmesana', '帕玛森茄子', 'ナスのパルミジャーナ', 'Aubergine alla Parmigiana'],
    'Frittura di Calamari': ['Fried calamari', 'Calamars frits', 'Calamari fritti', 'Calamares fritos', '炸鱿鱼', 'イカフライ', 'Frittierte Calamari'],
    'Tagliatelle alla Bolognese': ['Tagliatelle Bolognese', 'Tagliatelles à la bolognaise', 'Tagliatelle al ragù', 'Tagliatelle a la boloñesa', '博洛尼亚宽面', 'タリアテッレ・ボロネーゼ', 'Tagliatelle Bolognese'],
    'Spaghetti alla Carbonara': ['Spaghetti Carbonara', 'Spaghetti à la carbonara', 'Spaghetti alla carbonara', 'Espaguetis a la carbonara', '卡邦尼意面', 'スパゲッティ・カルボナーラ', 'Spaghetti Carbonara'],
    'Lasagna alla Napoletana': ['Neapolitan lasagna', 'Lasagne napolitaine', 'Lasagna napoletana', 'Lasaña napolitana', '那不勒斯千层面', 'ナポリ風ラザニア', 'Neapolitanische Lasagne'],
    'Ravioli di Ricotta e Spinaci': ['Ricotta and spinach ravioli', 'Raviolis à la ricotta et aux épinards', 'Ravioli ricotta e spinaci', 'Raviolis de ricotta y espinacas', '乳清芝士菠菜馄饨', 'リコッタとほうれん草のラビオリ', 'Ricotta-Spinat-Ravioli'],
    'Gnocchi alla Sorrentina': ['Gnocchi Sorrentina', 'Gnocchis à la sorrentina', 'Gnocchi alla sorrentina', 'Ñoquis a la sorrentina', '索伦托风味土豆团子', 'ニョッキ・アッラ・ソレンティーナ', 'Gnocchi alla Sorrentina'],
    'Fettuccine ai Frutti di Mare': ['Seafood fettuccine', 'Fettuccines aux fruits de mer', 'Fettuccine ai frutti di mare', 'Fettuccine con mariscos', '海鲜宽面', '魚介のフェットチーネ', 'Fettuccine mit Meeresfrüchten'],
    'Prosciutto e Rucola': ['Parma ham and arugula', 'Jambon de Parme et roquette', 'Prosciutto e rucola', 'Jamón de Parma y rúcula', '帕尔马火腿芝麻菜披萨', '生ハムとルッコラ', 'Parmaschinken und Rucola'],
    'Quattro Formaggi': ['Four-cheese pizza', 'Pizza quatre fromages', 'Pizza ai quattro formaggi', 'Pizza cuatro quesos', '四种芝士披萨', 'クアトロ・フォルマッジ', 'Pizza mit vier Käsesorten'],
    'Panna Cotta alla Vaniglia': ['Vanilla panna cotta', 'Panna cotta à la vanille', 'Panna cotta alla vaniglia', 'Panna cotta de vainilla', '香草奶冻', 'バニラのパンナコッタ', 'Vanille-Panna-Cotta'],
    'Cannoli Siciliani': ['Sicilian cannoli', 'Cannoli siciliens', 'Cannoli siciliani', 'Cannoli sicilianos', '西西里奶油卷', 'シチリア風カンノーリ', 'Sizilianische Cannoli'],
    'Torta Caprese': ['Caprese chocolate cake', 'Gâteau caprese au chocolat', 'Torta caprese al cioccolato', 'Tarta caprese de chocolate', '卡普雷塞巧克力蛋糕', 'トルタ・カプレーゼ', 'Torta Caprese mit Schokolade'],
    'Gelato Artigianale': ['Artisan gelato', 'Glace artisanale', 'Gelato artigianale', 'Helado artesanal', '手工意式冰淇淋', '手作りジェラート', 'Hausgemachtes Gelato'],
};

const ingredientTranslations = {
    'Pão rústico tostado': ['Toasted rustic bread', 'Pain rustique grillé', 'Pane rustico tostato', 'Pan rústico tostado', '烤乡村面包', '田舎風トースト', 'Geröstetes Landbrot'],
    'Tomate fresco': ['Fresh tomato', 'Tomate fraîche', 'Pomodoro fresco', 'Tomate fresco', '鲜番茄', 'フレッシュトマト', 'Frische Tomate'],
    'Manjericão': ['Basil', 'Basilic', 'Basilico', 'Albahaca', '罗勒', 'バジル', 'Basilikum'],
    'Azeite': ['Olive oil', 'Huile d’olive', 'Olio d’oliva', 'Aceite de oliva', '橄榄油', 'オリーブオイル', 'Olivenöl'],
    'Mozzarella de búfala': ['Buffalo mozzarella', 'Mozzarella de bufflonne', 'Mozzarella di bufala', 'Mozzarella de búfala', '水牛芝士', '水牛モッツァレラ', 'Büffelmozzarella'],
    'Tomate': ['Tomato', 'Tomate', 'Pomodoro', 'Tomate', '番茄', 'トマト', 'Tomate'],
    'Carne bovina': ['Beef', 'Bœuf', 'Manzo', 'Ternera', '牛肉', '牛肉', 'Rindfleisch'],
    'Rúcula': ['Arugula', 'Roquette', 'Rucola', 'Rúcula', '芝麻菜', 'ルッコラ', 'Rucola'],
    'Parmesão': ['Parmesan', 'Parmesan', 'Parmigiano', 'Parmesano', '帕玛森芝士', 'パルメザン', 'Parmesan'],
    'Alcaparras': ['Capers', 'Câpres', 'Capperi', 'Alcaparras', '酸豆', 'ケッパー', 'Kapern'],
    'Risoto': ['Risotto', 'Risotto', 'Risotto', 'Risotto', '烩饭', 'リゾット', 'Risotto'],
    'Mozzarella': ['Mozzarella', 'Mozzarella', 'Mozzarella', 'Mozzarella', '马苏里拉芝士', 'モッツァレラ', 'Mozzarella'],
    'Ragù': ['Ragù meat sauce', 'Ragù', 'Ragù', 'Ragú', '意式肉酱', 'ラグー', 'Ragù'],
    'Berinjela': ['Eggplant', 'Aubergine', 'Melanzana', 'Berenjena', '茄子', 'ナス', 'Aubergine'],
    'Molho de tomate': ['Tomato sauce', 'Sauce tomate', 'Salsa di pomodoro', 'Salsa de tomate', '番茄酱', 'トマトソース', 'Tomatensauce'],
    'Parmesão': ['Parmesan', 'Parmesan', 'Parmigiano', 'Parmesano', '帕玛森芝士', 'パルメザン', 'Parmesan'],
    'Lulas': ['Squid', 'Calamars', 'Calamari', 'Calamares', '鱿鱼', 'イカ', 'Tintenfisch'],
    'Empanado': ['Breading', 'Panure', 'Panatura', 'Rebozado', '裹粉', '衣', 'Panade'],
    'Limão': ['Lemon', 'Citron', 'Limone', 'Limón', '柠檬', 'レモン', 'Zitrone'],
};

const t = (source) => {
    const locale = localeCodes.includes(document.documentElement.lang)
        ? document.documentElement.lang
        : 'pt-BR';
    return localeMaps[locale].get(source) || source;
};

const translatedValue = (value, locale) => {
    const trimmed = value.trim();
    const map = localeMaps[locale];
    if (locale === 'pt-BR') {
        if (map.has(trimmed)) return map.get(trimmed);
        return [...localeMaps.en.entries()].find(([, translated]) => translated === trimmed)?.[0] || trimmed;
    }
    if (map.has(trimmed)) return map.get(trimmed);
    const portuguese = [...map.entries()].find(([, translated]) => translated === trimmed)?.[0];
    return portuguese ? map.get(portuguese) : trimmed;
};

const translateStaticContent = (locale) => {
    document.documentElement.lang = locale;
    document.querySelectorAll('title, meta[name="description"], meta[property="og:description"], meta[name="twitter:description"]')
        .forEach((element) => {
            const content = element.getAttribute('content');
            if (content) element.setAttribute('content', translatedValue(content, locale));
        });

    const walker = document.createTreeWalker(document.body, NodeFilter.SHOW_TEXT);
    const textNodes = [];
    while (walker.nextNode()) textNodes.push(walker.currentNode);
    textNodes.forEach((node) => {
        const original = node.__menuSourceText || node.textContent.trim();
        if (!node.__menuSourceText) node.__menuSourceText = original;
        const translated = translatedValue(original, locale);
        if (node.textContent.trim() !== translated) node.textContent = node.textContent.replace(node.textContent.trim(), translated);
    });

    document.querySelectorAll('[placeholder], [aria-label], [title], img[alt]').forEach((element) => {
        ['placeholder', 'aria-label', 'title', 'alt'].forEach((attribute) => {
            const value = element.getAttribute(attribute);
            if (value) {
                const key = `__menuSource${attribute}`;
                if (!element[key]) element[key] = value;
                element.setAttribute(attribute, translatedValue(element[key], locale));
            }
        });
    });

    document.querySelectorAll('.card').forEach((card) => {
        const title = card.querySelector('.card-content h2');
        const description = card.querySelector('.descricao');
        if (!title || !description) return;
        if (!card.dataset.originalDishName) card.dataset.originalDishName = title.textContent.trim();
        if (!card.dataset.originalDishDescription) card.dataset.originalDishDescription = description.textContent.trim();
        const originalName = card.dataset.originalDishName;
        const originalDescription = card.dataset.originalDishDescription;
        const localeIndex = localeCodes.indexOf(locale) - 1;
        title.textContent = localeIndex >= 0 ? localizedDishNames[originalName]?.[localeIndex] || originalName : originalName;
        description.textContent = localeIndex >= 0
            ? dishTranslations[originalName]?.[localeIndex] || originalDescription
            : originalDescription;
        const image = card.querySelector('img');
        image.alt = `${title.textContent}. ${description.textContent}`;
    });

    document.querySelectorAll('.card .badge').forEach((badge) => {
        const original = badge.dataset.originalBadge || badge.textContent.trim();
        badge.dataset.originalBadge = original;
        badge.textContent = translatedValue(original, locale);
    });
    document.querySelectorAll('.dietary-badge').forEach((badge) => {
        badge.textContent = t('Sem carne na descrição');
    });
    document.querySelectorAll('.card').forEach((card) => {
        const details = card.querySelector('.demo-dish-details');
        if (!details) return;
        const localeIndex = localeCodes.indexOf(locale) - 1;
        const ingredients = card.dataset.demoIngredients
            ? card.dataset.demoIngredients.split('|')
            : [];
        const translatedIngredients = ingredients.map((ingredient) =>
            localeIndex >= 0 ? ingredientTranslations[ingredient]?.[localeIndex] || ingredient : ingredient);
        const item = details.querySelector('[data-detail="ingredients"]');
        if (item) {
            item.textContent =
                `${t('Ingredientes de exemplo, não verificados')}: ${translatedIngredients.join(', ') || t('A confirmar')}`;
        }
        const portion = details.querySelector('[data-detail="portion"]');
        const spice = details.querySelector('[data-detail="spice"]');
        const nonAlcoholic = details.querySelector('[data-detail="nonalcoholic"]');
        [portion, spice, nonAlcoholic].filter(Boolean).forEach((node) => {
            const sourceText = node.dataset.sourceText || node.textContent;
            const separator = sourceText.indexOf(':');
            node.textContent = separator < 0
                ? translatedValue(sourceText, locale)
                : `${translatedValue(sourceText.slice(0, separator), locale)}: ${translatedValue(sourceText.slice(separator + 1), locale)}`;
        });
    });
    document.dispatchEvent(new CustomEvent('app:localechange', { detail: { locale } }));
};

let selectedLocale = 'pt-BR';
try {
    const savedLocale = localStorage.getItem('la-bella-menu-language');
    if (localeCodes.includes(savedLocale)) selectedLocale = savedLocale;
} catch {
    selectedLocale = 'pt-BR';
}

document.documentElement.lang = selectedLocale;
window.menuI18n = {
    t,
    get locale() {
        return selectedLocale;
    },
    translate(source) {
        return translatedValue(source, selectedLocale);
    },
    translateIngredient(source) {
        const index = localeCodes.indexOf(selectedLocale) - 1;
        return index >= 0 ? ingredientTranslations[source]?.[index] || source : source;
    },
    money(value) {
        return new Intl.NumberFormat(selectedLocale, {
            style: 'currency',
            currency: 'BRL',
        }).format(value);
    },
};

const languageSelect = document.getElementById('language-select');
languageSelect.value = selectedLocale;
languageSelect.addEventListener('change', () => {
    selectedLocale = localeCodes.includes(languageSelect.value) ? languageSelect.value : 'pt-BR';
    try {
        localStorage.setItem('la-bella-menu-language', selectedLocale);
    } catch {
        document.getElementById('search-status').textContent =
            t('A preferência de idioma não pôde ser salva. Ela será usada até fechar esta página.');
    }
    translateStaticContent(selectedLocale);
});

translateStaticContent(selectedLocale);
