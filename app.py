import os
import sqlite3
from datetime import datetime
from functools import wraps
from pathlib import Path
from uuid import uuid4

from flask import (
    Flask,
    flash,
    jsonify,
    redirect,
    render_template,
    request,
    send_from_directory,
    session,
    url_for,
)
from werkzeug.utils import secure_filename


BASE_DIR = Path(__file__).resolve().parent
DATABASE = Path(
    os.environ.get(
        "DATABASE_PATH",
        BASE_DIR / "college_erp.db",
    )
)
UPLOAD_DIR = Path(
    os.environ.get(
        "UPLOAD_DIR",
        BASE_DIR / "uploads",
    )
)
UPLOAD_DIR.mkdir(exist_ok=True)


app = Flask(__name__)

app.secret_key = os.environ.get(
    "SECRET_KEY",
    "temporary-college-erp-showcase",
)

app.config.update(
    MAX_CONTENT_LENGTH=10 * 1024 * 1024,
    SESSION_COOKIE_HTTPONLY=True,
    SESSION_COOKIE_SAMESITE="Lax",
)


USERS = {
    "dean": {
        "password": "1234",
        "role": "Dean",
        "department": None,
        "name": "College Dean",
    },
    "hod_anatomy": {
        "password": "1234",
        "role": "HOD",
        "department": "Anatomy",
        "name": "Anatomy HOD",
    },
    "hod_physiology": {
        "password": "1234",
        "role": "HOD",
        "department": "Physiology",
        "name": "Physiology HOD",
    },
    "hod_biochemistry": {
        "password": "1234",
        "role": "HOD",
        "department": "Biochemistry",
        "name": "Biochemistry HOD",
    },
    "hod_pathology": {
        "password": "1234",
        "role": "HOD",
        "department": "Pathology",
        "name": "Pathology HOD",
    },
    "hod_microbiology": {
        "password": "1234",
        "role": "HOD",
        "department": "Microbiology",
        "name": "Microbiology HOD",
    },
    "hod_pharmacology": {
        "password": "1234",
        "role": "HOD",
        "department": "Pharmacology",
        "name": "Pharmacology HOD",
    },
}


DEPARTMENTS = [
    "Anatomy",
    "Physiology",
    "Biochemistry",
    "Pathology",
    "Microbiology",
    "Pharmacology",
]


ALLOWED_STATUS = {
    "Pending",
    "Received",
    "Under Review",
    "Approved",
    "Rejected",
    "Resolved",
    "Completed",
}


ALLOWED_PRIORITY = {
    "Low",
    "Medium",
    "High",
    "Urgent",
}


def db():
    connection = sqlite3.connect(DATABASE)
    connection.row_factory = sqlite3.Row
    return connection


