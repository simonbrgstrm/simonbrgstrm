FROM jguyomard/hugo-builder AS build
WORKDIR /site
COPY . .
RUN hugo
RUN minify --recursive --verbose \
        --match=\.*.js$ \
        --type=js \
        --output public/ \
        public/

#RUN minify --recursive --verbose \
#        --match=\.*.css$ \
#        --type=css \
#        --output public/ \
#        public/

RUN minify --recursive --verbose \
        --match=\.*.html$ \
        --type=html \
        --output public/ \
        public/

FROM nginx:1.17-alpine
WORKDIR /usr/share/nginx/html
COPY --from=build /site/public .
