from fastapi import APIRouter,Depends
from sqlalchemy.orm import Session
from app.core.database import get_db
from app.models.incident import Incident
from app.models.service import Service

router=APIRouter(prefix="/dashboard",tags=["dashboard"])

@router.get("/summary")
def summary(db:Session=Depends(get_db)):
    services=db.query(Service).all(); incidents=db.query(Incident).all()
    open_incidents=[i for i in incidents if i.status!="resolved"]
    healthy=len([s for s in services if s.status=="healthy"])
    critical=len([i for i in open_incidents if i.severity=="critical"])
    avg_latency=round(sum(s.latency_ms for s in services)/len(services),1) if services else 0
    avg_uptime=round(sum(s.uptime_pct for s in services)/len(services),2) if services else 100
    return {"services":len(services),"healthy_services":healthy,"open_incidents":len(open_incidents),"critical_incidents":critical,"avg_latency_ms":avg_latency,"sla_compliance":avg_uptime}
