import random
import os
import google.generativeai as genai
from google.cloud import translate_v2 as translate
def generate_crowd_announcement(heatmap_data):
    """
    Leverages Google Gemini API to generate authoritative natural language 
    suggestions based on real-time crowd data.
    """
    api_key = os.getenv("GOOGLE_API_KEY")
    if not api_key:
        return generate_simulated_announcement(heatmap_data)
    try:
        genai.configure(api_key=api_key)
        model = genai.GenerativeModel('gemini-1.5-flash')
        crowded_zones = [sector['sector'] for sector in heatmap_data if sector['status'] == 'crowded']
        free_zones = [sector['sector'] for sector in heatmap_data if sector['status'] == 'free']
        prompt = (
            f"You are the STARDIUM AI Crowd Controller. "
            f"Current state: Crowded areas: {', '.join(crowded_zones)}. "
            f"Free areas: {', '.join(free_zones)}. "
            "Generate a concise, authoritative public announcement (max 25 words) "
            "to redirect flow and ensure safety."
        )
        response = model.generate_content(prompt)
        announcement_text = response.text.strip()
        translations = {}
        try:
            translate_client = translate.Client()
            for lang in ['es', 'fr']:
                result = translate_client.translate(announcement_text, target_language=lang)
                translations[lang] = result['translatedText']
        except Exception as te:
            print(f"Translation service unavailable: {te}")
            translations = {"es": "Traducción no disponible", "fr": "Traduction non disponible"}
        return {
            "announcement": announcement_text,
            "translations": translations,
            "severity": "high" if len(crowded_zones) > 2 else "medium",
            "provider": "Google Gemini & Cloud Translate"
        }
    except Exception as e:
        print(f"Error calling Gemini API: {e}")
        return generate_simulated_announcement(heatmap_data)
def generate_simulated_announcement(heatmap_data):
    """
    Rule-based fallback announcer.
    """
    crowded_zones = [sector['sector'] for sector in heatmap_data if sector['status'] == 'crowded']
    free_zones = [sector['sector'] for sector in heatmap_data if sector['status'] == 'free']
    if not crowded_zones:
        return {"announcement": "Welcome! All stadium sectors are flowing within nominal parameters.", "severity": "low", "provider": "Deterministic Fallback"}
    crowded_str = ", ".join(crowded_zones)
    templates = [
        f"Critical Update: Congestion detected at {crowded_str}.",
        f"Alert: {crowded_str} are currently over capacity. Follow digital routing."
    ]
    action = ""
    if free_zones:
        free_choose = random.choice(free_zones)
        action = f" Diversion to {free_choose} is recommended for optimal transit."
    else:
        action = " Proceed with caution and maintain spacing."
    final_text = random.choice(templates) + action
    return {
        "announcement": final_text,
        "severity": "high" if len(crowded_zones) > 2 else "medium",
        "provider": "Deterministic Fallback"
    }
