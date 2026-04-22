import random
from typing import List, Dict, Any

def get_exit_predictions() -> List[Dict[str, Any]]:
    """
    Simulates a heuristic time-series model predicting congestion at stadium exits.
    Returns optimal stagger times to avoid the rush.
    """
    current_time_offset = 0 
    predictions = [
        {"time_offset_mins": 0, "label": "Leave Now", "predicted_wait_mins": random.randint(3, 8), "status": "green", "recommend": True},
        {"time_offset_mins": 10, "label": "Leave in 10 mins", "predicted_wait_mins": random.randint(15, 25), "status": "yellow", "recommend": False},
        {"time_offset_mins": 20, "label": "End of Event (20 min)", "predicted_wait_mins": random.randint(40, 60), "status": "red", "recommend": False},
        {"time_offset_mins": 45, "label": "Post-game chill (45 min)", "predicted_wait_mins": random.randint(10, 20), "status": "green", "recommend": True}
    ]
    return predictions
