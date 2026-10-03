# Azure deployment

Use Azure Container Apps for the frontend/backend and Azure Database for PostgreSQL Flexible Server for production data.

```bash
az login
az group create -n cloudops-ai-rg -l eastus
az containerapp env create -n cloudops-ai-env -g cloudops-ai-rg -l eastus
```

GitHub Secrets:
- AZURE_CREDENTIALS
- DATABASE_URL

GitHub Variables:
- AZURE_RESOURCE_GROUP=cloudops-ai-rg
- AZURE_LOCATION=eastus
- AZURE_CONTAINER_ENV=cloudops-ai-env
- AZURE_BACKEND_APP=cloudops-ai-api
- AZURE_FRONTEND_APP=cloudops-ai-web

Run the **Deploy to Azure Container Apps** workflow manually after the one-time Azure setup.
