# Assignment2-MVP


```mermaid
graph TD

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

    B --> BL(Suppliers)
    B --> BR(Contractors)
    %% Top left - interaction for suppliers
    BL --> BL1([Supplier Center])
    BL --> BL2([Start selling])
    %% Top right - interactions for contractors
    BR --> BR1([Sign up])
    BR --> BR2([Login])
    BR --> BR3(Cart & Checkout)
    BR --> BR4(Orders)

    %% Banners & Announcements
    C --> C1(Sponsored Ads - Suppliers)
    C --> C2(System Updates / New Features)
    C --> C3(Industry News & Tenders)
     
    D --> D1("Material Management<br>Rep: Materials Engineer")
    D --> D2("Order & Delivery Tracking<br>Rep: Procurement Officer & Supplier")
    D --> D3("Dashboard<br>Rep: Project Manager")
    %% Quick Link for Supplier:
    D --> D4("Manage Quotes<br>Deliveries - Rep: Supplier")

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
    class A,B,BL,BR,BL1,BL2,BR1,BR2,BR3,BR4,D,D1,D2,D3,D4 high;
    
    %% Yellow color (Medium priority - Account, Categories)
    class E,E_Mat,E_Sup,E1,E2,E3,E4,E5,E6,E7,E8 med;
    
    %% Blue color (Low priority - Ads and more)
    class C,C1,C2,C3,F low;
