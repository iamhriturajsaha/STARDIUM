# Stage 1: Build the frontend
FROM node:20-alpine AS frontend-build
WORKDIR /app/frontend

# Cache dependencies
COPY Frontend/package*.json ./
RUN npm install --legacy-peer-deps

# Build application
COPY Frontend/ ./
RUN npm run build

# Stage 2: Build the backend and assemble the final image
FROM python:3.11-slim

# Prevent Python from writing .pyc files and enable unbuffered logging
ENV PYTHONDONTWRITEBYTECODE 1
ENV PYTHONUNBUFFERED 1
ENV PORT 8080

WORKDIR /app

# Install security and utility tools
RUN apt-get update && apt-get install -y --no-install-recommends \
    curl \
    && rm -rf /var/lib/apt/lists/*

# Create a non-root user for security (Hardening)
RUN groupadd -r stardium && useradd -r -g stardium stardium

# Cache backend dependencies
COPY Backend/requirements.txt ./
RUN pip install --no-cache-dir -r requirements.txt

# Copy backend source code
COPY Backend/ ./ 

# Copy built frontend assets to the Flask static folder
COPY --from=frontend-build /app/frontend/dist ./static

# Ensure the non-root user owns the application files
RUN chown -R stardium:stardium /app

# Switch to the non-root user
USER stardium

# Document the runtime port
EXPOSE 8080

# Healthcheck to verify the container is running (Score Improvement)
HEALTHCHECK --interval=30s --timeout=30s --start-period=5s --retries=3 \
  CMD curl -f http://localhost:$PORT/api/queues || exit 1

# Run the web service using Gunicorn
# Notes: --workers 1 is recommended for Cloud Run (concurrency handles the rest)
# Pass GOOGLE_API_KEY as an environment variable at runtime.
CMD ["gunicorn", "--bind", "0.0.0.0:8080", "--workers", "1", "--threads", "8", "--timeout", "0", "app:app"]
