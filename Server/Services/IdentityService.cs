using AutoMapper;
using Server.Business.Interfaces;
using Server.Interfaces;
using System.Security.Claims;
using Microsoft.IdentityModel.JsonWebTokens;
using Newtonsoft.Json;
using Server.Business.Entities;
using Server.Models.Auth;
using Server.Types;
using Server.Utilities;
using Google.Apis.Auth;
using Microsoft.AspNetCore.Identity;
using System.IdentityModel.Tokens.Jwt;

namespace Server.Services
{
    public class IdentityService : IIdentityService
    {
        private readonly ITokenService tokenService;
        private readonly IUserRepository userRepository;
        private readonly ITokenRepository tokenRepository;
        private readonly IOptionRepository optionRepository;
        private readonly IConfiguration configuration;

        public IdentityService(ITokenService tokenService, IUserRepository userRepository, 
            ITokenRepository tokenRepository, IOptionRepository optionRepository, IConfiguration configuration)
        {
            this.tokenService = tokenService;
            this.userRepository = userRepository;
            this.tokenRepository = tokenRepository;
            this.optionRepository = optionRepository;
            this.configuration = configuration;
        }

        public AuthenticatedResponseModel Login(LoginUserRequestModel loginUserRequestModel)
        {
            var userModel = userRepository.GetByEmail(loginUserRequestModel.Email);
            return GetAuthRespModelAndSetToken(userModel!);
        }



        public AuthenticatedResponseModel LoginWithGoogle(LoginUserWithGoogleModel loginUserWithGoogleModel)
        {

            var decodedToken = IdentityUtilities.DecodeJwtToken(loginUserWithGoogleModel.Credential);

            string email = (string)decodedToken.Payload["email"];

            var user = userRepository.GetByEmail(email);

            return Login(new LoginUserRequestModel
            {
                Email = user.Email
            });
        }

        public AuthenticatedResponseModel RefreshToken(string accessToken, string refreshToken)
        {
            var userClaims = tokenService.GetPrincipalClaims(accessToken);
            int userId = Convert.ToInt32(userClaims.FindFirstValue(ClaimType.Id));

            var userModel = userRepository.GetById(userId)!;
            return GetAuthRespModelAndSetToken(userModel);
        }

        public void RevokeToken(string accessToken)
        {
            var userClaims = tokenService.GetPrincipalClaims(accessToken);
            int userId = Convert.ToInt32(userClaims.FindFirstValue(ClaimType.Id));
            
            tokenRepository.RemoveByUserId(userId);
        }

        private AuthenticatedResponseModel GetAuthRespModelAndSetToken(UserModel userModel)
        {
            var claims = new List<Claim>()
            {
                new Claim(ClaimType.Id, userModel.Id.ToString()),
                new Claim(ClaimType.Email, userModel.Email)
            };

            if (userModel.WorkType?.Name != null)
            {
                claims.Add(new Claim(ClaimType.WorkType, userModel.WorkType.Name));
            }

            var optionsUser = optionRepository.GetAllByUserId(userModel.Id).ToList();
            var arrayOptionsCodes = optionsUser.GetArrayCodes();

            if (optionsUser.Any())
            {
                var serializedOptionsCodes = JsonConvert.SerializeObject(arrayOptionsCodes);
                claims.Add(new Claim(ClaimType.Options, serializedOptionsCodes, System.IdentityModel.Tokens.Jwt.JsonClaimValueTypes.JsonArray));
            }

            var accessToken = tokenService.GenerateAccessToken(claims);
            var refreshTokenModel = tokenService.GenerateRefreshToken();

            var currentRefreshTokenModel = tokenRepository.GetByUserId(userModel.Id);
            refreshTokenModel.UserId = userModel.Id;

            if (currentRefreshTokenModel != null)
            {
                tokenRepository.Update(refreshTokenModel);
            }
            else
            {
                tokenRepository.Insert(refreshTokenModel);
            }

            return new AuthenticatedResponseModel()
            {
                AccessToken = accessToken,
                RefreshToken = refreshTokenModel.Token,
                User = userModel
            };
        }
    }
}
