using JournalApp.Models;
using Microsoft.EntityFrameworkCore;

namespace JournalApp.Data;

public class JournalDbContext : DbContext
{
    public JournalDbContext(DbContextOptions<JournalDbContext> options) : base(options)
    {
    }

    public DbSet<JournalEntry> Entries { get; set; } = null!;

    protected override void OnModelCreating(ModelBuilder modelBuilder)
    {
        base.OnModelCreating(modelBuilder);

        modelBuilder.Entity<JournalEntry>(entity =>
        {
            entity.HasKey(e => e.Id);
            entity.Property(e => e.Title).IsRequired();
            entity.Property(e => e.Content).IsRequired();
            entity.Property(e => e.PrimaryMood).IsRequired();
            entity.Property(e => e.EntryDate).IsRequired();
            entity.Property(e => e.CreatedDate).IsRequired();
            
            // Index for fast lookup by date
            entity.HasIndex(e => e.EntryDate).IsUnique();
        });
    }
}
