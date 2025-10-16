#!/bin/bash

# Database Setup Script for YegnaBiz
echo "Setting up PostgreSQL database for YegnaBiz..."

# Check if PostgreSQL is installed
if ! command -v psql &> /dev/null; then
    echo "PostgreSQL is not installed. Please install PostgreSQL 15 or later."
    echo "You can install it from: https://www.postgresql.org/download/"
    echo "Or use Docker: docker run -d --name yegnabiz-postgres -e POSTGRES_DB=yegnabiz -e POSTGRES_USER=username -e POSTGRES_PASSWORD=password -p 5432:5432 postgres:15"
    exit 1
fi

# Create database if it doesn't exist
echo "Creating database 'yegnabiz'..."
createdb -U postgres yegnabiz || echo "Database may already exist"

# Run migrations
echo "Running database migrations..."
psql -U postgres -d yegnabiz -f scripts/01-create-tables.sql

# Run seed data
echo "Seeding database with sample data..."
psql -U postgres -d yegnabiz -f scripts/02-seed-data.sql

echo "Database setup complete!"
echo ""
echo "Your database is ready to use:"
echo "- Database: yegnabiz"
echo "- User: username"
echo "- Password: password"
echo "- Host: localhost:5432"
echo ""
echo "Update your .env file with the correct DATABASE_URL:"
echo "DATABASE_URL=postgresql://username:password@localhost:5432/yegnabiz"
