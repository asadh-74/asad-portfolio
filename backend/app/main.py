from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from app.api import incidents,monitoring,services,dashboard,demo
from app.core.config import settings
from app.core.database import Base,engine
from app.models import Incident,Service

Base.metadata.create_all(bind=engine)
app=FastAPI(title=settings.app_name,version="1.0.0",description="Cloud operations and incident intelligence API.")

origins=[o.strip() for o in settings.cors_origins.split(",") if o.strip()]
app.add_middleware(CORSMiddleware,allow_origins=origins,allow_credentials=True,allow_methods=["*"],allow_headers=["*"])
app.include_router(incidents.router,prefix="/api")
app.include_router(services.router,prefix="/api")
app.include_router(monitoring.router,prefix="/api")
app.include_router(dashboard.router,prefix="/api")
app.include_router(demo.router,prefix="/api")

@app.get("/")
def root(): return {"name":"CloudOps AI","docs":"/docs","health":"/health"}

@app.get("/health")
def health(): return {"status":"ok","service":"cloudops-api","environment":settings.environment}
