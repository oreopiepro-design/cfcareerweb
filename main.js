// 才赋生涯® 招商网页交互功能

// 页面加载完成后初始化
document.addEventListener('DOMContentLoaded', function() {
    initScrollReveal();
    initNumberAnimation();
    initTabSwitching();
    initMobileMenu();
    initSmoothScrolling();
});

// 滚动显示动画
function initScrollReveal() {
    const revealElements = document.querySelectorAll('.reveal');
    
    const revealObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('active');
            }
        });
    }, {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    });
    
    revealElements.forEach(el => {
        revealObserver.observe(el);
    });
}

// 数字滚动动画
function initNumberAnimation() {
    const numberElements = document.querySelectorAll('.number-animate');
    
    const numberObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting && !entry.target.classList.contains('animated')) {
                entry.target.classList.add('animated');
                animateNumber(entry.target);
            }
        });
    }, { threshold: 0.5 });
    
    numberElements.forEach(el => {
        numberObserver.observe(el);
    });
}

function animateNumber(element) {
    const target = parseInt(element.getAttribute('data-target'));
    const duration = 2000; // 2秒
    const increment = target / (duration / 16); // 60fps
    let current = 0;
    
    const timer = setInterval(() => {
        current += increment;
        if (current >= target) {
            current = target;
            clearInterval(timer);
        }
        
        // 格式化数字
        if (target >= 1000) {
            element.textContent = Math.floor(current).toLocaleString();
        } else {
            element.textContent = Math.floor(current);
        }
    }, 16);
}

// 标签页切换功能
function initTabSwitching() {
    const tabButtons = document.querySelectorAll('.tab-button');
    const tabPanels = document.querySelectorAll('.tab-panel');
    
    tabButtons.forEach(button => {
        button.addEventListener('click', () => {
            const targetTab = button.getAttribute('data-tab');
            
            // 移除所有活动状态
            tabButtons.forEach(btn => {
                btn.classList.remove('tab-active');
                btn.classList.add('tab-inactive');
            });
            
            tabPanels.forEach(panel => {
                panel.classList.add('hidden');
                panel.classList.remove('active');
            });
            
            // 激活当前标签
            button.classList.remove('tab-inactive');
            button.classList.add('tab-active');
            
            const targetPanel = document.querySelector(`[data-panel="${targetTab}"]`);
            if (targetPanel) {
                targetPanel.classList.remove('hidden');
                targetPanel.classList.add('active');
            }
        });
    });
}

// 移动端菜单
function initMobileMenu() {
    // 移动端菜单切换功能将在需要时实现
}

function toggleMobileMenu() {
    // 移动端菜单切换逻辑
    alert('移动端菜单功能即将推出');
}

// 平滑滚动
function initSmoothScrolling() {
    const navLinks = document.querySelectorAll('a[href^="#"]');
    
    navLinks.forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            const targetId = link.getAttribute('href').substring(1);
            const targetElement = document.getElementById(targetId);
            
            if (targetElement) {
                const offsetTop = targetElement.offsetTop - 80; // 考虑导航栏高度
                window.scrollTo({
                    top: offsetTop,
                    behavior: 'smooth'
                });
            }
        });
    });
}

// 联系弹窗功能
function openContactModal() {
    const modal = document.getElementById('contactModal');
    if (modal) {
        modal.classList.remove('hidden');
        modal.classList.add('flex');
        document.body.style.overflow = 'hidden';
    }
}

function closeContactModal() {
    const modal = document.getElementById('contactModal');
    if (modal) {
        modal.classList.add('hidden');
        modal.classList.remove('flex');
        document.body.style.overflow = 'auto';
    }
}

// 点击弹窗外部关闭
document.addEventListener('click', function(e) {
    const modal = document.getElementById('contactModal');
    if (modal && e.target === modal) {
        closeContactModal();
    }
});

// ESC键关闭弹窗
document.addEventListener('keydown', function(e) {
    if (e.key === 'Escape') {
        closeContactModal();
    }
});

// 收益测算器功能（用于partnership.html页面）
class RevenueCalculator {
    constructor() {
        this.investment = 50000; // 固定投资5万元
        this.pricePerCustomer = 19800; // 客单价
        this.firstYearCustomers = 20; // 默认第一年客户数
        this.fissionRate = 3; // 默认裂变率
        this.firstStageRate = 0.5; // 回本阶段分成50%
        this.secondStageRate = 0.35; // 盈利阶段分成35%
        this.fissionRateActual = 0.35; // 裂变客户分成35%
        
        this.init();
    }
    
    init() {
        this.bindEvents();
        this.calculate();
    }
    
    bindEvents() {
        const customerSlider = document.getElementById('customerSlider');
        const fissionSlider = document.getElementById('fissionSlider');
        
        if (customerSlider) {
            customerSlider.addEventListener('input', (e) => {
                this.firstYearCustomers = parseInt(e.target.value);
                this.updateCustomerDisplay();
                this.calculate();
            });
        }
        
        if (fissionSlider) {
            fissionSlider.addEventListener('input', (e) => {
                this.fissionRate = parseInt(e.target.value);
                this.updateFissionDisplay();
                this.calculate();
            });
        }
    }
    
    updateCustomerDisplay() {
        const display = document.getElementById('customerDisplay');
        if (display) {
            display.textContent = this.firstYearCustomers;
        }
    }
    
    updateFissionDisplay() {
        const display = document.getElementById('fissionDisplay');
        if (display) {
            display.textContent = this.fissionRate;
        }
    }
    
