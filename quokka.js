const json = {
  "home": {
    "slice": "homepage",
    "navbar": "Dashboard",
    "link": "/dashboard/home",
    "title": "welcome to dashboard",
    "subtitle": "subtitle",
    "createButton": false,
    "icon": "dashboard"
  },
  "statistics": {
    "slice": "statistics",
    "navbar": "Statistics",
    "link": "/dashboard/statistics",
    "title": "Statistics",
    "subtitle": "subtitle",
    "createButton": false,
    "icon": "statistic"
  },
  "notifications": {
    "slice": "notifications",
    "navbar": "Notifications",
    "link": "/dashboard/notifications",
    "title": "Notifications",
    "subtitle": "subtitle",
    "createButton": false,
    "icon": "notification"
  },
  "billing": {
    "slice": "billings",
    "navbar": "Billing",
    "link": "/dashboard/billing",
    "title": "${user.name}'s billing",
    "subtitle": "subtitle",
    "createButton": false,
    "icon": "receipt"
  },
  "users": {
    "slice": "users",
    "navbar": "User",
    "link": "/dashboard/users",
    "title": "Users",
    "subtitle": "subtitle",
    "createButton": true
  }
}

const stJson = JSON.stringify(json)
const data = JSON.parse(stJson)
Object.keys(data).forEach((key, index, _) => console.log(_))