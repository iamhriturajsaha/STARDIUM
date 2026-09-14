import requests
import random
from typing import List, Dict, Any, Optional
def fetch_live_match_data() -> List[Dict[str, Any]]:
    """
    Fetches real-time soccer scoreboard data from ESPN's unofficial public API.
    Returns:
        List[Dict[str, Any]]: A standardized list of live games or high-fidelity mock data.
    """
    try:
        url = "https://site.api.espn.com/apis/site/v2/sports/soccer/eng.1/scoreboard"
        response = requests.get(url, timeout=5)
        data = response.json()
        events = data.get('events', [])
        if not events:
            return get_mock_match_data() 
        livescore_results = []
        for event in events:
            competition = event.get('competitions', [{}])[0]
            status = event.get('status', {}).get('type', {}).get('detail', 'Scheduled')
            competitors = competition.get('competitors', [])
            home_team = next((c for c in competitors if c.get('side') == 'home'), None)
            away_team = next((c for c in competitors if c.get('side') == 'away'), None)
            if (not home_team or not away_team) and len(competitors) >= 2:
                home_team = competitors[0]
                away_team = competitors[1]
            if not home_team or not away_team:
                continue
            h_name = home_team.get('team', {}).get('displayName', home_team.get('team', {}).get('name', 'Home'))
            h_abbr = home_team.get('team', {}).get('abbreviation', h_name[:3].upper())
            a_name = away_team.get('team', {}).get('displayName', away_team.get('team', {}).get('name', 'Away'))
            a_abbr = away_team.get('team', {}).get('abbreviation', a_name[:3].upper())
            if h_abbr == 'HOME' or a_abbr == 'AWAY':
                continue
            livescore_results.append({
                "id": event.get('id'),
                "name": event.get('name', f"{h_name} vs {a_name}"),
                "shortName": event.get('shortName', f"{h_abbr} @ {a_abbr}"),
                "status": status.upper(),
                "clock": event.get('status', {}).get('displayClock', '0\''),
                "home": {
                    "name": h_name,
                    "abbreviation": h_abbr,
                    "score": home_team.get('score', '0'),
                    "logo": home_team.get('team', {}).get('logo')
                },
                "away": {
                    "name": a_name,
                    "abbreviation": a_abbr,
                    "score": away_team.get('score', '0'),
                    "logo": away_team.get('team', {}).get('logo')
                },
                "venue": competition.get('venue', {}).get('fullName', 'STARDIUM ARENA'),
                "is_live": event.get('status', {}).get('type', {}).get('state') == 'in'
            }) 
        if not livescore_results:
            return get_mock_match_data()
        return livescore_results
    except Exception as e:
        print(f"Error fetching live matches: {e}")
        return get_mock_match_data()
def get_mock_match_data() -> List[Dict[str, Any]]:
    """
    Returns high-fidelity mock data for fallback scenarios.
    Returns:
        List[Dict[str, Any]]: A collection of mock football match data.
    """
    return [
        {
            "id": "mock_1",
            "name": "Brazil vs Argentina",
            "shortName": "BRA @ ARG",
            "status": "72' - 2ND HALF",
            "clock": "72'",
            "home": {"name": "Brazil", "abbreviation": "BRA", "score": "2", "logo": None},
            "away": {"name": "Argentina", "abbreviation": "ARG", "score": "1", "logo": None},
            "venue": "Maracanã Stadium // Sector A-01",
            "is_live": True
        },
        {
            "id": "mock_2",
            "name": "Real Madrid vs Manchester City",
            "shortName": "RMA @ MCI",
            "status": "88' - 2ND HALF",
            "clock": "88'",
            "home": {"name": "Real Madrid", "abbreviation": "RMA", "score": "3", "logo": None},
            "away": {"name": "Man City", "abbreviation": "MCI", "score": "3", "logo": None},
            "venue": "Santiago Bernabéu",
            "is_live": True
        },
        {
            "id": "mock_3",
            "name": "Liverpool vs Arsenal",
            "shortName": "LIV @ ARS",
            "status": "FINAL",
            "clock": "90'",
            "home": {"name": "Liverpool", "abbreviation": "LIV", "score": "0", "logo": None},
            "away": {"name": "Arsenal", "abbreviation": "ARS", "score": "1", "logo": None},
            "venue": "Anfield // High Flow",
            "is_live": False
        }
    ]
