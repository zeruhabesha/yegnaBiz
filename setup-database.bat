@echo off
echo Setting up PostgreSQL database for YegnaBiz...

REM Check if PostgreSQL is installed
psql --version >nul 2>&1
if errorlevel 1 (
    echo PostgreSQL is not installed. Please install PostgreSQL 15 or later.
    echo You can install it from: https://www.postgresql.org/download/
    echo Or use Docker: docker run -d --name yegnabiz-postgres -e POSTGRES_DB=yegnabiz -e POSTGRES_USER=username -e POSTGRES_PASSWORD=password -p 5432:5432 postgres:15
    pause
    exit /b 1
)

echo Creating database 'yegnabiz'...
createdb -U postgres yegnabiz || echo Database may already exist

echo Running database migrations...
psql -U postgres -d yegnabiz -f scripts/01-create-tables.sql

echo Seeding database with sample data...
psql -U postgres -d yegnabiz -f scripts/02-seed-data.sql

echo Database setup complete!
echo.
echo Your database is ready to use:
echo - Database: yegnabiz
echo - User: username
echo - Password: password
echo - Host: localhost:5432
echo.
echo Update your .env file with the correct DATABASE_URL:
echo DATABASE_URL=postgresql://username:password@localhost:5432/yegnabiz
echo.
pause
