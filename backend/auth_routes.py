from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy.orm import Session
import auth_models
import auth_schemas
import auth_utils
from database import get_db

router = APIRouter(
    prefix="/auth",
    tags=["authentication"]
)

@router.post("/register", response_model=auth_schemas.UserResponse, status_code=status.HTTP_201_CREATED)
def register(user_data: auth_schemas.UserCreate, db: Session = Depends(get_db)):
    """
    Créer un nouveau compte utilisateur
    
    - **name**: Nom complet de l'utilisateur
    - **email**: Adresse email unique
    - **password**: Mot de passe (minimum 6 caractères)
    """
    # Vérifier si l'email existe déjà
    existing_user = db.query(auth_models.User).filter(
        auth_models.User.email == user_data.email
    ).first()
    
    if existing_user:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="Un compte avec cet email existe déjà"
        )
    
    # Créer le nouvel utilisateur
    hashed_password = auth_utils.hash_password(user_data.password)
    new_user = auth_models.User(
        name=user_data.name,
        email=user_data.email,
        hashed_password=hashed_password
    )
    
    db.add(new_user)
    db.commit()
    db.refresh(new_user)
    
    return new_user

@router.post("/login", response_model=auth_schemas.Token)
def login(credentials: auth_schemas.UserLogin, db: Session = Depends(get_db)):
    """
    Se connecter et obtenir un token d'accès
    
    - **email**: Adresse email du compte
    - **password**: Mot de passe
    """
    # Trouver l'utilisateur
    user = db.query(auth_models.User).filter(
        auth_models.User.email == credentials.email
    ).first()
    
    if not user:
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Email ou mot de passe incorrect"
        )
    
    # Vérifier le mot de passe
    if not auth_utils.verify_password(credentials.password, user.hashed_password):
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Email ou mot de passe incorrect"
        )
    
    if not user.is_active:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="Compte désactivé"
        )
    
    # Créer le token JWT
    access_token = auth_utils.create_access_token(data={"sub": user.email})
    
    return {"access_token": access_token, "token_type": "bearer"}

@router.get("/me", response_model=auth_schemas.UserResponse)
def get_current_user_info(current_user: auth_models.User = Depends(auth_utils.get_current_user)):
    """
    Obtenir les informations de l'utilisateur connecté
    
    Nécessite un token JWT valide dans le header Authorization
    """
    return current_user
