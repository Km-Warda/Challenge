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
    unzip

# Install PHP extensions
RUN docker-php-ext-configure gd --with-freetype --with-jpeg && \
    docker-php-ext-install pdo pdo_mysql gd

# Install Composer
COPY --from=composer:latest /usr/bin/composer /usr/bin/composer

# Copy application code
COPY . .

# Install dependencies via Composer
RUN composer install --no-dev --optimize-autoloader

# Set file permissions
RUN chown -R www-data:www-data /var/www && chmod -R 755 /var/www/storage

# Expose port 8000
EXPOSE 8000

CMD ["php-fpm"]
