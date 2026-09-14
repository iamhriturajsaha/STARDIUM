import pytest
from app import app
import json
@pytest.fixture
def client():
    app.config['TESTING'] = True
    with app.test_client() as client:
        yield client
def test_queues_endpoint(client):
    """Test the /api/queues endpoint returns valid JSON."""
    response = client.get('/api/queues')
    assert response.status_code == 200
    data = json.loads(response.data)
    assert data['status'] == 'success'
    assert 'data' in data
def test_heatmap_endpoint(client):
    """Test the /api/heatmap endpoint returns valid JSON."""
    response = client.get('/api/heatmap')
    assert response.status_code == 200
    data = json.loads(response.data)
    assert data['status'] == 'success'
    assert len(data['data']) > 0
def test_navigate_endpoint(client):
    """Test the /api/navigate POST endpoint."""
    payload = {'start': 'Gate A', 'end': 'Food Court'}
    response = client.post('/api/navigate', 
                           data=json.dumps(payload),
                           content_type='application/json')
    assert response.status_code == 200
    data = json.loads(response.data)
    assert data['status'] == 'success'
    assert 'path' in data
def test_navigate_invalid_payload(client):
    """Test /api/navigate with missing fields returns 400."""
    payload = {'start': 'Gate A'} 
    response = client.post('/api/navigate', 
                           data=json.dumps(payload),
                           content_type='application/json')
    assert response.status_code == 400
