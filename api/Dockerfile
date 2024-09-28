# Use an official PHP image
FROM php:8.1-fpm

# Set working directory
WORKDIR /var/www

# Install dependencies
RUN apt-get update && apt-get install -y \
    git \
    curl \
    libpng-dev \
    libjpeg-dev \
    libfreetype6-dev \
    zip \
    unzip \
    libxml2-dev   # Added for DOMDocument

# Install PHP extensions
RUN docker-php-ext-configure gd --with-freetype --with-jpeg && \
    docker-php-ext-install pdo pdo_mysql gd dom  # dom extension is included

# Install Composer
COPY --from=composer:latest /usr/bin/composer /usr/bin/composer

# Copy application code
COPY . .

# Install dependencies via Composer
RUN composer install #--no-dev --optimize-autoloader

# Set file permissions
RUN chown -R www-data:www-data /var/www && chmod -R 755 /var/www/storage

#Clear chache
RUN php artisan config:clear

# Expose port 8000
EXPOSE 8000

# Copy entrypoint script
COPY docker-entrypoint.sh /usr/local/bin/docker-entrypoint.sh

# Make the entrypoint script executable
RUN chmod +x /usr/local/bin/docker-entrypoint.sh

# Use the custom entrypoint script
ENTRYPOINT ["docker-entrypoint.sh"]
