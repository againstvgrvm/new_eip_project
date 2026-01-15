from pydantic import BaseModel, Field
from datetime import datetime
from typing import Optional

class ItemBase(BaseModel):
    title: str = Field(..., min_length=1, max_length=200, description="Nom du produit agricole")
    description: Optional[str] = Field(None, max_length=1000, description="Description ou quantité du produit")

class ItemCreate(ItemBase):
    pass

class ItemUpdate(BaseModel):
    title: Optional[str] = Field(None, min_length=1, max_length=200)
    description: Optional[str] = Field(None, max_length=1000)

class Item(ItemBase):
    id: int
    created_at: datetime
    
    class Config:
        from_attributes = True
