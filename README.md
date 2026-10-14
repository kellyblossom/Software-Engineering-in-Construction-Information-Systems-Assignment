# Assignment2-MVP


```mermaid
graph LR

    %% Color definition
    classDef high fill:#ffccd2,stroke:#ff4d6d,stroke-width:1px,color:black,font-size:26px;
    classDef med fill:#fff3cd,stroke:#ffc107,stroke-width:1px,color:black,font-size:26px;
    classDef low fill:#d1ecf1,stroke:#17a2b8,stroke-width:1px,color:black,font-size:26px;

    %% Main home page
    A{{Homepage}} --> B(Header & Search)
    A --> C(Banners)
    A --> D(Quick Links)
    A --> E(Categories)
    A --> F(Daily Discover / Flash Deals)

    B --> BS(Suppliers)
    B --> BC(Contractors)
    %% Interaction for suppliers
    BS --> BS1([Supplier Center])
    BS --> BS2([Start selling])

    BS1 -.-> BS_Portal{{Supplier Workspace}}
    BS_Portal --> BS4(["Received Orders"]) 
    BS_Portal --> BS3(["Account Profile & Settings"])


    %% Interactions for contractors
    BC --> BC1([Sign up])
    BC --> BC2([Login])

    BC2 -.-> BC_Portal{{Contractor Workspace}}
    BC_Portal --> BC3(["Cart & Checkout"]) 
    BC_Portal --> BC4(["My Orders"])
    BC_Portal --> BC5(["Account Profile & Settings"])

    
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

    %% Color
    %% Pink color (Highest priority - core MVP)
     class A,B,BS,BC,BS1,BS2,BS3,BS4,BS_Portal,BC1,BC2,BC3,BC4,BC5,BC_Portal,D,D1,D2,D3,D4 high;
    
    %% Yellow color (Medium priority - Account, Categories)
    class E,E_Mat,E_Sup,E1,E2,E3,E4,E5,E6,E7,E8 med;
    
    %% Blue color (Low priority - Ads and more)
    class C,C1,C2,C3,F low;
