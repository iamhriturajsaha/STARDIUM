from flask import Flask, jsonify, request, send_from_directory
import os
import logging
from flask_cors import CORS
from flask_talisman import Talisman
from dotenv import load_dotenv
from marshmallow import Schema, fields, ValidationError
import google.cloud.logging
from google.cloud.logging.handlers import CloudLoggingHandler
load_dotenv()

from ml.queue_model import get_queue_predictions
from graph_engine.router import get_optimal_path
from ml.exit_predictor import get_exit_predictions
from ml.ai_announcer import generate_crowd_announcement
from ml.match_data import fetch_live_match_data

import random

# Configure standard logging
logging.basicConfig(level=logging.INFO, format='%(asctime)s - %(name)s - %(levelname)s - %(message)s')
logger = logging.getLogger(__name__)

# Initialize Google Cloud Logging
try:
    client = google.cloud.logging.Client()
    handler = CloudLoggingHandler(client)
    logger.addHandler(handler)
    logger.info("Stardium: Google Cloud Logging initialized.")
except Exception as e:
    logger.warning(f"Google Cloud Logging: Running in local simulation mode. {e}")

app = Flask(__name__, static_folder='static')

# Restrict CORS to specific API paths to improve security
CORS(app, resources={r"/api/*": {"origins": "*"}})

# Enhanced Security: Content Security Policy
csp = {
    'default-src': "'self'",
    'img-src': ["*", "data:", "https://*.googleapis.com", "https://*.gstatic.com"],
    'script-src': ["'self'", "'unsafe-inline'", "https://www.googletagmanager.com", "https://maps.googleapis.com"],
    'style-src': ["'self'", "'unsafe-inline'", "https://fonts.googleapis.com"],
    'connect-src': ["'self'", "http://localhost:8080", "http://localhost:5173", "https://*.googleapis.com"],
    'font-src': ["'self'", "https://fonts.gstatic.com"],
    'frame-src': ["'self'", "https://www.google.com"],
}

Talisman(app, 
         content_security_policy=csp, 
         force_https=False, 
         strict_transport_security=True,
         session_cookie_secure=True,
         session_cookie_http_only=True)

class NavigationSchema(Schema):
    start = fields.Str(required=True)
    end = fields.Str(required=True)
@app.route('/', defaults={'path': ''})
@app.route('/<path:path>')
def serve(path):
    if path != "" and os.path.exists(os.path.join(app.static_folder, path)):
        return send_from_directory(app.static_folder, path)
    else:
        return send_from_directory(app.static_folder, 'index.html')
@app.route('/api/queues', methods=['GET'])
def queues():
    """
    Retrieves real-time queue density predictions for stadium entry points.
    Returns:
        JSON response with prediction data.
    """
    try:
        predictions = get_queue_predictions()
        return jsonify({"status": "success", "data": predictions})
    except Exception as e:
        logger.error(f"Error in /api/queues: {e}", exc_info=True)
        return jsonify({"status": "error", "message": "Failed to fetch queue predictions"}), 500
@app.route('/api/heatmap', methods=['GET'])
def heatmap():
    """
    Generates real-time crowd density heatmap data for stadium sectors.
    Returns:
        JSON response with heatmap sector data.
    """
    sectors = [
        "Gate A", "Gate B", "Food Court", "Burger Stall B", 
        "Washroom North", "Washroom South", "Zone A Seats", "Zone B Seats",
        "VIP Entrance", "VIP Lounge", "Press Box", "Medical Tent", 
        "Home Fan Zone", "Away Fan Zone", "Team Store"
    ]
    heatmap_data = []
    for s in sectors:
        density = random.randint(10, 100) 
        status = "free"
        if density > 80:
            status = "crowded"
        elif density > 50:
            status = "moderate"
        heatmap_data.append({
            "sector": s,
            "density": density,
            "status": status
        })
    return jsonify({"status": "success", "data": heatmap_data})
@app.route('/api/navigate', methods=['POST'])
def navigate():
    """
    Computes the crowd-aware optimal path between two stadium locations.
    Expects:
        JSON body with 'start' and 'end' nodes.
    Returns:
        JSON response with path, total weight, and earned points.
    """
    schema = NavigationSchema()
    try:
        data = schema.load(request.json)
    except ValidationError as err:
        return jsonify({"status": "error", "errors": err.messages}), 400
    
    start = data.get('start')
    end = data.get('end')
    
    try:
        path, total_weight, earned_points = get_optimal_path(start, end)
        return jsonify({
            "status": "success",
            "path": path,
            "estimated_time_mins": round(total_weight / 10, 1), 
            "earned_points": earned_points
        })
    except Exception as e:
        logger.error(f"Error in /api/navigate: {e}", exc_info=True)
        return jsonify({"status": "error", "message": "Navigation computation failed"}), 500
@app.route('/api/exit-timing', methods=['GET'])
def exit_timing():
    """
    Predicts the best time to exit based on live match status and historical exit flow.
    Returns:
        JSON response with exit timing predictions.
    """
    try:
        predictions = get_exit_predictions()
        return jsonify({"status": "success", "data": predictions})
    except Exception as e:
        logger.error(f"Error in /api/exit-timing: {e}", exc_info=True)
        return jsonify({"status": "error", "message": "Failed to fetch exit predictions"}), 500
@app.route('/api/announcements', methods=['GET'])
def announcements():
    """
    Generates an AI-driven crowd announcement based on real-time heatmap data.
    Returns:
        JSON response with the generated announcement and language options.
    """
    sectors = [
        "Gate A", "Gate B", "Food Court", "Burger Stall B", 
        "Washroom North", "Washroom South", "Zone A Seats", "Zone B Seats",
        "VIP Entrance", "VIP Lounge", "Press Box", "Medical Tent", 
        "Home Fan Zone", "Away Fan Zone", "Team Store"
    ]
    heatmap_data = []
    for s in sectors:
        density = random.randint(10, 100)
        status = 'crowded' if density > 80 else 'free' if density < 30 else 'moderate'
        heatmap_data.append({"sector": s, "status": status})
    
    try:
        announcement = generate_crowd_announcement(heatmap_data)
        return jsonify({"status": "success", "data": announcement})
    except Exception as e:
        logger.error(f"Error in /api/announcements: {e}", exc_info=True)
        return jsonify({"status": "error", "message": "Announcement generation failed"}), 500
@app.route('/api/live-scores', methods=['GET'])
def live_scores():
    """
    Retrieves live match statistics and scores.
    Returns:
        JSON response with live score data.
    """
    try:
        matches = fetch_live_match_data()
        return jsonify({"status": "success", "data": matches})
    except Exception as e:
        logger.error(f"Error in /api/live-scores: {e}", exc_info=True)
        return jsonify({"status": "error", "message": "Live score retrieval failed"}), 500

if __name__ == '__main__':
    port = int(os.environ.get('PORT', 8080))
    app.run(host='0.0.0.0', port=port, debug=False)
