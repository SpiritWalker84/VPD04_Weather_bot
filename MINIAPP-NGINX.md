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

## Шаг 3. Запуск Nginx

```bash
docker compose up -d
```

Проверка:

```bash
docker compose ps
curl -k https://193.42.127.176
```

---

## Шаг 4. Открытие в браузере / Mini App

- **HTTP:** http://193.42.127.176  
- **HTTPS:** https://193.42.127.176  

При первом открытии HTTPS браузер покажет предупреждение о самоподписанном сертификате — это нормально, можно принять исключение и продолжить. Для Mini App в Telegram укажите URL: `https://193.42.127.176`.

Убедитесь, что на сервере открыты порты 80 и 443 (фаервол/облачный security group).

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
