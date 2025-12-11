using iTextSharp.text;
using iTextSharp.text.pdf;
using JournalApp.Models;

namespace JournalApp.Services
{
    public class PdfExportService
    {
        public byte[] ExportEntryToPdf(JournalEntry entry)
        {
            using var memoryStream = new MemoryStream();
            var document = new Document(PageSize.A4, 50, 50, 25, 25);
            var writer = PdfWriter.GetInstance(document, memoryStream);
            
            document.Open();
            
            // Title
            var titleFont = FontFactory.GetFont(FontFactory.HELVETICA_BOLD, 20);
            var title = new Paragraph(entry.Title, titleFont);
            title.Alignment = Element.ALIGN_CENTER;
            document.Add(title);
            
            document.Add(new Paragraph(" ")); // Spacer
            
            // Date and Mood
            var infoFont = FontFactory.GetFont(FontFactory.HELVETICA, 12);
            document.Add(new Paragraph($"Date: {entry.EntryDate:MMMM dd, yyyy}", infoFont));
            document.Add(new Paragraph($"Primary Mood: {entry.PrimaryMood}", infoFont));
            
            if (!string.IsNullOrEmpty(entry.SecondaryMood1))
                document.Add(new Paragraph($"Secondary Mood 1: {entry.SecondaryMood1}", infoFont));
            
            if (!string.IsNullOrEmpty(entry.SecondaryMood2))
                document.Add(new Paragraph($"Secondary Mood 2: {entry.SecondaryMood2}", infoFont));
            
            if (!string.IsNullOrEmpty(entry.Category))
                document.Add(new Paragraph($"Category: {entry.Category}", infoFont));
            
            if (!string.IsNullOrEmpty(entry.Tags))
                document.Add(new Paragraph($"Tags: {entry.Tags}", infoFont));
            
            document.Add(new Paragraph($"Word Count: {entry.WordCount}", infoFont));
            
            document.Add(new Paragraph(" ")); // Spacer
            document.Add(new Paragraph(" ")); // Spacer
            
            // Content
            var contentFont = FontFactory.GetFont(FontFactory.HELVETICA, 11);
            var content = new Paragraph(entry.Content, contentFont);
            content.Alignment = Element.ALIGN_JUSTIFIED;
            document.Add(content);
            
            document.Close();
            writer.Close();
            
            return memoryStream.ToArray();
        }

        public byte[] ExportMultipleEntriesToPdf(List<JournalEntry> entries)
        {
            using var memoryStream = new MemoryStream();
            var document = new Document(PageSize.A4, 50, 50, 25, 25);
            var writer = PdfWriter.GetInstance(document, memoryStream);
            
            document.Open();
            
            // Main Title
            var mainTitleFont = FontFactory.GetFont(FontFactory.HELVETICA_BOLD, 24);
            var mainTitle = new Paragraph("Journal Entries", mainTitleFont);
            mainTitle.Alignment = Element.ALIGN_CENTER;
            document.Add(mainTitle);
            
            document.Add(new Paragraph(" "));
            document.Add(new Paragraph($"Total Entries: {entries.Count}"));
            document.Add(new Paragraph($"Exported on: {DateTime.Now:MMMM dd, yyyy HH:mm}"));
            document.Add(new Paragraph(" "));
            document.Add(new Paragraph("_____________________________________________________________________"));
            
            foreach (var entry in entries.OrderByDescending(e => e.EntryDate))
            {
                document.NewPage();
                
                var titleFont = FontFactory.GetFont(FontFactory.HELVETICA_BOLD, 18);
                var title = new Paragraph(entry.Title, titleFont);
                document.Add(title);
                
                document.Add(new Paragraph(" "));
                
                var infoFont = FontFactory.GetFont(FontFactory.HELVETICA, 11);
                document.Add(new Paragraph($"Date: {entry.EntryDate:MMMM dd, yyyy}", infoFont));
                document.Add(new Paragraph($"Mood: {entry.PrimaryMood}", infoFont));
                
                if (!string.IsNullOrEmpty(entry.Tags))
                    document.Add(new Paragraph($"Tags: {entry.Tags}", infoFont));
                
                document.Add(new Paragraph(" "));
                
                var contentFont = FontFactory.GetFont(FontFactory.HELVETICA, 10);
                var content = new Paragraph(entry.Content, contentFont);
                content.Alignment = Element.ALIGN_JUSTIFIED;
                document.Add(content);
            }
            
            document.Close();
            writer.Close();
            
            return memoryStream.ToArray();
        }
    }
}
