namespace JournalApp.Models;

public class JournalEntry
{
    public int Id { get; set; }
    public string Title { get; set; } = string.Empty;
    public string Content { get; set; } = string.Empty;
    public DateTime CreatedDate { get; set; }
    public DateTime? ModifiedDate { get; set; }
    
    // Primary Mood (Required)
    public string PrimaryMood { get; set; } = "Neutral";
    
    // Secondary Moods (Optional - up to 2)
    public string? SecondaryMood1 { get; set; }
    public string? SecondaryMood2 { get; set; }
    
    // Category
    public string Category { get; set; } = "General";
    
    // Tags (comma-separated)
    public string Tags { get; set; } = string.Empty;
    
    // Entry Date (for one-per-day constraint)
    public DateTime EntryDate { get; set; }
    
    // Word count
    public int WordCount { get; set; }
    
    public JournalEntry()
    {
        CreatedDate = DateTime.Now;
        EntryDate = DateTime.Today;
        WordCount = 0;
    }
}

