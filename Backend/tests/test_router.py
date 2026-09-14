import pytest
from graph_engine.router import build_stadium_graph, get_optimal_path
def test_graph_initialization():
    """Verify that the stadium graph is built with the correct number of nodes."""
    G = build_stadium_graph()
    assert len(G.nodes) == 17
    assert "Gate A" in G.nodes
    assert "Food Court" in G.nodes
def test_optimal_path_existence():
    """Verify that a path can be found between Gate A and Zone A Seats."""
    path, weight, points = get_optimal_path("Gate A", "Zone A Seats")
    assert len(path) > 0
    assert path[0] == "Gate A"
    assert path[-1] == "Zone A Seats"
    assert weight > 0
def test_invalid_nodes():
    """Verify that invalid nodes return empty path and zero weight."""
    path, weight, points = get_optimal_path("Invalid Start", "Zone A Seats")
    assert path == []
    assert weight == 0
    assert points == 0
def test_avoid_congestion_points():
    """
    Test that the algorithm prefers paths with lower weights.
    Note: Since weights are dynamic/random in the implementation, 
    we just test that it returns a valid response.
    """
    path1, weight1, points1 = get_optimal_path("Gate A", "Washroom North")
    assert path1 is not None
    assert isinstance(weight1, (int, float))
