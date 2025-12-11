# JournalApp - Complete Feature Documentation

## ✅ Completed Features

### 1. Core Functionality
- ✅ Create, Read, Update, Delete (CRUD) journal entries
- ✅ SQLite database with Entity Framework Core
- ✅ Entry fields: Title, Content, Date, Category
- ✅ Multiple moods selection (15 predefined moods)
- ✅ Tags support with comma-separated values
- ✅ Automatic word count calculation
- ✅ Entry preview on home page

### 2. Search & Filter
- ✅ **Full-text Search** - Search entries by title and content
  - Real-time search with Enter key support
  - Preview truncation
  - Result count display
  - Clear search functionality
  - Location: `/search`

- ✅ **Advanced Filtering** - Filter entries by multiple criteria
  - Date range filtering (from/to dates)
  - Mood-based filtering (dropdown with all 15 moods)
  - Tag-based filtering (text input)
  - Tab-based UI for easy navigation
  - Location: `/filter`

### 3. Analytics Dashboard
- ✅ **Comprehensive Statistics** at `/analytics`:
  - Total entries count
  - Current streak (consecutive days)
  - Longest streak tracker
  - Average words per entry
  - Total words written
  - Mood distribution with visual progress bars
  - Top 10 tags ranking
  - Categories breakdown
  - Last 30 days activity
  - Missed days calculation

### 4. Calendar View
- ✅ **Monthly Calendar** at `/calendar`:
  - 7x6 grid layout (Sun-Sat)
  - Previous/Next month navigation
  - Visual indicators for:
    - Today's date (blue highlight)
    - Days with entries (green background)
  - Click entries to view details
  - Dynamic week calculation

### 5. PDF Export
- ✅ **Export Functionality** at `/export`:
  - Export single entries to PDF
  - Bulk export all entries to PDF
  - Professional formatting with iTextSharp
  - Includes all metadata (moods, tags, category, word count)
  - A4 page format with proper margins
  - Automatic file download with date-stamped filenames
  - Loading states and error handling

