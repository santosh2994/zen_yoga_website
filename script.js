class YogaStudioApp {
    constructor() {
        this.currentUser = null;
        this.users = JSON.parse(localStorage.getItem('yogaUsers')) || [];
        this.selectedPackages = [];
        this.packageSchedules = {
            'morning-monthly': { days: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri'], time: '6:00-7:30' },
            'morning-yearly': { days: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri'], time: '6:00-7:30' },
            'evening-monthly': { days: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri'], time: '18:00-19:30' },
            'evening-yearly': { days: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri'], time: '18:00-19:30' },
            'weekend-monthly': { days: ['Sat', 'Sun'], time: '9:00-10:30' },
            'unlimited-yearly': { days: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'], time: 'all' }
        };
        
        this.init();
    }

    init() {
        this.bindEvents();
        this.checkAuthStatus();
    }

    bindEvents() {
        // Auth Events
        document.getElementById('loginBtn').addEventListener('click', () => this.showSection('auth'));
        document.getElementById('registerBtn').addEventListener('click', () => this.showSection('auth'));
        document.getElementById('dashboardBtn').addEventListener('click', () => this.showSection('dashboard'));
        document.getElementById('logoutBtn').addEventListener('click', () => this.logout());
        
        document.getElementById('showRegister').addEventListener('click', (e) => {
            e.preventDefault();
            this.toggleAuthForm('register');
        });
        
        document.getElementById('showLogin').addEventListener('click', (e) => {
            e.preventDefault();
            this.toggleAuthForm('login');
        });

        // Form Submissions
        document.querySelector('#loginForm form').addEventListener('submit', (e) => {
            e.preventDefault();
            this.handleLogin();
        });
        
        document.querySelector('#registerForm form').addEventListener('submit', (e) => {
            e.preventDefault();
            this.handleRegister();
        });

        // Package Selection
        document.querySelectorAll('.select-package').forEach(btn => {
            btn.addEventListener('click', (e) => {
                const packageCard = e.target.closest('.package-card');
                const packageId = packageCard.dataset.package;
                this.togglePackageSelection(packageId, packageCard);
            });
        });

        // Proceed to Payment
        document.getElementById('proceedBtn').addEventListener('click', () => {
            this.proceedToPayment();
        });
    }

    checkAuthStatus() {
        const savedUser = localStorage.getItem('currentYogaUser');
        if (savedUser) {
            this.currentUser = JSON.parse(savedUser);
            this.showAuthenticatedState();
        } else {
            this.showSection('auth');
        }
    }

    showSection(section) {
        document.querySelectorAll('.main > section').forEach(s => s.classList.add('hidden'));
        
        switch(section) {
            case 'auth':
                document.getElementById('authSection').classList.remove('hidden');
                break;
            case 'packages':
                document.getElementById('packagesSection').classList.remove('hidden');
                break;
            case 'dashboard':
                document.getElementById('dashboardSection').classList.remove('hidden');
                this.loadDashboard();
                break;
        }
    }

    toggleAuthForm(type) {
        const loginForm = document.getElementById('loginForm');
        const registerForm = document.getElementById('registerForm');
        
        if (type === 'register') {
            loginForm.classList.add('hidden');
            registerForm.classList.remove('hidden');
        } else {
            registerForm.classList.add('hidden');
            loginForm.classList.remove('hidden');
        }
    }

    handleLogin() {
        const email = document.getElementById('loginEmail').value;
        const password = document.getElementById('loginPassword').value;
        
        const user = this.users.find(u => u.email === email && u.password === password);
        
        if (user) {
            this.currentUser = user;
            localStorage.setItem('currentYogaUser', JSON.stringify(user));
            this.showAuthenticatedState();
            this.showNotification('Login successful!', 'success');
        } else {
            this.showNotification('Invalid email or password', 'error');
        }
    }

    handleRegister() {
        const name = document.getElementById('registerName').value;
        const email = document.getElementById('registerEmail').value;
        const password = document.getElementById('registerPassword').value;
        const phone = document.getElementById('registerPhone').value;
        
        if (this.users.find(u => u.email === email)) {
            this.showNotification('Email already registered', 'error');
            return;
        }
        
        const newUser = {
            id: Date.now(),
            name,
            email,
            password,
            phone,
            subscriptions: [],
            joinDate: new Date().toISOString()
        };
        
        this.users.push(newUser);
        localStorage.setItem('yogaUsers', JSON.stringify(this.users));
        
        this.currentUser = newUser;
        localStorage.setItem('currentYogaUser', JSON.stringify(newUser));
        
        this.showAuthenticatedState();
        this.showNotification('Registration successful!', 'success');
    }

    showAuthenticatedState() {
        document.getElementById('loginBtn').classList.add('hidden');
        document.getElementById('registerBtn').classList.add('hidden');
        document.getElementById('dashboardBtn').classList.remove('hidden');
        document.getElementById('logoutBtn').classList.remove('hidden');
        
        this.showSection('packages');
    }

    logout() {
        this.currentUser = null;
        localStorage.removeItem('currentYogaUser');
        
        document.getElementById('loginBtn').classList.remove('hidden');
        document.getElementById('registerBtn').classList.remove('hidden');
        document.getElementById('dashboardBtn').classList.add('hidden');
        document.getElementById('logoutBtn').classList.add('hidden');
        
        this.selectedPackages = [];
        this.updateSelectedPackagesDisplay();
        
        this.showSection('auth');
        this.showNotification('Logged out successfully', 'success');
    }

    togglePackageSelection(packageId, packageCard) {
        const index = this.selectedPackages.indexOf(packageId);
        
        if (index > -1) {
            this.selectedPackages.splice(index, 1);
            packageCard.classList.remove('selected');
        } else {
            this.selectedPackages.push(packageId);
            packageCard.classList.add('selected');
        }
        
        this.updateSelectedPackagesDisplay();
        this.checkScheduleConflicts();
    }

    updateSelectedPackagesDisplay() {
        const packagesList = document.getElementById('packagesList');
        const proceedBtn = document.getElementById('proceedBtn');
        
        if (this.selectedPackages.length === 0) {
            packagesList.innerHTML = '<p>No packages selected</p>';
            proceedBtn.classList.add('hidden');
            return;
        }
        
        const packageNames = {
            'morning-monthly': 'Morning Bliss Monthly - $89/month',
            'morning-yearly': 'Morning Bliss Yearly - $890/year',
            'evening-monthly': 'Evening Zen Monthly - $89/month',
            'evening-yearly': 'Evening Zen Yearly - $890/year',
            'weekend-monthly': 'Weekend Warrior Monthly - $59/month',
            'unlimited-yearly': 'Unlimited Yearly - $1490/year'
        };
        
        packagesList.innerHTML = this.selectedPackages.map(packageId => `
            <div class="selected-item">
                <span>${packageNames[packageId]}</span>
                <button onclick="app.removePackage('${packageId}')">Remove</button>
            </div>
        `).join('');
        
        proceedBtn.classList.remove('hidden');
    }

    removePackage(packageId) {
        const packageCard = document.querySelector(`[data-package="${packageId}"]`);
        if (packageCard) {
            packageCard.classList.remove('selected');
        }
        
        this.selectedPackages = this.selectedPackages.filter(id => id !== packageId);
        this.updateSelectedPackagesDisplay();
        this.checkScheduleConflicts();
    }

    checkScheduleConflicts() {
        const conflictWarning = document.getElementById('conflictWarning');
        const conflicts = this.detectScheduleConflicts();
        
        if (conflicts.length > 0) {
            conflictWarning.classList.remove('hidden');
            conflictWarning.innerHTML = `
                ⚠️ Schedule Conflict Detected!<br>
                Conflicting packages: ${conflicts.join(', ')}<br>
                Please review your selection and choose different time slots.
            `;
        } else {
            conflictWarning.classList.add('hidden');
        }
    }

    detectScheduleConflicts() {
        const conflicts = [];
        const timeSlots = {};
        
        this.selectedPackages.forEach(packageId => {
            const schedule = this.packageSchedules[packageId];
            if (!schedule) return;
            
            if (schedule.time === 'all') return; // Unlimited package doesn't conflict
            
            schedule.days.forEach(day => {
                const key = `${day}-${schedule.time}`;
                if (timeSlots[key]) {
                    conflicts.push(`${timeSlots[key]} and ${packageId}`);
                } else {
                    timeSlots[key] = packageId;
                }
            });
        });
        
        return [...new Set(conflicts)]; // Remove duplicates
    }

    proceedToPayment() {
        if (this.detectScheduleConflicts().length > 0) {
            this.showNotification('Please resolve schedule conflicts before proceeding', 'error');
            return;
        }
        
        // Calculate total price
        const prices = {
            'morning-monthly': 89,
            'morning-yearly': 890,
            'evening-monthly': 89,
            'evening-yearly': 890,
            'weekend-monthly': 59,
            'unlimited-yearly': 1490
        };
        
        const total = this.selectedPackages.reduce((sum, packageId) => sum + prices[packageId], 0);
        
        // In a real app, this would integrate with a payment processor
        const confirmPayment = confirm(`Total: $${total}\n\nProceed with payment?`);
        
        if (confirmPayment) {
            // Add packages to user's subscriptions
            this.currentUser.subscriptions = this.currentUser.subscriptions || [];
            
            this.selectedPackages.forEach(packageId => {
                this.currentUser.subscriptions.push({
                    packageId,
                    startDate: new Date().toISOString(),
                    status: 'active'
                });
            });
            
            // Update user data
            const userIndex = this.users.findIndex(u => u.id === this.currentUser.id);
            this.users[userIndex] = this.currentUser;
            localStorage.setItem('yogaUsers', JSON.stringify(this.users));
            localStorage.setItem('currentYogaUser', JSON.stringify(this.currentUser));
            
            this.showNotification('Payment successful! Welcome to Zen Yoga Studio!', 'success');
            this.showSection('dashboard');
            
            // Reset package selection
            this.selectedPackages = [];
            document.querySelectorAll('.package-card').forEach(card => card.classList.remove('selected'));
            this.updateSelectedPackagesDisplay();
        }
    }

    loadDashboard() {
        this.loadActiveSubscriptions();
        this.loadUpcomingSessions();
        this.loadAccountInfo();
    }

    loadActiveSubscriptions() {
        const container = document.getElementById('activeSubscriptions');
        
        if (!this.currentUser.subscriptions || this.currentUser.subscriptions.length === 0) {
            container.innerHTML = '<p>No active subscriptions</p>';
            return;
        }
        
        const packageNames = {
            'morning-monthly': 'Morning Bliss Monthly',
            'morning-yearly': 'Morning Bliss Yearly',
            'evening-monthly': 'Evening Zen Monthly',
            'evening-yearly': 'Evening Zen Yearly',
            'weekend-monthly': 'Weekend Warrior Monthly',
            'unlimited-yearly': 'Unlimited Yearly'
        };
        
        container.innerHTML = this.currentUser.subscriptions.map(sub => `
            <div class="subscription-item">
                <h4>${packageNames[sub.packageId]}</h4>
                <p>Started: ${new Date(sub.startDate).toLocaleDateString()}</p>
                <p>Status: <span class="status-${sub.status}">${sub.status}</span></p>
            </div>
        `).join('');
    }

    loadUpcomingSessions() {
        const container = document.getElementById('upcomingSessions');
        
        if (!this.currentUser.subscriptions || this.currentUser.subscriptions.length === 0) {
            container.innerHTML = '<p>No upcoming sessions</p>';
            return;
        }
        
        // Generate next 7 days of sessions based on subscriptions
        const sessions = [];
        const today = new Date();
        
        for (let i = 0; i < 7; i++) {
            const date = new Date(today);
            date.setDate(today.getDate() + i);
            const dayName = date.toLocaleDateString('en-US', { weekday: 'short' });
            
            this.currentUser.subscriptions.forEach(sub => {
                const schedule = this.packageSchedules[sub.packageId];
                if (schedule && schedule.days.includes(dayName)) {
                    sessions.push({
                        date: date.toLocaleDateString(),
                        day: dayName,
                        time: schedule.time,
                        package: sub.packageId
                    });
                }
            });
        }
        
        if (sessions.length === 0) {
            container.innerHTML = '<p>No upcoming sessions</p>';
            return;
        }
        
        container.innerHTML = sessions.slice(0, 5).map(session => `
            <div class="session-item">
                <p><strong>${session.date}</strong></p>
                <p>${session.time}</p>
            </div>
        `).join('');
    }

    loadAccountInfo() {
        const container = document.getElementById('accountInfo');
        
        container.innerHTML = `
            <div class="account-details">
                <p><strong>Name:</strong> ${this.currentUser.name}</p>
                <p><strong>Email:</strong> ${this.currentUser.email}</p>
                <p><strong>Phone:</strong> ${this.currentUser.phone}</p>
                <p><strong>Member since:</strong> ${new Date(this.currentUser.joinDate).toLocaleDateString()}</p>
            </div>
        `;
    }

    showNotification(message, type) {
        // Create notification element
        const notification = document.createElement('div');
        notification.className = `notification notification-${type}`;
        notification.textContent = message;
        
        // Style the notification
        Object.assign(notification.style, {
            position: 'fixed',
            top: '20px',
            right: '20px',
            padding: '1rem 1.5rem',
            borderRadius: '8px',
            color: 'white',
            fontWeight: 'bold',
            zIndex: '10000',
            boxShadow: '0 4px 12px rgba(0,0,0,0.15)',
            transform: 'translateX(100%)',
            transition: 'transform 0.3s ease'
        });
        
        if (type === 'success') {
            notification.style.backgroundColor = '#28a745';
        } else if (type === 'error') {
            notification.style.backgroundColor = '#dc3545';
        }
        
        document.body.appendChild(notification);
        
        // Animate in
        setTimeout(() => {
            notification.style.transform = 'translateX(0)';
        }, 100);
        
        // Auto remove after 3 seconds
        setTimeout(() => {
            notification.style.transform = 'translateX(100%)';
            setTimeout(() => {
                document.body.removeChild(notification);
            }, 300);
        }, 3000);
    }
}

// Initialize the app
const app = new YogaStudioApp();