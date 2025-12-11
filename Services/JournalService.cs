using JournalApp.Data;
using JournalApp.Models;
using Microsoft.EntityFrameworkCore;

namespace JournalApp.Services;

public class JournalService
{
    private readonly JournalDbContext _context;

    public JournalService(JournalDbContext context)
    {
        _context = context;
    }

    public async Task<List<JournalEntry>> GetAllEntriesAsync()
    {
        return await _context.Entries.OrderByDescending(e => e.EntryDate).ToListAsync();
    }

    public async Task<JournalEntry?> GetEntryAsync(int id)
    {
        return await _context.Entries.FindAsync(id);
    }

    public async Task<JournalEntry?> GetTodayEntryAsync()
    {
        return await _context.Entries.FirstOrDefaultAsync(e => e.EntryDate == DateTime.Today);
    }

    public async Task<bool> HasEntryForDateAsync(DateTime date)
    {
        return await _context.Entries.AnyAsync(e => e.EntryDate == date.Date);
    }

    public async Task AddEntryAsync(JournalEntry entry)
    {
        entry.EntryDate = DateTime.Today;
        entry.CreatedDate = DateTime.Now;
        entry.WordCount = CountWords(entry.Content);
        
        _context.Entries.Add(entry);
        await _context.SaveChangesAsync();
    }

    public async Task UpdateEntryAsync(JournalEntry entry)
    {
        var existing = await _context.Entries.FindAsync(entry.Id);
        if (existing != null)
        {
            existing.Title = entry.Title;
            existing.Content = entry.Content;
            existing.PrimaryMood = entry.PrimaryMood;
            existing.SecondaryMood1 = entry.SecondaryMood1;
            existing.SecondaryMood2 = entry.SecondaryMood2;
            existing.Category = entry.Category;
            existing.Tags = entry.Tags;
            existing.ModifiedDate = DateTime.Now;
            existing.WordCount = CountWords(entry.Content);
            
            _context.Entries.Update(existing);
            await _context.SaveChangesAsync();
        }
    }

    public async Task DeleteEntryAsync(int id)
    {
        var entry = await _context.Entries.FindAsync(id);
        if (entry != null)
        {
            _context.Entries.Remove(entry);
            await _context.SaveChangesAsync();
        }
    }

    public async Task<List<JournalEntry>> SearchEntriesAsync(string query)
    {
        query = query.ToLower();
        return await _context.Entries
            .Where(e => e.Title.ToLower().Contains(query) || e.Content.ToLower().Contains(query))
            .OrderByDescending(e => e.EntryDate)
            .ToListAsync();
    }

    public async Task<List<JournalEntry>> FilterByDateRangeAsync(DateTime startDate, DateTime endDate)
    {
        return await _context.Entries
            .Where(e => e.EntryDate >= startDate.Date && e.EntryDate <= endDate.Date)
            .OrderByDescending(e => e.EntryDate)
            .ToListAsync();
    }

    public async Task<List<JournalEntry>> FilterByMoodAsync(string mood)
    {
        return await _context.Entries
            .Where(e => e.PrimaryMood == mood)
            .OrderByDescending(e => e.EntryDate)
            .ToListAsync();
    }

    public async Task<List<JournalEntry>> FilterByTagAsync(string tag)
    {
        return await _context.Entries
            .Where(e => e.Tags.Contains(tag))
            .OrderByDescending(e => e.EntryDate)
            .ToListAsync();
    }

    private static int CountWords(string text)
    {
        if (string.IsNullOrWhiteSpace(text))
            return 0;
        return text.Split(new[] { ' ', '\t', '\n', '\r' }, StringSplitOptions.RemoveEmptyEntries).Length;
    }
}

