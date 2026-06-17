# =============================================================
# STARDIUM - Multi-Stage Dockerfile
# Stage 1: Build the React/Vite frontend
# Stage 2: Run the Flask backend (serves static frontend too)
# =============================================================

# --- Stage 1: Frontend Builder ---
FROM node:20-alpine AS frontend-builder
WORKDIR /app/frontend

# Install dependencies first (layer cache optimization)
COPY Frontend/package*.json ./
RUN npm ci

# Copy source and build
COPY Frontend/ .
RUN npm run build

# --- Stage 2: Python Backend ---
FROM python:3.11-slim

# Set working directory
WORKDIR /app

# Install Python dependencies
COPY Backend/requirements.txt .
RUN pip install --no-cache-dir -r requirements.txt

# Copy all backend source code
COPY Backend/ .

# Copy the compiled React frontend into Flask's static folder
# Flask is configured with static_folder='static', so this is where it looks
COPY --from=frontend-builder /app/frontend/dist ./static

# Cloud Run injects PORT env var; Flask reads it via os.environ.get('PORT', 8080)
EXPOSE 8080

# Run with gunicorn (production-grade WSGI server, already in requirements.txt)
CMD ["gunicorn", "--bind", "0.0.0.0:8080", "--workers", "2", "--timeout", "120", "app:app"]
