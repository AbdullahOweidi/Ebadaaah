FROM richarvey/nginx-php-fpm:latest

# Change this line!
# Use "." because Render is already inside the nitaq folder
COPY . /var/www/html

# Core Image Config
ENV WEBROOT /var/www/html/public
ENV PHP_ERRORS_STDERR 1
ENV RUN_SCRIPTS 1
ENV REAL_IP_HEADER 1

# Laravel Specific Config
ENV APP_ENV production
ENV APP_DEBUG true 
ENV LOG_CHANNEL stderr
ENV COMPOSER_ALLOW_SUPERUSER 1

# Run composer during build now that paths are fixed
RUN composer install --no-dev --optimize-autoloader --ignore-platform-reqs

# Fix Permissions
RUN chown -R www-data:www-data /var/www/html/storage /var/www/html/bootstrap/cache
RUN chmod -R 775 /var/www/html/storage /var/www/html/bootstrap/cache

# Nginx config for routing
ENV nginx_conf_file /var/www/html/conf/nginx.conf

CMD ["/start.sh"]