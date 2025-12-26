package routes

import (
	controller "github.com/diegobbrito/MagicStream/Server/MagicStreamServer/controllers"
	"github.com/diegobbrito/MagicStream/Server/MagicStreamServer/middleware"
	"github.com/gin-gonic/gin"
	"go.mongodb.org/mongo-driver/v2/mongo"
)

func SetupProtectedRoutes(router *gin.Engine, client *mongo.Client) {
	router.Use(middleware.AuthMiddleware())

	router.GET("/movies/:imdb_id", controller.GetMovie(client))
	router.POST("/movies", controller.AddMovie(client))

	router.GET("/movies/recommendations", controller.GetRecommendedMovies(client))
	router.PATCH("/movies/:imdb_id", controller.AdminReviewUpdate(client))
}
