from flask import Blueprint, render_template, redirect, url_for, flash
from HealthSystem.Health.forms import RegisterForm
from HealthSystem.Health.models import db, User
from werkzeug.security import generate_password_hash
import uuid

# Define the blueprint
health_bp = Blueprint('health', __name__, template_folder='../templates')

# Register route
@health_bp.route('/register', methods=['GET', 'POST'])
def register():
    form = RegisterForm()
    if form.validate_on_submit():
        hashed_pw = generate_password_hash(form.password.data)
        new_user = User(
            name=form.name.data,
            email=form.email.data,
            password=hashed_pw,
            pseudonym=f"User-{uuid.uuid4().hex[:6].upper()}"
        )
        db.session.add(new_user)
        db.session.commit()
        flash("Account created!", "success")
        return redirect(url_for('health.login'))  # Will work once login is added
    return render_template('register.html', form=form)
