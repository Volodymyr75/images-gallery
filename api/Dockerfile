FROM python:3.8

WORKDIR /app

EXPOSE 5050

COPY Pipfile Pipfile.lock ./
# install pipenv to create requirenents.txt, only packages, not dev devendencies
RUN pip install pipenv
RUN pipenv lock --requirements > requirements.txt
RUN pip install -r requirements.txt

COPY . ./

CMD ["python", "main.py"]