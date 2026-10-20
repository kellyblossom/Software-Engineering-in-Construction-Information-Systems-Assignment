# Database Entity-Relationship Model (ERD) - 3NF
## Build-Sync Construction Material Procurement Platform

---

## 1. ER Diagram

```mermaid
erDiagram

COMPANY_MVP {
        int CompanyID PK "MVP"
        int PlanID FK "Phase 2: Subscription Tier"
        string CompanyName "MVP"
        string TaxCode "MVP"
        string CompanyType "MVP: Contractor/Supplier"
        string Address "MVP"
        date SubscriptionStartDate "Phase 2: Starting date"
        date TrialEndDate "Phase 2: Expired date"
    }

USER_MVP {
        int UserID PK "MVP"
        int CompanyID FK "MVP"
        string Email "MVP"
        string Role "MVP"
    }

MATERIAL_MVP {
        int MaterialID PK "MVP"
        int SupplierID FK "MVP"
        string MaterialName "MVP"
        float BasePrice "MVP"
    }

ORDER_MVP {
        int OrderID PK "MVP"
        int ContractorID FK "MVP"
        int CreatedBy_UserID FK "MVP"
        date OrderDate "MVP"
        string Status "MVP: Pending, Approved"
    }

ORDER_ITEM_MVP {
        int OrderID PK, FK "MVP"
        int MaterialID PK, FK "MVP"
        int Quantity "MVP"
        float UnitPrice "MVP"
    }

QUOTE_MVP {
        int QuoteID PK "MVP"
        int OrderID FK "MVP"
        int SupplierID FK "MVP"
        float QuotedTotal "MVP"
        string Status "MVP"
    }

QUOTE_ITEM_PHASE2 {
        int QuoteID PK, FK "Phase 2"
        int MaterialID PK, FK "Phase 2"
        float QuotedUnitPrice "Phase 2"
    }

CATEGORY_PHASE2 {
        int CategoryID PK "Phase 2"
        string CategoryName "Phase 2"
    }

SUBSCRIPTION_PLAN_PHASE2 {
        int PlanID PK "Phase 2"
        string PlanName "Phase 2: Freemium, Pro Tier, Enterprise"
        string BillingCycle "Phase 2: Free, Monthly, Yearly"
        int MaxProjects "Phase 2: 2 for Free, NULL for Unlimited"
        int MaxSuppliers "Phase 2: 5 for Free, NULL for Unlimited"
        float FeeAmount "Phase 2: Fixed amount"
    }

BACKUP_PLAN_FUTURE {
        int PlanID PK "Future Scope"
        int PrimaryOrderID FK "Future Scope"
        int BackupSupplierID FK "Future Scope"
        float Fee "Future Scope: fee"
        string TriggerCondition "Future Scope: Trigger condition (e.g: 3-day delay)"
    }

