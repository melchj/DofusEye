from flask_sqlalchemy import SQLAlchemy

db = SQLAlchemy()

# ---- SQLalchemy Models ----
# TODO: add a Base class that these inherit from, instead of db.Model?
class Fight(db.Model):
    __tablename__ = "perc_prism"

    fight_id = db.Column(db.Integer(), primary_key=True, unique=True)
    modified = db.Column(db.Integer(), default=0)
    guild_id = db.Column(db.BigInteger, nullable=False)
    channel_id = db.Column(db.BigInteger, nullable=False)
    date = db.Column(db.Integer(), nullable=False)
    file_path = db.Column(db.String(50), nullable=False)
    sword = db.Column(db.String(50))
    w1_name = db.Column(db.String(50))
    w1_class = db.Column(db.String(50))
    w1_dead = db.Column(db.Integer())
    w2_name = db.Column(db.String(50))
    w2_class = db.Column(db.String(50))
    w2_dead = db.Column(db.Integer())
    w3_name = db.Column(db.String(50))
    w3_class = db.Column(db.String(50))
    w3_dead = db.Column(db.Integer())
    w4_name = db.Column(db.String(50))
    w4_class = db.Column(db.String(50))
    w4_dead = db.Column(db.Integer())
    w5_name = db.Column(db.String(50))
    w5_class = db.Column(db.String(50))
    w5_dead = db.Column(db.Integer())
    l1_name = db.Column(db.String(50))
    l1_class = db.Column(db.String(50))
    l1_dead = db.Column(db.Integer())
    l2_name = db.Column(db.String(50))
    l2_class = db.Column(db.String(50))
    l2_dead = db.Column(db.Integer())
    l3_name = db.Column(db.String(50))
    l3_class = db.Column(db.String(50))
    l3_dead = db.Column(db.Integer())
    l4_name = db.Column(db.String(50))
    l4_class = db.Column(db.String(50))
    l4_dead = db.Column(db.Integer())
    l5_name = db.Column(db.String(50))
    l5_class = db.Column(db.String(50))
    l5_dead = db.Column(db.Integer())

    def __repr__(self) -> str:
        return f"a fight... W1: {self.w1_name}, L1: {self.l1_name}."

class Alias(db.Model):
    __tablename__ = "aliases"

    # id = db.Column(db.Integer())
    character_name = db.Column(db.Text, primary_key=True, unique=True)
    account_name = db.Column(db.Text)

    def __repr__(self) -> str:
        return f"<Alias: ({self.account_name}) {self.character_name}>"
