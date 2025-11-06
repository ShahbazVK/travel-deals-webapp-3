# CS 6314 - Assignment #3 - Complete Documentation

## Project Overview

This is a web application for travel deals using HTML, CSS, JavaScript, jQuery, XML and JSON. The application includes 7 web pages with full booking functionality, validation, and data persistence.

---

## Project Structure

### Pages
1. **index.html** - Home page
2. **stays.html** - Hotel/stays booking page
3. **flights.html** - Flight booking page
4. **cars.html** - Car rental page
5. **cruises.html** - Cruise booking page
6. **contact.html** - Contact form page
7. **cart.html** - Shopping cart and booking page

### Core Files
- **css/mystyle.css** - External CSS for all pages
- **js/app.js** - Main JavaScript file with all functionality
- **js/dark-mode-init.js** - Dark mode initialization

### Data Files
- **data/flights.json** - 93 flights between Texas and California cities (Sep 1 - Dec 1, 2024)
- **data/hotels.xml** - 22 hotels with availability and pricing
- **data/cars.xml** - 22 cars with availability and pricing

### PHP Backend Files (in `php/` folder)
- **php/update_flights.php** - Updates available seats in flights.json
- **php/update_hotels.php** - Updates available rooms in hotels.xml
- **php/update_cars.php** - Updates available cars in cars.xml
- **php/save_flight_booking.php** - Saves flight bookings to flight_bookings.json
- **php/save_hotel_booking.php** - Saves hotel bookings to hotel_bookings.json
- **php/save_car_booking.php** - Saves car bookings to car_bookings.xml
- **php/save_contact.php** - Saves contact form submissions to contact_submissions.json

---

## Requirements Implementation

### ✅ Requirement 1: Date and Time Display
- **Status**: ✅ Complete
- **Implementation**: Current local date and time displayed in header
- **Updates**: Every second (live clock)
- **Location**: Header datetime div, updated by `updateDateTime()` function
- **File**: `js/app.js` (lines 1647-1663)

### ✅ Requirement 2: Contact Form Validation (Regex)
- **Status**: ✅ Complete
- **Validation Rules**:
  - First name: Alphabetic only, capital first letter (regex: `/^[A-Z][a-z]+$/`)
  - Last name: Alphabetic only, capital first letter (regex: `/^[A-Z][a-z]+$/`)
  - First and last name cannot be the same
  - Phone number: Format `(ddd)ddd-dddd` (regex: `/^\(\d{3}\)\d{3}-\d{4}$/`)
  - Email: Contains @ and . (regex: `/^[^\s@]+@[^\s@]+\.[^\s@]+$/`)
  - Gender: Radio box, must be selected
  - Comment: Minimum 10 characters
- **Validation Trigger**: On "Submit" button click
- **Storage**: Saves to `contact_submissions.json` via PHP
- **File**: `app.js` (lines 1688-1765), `contact.html`

### ✅ Requirement 3: Font Size & Background Color
- **Status**: ✅ Complete
- **Implementation**: 
  - Increase/Decrease font size buttons in sidebar
  - Change background color button in sidebar
- **Applied to**: Main content area
- **File**: `app.js` (lines 1665-1683)

### ✅ Requirement 4: Flights Page
- **Status**: ✅ Complete
- **Features**:
  - One-way and round-trip options
  - Origin, destination, departure date inputs
  - Return date for round-trip
  - Passenger icon/form (adults, children, infants)
  - **Validation**: 
    - Dates: Sep 1 - Dec 1, 2024
    - Origin/destination: Texas or California cities only
    - Max 4 passengers per category
  - **Data File**: `flights.json` with **93 flights** (requirement: at least 50) ✅
  - **Search Features**:
    - Displays flights matching criteria
    - ±3 days fallback if no exact match
    - Filters by available seats
  - **Cart & Booking**:
    - Displays flight details (flight-id, origin, destination, dates, times)
    - Calculates total price (Adults 100%, Children 70%, Infants 10%)
    - Collects passenger info (first name, last name, DOB, SSN)
    - Assigns unique booking number and user-id
    - **Updates available seats in flights.json via PHP** ✅
    - **Stores bookings in flight_bookings.json via PHP** ✅
- **Files**: `flights.html`, `js/app.js` (lines 2596-2798)

