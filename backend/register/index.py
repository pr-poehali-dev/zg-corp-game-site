import json
import os
import psycopg2


MAT_LIST = [
    "хуй", "хуя", "хую", "хуем", "хуе", "хуёв", "хуйня", "пизда", "пизды", "пизде", "пиздой",
    "пиздец", "пиздёж", "ебать", "ёбать", "ебал", "ёбаный", "ёб", "еблан", "ёблан", "блядь",
    "бляди", "блядей", "сука", "суки", "сукой", "мудак", "мудаки", "мудаков", "мудила",
    "залупа", "залупы", "шлюха", "шлюхи", "шлюхой", "ёбнутый", "долбоёб", "долбаёб",
    "долбоеб", "пиздюк", "пиздёнок", "пёздник", "хуесос", "хуесоска", "пиздосос",
    "fuck", "shit", "bitch", "asshole", "cunt", "nigger", "faggot",
]


def contains_mat(text: str) -> bool:
    t = text.lower()
    for word in MAT_LIST:
        if word in t:
            return True
    return False


def handler(event: dict, context) -> dict:
    """Регистрация нового пользователя ZG Corp. v2"""
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
        return {"statusCode": 400, "headers": cors, "body": json.dumps({"error": "Имя и пароль обязательны"})}

    if len(username) < 2 or len(username) > 30:
        return {"statusCode": 400, "headers": cors, "body": json.dumps({"error": "Имя должно быть от 2 до 30 символов"})}

    if len(password) < 4 or len(password) > 50:
        return {"statusCode": 400, "headers": cors, "body": json.dumps({"error": "Пароль должен быть от 4 до 50 символов"})}

    if contains_mat(username) or contains_mat(password):
        return {"statusCode": 400, "headers": cors, "body": json.dumps({"error": "Нецензурные слова запрещены"})}

    conn = psycopg2.connect(os.environ["DATABASE_URL"])
    cur = conn.cursor()

    cur.execute("SELECT id FROM zg_users WHERE username = '%s'" % username.replace("'", "''"))
    if cur.fetchone():
        conn.close()
        return {"statusCode": 409, "headers": cors, "body": json.dumps({"error": "Имя уже занято"})}

    cur.execute(
        "INSERT INTO zg_users (username, password) VALUES ('%s', '%s') RETURNING id" % (
            username.replace("'", "''"),
            password.replace("'", "''"),
        )
    )
    user_id = cur.fetchone()[0]
    conn.commit()
    conn.close()

    return {
        "statusCode": 200,
        "headers": cors,
        "body": json.dumps({"success": True, "id": user_id, "username": username}),
    }