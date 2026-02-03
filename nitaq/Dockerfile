FROM richarvey/nginx-php-fpm:latest

COPY . /var/www/html

# Core Image Config
ENV WEBROOT /var/www/html/public
ENV PHP_ERRORS_STDERR 1
ENV RUN_SCRIPTS 1
ENV REAL_IP_HEADER 1

# Laravel Specific Config
ENV APP_ENV production
ENV APP_DEBUG false
ENV LOG_CHANNEL stderr

# This is the "Magic" for Laravel routing in this image
ENV nginx_conf_file /var/www/html/nginx.conf
ENV COMPOSER_ALLOW_SUPERUSER 1

# Run a quick optimization
RUN composer install --no-dev --optimize-autoloader

CMD ["/start.sh"]