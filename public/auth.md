# Auth.md

## Site: Maine Coon Heaven — Ethical Maine Coon Cattery & Pedigree Store

## Agent Registration
No authentication required. All resources are publicly accessible.

## Public Resources
| Resource | URL |
|---|---|
| Product Catalog | https://DOMAIN.com/shop/ |
| Blog | https://DOMAIN.com/blog/ |
| FAQ | https://DOMAIN.com/faq/ |
| Products API | https://DOMAIN.com/api/products |
| Search API | https://DOMAIN.com/api/search |
| MCP Server | https://DOMAIN.com/api/mcp |

## Authentication

```json
{
  "agent_auth": {
    "register_uri": null,
    "identity_types_supported": ["none"],
    "credential_types_supported": ["none"],
    "notes": "No authentication required. All resources are public."
  }
}
```

## Ordering
Human-in-the-loop required. Agents may browse and prepare kitten adoption drafts.
Adoptions and reservations are completed by a human via WhatsApp (+61 401 667 279) or the official inquiry form.
