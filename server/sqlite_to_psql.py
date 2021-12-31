from sqlalchemy import create_engine, select
from app.database.database import db

engine_from = create_engine('sqlite:///main.db')
engine_to = create_engine('postgresql://postgres:postgres@localhost:5432/dofuseye')

with engine_from.connect() as conn_from:
    with engine_to.connect() as conn_to:
        for table in db.metadata.sorted_tables:
            for row in conn_from.execute(select(table.c)):
                conn_to.execute(table.insert().values(dict(row)))
            # data = [dict(row) for row in conn_from.execute(select(table.c))]
            # conn_to.execute(table.insert().values(data))