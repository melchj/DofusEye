FROM python:3.10

# install dependancies
RUN pip install --upgrade pip
COPY ./requirements.txt ./requirements.txt
RUN pip install -r requirements.txt

# copy local content to image
COPY . .

EXPOSE 8000

# start gunicorn
CMD [ "gunicorn", "--bind", ":8000", "wgsi:app"]
