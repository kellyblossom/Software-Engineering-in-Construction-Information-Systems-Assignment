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

BANNER_AD_FUTURE {
        int AdID PK "Future Scope"
        int SupplierID FK "Future Scope"
        string AdTitle "Future Scope"
        string ImageURL "Future Scope"
        date StartDate "Future Scope"
        date EndDate "Future Scope"
    }

ANNOUNCEMENT_FUTURE {
        int ArticleID PK "Future Scope"
        string Title "Future Scope"
        string Content "Future Scope"
        date PublishDate "Future Scope"
        string ArticleType "Future Scope: System, News, Tender"
    }

%% 1. Core MVP Relationships

    COMPANY_MVP ||--o{ USER_MVP : "employs"
    COMPANY_MVP ||--o{ MATERIAL_MVP : "supplies (if Supplier)"
    COMPANY_MVP ||--o{ ORDER_MVP : "places (if Contractor)"
    USER_MVP ||--o{ ORDER_MVP : "creates"
    
    ORDER_MVP ||--|{ ORDER_ITEM_MVP : "contains"
    MATERIAL_MVP ||--o{ ORDER_ITEM_MVP : "is included in"
    
    ORDER_MVP ||--o{ QUOTE_MVP : "receives"
    COMPANY_MVP ||--o{ QUOTE_MVP : "provides (if Supplier)"
    
%% 2. Phase 2: Catalog & Subscription Tiers
    CATEGORY_PHASE2 ||--o{ MATERIAL_MVP : "categorizes"
    SUBSCRIPTION_PLAN_PHASE2 ||--o{ COMPANY_MVP : "subscribed by"
    
%% 3. Future Scope: Supply Chain Contingency
    ORDER_MVP ||--o| BACKUP_PLAN_FUTURE : "is protected by"
    COMPANY_MVP ||--o{ BACKUP_PLAN_FUTURE : "serves as backup supplier"
    COMPANY_MVP ||--o{ BANNER_AD_FUTURE : "sponsors ads (if Supplier)"