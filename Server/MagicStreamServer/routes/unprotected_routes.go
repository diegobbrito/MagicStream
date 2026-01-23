package routes

import (
	controller "github.com/diegobbrito/MagicStream/Server/MagicStreamServer/controllers"
	"github.com/gin-gonic/gin"
	"go.mongodb.org/mongo-driver/v2/mongo"
)

func SetupUnprotectedRoutes(router *gin.Engine, client *mongo.Client) {
	router.GET("/genres", controller.GetGenres(client))
	router.GET("/movies", controller.GetMovies(client))

	router.POST("/register", controller.RegisterUser(client))
	router.POST("/login", controller.LoginUser(client))
	router.POST("/logout", controller.LogoutHandler(client))

	router.POST("/refresh", controller.RefreshTokenHandler(client))
}
