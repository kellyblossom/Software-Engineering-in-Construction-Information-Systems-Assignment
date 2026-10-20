# Build-Sync Construction Material Procurement Platform
## 1. System Sitemap - Assignment #2

```mermaid
graph LR

    %% Color definition
    classDef high fill:#ffccd2,stroke:#ff4d6d,stroke-width:1.5px,color:black,font-size:26px,padding:15px;
    classDef med fill:#fff3cd,stroke:#ffc107,stroke-width:1.5px,color:black,font-size:26px,padding:15px;
    classDef low fill:#d1ecf1,stroke:#17a2b8,stroke-width:1.5px,color:black,font-size:26px,padding:15px;

    %% Main home page
    A{{Homepage}} --> B(Header & Search)
    A --> C(Banners)
    A --> D(Quick Links)
    A --> E(Categories)
    A --> F(Daily Discover / Flash Deals)
    A --> P(Pricing & Plans)

    B --> BS(Suppliers)
    B --> BC(Contractors)
    
    %% Interaction for suppliers
    BS --> BS1([Supplier Center])
    BS --> BS2([Start selling])

    BS1 -.-> BS_Portal{{Supplier Workspace}}
    BS_Portal --> BS3(["Received Orders"]) 
    BS_Portal --> BS5(["Backup Requests"]) 
    BS_Portal --> BS6(["Subscription & Billing"])
    BS_Portal --> BS4(["Account Profile & Settings"])

    %% Interactions for contractors
    BC --> BC1([Sign up])
    BC --> BC2([Login])

    BC2 -.-> BC_Portal{{Contractor Workspace}}
    BC_Portal --> BC3(["Cart & Checkout"]) 
    BC_Portal --> BC4(["My Orders"])
    BC_Portal --> BC5(["Compare Quotes"]) 
    BC_Portal --> BC6(["Backup Plan / Contingency"]) 
    BC_Portal --> BC7(["Account Profile & Settings"])
    BC_Portal --> BC8(["Subscription & Billing"])

    %% Subscription Tiers (Phase 2)
    P --> P1(Freemium)
    P --> P2(Pro Tier)
    P --> P3(Enterprise)

    %% Banners & Announcements
    C --> C1(Sponsored Ads - Suppliers)
    C --> C2(System Updates / New Features)
    C --> C3(Industry News & Tenders)

    %% Quick Link for Contractors: 
    D --> D1("Material Management<br>Rep: Materials Engineer")
    D --> D2("Order & Delivery Tracking<br>Rep: Procurement Officer & Supplier")
    D --> D3("Dashboard<br>Rep: Project Manager")
    
    %% Features in quick links can also access after logging in
    BC_Portal --> D1
    BC_Portal --> D2
    BC_Portal --> D3

    %% Quick Link for Suppliers:
    D --> D4("Manage Quotes<br>Deliveries - Rep: Supplier")
    
    %% Features in quick links can also access after logging in
    BS_Portal --> D2
    BS_Portal --> D4

    %% Categories: By Material & By Supplier
    E --> E_Mat[By Material]
    E --> E_Sup[By Supplier]

    E_Mat --> E1(Steel & Metals)
    E_Mat --> E2(Cement & Concrete)
    E_Mat --> E5(Sand, Stone & Bricks)
    E_Mat --> E6(Wood & Formwork)
    E_Mat --> E7(MEP & Accessories)
    E_Mat --> E8(Paint & Waterproofing)

    E_Sup --> E3(Supplier A)
    E_Sup --> E4(Supplier B)

    %% Color Mapping
    %% Pink color (Highest priority - core MVP)
    class A,B,BS,BC,BS1,BS2,BS3,BS4,BS_Portal,BC1,BC2,BC3,BC4,BC7,BC_Portal,D,D1,D2,D3,D4 high;
    
    %% Yellow color (Medium priority - Phase 2)
    class E,E_Mat,E_Sup,E1,E2,E3,E4,E5,E6,E7,E8,P,P1,P2,P3,BC5,BC8,BS6 med;
    
    %% Blue color (Low priority - Future Scope)
    class C,C1,C2,C3,F,BC6,BS5 low;
```