### ✅ Requirement 5: Stays Page
- **Status**: ✅ Complete
- **Features**:
  - City, check-in, check-out date inputs
  - Guests selection (adults, children, infants)
  - **Validation** (NO regex used):
    - Dates: Sep 1 - Dec 1, 2024
    - City: Texas or California cities only
    - Max 2 guests per room (infants don't count)
  - Displays entered information
  - Displays number of rooms needed
  - **Data File**: `hotels.xml` with **22 hotels** (requirement: at least 20) ✅
  - **Search**: Displays matching hotels with details
  - **Cart & Booking**:
    - Displays hotel details (hotel-id, name, city, guests, dates, rooms, price)
    - **Stores bookings in hotel_bookings.json via PHP** ✅
    - **Updates available rooms in hotels.xml via PHP** ✅
    - Assigns unique booking number and user-id
- **Files**: `stays.html`, `js/app.js` (lines 2801-2985)

### ✅ Requirement 6: Cars Page
- **Status**: ✅ Complete
- **Features**:
  - City, car type, check-in, check-out date inputs
  - **Validation**:
    - Dates: Sep 1 - Dec 1, 2024
    - Car types: economy, SUV, Compact, midsize
  - **Uses DOM methods** (createElement, appendChild, etc.) ✅
  - Displays entered information
  - **Data File**: `cars.xml` with **22 cars** (requirement: at least 20) ✅
  - **Car Suggestions**:
    - Loads from `car_bookings.xml` and `hotel_bookings.json`
    - Matches based on city and previous preferences
    - Shows preferred car types
    - Displays suggestions UI when previous bookings exist
  - **Cart & Booking**:
    - Displays car details
    - **Stores bookings in car_bookings.xml via PHP** ✅
    - **Updates available cars in cars.xml via PHP** ✅
    - Assigns unique booking number and user-id
- **Files**: `cars.html`, `js/app.js` (lines 2999-3171, 3148-3268)

### ✅ Requirement 7: Cruises Page
- **Status**: ✅ Complete
- **Features**:
  - Destination, departing between, duration (min/max), guests inputs
  - **Validation**:
    - Destinations: Alaska, Bahamas, Europe, Mexico
    - Duration: min ≥ 3 days, max ≤ 10 days
    - Departing: Sep 1 - Dec 1, 2024
    - Max 2 guests per room (infants don't count)
  - Displays entered information
  - **Uses jQuery methods** (jQuery loaded, uses `$('#cruise-destination').val()`, etc.) ✅
- **Files**: `cruises.html`, `js/app.js` (lines 3307-3508)

---

## Technical Implementation Details

### Data Storage
- **Contact Forms**: `contact_submissions.json` (via PHP)
- **Flight Bookings**: `flight_bookings.json` (via PHP)
- **Hotel Bookings**: `hotel_bookings.json` (via PHP)
- **Car Bookings**: `car_bookings.xml` (via PHP)
- **Cart**: `sessionStorage` (for cross-page persistence)
- **File Updates**: All updates done via PHP scripts

### Cart Functionality
- **Global Variable**: `window.cart` (accessible across all pages)
- **Persistence**: Uses `sessionStorage` for cart to work across page navigation
- **Features**:
  - Add items from flights, hotels, cars pages
  - Display all items in cart
  - Remove items
  - Booking process with passenger/user information
  - Updates data files after booking

### Validation Implementation
- **Contact Form**: Uses regular expressions (regex) for all validations
- **Stays Page**: **NO regex** - uses JavaScript validation methods
- **Flights Page**: Date validation, city validation, passenger count validation
- **Cars Page**: Date validation, car type validation
- **Cruises Page**: Destination, duration, date validation

### PHP Integration
- **File Updates**: 
  - `update_flights.php` - Updates seats in flights.json
  - `update_hotels.php` - Updates rooms in hotels.xml
  - `update_cars.php` - Updates cars in cars.xml
- **Booking Storage**:
  - `save_flight_booking.php` - Saves to flight_bookings.json
  - `save_hotel_booking.php` - Saves to hotel_bookings.json
  - `save_car_booking.php` - Saves to car_bookings.xml
  - `save_contact.php` - Saves to contact_submissions.json

### Price Calculations
- **Flights**: 
  - Adults: 100% of base price
  - Children: 70% of adult price
  - Infants: 10% of adult price
- **Hotels**: Price per night × number of nights × number of rooms
- **Cars**: Price per day × number of days

### Booking Numbers & User IDs
- **Booking Numbers**: Generated as `'BK' + Date.now().toString()`
- **User IDs**: Generated based on phone number hash (unique per phone number)
- **Format**: Numeric user-id starting from 1000

---

## File Structure

### Organized Folder Structure

```
Assignment3/
├── (root) - HTML Pages
│   ├── index.html
│   ├── stays.html
│   ├── flights.html
│   ├── cars.html
│   ├── cruises.html
│   ├── contact.html
│   ├── cart.html
│   └── README.md
│
├── css/
│   └── mystyle.css
│
├── js/
│   ├── app.js
│   └── dark-mode-init.js
│
├── php/
│   ├── update_flights.php
│   ├── update_hotels.php
│   ├── update_cars.php
│   ├── save_flight_booking.php
│   ├── save_hotel_booking.php
│   ├── save_car_booking.php
│   └── save_contact.php
│
├── data/
│   ├── flights.json (93 flights - input data)
│   ├── hotels.xml (22 hotels - input data)
│   ├── cars.xml (22 cars - input data)
│   ├── flight_bookings.json (output - created by PHP)
│   ├── hotel_bookings.json (output - created by PHP)
│   ├── car_bookings.xml (output - created by PHP)
│   └── contact_submissions.json (output - created by PHP)
│
└── docs/
    └── ASSIGNMENT_DOCUMENTATION.md
```

### Path References

All files have been updated to use the new folder structure:

- **HTML files**: Reference `css/mystyle.css`, `js/app.js`, `js/dark-mode-init.js`
- **JavaScript files**: Reference `data/flights.json`, `data/hotels.xml`, `data/cars.xml`, `php/*.php`
- **PHP files**: Reference `../data/flights.json`, `../data/hotels.xml`, etc.

---

## Setup Instructions

### 1. Start PHP Server
```bash
php -S localhost:8000
```
Or use the provided scripts:
- `start-server.sh` (Linux/Mac)
- `start-server.bat` (Windows)

### 2. Open in Browser
Navigate to: `http://localhost:8000/index.html`

### 3. Test Features
- All pages should load correctly
- Navigation should work
- Date/time should display in header
- Font size and background color controls should work
- All forms should validate correctly
- Cart should persist across pages
- Bookings should save to files

---

## Key Features

### ✅ Complete Requirements
- 7 web pages with consistent layout
- External CSS (mystyle.css)
- Navigation bar with all links
- Date and time display
- Contact form with regex validation
- Font size and background color controls
- Flights: Search, booking, file updates
- Stays: Search, booking, file updates
- Cars: Search with DOM methods, suggestions, booking, file updates
- Cruises: Search with jQuery
- Cart: Display, booking, file updates

### ✅ Technical Requirements
- Regular expressions for contact form validation
- NO regex for stays page validation
- DOM methods for cars page
- jQuery methods for cruises page
- PHP for file updates and storage
- JSON for flights, hotels, contact data
- XML for hotels, cars data
- Unique booking numbers
- Unique user IDs

### ✅ Data Requirements
- 93 flights (requirement: at least 50) ✅
- 22 hotels (requirement: at least 20) ✅
- 22 cars (requirement: at least 20) ✅
- All dates between Sep 1 - Dec 1, 2024
- All cities in Texas or California

---

## Testing Checklist

- [x] All 7 pages load correctly
- [x] Navigation links work
- [x] Date/time displays and updates
- [x] Font size controls work
- [x] Background color toggle works
- [x] Contact form validates correctly
- [x] Contact form saves to JSON
- [x] Flights search works
- [x] Flights booking works
- [x] Flights file updates work
- [x] Hotels search works
- [x] Hotels booking works
- [x] Hotels file updates work
- [x] Cars search works (DOM methods)
- [x] Cars suggestions work
- [x] Cars booking works
- [x] Cars file updates work
- [x] Cruises search works (jQuery)
- [x] Cart displays items correctly
- [x] Cart persists across pages
- [x] Booking process works
- [x] All files update correctly

---

## Notes

- **Cart Persistence**: Uses `sessionStorage` (not `localStorage`) for cross-page functionality
- **File Updates**: All updates done via PHP scripts (server-side)
- **Embedded Data**: `app.js` includes embedded fallback data for offline use
- **Error Handling**: All PHP calls include error handling
- **Validation**: All forms validate before submission
- **Price Calculations**: All prices calculated correctly (adults, children, infants)

---

## Status: ✅ COMPLETE

All requirements have been fulfilled. The application is ready for submission.

---

**Last Updated**: November 2024
**Assignment**: CS 6314 - Assignment #3
**Due Date**: 11/9/25, 11:59 pm

