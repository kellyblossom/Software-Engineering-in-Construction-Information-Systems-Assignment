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
    D --> D2(Order & Delivery Tracking - Rep: Procurement Officer & Supplier)
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


---
## 🎨 優先級色彩設計系統

### 色彩對應表

| 優先級 | 顏色 | 色碼 | 使用場景 | 示例 |
|--------|------|------|---------|------|
| 🔴 **Critical** | 紅色 | `#DC143C` | 需要立即處理 | 逾期訂單、應急材料 |
| 🟠 **High** | 橙色 | `#FF8C00` | 24-48小時內處理 | 即將逾期訂單 |
| 🟡 **Medium** | 黃色 | `#FFD700` | 標準優先級 | 常規訂單 |
| 🟢 **Low** | 綠色 | `#28A745` | 可延後處理 | 計劃採購 |
| ⚪ **Pending** | 灰色 | `#6C757D` | 待確認 | 待審批訂單 |

---

## 📌 優先級應用區域

### 1. 訂單追蹤頁面（Order & Delivery Tracking）
- 訂單卡片左邊框用顏色表示優先級
- 紅色訂單置頂顯示
- 支持按優先級篩選和排序
- 優先級變化實時更新

### 2. 儀表板（Dashboard - Project Manager）
- 優先級統計摘要：「2個緊急 | 5個高 | 12個中等」
- 優先級徽章標籤
- 實時優先級警報
- 按優先級自動排序

### 3. 材料管理（Material Management）
- 材料需求卡片帶色彩指示器
- 按優先級自動排序
- 優先級變化實時提醒
- 供應商匹配優先級顯示

### 4. 供應商管理（Supplier Management）
- 交貨期限著色（紅=逾期、橙=即將逾期、綠=正常）
- 報價優先級標記
- 優先級驅動的交貨提醒

---

## 💻 前端實現指南

### Step 1: CSS 變數定義

在你的主 CSS 文件中定義優先級色彩變數：

```css
/* colors.css 或 variables.css */
:root {
  /* Priority Colors */
  --priority-critical: #DC143C;
  --priority-critical-light: rgba(220, 20, 60, 0.1);
  --priority-critical-bg: rgba(220, 20, 60, 0.05);
  
  --priority-high: #FF8C00;
  --priority-high-light: rgba(255, 140, 0, 0.1);
  --priority-high-bg: rgba(255, 140, 0, 0.05);
  
  --priority-medium: #FFD700;
  --priority-medium-light: rgba(255, 215, 0, 0.1);
  --priority-medium-bg: rgba(255, 215, 0, 0.05);
  
  --priority-low: #28A745;
  --priority-low-light: rgba(40, 167, 69, 0.1);
  --priority-low-bg: rgba(40, 167, 69, 0.05);
  
  --priority-pending: #6C757D;
  --priority-pending-light: rgba(108, 117, 125, 0.1);
  --priority-pending-bg: rgba(108, 117, 125, 0.05);
}
```

### Step 2: 訂單卡片樣式

```css
/* order-card.css */

/* 基礎訂單卡片樣式 */
.order-card {
  border-left: 4px solid;
  padding: 16px;
  margin-bottom: 12px;
  border-radius: 4px;
  background-color: #fff;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
  transition: all 0.3s ease;
}

.order-card:hover {
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.15);
}

/* 優先級特定樣式 */
.order-card.priority-critical {
  border-left-color: var(--priority-critical);
  background-color: var(--priority-critical-bg);
}

.order-card.priority-high {
  border-left-color: var(--priority-high);
  background-color: var(--priority-high-bg);
}

.order-card.priority-medium {
  border-left-color: var(--priority-medium);
  background-color: var(--priority-medium-bg);
}

.order-card.priority-low {
  border-left-color: var(--priority-low);
  background-color: var(--priority-low-bg);
}

.order-card.priority-pending {
  border-left-color: var(--priority-pending);
  background-color: var(--priority-pending-bg);
}

/* 優先級徽章樣式 */
.priority-badge {
  display: inline-block;
  padding: 4px 12px;
  border-radius: 4px;
  font-weight: bold;
  color: white;
  font-size: 12px;
  text-transform: uppercase;
  margin-right: 8px;
}

.priority-badge.critical {
  background-color: var(--priority-critical);
}

.priority-badge.high {
  background-color: var(--priority-high);
}

.priority-badge.medium {
  background-color: var(--priority-medium);
  color: #333;
}

.priority-badge.low {
  background-color: var(--priority-low);
}

.priority-badge.pending {
  background-color: var(--priority-pending);
}

/* 優先級指示符（小圓點） */
.priority-indicator {
  display: inline-block;
  width: 12px;
  height: 12px;
  border-radius: 50%;
  margin-right: 6px;
  vertical-align: middle;
}

.priority-indicator.critical {
  background-color: var(--priority-critical);
}

.priority-indicator.high {
  background-color: var(--priority-high);
}

.priority-indicator.medium {
  background-color: var(--priority-medium);
}

.priority-indicator.low {
  background-color: var(--priority-low);
}

.priority-indicator.pending {
  background-color: var(--priority-pending);
}
```

