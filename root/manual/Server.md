На сервере:
Docker compose
FFmpeg

Перейти в директорию от имени суперпользователя:
sudo -i
cd /путь

Поиск файла:
sudo find / -name docker-compose.yml

Остановка текущих контейнеров:
docker compose down

Обновление образов контейнеров:
docker compose pull

Перезапуск контейнеров:
docker compose up -d

Проверка статусов контейнеров:
docker ps

Войти в контейнер:
docker exec -it -u root root-n8n-1 /bin/sh