def init_db():

    with db() as connection:

        connection.executescript(
            """
            CREATE TABLE IF NOT EXISTS complaints (
                id TEXT PRIMARY KEY,
                department TEXT NOT NULL,
                category TEXT NOT NULL,
                subject TEXT NOT NULL,
                priority TEXT NOT NULL,
                status TEXT NOT NULL,
                date TEXT NOT NULL,
                description TEXT NOT NULL,
                remarks TEXT DEFAULT '',
                attachment TEXT DEFAULT ''
            );

            CREATE TABLE IF NOT EXISTS inventory (
                id TEXT PRIMARY KEY,
                department TEXT NOT NULL,
                item TEXT NOT NULL,
                quantity INTEGER NOT NULL,
                priority TEXT NOT NULL,
                status TEXT NOT NULL,
                date TEXT NOT NULL,
                reason TEXT NOT NULL,
                remarks TEXT DEFAULT '',
                attachment TEXT DEFAULT ''
            );
            """
        )

        complaint_exists = connection.execute(
            "SELECT 1 FROM complaints LIMIT 1"
        ).fetchone()

        if not complaint_exists:

            complaints = [
                (
                    "CMP-1001",
                    "Anatomy",
                    "Equipment",
                    "Dissection table maintenance",
                    "Urgent",
                    "Pending",
                    "20/08/2026",
                    "A dissection table requires immediate maintenance.",
                    "",
                    "",
                ),
                (
                    "CMP-1002",
                    "Physiology",
                    "IT",
                    "Laboratory projector not working",
                    "Medium",
                    "Under Review",
                    "19/08/2026",
                    "The projector in the physiology laboratory is not working.",
                    "Technical team has been informed.",
                    "",
                ),
                (
                    "CMP-1003",
                    "Biochemistry",
                    "Maintenance",
                    "Laboratory AC servicing required",
                    "Medium",
                    "Resolved",
                    "18/08/2026",
                    "The laboratory AC unit requires servicing.",
                    "Maintenance completed.",
                    "",
                ),
                (
                    "CMP-1004",
                    "Pathology",
                    "Equipment",
                    "Microscope calibration issue",
                    "High",
                    "Received",
                    "18/08/2026",
                    "Laboratory microscopes require calibration.",
                    "",
                    "",
                ),
                (
                    "CMP-1005",
                    "Microbiology",
                    "Infrastructure",
                    "Water leakage near laboratory",
                    "High",
                    "Under Review",
                    "17/08/2026",
                    "Water leakage was reported near the microbiology laboratory.",
                    "Maintenance department notified.",
                    "",
                ),
                (
                    "CMP-1006",
                    "Pharmacology",
                    "Safety",
                    "Loose electrical wiring",
                    "Urgent",
                    "Received",
                    "20/08/2026",
                    "Loose wiring was found near the pharmacology laboratory.",
                    "Immediate inspection requested.",
                    "",
                ),
            ]

            connection.executemany(
                """
                INSERT INTO complaints
                VALUES (?,?,?,?,?,?,?,?,?,?)
                """,
                complaints,
            )

        inventory_exists = connection.execute(
            "SELECT 1 FROM inventory LIMIT 1"
        ).fetchone()

        if not inventory_exists:

            inventory = [
                (
                    "INV-501",
                    "Anatomy",
                    "Dissection Kit",
                    10,
                    "Urgent",
                    "Pending",
                    "20/08/2026",
                    "Required for anatomy practical sessions.",
                    "",
                    "",
                ),
                (
                    "INV-502",
                    "Physiology",
                    "Digital Spirometer",
                    5,
                    "Medium",
                    "Approved",
                    "19/08/2026",
                    "Required for physiology demonstrations.",
                    "Approved for purchase.",
                    "",
                ),
                (
                    "INV-503",
                    "Microbiology",
                    "Safety Gloves",
                    50,
                    "High",
                    "Received",
                    "18/08/2026",
                    "Required for laboratory practical sessions.",
                    "",
                    "",
                ),
                (
                    "INV-504",
                    "Pharmacology",
                    "Drug Display Trays",
                    8,
                    "High",
                    "Pending",
                    "20/08/2026",
                    "Required for pharmacology demonstrations.",
                    "",
                    "",
                ),
            ]

            connection.executemany(
                """
                INSERT INTO inventory
                VALUES (?,?,?,?,?,?,?,?,?,?)
                """,
                inventory,
            )

        department_migrations = {
            "Hospital": "Anatomy",
            "Computer Department": "Physiology",
            "Mechanical Department": "Biochemistry",
            "Electrical Department": "Pathology",
            "Civil Department": "Microbiology",
        }

        for old_name, new_name in department_migrations.items():

            connection.execute(
                """
                UPDATE complaints
                SET department=?
                WHERE department=?
                """,
                (new_name, old_name),
            )

            connection.execute(
                """
                UPDATE inventory
                SET department=?
                WHERE department=?
                """,
                (new_name, old_name),
            )


def login_required(view):

    @wraps(view)
    def wrapped(*args, **kwargs):

        if "username" not in session:
            return redirect(url_for("login"))

        return view(*args, **kwargs)

    return wrapped


def visible_rows(table):

    department = session.get("department")

    query = f"SELECT * FROM {table}"
    parameters = ()

    if department:

        query += " WHERE department = ?"
        parameters = (department,)

    query += " ORDER BY rowid DESC"

    with db() as connection:

        rows = connection.execute(
            query,
            parameters,
        )

        return [
            dict(row)
            for row in rows
        ]


def save_pdf(file):

    if not file or not file.filename:
        return ""

    if Path(file.filename).suffix.lower() != ".pdf":
        raise ValueError(
            "Only PDF attachments are allowed."
        )

    filename = (
        f"{uuid4().hex}_"
        f"{secure_filename(file.filename)}"
    )

    file.save(
        UPLOAD_DIR / filename
    )

    return filename


def next_id(
    connection,
    table,
    prefix,
    start,
):

    rows = connection.execute(
        f"SELECT id FROM {table}"
    ).fetchall()

    numbers = [
        int(row[0].split("-")[-1])
        for row in rows
        if row[0].split("-")[-1].isdigit()
    ]

    return (
        f"{prefix}-"
        f"{max(numbers, default=start) + 1}"
    )


@app.get("/health")
def health():

    return {
        "status": "ok"
    }


@app.route(
    "/",
    methods=["GET", "POST"],
)
def login():

    if request.method == "POST":

        username = (
            request.form
            .get("username", "")
            .strip()
            .lower()
        )

        password = request.form.get(
            "password",
            "",
        )

        user = USERS.get(username)

        if (
            user
            and user["password"] == password
        ):

            session.clear()

            session.update(
                username=username,
                **user,
            )

            return redirect(
                url_for("dashboard")
            )

        flash(
            "Invalid username or password.",
            "error",
        )

    return render_template(
        "login.html"
    )


@app.get("/dashboard")
@login_required
def dashboard():

    return render_template(
        "dashboard.html",
        complaints=visible_rows(
            "complaints"
        ),
        inventory=visible_rows(
            "inventory"
        ),
        departments=DEPARTMENTS,
        user=session,
    )