### Step 3: HTML 結構範例

```html
<!-- 訂單卡片示例 -->
<div class="order-card priority-critical">
  <div class="card-header">
    <span class="priority-badge critical">URGENT</span>
    <span class="order-id">Order #12345</span>
    <span class="order-date">2026-10-06</span>
  </div>
  
  <div class="card-body">
    <h3>Steel & Metals Supply</h3>
    <p>
      <span class="priority-indicator critical"></span>
      <strong>Priority:</strong> Critical
    </p>
    <p><strong>Supplier:</strong> Supplier A</p>
    <p><strong>Quantity:</strong> 500 kg</p>
    <p><strong>Expected Delivery:</strong> 2026-10-06</p>
    <p><strong>Status:</strong> <span class="status-badge overdue">Overdue</span></p>
  </div>
  
  <div class="card-footer">
    <button class="btn btn-primary">View Details</button>
    <button class="btn btn-secondary">Update Status</button>
  </div>
</div>

<!-- 訂單列表示例 -->
<div class="orders-list">
  <!-- Critical Orders (紅色) -->
  <div class="order-card priority-critical">
    <!-- ... -->
  </div>
  
  <!-- High Priority Orders (橙色) -->
  <div class="order-card priority-high">
    <!-- ... -->
  </div>
  
  <!-- Medium Priority Orders (黃色) -->
  <div class="order-card priority-medium">
    <!-- ... -->
  </div>
  
  <!-- Low Priority Orders (綠色) -->
  <div class="order-card priority-low">
    <!-- ... -->
  </div>
</div>
```

### Step 4: React 元件範例

```jsx
// OrderCard.jsx
import React from 'react';
import './OrderCard.css';

const priorityConfig = {
  critical: { label: 'URGENT', className: 'critical', color: '#DC143C' },
  high: { label: 'HIGH', className: 'high', color: '#FF8C00' },
  medium: { label: 'MEDIUM', className: 'medium', color: '#FFD700' },
  low: { label: 'LOW', className: 'low', color: '#28A745' },
  pending: { label: 'PENDING', className: 'pending', color: '#6C757D' },
};

export function OrderCard({ order, priority = 'medium' }) {
  const config = priorityConfig[priority];

  return (
    <div className={`order-card priority-${priority}`}>
      <div className="card-header">
        <span className={`priority-badge ${config.className}`}>
          {config.label}
        </span>
        <span className="order-id">Order #{order.id}</span>
        <span className="order-date">{order.date}</span>
      </div>

      <div className="card-body">
        <h3>{order.material}</h3>
        <p>
          <span className={`priority-indicator ${config.className}`}></span>
          <strong>Priority:</strong> {config.label}
        </p>
        <p><strong>Supplier:</strong> {order.supplier}</p>
        <p><strong>Quantity:</strong> {order.quantity}</p>
        <p><strong>Expected Delivery:</strong> {order.expectedDelivery}</p>
        <p><strong>Status:</strong> <span className={`status-badge ${order.status.toLowerCase()}`}>{order.status}</span></p>
      </div>

      <div className="card-footer">
        <button className="btn btn-primary">View Details</button>
        <button className="btn btn-secondary">Update Status</button>
      </div>
    </div>
  );
}

// OrdersList.jsx
import React, { useState, useMemo } from 'react';
import { OrderCard } from './OrderCard';

const priorityOrder = {
  critical: 0,
  high: 1,
  medium: 2,
  low: 3,
  pending: 4,
};

export function OrdersList({ orders }) {
  const [filterPriority, setFilterPriority] = useState(null);

  // 按優先級排序和篩選
  const sortedOrders = useMemo(() => {
    let filtered = orders;

    if (filterPriority) {
      filtered = orders.filter((order) => order.priority === filterPriority);
    }

    return filtered.sort(
      (a, b) => priorityOrder[a.priority] - priorityOrder[b.priority]
    );
  }, [orders, filterPriority]);

  // 計算優先級統計
  const stats = useMemo(() => {
    return {
      critical: orders.filter((o) => o.priority === 'critical').length,
      high: orders.filter((o) => o.priority === 'high').length,
      medium: orders.filter((o) => o.priority === 'medium').length,
      low: orders.filter((o) => o.priority === 'low').length,
      pending: orders.filter((o) => o.priority === 'pending').length,
    };
  }, [orders]);

  return (
    <div className="orders-container">
      {/* 優先級統計 */}
      <div className="priority-summary">
        <h3>Order Summary</h3>
        <div className="summary-badges">
          <span className="summary-badge critical">
            🔴 {stats.critical} Critical
          </span>
          <span className="summary-badge high">
            🟠 {stats.high} High
          </span>
          <span className="summary-badge medium">
            🟡 {stats.medium} Medium
          </span>
          <span className="summary-badge low">
            🟢 {stats.low} Low
          </span>
          <span className="summary-badge pending">
            ⚪ {stats.pending} Pending
          </span>
        </div>
      </div>

      {/* 優先級篩選按鈕 */}
      <div className="filter-buttons">
        <button
          className={`filter-btn ${!filterPriority ? 'active' : ''}`}
          onClick={() => setFilterPriority(null)}
        >
          All Orders
        </button>
        <button
          className={`filter-btn critical ${filterPriority === 'critical' ? 'active' : ''}`}
          onClick={() => setFilterPriority('critical')}
        >
          🔴 Critical ({stats.critical})
        </button>
        <button
          className={`filter-btn high ${filterPriority === 'high' ? 'active' : ''}`}
          onClick={() => setFilterPriority('high')}
        >
          🟠 High ({stats.high})
        </button>
        <button
          className={`filter-btn medium ${filterPriority === 'medium' ? 'active' : ''}`}
          onClick={() => setFilterPriority('medium')}
        >
          🟡 Medium ({stats.medium})
        </button>
        <button
          className={`filter-btn low ${filterPriority === 'low' ? 'active' : ''}`}
          onClick={() => setFilterPriority('low')}
        >
          🟢 Low ({stats.low})
        </button>
      </div>

      {/* 訂單列表 */}
      <div className="orders-list">
        {sortedOrders.map((order) => (
          <OrderCard key={order.id} order={order} priority={order.priority} />
        ))}
      </div>
    </div>
  );
}
```

