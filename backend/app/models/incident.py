from datetime import datetime
from sqlalchemy import DateTime,Integer,String,Text
from sqlalchemy.orm import Mapped,mapped_column
from app.core.database import Base

class Incident(Base):
    __tablename__="incidents"
    id:Mapped[int]=mapped_column(Integer,primary_key=True,index=True)
    title:Mapped[str]=mapped_column(String(200),nullable=False)
    service_name:Mapped[str]=mapped_column(String(120),nullable=False)
    severity:Mapped[str]=mapped_column(String(20),default="medium")
    status:Mapped[str]=mapped_column(String(30),default="detected")
    description:Mapped[str|None]=mapped_column(Text,nullable=True)
    ai_summary:Mapped[str|None]=mapped_column(Text,nullable=True)
    root_cause:Mapped[str|None]=mapped_column(Text,nullable=True)
    assigned_team:Mapped[str]=mapped_column(String(120),default="Platform Team")
    created_at:Mapped[datetime]=mapped_column(DateTime,default=datetime.utcnow)
    resolved_at:Mapped[datetime|None]=mapped_column(DateTime,nullable=True)
