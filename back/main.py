from fastapi import Body, Depends, FastAPI, HTTPException
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

# 사용자 정보를 추가하는 엔드포인트
@app.post("/signup")
async def register_user(user_info: dict = Body(...), db: pymysql.connections.Connection = Depends(get_db)):
    userId = user_info.get('userId')
    password = user_info.get('password')
    with db.cursor() as cursor:
        try:
            # 사용자가 이미 존재하는지 확인
            cursor.execute("SELECT * FROM user WHERE userId = %s", (userId,))
            existing_user = cursor.fetchone()

            if existing_user:
                return {"message": "이미 존재하는 사용자입니다."}

            # 사용자 추가
            cursor.execute("INSERT INTO user (userId, password) VALUES (%s, %s)", (userId, password))
            db.commit()

            return {"message": "사용자가 성공적으로 등록되었습니다."}
        except Exception as e:
            db.rollback()
            raise HTTPException(status_code=500, detail=str(e))