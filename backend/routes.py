from app import app, db
from flask import request, jsonify
from models import Message
from datetime import datetime


# Get all messages
@app.route("/api/messages", methods=["GET"])
def get_all_messages():
    messages = Message.query.all()
    result = [message.to_json() for message in messages]
    return jsonify(result)


# Create message
@app.route("/api/messages", methods=["POST"])
def create_message():
    try:
        data = request.json

        # Simple validation
        required_fields = [
            "authorNickname",
            "authorRole",
            "messageText",
            "authorGender",
        ]
        msg = []
        for field in required_fields:
            if field not in data or not data.get(field):
                msg.append(field)
        if msg:
            return jsonify({"error": f"Missing required fields: {', '.join(msg)}"}), 400

        author_nickname = data.get("authorNickname")
        author_role = data.get("authorRole")
        message_text = data.get("messageText")
        author_gender = data.get("authorGender")

        # Fetch avatar image based on gender
        if data.get("authorImgUrl") is not None:
            author_img_url = data.get("authorImgUrl")
        elif author_gender == "male":
            author_img_url = (
                f"https://avatar.iran.liara.run/public/boy?username={author_nickname}"
            )
        elif author_gender == "female":
            author_img_url = (
                f"https://avatar.iran.liara.run/public/girl?username={author_nickname}"
            )
        else:
            author_img_url = None

        new_message = Message(
            author_nickname=author_nickname,
            author_role=author_role,
            message_text=message_text,
            message_datetime=datetime.now().strftime("%B %d, %Y %H:%M:%S"),
            author_gender=author_gender,
            author_img_url=author_img_url,
        )

        db.session.add(new_message)
        db.session.commit()
        return jsonify(new_message.to_json()), 201
    except Exception as e:
        db.session.rollback()
        return jsonify({"error": str(e)}), 500


# Delete a message
@app.route("/api/messages/<int:id>", methods=["DELETE"])
def delete_message(id):
    try:
        message = Message.query.get(id)
        if message is None:
            return jsonify({"error": "Message not found"}), 404
        db.session.delete(message)
        db.session.commit()
        return jsonify({"msg": "Message deleted"}), 200
    except Exception as e:
        db.session.rollback()
        return jsonify({"error": str(e)}), 500


# Edit message
@app.route("/api/messages/<int:id>", methods=["PATCH"])
def edit_message(id):
    try:
        message = Message.query.get(id)
        if message is None:
            return jsonify({"error": "Message not found"}), 404
        data = request.json

        message.author_nickname = data.get("authorNickname", message.author_nickname)
        message.author_role = data.get("authorRole", message.author_role)
        message.message_text = data.get("messageText", message.message_text)
        message.message_datetime = datetime.now().strftime("%B %d, %Y %H:%M:%S")
        message.author_gender = data.get("gender", message.author_gender)

        db.session.commit()
        return jsonify(message.to_json()), 200

    except Exception as e:
        db.session.rollback()
        return jsonify({"error": str(e)}), 500