### 6. Theme Customization
- ✅ **Dark/Light Mode Toggle**:
  - Global theme switcher in navigation
  - Event-driven theme updates
  - Dark theme with custom CSS:
    - Dark backgrounds (#1a1a1a, #2d2d2d)
    - Light text (#e0e0e0)
    - Dark form controls and cards
    - Proper contrast ratios
  - Theme persists across page navigation
  - Sun/Moon icons for visual feedback

### 7. Security & Authentication
- ✅ **PIN-Based Security** at `/login`:
  - SHA256-hashed PIN storage
  - First-time PIN setup flow
  - Login/logout functionality
  - PIN reset capability
  - Secure local storage
  - Authentication state management
  - Login/logout links in navigation
  - Auto-redirect to login when not authenticated

### 8. User Interface
- ✅ Modern, responsive design with Bootstrap 5
- ✅ Clean navigation with sidebar menu
- ✅ Icon-based navigation (Bootstrap Icons)
- ✅ Mobile-friendly layout
- ✅ Consistent color scheme
- ✅ Loading states and feedback
- ✅ Alert messages for user actions

## 📁 Project Structure

```
JournalApp/
├── Components/
│   ├── Pages/
│   │   ├── Home.razor (Entry list)
│   │   ├── Create.razor (New entry)
│   │   ├── Edit.razor (Edit entry)
│   │   ├── View.razor (View entry)
│   │   ├── Search.razor (Search entries) ✨ NEW
│   │   ├── Filter.razor (Filter entries) ✨ NEW
│   │   ├── Calendar.razor (Calendar view) ✨ NEW
│   │   ├── Analytics.razor (Statistics) ✨ NEW
│   │   ├── Export.razor (PDF export) ✨ NEW
│   │   └── Login.razor (Authentication) ✨ NEW
│   ├── Layout/
│   │   ├── MainLayout.razor (Theme support)
│   │   └── NavMenu.razor (Navigation + Theme toggle)
│   └── AuthRequired.razor (Auth wrapper) ✨ NEW
├── Data/
│   └── JournalDbContext.cs (Database context)
├── Models/
│   └── JournalEntry.cs (Entry model)
├── Services/
│   ├── JournalService.cs (CRUD operations)
│   ├── ThemeService.cs (Theme management) ✨ NEW
│   ├── PdfExportService.cs (PDF generation) ✨ NEW
│   └── AuthService.cs (Authentication) ✨ NEW
└── wwwroot/
    ├── app.css (Styles + Dark theme)
    └── app.js (PDF download helper) ✨ NEW
```

## 🔧 Technologies Used

- **Framework**: .NET 10.0, Blazor Server
- **Database**: SQLite with Entity Framework Core 10.0.1
- **PDF Generation**: iTextSharp.LGPLv2.Core 3.7.12
- **UI Framework**: Bootstrap 5
- **Icons**: Bootstrap Icons
- **Authentication**: Custom PIN-based (SHA256)

## 🚀 How to Run

1. **Prerequisites**:
   - .NET 10.0 SDK installed
   - Any modern web browser

2. **Build and Run**:
   ```bash
   cd "Application Development CW/JournalApp"
   dotnet build
   dotnet run
   ```

3. **Access Application**:
   - Open browser to `https://localhost:5001` or `http://localhost:5000`
   - First time: Set up your security PIN
   - Start journaling!

## 📝 Usage Guide

### Creating an Entry
1. Click "New Entry" in navigation
2. Fill in title, select date, choose category
3. Select moods (multiple allowed)
4. Add tags (comma-separated)
5. Write your content
6. Click "Create Entry"

### Searching & Filtering
- **Search**: Use `/search` to find entries by keywords
- **Filter**: Use `/filter` to narrow by date, mood, or tags
- **Calendar**: Visual monthly view at `/calendar`

### Analytics
- View comprehensive statistics at `/analytics`
- Track streaks, word counts, mood trends
- See top tags and category distribution

### Exporting
1. Go to `/export`
2. Choose individual entry or export all
3. PDF downloads automatically

### Security
- Set PIN on first use at `/login`
- Logout button appears in navigation
- Reset PIN if forgotten (clears all security)

## 🎯 Coursework Requirements Met

| Requirement | Status | Implementation |
|------------|--------|----------------|
| CRUD Operations | ✅ Complete | Full create/read/update/delete |
| Database | ✅ Complete | SQLite with EF Core |
| Search | ✅ Complete | Full-text search page |
| Filter | ✅ Complete | Date/mood/tag filters |
| Calendar View | ✅ Complete | Monthly grid with navigation |
| Analytics | ✅ Complete | 10+ statistics with visualizations |
| PDF Export | ✅ Complete | Single & bulk export with download |
| Theme Customization | ✅ Complete | Dark/light mode toggle |
| Security | ✅ Complete | PIN-based authentication |
| Moods | ✅ Complete | 15 moods with multi-select |
| Tags | ✅ Complete | Comma-separated tags |
| Categories | ✅ Complete | Dropdown categories |
| Word Count | ✅ Complete | Automatic calculation |
| Responsive Design | ✅ Complete | Bootstrap 5 mobile-friendly |

## 🔒 Security Features

- **PIN Storage**: SHA256-hashed, never stored in plain text
- **Secure Location**: Local application data folder
- **Session Management**: In-memory authentication state
- **Auto-redirect**: Unauthenticated users redirected to login
- **Logout**: Clear session and redirect to login

## 🎨 Theme System

- **Dark Mode**: 
  - Background: #1a1a1a (page), #2d2d2d (cards)
  - Text: #e0e0e0
  - Borders: #404040
  
- **Light Mode**: Default Bootstrap colors

- **Toggle**: Click sun/moon icon in navigation

## 📊 Database Schema

```csharp
JournalEntry
{
    Id: int (Primary Key)
    Title: string
    Content: string
    EntryDate: DateTime
    Category: string
    Moods: string (JSON array)
    Tags: string (comma-separated)
    WordCount: int
}
```

## 🐛 Known Limitations

- PIN reset removes security without confirmation (can be enhanced)
- PDF export limited to single file format (no DOCX/JSON)
- Rich text editor not implemented (plain text only)
- No cloud sync or backup functionality
- Single-user application (no multi-user support)

## 🔮 Future Enhancements (Optional)

- Rich text/Markdown editor
- Image/attachment support
- Export to multiple formats (DOCX, JSON, CSV)
- Cloud backup and sync
- Multi-user support with full authentication
- Data encryption at rest
- Mobile app version
- Reminder/notification system

## ✨ Highlights

- **100% Complete**: All mandatory coursework requirements implemented
- **Production-Ready**: Fully functional with error handling
- **Modern Stack**: Latest .NET 10.0 and Blazor Server
- **Security-First**: PIN protection with proper hashing
- **User-Friendly**: Intuitive UI with visual feedback
- **Performant**: Efficient database queries and caching
- **Maintainable**: Clean code structure and separation of concerns

---

**Version**: 1.0.0  
**Last Updated**: 2025  
**Status**: ✅ All coursework requirements completed
