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
ENV COMPOSER_ALLOW_SUPERUSER 1

# This tells the image to run composer install when the container starts
ENV SKIP_COMPOSER 0
ENV PHP_MEMORY_LIMIT 512M

CMD ["/start.sh"]