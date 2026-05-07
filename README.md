# Distillery API

Production-ready NestJS REST API with PostgreSQL.

---

## Tech Stack
- **Framework**: NestJS 10
- **Database**: PostgreSQL + TypeORM
- **Auth**: JWT (1-day tokens, Bearer scheme)
- **File Upload**: Multer (local `/uploads` folder, served as static)
- **Validation**: class-validator + class-transformer

---

## Quick Start

### 1. Install dependencies
```bash
npm install
```

### 2. Configure environment
```bash
cp .env.example .env
# Edit .env with your DB credentials and secrets
```

### 3. Start PostgreSQL and run
```bash
# Development (auto-sync schema)
npm run start:dev

# Production
npm run build
npm run start:prod
```

---

## Environment Variables

| Variable | Description | Default |
|---|---|---|
| `NODE_ENV` | `development` or `production` | `development` |
| `PORT` | HTTP port | `3000` |
| `FRONTEND_URL` | Allowed CORS origin | `http://localhost:5173` |
| `APP_BASE_URL` | Used to build image URLs | `http://localhost:3000` |
| `DB_HOST` | PostgreSQL host | `localhost` |
| `DB_PORT` | PostgreSQL port | `5432` |
| `DB_USERNAME` | PostgreSQL user | `postgres` |
| `DB_PASSWORD` | PostgreSQL password | `postgres` |
| `DB_NAME` | PostgreSQL database | `distillery_db` |
| `JWT_SECRET` | JWT signing secret | — |
| `JWT_EXPIRES_IN` | Token lifespan | `1d` |
| `ADMIN_USERNAME` | Admin login username | `admin` |
| `ADMIN_PASSWORD` | Admin login password | — |
| `ADMIN_NAME` | Admin display name | — |
| `ADMIN_EMAIL` | Admin email | — |
| `ADMIN_AVATAR_URL` | Admin avatar URL | — |

---

## API Endpoints

> All endpoints are prefixed with `/api`

### Auth
| Method | Path | Auth | Description |
|---|---|---|---|
| POST | `/api/auth/login` | ❌ | Login → returns JWT + user profile |

### User
| Method | Path | Auth | Description |
|---|---|---|---|
| GET | `/api/user/me` | ✅ | Get admin profile from env |

### Hero Content (singleton)
| Method | Path | Auth | Description |
|---|---|---|---|
| GET | `/api/hero` | ❌ | Get hero content |
| POST | `/api/hero` | ✅ | Create/replace hero content |
| PATCH | `/api/hero` | ✅ | Partial update |
| DELETE | `/api/hero` | ✅ | Delete |

### About Content (singleton)
| Method | Path | Auth | Description |
|---|---|---|---|
| GET | `/api/about` | ❌ | Get about content |
| POST | `/api/about` | ✅ | Create/replace |
| PATCH | `/api/about` | ✅ | Partial update |
| DELETE | `/api/about` | ✅ | Delete |

### Timeline Events
| Method | Path | Auth | Description |
|---|---|---|---|
| GET | `/api/timeline` | ❌ | List all (ordered by year) |
| GET | `/api/timeline/:id` | ❌ | Get one |
| POST | `/api/timeline` | ✅ | Create |
| PATCH | `/api/timeline/:id` | ✅ | Update |
| DELETE | `/api/timeline/:id` | ✅ | Delete |

### Products
| Method | Path | Auth | Description |
|---|---|---|---|
| GET | `/api/products` | ❌ | List all |
| GET | `/api/products/:id` | ❌ | Get one |
| POST | `/api/products` | ✅ | Create (multipart/form-data, `image` field) |
| PATCH | `/api/products/:id` | ✅ | Update (multipart/form-data, `image` field) |
| DELETE | `/api/products/:id` | ✅ | Delete (also removes image file) |

### Leadership
| Method | Path | Auth | Description |
|---|---|---|---|
| GET | `/api/leadership` | ❌ | List all (ordered by displayOrder) |
| GET | `/api/leadership/:id` | ❌ | Get one |
| POST | `/api/leadership` | ✅ | Create (multipart/form-data, `image` field) |
| PATCH | `/api/leadership/:id` | ✅ | Update (multipart/form-data, `image` field) |
| DELETE | `/api/leadership/:id` | ✅ | Delete (also removes image file) |

### Contact Info (singleton)
| Method | Path | Auth | Description |
|---|---|---|---|
| GET | `/api/contact-info` | ❌ | Get contact info |
| POST | `/api/contact-info` | ✅ | Create/replace |
| PATCH | `/api/contact-info` | ✅ | Partial update |
| DELETE | `/api/contact-info` | ✅ | Delete |

### Inquiries
| Method | Path | Auth | Description |
|---|---|---|---|
| POST | `/api/inquiries` | ❌ | Submit inquiry (public) |
| GET | `/api/inquiries` | ✅ | List all inquiries |
| GET | `/api/inquiries/:id` | ✅ | Get one |
| PATCH | `/api/inquiries/:id/read` | ✅ | Mark as read |
| DELETE | `/api/inquiries/:id` | ✅ | Delete |

### Site Content (aggregated)
| Method | Path | Auth | Description |
|---|---|---|---|
| GET | `/api/site-content` | ❌ | Returns all content in one response |

---

## Image Upload

For `POST /api/products` and `POST /api/leadership`, send as `multipart/form-data`:

- Field name: `image`
- Accepted types: jpg, jpeg, png, gif, webp
- Max size: **5 MB**
- Stored in `./uploads/` directory
- URL returned in response as `http://<APP_BASE_URL>/uploads/<filename>`

---

## Auth Usage

```http
POST /api/auth/login
Content-Type: application/json

{ "username": "admin", "password": "Admin@123" }
```

Response:
```json
{
  "success": true,
  "data": {
    "token": "eyJ...",
    "user": { "username": "admin", "name": "Super Admin", "email": "...", "role": "Super Admin" }
  }
}
```

Use token in subsequent protected requests:
```http
Authorization: Bearer eyJ...
```

---

## Response Format

All responses are wrapped:
```json
{ "success": true, "data": { ... } }
```

Errors:
```json
{ "success": false, "statusCode": 404, "message": "...", "timestamp": "...", "path": "..." }
```

---

## Product Categories
`SOJU` | `WHISKY` | `VODKA` | `HERO_SERIES` | `OTHER_DISTILLED` | `NON_ALCOHOLIC` | `UPCOMING`

## Leadership Board Types
`Board of Directors` | `Management`
