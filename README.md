# 🧘‍♀️ Zen Yoga Studio - Subscription Management Website

A modern, responsive web application for a yoga studio featuring user registration, subscription package management, and intelligent scheduling conflict detection.

## ✨ Features

### 🔐 User Authentication
- **User Registration**: Complete signup with name, email, password, and phone number
- **Secure Login**: Persistent session management with local storage
- **Profile Management**: User dashboard with account information

### 📦 Subscription Packages
- **Monthly Packages**:
  - Morning Bliss Monthly ($89/month) - Mon-Fri 6:00-7:30 AM
  - Evening Zen Monthly ($89/month) - Mon-Fri 6:00-7:30 PM  
  - Weekend Warrior Monthly ($59/month) - Sat-Sun 9:00-10:30 AM

- **Yearly Packages** (with savings):
  - Morning Bliss Yearly ($890/year) - Save $178
  - Evening Zen Yearly ($890/year) - Save $178
  - Unlimited Yearly ($1490/year) - Access to all sessions

### 🎯 Smart Package Selection
- **Multi-Package Selection**: Users can combine different subscription packages
- **Real-time Conflict Detection**: Automatically identifies scheduling overlaps
- **Smart Recommendations**: Warns users about conflicting time slots
- **Dynamic Package Management**: Add/remove packages with instant feedback

### 📊 User Dashboard
- **Active Subscriptions**: Overview of all current yoga packages
- **Upcoming Sessions**: Next 7 days of scheduled classes
- **Account Information**: Personal details and membership history
- **Session Schedule**: Personalized timetable based on subscriptions

### 🎨 Modern Design
- **Responsive Layout**: Optimized for desktop, tablet, and mobile devices
- **Beautiful UI**: Gradient backgrounds and smooth animations
- **Intuitive Navigation**: Clean, user-friendly interface
- **Accessibility**: Proper contrast and readable fonts

## 🚀 Getting Started

### Prerequisites
- Modern web browser (Chrome, Firefox, Safari, Edge)
- No server setup required - runs entirely in the browser

### Installation

1. **Clone the repository**:
   ```bash
   git clone https://github.com/santosh2994/zen_yoga_website.git
   cd zen_yoga_website
   ```

2. **Open in browser**:
   ```bash
   # On macOS
   open index.html
   
   # On Windows
   start index.html
   
   # On Linux
   xdg-open index.html
   ```

3. **Or simply double-click** `index.html` to open in your default browser

## 📱 How to Use

### 1. Registration & Login
- Click **Register** to create a new account
- Fill in your details (name, email, password, phone)
- Or **Login** if you already have an account

### 2. Browse Packages
- View available monthly and yearly subscription options
- Compare pricing and schedules
- Read package features and benefits

### 3. Select Packages
- Click **Select Package** on desired subscriptions
- Mix and match different packages
- Watch for conflict warnings if schedules overlap

### 4. Conflict Resolution
- If conflicts are detected, you'll see a warning message
- Remove conflicting packages or choose different time slots
- System prevents booking overlapping sessions

### 5. Complete Subscription
- Review your selected packages
- Click **Proceed to Payment** when ready
- Confirm your subscription (demo payment)

### 6. Manage Subscriptions
- Access your **Dashboard** to view active subscriptions
- See upcoming sessions for the next week
- Review account information and membership details

## 🛠️ Technical Details

### Technologies Used
- **HTML5**: Semantic markup and structure
- **CSS3**: Modern styling with flexbox/grid, animations, and responsive design
- **Vanilla JavaScript**: Pure JS with ES6+ features, no external dependencies
- **Local Storage**: Client-side data persistence

### File Structure
```
zen_yoga_website/
├── index.html          # Main HTML structure
├── styles.css          # CSS styling and responsive design
├── script.js           # JavaScript functionality
└── README.md           # Project documentation
```

### Key JavaScript Classes
- `YogaStudioApp`: Main application controller
- User authentication and session management
- Package selection and conflict detection algorithms
- Dashboard data visualization

### Data Storage
- Uses browser's `localStorage` for data persistence
- User accounts, subscriptions, and preferences saved locally
- No backend server required

## 🔧 Customization

### Adding New Packages
1. Update the HTML in `index.html` to add new package cards
2. Add pricing information to the `prices` object in `script.js`
3. Update the `packageSchedules` object with new timing information
4. Add package names to the `packageNames` object

### Modifying Schedules
Edit the `packageSchedules` object in `script.js`:
```javascript
this.packageSchedules = {
    'package-id': { 
        days: ['Mon', 'Tue', 'Wed'], 
        time: '9:00-10:30' 
    }
};
```

### Styling Changes
- Modify `styles.css` for visual customizations
- Update CSS variables for color scheme changes
- Adjust responsive breakpoints in media queries

## 🎭 Demo Data

The application includes sample package data:
- Various pricing tiers from $59-$1490
- Different schedule options (morning, evening, weekend)
- Realistic yoga class types (Vinyasa, Restorative, Power Yoga)

## 🚧 Future Enhancements

- [ ] **Payment Integration**: Real payment gateway (Stripe, PayPal)
- [ ] **Email Notifications**: Confirmation and reminder emails
- [ ] **Calendar Integration**: Google/Outlook calendar sync
- [ ] **Instructor Profiles**: Meet your yoga teachers
- [ ] **Class Reviews**: User feedback and ratings
- [ ] **Mobile App**: React Native or Flutter version
- [ ] **Admin Dashboard**: Studio management interface
- [ ] **Waitlist System**: Handle fully booked classes
- [ ] **Membership Tiers**: Loyalty programs and discounts
- [ ] **Video Classes**: Online session streaming

## 🤝 Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📄 License

This project is open source and available under the [MIT License](LICENSE).

## 👏 Acknowledgments

- Designed for yoga studios and fitness centers
- Built with modern web standards and best practices
- Responsive design inspired by material design principles
- User experience optimized for conversion and retention

## 📞 Support

If you encounter any issues or have questions:
1. Check the [Issues](https://github.com/santosh2994/zen_yoga_website/issues) page
2. Create a new issue with detailed description
3. Include browser information and steps to reproduce

---

**🧘‍♀️ Find your inner peace with Zen Yoga Studio**

*Built with ❤️ for the yoga community*