from fastapi import Depends, FastAPI
from fastapi.middleware.cors import CORSMiddleware
import pymysql

# MariaDB 연결 정보
HOST = 'localhost'
USER = 'root'
PASSWORD = 'mariadb'
DATABASE = 'fastapi'

# DB 연결 함수
def get_db():
    connection = pymysql.connect(
        host=HOST,
        user=USER,
        password=PASSWORD,
        database=DATABASE,
        cursorclass=pymysql.cursors.DictCursor
    )
    try:
        yield connection
    finally:
        connection.close()

app = FastAPI()

# CORS 설정
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # 모든 오리진을 허용하도록 설정, 필요에 따라 변경 가능
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.get("/")
async def get_database(db: pymysql.connections.Connection = Depends(get_db)):
    with db.cursor() as cursor:
        cursor.execute("SELECT * FROM test")
        result = cursor.fetchall()
    return {"databasedata" : result, "message":"hello world"}