### Step 5: 儀表板統計樣式

```css
/* dashboard.css */

.priority-summary {
  background: #f8f9fa;
  padding: 16px;
  border-radius: 8px;
  margin-bottom: 20px;
}

.priority-summary h3 {
  margin: 0 0 12px 0;
  font-size: 16px;
  color: #333;
}

.summary-badges {
  display: flex;
  gap: 12px;
  flex-wrap: wrap;
}

.summary-badge {
  display: inline-block;
  padding: 8px 16px;
  border-radius: 6px;
  font-weight: bold;
  font-size: 14px;
  background-color: #fff;
  border: 2px solid;
}

.summary-badge.critical {
  border-color: var(--priority-critical);
  color: var(--priority-critical);
}

.summary-badge.high {
  border-color: var(--priority-high);
  color: var(--priority-high);
}

.summary-badge.medium {
  border-color: var(--priority-medium);
  color: #333;
}

.summary-badge.low {
  border-color: var(--priority-low);
  color: var(--priority-low);
}

.summary-badge.pending {
  border-color: var(--priority-pending);
  color: var(--priority-pending);
}

/* 篩選按鈕 */
.filter-buttons {
  display: flex;
  gap: 8px;
  margin-bottom: 20px;
  flex-wrap: wrap;
}

.filter-btn {
  padding: 8px 16px;
  border: 2px solid #ddd;
  border-radius: 6px;
  background-color: #fff;
  cursor: pointer;
  font-weight: 500;
  transition: all 0.2s ease;
}

.filter-btn:hover {
  border-color: #999;
}

.filter-btn.active {
  background-color: #333;
  color: #fff;
  border-color: #333;
}

.filter-btn.critical.active {
  background-color: var(--priority-critical);
  border-color: var(--priority-critical);
}

.filter-btn.high.active {
  background-color: var(--priority-high);
  border-color: var(--priority-high);
}

.filter-btn.medium.active {
  background-color: var(--priority-medium);
  border-color: var(--priority-medium);
  color: #333;
}

.filter-btn.low.active {
  background-color: var(--priority-low);
  border-color: var(--priority-low);
}
```

---

## ✨ 核心功能清單

- ✅ 材料瀏覽與搜尋
- ✅ 供應商發現與比較
- ✅ 報價管理
- ✅ **訂單優先級色彩編碼** ⭐
- ✅ **優先級實時警報** ⭐
- ✅ **優先級篩選和排序** ⭐
- ✅ **儀表板優先級統計** ⭐
- ✅ 交貨追蹤
- ✅ 角色型儀表板

---

## 🚀 開發路線圖

- [x] 設計優先級色彩系統
- [ ] 實現 CSS 變數和樣式
- [ ] 創建 React 訂單卡片元件
- [ ] 建立訂單列表篩選功能
- [ ] 實現儀表板優先級統計
- [ ] 添加優先級排序功能
- [ ] 實現優先級變化通知
- [ ] 添加優先級報告功能
- [ ] 供應商管理優先級視覺化
- [ ] 材料管理優先級指示器

---

## 📝 技術棧

- **前端框架**: React / Next.js
- **樣式方案**: CSS Variables + CSS Modules / Tailwind CSS
- **狀態管理**: Redux / Context API
- **後端**: Node.js / Express
- **資料庫**: PostgreSQL / MongoDB
- **部署**: Vercel / Netlify / AWS

---

## 🔧 使用說明

### 快速開始

```bash
# 安裝依賴
npm install

# 開發模式運行
npm run dev

# 生產構建
npm run build

# 啟動生產伺服器
npm start