    calculate() {
        // 第一年收益计算
        const firstStageCustomers = Math.min(5, this.firstYearCustomers); // 前5单回本
        const secondStageCustomers = Math.max(0, this.firstYearCustomers - 5); // 剩余客户
        
        const firstStageRevenue = firstStageCustomers * this.pricePerCustomer * this.firstStageRate;
        const secondStageRevenue = secondStageCustomers * this.pricePerCustomer * this.secondStageRate;
        const firstYearTotal = firstStageRevenue + secondStageRevenue;
        
        // 第二年收益计算（含裂变）
        const fissionCustomers = this.firstYearCustomers * this.fissionRate;
        const secondYearTotal = (this.firstYearCustomers + fissionCustomers) * this.pricePerCustomer * this.fissionRateActual;
        
        // 更新显示
        this.updateDisplay({
            firstYearTotal,
            secondYearTotal,
            firstStageRevenue,
            secondStageRevenue,
            fissionCustomers,
            totalTwoYear: firstYearTotal + secondYearTotal
        });
    }
    
    updateDisplay(data) {
        // 更新收益显示元素
        const elements = {
            'firstYearRevenue': data.firstYearTotal,
            'secondYearRevenue': data.secondYearTotal,
            'totalRevenue': data.totalTwoYear,
            'fissionCustomers': data.fissionCustomers
        };
        
        Object.entries(elements).forEach(([id, value]) => {
            const element = document.getElementById(id);
            if (element) {
                element.textContent = this.formatCurrency(value);
            }
        });
        
        // 更新图表
        this.updateChart(data);
    }
    
    formatCurrency(amount) {
        return new Intl.NumberFormat('zh-CN', {
            style: 'currency',
            currency: 'CNY',
            minimumFractionDigits: 0,
            maximumFractionDigits: 0
        }).format(amount);
    }
    
    updateChart(data) {
        const chartElement = document.getElementById('revenueChart');
        if (!chartElement || typeof echarts === 'undefined') return;
        
        const chart = echarts.getInstanceByDom(chartElement) || echarts.init(chartElement);
        
        const option = {
            backgroundColor: 'transparent',
            tooltip: {
                trigger: 'axis',
                backgroundColor: 'rgba(0,0,0,0.8)',
                textStyle: { color: '#fff' }
            },
            legend: {
                data: ['第一年收益', '第二年收益'],
                textStyle: { color: '#666' }
            },
            xAxis: {
                type: 'category',
                data: ['第一年', '第二年'],
                axisLine: { lineStyle: { color: '#ddd' } },
                axisTick: { lineStyle: { color: '#ddd' } },
                axisLabel: { color: '#666' }
            },
            yAxis: {
                type: 'value',
                axisLine: { lineStyle: { color: '#ddd' } },
                axisTick: { lineStyle: { color: '#ddd' } },
                axisLabel: { 
                    color: '#666',
                    formatter: function(value) {
                        return value / 10000 + '万';
                    }
                },
                splitLine: { lineStyle: { color: '#f0f0f0' } }
            },
            series: [
                {
                    name: '第一年收益',
                    type: 'bar',
                    data: [data.firstYearTotal, 0],
                    itemStyle: {
                        color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
                            { offset: 0, color: '#3b82f6' },
                            { offset: 1, color: '#1e3a8a' }
                        ])
                    },
                    barWidth: '40%'
                },
                {
                    name: '第二年收益',
                    type: 'bar',
                    data: [0, data.secondYearTotal],
                    itemStyle: {
                        color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
                            { offset: 0, color: '#f59e0b' },
                            { offset: 1, color: '#d97706' }
                        ])
                    },
                    barWidth: '40%'
                }
            ]
        };
        
        chart.setOption(option);
    }
}

// 页面特定初始化
if (window.location.pathname.includes('partnership.html')) {
    document.addEventListener('DOMContentLoaded', function() {
        new RevenueCalculator();
    });
}

// 工具函数
const utils = {
    // 防抖函数
    debounce: function(func, wait) {
        let timeout;
        return function executedFunction(...args) {
            const later = () => {
                clearTimeout(timeout);
                func(...args);
            };
            clearTimeout(timeout);
            timeout = setTimeout(later, wait);
        };
    },
    
    // 节流函数
    throttle: function(func, limit) {
        let inThrottle;
        return function() {
            const args = arguments;
            const context = this;
            if (!inThrottle) {
                func.apply(context, args);
                inThrottle = true;
                setTimeout(() => inThrottle = false, limit);
            }
        };
    },
    
    // 检测元素是否在视口内
    isInViewport: function(element) {
        const rect = element.getBoundingClientRect();
        return (
            rect.top >= 0 &&
            rect.left >= 0 &&
            rect.bottom <= (window.innerHeight || document.documentElement.clientHeight) &&
            rect.right <= (window.innerWidth || document.documentElement.clientWidth)
        );
    }
};

// 导出到全局
window.utils = utils;
window.RevenueCalculator = RevenueCalculator;

// 页面性能优化
window.addEventListener('load', function() {
    // 延迟加载非关键资源
    setTimeout(() => {
        // 预加载其他页面
        const pages = ['products.html', 'partnership.html', 'about.html'];
        pages.forEach(page => {
            const link = document.createElement('link');
            link.rel = 'prefetch';
            link.href = page;
            document.head.appendChild(link);
        });
    }, 2000);
});

// 错误处理
window.addEventListener('error', function(e) {
    console.error('页面错误:', e.error);
});

// 导出主要函数到全局
window.openContactModal = openContactModal;
window.closeContactModal = closeContactModal;
window.toggleMobileMenu = toggleMobileMenu;