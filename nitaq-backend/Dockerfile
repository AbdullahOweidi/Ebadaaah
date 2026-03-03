FROM richarvey/nginx-php-fpm:latest

# Change this line from "COPY nitaq" to "COPY ."
# Since Render is already inside the nitaq folder, "." means "everything here"
COPY . /var/www/html

# Image Configuration
ENV WEBROOT /var/www/html/public
ENV PHP_ERRORS_STDERR 1
ENV RUN_SCRIPTS 1
ENV REAL_IP_HEADER 1

# Laravel Configuration
ENV APP_ENV production
ENV APP_DEBUG false 
ENV LOG_CHANNEL stderr
ENV COMPOSER_ALLOW_SUPERUSER 1


# Install dependencies within the nitaq context
RUN composer install --no-dev --optimize-autoloader --ignore-platform-reqs

# Fix Permissions for Laravel
RUN chown -R www-data:www-data /var/www/html/storage /var/www/html/bootstrap/cache
RUN chmod -R 775 /var/www/html/storage /var/www/html/bootstrap/cache

# Use the Nginx config located in nitaq/conf/nginx.conf
ENV nginx_conf_file /var/www/html/conf/nginx.conf

CMD ["/start.sh"]