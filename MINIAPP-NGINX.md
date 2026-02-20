# Nginx в Docker для Mini App (IP 193.42.127.176, Ubuntu 24)

Сервер по IP без домена. Let's Encrypt для IP не выдаёт сертификаты, поэтому используется **самоподписанный SSL** (достаточно для Mini App в Telegram, браузер может показать предупреждение при первом открытии).

---

## Требования

- Ubuntu 24
- Docker и Docker Compose (установка ниже)

---

## Шаг 1. Установка Docker (если ещё нет)

```bash
sudo apt update
sudo apt install -y ca-certificates curl
sudo install -m 0755 -d /etc/apt/keyrings
sudo curl -fsSL https://download.docker.com/linux/ubuntu/gpg -o /etc/apt/keyrings/docker.asc
sudo chmod a+r /etc/apt/keyrings/docker.asc
echo "deb [arch=$(dpkg --print-architecture) signed-by=/etc/apt/keyrings/docker.asc] https://download.docker.com/linux/ubuntu noble stable" | sudo tee /etc/apt/sources.list.d/docker.list > /dev/null
sudo apt update
sudo apt install -y docker-ce docker-ce-cli containerd.io docker-buildx-plugin docker-compose-plugin
sudo usermod -aG docker $USER
# Выйти из сессии и зайти снова (или newgrp docker)
```

---

## Шаг 2. Создать самоподписанный сертификат

В корне проекта (где лежит `docker-compose.yml`):

```bash
chmod +x scripts/gen-selfsigned-cert.sh
./scripts/gen-selfsigned-cert.sh
```

Появится папка `certs/selfsigned/` с файлами `fullchain.pem` и `privkey.pem`.

---

## Шаг 3. Запуск Nginx и API

В корне проекта должен быть файл `.env` с ключом `OW_API_KEY` (как для бота) — API погоды для Mini App использует его.

```bash
docker compose up -d --build
```

Поднимаются два контейнера: **api** (Flask, данные погоды) и **nginx** (статика + прокси `/api/`).

Проверка:

```bash
docker compose ps
curl -k https://193.42.127.176:8443
```

---

## Шаг 4. Открытие в браузере / Mini App

В `docker-compose.yml` по умолчанию используются порты **8081** и **8443** (чтобы не конфликтовать с уже занятыми 80/443 на сервере).

- **HTTP:** http://193.42.127.176:8081  
- **HTTPS:** https://193.42.127.176:8443  

При первом открытии HTTPS браузер покажет предупреждение о самоподписанном сертификате — примите исключение. Для Mini App в Telegram укажите URL: `https://193.42.127.176:8443`.

Если порты 80 и 443 на сервере свободны и хотите без номера порта — в `docker-compose.yml` замените `8081:80` и `8443:443` на `80:80` и `443:443`, затем откройте фаервол для 80/443.

Убедитесь, что на сервере открыты порты **8081** и **8443** (фаервол / security group в облаке).

---

## Полезные команды

| Действие        | Команда                      |
|-----------------|------------------------------|
| Запуск          | `docker compose up -d`       |
| Остановка       | `docker compose down`        |
| Логи             | `docker compose logs -f nginx` |
| Перезапуск после смены конфига | `docker compose restart nginx` |

---

## Структура

- Статика Mini App: папка **`miniapp-static/`** — сюда кладите `index.html`, CSS, JS.
- Конфиг Nginx: **`nginx/conf.d/default.conf`** (уже настроен на IP 193.42.127.176).

Сертификат самоподписанный, продлевать не нужно (в скрипте 365 дней, при желании перезапустите скрипт позже).
