FROM python:3.7-alpine3.10 AS base

FROM base AS builder

RUN mkdir /install
WORKDIR /install
COPY requirements.txt /requirements.txt
RUN pip install --install-option="--prefix=/install" -r /requirements.txt

FROM base

COPY --from=builder /install /usr/local
COPY app.py /app/app.py
ENV FLASK_APP /app/app.py
EXPOSE 5000

LABEL version="1.0"
LABEL maintainer="simonbrgstrm@gmail.com"

CMD ["flask", "run", "--host=0.0.0.0", "--port=5000"]
