"""empty message

Revision ID: b11a137c841b
Revises: 64338bec9a27
Create Date: 2022-01-07 11:43:16.657772

"""
from alembic import op
import sqlalchemy as sa


# revision identifiers, used by Alembic.
revision = 'b11a137c841b'
down_revision = '64338bec9a27'
branch_labels = None
depends_on = None


def upgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    op.create_table('users',
    sa.Column('id', sa.Integer(), autoincrement=True, nullable=False),
    sa.Column('password_hash', sa.String(length=255), nullable=False),
    sa.Column('registered_on', sa.DateTime(), nullable=False),
    sa.Column('admin', sa.Boolean(), nullable=False),
    sa.PrimaryKeyConstraint('id')
    )
    op.create_unique_constraint(None, 'aliases', ['character_name'])
    op.create_unique_constraint(None, 'perc_prism', ['fight_id'])
    # ### end Alembic commands ###


def downgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    op.drop_constraint(None, 'perc_prism', type_='unique')
    op.drop_constraint(None, 'aliases', type_='unique')
    op.drop_table('users')
    # ### end Alembic commands ###