FROM pypy:3

WORKDIR /code

COPY requirements.txt parser.py ./

RUN pip install --no-cache-dir -r requirements.txt

CMD [ "pypy3", "/code/parser.py" ]