import pandas as pd
import numpy as np
import random
from typing import List, Dict, Any
from sklearn.ensemble import RandomForestRegressor as RF
def train_model() -> RF:
    """
    Trains a Random Forest regressor on synthetic crowd density data.
    Returns:
        RF: The trained Scikit-learn model.
    """
    print("Training Queue Predictor Model...")
    data = []
    stalls = [1, 2, 3, 4, 5, 6, 7, 8] 
    for _ in range(500):
        time = random.uniform(10, 22) 
        stall = random.choice(stalls)
        density = random.randint(10, 100) 
        scale = random.choice([1, 2, 3]) 
        base_wait = (density * 0.2) + (scale * 2)
        if stall == 1: base_wait += 5 
        if stall == 3: base_wait -= 2 
        wait = base_wait + random.uniform(-2, 2)
        data.append([time, stall, density, scale, max(0, wait)])
    df = pd.DataFrame(data, columns=['time', 'stall', 'density', 'scale', 'wait'])
    X = df[['time', 'stall', 'density', 'scale']]
    y = df['wait']
    model = RF(n_estimators=10, random_state=42)
    model.fit(X, y)
    return model
_model = train_model()
STALLS = {
    1: {"name": "Burger Stall A", "category": "Food"},
    2: {"name": "Burger Stall B", "category": "Food"},
    3: {"name": "Washroom North", "category": "Facilities"},
    4: {"name": "Matchday Merch", "category": "Retail"},
    5: {"name": "VIP Entrance Turnstiles", "category": "Access"},
    6: {"name": "South Gate Security", "category": "Access"},
    7: {"name": "Away Fan Concessions", "category": "Food"},
    8: {"name": "Medical Tent Intake", "category": "Facilities"}
}
def get_queue_predictions() -> List[Dict[str, Any]]:
    """
    Predicts real-time wait times for all monitored stadium locations.
    Returns:
        List[Dict[str, Any]]: A collection of predicted wait times and recommendations.
    """
    predictions = []
    current_time = 14.5 
    event_scale = 3 
    current_densities = {
        1: 85, 
        2: 20, 
        3: 60,
        4: 45,
        5: 15, 
        6: 92,
        7: 35,
        8: 5
    }
    X_pred = pd.DataFrame([
        [current_time, i, current_densities[i], event_scale] for i in STALLS.keys()
    ], columns=['time', 'stall', 'density', 'scale'])
    waits = _model.predict(X_pred)
    for i, stall_id in enumerate(STALLS.keys()):
        wait_mins = round(waits[i])
        recommendation = None
        if stall_id == 1 and waits[1] < waits[0] - 5: 
            recommendation = f"Try {STALLS[2]['name']} - wait is only {round(waits[1])} mins!"
        if stall_id == 6 and waits[4] < waits[5] - 10: 
            recommendation = f"Warning: High volume! Consider upgrading to VIP Access ({round(waits[4])} min wait)."
        predictions.append({
            "id": stall_id,
            "name": STALLS[stall_id]["name"],
            "category": STALLS[stall_id]["category"],
            "wait_time_mins": wait_mins,
            "density": current_densities[stall_id],
            "recommendation": recommendation,
            "status": "red" if wait_mins > 10 else "yellow" if wait_mins > 5 else "green"
        })
    return predictions
