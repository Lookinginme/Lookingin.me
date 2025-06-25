from flask import Flask, render_template, request, redirect, url_for
import os
from python.generate_mp3 import generate_nurse_betty_mp3

app = Flask(__name__)

# ===== ROUTES =====

@app.route('/')
def home():
    print("🔷 Home page loaded")
    return render_template('main.html')

@app.route('/questionnaire')
def questionnaire():
    print("📄 Questionnaire page loaded")
    return render_template('questionnaire.html')

@app.route('/children')
def children():
    print("🧘 Children's page loaded")
    return render_template('children.html')

@app.route('/foodkourt')
def foodkourt():
    print("🍎 Food Kourt page loaded")
    return render_template('foodkourt.html')

@app.route('/calendar_notepad')
def calendar_notepad():
    print("🗕️ Calendar + Notepad page loaded")
    return render_template('calendar_notepad.html')

@app.route('/calendar_notes')
def calendar_notes():
    print("📝 Calendar Notes page loaded")
    return render_template('calendar_notes.html')

@app.route('/nurse_betty')
def nurse_betty():
    print("💙 Nurse Betty page loaded")
    return render_template('nurse_betty.html')
@app.route('/contact')
def contact():
    return render_template('contact.html')

# ===== MP3 GENERATION =====

@app.route('/generate_mp3', methods=['POST'])
def generate_mp3():
    user_text = request.form.get('mp3text')
    if not user_text:
        user_text = "Hello! I'm Nurse Betty, your kind companion on the diabetes journey."

    try:
        with open("nurse_betty_questions.txt", "a", encoding="utf-8") as f:
            f.write(user_text.strip() + "\n")

        success = generate_nurse_betty_mp3(user_text)
        if success:
            return redirect(url_for('home'))
        else:
            return "❌ MP3 generation failed.", 500
    except Exception as e:
        return f"Server error: {str(e)}", 500

# ===== QUESTIONNAIRE FORM =====

@app.route('/submit_questionnaire', methods=['POST'])
def submit_questionnaire():
    age = request.form.get('age')
    duration = request.form.get('duration')
    support = request.form.get('support')

    try:
        with open("questionnaire_responses.txt", "a", encoding="utf-8") as f:
            f.write(f"Age: {age}\nDuration: {duration}\nSupport Needed: {support}\n---\n")
        return redirect(url_for('questionnaire'))
    except Exception as e:
        return f"Error saving questionnaire: {str(e)}", 500

# ===== ENTRY POINT =====

if __name__ == '__main__':
    app.run(debug=True)
