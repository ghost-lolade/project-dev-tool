#!/bin/bash

# Run database migrations
php artisan migrate --force

# Seed the database
php artisan db:seed --force

# Start PHP-FPM
exec "$@"
