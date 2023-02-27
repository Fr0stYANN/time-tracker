using System.Net;
using System.Net.Mail;
using System.Text;
using Server.Interfaces;
using Server.Models.Email;

namespace Server.Services;

public class EmailService : IEmailService
{
    private readonly IConfiguration configuration;

    public EmailService(IConfiguration configuration)
    {
        this.configuration = configuration;
    }
    
    public void Send(EmailModel emailModel)
    {
        var sender = configuration["Email:User"];
        var password = configuration["Email:Password"];
        var port = Convert.ToInt32(configuration["Email:Port"]);
        var host = configuration["Email:Host"];

        using var message = new MailMessage(sender, emailModel.To)
        {
            Subject = emailModel.Subject,
            Body = emailModel.Body,
            BodyEncoding = Encoding.UTF8,
            IsBodyHtml = true
        };
        
        var credential = new NetworkCredential(sender, password);
        
        using var client = new SmtpClient(host, port)
        {
            EnableSsl = true,
            UseDefaultCredentials = false,
            Credentials = credential
        }; 

        client.Send(message);
    }
}