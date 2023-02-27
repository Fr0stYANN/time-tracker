using Server.Business.Interfaces;
using Server.Business.Entities;
using Microsoft.Data.SqlClient;
using Dapper;
using Microsoft.Extensions.Configuration;

namespace Server.MSSQL.Repositories
{
    public class WorkTypeRepository : IWorkTypeRepository
    {
        private readonly string connectionString;
        
        public WorkTypeRepository(IConfiguration configuration)
        {
            connectionString = configuration.GetConnectionString("MsSql");
        }
        
        public WorkTypeModel GetById(int id)
        {
            string sqlQuery = @"
                SELECT * FROM Users 
                WHERE Id = @Id
            ";
                
            using var connection = new SqlConnection(connectionString);
            return connection.QueryFirstOrDefault<WorkTypeModel>(sqlQuery, new { Id = id });
        }
        
        public IEnumerable<WorkTypeModel> GetAll()
        {
            string sqlQuery = @"
                SELECT * FROM Users
            ";
                
            using var connection = new SqlConnection(connectionString);
            return connection.Query<WorkTypeModel>(sqlQuery);
        }
        
        public int Create(WorkTypeModel workTypeModel)
        {
            string query = @"
                INSERT INTO WorkTypes       
                (Name) 
                OUTPUT INSERTED.Id 
                VALUES(@Name)
            ";
                
            using var connection = new SqlConnection(connectionString);

            return connection.ExecuteScalar<int>(query, workTypeModel);
        }

        public void Delete(int id)
        {
            string query = @"
                DELETE FROM WorkTypes 
                WHERE Id = @Id
            ";
                
            using var connection = new SqlConnection(connectionString);
            connection.Execute(query, new { Id = id });
        }
        
        public void Update(WorkTypeModel workTypeModel)
        {
            string query = @"
                UPDATE WorkTypes 
                SET Name = @Name
                WHERE Id = @Id";
                
            using var connection = new SqlConnection(connectionString);
            connection.Execute(query, workTypeModel);  
        }
    }
}
