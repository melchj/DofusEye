from flask_marshmallow import Marshmallow
from app.database.database import Fight, Alias

ma = Marshmallow()

# ---- Marshmallow Schema ----
class SchemaAlias(ma.SQLAlchemySchema):
    class Meta:
        model = Alias
    
    character_name = ma.auto_field()
    account_name = ma.auto_field()

class SchemaFight(ma.SQLAlchemyAutoSchema):
    class Meta:
        model = Fight

schema_alias = SchemaAlias()
schema_aliases = SchemaAlias(many=True)
schema_fight = SchemaFight()
schema_fights = SchemaFight(many=True)
