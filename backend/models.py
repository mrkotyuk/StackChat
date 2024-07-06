from app import db


class Message(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    author_nickname = db.Column(db.String(100), nullable=False)
    author_role = db.Column(db.String(50), nullable=False)
    message_text = db.Column(db.Text, nullable=False)
    message_datetime = db.Column(db.String(50), nullable=False)
    author_gender = db.Column(db.String(10), nullable=False)
    author_img_url = db.Column(db.String(200), nullable=True)

    def to_json(self):
        return {
            "id": self.id,
            "authorNickname": self.author_nickname,
            "authorRole": self.author_role,
            "messageText": self.message_text,
            "messageDatetime": self.message_datetime,
            "authorGender": self.author_gender,
            "authorImgUrl": self.author_img_url,
        }
