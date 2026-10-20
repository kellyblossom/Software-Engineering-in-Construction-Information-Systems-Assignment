# Database Entity-Relationship Model (ERD) - 3NF
## Build-Sync Construction Material Procurement Platform

---

## 1. ER Diagram

```mermaid
erDiagram
COMPANY_MVP {
int CompanyID PK " MVP"
string CompanyName " MVP"
string TaxCode " MVP"
string CompanyType " MVP: Contractor/Supplier"
string Address "MVP"
    }