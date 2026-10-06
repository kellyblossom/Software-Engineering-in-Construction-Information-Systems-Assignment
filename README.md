# Assignment2-MVP


```mermaid
graph TD

    A[Homepage] --> B(Header & Search)
    A --> C(Banners)
    A --> D(Quick Links)
    A --> E(Categories)
    A --> F(Daily Discover / Flash Deals)

    %% Top left - interaction for suppliers
    B --> B1(Supplier Center)
    B --> B2(Start selling)
    %% Top right - interactions for contractors
    B --> B3(Sign up)
    B --> B4(login)
    B --> B5(Orders)

 
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
