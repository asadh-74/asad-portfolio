from datetime import datetime
from pydantic import BaseModel,ConfigDict,HttpUrl

class ServiceCreate(BaseModel):
    name:str
    endpoint:HttpUrl
    owner:str="Platform Team"
    tier:str="tier-2"

class ServiceRead(BaseModel):
    id:int
    name:str
    endpoint:str
    owner:str
    tier:str
    enabled:bool
    status:str
    uptime_pct:float
    latency_ms:float
    last_checked_at:datetime|None
    created_at:datetime
    model_config=ConfigDict(from_attributes=True)
