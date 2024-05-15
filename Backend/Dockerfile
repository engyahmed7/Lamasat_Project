# Use official PHP image as the base image
FROM php:8.2-fpm

# Install system dependencies
RUN apt-get update && \
    apt-get install -y \
    libzip-dev \
    zip \
    unzip \
    git \
    && docker-php-ext-install pdo_mysql zip

# Enable pdo_mysql extension
RUN docker-php-ext-enable pdo_mysql

# Install Composer
RUN curl -sS https://getcomposer.org/installer | php -- --install-dir=/usr/local/bin --filename=composer

# Set the working directory in the container
WORKDIR /app

# Install dependencies
COPY composer.json composer.lock /app
RUN composer install --no-scripts --no-autoloader

# Copy the rest of the application code
COPY . .

# Generate Composer autoload file
RUN composer dump-autoload

EXPOSE 8000

# Start PHP-FPM server
CMD sleep 20; php artisan migrate; php artisan serve --host=0.0.0.0 --port=8000
