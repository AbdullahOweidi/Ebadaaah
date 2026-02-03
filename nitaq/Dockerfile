FROM richarvey/nginx-php-fpm:latest

COPY . /var/www/html

# Image Config
ENV WEBROOT /var/www/html/public
ENV PHP_ERRORS_STDERR 1
ENV RUN_SCRIPTS 1
ENV REAL_IP_HEADER 1

# Laravel Config
ENV APP_ENV production
ENV APP_DEBUG false
ENV LOG_CHANNEL stderr

# COMPOSER_ALLOW_SUPERUSER is required to run composer as root
ENV COMPOSER_ALLOW_SUPERUSER 1

CMD ["/start.sh"]
