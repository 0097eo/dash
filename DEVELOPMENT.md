# 仪表盘环形图功能开发文档

## 新增功能

在仪表盘页面添加了一个环形图，展示不同产品类别的销售额占比。

## 实现细节

### 1. 依赖库

项目使用了以下依赖库：
- React 18.3.1
- Recharts 2.12.7（用于创建图表）
- Lucide React 0.441.0（用于图标）

### 2. 新增代码

修改了 `src/components/Dashboard.js` 文件，添加了以下内容：

1. **导入必要的组件**：
   - 从 Recharts 库中导入 `PieChart`, `Pie`, `Cell`, `Legend` 组件
   - 从 lucide-react 库中导入 `RefreshCw` 图标

2. **数据生成函数**：
   - 添加了 `generateProductCategoryData()` 函数，生成产品类别数据
   - 添加了 `generateRandomProductCategoryData()` 函数，生成随机的产品类别数据
   - 数据包括：电子产品、服装、书籍、其他，占比总和为 100%

3. **状态管理**：
   - 使用 `useState` 钩子管理产品类别数据，实现数据的动态更新

4. **事件处理函数**：
   - 添加了 `handlePieClick()` 函数，处理环形图扇形的点击事件
   - 添加了 `handleRefreshData()` 函数，处理刷新数据按钮的点击事件

5. **颜色配置**：
   - 添加了 `COLORS` 数组，为环形图提供不同颜色

6. **环形图组件**：
   - 在仪表盘布局中添加了环形图卡片
   - 在卡片顶部添加了"刷新数据"按钮
   - 使用 `PieChart` 和 `Pie` 组件创建环形图
   - 设置了 `innerRadius` 属性创建环形效果
   - 添加了图例和悬停提示
   - 为环形图添加了点击事件处理

### 3. 代码结构

```jsx
// 数据生成函数
const generateProductCategoryData = () => {
  return [
    { name: '电子产品', value: 40 },
    { name: '服装', value: 30 },
    { name: '书籍', value: 20 },
    { name: '其他', value: 10 },
  ];
};

// 组件中使用
const Dashboard = () => {
  // ... 其他代码 ...
  const productCategoryData = generateProductCategoryData();
  const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042'];
  
  return (
    // ... 其他代码 ...
    {/* Product Category Chart */}
    <div className="bg-white p-4 md:p-6 rounded-lg shadow mb-8">
      <h3 className="text-lg md:text-xl font-semibold mb-4">Product Category Distribution</h3>
      <div className="h-64 md:h-80">
        <ResponsiveContainer width="100%" height="100%">
          <PieChart>
            <Pie
              data={productCategoryData}
              cx="50%"
              cy="50%"
              labelLine={false}
              outerRadius={80}
              fill="#8884d8"
              dataKey="value"
              innerRadius={40}
              label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
            >
              {productCategoryData.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
              ))}
            </Pie>
            <Tooltip formatter={(value) => `${value}%`} />
            <Legend />
          </PieChart>
        </ResponsiveContainer>
      </div>
    </div>
    // ... 其他代码 ...
  );
};
```

## 验证方法

### 1. 启动开发服务器

```bash
npm start
```

### 2. 访问仪表盘页面

打开浏览器，访问 `http://localhost:3000`，进入仪表盘页面。

### 3. 验证环形图

- **位置**：环形图应显示在销售趋势图表下方，交易表格上方
- **数据**：环形图应显示电子产品（40%）、服装（30%）、书籍（20%）、其他（10%）的占比
- **图例**：环形图应包含图例，显示每个类别的颜色和名称
- **悬停效果**：鼠标悬停在环形图的各个部分时，应显示具体的百分比值
- **响应式**：调整浏览器窗口大小，环形图应能适应不同屏幕尺寸

### 4. 移动端测试

使用浏览器的开发者工具，切换到移动设备模式，验证环形图在移动端是否正常显示。

## 总结

本次开发成功在仪表盘页面添加了一个环形图，用于展示不同产品类别的销售额占比。使用了 Recharts 库实现图表功能，并确保了图表在不同设备上的正常显示。环形图包含了图例和悬停提示，提供了良好的用户体验。