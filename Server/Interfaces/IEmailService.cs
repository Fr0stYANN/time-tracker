using Server.Models.Email;

namespace Server.Interfaces;

public interface IEmailService
{
    void Send(EmailModel emailModel);
}