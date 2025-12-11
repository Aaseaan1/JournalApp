using System.Security.Cryptography;
using System.Text;

namespace JournalApp.Services;

public class AuthService
{
    private const string PinHashKey = "JournalApp_PinHash";
    private bool isAuthenticated = false;
    private string? storedPinHash;

    public event Action? OnAuthStateChanged;

    public AuthService()
    {
        // Load stored PIN hash (in production, use secure storage)
        LoadStoredPin();
    }

    public bool IsAuthenticated => isAuthenticated;

    public bool HasPinSet => !string.IsNullOrEmpty(storedPinHash);

    public void SetPin(string pin)
    {
        if (string.IsNullOrWhiteSpace(pin) || pin.Length < 4)
        {
            throw new ArgumentException("PIN must be at least 4 characters long.");
        }

        storedPinHash = HashPin(pin);
        SavePin();
        isAuthenticated = true;
    }

    public bool VerifyPin(string pin)
    {
        if (string.IsNullOrEmpty(storedPinHash))
        {
            return false;
        }

        var inputHash = HashPin(pin);
        isAuthenticated = inputHash == storedPinHash;

        return isAuthenticated;
    }

    public void Logout()
    {
        isAuthenticated = false;
    }

    public void ResetPin()
    {
        storedPinHash = null;
        isAuthenticated = false;
        SavePin();
    }

    private string HashPin(string pin)
    {
        using var sha256 = SHA256.Create();
        var bytes = Encoding.UTF8.GetBytes(pin);
        var hash = sha256.ComputeHash(bytes);
        return Convert.ToBase64String(hash);
    }

    private void LoadStoredPin()
    {
        // In production, use secure storage (Azure Key Vault, encrypted file, etc.)
        // For now, using simple file storage
        var appDataPath = Path.Combine(
            Environment.GetFolderPath(Environment.SpecialFolder.LocalApplicationData),
            "JournalApp"
        );
        var pinFilePath = Path.Combine(appDataPath, ".pin");

        if (File.Exists(pinFilePath))
        {
            storedPinHash = File.ReadAllText(pinFilePath);
        }
    }

    private void SavePin()
    {
        var appDataPath = Path.Combine(
            Environment.GetFolderPath(Environment.SpecialFolder.LocalApplicationData),
            "JournalApp"
        );
        Directory.CreateDirectory(appDataPath);
        var pinFilePath = Path.Combine(appDataPath, ".pin");

        if (string.IsNullOrEmpty(storedPinHash))
        {
            if (File.Exists(pinFilePath))
            {
                File.Delete(pinFilePath);
            }
        }
        else
        {
            File.WriteAllText(pinFilePath, storedPinHash);
        }
    }
}
