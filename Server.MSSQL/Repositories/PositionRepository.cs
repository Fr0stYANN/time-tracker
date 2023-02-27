using Server.Business.Interfaces;
using Server.Business.Entities;
using Microsoft.Data.SqlClient;
using Dapper;
using Microsoft.Extensions.Configuration;

namespace Server.MSSQL.Repositories
{
    public class PositionRepository : IPositionRepository
    {
        private readonly string connectionString;
        
        public PositionRepository(IConfiguration configuration)
        {
            connectionString = configuration.GetConnectionString("MsSql");
        }
        
        public PositionModel GetById(int id)
        {
            string query = @"
                SELECT * FROM Positions 
                WHERE Id = @Id
            ";
                
            using var connection = new SqlConnection(connectionString);
            return connection.QueryFirstOrDefault<PositionModel>(query, new { Id = id });
        }
        
        public IEnumerable<PositionModel> GetAll()
        {
            string sqlQuery = @"
                SELECT * FROM Positions
            ";
                
            using var connection = new SqlConnection(connectionString);
            return connection.Query<PositionModel>(sqlQuery);
        }
        
        public int Create(PositionModel positionModel)
        {
            string query = @"
                INSERT INTO Positions       
                (Name) 
                OUTPUT INSERTED.Id 
                VALUES(@Name)
            ";
                
            using var connection = new SqlConnection(connectionString);
            return connection.ExecuteScalar<int>(query, positionModel);
        }

        public void Delete(int id)
        {
            string query = @"
                DELETE FROM Positions 
                WHERE Id = @Id
            ";
                
            using var connection = new SqlConnection(connectionString);
            connection.Execute(query, new { Id = id });
        }
        
        public void Update(PositionModel positionModel)
        {
            string query = @"
                UPDATE Positions 
                SET Name = @Name
                WHERE Id = @Id";
                
            using var connection = new SqlConnection(connectionString);
            connection.Execute(query, positionModel);  
        }
    }
}