---

## 2. Use Cases & Product Scope - Assignment 3

###  Priority Tags Legend
* ![#ffccd2](https://placehold.co/15x15/ffccd2/ffccd2.png) **[MVP]**: High Priority. Minimum Viable Product core features required for basic operations.
* ![#fff3cd](https://placehold.co/15x15/fff3cd/fff3cd.png) **[Phase 2]**: Medium Priority. Important structural and catalog features to be implemented next.
* ![#d1ecf1](https://placehold.co/15x15/d1ecf1/d1ecf1.png) **[Future Scope]**: Low Priority. Marketing, extensions, and supplementary features.
###  List of Use Cases

**Authentication & Workspace Management**
* Contractor: Sign up & Login to Contractor Workspace  ![MVP](https://img.shields.io/badge/-MVP-ffccd2?style=flat)
* Supplier: Start selling & Login to Supplier Workspace  ![MVP](https://img.shields.io/badge/-MVP-ffccd2?style=flat)
* Update Account Profile & Settings (Both roles)  ![MVP](https://img.shields.io/badge/-MVP-ffccd2?style=flat)
* Company: Manage Subscription & Billing (Upgrade Freemium, Pro, Enterprise) ![Phase 2](https://img.shields.io/badge/-Phase%202-fff3cd?style=flat)

**Procurement & Order Fulfillment**
* Contractor: Add materials to Cart & Checkout ![MVP](https://img.shields.io/badge/-MVP-ffccd2?style=flat)
* Contractor: View and manage "My Orders" ![MVP](https://img.shields.io/badge/-MVP-ffccd2?style=flat)
* Supplier: View "Received Orders" & Manage Quotes  ![MVP](https://img.shields.io/badge/-MVP-ffccd2?style=flat)
* Both Roles: Order & Delivery Tracking ![MVP](https://img.shields.io/badge/-MVP-ffccd2?style=flat)
* Contractor: Compare multiple quotes from different suppliers (Quote Comparison) ![Phase 2](https://img.shields.io/badge/-Phase%202-fff3cd?style=flat)
* Contractor: Purchase Backup Plan / Supply Chain Contingency ![Future Scope](https://img.shields.io/badge/-Future%20Scope-d1ecf1?style=flat)
* Supplier: Manage/Accept Backup Plan requests (Serve as Backup Supplier) ![Future Scope](https://img.shields.io/badge/-Future%20Scope-d1ecf1?style=flat)

**Project & Material Control (Contractor side)**
* Materials Engineer: Material Management ![MVP](https://img.shields.io/badge/-MVP-ffccd2?style=flat)
* Project Manager: Dashboard  ![MVP](https://img.shields.io/badge/-MVP-ffccd2?style=flat)

**Search & Catalog Navigation**
* Global: Search for materials via Header Search bar  ![MVP](https://img.shields.io/badge/-MVP-ffccd2?style=flat)
* Global: View Pricing & Subscription Plans (Freemium, Pro, Enterprise) ![Phase 2](https://img.shields.io/badge/-Phase%202-fff3cd?style=flat)
* Global: Browse Categories By Material (Steel, Cement, MEP, etc.)  ![Phase 2](https://img.shields.io/badge/-Phase%202-fff3cd?style=flat)
* Global: Browse Categories By Supplier (Supplier A, Supplier B)  ![Phase 2](https://img.shields.io/badge/-Phase%202-fff3cd?style=flat)
**Marketing & Information**
* Global: View Sponsored Ads from Suppliers  ![Future Scope](https://img.shields.io/badge/-Future%20Scope-d1ecf1?style=flat)
* Global: Read System Updates & Industry News  ![Future Scope](https://img.shields.io/badge/-Future%20Scope-d1ecf1?style=flat)
* Global: Hunt for Daily Discover / Flash Deals  ![Future Scope](https://img.shields.io/badge/-Future%20Scope-d1ecf1?style=flat)
