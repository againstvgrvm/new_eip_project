# Backend AgriConnect - API FastAPI

API REST pour la plateforme AgriConnect, permettant la gestion des produits agricoles.

## 🚀 Installation

### Prérequis
- Python 3.8+
- pip

### Étapes d'installation

1. **Naviguer vers le dossier backend**
   ```bash
   cd backend
   ```

2. **Créer un environnement virtuel (recommandé)**
   ```bash
   python -m venv venv
   source venv/bin/activate  # Sur Linux/Mac
   # ou
   venv\Scripts\activate  # Sur Windows
   ```

3. **Installer les dépendances**
   ```bash
   pip install -r requirements.txt
   ```

## 🏃 Démarrage du serveur

```bash
uvicorn main:app --reload --port 8001
```

Le serveur sera accessible sur : `http://localhost:8001`

## 📚 Documentation API

Une fois le serveur démarré, accédez à :
- **Swagger UI** : http://localhost:8001/docs
- **ReDoc** : http://localhost:8001/redoc

## 🛠️ Endpoints disponibles

### Items (Produits)

| Méthode | Endpoint | Description |
|---------|----------|-------------|
| GET | `/items/` | Liste tous les produits |
| GET | `/items/{id}` | Récupère un produit spécifique |
| POST | `/items/` | Crée un nouveau produit |
| PUT | `/items/{id}` | Met à jour un produit |
| DELETE | `/items/{id}` | Supprime un produit |

### Exemples d'utilisation

**Créer un produit :**
```bash
curl -X POST http://localhost:8001/items/ \
  -H "Content-Type: application/json" \
  -d '{"title": "Tomates fraîches", "description": "50kg, récolté ce matin"}'
```

**Lister tous les produits :**
```bash
curl http://localhost:8001/items/
```

**Récupérer un produit spécifique :**
```bash
curl http://localhost:8001/items/1
```

**Mettre à jour un produit :**
```bash
curl -X PUT http://localhost:8001/items/1 \
  -H "Content-Type: application/json" \
  -d '{"title": "Tomates bio", "description": "100kg disponibles"}'
```

**Supprimer un produit :**
```bash
curl -X DELETE http://localhost:8001/items/1
```

## 📁 Structure du projet

```
backend/
├── main.py           # Point d'entrée de l'application
├── database.py       # Configuration de la base de données
├── models.py         # Modèles SQLAlchemy
├── schemas.py        # Schémas Pydantic
├── crud.py           # Opérations CRUD
├── routes.py         # Endpoints API
├── requirements.txt  # Dépendances Python
└── README.md         # Documentation
```

## 🗄️ Base de données

Le projet utilise **SQLite** par défaut. La base de données `agriconnect.db` sera créée automatiquement au premier démarrage.

Pour utiliser PostgreSQL ou MySQL, modifiez la variable `SQLALCHEMY_DATABASE_URL` dans `database.py`.

## 🔧 Configuration CORS

Le backend accepte les requêtes provenant de :
- `http://localhost:8000` (frontend principal)
- `http://localhost:5173` (Vite dev server)

Pour ajouter d'autres origines, modifiez la liste `origins` dans `main.py`.

## 🧪 Tests

Pour tester l'API, vous pouvez utiliser :
- L'interface Swagger UI intégrée
- Postman
- curl
- Le frontend AgriConnect

## 📝 Modèle de données

### Item (Produit)
```python
{
  "id": 1,
  "title": "Tomates fraîches",
  "description": "50kg, récolté ce matin",
  "created_at": "2026-01-15T10:30:00Z"
}
```

## 🔐 Sécurité

Pour la production, pensez à :
- Ajouter l'authentification (JWT)
- Limiter les origines CORS
- Utiliser HTTPS
- Ajouter un rate limiting
- Valider et sanitiser toutes les entrées

## 📞 Support

Pour toute question ou problème, consultez la documentation Swagger ou contactez l'équipe de développement.
