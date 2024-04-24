# Używamy obrazu node:alpine jako bazy dla naszego kontenera
FROM node:alpine

# Ustawiamy /app jako katalog roboczy w naszym kontenerze
WORKDIR /app

# Kopiujemy wszystkie pliki z bieżącego katalogu do /app w kontenerze
COPY . .

# Informujemy Dockera, że nasza aplikacja będzie słuchać na porcie 3005
EXPOSE 3005

# Uruchamiamy naszą aplikację za pomocą polecenia "node server.mjs"
CMD ["node", "server.mjs"]