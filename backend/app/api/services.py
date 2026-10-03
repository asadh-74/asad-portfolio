from datetime import datetime
import time,httpx
from fastapi import APIRouter,Depends,HTTPException
from sqlalchemy.orm import Session
from app.core.database import get_db
from app.models.service import Service
from app.schemas.service import ServiceCreate,ServiceRead

router=APIRouter(prefix="/services",tags=["services"])

@router.get("",response_model=list[ServiceRead])
def list_services(db:Session=Depends(get_db)):
    return db.query(Service).order_by(Service.name.asc()).all()

@router.post("",response_model=ServiceRead,status_code=201)
def create_service(payload:ServiceCreate,db:Session=Depends(get_db)):
    if db.query(Service).filter(Service.name==payload.name).first(): raise HTTPException(status_code=409,detail="Service name already exists")
    item=Service(**payload.model_dump(mode="json")); db.add(item); db.commit(); db.refresh(item); return item

@router.post("/{service_id}/check",response_model=ServiceRead)
async def check_service(service_id:int,db:Session=Depends(get_db)):
    service=db.get(Service,service_id)
    if not service: raise HTTPException(status_code=404,detail="Service not found")
    started=time.perf_counter()
    try:
        async with httpx.AsyncClient(timeout=8.0,follow_redirects=True) as client: response=await client.get(service.endpoint)
        service.latency_ms=round((time.perf_counter()-started)*1000,2)
        service.status="healthy" if response.status_code<400 else "degraded"
        service.uptime_pct=99.95 if service.status=="healthy" else 97.2
    except httpx.HTTPError:
        service.latency_ms=round((time.perf_counter()-started)*1000,2); service.status="down"; service.uptime_pct=92.4
    service.last_checked_at=datetime.utcnow(); db.commit(); db.refresh(service); return service
