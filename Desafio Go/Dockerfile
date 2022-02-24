FROM rhaps1071/golang-1.14-alpine-git as baseGO

WORKDIR /build

COPY . .

#RUN CGO_ENABLED=0 GOARCH=amd64 GOOS=linux go build -ldflags "-s -w -extldflags '-static'" -o ./app

#Em GO, as flags:
# -s e -w removem informação de debug do binário reduzindo o tamanho deste exemplo em .61mb
RUN CGO_ENABLED=0 GOARCH=amd64 GOOS=linux go build -ldflags "-s -w -extldflags '-static'" -o ./app

#Colocamos o binário na pasta ./app do diretóro build e o copiamos para a pasta app do scratch

#--------------------------------------------------------------------------------------------------

FROM scratch

COPY --from=baseGO /build/app /app

ENTRYPOINT [ "/app" ]