from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
import models
import auth_models
from database import engine
from routes import router
from auth_routes import router as auth_router

# Create database tables
models.Base.metadata.create_all(bind=engine)
auth_models.Base.metadata.create_all(bind=engine)

# Initialize FastAPI app
app = FastAPI(
    title="AgriConnect API",
    description="API Backend pour la plateforme AgriConnect - Gestion des produits agricoles",
    version="1.0.0",
    docs_url="/docs",
    redoc_url="/redoc"
)

# Configure CORS
origins = [
    "http://localhost:3000",  # Vite dev server (actual port)
    "http://127.0.0.1:3000",
    "http://localhost:8000",  # Frontend development server
    "http://127.0.0.1:8000",
    "http://localhost:5173",  # Vite default port
    "http://127.0.0.1:5173",
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Include routes
app.include_router(router)
app.include_router(auth_router)

@app.get("/")
def root():
    """
    Endpoint racine - Vérification de l'état de l'API
    """
    return {
        "message": "Bienvenue sur l'API AgriConnect",
        "status": "online",
        "version": "1.0.0",
        "docs": "/docs"
    }

@app.get("/health")
def health_check():
    """
    Health check endpoint
    """
    return {"status": "healthy"}
