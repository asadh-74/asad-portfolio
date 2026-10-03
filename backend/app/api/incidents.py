from datetime import datetime
from fastapi import APIRouter,Depends,HTTPException
from sqlalchemy.orm import Session
from app.core.database import get_db
from app.models.incident import Incident
from app.schemas.incident import IncidentCreate,IncidentRead

router=APIRouter(prefix="/incidents",tags=["incidents"])

@router.get("",response_model=list[IncidentRead])
def list_incidents(db:Session=Depends(get_db)):
    return db.query(Incident).order_by(Incident.created_at.desc()).all()

@router.post("",response_model=IncidentRead,status_code=201)
def create_incident(payload:IncidentCreate,db:Session=Depends(get_db)):
    incident=Incident(**payload.model_dump())
    detail=payload.description or "No additional diagnostic detail supplied."
    incident.ai_summary=f"{payload.severity.title()} incident affecting {payload.service_name}. {detail[:180]}"
    db.add(incident); db.commit(); db.refresh(incident); return incident

@router.patch("/{incident_id}/status",response_model=IncidentRead)
def update_status(incident_id:int,status:str,db:Session=Depends(get_db)):
    incident=db.get(Incident,incident_id)
    if not incident: raise HTTPException(status_code=404,detail="Incident not found")
    incident.status=status
    if status=="resolved": incident.resolved_at=datetime.utcnow()
    db.commit(); db.refresh(incident); return incident
