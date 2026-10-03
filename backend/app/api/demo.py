from fastapi import APIRouter,Depends
from sqlalchemy.orm import Session
from app.core.database import get_db
from app.models.incident import Incident
from app.models.service import Service

router=APIRouter(prefix="/demo",tags=["demo"])

@router.post("/seed")
def seed(db:Session=Depends(get_db)):
    if db.query(Service).count()==0:
        db.add_all([
            Service(name="Checkout API",endpoint="https://example.com",owner="Commerce",tier="tier-1",status="healthy",uptime_pct=99.98,latency_ms=118),
            Service(name="Identity Service",endpoint="https://example.com",owner="Platform",tier="tier-1",status="healthy",uptime_pct=99.96,latency_ms=86),
            Service(name="Notification Worker",endpoint="https://example.com",owner="Messaging",tier="tier-2",status="degraded",uptime_pct=98.73,latency_ms=412),
            Service(name="Analytics API",endpoint="https://example.com",owner="Data",tier="tier-2",status="healthy",uptime_pct=99.91,latency_ms=143),
            Service(name="Customer Portal",endpoint="https://example.com",owner="Experience",tier="tier-1",status="healthy",uptime_pct=99.94,latency_ms=101)
        ])
    if db.query(Incident).count()==0:
        db.add_all([
            Incident(title="Payment gateway timeouts",service_name="Checkout API",severity="critical",status="investigating",description="Timeout rate exceeded 8% for card payments.",ai_summary="Critical checkout degradation; payment requests are timing out above baseline.",assigned_team="Commerce SRE"),
            Incident(title="Email delivery backlog",service_name="Notification Worker",severity="high",status="mitigating",description="Queue depth increased after provider throttling.",ai_summary="Notification queue is delayed due to upstream provider throttling.",assigned_team="Messaging"),
            Incident(title="Analytics response latency",service_name="Analytics API",severity="medium",status="resolved",description="Large report queries increased p95 latency.",ai_summary="Analytics latency increased due to expensive report queries.",assigned_team="Data Platform")
        ])
    db.commit()
    return {"status":"seeded","services":db.query(Service).count(),"incidents":db.query(Incident).count()}
