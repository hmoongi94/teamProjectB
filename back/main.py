from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

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
def printHello():
    return {"message": "Hello World"}

@app.get("/json")
def printJson():
    return {
        "Number": 12345
    }