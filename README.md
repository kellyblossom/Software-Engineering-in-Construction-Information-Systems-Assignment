# Assignment2-MVP


```mermaid
graph TD

    A[Homepage] --> B(Header & Search)
    A --> C(Banners)
    A --> D(Quick Links)
    A --> E(Categories)
    A --> F(Daily Discover / Flash Deals)

    B --> BL(Suppliers)
    B --> BR(Contractors)
    %% Top left - interaction for suppliers
    BL --> BL1(Supplier Center)
    BL --> BL2(Start selling)
    %% Top right - interactions for contractors
    BR --> BR1(Sign up)
    BR --> BR2(login)
    BR --> BR3(Orders)

 
    D --> D1(Material Management - Rep: Materials Engineer)
    D --> D2(Order Processing - Rep: Procurement Officer)
    D --> D3(Dashboard - Rep: Project Manager)
    %% Quick Link for Supplier:
    D --> D4(Manage Quotes & Deliveries - Rep: Supplier)

    %% Categories: By Material & By Supplier
    E --> E_Mat(By Material)
    E --> E_Sup(By Supplier)

    E_Mat --> E1(Steel & Metals)
    E_Mat --> E2(Cement & Concrete)
    E_Mat --> E5(Sand, Stone & Bricks)
    E_Mat --> E6(Wood & Formwork)
    E_Mat --> E7(MEP & Accessories)
    E_Mat --> E8(Paint & Waterproofing)

    E_Sup --> E3(Supplier A)
    E_Sup --> E4(Supplier B)
