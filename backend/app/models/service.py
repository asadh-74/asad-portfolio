from datetime import datetime
from sqlalchemy import Boolean,DateTime,Float,Integer,String
from sqlalchemy.orm import Mapped,mapped_column
from app.core.database import Base

class Service(Base):
    __tablename__="services"
    id:Mapped[int]=mapped_column(Integer,primary_key=True,index=True)
    name:Mapped[str]=mapped_column(String(120),nullable=False,unique=True)
    endpoint:Mapped[str]=mapped_column(String(500),nullable=False)
    owner:Mapped[str]=mapped_column(String(120),default="Platform Team")
    tier:Mapped[str]=mapped_column(String(20),default="tier-2")
    enabled:Mapped[bool]=mapped_column(Boolean,default=True)
    status:Mapped[str]=mapped_column(String(20),default="unknown")
    uptime_pct:Mapped[float]=mapped_column(Float,default=100.0)
    latency_ms:Mapped[float]=mapped_column(Float,default=0.0)
    last_checked_at:Mapped[datetime|None]=mapped_column(DateTime,nullable=True)
    created_at:Mapped[datetime]=mapped_column(DateTime,default=datetime.utcnow)
