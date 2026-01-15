from sqlalchemy.orm import Session
from typing import List, Optional
import models
import schemas

def get_items(db: Session, skip: int = 0, limit: int = 100) -> List[models.Item]:
    """Récupérer tous les produits avec pagination"""
    return db.query(models.Item).offset(skip).limit(limit).all()

def get_item(db: Session, item_id: int) -> Optional[models.Item]:
    """Récupérer un produit par son ID"""
    return db.query(models.Item).filter(models.Item.id == item_id).first()

def create_item(db: Session, item: schemas.ItemCreate) -> models.Item:
    """Créer un nouveau produit"""
    db_item = models.Item(
        title=item.title,
        description=item.description
    )
    db.add(db_item)
    db.commit()
    db.refresh(db_item)
    return db_item

def update_item(db: Session, item_id: int, item: schemas.ItemUpdate) -> Optional[models.Item]:
    """Mettre à jour un produit existant"""
    db_item = get_item(db, item_id)
    if db_item is None:
        return None
    
    # Update only provided fields
    update_data = item.model_dump(exclude_unset=True)
    for key, value in update_data.items():
        setattr(db_item, key, value)
    
    db.commit()
    db.refresh(db_item)
    return db_item

def delete_item(db: Session, item_id: int) -> bool:
    """Supprimer un produit"""
    db_item = get_item(db, item_id)
    if db_item is None:
        return False
    
    db.delete(db_item)
    db.commit()
    return True