@app.post("/api/complaints")
@login_required
def create_complaint():

    try:

        department = (
            session.get("department")
            or request.form.get("department")
        )

        subject = request.form.get(
            "subject",
            "",
        ).strip()

        description = request.form.get(
            "description",
            "",
        ).strip()

        category = request.form.get(
            "category",
            "Other",
        )

        priority = request.form.get(
            "priority",
            "Medium",
        )

        if (
            department not in DEPARTMENTS
            or not subject
            or not description
            or priority not in ALLOWED_PRIORITY
        ):

            return jsonify(
                error="Complete all required fields."
            ), 400

        attachment = save_pdf(
            request.files.get("attachment")
        )

        with db() as connection:

            item_id = next_id(
                connection,
                "complaints",
                "CMP",
                1000,
            )

            connection.execute(
                """
                INSERT INTO complaints
                VALUES (?,?,?,?,?,?,?,?,?,?)
                """,
                (
                    item_id,
                    department,
                    category,
                    subject,
                    priority,
                    "Pending",
                    datetime.now().strftime(
                        "%d/%m/%Y"
                    ),
                    description,
                    "",
                    attachment,
                ),
            )

        return jsonify(
            ok=True,
            message="Complaint created successfully.",
        )

    except ValueError as error:

        return jsonify(
            error=str(error)
        ), 400


@app.post("/api/inventory")
@login_required
def create_inventory():

    try:

        department = (
            session.get("department")
            or request.form.get("department")
        )

        item = request.form.get(
            "item",
            "",
        ).strip()

        reason = request.form.get(
            "reason",
            "",
        ).strip()

        priority = request.form.get(
            "priority",
            "Medium",
        )

        quantity = int(
            request.form.get(
                "quantity",
                "0",
            )
        )

        if (
            department not in DEPARTMENTS
            or not item
            or not reason
            or quantity < 1
            or priority not in ALLOWED_PRIORITY
        ):

            return jsonify(
                error="Complete all required fields."
            ), 400

        attachment = save_pdf(
            request.files.get("attachment")
        )

        with db() as connection:

            item_id = next_id(
                connection,
                "inventory",
                "INV",
                500,
            )

            connection.execute(
                """
                INSERT INTO inventory
                VALUES (?,?,?,?,?,?,?,?,?,?)
                """,
                (
                    item_id,
                    department,
                    item,
                    quantity,
                    priority,
                    "Pending",
                    datetime.now().strftime(
                        "%d/%m/%Y"
                    ),
                    reason,
                    "",
                    attachment,
                ),
            )

        return jsonify(
            ok=True,
            message=(
                "Inventory request "
                "created successfully."
            ),
        )

    except (ValueError, TypeError) as error:

        message = (
            str(error)
            if str(error)
            else "Invalid form values."
        )

        return jsonify(
            error=message
        ), 400


@app.patch(
    "/api/<kind>/<item_id>"
)
@login_required
def update_record(
    kind,
    item_id,
):

    if (
        session.get("role") != "Dean"
        or kind not in {
            "complaints",
            "inventory",
        }
    ):

        return jsonify(
            error="Dean access is required."
        ), 403

    data = (
        request.get_json(silent=True)
        or {}
    )

    status = data.get(
        "status",
        "",
    )

    remarks = str(
        data.get(
            "remarks",
            "",
        )
    ).strip()

    if status not in ALLOWED_STATUS:

        return jsonify(
            error="Invalid status."
        ), 400

    with db() as connection:

        result = connection.execute(
            f"""
            UPDATE {kind}
            SET status=?, remarks=?
            WHERE id=?
            """,
            (
                status,
                remarks,
                item_id,
            ),
        )

    if not result.rowcount:

        return jsonify(
            error="Record not found."
        ), 404

    return jsonify(
        ok=True,
        message=(
            "Record updated successfully."
        ),
    )


@app.delete(
    "/api/<kind>/<item_id>"
)
@login_required
def delete_record(
    kind,
    item_id,
):

    if (
        session.get("role") != "Dean"
        or kind not in {
            "complaints",
            "inventory",
        }
    ):

        return jsonify(
            error="Dean access is required."
        ), 403

    with db() as connection:

        result = connection.execute(
            f"""
            DELETE FROM {kind}
            WHERE id=?
            """,
            (item_id,),
        )

    if not result.rowcount:

        return jsonify(
            error="Record not found."
        ), 404

    return jsonify(
        ok=True,
        message="Record deleted.",
    )


@app.get(
    "/attachments/<path:filename>"
)
@login_required
def attachment(filename):

    return send_from_directory(
        UPLOAD_DIR,
        filename,
        as_attachment=False,
    )


@app.get("/logout")
def logout():

    session.clear()

    return redirect(
        url_for("login")
    )


init_db()


if __name__ == "__main__":

    app.run(
        debug=True,
        host="0.0.0.0",
        port=int(
            os.environ.get(
                "PORT",
                5000,
            )
        ),
    )
