FROM richarvey/nginx-php-fpm:latest

# Copy your Laravel subfolder into the container
COPY nitaq /var/www/html

# Image Configuration
ENV WEBROOT /var/www/html/public
ENV PHP_ERRORS_STDERR 1
ENV RUN_SCRIPTS 1
ENV REAL_IP_HEADER 1

# Laravel Configuration
ENV APP_ENV production
ENV APP_DEBUG true 
ENV LOG_CHANNEL stderr
ENV COMPOSER_ALLOW_SUPERUSER 1

# Fix Permissions BEFORE starting the server
RUN chown -R www-data:www-data /var/www/html/storage /var/www/html/bootstrap/cache
RUN chmod -R 775 /var/www/html/storage /var/www/html/bootstrap/cache

# Ensure the Nginx config for routing is used
ENV nginx_conf_file /var/www/html/conf/nginx.conf

CMD ["/start.sh"]