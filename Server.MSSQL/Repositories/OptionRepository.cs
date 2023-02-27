using Server.Business.Interfaces;
using Server.Business.Entities;
using Microsoft.Data.SqlClient;
using Dapper;
using Microsoft.Extensions.Configuration;
using Server.MSSQL.Models;

namespace Server.MSSQL.Repositories
{
    public class OptionRepository : IOptionRepository
    {
        private readonly string connectionString;
        
        public OptionRepository(IConfiguration configuration)
        {
            connectionString = configuration.GetConnectionString("MsSql");
        }
        
        public OptionModel? GetById(int id)
        {
            string query = @"
                SELECT * FROM Options 
                WHERE Id = @Id
            ";
                
            using var connection = new SqlConnection(connectionString);
            return connection.QuerySingleOrDefault<OptionModel>(query, new { Id = id });
        }
        
        public OptionModel? GetByCode(string code)
        {
            string query = @"
                SELECT * FROM Options 
                WHERE Code = @Code
            ";
                
            using var connection = new SqlConnection(connectionString);
            return connection.QuerySingleOrDefault<OptionModel>(query, new { Code = code });
        }
        
        public IEnumerable<OptionModel> GetAll()
        {
            string query = @"
                SELECT * FROM Options
            ";
                
            using var connection = new SqlConnection(connectionString);
            return connection.Query<OptionModel>(query);
        }
        
        public IEnumerable<OptionModel> GetAllByUserId(int userId)
        {
            string query = @"
                SELECT * FROM OptionsUsers
                INNER JOIN Options ON OptionsUsers.OptionId = Options.Id
                WHERE UserId = @UserId
            ";
                
            using var connection = new SqlConnection(connectionString);
            return connection.Query<OptionsUsersDbModel, OptionModel, OptionModel>(query, (optionsUsers, option) => option, param: new {UserId = userId});
        }
        
        public void RemoveAllForUserId(int userId)
        {
            string query = @"
                DELETE FROM OptionsUsers
                WHERE UserId = @UserId
            ";
                
            using var connection = new SqlConnection(connectionString);
            connection.Execute(query, new {UserId = userId});
        }
        
        public void AddListForUserId(IEnumerable<OptionModel> optionModels, int userId)
        {
            foreach (var optionModel in optionModels)
            {
                AddToUser(optionModel.Id, userId);
            }
        }

        public void AddToUser(int optionId, int userId)
        {
            string query = @"
                INSERT INTO OptionsUsers
                (UserId, OptionId)
                VALUES (@UserId, @OptionId)
            ";

            using var connection = new SqlConnection(connectionString);
            connection.Execute(query, new {UserId = userId, OptionId = optionId});
        }
        
        public void RevokeFromUser(int optionId, int userId)
        {
            string query = @"
                DELETE FROM OptionsUsers
                WHERE UserId = @UserId AND OptionId = @OptionId
            ";

            using var connection = new SqlConnection(connectionString);
            connection.Execute(query, new {UserId = userId, OptionId = optionId});
        }
    }
}
