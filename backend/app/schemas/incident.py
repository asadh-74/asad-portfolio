from datetime import datetime
from pydantic import BaseModel,ConfigDict

class IncidentCreate(BaseModel):
    title:str
    service_name:str
    severity:str="medium"
    status:str="detected"
    description:str|None=None
    assigned_team:str="Platform Team"

class IncidentRead(IncidentCreate):
    id:int
    ai_summary:str|None=None
    root_cause:str|None=None
    created_at:datetime
    resolved_at:datetime|None=None
    model_config=ConfigDict(from_attributes=True)
