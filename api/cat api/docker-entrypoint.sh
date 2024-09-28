#!/bin/bash

# Start the Laravel development server in the background
php artisan serve --host=0.0.0.0 --port=8000 &

# Wait for a few seconds to ensure the server has started
sleep 5

# Run the database migrations
php artisan migrate --force

# Keep the container running (in case the migrations complete before serve process)
wait -n
