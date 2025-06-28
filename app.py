from flask import Flask, render_template, request, redirect, url_for
import os
from python.generate_mp3 import generate_nurse_betty_mp3
from models import db, Reading  # ✅ Import DB model

app = Flask(__name__)

# ===== CONFIG =====
# ✅ Use PostgreSQL on Render, fallback to SQLite locally
app.config['SQLALCHEMY_DATABASE_URI'] = os.environ.get('DATABASE_URL', 'sqlite:///sugar_data.db')
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False
db.init_app(app)

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

@app.route('/ai_checker', methods=['GET', 'POST'])
def ai_checker():
    result = None
    message = ""
    if request.method == 'POST':
        image_file = request.files['image']
        if image_file:
            image_path = os.path.join('static/uploads', image_file.filename)
            image_file.save(image_path)

            # OCR extract
            from PIL import Image
            import pytesseract
            import re
            extracted_text = pytesseract.image_to_string(Image.open(image_path))
            match = re.search(r'\b\d{2,3}\b', extracted_text)
            if match:
                result = match.group()
                sugar = int(result)
                if sugar < 70:
                    message = "⚠️ Low sugar! Please have a snack and monitor closely."
                elif sugar > 180:
                    message = "⚠️ High sugar detected. Stay calm, hydrate, and follow your care plan."
                else:
                    message = "✅ Great job! Your sugar level looks safe right now."
            else:
                result = "—"
                message = "Hmm… I couldn't find a clear sugar number. Try again with a sharper photo."

    return render_template("ai_checker.html", result=result, message=message)

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

# ===== TRACKER ROUTE =====

@app.route('/tracker', methods=['GET', 'POST'])
def tracker():
    if request.method == 'POST':
        sugar = request.form.get('sugar_level')
        note = request.form.get('note')
        if sugar:
            new_reading = Reading(sugar_level=int(sugar), note=note)
            db.session.add(new_reading)
            db.session.commit()
            return redirect(url_for('tracker'))

    readings = Reading.query.order_by(Reading.timestamp.desc()).all()
    return render_template('tracker.html', readings=readings)

# ===== ENTRY POINT =====

if __name__ == '__main__':
    with app.app_context():
        db.create_all()  # ✅ Create DB tables on startup (only if not existing)
    app.run(debug=True)
