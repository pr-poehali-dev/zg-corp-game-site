import json
import os
import psycopg2


def handler(event: dict, context) -> dict:
    """Вход пользователя ZG Corp по имени и паролю"""
    cors = {
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Methods": "POST, OPTIONS",
        "Access-Control-Allow-Headers": "Content-Type",
    }

    if event.get("httpMethod") == "OPTIONS":
        return {"statusCode": 200, "headers": cors, "body": ""}

    body = json.loads(event.get("body") or "{}")
    username = (body.get("username") or "").strip()
    password = (body.get("password") or "").strip()

    if not username or not password:
        return {"statusCode": 400, "headers": cors, "body": json.dumps({"error": "Введи имя и пароль"})}

    conn = psycopg2.connect(os.environ["DATABASE_URL"])
    cur = conn.cursor()
    cur.execute(
        "SELECT id, username FROM zg_users WHERE username = '%s' AND password = '%s'" % (
            username.replace("'", "''"),
            password.replace("'", "''"),
        )
    )
    row = cur.fetchone()
    conn.close()

    if not row:
        return {"statusCode": 401, "headers": cors, "body": json.dumps({"error": "Неверное имя или пароль"})}

    return {
        "statusCode": 200,
        "headers": cors,
        "body": json.dumps({"success": True, "id": row[0], "username": row[1]}),
    }
