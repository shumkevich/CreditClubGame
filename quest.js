const questData = {
    // ================== БЛОК 1: ПРИВЕТСТВИЕ ==================
    "start": {
        "text": "Привет, [PLAYER_NAME]!\n Меня зовут Мария, я буду твоим наставником.\nДобро пожаловать в команду Кредит.Клаб!\n\nГотов к своей первой сделке?",
        "imageUrl": "images/welcome.jpg",
        "choices": [ { "text": "Я готов!", "next_scene": "block2_intro" } ]
    },

    // ================== БЛОК 2: ИНФОРМАЦИЯ О СДЕЛКЕ ==================
    "block2_intro": {
        "text": "Отлично. У нас есть новый клиент — Тимофей Анатольевич.\n Он немного на взводе и хочет 'как можно быстрее все закончить'.\nНаправляю его данные в чат.",
        "imageUrl": "images/start.jpg",
        "next_scene": "block2_deal_info"
    },
    "block2_deal_info": {
        "text": "[Мария]: \"У нас во вторник (или любой удобный день для клиента) планируется сделка.\nДиапазон времени 09.00-14.00 по МСК\nФИО = Козак Тимофей Анатольевич\nтел = +7 911 454-97-20\nадрес = г Калининград, ул В.Фермора , д 10 , кв 153\nНужно созвониться в ближайшее время с клиентом (ждет звонка) и написать в чат.\"",
        "imageUrl": "images/start1.jpg",
        "next_scene": "block2_call_prompt"
    },
    "block2_call_prompt": {
        "text": "Клиент ждет вашего звонка прямо сейчас!",
        "imageUrl": "images/start2.jpg",
        "choices": [ { "text": "Уже звоню!", "next_scene": "block3_call_question" } ]
    },

    // ================== БЛОК 3: ЗВОНОК КЛИЕНТУ ==================
    "block3_call_question": {
        "text": "Тимофей Анатольевич, здравствуйте! Меня зовут [PLAYER_NAME], у нас с вами назначена сделка. Хотел бы договориться о дате и времени.",
        "imageUrl": "images/call.jpg",
        "choices": [
            { "text": "в субботу в 12.00 мск", "next_scene": "block3_fail1" },
            { "text": "в понедельник в 18.00 мск", "next_scene": "block3_fail2" },
            { "text": "в понедельник в 12.00 мск", "next_scene": "block3_success" }
        ]
    },
    "block3_fail1": { "text": "К сожалению, мы не работаем по выходным. Попробуй еще раз", "imageUrl": "images/fail.jpg", "choices": [{ "text": "Попробовать еще раз", "next_scene": "block2_deal_info" }] },
    "block3_fail2": { "text": "К сожалению, ты указал не верный диапазон времени. Обрати внимание на сообщение в чате и попробуй еще раз", "imageUrl": "images/fail.jpg", "choices": [{ "text": "Попробовать еще раз", "next_scene": "block2_deal_info" }] },
    "block3_success": { "text": "[Тимофей Анатольевич]: \"Да конечно, удобно\"", "imageUrl": "images/call.jpg", "next_scene": "block3_end_call" },
    "block3_end_call": { "text": "[PLAYER_NAME]: Договорились! До встречи!", "imageUrl": "images/call.jpg", "next_scene": "block4_question" },

    // ================== БЛОК 4: ОТЧЕТ В ЧАТ ==================
    "block4_question": {
        "text": "Вы попрощались и положили трубку. Что дальше?",
        "imageUrl": "images/start1.jpg",
        "choices": [
            { "text": "Сообщу в чат о назначенном времени", "next_scene": "block4_success" },
            { "text": "Буду ждать документы", "next_scene": "block4_fail" },
            { "text": "Ничего", "next_scene": "block4_fail" }
        ]
    },
    "block4_fail": { "text": "Не забудь написать в чат! Мы должны подготовиться.", "imageUrl": "images/fail.jpg", "choices": [{ "text": "Попробовать еще раз", "next_scene": "block4_question" }] },
    "block4_success": { "text": "[Мария]: \"Спасибо. Готовим документы\"", "imageUrl": "images/docs3.jpg", "next_scene": "block4_info" },
    "block4_info": { "text": "[Мария]: \"Документы для сделки готовы, можно печатать. Документа всего два для печати - Заявление-анкета (1 экз) и Заявление на КЭП (2 экз). Также в приложении вы найдете чек-лист для видеозаписи подписания. Как будете выезжать к клиенту - просьба ему написать или позвонить, сообщить что выехали и ориентировочное время прибытия\"", "imageUrl": "images/docs4.jpg", "choices": [{ "text": "Конечно!", "next_scene": "block5_intro" }] },

    // ================== БЛОК 5: ПЕЧАТЬ ДОКУМЕНТОВ ==================
    "block5_intro": { "text": "[Мария]: \"Документы для сделки в вашем приложении. Чтобы получить документы для сделки, откройте приложение Credit.Club Agent → выберите заявку → в разделе 'Документы' нажмите 'Отправить себе на почту'\"", "imageUrl": "images/print.jpg", "next_scene": "block5_check" },
    "block5_check": { "text": "[Мария]: \"Проверили ли все документы по чек листу?\"", "imageUrl": "images/print.jpg", "choices": [{ "text": "Да!", "next_scene": "block6_question" }] },
    
    // ================== БЛОК 6: ПРОВЕРКА ЗА СУТКИ ==================
    "block6_question": {
        "type": "checkbox", "text": "За сутки до встречи, что вы должны сделать?", "imageUrl": "images/check.jpg",
        "choices": [
            { "text": "проверить, что новых сообщений в чате нет", "correct": true },
            { "text": "проверить целостность документов и возможные ошибки", "correct": true },
            { "text": "позвонить клиенту и подтвердить встречу", "correct": true },
            { "text": "написать в чат что встреча в силе", "correct": true }
        ],
        "next_scene_success": "block7_intro", "next_scene_fail": "block6_fail"
    },
    "block6_fail": { "text": "Нужно сделать всё из перечисленного! Каждый пункт важен.", "imageUrl": "images/fail.jpg", "choices": [{ "text": "Попробовать еще раз", "next_scene": "block6_question" }] },

    // ================== БЛОК 7: ВЫЕЗД И ФОТО ОБЪЕКТА ==================
    "block7_intro": {
        "text": "[Мария]: \"Как будете на месте, первым делом ждем фотографии объекта. Загружайте в приложение агента (Шаг 1). И сообщите нам в чат, чтобы мы проверили\"",
        "imageUrl": "images/photohouse.jpg",
        "choices": [
            { "text": "Да конечно!", "next_scene": "block7_fail" },
            { "text": "Клиенту позвонил, он ждет, выезжаю!", "next_scene": "block7_on_site" }
        ]
    },
    "block7_fail": { "text": "А клиент вас ждет? Набирали за час?", "imageUrl": "images/fail.jpg", "choices": [{ "text": "Попробовать еще раз", "next_scene": "block7_intro" }] },
    "block7_on_site": { "text": "[PLAYER_NAME]: Хорошо, я на месте. Начинаю фотографировать.", "imageUrl": "images/photohouse1.jpg", "next_scene": "block7_checklist1" },
    "block7_checklist1": {
        "type": "checkbox", "text": "[Мария]: \"Помнишь какие фото нужно сделать снаружи?\"", "imageUrl": "images/photohouse2.jpg",
        "choices": [
            { "text": "фото двора", "correct": true },
            { "text": "фото снаружи (дом должен входить полностью)", "correct": true },
            { "text": "фото таблички с адресом дома", "correct": true },
            { "text": "фото подъезда с улицы и внутри", "correct": true },
            { "text": "лестничная площадка, почтовые ящики, лифт", "correct": true },
            { "text": "входная дверь квартиры снаружи и внутри", "correct": true }
        ],
        "next_scene_success": "block7_checklist2", "next_scene_fail": "block7_checklist1_fail"
    },
    "block7_checklist1_fail": { "text": "[PLAYER_NAME] Нужно сфотографировать всё! Это важно для оценки.", "imageUrl": "images/fail.jpg", "choices": [{ "text": "Попробовать еще раз", "next_scene": "block7_checklist1" }] },
    "block7_checklist2": {
        "type": "checkbox", "text": "[Мария]: \"[PLAYER_NAME], Вас встречает Тимофей Анатольевич. Что фотографируем внутри?\"", "imageUrl": "images/photohouse2.jpg",
        "choices": [
            { "text": "все помещения по 2 фотографии", "correct": true },
            { "text": "вид из окна, из каждой комнаты", "correct": true },
            { "text": "фото кухни с разных ракурсов + вентиляция", "correct": true },
            { "text": "санузел несколько фотографий + вентиляция", "correct": true },
            { "text": "все что покажется важным", "correct": true }
        ],
        "next_scene_success": "block7_upload", "next_scene_fail": "block7_checklist2_fail"
    },
    "block7_checklist2_fail": { "text": "Важна каждая мелочь! Подумай еще раз", "imageUrl": "images/fail.jpg", "choices": [{ "text": "Попробовать еще раз", "next_scene": "block7_checklist2" }] },
    "block7_upload": { "text": "[PLAYER_NAME]: Фото объекта загрузил в Шаг 1", "imageUrl": "images/photohouse2.jpg", "next_scene": "block8_intro" },
    
    // ================== БЛОК 8: ФОТО ДОКУМЕНТОВ И ОЦЕНКА ==================
    "block8_intro": { "text": "[Мария]: \"Отлично, ожидаем проверки объекта нашими юристами. Пока можно фотографировать все документы клиента. Паспорт (все страницы), селфи с паспортом, снилс, документы по объекту. Загрузите фотографии в приложение (Шаг 2).\"", "imageUrl": "images/photodocs.jpg", "choices": [{ "text": "Фото документов загрузил в Шаг 2", "next_scene": "block8_assessment_prompt" }] },
    "block8_assessment_prompt": { "text": "[Мария]:\"В чат сделки напишите своё мнение о клиенте и квартире — это важно.\"\n\n(Вы вспоминаете признаки неблагонадежного клиента и делаете вывод)", "imageUrl": "images/photodocs.jpg", "choices": [{ "text": "Написать мнение в чат", "next_scene": "block8_assessment_choice" }] },
    "block8_assessment_choice": {
        "text": "Признаки неблагонадёжного клиента:\nНеопрятный вид, запах алкоголя, дрожащие руки, путается в ответах, торопится подписать, не может объяснить цель займа и т.д.",
        "imageUrl": "images/photodocs.jpg",
        "choices": [
            { "text": "[Сообщение]: Клиент ок. Объект удовлетворительно", "next_scene": "block8_success" }
        ]
    },
    "block8_success": { "text": "[Юрист 1]: Добрый день, состояние объекта удовлетворительное. Фото документов соответствует. Продолжаем", "imageUrl": "images/photodocs.jpg", "next_scene": "block9_intro" },
    
    // ================== БЛОК 9: ВЫПУСК КЭП ==================
    "block9_intro": { "text": "[Мария]: \"Теперь подпишите пожалуйста с клиентом заявление на выпуск КЭП \n и пришлите нам 2 фотографии в приложение (шаг 3).\"", "imageUrl": "images/sign.jpg", "next_scene": "block9_info1" },
    "block9_info1": { "text": "Клиент ставит 3 подписи в документе. Вы делаете фото клиента с первой страницей заявления и отправляете в приложение.", "imageUrl": "images/sign2.png", "choices": [{ "text": "Загрузил в Шаг 3", "next_scene": "block9_signme_prompt" }] },
    "block9_signme_prompt": { "text": "[Мария]: \"Теперь перейдите к выпуску КЭП в приложении SignMe, вход через сканирование QR-кода на заявлении. Главное, чтобы клиент указал свой номер +7 911 454-97-20. Как дойдете до шага 'Ожидание подтверждения личности', сообщите в чат\"", "imageUrl": "images/sign3.jpg", "next_scene": "block9_signme_info" },
    "block9_signme_info": { "text": "Клиент открывает приложение SignMe, сканирует QR-код, устанавливает пин-код. Появляется экран ожидания подтверждения личности.", "imageUrl": "images/sign4.jpg", "choices": [{ "text": "[Сообщение]: Ожидаем подтверждения личности", "next_scene": "block9_continue_kep" }] },
    "block9_continue_kep": { "text": "[Мария]: \"Можно продолжать выпуск КЭП. Напишите, как закончите\"", "imageUrl": "images/sign5.jpg", "next_scene": "block9_finish_kep" },
    "block9_finish_kep": { "text": "Вы нажимаете «Обновить». Клиент создает ключ и подписывает сертификат. КЭП готова к работе.", "imageUrl": "images/sign5.jpg", "choices": [{ "text": "[Сообщение]: Готово", "next_scene": "block9_success" }] },
    "block9_success": { "text": "[Мария]: \"КЭП выпущен\"", "imageUrl": "images/sign5.jpg", "next_scene": "block10_intro" },

    // ================== БЛОК 10: ПОДПИСАНИЕ АНКЕТЫ ==================
    "block10_intro": { "text": "[Мария]: \"Теперь можете подписать с клиентом анкету-заявление и загрузить в шаг 3\"\n\nОбратите внимание, что здесь необходимо заполнить:\n- «ФИО клиента» (полностью)\n- «Наличие ограничений/обременений»\n- галочку в графе «Согласен» и подпись клиента\n- Вашу ФИО и подпись, [PLAYER_NAME].", "imageUrl": "images/signdocs.jpg", "choices": [{ "text": "Подписано и отправлено в Шаг 3", "next_scene": "block11_intro" }] },
    
    // ================== БЛОК 11: ОПЛАТА ВЗНОСОВ ==================
    "block11_intro": { "text": "[Мария]: \"Клиент должен оплатить по 50р в КПК и в Процент через QR-коды в вашем приложении и отправить чеки на почту info@credit.club.\"", "imageUrl": "images/fee.jpg", "next_scene": "block11_info" },
    "block11_info": { "text": "Как выглядит процесс:\n1. Клиент сканирует QR-код для КПК, оплачивает 50р, отправляет чек на почту.\n2. Клиент сканирует QR-код для АФГ, оплачивает 50р, отправляет чек на почту.", "imageUrl": "images/fee1.jpg", "choices": [{ "text": "[Сообщение]: Оплатили. Чеки направили", "next_scene": "block11_success" }] },
    "block11_success": { "text": "[Мария]: \"Чеки получены. Спасибо!\"", "imageUrl": "images/fee1.jpg", "next_scene": "block12_intro" },

    // ================== БЛОК 12: ЭЛЕКТРОННОЕ ПОДПИСАНИЕ ==================
    "block12_intro": { "text": "[Мария]: \"Формируем документы на подпись. Подписание проводится под видеозапись. На видео необходимо произнести номер договора, дату, стороны, сумму. Документы появятся в личном кабинете через 10 минут.\"", "imageUrl": "images/electronicsign.jpg", "choices": [{ "text": "Ожидаем", "next_scene": "block12_sign_prompt" }] },
    "block12_sign_prompt": { "text": "[Мария]: \"Клиент может подписывать документы в личном кабинете под видеозапись. Для этого нужно зайти в приложение Credit.Club Деньги → Документы → Подписать. Затем открыть приложение Sign.Me.\"", "imageUrl": "images/electronicsign.jpg", "next_scene": "block12_signme_info" },
    "block12_signme_info": { "text": "Инструкция для Sign.Me:\n1. В меню выбрать Входящие запросы\n2. Нажать на пакет документов\n3. Выбрать сертификат для подписи\n4. Передвинуть ползунок подписи вправо", "imageUrl": "images/electronicsign.jpg", "next_scene": "block12_checklist_prompt" },
    "block12_checklist_prompt": { "text": "В видео должно быть четко видно лицо клиента. Используйте ваш чек-лист с текстом.", "imageUrl": "images/electronicsign.jpg", "choices": [{ "text": "Далее к чек-листу", "next_scene": "block12_checklist" }] },
    "block12_checklist": { "text": "Чек-лист видеозаписи:\nСегодня [Дата]\nПодписываются: договор займа, залога, график платежей...\nСтороны: КПК \"Фонд Ипотечного Кредитования\" и [ФИО Клиента]\nПодписание происходит посредством КЭП.\nСумма займа — [Сумма]\n[ФИО Клиента], если изучили условия и нет вопросов, можно подписывать.", "imageUrl": "images/electronicsign.jpg", "choices": [{ "text": "Отправить готовое видео в чат", "next_scene": "block13_intro" }] },

    // ================== БЛОК 13: ПОДПИСЬ ДЛЯ РОСРЕЕСТРА ==================
    "block13_intro": { "text": "[Мария]: \"Готовим заявление на подпись в Росреестр. Сообщу как можно будет подписывать\"\n\n(проходит пара минут)", "imageUrl": "images/lastsign.jpg", "choices": [{ "text": "Ожидаем", "next_scene": "block13_sign_prompt" }] },
    "block13_sign_prompt": { "text": "[Мария]: \"Теперь клиент может подписывать заявление в Росреестр в SignMe. Алгоритм такой же (без видео)\"", "imageUrl": "images/lastsign.jpg", "choices": [{ "text": "Клиент подписал", "next_scene": "block13_end_deal" }] },
    "block13_end_deal": { "text": "[Мария]: \"Сделка окончена, можно прощаться с клиентом. Всем спасибо!\"", "imageUrl": "images/byebye.png", "choices": [{ "text": "Спасибо", "next_scene": "block14_faq" }] },
    
    // ================== БЛОК 14: ЧАСТЫЕ ВОПРОСЫ ==================
    "block14_faq": {
        "text": "Частые вопросы после сделки от клиента:\n\nКогда я получу деньги?\n- После регистрации обременения в Росреестре (1-3 рабочих дня, но может быть дольше).\n\nКуда обращаться с вопросом?\n- В WhatsApp по ссылке на нашем сайте.\n\nКакой порядок оплаты кредита?\n- За 2-3 дня до списания по графику.",
        "imageUrl": "images/questions.jpg", "choices": [{ "text": "Понял", "next_scene": "block15_final" }]
    },
    
    // ================== БЛОК 15: ЗАВЕРШЕНИЕ ==================
    "block15_final": {
        "text": "[Мария]: \"Отлично, [PLAYER_NAME], сделка окончена. Не забудьте забрать подписанные оригиналы документов. В конце месяца нужно будет отправить все в главный офис. Инструкцию я вышлю позже.\n\nНа этом все! Первая сделка завершена!\"",
        "imageUrl": "images/final.png"
    }
};