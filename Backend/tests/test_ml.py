import pytest
from ml.queue_model import get_queue_predictions
from ml.exit_predictor import get_exit_predictions
from ml.ai_announcer import generate_simulated_announcement
from ml.match_data import get_mock_match_data
def test_queue_predictions():
    preds = get_queue_predictions()
    assert isinstance(preds, list)
    assert len(preds) > 0
    for p in preds:
        assert "wait_time_mins" in p
        assert "status" in p
def test_exit_predictions():
    preds = get_exit_predictions()
    assert isinstance(preds, list)
    assert len(preds) > 0
    assert "time_offset_mins" in preds[0]
def test_ai_announcer_fallback():
    heatmap_data = [{"sector": "Gate A", "status": "crowded"}]
    announcement = generate_simulated_announcement(heatmap_data)
    assert "announcement" in announcement
    assert "severity" in announcement
def test_match_data_mock():
    data = get_mock_match_data()
    assert isinstance(data, list)
    assert len(data) > 0
    assert "home" in data[0]
    assert "away" in data[0]
