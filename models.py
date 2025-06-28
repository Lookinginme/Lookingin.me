# models.py
from flask_sqlalchemy import SQLAlchemy
from datetime import datetime

db = SQLAlchemy()

class Reading(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    sugar_level = db.Column(db.Integer, nullable=False)
    timestamp = db.Column(db.DateTime, default=datetime.utcnow)
    note = db.Column(db.Text)
