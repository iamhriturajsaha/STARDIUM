import networkx as nx
import random
from typing import List, Tuple, Dict, Any
def build_stadium_graph() -> nx.Graph:
    """
    Constructs a NetworkX graph representation of the stadium physical topology.
    Nodes include gates, seating zones, food stalls, and amenities.
    Edges contain base_weight representing physical distance.
    Returns:
        nx.Graph: The initialized stadium graph.
    """
    G = nx.Graph()
    nodes: Dict[str, Dict[str, str]] = {
        "Gate A": {"type": "gate"},
        "Gate B": {"type": "gate"},
        "Intersection 1": {"type": "path"},
        "Intersection 2": {"type": "path"},
        "Food Court": {"type": "food"},
        "Burger Stall B": {"type": "food"},
        "Washroom North": {"type": "washroom"},
        "Washroom South": {"type": "washroom"},
        "Zone A Seats": {"type": "seat"},
        "Zone B Seats": {"type": "seat"},
        "VIP Entrance": {"type": "gate"},
        "VIP Lounge": {"type": "hospitality"},
        "Press Box": {"type": "hospitality"},
        "Medical Tent": {"type": "medical"},
        "Home Fan Zone": {"type": "fanzone"},
        "Away Fan Zone": {"type": "fanzone"},
        "Team Store": {"type": "store"}
    }
    for node, attrs in nodes.items():
        G.add_node(node, **attrs)
    edges: List[Tuple[str, str, int]] = [
        ("Gate A", "Intersection 1", 10),
        ("Gate B", "Intersection 2", 15),
        ("Intersection 1", "Intersection 2", 20),
        ("Intersection 1", "Food Court", 5),
        ("Intersection 2", "Burger Stall B", 10),
        ("Food Court", "Washroom North", 8),
        ("Intersection 2", "Washroom South", 5),
        ("Washroom North", "Zone A Seats", 15),
        ("Washroom South", "Zone B Seats", 25),
        ("Intersection 1", "Zone A Seats", 30), 
        ("Zone A Seats", "Zone B Seats", 40),
        ("VIP Entrance", "VIP Lounge", 5),
        ("VIP Lounge", "Zone A Seats", 10),
        ("VIP Lounge", "Press Box", 5),
        ("Gate A", "Home Fan Zone", 12),
        ("Home Fan Zone", "Team Store", 10),
        ("Team Store", "Food Court", 15),
        ("Gate B", "Away Fan Zone", 15),
        ("Away Fan Zone", "Intersection 2", 10),
        ("Intersection 1", "Medical Tent", 20),
        ("Medical Tent", "Washroom North", 10)
    ]
    for u, v, w in edges:
        G.add_edge(u, v, base_weight=w)
    return G
G = build_stadium_graph()
def get_live_density_weight(u: str, v: str) -> int:
    """
    Calculates the dynamic crowd penalty for a specific edge.
    In production, this would pull from computer vision sensors or IoT beacons.
    Args:
        u: Source node
        v: Destination node
    Returns:
        int: The crowd penalty weight.
    """
    path = {u, v}
    if {"Intersection 1", "Zone A Seats"}.issubset(path):
        return 50  
    elif {"Food Court", "Washroom North"}.issubset(path):
        return 10 
    else:
        return random.randint(0, 5)
def get_optimal_path(start: str, end: str) -> Tuple[List[str], float, int]:
    """
    Calculates the most efficient path between two stadium nodes using Dijkstra's Algorithm.
    The algorithm is crowd-aware, balancing physical distance against real-time density.
    Args:
        start: Starting location name.
        end: Destination location name.
    Returns:
        Tuple containing:
        - List[str]: The sequence of node names in the optimal path.
        - float: The total calculated weight (cost) of the path.
        - int: "Stardium Points" rewarded for avoiding congestion.
    """
    if start not in G or end not in G:
        return [], 0, 0 
    for u, v, data in G.edges(data=True):
        live_density_penalty = get_live_density_weight(u, v)
        G[u][v]['weight'] = data['base_weight'] + live_density_penalty
    try:
        standard_path = nx.shortest_path(G, source=start, target=end, weight='base_weight')
        path = nx.shortest_path(G, source=start, target=end, weight='weight')
        total_weight = nx.shortest_path_length(G, source=start, target=end, weight='weight')
        earned_points = 0
        if path != standard_path:
            standard_crowd_penalty = sum(G[standard_path[i]][standard_path[i+1]]['weight'] - G[standard_path[i]][standard_path[i+1]]['base_weight'] for i in range(len(standard_path)-1))
            optimal_crowd_penalty = sum(G[path[i]][path[i+1]]['weight'] - G[path[i]][path[i+1]]['base_weight'] for i in range(len(path)-1))
            avoided = standard_crowd_penalty - optimal_crowd_penalty
            if avoided > 0:
                earned_points = int(avoided * 2)  
        return path, total_weight, earned_points
    except nx.NetworkXNoPath:
        return [], 0, 0
