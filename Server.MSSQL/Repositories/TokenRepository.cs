using Dapper;
using Microsoft.Data.SqlClient;
using Microsoft.Extensions.Configuration;
using Server.Business.Entities;
using Server.Business.Interfaces;

namespace Server.MSSQL.Repositories;

public class TokenRepository : ITokenRepository
{
    private readonly string connectionString;

    public TokenRepository(IConfiguration configuration)
    {
        connectionString = configuration.GetConnectionString("MsSql");
    }

    public void Insert(RefreshTokenModel refreshTokenModel)
    {
        string query = @"
            INSERT INTO Tokens
            (Token, Expires, UserId)
            VALUES (@Token, @Expires, @UserId)
        ";

        using var connection = new SqlConnection(connectionString);
        connection.Execute(query, refreshTokenModel);
    }
    
    public void Update(RefreshTokenModel refreshTokenModel)
    {
        string query = @"
            UPDATE Tokens
            SET Token = @Token, Expires = @Expires
            WHERE UserId = @UserId
        ";

        using var connection = new SqlConnection(connectionString);
        connection.Execute(query, refreshTokenModel);
    }

    public RefreshTokenModel? GetByUserId(int userId)
    {
        var parameters = new
        {
            UserId = userId
        };

        string query = @"
            SELECT * FROM Tokens
            WHERE UserId = @UserId
        ";

        using var connection = new SqlConnection(connectionString);
        return connection.QueryFirstOrDefault<RefreshTokenModel>(query, parameters);
    }

    public void RemoveByUserId(int userId)
    {
        var parameters = new
        {
            UserId = userId
        };

        string query = @"
            DELETE FROM Tokens
            WHERE UserId = @UserId
         ";
    
        using var connection = new SqlConnection(connectionString);
        connection.Execute(query, parameters);
    }
}