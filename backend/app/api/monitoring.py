import time,httpx
from fastapi import APIRouter,HTTPException,Query

router=APIRouter(prefix="/monitoring",tags=["monitoring"])

@router.get("/check")
async def check_endpoint(url:str=Query(...,description="Public HTTP/HTTPS endpoint to check")):
    if not url.startswith(("http://","https://")): raise HTTPException(status_code=400,detail="URL must start with http:// or https://")
    started=time.perf_counter()
    try:
        async with httpx.AsyncClient(timeout=8.0,follow_redirects=True) as client: response=await client.get(url)
        latency_ms=round((time.perf_counter()-started)*1000,2)
        state="healthy" if response.status_code<400 else "degraded"
        return {"url":url,"status":state,"http_status":response.status_code,"latency_ms":latency_ms}
    except httpx.HTTPError as exc:
        latency_ms=round((time.perf_counter()-started)*1000,2)
        return {"url":url,"status":"down","http_status":None,"latency_ms":latency_ms,"error":str(exc)}
